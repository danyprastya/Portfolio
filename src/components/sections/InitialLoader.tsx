"use client";
import React, { useState, useEffect } from "react";
import { MultiStepLoader } from "@/components/ui/multi-step-loader";
import { IconX } from "@tabler/icons-react";

const loadingStates = [
  {
    text: "Initializing portfolio...",
  },
  {
    text: "Loading creative projects...",
  },
  {
    text: "Setting up development tools...",
  },
  {
    text: "Configuring tech stack...",
  },
  {
    text: "Optimizing user experience...",
  },
  {
    text: "Connecting to innovation...",
  },
  {
    text: "Preparing amazing content...",
  },
  {
    text: "Welcome to Dany Prastya's Portfolio!",
  },
];

export default function InitialLoader() {
  const [loading, setLoading] = useState(true);
  const [showContent, setShowContent] = useState(false);

  useEffect(() => {
    // Check if user has already seen the loader in this session
    const hasSeenLoader = sessionStorage.getItem("hasSeenLoader");

    if (hasSeenLoader) {
      // Skip loader if already seen in this session
      setLoading(false);
      setShowContent(true);
      const mainContent = document.getElementById("main-content");
      if (mainContent) {
        mainContent.style.display = "block";
      }
      return;
    }

    // Hide main content initially
    const mainContent = document.getElementById("main-content");
    if (mainContent) {
      mainContent.style.display = "none";
    }

    // Auto-hide loader after animation completes
    const totalDuration = loadingStates.length * 2000; // 2000ms per step
    const timer = setTimeout(() => {
      finishLoading();
    }, totalDuration);

    return () => clearTimeout(timer);
  }, []);

  const finishLoading = () => {
    setLoading(false);
    // Mark that user has seen the loader in this session
    sessionStorage.setItem("hasSeenLoader", "true");

    // Re-enable scrolling
    document.body.style.overflow = "";
    document.documentElement.style.overflow = "";

    // Small delay to let the loader animation finish
    setTimeout(() => {
      setShowContent(true);
      // Show main content
      const mainContent = document.getElementById("main-content");
      if (mainContent) {
        mainContent.style.display = "block";
      }
    }, 500);
  };

  const handleSkipLoader = () => {
    finishLoading();
  };

  if (showContent) {
    return null;
  }

  return (
    <>
      <MultiStepLoader
        loadingStates={loadingStates}
        loading={loading}
        duration={2000}
        loop={false}
      />

      {/* Skip button */}
      {loading && (
        <button
          className="fixed top-6 right-6 z-[120] p-2 rounded-full bg-secondary/20 backdrop-blur-sm border border-border/30 text-muted-foreground hover:text-foreground hover:bg-secondary/40 transition-all duration-300 group"
          onClick={handleSkipLoader}
          aria-label="Skip loading animation"
        >
          <IconX className="h-5 w-5 group-hover:rotate-90 transition-transform duration-300" />
        </button>
      )}
    </>
  );
}
