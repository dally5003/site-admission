// src/app/layout.tsx
import type { Metadata } from 'next';
import { Inter, Poppins } from 'next/font/google';
import { LanguageProvider } from '@/context/LanguageContext';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });
const poppins = Poppins({
  subsets: ['latin'],
  weight: ['400', '600', '700'],
  variable: '--font-poppins',
});

export const metadata: Metadata = {
  title: 'Portail Admissions - Universités, Bourses, Travail, Conférences',
  description:
    'Découvrez les meilleures opportunités d\'admission dans les universités, bourses d\'études, offres d\'emploi et conférences en un seul endroit.',
  keywords: [
    'admission',
    'université',
    'bourse',
    'travail',
    'conférence',
    'opportunités',
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr">
      <body className={`${inter.className} ${poppins.variable}`}>
        <LanguageProvider>
          {children}
        </LanguageProvider>
      </body>
    </html>
  );
}