// src/components/ImageUploader.tsx
'use client';

import { useState, useRef } from 'react';
import Image from 'next/image';

interface ImageUploaderProps {
  value: string;
  onChange: (url: string) => void;
  label?: string;
}

export default function ImageUploader({
  value,
  onChange,
  label = 'Logo',
}: ImageUploaderProps) {
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState('');
  const [preview, setPreview] = useState(value);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setError('');
    setIsUploading(true);

    try {
      // Créer un aperçu local
      const reader = new FileReader();
      reader.onload = (event) => {
        setPreview(event.target?.result as string);
      };
      reader.readAsDataURL(file);

      // Uploader le fichier
      const formData = new FormData();
      formData.append('file', file);

      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || 'Erreur lors de l\'upload');
      }

      const data = await response.json();
      onChange(data.url);
      setError('');
    } catch (err: any) {
      setError(err.message || 'Erreur lors de l\'upload');
      setPreview('');
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-2">
        {label}
      </label>

      <div className="flex gap-4">
        {/* Zone d'upload */}
        <div className="flex-1">
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            disabled={isUploading}
            className="hidden"
          />

          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            disabled={isUploading}
            className="w-full px-4 py-3 border-2 border-dashed border-gray-300 rounded-lg hover:border-blue-500 transition-colors disabled:opacity-50 bg-gray-50 hover:bg-blue-50"
          >
            {isUploading ? (
              <span className="text-gray-600">Téléchargement en cours...</span>
            ) : (
              <div>
                <p className="text-gray-700 font-medium">📤 Cliquez pour uploader</p>
                <p className="text-xs text-gray-500 mt-1">ou glissez-déposez une image</p>
                <p className="text-xs text-gray-400 mt-2">Max 5MB • PNG, JPG, GIF</p>
              </div>
            )}
          </button>

          {error && <p className="text-red-600 text-sm mt-2">{error}</p>}
        </div>

        {/* Aperçu */}
        {preview && (
          <div className="flex-shrink-0">
            <div className="w-24 h-24 rounded-lg border border-gray-300 overflow-hidden bg-gray-100">
              <Image
                src={preview}
                alt="Aperçu"
                width={96}
                height={96}
                className="w-full h-full object-cover"
              />
            </div>
            <button
              type="button"
              onClick={() => {
                setPreview('');
                onChange('');
                if (fileInputRef.current) {
                  fileInputRef.current.value = '';
                }
              }}
              className="text-xs text-red-600 hover:text-red-700 mt-2 block"
            >
              Supprimer
            </button>
          </div>
        )}
      </div>
    </div>
  );
}