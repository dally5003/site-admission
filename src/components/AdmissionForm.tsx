// src/components/AdmissionForm.tsx
'use client';

import { useState } from 'react';
import { useTranslation } from '@/hooks/useTranslation';
import ImageUploader from './ImageUploader';

interface AdmissionFormProps {
  initialData?: {
    _id: string;
    titre: string;
    organisation: string;
    dateLimit: string;
    categorie: string;
    description: string;
    lienExterne: string;
    logo?: string;
    comments?: string;
  };
  onSubmit: (data: any) => Promise<void>;
  onCancel: () => void;
  isLoading?: boolean;
  adminPassword: string;
}

export default function AdmissionForm({
  initialData,
  onSubmit,
  onCancel,
  isLoading = false,
  adminPassword,
}: AdmissionFormProps) {
  const { t } = useTranslation();
  const [formData, setFormData] = useState({
    titre: initialData?.titre || '',
    organisation: initialData?.organisation || '',
    dateLimit: initialData?.dateLimit
      ? new Date(initialData.dateLimit).toISOString().split('T')[0]
      : '',
    categorie: initialData?.categorie || 'université',
    description: initialData?.description || '',
    lienExterne: initialData?.lienExterne || '',
    logo: initialData?.logo || '',
    comments: initialData?.comments || '',
  });

  const [error, setError] = useState('');

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    try {
      await onSubmit({
        ...formData,
        password: adminPassword,
      });
    } catch (err: any) {
      setError(err.message || t('form.error'));
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white rounded-lg shadow-lg p-6 space-y-4"
    >
      {error && (
        <div className="p-4 bg-red-100 border border-red-400 text-red-700 rounded-lg">
          {error}
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            {t('form.title')}
          </label>
          <input
            type="text"
            name="titre"
            value={formData.titre}
            onChange={handleChange}
            required
            maxLength={200}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-gray-900"
            placeholder={t('form.titlePlaceholder')}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            {t('form.organization')}
          </label>
          <input
            type="text"
            name="organisation"
            value={formData.organisation}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-gray-900"
            placeholder={t('form.organizationPlaceholder')}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            {t('form.deadline')}
          </label>
          <input
            type="date"
            name="dateLimit"
            value={formData.dateLimit}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-gray-900"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            {t('form.category')}
          </label>
          <select
            name="categorie"
            value={formData.categorie}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-gray-900"
          >
            <option value="université">{t('form.categoryUniversity')}</option>
            <option value="bourse">{t('form.categoryScholarship')}</option>
            <option value="travail">{t('form.categoryJob')}</option>
            <option value="conférence">{t('form.categoryConference')}</option>
          </select>
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          {t('form.description')}
        </label>
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          required
          minLength={20}
          rows={4}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-gray-900"
          placeholder={t('form.descriptionPlaceholder')}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            {t('form.externalLink')}
          </label>
          <input
            type="url"
            name="lienExterne"
            value={formData.lienExterne}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-gray-900"
            placeholder={t('form.linkPlaceholder')}
          />
        </div>
      </div>

      <div>
        <ImageUploader
          value={formData.logo}
          onChange={(url) =>
            setFormData((prev) => ({
              ...prev,
              logo: url,
            }))
          }
          label={t('form.logo')}
        />
      </div>

      {/* Commentaires privés */}
      <div className="border-t pt-4">
        <label className="block text-sm font-medium text-gray-700 mb-1">
          {t('form.comments')}
        </label>
        <textarea
          name="comments"
          value={formData.comments}
          onChange={handleChange}
          rows={3}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-gray-900"
          placeholder={t('form.commentsPlaceholder')}
        />
        <p className="text-xs text-gray-500 mt-1">
          {t('form.comments')}
        </p>
      </div>

      <div className="flex gap-3 pt-4">
        <button
          type="submit"
          disabled={isLoading}
          className="flex-1 px-4 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 disabled:opacity-50 transition-colors"
        >
          {isLoading
            ? t('form.loading')
            : initialData
              ? t('form.update')
              : t('form.create')}
        </button>
        <button
          type="button"
          onClick={onCancel}
          className="flex-1 px-4 py-2 bg-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-400 transition-colors"
        >
          {t('form.cancel')}
        </button>
      </div>
    </form>
  );
}