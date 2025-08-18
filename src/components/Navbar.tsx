"use client";

import Link from "next/link";
import React, { useState, useEffect, useRef, useTransition } from "react";
import { AiOutlineMenu, AiOutlineClose } from "react-icons/ai";
import { motion, AnimatePresence } from "framer-motion";
import { useLocale, useTranslations } from "next-intl";
// --- HANYA GUNAKAN IMPOR DARI NEXT/NAVIGATION ---
import { useRouter, usePathname } from 'next/navigation'; 

// --- Komponen LanguageSwitcher ---
const LanguageSwitcher = () => {
  const languages = [
    { code: "id", label: "Indonesia", flag: "🇮🇩" },
    { code: "en", label: "English", flag: "🇬🇧" },
  ];

  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  
  const locale = useLocale(); // Dari next-intl (ini sudah benar)
  const router = useRouter(); // Dari next/navigation
  const pathname = usePathname(); // Dari next/navigation
  const [isPending, startTransition] = useTransition(); // Hook dari React untuk transisi

  const selectedLang = languages.find(l => l.code === locale) || languages[1];

  const toggleDropdown = () => setIsOpen(!isOpen);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [dropdownRef]);

  // --- FUNGSI PENGGANTI BAHASA (LOGIKA BARU) ---
  const handleSelectLang = (nextLocale: string) => {
    setIsOpen(false);
    
    startTransition(() => {
      // `pathname` dari next/navigation berisi path lengkap (misal: /en/about)
      // Kita perlu menghapus prefix bahasa saat ini untuk mendapatkan path dasarnya
      const currentPathWithoutLocale = pathname.replace(`/${locale}`, '');
      
      // Buat URL baru dengan locale yang dipilih. Handle kasus homepage.
      const newUrl = `/${nextLocale}${currentPathWithoutLocale || '/'}`;
      
      // Gunakan router.replace standar untuk navigasi.
      // Tidak ada opsi { locale: ... }, kita langsung berikan URL lengkap.
      router.replace(newUrl);
    });
  };

  return (
    <div ref={dropdownRef} className="relative z-50">
      <button
        onClick={toggleDropdown}
        disabled={isPending}
        className="flex items-center gap-2 px-3 py-1.5 border border-white/20 rounded-lg backdrop-blur-sm 
                   transition-all duration-300 hover:border-white/50 hover:bg-white/10
                   shadow-[0_0_5px_rgba(255,255,255,0.3),_0_0_10px_rgba(255,255,255,0.2)] disabled:opacity-50"
      >
        <span className="text-xl">{selectedLang.flag}</span>
        <span className="text-sm font-medium text-white/80">{selectedLang.code.toUpperCase()}</span>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2, ease: "easeInOut" }}
            className="absolute top-full right-0 mt-2 w-40 origin-top-right rounded-lg border border-white/20 
                       bg-black/50 backdrop-blur-md overflow-hidden
                       shadow-[0_0_8px_rgba(255,255,255,0.3),_0_0_15px_rgba(255,255,255,0.2)]"
          >
            <ul className="text-white/90">
              {languages.map((lang) => (
                <li
                  key={lang.code}
                  onClick={() => handleSelectLang(lang.code)}
                  className="flex cursor-pointer items-center gap-3 px-4 py-2 text-sm transition-colors hover:bg-white/10"
                >
                  <span className="text-xl">{lang.flag}</span>
                  <span>{lang.label}</span>
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

// --- Komponen Navbar Utama (Tidak ada perubahan di sini) ---
const Navbar = () => {
  const t = useTranslations('Navigation');
  const [nav, setNav] = useState(false);

  const toggleNav = () => setNav(!nav);
  const closeNav = () => setNav(false);

  const navLinks = [
    { title: t('about'), path: "#about" },
    { title: t('portfolio'), path: "#portfolio" },
  ];

  const menuVariants = {
    open: { x: 0, transition: { stiffness: 20, damping: 15 } },
    closed: { x: "-100%", transition: { stiffness: 20, damping: 15 } },
  };

  return (
    <div className="text-white/70 pt-6">
      <div className="relative flex items-center justify-center">
        <div className="hidden md:flex items-center px-4 py-2 mx-auto max-w-[400px]">
          <ul className="flex flex-row p-4 space-x-8">
            {navLinks.map((link, index) => (
              <li key={index}>
                <Link href={link.path}>
                  <p>{link.title}</p>
                </Link>
              </li>
            ))}
            <li>
              <a href="#contact" className="group">
                <h1 className="text-lg font-bold text-white/70 cursor-pointer">
                  {t('contact')}
                </h1>
                <div className="relative">
                  <div className="absolute w-2/3 h-1 transition-all duration-300 ease-out bg-orange-400 rounded-full group-hover:w-full"></div>
                  <div className="absolute mt-1 w-1/3 h-1 transition-all duration-300 ease-out bg-orange-600 rounded-full group-hover:w-full"></div>
                </div>
              </a>
            </li>
          </ul>
        </div>
        <div className="hidden md:block absolute top-1/2 -translate-y-1/2 right-6">
            <LanguageSwitcher />
        </div>
      </div>
      <div
        onClick={toggleNav}
        className="md:hidden absolute top-5 right-5 text-white/70 border rounded border-white/70 p-2 z-50"
      >
        {nav ? <AiOutlineClose size={30} /> : <AiOutlineMenu size={30} />}
      </div>
      <div className="md:hidden absolute top-5 left-5 z-50">
        <LanguageSwitcher />
      </div>
      <motion.div
        initial={false}
        animate={nav ? "open" : "closed"}
        variants={menuVariants}
        className="fixed left-0 top-0 w-full z-40 bg-black/90 h-full"
      >
        <ul className="text-4xl font-semibold my-24 text-center space-y-8">
          {navLinks.map((link, index) => (
            <li key={index}>
              <Link href={link.path} onClick={closeNav}>
                {link.title}
              </Link>
            </li>
          ))}
          <li>
            <a href="#contact" onClick={closeNav} className="group">
              {t('contact')}
            </a>
          </li>
        </ul>
      </motion.div>
    </div>
  );
};

export default Navbar;