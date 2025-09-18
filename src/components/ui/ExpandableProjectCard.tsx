"use client";

import {
  Expandable,
  ExpandableTrigger,
  ExpandableCard,
  ExpandableCardHeader,
  ExpandableCardContent,
  ExpandableCardFooter,
  ExpandableContent,
} from "@/components/ui/expandable";
// import { motion } from "framer-motion";
import Image from "next/image";
import { Github, Globe } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { cn } from "@/lib/utils";

interface ExpandableProjectCardProps {
  project: Project;
  className?: string; // tambahin di sini
}

interface Project {
  id: string;
  name: string;
  category: string;
  description: string;
  image: string;
  githubUrl: string;
  websiteUrl: string;
}

export function ExpandableProjectCard({ project, className }: ExpandableProjectCardProps) {
  return (
    <Expandable expandDirection="both" expandBehavior="replace">
      {({ isExpanded }) => (
        <ExpandableTrigger>
          <ExpandableCard
            className={cn(
              "w-full relative glass border border-border/20 shadow-lg rounded-lg sm:rounded-xl md:rounded-[2rem] overflow-hidden",
              className // merge class tambahan
            )}
            collapsedSize={{ width: 330, height: 220 }}
            expandedSize={{ width: 430, height: 320 }}
            hoverToExpand={false}
          >
            {/* HEADER */}
            <ExpandableCardHeader className="p-0">
              {!isExpanded ? (
                // collapsed → image as background
                <div className="relative w-[330px] h-[220px]">
                  <Image
                    src={project.image}
                    alt={project.name}
                    fill
                    className="object-cover rounded-lg"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                  <div className="absolute bottom-3 left-3">
                    <h3 className="text-lg font-semibold text-white">
                      {project.name}
                    </h3>
                    <Badge className="bg-accent/30 text-white mt-1">
                      {project.category}
                    </Badge>
                  </div>
                </div>
              ) : (
                // expanded → image smaller with title/category aside
                <div className="flex gap-4 items-center p-2 sm:p-4">
                  <Image
                    src={project.image}
                    alt={project.name}
                    width={120}
                    height={120}
                    className="rounded-lg object-cover"
                  />
                  <div className="flex flex-col">
                    <h3 className="text-xl font-bold text-foreground">
                      {project.name}
                    </h3>
                    <Badge className="w-fit bg-accent/20 text-accent-foreground mt-2">
                      {project.category}
                    </Badge>
                  </div>
                </div>
              )}
            </ExpandableCardHeader>

            {/* CONTENT */}
            {isExpanded && (
              <ExpandableCardContent className="px-2 sm:px-4">
                <ExpandableContent preset="fade" keepMounted>
                  <div className="mt-4 text-sm text-muted-foreground max-h-32 overflow-y-auto pr-2">
                    {project.description}
                  </div>
                </ExpandableContent>
              </ExpandableCardContent>
            )}

            {/* FOOTER */}
            {isExpanded && (
              <ExpandableContent preset="slide-up">
                <ExpandableCardFooter className="flex justify-start gap-2 items-center py-2 sm:py-4">
                  <Button
                    variant="outline"
                    asChild
                    className="flex items-center rounded-full w-fit justify-center"
                  >
                    <Link href={project.githubUrl} target="_blank" rel="noreferrer">
                      <Github className="w-4 h-4" />
                      GitHub
                    </Link>
                  </Button>
                  <Button
                    className="btn-primary w-fit rounded-full flex items-center justify-center"
                    asChild
                  >
                    <Link href={project.websiteUrl} target="_blank" rel="noreferrer">
                      <Globe className="w-4 h-4" />
                      Visit Site
                    </Link>
                  </Button>
                </ExpandableCardFooter>
              </ExpandableContent>
            )}
          </ExpandableCard>
        </ExpandableTrigger>
      )}
    </Expandable>
  );
}
