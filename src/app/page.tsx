// src/app/page.tsx
'use client';

import { useState, useEffect } from 'react';
import AdmissionCard from '@/components/AdmissionCard';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import CommentForm from '@/components/CommentForm';
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

export default function Home() {
  const [admissions, setAdmissions] = useState<Admission[]>([]);
  const [filtered, setFiltered] = useState<Admission[]>([]);
  const [selectedCategory, setSelectedCategory] = useState('tous');
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const { t } = useTranslation();

  const categories = ['tous', 'université', 'bourse', 'travail', 'conférence'];

  useEffect(() => {
    fetchAdmissions();
  }, []);

  useEffect(() => {
    filterAdmissions();
  }, [selectedCategory, searchQuery, admissions]);

  const fetchAdmissions = async () => {
    try {
      setIsLoading(true);
      const res = await fetch('/api/admissions');
      const data = await res.json();
      setAdmissions(data);
    } catch (error) {
      console.error('Erreur lors de la récupération des annonces:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const filterAdmissions = () => {
    let result = admissions;

    // Filtre par catégorie
    if (selectedCategory !== 'tous') {
      result = result.filter((a) => a.categorie === selectedCategory);
    }

    // Filtre par recherche
    if (searchQuery) {
      result = result.filter(
        (a) =>
          a.titre.toLowerCase().includes(searchQuery.toLowerCase()) ||
          a.organisation.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    setFiltered(result);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-white flex flex-col">
      <Header />

      <main className="max-w-7xl mx-auto px-4 py-8 flex-1 w-full">
        {/* Barre de recherche */}
        <div className="mb-8 space-y-4">
          <div className="relative">
            <input
              type="text"
              placeholder={t('home.search')}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-4 py-3 pl-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white text-gray-900"
            />
          </div>

          {/* Filtres par catégorie */}
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setSelectedCategory('tous')}
              className={`px-4 py-2 rounded-full font-medium transition-colors ${
                selectedCategory === 'tous'
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              {t('home.all')}
            </button>
            <button
              onClick={() => setSelectedCategory('université')}
              className={`px-4 py-2 rounded-full font-medium transition-colors ${
                selectedCategory === 'université'
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              {t('categoryNames.université')}
            </button>
            <button
              onClick={() => setSelectedCategory('bourse')}
              className={`px-4 py-2 rounded-full font-medium transition-colors ${
                selectedCategory === 'bourse'
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              {t('categoryNames.bourse')}
            </button>
            <button
              onClick={() => setSelectedCategory('travail')}
              className={`px-4 py-2 rounded-full font-medium transition-colors ${
                selectedCategory === 'travail'
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              {t('categoryNames.travail')}
            </button>
            <button
              onClick={() => setSelectedCategory('conférence')}
              className={`px-4 py-2 rounded-full font-medium transition-colors ${
                selectedCategory === 'conférence'
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              {t('categoryNames.conférence')}
            </button>
          </div>
        </div>

        {/* Liste des annonces */}
        {isLoading ? (
          <div className="text-center py-12">
            <div className="inline-block animate-spin">
              <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full"></div>
            </div>
            <p className="mt-4 text-gray-600">{t('home.loading')}</p>
          </div>
        ) : filtered.length > 0 ? (
          <div className="space-y-4">
            {filtered.map((admission) => (
              <AdmissionCard key={admission._id} {...admission} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
          <p className="text-gray-600 mt-2">
              {t('home.noResults')}
            </p>
          </div>
        )}

        {/* Stats */}
        <div className="mt-12 pt-8 border-t border-gray-200">
          <p className="text-center text-sm text-gray-600">
            {t('home.totalAnnouncements')} <span className="font-bold">{admissions.length}</span>
          </p>
        </div>

        {/* Formulaire de commentaires */}
        <CommentForm />
      </main>

      <Footer />
    </div>
  );
}