// src/components/Footer.tsx
'use client';

import Link from 'next/link';
import { useTranslation } from '@/hooks/useTranslation';

export default function Footer() {
  const { t } = useTranslation();
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-slate-900 text-slate-300 border-t border-slate-800">
      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          {/* Column 1: About */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-400 to-blue-600 rounded-lg flex items-center justify-center font-bold text-sm">
                📋
              </div>
              <h3 className="text-lg font-bold text-white">{t('header.title')}</h3>
            </div>
            <p className="text-sm text-slate-400 leading-relaxed mb-4">
              {t('footer.aboutUs')}
            </p>
            <div className="flex gap-3">
              <a
                href="#"
                className="w-10 h-10 bg-slate-800 hover:bg-blue-600 rounded-lg flex items-center justify-center transition-colors duration-300"
                aria-label="Facebook"
              >
                <span className="text-lg">f!!!</span>
              </a>
              <a
                href="#"
                className="w-10 h-10 bg-slate-800 hover:bg-blue-600 rounded-lg flex items-center justify-center transition-colors duration-300"
                aria-label="Twitter"
              >
                <span className="text-lg">𝕏!!!</span>
              </a>
              <a
                href="#"
                className="w-10 h-10 bg-slate-800 hover:bg-blue-600 rounded-lg flex items-center justify-center transition-colors duration-300"
                aria-label="LinkedIn"
              >
                <span className="text-lg">in!!!</span>
              </a>
              <a
                href="#"
                className="w-10 h-10 bg-slate-800 hover:bg-blue-600 rounded-lg flex items-center justify-center transition-colors duration-300"
                aria-label="Instagram"
              >
                <span className="text-lg">IG!!!</span>
              </a>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h4 className="text-white font-semibold mb-4">{t('footer.quickLinks')}</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-slate-400 hover:text-blue-400 transition-colors duration-200">
                  {t('footer.home')}
                </Link>
              </li>
              <li>
                <Link href="/" className="text-slate-400 hover:text-blue-400 transition-colors duration-200">
                  {t('footer.allAnnouncements')}
                </Link>
              </li>
              <li>
                <Link href="/" className="text-slate-400 hover:text-blue-400 transition-colors duration-200">
                  {t('footer.newOpportunities')}
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Categories */}
          <div>
            <h4 className="text-white font-semibold mb-4">{t('footer.categories')}</h4>
            <ul className="space-y-2">
              <li>
                <a href="/?categorie=université" className="text-slate-400 hover:text-blue-400 transition-colors duration-200">
                  {t('footer.universities')}
                </a>
              </li>
              <li>
                <a href="/?categorie=bourse" className="text-slate-400 hover:text-blue-400 transition-colors duration-200">
                  {t('footer.scholarships')}
                </a>
              </li>
              <li>
                <a href="/?categorie=travail" className="text-slate-400 hover:text-blue-400 transition-colors duration-200">
                  {t('footer.jobs')}
                </a>
              </li>
              <li>
                <a href="/?categorie=conférence" className="text-slate-400 hover:text-blue-400 transition-colors duration-200">
                  {t('footer.conferences')}
                </a>
              </li>
            </ul>
          </div>

          {/* Column 4: Contact */}
          <div>
            <h4 className="text-white font-semibold mb-4">{t('footer.contact')}</h4>
            <ul className="space-y-3">
              <li>
                <p className="text-slate-400 text-sm">
                  <span className="font-medium">{t('footer.email')}</span>
                  <br />
                  <a href="mailto:contact@admithub.com" className="text-blue-400 hover:text-blue-300">
                    contact@languagelink.com
                  </a>
                </p>
              </li>
              <li>
                <p className="text-slate-400 text-sm">
                  <span className="font-medium">{t('footer.phone')}</span>
                  <br />
                  <a href="tel:+25765998463" className="text-blue-400 hover:text-blue-300">
                    +257 65 99 84 63 !!!!!!!
                  </a>
                </p>
              </li>
              <li>
                <p className="text-slate-400 text-sm">
                  <span className="font-medium">{t('footer.address')}</span>
                  <br />
                  Bujumbura, Burundi
                </p>
              </li>
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-slate-800"></div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-slate-400 text-sm text-center md:text-left">
          <span className="text-white font-semibold">{t('header.title')}</span>. {t('footer.copyright')}
          </p>
        </div>
      </div>

      {/* Decorative Top Border */}
      <div className="h-1 bg-gradient-to-r from-blue-600 via-cyan-500 to-blue-600"></div>
    </footer>
  );
}