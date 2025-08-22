// components/DownloadCV.tsx
"use client";

import React from 'react';
import { useLocale, useTranslations } from 'next-intl';
import { Download } from 'lucide-react';

const DownloadCV = () => {
  // 1. Dapatkan fungsi terjemahan untuk namespace 'DownloadCV'
  const t = useTranslations('DownloadCV');
  
  // 2. Dapatkan kode bahasa yang sedang aktif (misalnya 'en' atau 'id')
  const locale = useLocale();

  // 3. Buat nama file secara dinamis berdasarkan bahasa yang aktif
  const cvFileName = `CV_Dany(${locale}).pdf`;
  const downloadFileName = `CV_Dany_Prastya(${locale}).pdf`;

  return (
    <a
      // Path href menunjuk ke file di folder /public
      href={`/${cvFileName}`} 
      
      // Atribut download memberitahu browser untuk mengunduh file
      // dengan nama yang sudah disesuaikan bahasanya
      download={downloadFileName} 
      
      className="flex items-center justify-center gap-2 px-4 py-2 rounded-md bg-green-600/70 text-white/70 font-medium hover:bg-green-700 transition-colors"
      aria-label={t('buttonText')}
    >
      
      {/* Teks responsif yang diambil dari file JSON */}
      <span className='hidden sm:inline'>{t('buttonText')}</span>
      <span className='inline sm:hidden'>{t('responsiveButtonText')}</span>
      <Download size={16} /> {/* Ikon Download */}
    </a>
  );
};

export default DownloadCV;