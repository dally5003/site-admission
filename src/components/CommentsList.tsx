// src/components/CommentsList.tsx
'use client';

import { useState, useEffect } from 'react';
import { useTranslation } from '@/hooks/useTranslation';
import { format } from 'date-fns';
import { fr, enUS } from 'date-fns/locale';

interface Comment {
  _id: string;
  text: string;
  name?: string;
  email?: string;
  createdAt: string;
}

interface CommentsListProps {
  adminPassword: string;
}

export default function CommentsList({ adminPassword }: CommentsListProps) {
  const [comments, setComments] = useState<Comment[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [message, setMessage] = useState('');
  const { t, language } = useTranslation();
  const locale = language === 'fr' ? fr : enUS;

  useEffect(() => {
    fetchComments();
  }, []);

  const fetchComments = async () => {
    try {
      setIsLoading(true);
      const res = await fetch(`/api/comments?password=${adminPassword}`);
      
      if (!res.ok) {
        throw new Error('Erreur lors de la récupération');
      }
      
      const data = await res.json();
      setComments(data);
    } catch (error) {
      console.error('Erreur:', error);
      setMessage('❌ Erreur lors du chargement des commentaires');
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Êtes-vous sûr de vouloir supprimer ce commentaire?')) return;

    try {
      const res = await fetch(`/api/comments/${id}`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password: adminPassword }),
      });

      if (!res.ok) throw new Error('Erreur');

      await fetchComments();
      setMessage('✅ Commentaire supprimé!');
      setTimeout(() => setMessage(''), 3000);
    } catch (error) {
      setMessage('❌ Erreur lors de la suppression');
    }
  };

  if (isLoading) {
    return (
      <div className="text-center py-8">
        <div className="inline-block animate-spin">
          <div className="w-6 h-6 border-3 border-blue-600 border-t-transparent rounded-full"></div>
        </div>
        <p className="mt-2 text-gray-600">Chargement des commentaires...</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-md border border-gray-200 p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-900">
          💬 Commentaires ({comments.length})
        </h2>
        <button
          onClick={fetchComments}
          className="px-4 py-2 bg-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-400 transition-colors"
        >
          🔄 Actualiser
        </button>
      </div>

      {message && (
        <div
          className={`p-4 rounded-lg mb-4 text-center font-medium ${
            message.includes('✅')
              ? 'bg-green-100 text-green-800'
              : 'bg-red-100 text-red-800'
          }`}
        >
          {message}
        </div>
      )}

      {comments.length > 0 ? (
        <div className="space-y-4">
          {comments.map((comment) => (
            <div
              key={comment._id}
              className="border border-gray-300 rounded-lg p-4 bg-gray-50 hover:bg-gray-100 transition-colors"
            >
              {/* En-tête */}
              <div className="flex items-start justify-between mb-3">
                <div>
                  <p className="font-semibold text-gray-900">
                    {comment.name || 'Anonyme'}
                  </p>
                  {comment.email && (
                    <a
                      href={`mailto:${comment.email}`}
                      className="text-sm text-blue-600 hover:underline"
                    >
                      {comment.email}
                    </a>
                  )}
                  <p className="text-xs text-gray-500 mt-1">
                    {format(new Date(comment.createdAt), 'PPP p', { locale })}
                  </p>
                </div>
                <button
                  onClick={() => handleDelete(comment._id)}
                  className="px-3 py-1 bg-red-500 text-white text-sm rounded hover:bg-red-600 transition-colors"
                >
                  🗑️ Supprimer
                </button>
              </div>

              {/* Texte du commentaire */}
              <div className="bg-white p-3 rounded border border-gray-200">
                <p className="text-gray-800 whitespace-pre-wrap break-words">
                  {comment.text}
                </p>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-12 text-gray-500">
          <p className="text-lg">Aucun commentaire pour le moment</p>
        </div>
      )}
    </div>
  );
}