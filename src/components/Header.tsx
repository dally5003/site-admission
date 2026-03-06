// src/components/Header.tsx
'use client';

import Link from 'next/link';
import { useState } from 'react';
import { useTranslation } from '@/hooks/useTranslation';
import LanguageSwitcher from './LanguageSwitcher';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isCategoryOpen, setIsCategoryOpen] = useState(false);
  const { t } = useTranslation();

  return (
    <header className="bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 text-white sticky top-0 z-50 shadow-2xl border-b border-slate-700">
      <div className="max-w-7xl mx-auto px-4">
        {/* Top Bar */}
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-400 to-blue-600 rounded-lg flex items-center justify-center font-bold text-lg group-hover:shadow-lg group-hover:shadow-blue-500/50 transition-all duration-300">
              📋
            </div>
            <div>
              <h1 className="text-xl font-bold bg-gradient-to-r from-blue-400 to-cyan-300 bg-clip-text text-transparent">
                {t('header.title')}
              </h1>
              <p className="text-xs text-slate-400">{t('header.subtitle')}</p>
            </div>
          </Link>

          {/* Navigation Desktop */}
          <nav className="hidden md:flex items-center gap-8">
            <Link
              href="/"
              className="text-slate-300 hover:text-white transition-colors duration-200 font-medium relative group"
            >
              {t('header.home')}
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-400 group-hover:w-full transition-all duration-300"></span>
            </Link>
            <div className="relative group">
              <button className="text-slate-300 hover:text-white transition-colors duration-200 font-medium relative flex items-center gap-1 cursor-pointer">
                {t('header.categories')}
                <span className="text-xs">▼</span>
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-400 group-hover:w-full transition-all duration-300"></span>
              </button>
              
              {/* Menu déroulant */}
              <div className="absolute left-0 mt-0 w-48 bg-slate-800 rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 pt-2 z-50">
                <Link
                  href="/?categorie=université"
                  className="block px-4 py-3 text-slate-300 hover:text-white hover:bg-slate-700 transition-colors"
                >
                  {t('categoryNames.université')}
                </Link>
                <Link
                  href="/?categorie=bourse"
                  className="block px-4 py-3 text-slate-300 hover:text-white hover:bg-slate-700 transition-colors"
                >
                  {t('categoryNames.bourse')}
                </Link>
                <Link
                  href="/?categorie=travail"
                  className="block px-4 py-3 text-slate-300 hover:text-white hover:bg-slate-700 transition-colors"
                >
                 {t('categoryNames.travail')}
                </Link>
                <Link
                  href="/?categorie=conférence"
                  className="block px-4 py-3 text-slate-300 hover:text-white hover:bg-slate-700 transition-colors rounded-b-lg"
                >
                  {t('categoryNames.conférence')}
                </Link>
              </div>
            </div>
            <a
              href="#about"
              className="text-slate-300 hover:text-white transition-colors duration-200 font-medium relative group cursor-pointer"
            >
              {t('header.about')}
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-400 group-hover:w-full transition-all duration-300"></span>
            </a>
            <a
              href="#contact"
              className="text-slate-300 hover:text-white transition-colors duration-200 font-medium relative group cursor-pointer"
            >
              {t('header.contact')}
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-400 group-hover:w-full transition-all duration-300"></span>
            </a>
          </nav>

          {/* CTA Button + Mobile Menu */}
          <div className="flex items-center gap-4">
            <LanguageSwitcher />
            <button className="hidden md:inline-block px-6 py-2 bg-gradient-to-r from-blue-500 to-cyan-500 text-white font-semibold rounded-lg hover:shadow-lg hover:shadow-blue-500/50 transition-all duration-300 hover:scale-105">
              {t('header.signup')}
            </button>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden flex flex-col gap-1.5 w-6 h-6 justify-center"
            >
              <span
                className={`h-0.5 bg-white transition-all duration-300 ${
                  isMenuOpen ? 'rotate-45 translate-y-2' : ''
                }`}
              ></span>
              <span
                className={`h-0.5 bg-white transition-all duration-300 ${
                  isMenuOpen ? 'opacity-0' : ''
                }`}
              ></span>
              <span
                className={`h-0.5 bg-white transition-all duration-300 ${
                  isMenuOpen ? '-rotate-45 -translate-y-2' : ''
                }`}
              ></span>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <nav className="md:hidden pb-4 space-y-3 border-t border-slate-700 pt-4">
            <Link href="#" className="block text-slate-300 hover:text-white py-2 font-medium">
              {t('header.home')}
            </Link>
            <Link href="#categories" className="block text-slate-300 hover:text-white py-2 font-medium">
              {t('header.categories')}
            </Link>
            <Link href="#about" className="block text-slate-300 hover:text-white py-2 font-medium">
              {t('header.about')}
            </Link>
            <Link href="#contact" className="block text-slate-300 hover:text-white py-2 font-medium">
              {t('header.contact')}
            </Link>
            <button className="w-full px-6 py-2 bg-gradient-to-r from-blue-500 to-cyan-500 text-white font-semibold rounded-lg mt-4">
              {t('header.signup')}
            </button>
          </nav>
        )}
      </div>

      {/* Animated Bottom Border */}
      <div className="h-1 bg-gradient-to-r from-blue-500 via-cyan-400 to-blue-600"></div>
    </header>
  );
}