"use client";
import React from "react";
import Image from "next/image";
import cursor from "../app/assets/icon1.png";
import message from "../app/assets/icon2.png";
import { motion } from "framer-motion";
import StarrySky from "./StarrySky";
import { useRef } from "react"; // Impor useRef

const Hero = () => {
  // 1. Buat ref untuk kontainer yang akan menjadi batasan drag
  const constraintsRef = useRef(null);

  return (
    // Tambahkan `ref` dan pastikan `relative` agar anak absolutnya terkandung
    <div ref={constraintsRef} className="py-12 sm:py-24 relative overflow-hidden min-h-[600px] sm:min-h-screen flex flex-col justify-center">
      <StarrySky />

      <div className="relative z-10"> {/* Kontainer untuk konten agar di atas StarrySky */}
        <div className="font-bold text-center
                        text-5xl            /* xs */
                        sm:text-6xl         /* sm */
                        md:text-7xl         /* md */
                        lg:text-8xl         /* lg & xl */
                        ">
          <h1 className="text-[#98B4CE]">Hi, I am</h1>
          <h1 className="text-[#E48A57]">Dany Prastya</h1>
        </div>

        {/* Ikon Cursor */}
        <motion.div
          className="absolute 
                     top-[12%] left-[5%]      /* Posisi responsif */
                     md:top-[25%] md:left-[15%]
                     lg:top-[170px] lg:left-[220px] /* Posisi asli untuk layar besar */
                     xl:left-[280px]"
          // 2. Terapkan batasan drag dan efek pantul
          drag
          dragConstraints={constraintsRef}
          dragTransition={{ bounceStiffness: 500, bounceDamping: 50 }}
          // 3. Tambahkan animasi mengambang
          animate={{
            y: [0, -45, 0], // Bergerak naik-turun 15px
            rotate: [0, 25, 0], // Berputar 8 derajat
          }}
          transition={{
            duration: 5, // Durasi 7 detik untuk satu siklus
            repeat: Infinity,
            repeatType: "mirror", // Bergerak bolak-balik
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
                     lg:top-[20px] lg:right-[180px] /* Posisi asli untuk layar besar */
                     xl:right-[220px]"
          // 2. Terapkan batasan drag dan efek pantul
          drag
          dragConstraints={constraintsRef}
          dragTransition={{ bounceStiffness: 500, bounceDamping: 50 }}
          // 3. Tambahkan animasi mengambang (dengan nilai berbeda agar tidak sinkron)
          animate={{
            y: [0, 30, -40, 0], // Pergerakan lebih kompleks
            rotate: [0, -15, 25, 0], // Perputaran bolak-balik
          }}
          transition={{
            duration: 8, // Durasi berbeda
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
        I am a Frontend Developer who focused on building websites with clean
        code and provide good experience for users
      </p>
    </div>
  );
};

export default Hero;