"use client";

import React, { useState } from "react";
import { useTranslations } from "next-intl";
import LanguageSwitcher from "./LanguageSwitcher";
import DownloadCV from "./DownloadCV";

import {
  Navbar,
  NavBody,
  NavItems,
  MobileNav,
  NavbarLogo,
  NavbarButton,
  MobileNavHeader,
  MobileNavToggle,
  MobileNavMenu,
} from "@/components/ui/resizable-navbar";

const NavbarPorto = () => {
  const t = useTranslations("Navigation");

  const navLinks = [
    { name: t("about"), link: "#about" },
    { name: t("portfolio"), link: "#portfolio" },
    { name: t("contact"), link: "#contact" },
  ];

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <Navbar className="top-0">
      <NavBody className="bg-black  border border-white">
        <NavItems items={navLinks} className="text-white"/>
          <LanguageSwitcher />
          <DownloadCV />
      </NavBody>
      <MobileNav className="bg-white border border-white">
          <MobileNavHeader>

            <MobileNavToggle
              isOpen={isMobileMenuOpen}
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            />
          </MobileNavHeader>
 
          <MobileNavMenu
            isOpen={isMobileMenuOpen}
            onClose={() => setIsMobileMenuOpen(false)}
          >
            {navLinks.map((item, idx) => (
              <a
                key={`mobile-link-${idx}`}
                href={item.link}
                onClick={() => setIsMobileMenuOpen(false)}
                className="relative text-neutral-600 dark:text-neutral-300"
              >
                <span className="block">{item.name}</span>
              </a>
            ))}
            <div className="flex w-full flex-col gap-4">
            </div>
          </MobileNavMenu>
        </MobileNav>
    </Navbar>
  );
};

export default NavbarPorto;
