// components/Hero.tsx
"use client";
import React from "react";
import StarrySky from "./StarrySky";
import { useRef } from "react";
import { useTranslations } from "next-intl"; // Impor useTranslations
import IconCursor from "./misc/IconCursor";
import IconBolt from "./misc/IconBolt";

const Hero = () => {
  const t = useTranslations('Hero'); // Gunakan hook useTranslations dengan namespace "Hero"
  const constraintsRef = useRef(null);

  return (
    <div ref={constraintsRef} className="py-12 sm:py-24 relative overflow-hidden min-h-[600px] sm:min-h-screen flex flex-col gap-10 justify-center">
      <StarrySky />

      <div className="relative z-10">
        <div className="font-bold text-center z-20
                        text-5xl            /* xs */
                        sm:text-6xl         /* sm */
                        md:text-7xl         /* md */
                        lg:text-8xl         /* lg & xl */
                        ">
          <h1 className="text-[#98B4CE]">{t('greeting')}</h1>
          <h1 className="text-[#E48A57]">{t('name')}</h1>
        </div>

        {/* Ikon Cursor */}
        <IconCursor/>

        {/* Ikon Message */}
        <IconBolt/>
      </div>
      <p className="relative z-10 text-center mx-auto mt-6 sm:mt-8 text-white/80 font-bold
                    max-w-[80vw] text-sm       /* xs */
                    sm:max-w-md sm:text-base   /* sm */
                    md:text-lg                 /* md */
                    lg:text-xl lg:max-w-[500px]  /* lg & xl */
                    ">
        {t('description')}
      </p>

    </div>
  );
};

export default Hero;