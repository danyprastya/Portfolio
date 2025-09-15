"use client";

import { useState, useEffect, useMemo, useRef } from "react";
import { motion } from "framer-motion";
import { ChevronDown, Download, ExternalLink, Mail } from "lucide-react";
import socialData from "@/data/social.json";

// Counter component - completely isolated with ref to prevent re-renders
const AnimatedCounter = ({
  end,
  suffix = "",
  duration = 2000,
  startDelay = 0,
}: {
  end: number;
  suffix?: string;
  duration?: number;
  startDelay?: number;
}) => {
  const [count, setCount] = useState(0);
  const hasStartedRef = useRef(false);
  const animationRef = useRef<number | null>(null);

  useEffect(() => {
    if (hasStartedRef.current) return;

    const startAnimation = () => {
      hasStartedRef.current = true;
      let startTimestamp: number | undefined;

      const step = (timestamp: number) => {
        if (!startTimestamp) startTimestamp = timestamp;
        const progress = Math.min((timestamp - startTimestamp) / duration, 1);
        const easeOutQuart = 1 - Math.pow(1 - progress, 4); // Smooth easing
        setCount(Math.floor(easeOutQuart * end));

        if (progress < 1) {
          animationRef.current = requestAnimationFrame(step);
        }
      };

      animationRef.current = requestAnimationFrame(step);
    };

    const timeoutId = setTimeout(startAnimation, startDelay);

    return () => {
      clearTimeout(timeoutId);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [duration, end, startDelay]); // Empty dependency array - runs only once

  return (
    <span>
      {count}
      {suffix}
    </span>
  );
};

const Hero = () => {
  const [displayText, setDisplayText] = useState("");
  const [currentLineIndex, setCurrentLineIndex] = useState(0);

  // Enhanced code lines with different JavaScript patterns
  const codeLines = useMemo(
    () => [
      "const developer = new FullStackDev();",
      "developer.skills.push('Innovation');",
      "developer.build('Amazing Projects');",
      "// Ready to work together?",
    ],
    []
  );

  // Stats data - completely static
  const stats = useMemo(
    () => [
      { number: 50, label: "Projects Completed", suffix: "+" },
      { number: 100, label: "Happy Clients", suffix: "+" },
      { number: 15, label: "Tech Stack", suffix: "+" },
      { number: 24, label: "Support", suffix: "/7" },
    ],
    []
  );

  // Faster typewriter effect
  useEffect(() => {
    if (currentLineIndex >= codeLines.length) return;

    const currentText = codeLines[currentLineIndex];

    const timeout = setTimeout(
      () => {
        if (displayText === currentText) {
          // Quick pause before next line
          setTimeout(() => {
            setCurrentLineIndex((prev) => prev + 1);
            setDisplayText("");
          }, 400); // Reduced from 1500ms to 400ms
        } else {
          // Fast typing
          setDisplayText(currentText.slice(0, displayText.length + 1));
        }
      },
      currentText === "" ? 200 : 30
    ); // 30ms for typing, 200ms for empty lines

    return () => clearTimeout(timeout);
  }, [displayText, currentLineIndex, codeLines]);

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
      {/* Main Content */}
      <div className="relative z-10 container-custom section-padding text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="space-y-12"
        >
          {/* Main Title */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="space-y-4"
          >
            <h1 className="heading-xl">
              Building Tomorrow&apos;s
              <br />
              <span className="gradient-text">Digital Solutions</span>
            </h1>

            <p className="body-lg max-w-2xl mx-auto">
              Transforming ideas into powerful applications across web, mobile,
              and IoT ecosystems
            </p>
          </motion.div>

          {/* Terminal Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="max-w-2xl mx-auto"
          >
            <div className="glass rounded-lg overflow-hidden">
              {/* Terminal Header */}
              <div className="flex items-center justify-between px-4 py-2 bg-secondary/20 border-b border-border/30">
                <div className="flex space-x-2">
                  <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                  <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                </div>
                <span className="text-sm text-muted-foreground">
                  ~/portfolio
                </span>
              </div>

              {/* Terminal Body */}
              <div className="p-4 bg-black/50 font-mono text-left space-y-1 min-h-[180px]">
                {codeLines.map((line, lineIndex) => (
                  <div key={lineIndex} className="flex items-start space-x-2">
                    {line.trim() !== "" && (
                      <span className="text-primary flex-shrink-0">$</span>
                    )}
                    <span className="text-green-400 text-sm flex-1">
                      {lineIndex < currentLineIndex ? (
                        <span
                          dangerouslySetInnerHTML={{
                            __html: line.replace(
                              /\/\/(.*)/g,
                              '<span class="text-gray-500">//$1</span>'
                            ),
                          }}
                        />
                      ) : lineIndex === currentLineIndex ? (
                        <>
                          <span
                            dangerouslySetInnerHTML={{
                              __html: displayText.replace(
                                /\/\/(.*)/g,
                                '<span class="text-gray-500">//$1</span>'
                              ),
                            }}
                          />
                          <span className="animate-pulse text-white">|</span>
                        </>
                      ) : null}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Stats Section - Isolated from typewriter */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2 }}
            className="grid grid-cols-2 lg:grid-cols-4 gap-6 max-w-4xl mx-auto"
          >
            {stats.map((stat, statIndex) => (
              <motion.div
                key={stat.label} // Simple stable key
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 1.4 + statIndex * 0.1 }}
                className="card-base text-center group hover:border-primary/30 transition-all duration-300"
              >
                <div className="text-2xl sm:text-3xl font-bold text-primary group-hover:scale-110 transition-transform duration-300">
                  <AnimatedCounter
                    end={stat.number}
                    suffix={stat.suffix}
                    duration={2500}
                    startDelay={1600 + statIndex * 200} // Staggered start
                  />
                </div>
                <p className="text-sm text-muted-foreground mt-1">
                  {stat.label}
                </p>
              </motion.div>
            ))}
          </motion.div>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.8 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          >
            <button
              onClick={() => scrollToSection("projects")}
              className="btn-primary group flex items-center gap-2"
            >
              View My Work
              <ExternalLink className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>

            <button
              onClick={() => scrollToSection("contact")}
              className="btn-secondary group flex items-center gap-2"
            >
              <Mail className="w-4 h-4 group-hover:scale-110 transition-transform" />
              Let&apos;s Collaborate
            </button>

            <a
              href={socialData.personal.resume}
              download
              className="btn-ghost group flex items-center gap-2"
            >
              <Download className="w-4 h-4 group-hover:translate-y-0.5 transition-transform" />
              Resume
            </a>
          </motion.div>

          {/* Availability Badge */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2.0 }}
            className="inline-flex items-center gap-2 glass px-4 py-2 rounded-full"
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
          transition={{ delay: 2.2 }}
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
