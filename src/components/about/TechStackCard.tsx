"use client";

/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect, useRef } from "react";
import { motion } from "motion/react";
import * as SiIcons from "react-icons/si";

interface TechStackCardProps {
  techStack: Array<{
    category: string;
    items: Array<{ title: string; icon: string }>;
  }>;
}

export function TechStackCard({ techStack }: TechStackCardProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>("Frontend");
  const [hasAnimated, setHasAnimated] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const categories = techStack.map((group) => group.category);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !hasAnimated) setHasAnimated(true);
    });
    if (containerRef.current) observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, [hasAnimated]);

  const filteredGroups =
    selectedCategory === "All"
      ? techStack
      : techStack.filter((g) => g.category === selectedCategory);

  return (
    <div ref={containerRef} className="space-y-6 mt-4">
      {/* Category filter */}
      <div className="flex flex-wrap gap-2">
        {categories.map((cat) => (
          <button
            key={cat}
            type="button"
            onClick={(e) => {
              e.preventDefault();
              setSelectedCategory(cat);
            }}
            className={`px-4 py-1 rounded-lg border text-sm transition-colors ${
              selectedCategory === cat
                ? "bg-neutral-800 text-white dark:bg-neutral-200 dark:text-black"
                : "bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-300"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Items */}
      {filteredGroups.map((group, gIdx) => (
        <div key={group.category + gIdx}>
          <h3 className="text-base font-semibold mb-3">{group.category}</h3>
          <div className="flex flex-row flex-wrap gap-3 w-full">
            {group.items.map((tech, idx) => {
              const IconComp = (SiIcons as any)[tech.icon];
              return (
                <motion.div
                  key={tech.title + idx}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.05 }}
                  className="flex flex-row items-center gap-2 px-4 py-1 rounded-lg border"
                >
                  {IconComp && <IconComp className="size-6" />}
                  <span className="text-sm">{tech.title}</span>
                </motion.div>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
}
