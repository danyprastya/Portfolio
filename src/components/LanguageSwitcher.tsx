"use client";

import React, { useTransition } from 'react';
import { useLocale } from 'next-intl';

// --- PERBAIKAN UTAMA DI SINI ---
// Impor useRouter dan usePathname dari 'next-intl/navigation'
// Ini adalah hook khusus untuk navigasi yang sadar-bahasa (locale-aware)
import { usePathname, useRouter } from 'next/navigation';

export default function LanguageSwitcher() {
  const [isPending, startTransition] = useTransition();
  const locale = useLocale();

  // Gunakan hook yang sudah diimpor dengan benar
  const router = useRouter();
  const pathname = usePathname();

  const onSelectChange = (nextLocale: string) => {
    // startTransition digunakan untuk menandai bahwa perubahan ini
    // akan menyebabkan update UI yang mungkin tidak instan.
    startTransition(() => {
      // Gunakan router.replace dengan opsi `locale`.
      // Ini adalah cara resmi dari next-intl untuk mengubah bahasa
      // tanpa harus mengatur cookie secara manual.
    //   router.replace(pathname, { locale: nextLocale });
    });
  };

  return (
    <div className="flex items-center gap-x-2 sm:gap-x-4">
      {/* Tombol untuk Bahasa Inggris */}
      <button 
        onClick={() => onSelectChange('en')} 
        disabled={isPending || locale === 'en'}
        className="flex items-center gap-2 p-2 rounded-md transition-opacity disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-100/10"
        aria-label="Switch to English"
      >
        <span className="text-xl">🇬🇧</span>
        <span className="hidden sm:inline font-medium text-white/80">English</span>
      </button>

      {/* Tombol untuk Bahasa Indonesia */}
      <button 
        onClick={() => onSelectChange('id')} 
        disabled={isPending || locale === 'id'}
        className="flex items-center gap-2 p-2 rounded-md transition-opacity disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-100/10"
        aria-label="Ganti ke Bahasa Indonesia"
      >
        <span className="text-xl">🇮🇩</span>
        <span className="hidden sm:inline font-medium text-white/80">Indonesia</span>
      </button>
    </div>
  );
}