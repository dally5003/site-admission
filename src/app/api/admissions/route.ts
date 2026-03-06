// src/app/api/admissions/route.ts
import { connectDB } from '@/lib/mongodb';
import Admission from '@/models/Admission';
import { NextRequest, NextResponse } from 'next/server';

// GET - Récupérer toutes les annonces
export async function GET(request: NextRequest) {
  try {
    await connectDB();

    const { searchParams } = new URL(request.url);
    const categorie = searchParams.get('categorie');

    let query = {};
    if (categorie && categorie !== 'tous') {
      query = { categorie };
    }

    const admissions = await Admission.find(query)
      .sort({ createdAt: -1 })
      .lean();

    return NextResponse.json(admissions, { status: 200 });
  } catch (error) {
    console.error('Erreur GET /api/admissions:', error);
    return NextResponse.json(
      { error: 'Erreur lors de la récupération des annonces' },
      { status: 500 }
    );
  }
}

// POST - Créer une nouvelle annonce (Admin only)
export async function POST(request: NextRequest) {
  try {
    await connectDB();

    // Vérifier le mot de passe admin
    const { password, ...data } = await request.json();

    if (password !== process.env.ADMIN_PASSWORD) {
      return NextResponse.json(
        { error: 'Mot de passe admin incorrect' },
        { status: 401 }
      );
    }

    const admission = await Admission.create(data);

    return NextResponse.json(admission, { status: 201 });
  } catch (error: any) {
    console.error('Erreur POST /api/admissions:', error);
    return NextResponse.json(
      { error: error.message || 'Erreur lors de la création de l\'annonce' },
      { status: 400 }
    );
  }
}