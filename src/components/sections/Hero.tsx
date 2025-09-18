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

// Syntax Highlighter Component - Fixed with proper whitespace handling
const SyntaxHighlighter = ({ line }: { line: string }) => {
  if (line.trim() === "") {
    return <span>&nbsp;</span>;
  }

  // Create highlighted segments
  const highlightSyntax = (text: string) => {
    // Split into tokens to avoid overlapping replacements
    const tokens = text.split(
      /(\s+|[{}[\](),;]|\.|\b(?:const|let|var|function|class|async|await|return|import|export|from|new|this)\b|\/\/.*|'[^']*'|"[^"]*"|`[^`]*`)/
    );

    return tokens.map((token, index) => {
      // Preserve whitespace including leading spaces for indentation
      if (/^\s+$/.test(token)) {
        return (
          <span key={index} style={{ whiteSpace: "pre" }}>
            {token}
          </span>
        );
      }

      // Keywords (blue)
      if (
        /^(const|let|var|function|class|async|await|return|import|export|from|new|this)$/.test(
          token
        )
      ) {
        return (
          <span key={index} style={{ color: "#60a5fa", fontWeight: "500" }}>
            {token}
          </span>
        );
      }

      // Built-in objects (emerald)
      if (
        /^(Promise|Array|Object|String|Number|Boolean|console)$/.test(token)
      ) {
        return (
          <span key={index} style={{ color: "#34d399" }}>
            {token}
          </span>
        );
      }

      // Strings (green)
      if (/^(['"`].*\1)$/.test(token)) {
        return (
          <span key={index} style={{ color: "#86efac" }}>
            {token}
          </span>
        );
      }

      // Comments (gray, italic)
      if (/^\/\//.test(token)) {
        return (
          <span key={index} style={{ color: "#9ca3af", fontStyle: "italic" }}>
            {token}
          </span>
        );
      }

      // Method calls - check if next non-whitespace token is (
      if (token.endsWith(".")) {
        const nextTokenIndex = tokens.findIndex(
          (t, i) => i > index && t.trim() !== ""
        );
        const nextToken = tokens[nextTokenIndex];
        if (nextToken && nextToken.endsWith("(")) {
          const methodName = nextToken.slice(0, -1);
          tokens[nextTokenIndex] = "("; // Replace the token
          return (
            <span key={index}>
              {token}
              <span style={{ color: "#fde047" }}>{methodName}</span>
            </span>
          );
        }
      }

      // Arrow functions (pink)
      if (token === "=>") {
        return (
          <span key={index} style={{ color: "#f472b6" }}>
            {token}
          </span>
        );
      }

      // Brackets (light gray)
      if (/^[{}[\](),;]$/.test(token)) {
        return (
          <span key={index} style={{ color: "#d1d5db" }}>
            {token}
          </span>
        );
      }

      // Emojis (larger)
      if (/^[â˜•ðŸš€]$/.test(token)) {
        return (
          <span key={index} style={{ fontSize: "1.1em" }}>
            {token}
          </span>
        );
      }

      // Default color for other text
      return (
        <span key={index} style={{ color: "#ffffff" }}>
          {token}
        </span>
      );
    });
  };

  return <span style={{ whiteSpace: "pre" }}>{highlightSyntax(line)}</span>;
};

const Hero = () => {
  const [displayText, setDisplayText] = useState("");
  const [currentLineIndex, setCurrentLineIndex] = useState(0);

  // Shorter, more concise code lines dengan indentasi yang proper
  const codeLines = useMemo(
    () => [
      "// Crafting digital experiences ☕",
      "class CreativeDeveloper {",
      "  constructor() {",
      "    this.developer = ['Dany', 'Prastya', 'Al-Hakim'];",
      "    this.passion = 'Building amazing products';",
      "  }",
      "",
      "  async create(idea) {",
      "    const magic = await this.design(idea)",
      "      .then(ui => this.develop(ui))",
      "      .then(app => this.deploy(app));",
      "    return magic.launch(); // 🚀",
      "  }",
      "}",
      "",
      "// Ready to build something amazing?",
    ],
    []
  );

  // Stats data - completely static
  const stats = useMemo(
    () => [
      { number: 10, label: "Projects Completed", suffix: "+" },
      { number: 15, label: "Happy Clients", suffix: "+" },
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

              {/* Enhanced Terminal Body */}
              <div className="p-4 bg-black font-mono text-left space-y-1 min-h-[320px] backdrop-blur-sm">
                {codeLines.map((line, lineIndex) => (
                  <div
                    key={lineIndex}
                    className="flex items-start space-x-3 group"
                  >
                    {/* Line numbers for ALL lines including empty ones */}
                    <span className="text-gray-500 select-none text-xs leading-5 w-6 text-right font-light">
                      {String(lineIndex + 1).padStart(2, "0")}
                    </span>
                    <span
                      className="text-sm flex-1 leading-5"
                      style={{ whiteSpace: "pre" }}
                    >
                      {lineIndex < currentLineIndex ? (
                        line.trim() === "" ? (
                          <span>&nbsp;</span>
                        ) : (
                          <SyntaxHighlighter line={line} />
                        )
                      ) : lineIndex === currentLineIndex ? (
                        <>
                          {displayText.trim() === "" ? (
                            <span>&nbsp;</span>
                          ) : (
                            <SyntaxHighlighter line={displayText} />
                          )}
                          <span className="animate-pulse text-blue-400 ml-1 font-bold">
                            |
                          </span>
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
            <div className="relative">
              <div className="w-2 h-2 bg-green-500 rounded-full" />
              <div className="w-2 h-2 absolute inset-0 animate-ping opacity-75 bg-green-500 rounded-full"></div>
            </div>
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
