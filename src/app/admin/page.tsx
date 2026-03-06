// src/app/admin/page.tsx
'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import AdmissionForm from '@/components/AdmissionForm';
import AdmissionCard from '@/components/AdmissionCard';
import CommentsList from '@/components/CommentsList';
import Link from 'next/link';
import { useTranslation } from '@/hooks/useTranslation';

interface Admission {
  _id: string;
  titre: string;
  organisation: string;
  dateLimit: string;
  categorie: string;
  description: string;
  lienExterne: string;
  logo?: string;
}

export default function AdminPage() {
  const router = useRouter();
  const { t } = useTranslation();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [adminPassword, setAdminPassword] = useState('');
  const [passwordInput, setPasswordInput] = useState('');
  const [admissions, setAdmissions] = useState<Admission[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [showComments, setShowComments] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editingData, setEditingData] = useState<Admission | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState('');

  // Connexion admin
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (passwordInput === process.env.NEXT_PUBLIC_ADMIN_PASSWORD) {
      setAdminPassword(passwordInput);
      setIsAuthenticated(true);
      setPasswordInput('');
      fetchAdmissions();
    } else {
      setMessage(t('admin.incorrectPassword'));
      setTimeout(() => setMessage(''), 3000);
    }
  };

  const fetchAdmissions = async () => {
    try {
      const res = await fetch('/api/admissions');
      const data = await res.json();
      setAdmissions(data);
    } catch (error) {
      console.error('Erreur:', error);
      setMessage('❌ Erreur lors du chargement des annonces');
    }
  };

  const handleSubmit = async (formData: any) => {
    setIsLoading(true);
    try {
      const url = editingId
        ? `/api/admissions/${editingId}`
        : '/api/admissions';
      const method = editingId ? 'PUT' : 'POST';

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (!res.ok) {
        throw new Error('Erreur lors de l\'enregistrement');
      }

      await fetchAdmissions();
      setShowForm(false);
      setEditingId(null);
      setEditingData(null);
      setMessage(
        editingId ? t('admin.successUpdate') : t('admin.successCreate')
      );
      setTimeout(() => setMessage(''), 3000);
    } catch (error: any) {
      setMessage(`❌ ${error.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  const handleEdit = (id: string) => {
    const admission = admissions.find((a) => a._id === id);
    if (admission) {
      setEditingId(id);
      setEditingData(admission);
      setShowForm(true);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      const res = await fetch(`/api/admissions/${id}`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password: adminPassword }),
      });

      if (!res.ok) throw new Error('Erreur lors de la suppression');

      await fetchAdmissions();
      setMessage(t('admin.successDelete'));
      setTimeout(() => setMessage(''), 3000);
    } catch (error: any) {
      setMessage(`❌ ${error.message}`);
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-600 to-blue-800 flex items-center justify-center p-4">
        <div className="bg-white rounded-lg shadow-2xl p-8 w-full max-w-md">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">🔐 {t('admin.login')}</h1>
          <p className="text-gray-600 mb-6">{t('admin.loginSubtitle')}</p>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {t('admin.password')}
              </label>
              <input
                type="password"
                value={passwordInput}
                onChange={(e) => setPasswordInput(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-gray-900"
                placeholder={t('admin.enter')}
                required
              />
            </div>

            {message && <p className="text-center text-sm mt-2 font-medium text-gray-900">{message}</p>}

            <button
              type="submit"
              className="w-full px-4 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors"
            >
              {t('admin.submit')}
            </button>
          </form>

          <Link href="/" className="block text-center text-blue-600 text-sm mt-4 hover:underline">
            {t('admin.returnHome')}
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">⚙️ {t('admin.title')}</h1>
            <p className="text-sm text-gray-600 mt-1">{t('admin.subtitle')}</p>
          </div>
          <div className="flex gap-3">
            <button
              onClick={() => setShowComments(!showComments)}
              className={`px-4 py-2 font-medium rounded-lg transition-colors ${
                showComments
                  ? 'bg-purple-600 text-white'
                  : 'bg-purple-600 text-white hover:bg-purple-700'
              }`}
            >
              {t('userComments.title')}
            </button>
            <button
              onClick={() => {
                setShowForm(false);
                setEditingId(null);
                setEditingData(null);
              }}
              className="px-4 py-2 bg-green-600 text-white font-medium rounded-lg hover:bg-green-700 transition-colors"
            >
              {t('admin.newAnnouncement')}
            </button>
            <Link
              href="/"
              className="px-4 py-2 bg-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-400 transition-colors"
            >
              {t('admin.back')}
            </Link>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8">
        {message && (
          <div className="mb-6 p-4 bg-gray-100 border border-gray-300 rounded-lg text-center">
            {message}
          </div>
        )}

        {showComments ? (
          // Section Commentaires
          <CommentsList adminPassword={adminPassword} />
        ) : showForm ? (
          // Formulaire Annonce
          <AdmissionForm
            initialData={editingData || undefined}
            onSubmit={handleSubmit}
            onCancel={() => {
              setShowForm(false);
              setEditingId(null);
              setEditingData(null);
            }}
            isLoading={isLoading}
            adminPassword={adminPassword}
          />
        ) : (
          // Liste Annonces
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              {t('admin.announcements')} ({admissions.length})
            </h2>
            {admissions.length > 0 ? (
              <div className="space-y-4">
                {admissions.map((admission) => (
                  <AdmissionCard
                    key={admission._id}
                    {...admission}
                    isAdmin={true}
                    onEdit={handleEdit}
                    onDelete={handleDelete}
                  />
                ))}
              </div>
            ) : (
              <div className="text-center py-12 bg-white rounded-lg border-2 border-dashed border-gray-300">
                <p className="text-gray-500 text-lg">{t('admin.createFirst')}</p>
                <button
                  onClick={() => setShowForm(true)}
                  className="mt-4 px-6 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors"
                >
                  {t('admin.newAnnouncement')}
                </button>
              </div>
            )}
          </div>
        )}
      </main>
    </div>
  );
}