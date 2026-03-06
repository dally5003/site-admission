// src/lib/mongodb.ts
import mongoose from 'mongoose';

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  throw new Error('Veuillez définir la variable MONGODB_URI dans .env.local');
}

let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

export async function connectDB() {
  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    const opts = {
      bufferCommands: false,
    };

    cached.promise = mongoose
        .connect(MONGODB_URI!, opts)
        .then((mongoose) => {
          console.log('Connecté à MongoDB');
          return mongoose;
        }) as Promise<typeof mongoose>;
  }

  try {
    cached.conn = await cached.promise;
  } catch (e) {
    cached.promise = null;
    throw e;
  }

  return cached.conn;
}

declare global {
  var mongoose: {
    conn: Awaited<ReturnType<typeof import('mongoose').connect>> | null;
    promise: Promise<Awaited<ReturnType<typeof import('mongoose').connect>>> | null;
  };
}