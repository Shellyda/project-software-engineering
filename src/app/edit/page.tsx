'use client';
import { useAuth } from '@/hooks/useAuth';
import { useSupabase } from '@/hooks/useSupabase';
import { PhotoIcon } from '@heroicons/react/24/outline';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useEffect, useState, useCallback, ChangeEvent, FormEvent } from 'react';

import Button from '@/components/atoms/Button/Button';
import TextInput from '@/components/atoms/TextInput';
import ProfileHeader from '@/components/organisms/ProfileHeader';
import { BaseLayout } from '@/components/templates/BaseLayout';

type UserProfile = {
  id: string;
  display_name: string;
  email: string;
  profile_picture: string;
  created_at: string; // You can also use Date if you prefer parsing the timestamp
};

const Edit = () => {
  const { user, logout } = useAuth();
  const supabase = useSupabase();
  const router = useRouter();

  const [userData, setUserData] = useState<UserProfile | null>(null);
  const [originalDisplayName, setOriginalDisplayName] = useState<string>('');
  const [originalProfilePicture, setOriginalProfilePicture] = useState<string | null>(null);
  const [displayName, setDisplayName] = useState<string>('');
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const [isModified, setIsModified] = useState<boolean>(false);

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
        checkIfModified(displayName, file);
      };
      reader.readAsDataURL(file);
    }
  };

  const isFormValid = (): boolean => {
    return displayName.trim().length > 0;
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!isFormValid() || !isModified) return;

    if (!user?.id) return;

    let profileImageUrl = userData?.profile_picture;

    try {
      if (imageFile) {
        // Upload the image to Supabase storage
        const { data: imageData, error: imageError } = await supabase.storage
          .from('bucket 1') // Ensure you're using the correct bucket
          .upload(`profile picture/${user.id}-${imageFile.name}`, imageFile, {
            cacheControl: '3600',
            upsert: false
          });

        if (imageError) {
          setUploadError(imageError.message);

          return;
        }

        profileImageUrl = imageData?.path
          ? supabase.storage.from('bucket 1').getPublicUrl(imageData.path).data?.publicUrl
          : profileImageUrl;
      }

      // Update the user's profile in Supabase
      const { error: updateError } = await supabase
        .from('profile')
        .update({
          display_name: displayName,
          profile_picture: profileImageUrl
        })
        .eq('id', user.id);

      if (updateError) {
        setUploadError(updateError.message);

        return;
      }

      await getUserData();
      setIsModified(false);
      router.push('/profile');
    } catch (err) {
      console.error('Error updating profile:', err);
    }
  };

  const getUserData = useCallback(async () => {
    const id = user?.id;
    if (!id) return;

    try {
      const { data: profile, error } = await supabase
        .from('profile')
        .select()
        .eq('id', id)
        .single();

      if (error) {
        console.error('Error fetching user data:', error);

        return;
      }

      setUserData(profile);
      setOriginalDisplayName(profile.display_name);
      setDisplayName(profile.display_name);
      setOriginalProfilePicture(profile.profile_picture);
      setImagePreview(profile.profile_picture);
    } catch (err) {
      console.error('Error fetching user data:', err);
    }
  }, [supabase, user]);

  const checkIfModified = (newDisplayName: string, newImageFile: File | null) => {
    const hasNameChanged = newDisplayName !== originalDisplayName;
    const hasImageChanged = !!newImageFile || imagePreview !== originalProfilePicture;

    setIsModified(hasNameChanged || hasImageChanged);
  };

  // Fetch user data on component mount
  useEffect(() => {
    getUserData();
  }, [getUserData]);

  useEffect(() => {
    checkIfModified(displayName, imageFile);
  }, [displayName, imageFile]);

  return (
    <div>
      <BaseLayout>
        {userData?.display_name && (
          <ProfileHeader
            onEdit={() => null}
            logout={logout}
            isMyProfile
            editing
            name={userData?.display_name}
            email={userData?.email}
            username={userData?.display_name}
            profileImage={imagePreview || userData?.profile_picture}
          />
        )}
        <form onSubmit={handleSubmit}>
          <TextInput
            label="Nome de usuário"
            value={displayName}
            onChange={(e) => {
              setDisplayName(e.target.value);
              checkIfModified(e.target.value, imageFile);
            }}
          />
          <label htmlFor="imageUpload" className="flex mt-6 flex-row justify-center items-center">
            {imagePreview ? (
              <Image
                src={imagePreview}
                alt="Uploaded"
                width={100}
                height={100}
                className="w-36 h-36 object-cover rounded-full"
              />
            ) : (
              <div className="w-36 h-36 bg-[#D9D9D9] flex flex-col items-center justify-center rounded-full cursor-pointer">
                <PhotoIcon className="h-8 w-8 text-gray-600 mb-2" aria-hidden="true" />
                <span className="text-gray-600 opacity-80 text-xs text-center">
                  Insira sua foto!
                </span>
              </div>
            )}
          </label>
          <div className="mb-6">
            <input
              name="img"
              id="imageUpload"
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleImageChange}
            />
          </div>
          <Button
            type="submit"
            style={{ marginTop: '16px', width: '100%' }}
            className={`w-full mb-20 py-2 px-4 rounded-md transition-colors duration-300 ${
              isModified
                ? 'bg-black-primary text-white hover:bg-blue-600'
                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
            }`}
            variant="default"
            disabled={!isModified}
          >
            Salvar alterações
          </Button>
          {uploadError && <p className="text-red-500 mt-2">{uploadError}</p>}
        </form>
      </BaseLayout>
    </div>
  );
};

export default Edit;
