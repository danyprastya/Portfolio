// components/About.tsx
"use client";
import React from "react";
import Image from "next/image";
import { useTranslations } from "next-intl"; // Impor useTranslations

// Impor gambar aset Anda
import book from "../app/assets/book.png";
import pc from "../app/assets/pc.png";
import card from "../app/assets/card.png";
import finance from "../app/assets/finance.png";

const About = () => {
  // Gunakan hook useTranslations dengan namespace "About"
  const t = useTranslations('About');

  return (
    <div className="max-w-[1200px] mx-auto px-4" id="about"> {/* Tambahkan px-4 untuk padding di mobile */}

        <h1 className="text-white text-4xl sm:text-5xl md:text-6xl max-w-[320px] mx-auto font-semibold p-4 mb-4 text-center">
            {t('title')} <span className="text-orange-400">{t('me')}</span>
        </h1>

      <div className="grid grid-cols-1 md:grid-cols-8 gap-4 md:gap-6 place-items-center">

        {/* Kartu Pendidikan */}
        <div className="w-full col-span-1 md:col-span-5 relative bg-white/10 backdrop-blur-lg border border-white/20 rounded-xl overflow-hidden">
          <div className="flex flex-col sm:flex-row items-center p-4 sm:p-6 gap-4">
            <Image src={book} alt="Education icon" className="w-auto h-[80px] sm:h-[100px] lg:h-[130px]" />
            <div className="flex flex-col mt-2 sm:mt-4 text-center sm:text-left">
              <h2 className="text-xl sm:text-2xl font-bold text-white/80">{t('educationTitle')}</h2>
              <p className="text-base sm:text-lg text-white/70 mt-2">{t('educationDescription')}</p>
            </div>
          </div>
        </div>

        {/* Kartu Pengalaman */}
        <div className="w-full col-span-1 md:col-span-3 relative bg-white/10 backdrop-blur-lg border border-white/20 rounded-xl overflow-hidden">
          <div className="flex flex-col sm:flex-row items-center p-4 sm:p-6 gap-4">
            <Image src={pc} alt="Experience icon" className="w-auto h-[80px] sm:h-[100px] lg:h-[130px]" />
            <div className="flex flex-col mt-2 sm:mt-4 text-center sm:text-left">
              <h2 className="text-xl sm:text-2xl font-bold text-white/80">{t('experienceTitle')}</h2>
              <p className="text-base sm:text-lg text-white/70 mt-2">{t('experienceDescription')}</p>
            </div>
          </div>
        </div>

        {/* Kartu Keahlian */}
        <div className="w-full col-span-1 md:col-span-3 relative bg-white/10 backdrop-blur-lg border border-white/20 rounded-xl overflow-hidden">
          <div className="flex flex-col sm:flex-row items-center p-4 sm:p-6 gap-4">
            <Image src={card} alt="Skills icon" className="w-auto h-[80px] sm:h-[100px] lg:h-[130px]" />
            <div className="flex flex-col mt-2 sm:mt-4 text-center sm:text-left">
              <h2 className="text-xl sm:text-2xl font-bold text-white/80">{t('skillsTitle')}</h2>
              <p className="text-base sm:text-lg text-white/70 mt-2">{t('skillsDescription')}</p>
            </div>
          </div>
        </div>

        {/* Kartu Minat */}
        <div className="w-full col-span-1 md:col-span-5 relative bg-white/10 backdrop-blur-lg border border-white/20 rounded-xl overflow-hidden">
          <div className="flex flex-col sm:flex-row items-center p-4 sm:p-6 gap-4">
            <Image src={finance} alt="Interests icon" className="w-auto h-[80px] sm:h-[100px] lg:h-[130px]" />
            <div className="flex flex-col mt-2 sm:mt-4 text-center sm:text-left">
              <h2 className="text-xl sm:text-2xl font-bold text-white/80">{t('interestsTitle')}</h2>
              <p className="text-base sm:text-lg text-white/70 mt-2">{t('interestsDescription')}</p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default About;