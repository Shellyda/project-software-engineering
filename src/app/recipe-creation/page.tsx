/* eslint-disable @typescript-eslint/no-unused-vars */
'use client';
import { useAuth } from '@/hooks/useAuth';
import { useSupabase } from '@/hooks/useSupabase';
import { PhotoIcon } from '@heroicons/react/24/outline';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import React, { ChangeEvent, FormEvent, useState } from 'react';

import Button from '@/components/atoms/Button/Button';
import Greeting from '@/components/atoms/Greeting';
import TextInput from '@/components/atoms/TextInput';
import { BaseLayout } from '@/components/templates/BaseLayout';

const CreateRecipe: React.FC = () => {
  const supabase = useSupabase();
  const router = useRouter();
  const { user } = useAuth();

  const [recipeName, setRecipeName] = useState<string>('');
  const [description, setDescription] = useState<string>(''); // Variable for the first textarea
  const [instructions, setInstructions] = useState<string>(''); // Variable for the second textarea
  const [imageFile, setImageFile] = useState<File | null>(null); // Variable for the image file
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [category, setCategory] = useState<string>(''); // Dropdown for category
  const [difficulty, setDifficulty] = useState<string>(''); // Dropdown for difficulty
  const [prepTime, setPrepTime] = useState<number>(0); // Input for preparation time
  const [uploadError, setUploadError] = useState<string | null>(null); // Variable to store upload error message

  // Function to check if all form fields are filled
  const isFormValid = (): boolean => {
    return (
      recipeName.trim() !== '' &&
      description.trim() !== '' &&
      instructions.trim() !== '' &&
      imageFile !== null &&
      category !== '' &&
      difficulty !== '' &&
      prepTime > 0
    );
  };

  // Handler for image input change
  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  // Function to handle redirecting to the recipe details page
  const handleRedirectRecipe = (recipeId: string, userId: string, imageUrl: string) => {
    const query = new URLSearchParams({
      user_id: userId, // User ID
      recipe_name: recipeName, // Recipe name
      recipe_image: imageUrl, // URL of the recipe image
      recipe_rating: '0', // Recipe initial rating
      ingredients: description, // Ingredients description
      instructions: instructions // Cooking instructions
    }).toString();

    router.push(`/receita/${recipeId}?${query}`); // Redirects to the recipe details page
  };

  // Handler for form submission
  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!isFormValid()) return;

    if (!user?.id) return;

    if (!imageFile) {
      setUploadError('Please select an image file before submitting.');

      return;
    }

    try {
      // Upload the image to Supabase storage
      const { data, error } = await supabase.storage
        .from('bucket 1')
        .upload(`recipe picture/${imageFile!.name}`, imageFile, {
          cacheControl: '3600',
          upsert: false
        });

      if (error) {
        setUploadError(error.message);

        return;
      }

      // Get the public URL for the uploaded image
      const { data: urlData } = supabase.storage
        .from('bucket 1')
        .getPublicUrl(`recipe picture/${imageFile.name}`);

      if (!data) {
        return;
      }

      const imageUrl = urlData.publicUrl;

      // Call the upsert_recipe function
      const { data: recipeData, error: dbError } = await supabase.rpc('upsert_recipe', {
        _recipe_id: null,
        _user_id: user?.id, // GET USER ID
        _name: recipeName,
        _description: description,
        _preparation: instructions,
        _recipe_picture: imageUrl, // Pass the public URL of the uploaded image
        _preparation_time: prepTime,
        _difficulty: difficulty,
        _categories: [category]
      });

      if (dbError) {
        setUploadError(dbError.message);

        return;
      }

      handleRedirectRecipe(recipeData.toString(), user?.id, imageUrl);
    } catch (err) {
      setUploadError('An unexpected error occurred. Please try again.');
      console.error(err);
    }
  };

  return (
    <div>
      <BaseLayout>
        <Greeting title="Criar" isAuthenticated={false} disableSuffix />
        <div className="flex flex-col h-screen">
          <form onSubmit={handleSubmit} className="w-full max-w-lg mx-auto">
            <div className="mb-4 mt-2">
              <TextInput
                label="Nome da receita"
                type="text"
                value={recipeName}
                onChange={(e) => setRecipeName(e.target.value)}
                placeholder="Nome da receita"
                required
                className="w-full border border-gray-300 rounded-md p-2 bg-[#D9D9D9]"
              />
            </div>
            <label
              style={{ color: '#2E2C25' }}
              className="text-black-primary text-purple-600 text-sm font-bold"
            >
              Adicione os ingredientes
            </label>
            <div className="mb-4">
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Insira os ingredientes e suas quantidades"
                required
                className="w-full border border-gray-300 rounded-md p-2 h-32 bg-[#D9D9D9]"
              />
            </div>
            <label
              style={{ color: '#2E2C25' }}
              className="text-black-primary text-purple-600 text-sm font-bold"
            >
              Modo de preparo
            </label>
            <div className="mb-6">
              <textarea
                value={instructions}
                onChange={(e) => setInstructions(e.target.value)}
                placeholder="Instruções da receita"
                required
                className="w-full border border-gray-300 rounded-md p-2 h-32 bg-[#D9D9D9]"
              />
            </div>
            {/* Category dropdown */}
            <label
              style={{ color: '#2E2C25' }}
              className="text-black-primary text-purple-600 text-sm font-bold"
            >
              Categoria
            </label>
            <div className="mb-4">
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                required
                className="w-full border border-gray-300 rounded-md p-2 bg-[#D9D9D9]"
              >
                <option value="">Selecione uma categoria</option>
                <option value="Vegano">Vegano</option>
                <option value="Almoço">Almoço</option>
                <option value="Doces">Doces</option>
                <option value="Salgados">Salgados</option>
                <option value="Lanche da Tarde">Lanche da Tarde</option>
                <option value="Low carb">Low carb</option>
                <option value="Mexicana">Mexicana</option>
                <option value="Sem glúten">Sem glúten</option>
                <option value="Fitness">Fitness</option>
                <option value="Jantar">Jantar</option>
              </select>
            </div>
            {/* Difficulty dropdown */}
            <label
              style={{ color: '#2E2C25' }}
              className="text-black-primary text-purple-600 text-sm font-bold"
            >
              Dificuldade
            </label>
            <div className="mb-4">
              <select
                value={difficulty}
                onChange={(e) => setDifficulty(e.target.value)}
                required
                className="w-full border border-gray-300 rounded-md p-2 bg-[#D9D9D9]"
              >
                <option value="">Selecione a dificuldade</option>
                <option value="Fácil">Fácil</option>
                <option value="Médio">Médio</option>
                <option value="Difícil">Difícil</option>
              </select>
            </div>
            {/* Preparation time input */}
            <label
              style={{ color: '#2E2C25' }}
              className="text-black-primary text-purple-600 text-sm font-bold"
            >
              Tempo de preparo (minutos)
            </label>
            <div className="mb-6">
              <input
                type="number"
                value={prepTime}
                onChange={(e) => setPrepTime(parseInt(e.target.value, 10))}
                required
                className="w-full border border-gray-300 rounded-md p-2 bg-[#D9D9D9]"
                min={1}
                placeholder="Tempo de preparo (minutos)"
              />
            </div>
            <label htmlFor="imageUpload">
              {imagePreview ? (
                <Image
                  src={imagePreview}
                  alt="Uploaded"
                  width={100}
                  height={100}
                  className="w-56 h-56 object-cover rounded-md"
                />
              ) : (
                <div className="w-56 h-56 bg-[#D9D9D9] flex flex-col items-center justify-center rounded-md cursor-pointer">
                  <PhotoIcon className="h-8 w-8 text-gray-600 mb-2" aria-hidden="true" />
                  <span className="text-gray-600 opacity-80 text-center">
                    Adicione uma imagem da receita
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
            {uploadError && <p className="text-red-500">{uploadError}</p>}{' '}
            {/* Display error message */}
            <Button
              type="submit"
              variant="default"
              className={`w-full mb-20 py-2 px-4 rounded-md transition-colors duration-300 ${
                isFormValid()
                  ? 'bg-black-primary text-white hover:bg-blue-600'
                  : 'bg-gray-300 text-gray-500 cursor-not-allowed'
              }`}
              disabled={!isFormValid()} // Disable the button if the form is not valid
            >
              Criar Receita
            </Button>
          </form>
        </div>
      </BaseLayout>
    </div>
  );
};

export default CreateRecipe;
