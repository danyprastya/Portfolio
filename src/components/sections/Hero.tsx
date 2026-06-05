"use client";

import { useState, useEffect, useRef } from "react";
import { motion } from "motion/react";
import { ArrowRight, Download } from "lucide-react";
import socialData from "@/data/social.json";

// Counter component — isolated with ref to prevent re-renders
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
        const easeOutQuart = 1 - Math.pow(1 - progress, 4);
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
  }, [duration, end, startDelay]);

  return (
    <span>
      {count}
      {suffix}
    </span>
  );
};

const Hero = () => {
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
      {/* Subtle background gradient — intentional, not distracting */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/3 left-1/4 w-[30rem] h-[30rem] rounded-full bg-primary/5 blur-[120px]" />
        <div className="absolute bottom-1/4 right-1/4 w-[25rem] h-[25rem] rounded-full bg-cyan-500/5 blur-[120px]" />
      </div>

      {/* Main Content */}
      <div className="relative z-10 container-custom section-padding text-center max-w-4xl mx-auto">
        <div className="space-y-10">


          {/* Headline */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.5 }}
            className="space-y-5"
          >
            <h1 className="text-4xl sm:text-5xl lg:text-7xl font-semibold tracking-tight text-foreground leading-[1.1]">
              I build websites
              <br />
              <span className="gradient-text">that work.</span>
            </h1>

            <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed font-normal">
              Fast web apps and AI automation that save you time and bring in
              customers.
            </p>
          </motion.div>

          {/* Stats — inline, lightweight */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="flex flex-wrap justify-center gap-8 sm:gap-12 text-center"
          >
            {[
              { end: 10, suffix: "+", label: "Projects shipped" },
              { end: 2, suffix: "+", label: "Years building" },
              { end: 15, suffix: "+", label: "Technologies" },
              { end: 24, suffix: "h", label: "Avg. response time" },
            ].map((stat, i) => (
              <div key={stat.label} className="flex flex-col items-center">
                <span className="text-2xl sm:text-3xl font-bold text-foreground tabular-nums">
                  <AnimatedCounter
                    end={stat.end}
                    suffix={stat.suffix}
                    duration={2000}
                    startDelay={400 + i * 100}
                  />
                </span>
                <span className="text-xs sm:text-sm text-muted-foreground mt-1">
                  {stat.label}
                </span>
              </div>
            ))}
          </motion.div>

          {/* CTAs — clear hierarchy: 1 primary, 1 secondary, 1 ghost */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.4 }}
            className="flex flex-col sm:flex-row gap-3 justify-center items-center"
          >
            <button
              onClick={() => scrollToSection("contact")}
              className="btn-primary group inline-flex items-center gap-2 text-base"
            >
              Get a Free Quote
              <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
            </button>

            <button
              onClick={() => scrollToSection("projects")}
              className="btn-secondary group inline-flex items-center gap-2 text-base"
            >
              See My Work
            </button>

            <a
              href={socialData.personal.resume}
              download
              className="btn-ghost group inline-flex items-center gap-2 text-sm"
            >
              <Download className="w-4 h-4" />
              Resume
            </a>
          </motion.div>
        </div>
        <div className="w-full mx-auto mt-5">
          {/* Availability Badge — trust signal first */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="flex justify-center"
          >
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-border/40 bg-secondary/30 text-sm text-muted-foreground">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
              </span>
              {socialData.personal.availability}
            </div>
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <button
          onClick={() => scrollToSection("about")}
          className="flex flex-col items-center gap-1 text-muted-foreground/60 hover:text-muted-foreground transition-colors"
          aria-label="Scroll to about section"
        >
          <span className="text-xs">Scroll</span>
          <motion.div
            animate={{ y: [0, 4, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              className="text-current"
            >
              <path
                d="M4 6L8 10L12 6"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </motion.div>
        </button>
      </motion.div>
    </section>
  );
};

export default Hero;
