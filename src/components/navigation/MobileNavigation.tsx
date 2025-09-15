'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Menu, 
  X, 
  Home, 
  User, 
  Code, 
  Briefcase, 
  Mail, 
  FileText 
} from 'lucide-react';

interface NavItem {
  id: string;
  label: string;
  icon: React.ElementType;
  href: string;
}

const navItems: NavItem[] = [
  { id: 'hero', label: 'Home', icon: Home, href: '#hero' },
  { id: 'about', label: 'About', icon: User, href: '#about' },
  { id: 'skills', label: 'Skills', icon: Code, href: '#skills' },
  { id: 'projects', label: 'Projects', icon: Briefcase, href: '#projects' },
  { id: 'resume', label: 'Resume', icon: FileText, href: '#resume' },
  { id: 'contact', label: 'Contact', icon: Mail, href: '#contact' },
];

const MobileNavigation = () => {
  const [isOpen, setIsOpen] = useState(false);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
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
    <div className="md:hidden fixed bottom-6 right-6 z-50">
      {/* Background Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-background/80 backdrop-blur-sm -z-10"
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
                className="flex items-center gap-3 bg-card/90 backdrop-blur-md text-card-foreground px-4 py-3 rounded-2xl border border-border/50 hover:border-primary/50 transition-colors group shadow-lg hover:shadow-xl"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <item.icon className="w-5 h-5 text-primary" />
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
        animate={isOpen ? "open" : "closed"}
        onClick={toggleMenu}
        className="w-14 h-14 bg-primary text-primary-foreground rounded-2xl flex items-center justify-center shadow-lg hover:shadow-xl transition-shadow glow-on-hover"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        initial={{ scale: 0, opacity: 0 }}
        // animate={{ scale: 1, opacity: 1 }}
        // animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 2, duration: 0.3 }}
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
                className="absolute w-px bg-primary/30"
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