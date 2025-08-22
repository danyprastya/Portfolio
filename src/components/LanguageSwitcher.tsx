'use client';

import React, { useTransition, ChangeEvent } from 'react';
import { useLocale } from 'next-intl';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import US from "../app/assets/US.png"; // Pastikan path ini benar
import ID from "../app/assets/ID.png"; // Pastikan path ini benar

export default function LanguageSwitcher() {
  const [isPending, startTransition] = useTransition();
  const locale = useLocale();
  const router = useRouter();

  const onSelectChange = (event: ChangeEvent<HTMLSelectElement>) => {
    const nextLocale = event.target.value;
    startTransition(() => {
      router.push(`/${nextLocale}/`);
    });
  };

  const handleButtonClick = (langCode: string) => {
    const syntheticEvent = {
      target: { value: langCode },
    } as React.ChangeEvent<HTMLSelectElement>;
    
    onSelectChange(syntheticEvent);
  };

  return (
    <div className='flex items-center gap-2'>
      {/* Tombol untuk Bahasa Indonesia */}
      <Button
        // Hapus prop 'variant' dari sini
        disabled={isPending || locale === 'id'}
        onClick={() => handleButtonClick('id')}
        // Semua logika styling sekarang ada di dalam className
        className={`transition-all duration-200 flex items-center gap-2 
                    ${locale === 'id' 
                      ? 'bg-transparent border' // Gaya jika AKTIF
                      : 'bg-transparent opacity-50' // Gaya jika TIDAK AKTIF (mirip 'outline')
                    }`}
      >
        <Image src={ID} alt="Bendera Indonesia" width={30} height={20}/>
        ID
      </Button>

      {/* Tombol untuk Bahasa Inggris */}
      <Button
        // Hapus prop 'variant' dari sini
        disabled={isPending || locale === 'en'}
        onClick={() => handleButtonClick('en')}
        className={`transition-all duration-200 flex items-center gap-2 
                    ${locale === 'en' 
                      ? 'bg-transparent border border-white' 
                      : 'bg-transparent opacity-50'
                    }`}
      >
        <Image src={US} alt="USA" width={30} height={20}/>
        EN
      </Button>
    </div>
  );
}