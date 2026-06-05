"use client";

import {
  FolderCode,
  HeadsetIcon,
  HomeIcon,
  CircleUser,
  Layers,
} from "lucide-react";
import { Dock, DockIcon, DockItem, DockLabel } from "@/components/ui/dock";
import Link from "next/link";
import { useState, useEffect } from "react";

const data = [
  {
    title: "Home",
    icon: (
      <HomeIcon className="h-full w-full text-neutral-600 dark:text-neutral-300" />
    ),
    href: "#hero",
    sectionId: "hero",
  },
  {
    title: "About Me",
    icon: (
      <CircleUser className="h-full w-full text-neutral-600 dark:text-neutral-300" />
    ),
    href: "#about",
    sectionId: "about",
  },
  {
    title: "Services",
    icon: (
      <Layers className="h-full w-full text-neutral-600 dark:text-neutral-300" />
    ),
    href: "#services",
    sectionId: "services",
  },
  {
    title: "Projects",
    icon: (
      <FolderCode className="h-full w-full text-neutral-600 dark:text-neutral-300" />
    ),
    href: "#projects",
    sectionId: "projects",
  },
  {
    title: "Contact",
    icon: (
      <HeadsetIcon className="h-full w-full text-neutral-600 dark:text-neutral-300" />
    ),
    href: "#contact",
    sectionId: "contact",
  },
];

export function DockNavigation() {
  const [activeSection, setActiveSection] = useState("hero");

  useEffect(() => {
    const sectionIds = data.map((d) => d.sectionId);
    const observers: IntersectionObserver[] = [];

    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (!el) return;

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setActiveSection(id);
          }
        },
        { rootMargin: "-40% 0px -40% 0px", threshold: 0 }
      );

      observer.observe(el);
      observers.push(observer);
    });

    return () => observers.forEach((o) => o.disconnect());
  }, []);

  return (
    <div className="bottom-2 left-1/2 max-w-full hidden lg:block fixed -translate-x-1/2 z-50">
      <Dock className="items-end pb-3">
        {data.map((item, idx) => (
          <Link key={idx} href={item.href}>
            <DockItem
              className={`aspect-square rounded-full transition-colors duration-200 ${
                activeSection === item.sectionId
                  ? "bg-primary/15 dark:bg-primary/20 ring-1 ring-primary/30"
                  : "bg-gray-200 dark:bg-neutral-800"
              }`}
            >
              <DockLabel>{item.title}</DockLabel>
              <DockIcon>{item.icon}</DockIcon>
            </DockItem>
          </Link>
        ))}
      </Dock>
    </div>
  );
}
