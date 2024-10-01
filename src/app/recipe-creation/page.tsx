'use client';
import { PhotoIcon } from '@heroicons/react/24/outline';
import Image from 'next/image';
import React, { useState, ChangeEvent, FormEvent } from 'react';

import Button from '@/components/atoms/Button/Button';
import Greeting from '@/components/atoms/Greeting';
import TextInput from '@/components/atoms/TextInput';
import { BaseLayout } from '@/components/templates/BaseLayout';

const CreateRecipe: React.FC = () => {
  const [recipeName, setRecipeName] = useState<string>('');
  const [description, setDescription] = useState<string>(''); // Variable for the first textarea
  const [instructions, setInstructions] = useState<string>(''); // Variable for the second textarea
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  // Function to check if all form fields are filled
  const isFormValid = (): boolean => {
    return (
      recipeName.trim() !== '' &&
      description.trim() !== '' &&
      instructions.trim() !== '' &&
      imagePreview !== null
    );
  };

  // Handler for image input change
  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  // Handler for recipe name change
  const handleRecipeNameChange = (event: ChangeEvent<HTMLInputElement>) => {
    setRecipeName(event.target.value);
  };

  // Handler for description change
  const handleDescriptionChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setDescription(event.target.value);
  };

  // Handler for instructions change
  const handleInstructionsChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setInstructions(event.target.value);
  };

  // Handler for form submission
  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!isFormValid()) return;
    // Submit logic here
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
                onChange={handleRecipeNameChange}
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
                onChange={handleDescriptionChange}
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
                onChange={handleInstructionsChange}
                placeholder="Instruções da receita"
                required
                className="w-full border border-gray-300 rounded-md p-2 h-32 bg-[#D9D9D9]"
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

            <Button
              type="submit"
              variant="default"
              className={`w-full mb-6 py-2 px-4 rounded-md transition-colors duration-300 ${
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
