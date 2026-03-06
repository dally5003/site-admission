// src/app/api/comments/route.ts
import { connectDB } from '@/lib/mongodb';
import Comment from '@/models/Comments';
import { NextRequest, NextResponse } from 'next/server';

// GET - Récupérer tous les commentaires (Admin only)
export async function GET(request: NextRequest) {
  try {
    await connectDB();

    // Vérifier le mot de passe admin
    const { searchParams } = new URL(request.url);
    const password = searchParams.get('password');

    if (password !== process.env.ADMIN_PASSWORD) {
      return NextResponse.json(
        { error: 'Mot de passe admin incorrect' },
        { status: 401 }
      );
    }

    const comments = await Comment.find().sort({ createdAt: -1 }).lean();

    return NextResponse.json(comments, { status: 200 });
  } catch (error) {
    console.error('Erreur GET /api/comments:', error);
    return NextResponse.json(
      { error: 'Erreur lors de la récupération des commentaires' },
      { status: 500 }
    );
  }
}

// POST - Créer un commentaire (Public)
export async function POST(request: NextRequest) {
  try {
    await connectDB();

    const data = await request.json();

    // Valider que le texte n'est pas vide
    if (!data.text || data.text.trim().length < 10) {
      return NextResponse.json(
        { error: 'Le commentaire doit contenir au moins 10 caractères' },
        { status: 400 }
      );
    }

    // Valider l'email si fourni
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (data.email && data.email.trim() && !emailRegex.test(data.email.trim())) {
      return NextResponse.json(
        { error: 'Email invalide' },
        { status: 400 }
      );
    }

    const comment = await Comment.create({
      text: data.text.trim(),
      name: data.name && data.name.trim() ? data.name.trim() : 'Anonyme',
      email: (data.email && data.email.trim()) ? data.email.trim() : null,
    });

    return NextResponse.json(comment, { status: 201 });
  } catch (error: any) {
    console.error('Erreur POST /api/comments:', error);
    return NextResponse.json(
      { error: error.message || 'Erreur lors de la création du commentaire' },
      { status: 400 }
    );
  }
}