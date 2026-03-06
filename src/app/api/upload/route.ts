// src/app/api/upload/route.ts
import { writeFile, mkdir } from 'fs/promises';
import { join } from 'path';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get('file') as File;

    if (!file) {
      return NextResponse.json(
        { error: 'Aucun fichier fourni' },
        { status: 400 }
      );
    }

    // Vérifier que c'est une image
    if (!file.type.startsWith('image/')) {
      return NextResponse.json(
        { error: 'Le fichier doit être une image' },
        { status: 400 }
      );
    }

    // Vérifier la taille (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      return NextResponse.json(
        { error: 'L\'image doit faire moins de 5MB' },
        { status: 400 }
      );
    }

    // Créer un nom unique pour le fichier
    const timestamp = Date.now();
    const fileName = `${timestamp}-${file.name.replace(/\s+/g, '-')}`;
    
    // Créer le dossier public/uploads s'il n'existe pas
    const uploadDir = join(process.cwd(), 'public', 'uploads');
    
    try {
      await mkdir(uploadDir, { recursive: true });
    } catch (error) {
      console.error('Erreur création dossier:', error);
    }

    // Sauvegarder le fichier
    const filePath = join(uploadDir, fileName);
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    await writeFile(filePath, buffer);

    // Retourner l'URL du fichier
    const fileUrl = `/uploads/${fileName}`;

    return NextResponse.json(
      { url: fileUrl, fileName },
      { status: 200 }
    );
  } catch (error: any) {
    console.error('Erreur upload:', error);
    return NextResponse.json(
      { error: 'Erreur lors de l\'upload du fichier' },
      { status: 500 }
    );
  }
}