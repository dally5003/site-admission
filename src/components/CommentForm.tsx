// src/components/CommentForm.tsx
'use client';

import { useState } from 'react';
import { useTranslation } from '@/hooks/useTranslation';

export default function CommentForm() {
  const [text, setText] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState('');
  const { t } = useTranslation();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage('');

    if (!text.trim()) {
      setMessage(t('userComments.required'));
      return;
    }

    setIsLoading(true);

    try {
      const res = await fetch('/api/comments', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          text: text.trim(),
          name: name.trim() || 'Anonyme',
          email: email.trim() || null,
        }),
      });

      if (!res.ok) throw new Error('Erreur lors de l\'envoi');

      setMessage(t('userComments.success'));
      setText('');
      setName('');
      setEmail('');
      
      // Masquer le message après 3 secondes
      setTimeout(() => setMessage(''), 3000);
    } catch (error: any) {
      setMessage(t('userComments.error'));
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md border border-gray-200 p-6 my-8">
      <div className="mb-6">
        <h3 className="text-xl font-bold text-gray-900 mb-2">
          💬 {t('userComments.title')}
        </h3>
        <p className="text-sm text-gray-600">
          {t('userComments.subtitle')}
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Message de feedback */}
        {message && (
          <div
            className={`p-3 rounded-lg text-sm font-medium ${
              message.includes('✅')
                ? 'bg-green-100 text-green-800'
                : 'bg-red-100 text-red-800'
            }`}
          >
            {message}
          </div>
        )}

        {/* Commentaire */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            {t('userComments.title')} *
          </label>
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder={t('userComments.placeholder')}
            minLength={10}
            maxLength={2000}
            rows={5}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white text-gray-900"
            required
          />
          <p className="text-xs text-gray-500 mt-1">
            {text.length}/2000
          </p>
        </div>

        {/* Nom et Email */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {t('userComments.name')}
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder={t('userComments.namePlaceholder')}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white text-gray-900"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {t('userComments.email')}
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder={t('userComments.emailPlaceholder')}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white text-gray-900"
            />
          </div>
        </div>

        {/* Bouton Envoyer */}
        <button
          type="submit"
          disabled={isLoading || !text.trim()}
          className="w-full px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          {isLoading ? t('userComments.sending') : t('userComments.send')}
        </button>
      </form>
    </div>
  );
}