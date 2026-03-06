// src/components/AdmissionCard.tsx
'use client';

import Image from 'next/image';
import { format } from 'date-fns';
import { fr, enUS } from 'date-fns/locale';
import { useTranslation } from '@/hooks/useTranslation';

interface AdmissionCardProps {
  _id: string;
  titre: string;
  organisation: string;
  dateLimit: string;
  categorie: string;
  description: string;
  lienExterne: string;
  logo?: string;
  onEdit?: (_id: string) => void;
  onDelete?: (_id: string) => void;
  isAdmin?: boolean;
}

export default function AdmissionCard({
  _id,
  titre,
  organisation,
  dateLimit,
  categorie,
  description,
  lienExterne,
  logo,
  onEdit,
  onDelete,
  isAdmin = false,
}: AdmissionCardProps) {
  const { t, language } = useTranslation();
  const locale = language === 'fr' ? fr : enUS;

  const date = new Date(dateLimit);
  const isExpired = date < new Date();
  const daysLeft = Math.ceil(
    (date.getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24)
  );

  const categoryColors: Record<string, string> = {
    université: 'bg-blue-100 text-blue-800',
    bourse: 'bg-green-100 text-green-800',
    travail: 'bg-purple-100 text-purple-800',
    conférence: 'bg-orange-100 text-orange-800',
  };

  return (
    <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden border border-gray-200">
      <div className="flex gap-4 p-4">
        {/* Logo */}
        {logo && (
          <div className="flex-shrink-0">
            <Image
              src={logo}
              alt={organisation}
              width={80}
              height={80}
              className="rounded-lg object-cover"
            />
          </div>
        )}

        {/* Contenu */}
        <div className="flex-1">
          {/* Header */}
          <div className="flex items-start justify-between gap-2 mb-2">
            <div>
              <h3 className="text-lg font-bold text-gray-900 line-clamp-2">
                {titre}
              </h3>
              <p className="text-sm text-gray-600 font-medium">{organisation}</p>
            </div>
            <span
              className={`px-3 py-1 rounded-full text-xs font-semibold whitespace-nowrap ${
                categoryColors[categorie] || 'bg-gray-100 text-gray-800'
              }`}
            >
              {t(`categoryNames.${categorie}`)}
            </span>
          </div>

          {/* Description */}
          <p className="text-sm text-gray-700 line-clamp-2 mb-3">
            {description}
          </p>

          {/* Footer */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              {/* Date limite */}
              <div className="text-xs">
                <p className="text-gray-600">{t('home.deadline')}</p>
                <p
                  className={`font-semibold ${
                    isExpired
                      ? 'text-red-600'
                      : daysLeft <= 7
                        ? 'text-orange-600'
                        : 'text-green-600'
                  }`}
                >
                  {isExpired
                    ? t('home.expired')
                    : `${daysLeft} ${daysLeft > 1 ? (language === 'fr' ? 'jours restants' : 'days left') : (language === 'fr' ? 'jour restant' : 'day left')}`}
                </p>
                <p className="text-gray-500 text-xs">
                  {format(date, language === 'fr' ? 'd MMM yyyy' : 'MMM d, yyyy', { locale })}
                </p>
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-2">
              <a
                href={lienExterne}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors"
              >
                {t('home.viewMore')}
              </a>

              {isAdmin && (
                <>
                  <button
                    onClick={() => onEdit?.(_id)}
                    className="px-3 py-2 bg-amber-500 text-white text-sm rounded-lg hover:bg-amber-600 transition-colors"
                  >
                    ✏️
                  </button>
                  <button
                    onClick={() => {
                      if (confirm(t('admin.confirmDelete'))) {
                        onDelete?.(_id);
                      }
                    }}
                    className="px-3 py-2 bg-red-500 text-white text-sm rounded-lg hover:bg-red-600 transition-colors"
                  >
                    🗑️
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}