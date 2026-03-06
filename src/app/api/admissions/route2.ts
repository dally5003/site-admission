// src/app/api/admissions/[id]/route.ts
import { connectDB } from '@/lib/mongodb';
import Admission from '@/models/Admission';
import { NextRequest, NextResponse } from 'next/server';

// GET - Récupérer une annonce spécifique
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await connectDB();
    const admission = await Admission.findById(params.id).lean();

    if (!admission) {
      return NextResponse.json(
        { error: 'Annonce non trouvée' },
        { status: 404 }
      );
    }

    return NextResponse.json(admission, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: 'Erreur lors de la récupération de l\'annonce' },
      { status: 500 }
    );
  }
}

// PUT - Modifier une annonce (Admin only)
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await connectDB();

    const { password, ...data } = await request.json();

    if (password !== process.env.ADMIN_PASSWORD) {
      return NextResponse.json(
        { error: 'Mot de passe admin incorrect' },
        { status: 401 }
      );
    }

    const admission = await Admission.findByIdAndUpdate(params.id, data, {
      new: true,
      runValidators: true,
    });

    if (!admission) {
      return NextResponse.json(
        { error: 'Annonce non trouvée' },
        { status: 404 }
      );
    }

    return NextResponse.json(admission, { status: 200 });
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || 'Erreur lors de la mise à jour' },
      { status: 400 }
    );
  }
}

// DELETE - Supprimer une annonce (Admin only)
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await connectDB();

    const body = await request.json();
    const { password } = body;

    if (password !== process.env.ADMIN_PASSWORD) {
      return NextResponse.json(
        { error: 'Mot de passe admin incorrect' },
        { status: 401 }
      );
    }

    const admission = await Admission.findByIdAndDelete(params.id);

    if (!admission) {
      return NextResponse.json(
        { error: 'Annonce non trouvée' },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { message: 'Annonce supprimée avec succès' },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: 'Erreur lors de la suppression' },
      { status: 500 }
    );
  }
}