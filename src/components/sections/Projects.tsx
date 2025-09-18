"use client";

import React, { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Filter, Search, Code, Smartphone, Cpu, Globe } from "lucide-react";
import { cn } from "@/lib/utils";
import { ExpandableProjectCard } from "@/components/ui/ExpandableProjectCard";
// import { GitHubHeatmap } from "@/components/ui/GithubHeatmap";
import projectsData from "@/data/projects.json";

interface Project {
  id: string;
  name: string;
  category: string;
  image: string;
  description: string;
  githubUrl: string;
  websiteUrl: string;
  technologies?: string[];
}

const categoryIcons = {
  All: Globe,
  Website: Code,
  "Mobile Apps": Smartphone,
  IoT: Cpu,
};

const Projects = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [searchTerm, setSearchTerm] = useState<string>("");

  const filteredProjects = useMemo(() => {
    let filtered = projectsData.projects as Project[];

    if (selectedCategory !== "All") {
      filtered = filtered.filter((p) => p.category === selectedCategory);
    }

    if (searchTerm) {
      filtered = filtered.filter(
        (p) =>
          p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          p.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
          p.technologies?.some((t) =>
            t.toLowerCase().includes(searchTerm.toLowerCase())
          )
      );
    }

    return filtered;
  }, [selectedCategory, searchTerm]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
        delayChildren: 0.12,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20, scale: 0.98 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { type: "spring", stiffness: 260, damping: 20 },
    },
  };

  const CategoryButton = ({ category }: { category: string }) => {
    const Icon = categoryIcons[category as keyof typeof categoryIcons];
    const isSelected = selectedCategory === category;
    return (
      <motion.button
        onClick={() => setSelectedCategory(category)}
        className={cn(
          "flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all duration-300",
          "border border-border/30 backdrop-blur-sm relative overflow-hidden",
          isSelected
            ? "bg-primary text-primary-foreground border-primary/50 shadow-lg"
            : "bg-secondary/50 text-secondary-foreground hover:bg-secondary/70 hover:border-border/60"
        )}
        whileHover={{ scale: 1.03 }}
        whileTap={{ scale: 0.98 }}
        layout
      >
        <Icon className="w-4 h-4" />
        <span className="text-sm">{category}</span>
        {isSelected && (
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-primary/20 to-accent/20"
            layoutId="categoryHighlight"
            transition={{ type: "spring", bounce: 0.2, duration: 0.5 }}
          />
        )}
      </motion.button>
    );
  };

  return (
    <div className="section-padding">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-10"
        >
          <h2 className="heading-lg mb-4 gradient-text-static">
            Featured Projects
          </h2>
          {/* <p className="body-lg max-w-3xl mx-auto">
            A curated selection of web, mobile and IoT projects. Click to expand
            for details.
          </p> */}
          <p className="body-lg max-w-3xl mx-auto">
            A curated selection of projects. Click to expand for details.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="mb-8"
        >
          {/* <GitHubHeatmap /> */}
        </motion.div>

        <motion.div className="mb-6 space-y-6">
          <div className="relative max-w-md mx-auto">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-muted-foreground" />
            </div>
            <input
              type="text"
              placeholder="Search projects..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className={cn(
                "w-full pl-10 pr-4 py-3 rounded-lg",
                "glass border border-border/30 focus:border-primary/50",
                "bg-background/50 text-foreground placeholder:text-muted-foreground",
                "focus:outline-none focus:ring-2 focus:ring-primary/20",
                "transition-all duration-300"
              )}
            />
          </div>

          <div className="flex flex-wrap items-center justify-center gap-3">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Filter className="w-4 h-4" />
              <span>Filter by:</span>
            </div>
            {projectsData.categories.map((cat) => (
              <CategoryButton key={cat} category={cat} />
            ))}
          </div>

          <div className="text-center">
            <span className="text-sm text-muted-foreground">
              Showing {filteredProjects.length} project
              {filteredProjects.length !== 1 ? "s" : ""}
              {selectedCategory !== "All" && (
                <span className="text-primary ml-1">in {selectedCategory}</span>
              )}
              {searchTerm && (
                <span className="text-accent ml-1">
                  matching &quot;{searchTerm}&quot;
                </span>
              )}
            </span>
          </div>
        </motion.div>

        <AnimatePresence mode="wait">
          <motion.div
            key={selectedCategory + "-" + searchTerm}
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
            className={cn(
              "grid gap-2 sm:gap-3 md:gap-4 lg:gap-8 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 p-3 sm:p-4 lg:p-6 justify-items-center"
            )}
          >
            {filteredProjects.length > 0 ? (
              filteredProjects.map((project) => (
                <motion.div
                  key={project.id}
                  variants={itemVariants}
                  className="flex justify-center"
                >
                  <ExpandableProjectCard
                    key={project.id}
                    project={project}
                    className="hover-lift glow-on-hover"
                  />
                </motion.div>
              ))
            ) : (
              <div className="col-span-full text-center py-12 space-y-4">
                <div>
                  <h3 className="text-lg font-semibold text-foreground">
                    No projects found
                  </h3>
                  <p className="text-muted-foreground">
                    Try adjusting your filters or search.
                  </p>
                </div>
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};

export default Projects;
