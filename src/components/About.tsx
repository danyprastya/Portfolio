"use client";

import React, {useRef} from "react";
import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import AnimatedCharacter from "./AnimatedCharacter";

// Impor ikon-ikon untuk skill Anda dari react-icons
import { 
  SiReact, SiNextdotjs, SiVuedotjs, SiAngular, SiNodedotjs, SiExpress,
  SiTailwindcss, SiFramer, SiThreedotjs, SiGit, SiFigma, SiFirebase,
  SiFlutter, SiAndroidstudio, SiKotlin, SiSwift, SiArduino, SiRaspberrypi,
  SiPython, SiPandas, SiNumpy, SiTensorflow, SiPostgresql, SiMongodb
} from "react-icons/si";

// Komponen Progress Ring (lingkaran progress)
const ProgressRing = ({ percentage, language }: { percentage: number, language: string }) => {
  const radius = 30;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (percentage / 100) * circumference;

  return (
    <div className="flex flex-col items-center gap-2">
      <svg className="w-32 h-32 transform -rotate-90" viewBox="0 0 120 120">
        <circle
          className="text-white/10"
          strokeWidth="8"
          stroke="currentColor"
          fill="transparent"
          r={radius}
          cx="60"
          cy="60"
        />
        <motion.circle
          className="text-cyan-300"
          strokeWidth="8"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
          stroke="currentColor"
          fill="transparent"
          r={radius}
          cx="60"
          cy="60"
          initial={{ strokeDashoffset: circumference }}
          whileInView={{ strokeDashoffset: offset }}
          viewport={{ once: true }}
          transition={{ duration: 1.5, ease: "easeOut", delay: 0.5 }}
        />
      </svg>
      <span className="text-white/80 font-semibold text-lg absolute mt-[44px]">{percentage}%</span>
      <span className="text-white/70 font-medium">{language}</span>
    </div>
  );
};


const About = () => {
  const marqueeRef = useRef(null); // Ref untuk batasan drag marquee


  // Definisikan frameworks/tools dan bahasa pemrograman secara terpisah
  const frameworksAndTools = [
    { name: "React", icon: <SiReact className="mr-2" /> },
    { name: "Next.js", icon: <SiNextdotjs className="mr-2" /> },
    { name: "Vue.js", icon: <SiVuedotjs className="mr-2" /> },
    { name: "Angular", icon: <SiAngular className="mr-2" /> },
    { name: "Node.js", icon: <SiNodedotjs className="mr-2" /> },
    { name: "Express.js", icon: <SiExpress className="mr-2" /> },
    { name: "Tailwind CSS", icon: <SiTailwindcss className="mr-2" /> },
    { name: "Framer Motion", icon: <SiFramer className="mr-2" /> },
    { name: "Three.js", icon: <SiThreedotjs className="mr-2" /> },
    { name: "Git", icon: <SiGit className="mr-2" /> },
    { name: "Firebase", icon: <SiFirebase className="mr-2" /> },
  ];

  const mobileAndIoT = [
    { name: "Flutter", icon: <SiFlutter className="mr-2" /> },
    { name: "Android Studio", icon: <SiAndroidstudio className="mr-2" /> },
    { name: "Kotlin", icon: <SiKotlin className="mr-2" /> },
    { name: "Swift", icon: <SiSwift className="mr-2" /> },
    { name: "Arduino", icon: <SiArduino className="mr-2" /> },
    { name: "Raspberry Pi", icon: <SiRaspberrypi className="mr-2" /> },
  ];
  
  const dataSkills = [
      { name: "Python", icon: <SiPython className="mr-2" />},
      { name: "Pandas", icon: <SiPandas className="mr-2" />},
      { name: "NumPy", icon: <SiNumpy className="mr-2" />},
      { name: "TensorFlow", icon: <SiTensorflow className="mr-2" />},
      { name: "PostgreSQL", icon: <SiPostgresql className="mr-2" />},
      { name: "MongoDB", icon: <SiMongodb className="mr-2" />},
  ]
  

  const programmingLanguages = [
    { name: "TypeScript", percentage: 90 },
    { name: "JavaScript", percentage: 95 },
    { name: "Python", percentage: 80 },
    { name: "Kotlin", percentage: 75 },
  ];

  return (
    <div 
      className="max-w-6xl mx-auto py-20 px-4 sm:px-6 lg:px-8 min-h-screen flex items-center" 
      id="about"
    >
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-10 lg:gap-16 items-center">
        
        {/* Kolom Kiri: Model 3D */}
        <motion.div 
          className="w-full h-[400px] md:h-[600px] cursor-grab active:cursor-grabbing lg:col-span-2"
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <AnimatedCharacter/>

        </motion.div>

        {/* Kolom Kanan: Teks Konten */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          className="flex flex-col gap-8 lg:col-span-3"
        >
          {/* Bagian Profil */}
          <div>
            <h1 className="text-3xl sm:text-4xl font-bold text-white mb-4">
              Tentang <span className="text-orange-400">Saya</span>
            </h1>
            <p className="text-white/80 leading-relaxed text-sm sm:text-base">
              Saya adalah seorang Frontend Developer yang bersemangat dalam mengubah ide-ide kreatif 
              menjadi pengalaman digital yang mulus dan interaktif. Dengan latar belakang di bidang 
              Ilmu Komputer, saya menikmati setiap proses dalam pengembangan web, mulai dari 
              konsep hingga implementasi akhir.
            </p>
          </div>
          
          {/* Bagian Frameworks & Tools */}
          <div>
            <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4">Frameworks & <span className="text-orange-400">Tools</span></h2>
            {/* Kontainer Marquee 2 Baris */}
            <motion.div 
              ref={marqueeRef}
              whileHover={{ 
                scale: 1.05,
                transition: { duration: 0.3 }
              }}
              className="relative w-full flex flex-col gap-3 overflow-hidden cursor-grab active:cursor-grabbing [mask-image:linear-gradient(to_right,transparent,white_5%,white_95%,transparent)]">
              {/* Baris 1 (Bergerak ke Kiri) */}
              <motion.div 
              className="flex w-max"
              drag="x" // Aktifkan drag horizontal
              dragConstraints={marqueeRef} // Batasi drag di dalam kontainer
              whileHover={{ animationPlayState: 'paused' }}
              >
                <div className="flex marquee-content-1">
                  {[...frameworksAndTools, ...frameworksAndTools].map((skill, index) => (
                    <Badge key={`fw1-${index}`} variant="outline" className="flex items-center text-cyan-300 border-cyan-300/50 text-sm sm:text-base whitespace-nowrap mx-2 py-1.5 px-4">
                      {skill.icon}
                      {skill.name}
                    </Badge>
                  ))}
                </div>
              </motion.div>

              {/* Baris 2 (Bergerak ke Kanan) */}
              <motion.div 
              className="flex w-max"
              drag="x" // Aktifkan drag horizontal
              dragConstraints={marqueeRef} // Batasi drag di dalam kontainer
              whileHover={{ animationPlayState: 'paused' }}
              >
                <div className="flex marquee-content-2">
                  {[...mobileAndIoT, ...dataSkills, ...mobileAndIoT, ...dataSkills].map((skill, index) => (
                    <Badge key={`ma1-${index}`} variant="outline" className="flex items-center text-orange-300 border-orange-300/50 text-base sm:text-lg whitespace-nowrap mx-3 py-2 px-5">
                      {skill.icon}
                      {skill.name}
                    </Badge>
                  ))}
                </div>
              </motion.div>
            </motion.div>
          </div>

          {/* Bagian Bahasa Pemrograman */}
          <div>
            <h2 className="text-2xl sm:text-3xl font-bold text-white mb-6">Bahasa <span className="text-orange-400">Pemrograman</span></h2>
            <div className="flex flex-wrap justify-center sm:justify-start gap-4 sm:gap-6">
              {programmingLanguages.map(lang => (
                <ProgressRing key={lang.name} percentage={lang.percentage} language={lang.name} />
              ))}
            </div>
          </div>
        </motion.div>
        
      </div>
    </div>
  );
};

export default About;