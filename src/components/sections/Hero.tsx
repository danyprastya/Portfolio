"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ChevronDown, Download, ExternalLink } from "lucide-react";
import socialData from "@/data/social.json";

const Hero = () => {
  const [displayText, setDisplayText] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const texts = [
      "Full-Stack Developer",
      "Mobile App Developer",
      "IoT System Builder",
      "Data Scientist",
      "Tech Innovator",
    ];
    const currentText = texts[currentIndex];
    const shouldDelete = isDeleting;

    const timeout = setTimeout(
      () => {
        if (!shouldDelete && displayText === currentText) {
          // Pause before deleting
          setTimeout(() => setIsDeleting(true), 2000);
        } else if (shouldDelete && displayText === "") {
          // Move to next text
          setIsDeleting(false);
          setCurrentIndex((prev) => (prev + 1) % texts.length);
        } else {
          // Type or delete character
          setDisplayText((prev) =>
            shouldDelete
              ? prev.slice(0, -1)
              : currentText.slice(0, prev.length + 1)
          );
        }
      },
      shouldDelete ? 50 : 100
    );

    return () => clearTimeout(timeout);
  }, [displayText, currentIndex, isDeleting]);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section
      id="hero"
      className="relative flex items-center justify-center min-h-screen overflow-hidden"
    >
      {/* Content */}
      <div className="relative z-10 container-custom section-padding text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="space-y-8"
        >
          {/* Greeting */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-lg sm:text-xl text-muted-foreground"
          >
            Hello, I&apos;m
          </motion.p>

          {/* Name */}
          <motion.h1
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5, duration: 0.6 }}
            className="heading-xl gradient-text animate-none"
          >
            {socialData.personal.name}
          </motion.h1>

          {/* Typing Animation */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7 }}
            className="h-16 sm:h-20 flex items-center justify-center"
          >
            <h2 className="heading-lg text-foreground">
              I&apos;m a{" "}
              <span className="text-primary font-bold">
                {displayText}
                <span className="animate-pulse text-white">|</span>
              </span>
            </h2>
          </motion.div>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.9 }}
            className="body-lg max-w-3xl mx-auto leading-relaxed"
          >
            {socialData.personal.bio}
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.1 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center mt-12"
          >
            <button
              onClick={() => scrollToSection("projects")}
              className="btn-primary group flex items-center gap-2"
            >
              View My Work
              <ExternalLink className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>

            <a
              href={socialData.personal.resume}
              download
              className="btn-secondary group flex items-center gap-2"
            >
              <Download className="w-4 h-4 group-hover:translate-y-0.5 transition-transform" />
              Download Resume
            </a>
          </motion.div>

          {/* Availability Badge */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.3 }}
            className="inline-flex items-center gap-2 glass px-4 py-2 rounded-full mt-8"
          >
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            <span className="text-sm text-muted-foreground">
              {socialData.personal.availability}
            </span>
          </motion.div>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        >
          <button
            onClick={() => scrollToSection("about")}
            className="flex flex-col items-center gap-2 text-muted-foreground hover:text-primary transition-colors group"
          >
            <span className="text-sm">Scroll to explore</span>
            <ChevronDown className="w-6 h-6 animate-bounce group-hover:translate-y-1 transition-transform" />
          </button>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
