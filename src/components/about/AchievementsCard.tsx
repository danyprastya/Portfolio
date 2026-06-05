"use client";

import { useState, useEffect, useRef } from "react";
import { motion } from "motion/react";

interface AchievementsCardProps {
  achievements: {
    stats: Array<{
      label: string;
      value: number;
      suffix?: string;
      color: string;
    }>;
    highlights: string[];
  };
}

export function AchievementsCard({ achievements }: AchievementsCardProps) {
  const [counters, setCounters] = useState(achievements.stats.map(() => 0));
  const [hasAnimated, setHasAnimated] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated) {
          setHasAnimated(true);
          achievements.stats.forEach((stat, index) => {
            const duration = 2000;
            const steps = 60;
            const increment = stat.value / steps;
            let current = 0;
            const timer = setInterval(() => {
              current += increment;
              if (current >= stat.value) {
                current = stat.value;
                clearInterval(timer);
              }
              setCounters((prev) => {
                const next = [...prev];
                next[index] = Math.floor(current);
                return next;
              });
            }, duration / steps);
          });
        }
      },
      { threshold: 0.3 }
    );
    if (containerRef.current) observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, [achievements.stats, hasAnimated]);

  return (
    <div ref={containerRef} className="space-y-6 mt-4">
      <div className="grid grid-cols-2 gap-4">
        {achievements.stats.map((stat, index) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={hasAnimated ? { opacity: 1, scale: 1 } : {}}
            transition={{ delay: index * 0.1, duration: 0.5 }}
            className="text-center p-4 rounded-lg bg-white/50 dark:bg-black/20 backdrop-blur-sm"
          >
            <div className="text-2xl font-bold mb-1" style={{ color: stat.color }}>
              {counters[index]}{stat.suffix ?? ""}
            </div>
            <div className="text-xs text-neutral-600 dark:text-neutral-400 font-medium">
              {stat.label}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
