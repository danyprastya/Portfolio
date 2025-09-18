"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Menu,
  X,
  Home,
  User,
  Briefcase,
  Mail,
} from "lucide-react";

interface NavItem {
  id: string;
  label: string;
  icon: React.ElementType;
  href: string;
}

const navItems: NavItem[] = [
  { id: "hero", label: "Home", icon: Home, href: "#" },
  { id: "about", label: "About", icon: User, href: "#about" },
  { id: "projects", label: "Projects", icon: Briefcase, href: "#projects" },
  { id: "contact", label: "Contact", icon: Mail, href: "#contact" },
];

const MobileNavigation = () => {
  const [isOpen, setIsOpen] = useState(false);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
    setIsOpen(false);
  };

  const toggleMenu = () => setIsOpen(!isOpen);

  const menuItemVariants = {
    hidden: {
      scale: 0,
      opacity: 0,
      rotate: -180,
    },
    visible: (i: number) => ({
      scale: 1,
      opacity: 1,
      rotate: 0,
      transition: {
        delay: i * 0.1,
        duration: 0.3,
        ease: "easeOut",
      },
    }),
    exit: (i: number) => ({
      scale: 0,
      opacity: 0,
      rotate: 180,
      transition: {
        delay: (navItems.length - 1 - i) * 0.05,
        duration: 0.2,
      },
    }),
  };

  const fabVariants = {
    closed: { rotate: 0 },
    open: { rotate: 45 },
  };

  return (
    // Changed from md:hidden to lg:hidden to show only on mobile and small tablets
    <div className="lg:hidden fixed bottom-6 right-6 z-50">
      {/* Background Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/20 backdrop-blur-sm -z-10"
            onClick={() => setIsOpen(false)}
          />
        )}
      </AnimatePresence>

      {/* Menu Items */}
      <AnimatePresence>
        {isOpen && (
          <div className="absolute bottom-20 right-0 flex flex-col-reverse gap-4">
            {navItems.map((item, index) => (
              <motion.button
                key={item.id}
                custom={index}
                variants={menuItemVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                onClick={() => scrollToSection(item.id)}
                className="flex items-center gap-3 bg-white/90 dark:bg-gray-900/90 backdrop-blur-md text-gray-900 dark:text-gray-100 px-4 py-3 rounded-2xl border border-gray-200 dark:border-gray-700 hover:border-blue-500 dark:hover:border-blue-400 transition-colors group shadow-lg hover:shadow-xl"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <item.icon className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                <span className="text-sm font-medium whitespace-nowrap">
                  {item.label}
                </span>
              </motion.button>
            ))}
          </div>
        )}
      </AnimatePresence>

      {/* FAB Button */}
      <motion.button
        variants={fabVariants}
        animate={{
          rotate: isOpen ? 45 : 0,
          scale: 1,
          opacity: 1,
        }}
        onClick={toggleMenu}
        className="w-14 h-14 bg-blue-600 text-white rounded-2xl flex items-center justify-center shadow-lg hover:shadow-xl transition-shadow hover:bg-blue-700"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        initial={{ scale: 0, opacity: 0 }}
        transition={{ delay: 0, duration: 0.3 }}
      >
        <AnimatePresence mode="wait">
          {isOpen ? (
            <motion.div
              key="close"
              initial={{ rotate: 90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: -90, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <X className="w-6 h-6" />
            </motion.div>
          ) : (
            <motion.div
              key="menu"
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <Menu className="w-6 h-6" />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.button>

      {/* Connection Lines Animation */}
      <AnimatePresence>
        {isOpen && (
          <div className="absolute bottom-16 right-7 pointer-events-none">
            {navItems.map((_, index) => (
              <motion.div
                key={index}
                className="absolute w-px bg-blue-600/30 dark:bg-blue-400/30"
                style={{
                  height: (index + 1) * 60,
                  bottom: 0,
                }}
                initial={{ scaleY: 0, opacity: 0 }}
                animate={{ scaleY: 1, opacity: 1 }}
                exit={{ scaleY: 0, opacity: 0 }}
                transition={{
                  delay: index * 0.1,
                  duration: 0.3,
                  ease: "easeOut",
                }}
              />
            ))}
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default MobileNavigation;
