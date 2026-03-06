// src/models/Comment.ts
import mongoose, { Schema, Document } from 'mongoose';

export interface IComment extends Document {
  text: string;
  name?: string;
  email?: string;
  createdAt: Date;
}

const CommentSchema = new Schema<IComment>(
  {
    text: {
      type: String,
      required: [true, 'Le commentaire est requis'],
      minlength: [10, 'Le commentaire doit contenir au moins 10 caractères'],
      maxlength: [2000, 'Le commentaire ne doit pas dépasser 2000 caractères'],
    },
    name: {
      type: String,
      trim: true,
      default: 'Anonyme',
    },
    email: {
      type: String,
      trim: true,
      default: null,
      sparse: true,
      match: [
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
        'Email invalide',
      ],
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.models.Comment ||
  mongoose.model<IComment>('Comment', CommentSchema);