// components/Hero.tsx
"use client";
import React from "react";
import Image from "next/image";
import cursor from "../app/assets/icon1.png";
import message from "../app/assets/icon2.png";
import { motion } from "framer-motion";
import StarrySky from "./StarrySky";
import { useRef } from "react";
import { useTranslations } from "next-intl"; // Impor useTranslations

const Hero = () => {
  const t = useTranslations('Hero'); // Gunakan hook useTranslations dengan namespace "Hero"
  const constraintsRef = useRef(null);

  return (
    <div ref={constraintsRef} className="py-12 sm:py-24 relative overflow-hidden min-h-[600px] sm:min-h-screen flex flex-col gap-10 justify-center">
      <StarrySky />

      <div className="relative z-10">
        <div className="font-bold text-center
                        text-5xl            /* xs */
                        sm:text-6xl         /* sm */
                        md:text-7xl         /* md */
                        lg:text-8xl         /* lg & xl */
                        ">
          <h1 className="text-[#98B4CE]">{t('greeting')}</h1>
          <h1 className="text-[#E48A57]">{t('name')}</h1>
        </div>

        {/* Ikon Cursor */}
        <motion.div
          className="absolute 
                     top-[12%] left-[5%]      /* Posisi responsif */
                     md:top-[25%] md:left-[15%]
                     lg:top-[250px] lg:left-[220px] /* Posisi asli untuk layar besar */
                     xl:left-[90px]"
          drag
          dragConstraints={constraintsRef}
          dragTransition={{ bounceStiffness: 500, bounceDamping: 50 }}
          animate={{
            y: [0, -45, 0],
            rotate: [0, 25, 0],
          }}
          transition={{
            duration: 5,
            repeat: Infinity,
            repeatType: "mirror",
            ease: "easeInOut",
          }}
        >
          <Image
            src={cursor}
            height={170}
            width={170}
            alt="cursor icon"
            className="w-[80px] h-auto            /* xs */
                       sm:w-[100px]              /* sm */
                       md:w-[130px]              /* md */
                       lg:w-[170px]              /* lg & xl */
                       "
            draggable="false"
          />
        </motion.div>

        {/* Ikon Message */}
        <motion.div
          className="absolute
                     top-[5%] right-[5%]       /* Posisi responsif */
                     md:top-[10%] md:right-[15%]
                     lg:-top-[200px] lg:right-[180px] /* Posisi asli untuk layar besar */
                     xl:right-[200px]"
          drag
          dragConstraints={constraintsRef}
          dragTransition={{ bounceStiffness: 500, bounceDamping: 50 }}
          animate={{
            y: [0, 30, -40, 0],
            rotate: [0, -15, 25, 0],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            repeatType: "mirror",
            ease: "easeInOut",
          }}
        >
          <Image
            src={message}
            height={120}
            width={120}
            alt="message icon"
            className="w-[60px] h-auto             /* xs */
                       sm:w-[80px]               /* sm */
                       md:w-[100px]              /* md */
                       lg:w-[120px]              /* lg & xl */
                       "
            draggable="false"
          />
        </motion.div>
      </div>
      <p className="relative z-10 text-center mx-auto mt-6 sm:mt-8 text-white/80
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