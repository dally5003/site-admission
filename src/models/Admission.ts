import mongoose, { Schema, Document } from 'mongoose';

export interface IAdmission extends Document {
  titre: string;
  organisation: string;
  dateLimit: Date;
  categorie: 'université' | 'bourse' | 'travail' | 'conférence';
  description: string;
  lienExterne: string;
  logo?: string; // URL du logo
  createdAt: Date;
  updatedAt: Date;
}

const AdmissionSchema = new Schema<IAdmission>(
  {
    titre: {
      type: String,
      required: [true, 'Le titre est requis'],
      trim: true,
      maxlength: [200, 'Le titre ne doit pas dépasser 200 caractères'],
    },
    organisation: {
      type: String,
      required: [true, "L'organisation est requise"],
      trim: true,
    },
    dateLimit: {
      type: Date,
      required: [true, 'La date limite est requise'],
    },
    categorie: {
      type: String,
      enum: ['université', 'bourse', 'travail', 'conférence'],
      required: [true, 'La catégorie est requise'],
    },
    description: {
      type: String,
      required: [true, 'La description est requise'],
      minlength: [20, 'La description doit contenir au moins 20 caractères'],
    },
    lienExterne: {
      type: String,
      required: [true, 'Le lien externe est requis'],
      match: [/^https?:\/\/.+/, 'Doit être une URL valide'],
    },
    logo: {
      type: String,
      default: null,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.models.Admission ||
  mongoose.model<IAdmission>('Admission', AdmissionSchema);