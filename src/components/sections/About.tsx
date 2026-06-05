/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { motion, useMotionValue, useTransform, type Variants } from "motion/react";
import { useState } from "react";
import { GlowEffect } from "../ui/glow-effect";
import skillData from "@/data/skills.json";
import { GitHubHeatmap } from "../ui/GitHubHeatmap";
import { ProfileCard } from "@/components/about/ProfileCard";
import { TechStackCard } from "@/components/about/TechStackCard";
import { SocialCard } from "@/components/about/SocialCard";
import { AchievementsCard } from "@/components/about/AchievementsCard";
import { Github, Linkedin } from "lucide-react";

interface BentoItem {
  id: string;
  title: string;
  description: string;
  icons?: boolean;
  href?: string;
  feature?:
    | "profile"
    | "techStack"
    | "social"
    | "achievements";
  profile?: {
    imageUrl: string;
    title: React.ReactNode;
    description: React.ReactNode;
    role: string[];
  };
  techStack?: {
    category: string;
    items: { title: string; icon: string }[];
  }[];
  social?: {
    contacts: {
      whatsapp: string;
      email: string;
    };
    socials: Array<{
      name: string;
      url: string;
      icon: React.ComponentType<any>;
      color: string;
    }>;
    availability: {
      status: "available" | "busy" | "unavailable";
      location: string;
      timezone: string;
    };
  };
  achievements?: {
    stats: Array<{
      label: string;
      value: number;
      suffix?: string;
      color: string;
    }>;
    highlights: string[];
  };
  size?: "sm" | "md" | "lg";
  className?: string;
}

const bentoItems: BentoItem[] = [
  {
    id: "main",
    title: "My Profile",
    description: "A small insight about me",
    href: "#",
    feature: "profile",
    profile: {
      imageUrl: "/profile_pic.png",
      title: "Hello, I'm Dany Prastya",
      description: (
        <>
          2+ years building <strong>production web apps</strong> and{" "}
          <strong>AI-powered automation</strong> for businesses worldwide.
          I build the site, then wire up the workflows so the tedious stuff runs itself.
        </>
      ),
      role: [
        "AI Automation Engineer",
        "Full-Stack Developer",
      ],
    },
    size: "md",
    className: "col-span-2 row-span-1 md:col-span-2 md:row-span-1",
  },
  {
    id: "techStack",
    title: "My Skill",
    description: "Technologies I work with",
    href: "#",
    feature: "techStack",
    techStack: Object.entries(skillData.techStack).map(([category, items]) => ({
      category,
      items: (items as Array<any>).map((item) => ({
        title: item.name,
        icon: item.icon,
      })),
    })),
    size: "lg",
    className: "col-span-2 row-span-1 md:col-span-2 md:row-span-1",
  },
  {
    id: "social",
    title: "Let's Connect",
    description: "Ready to work together? Here's how to reach me",
    feature: "social",
    social: {
      contacts: {
        whatsapp: "+6285258421749",
        email: "danyprastyaalhakim@gmail.com",
      },
      socials: [
        {
          name: "GitHub",
          url: "https://github.com/danyprastya",
          icon: Github,
          color: "hover:bg-gray-700 hover:text-white",
        },
        {
          name: "LinkedIn",
          url: "https://www.linkedin.com/in/danyprastya/",
          icon: Linkedin,
          color: "hover:bg-blue-600 hover:text-white",
        },
      ],
      availability: {
        status: "available",
        location: "Indonesia",
        timezone: "UTC+7",
      },
    },
    size: "md",
    className: "col-span-1 row-span-1",
  },
  {
    id: "achievements",
    title: "Professional Highlights",
    description:
      "Quantifiable impact and expertise metrics that define my journey",
    feature: "achievements",
    achievements: {
      stats: [
        {
          label: "Projects Shipped",
          value: 10,
          suffix: "+",
          color: "#10b981",
        },
        { label: "Years Building", value: 2, suffix: "+", color: "#3b82f6" },
        { label: "Technologies", value: 15, suffix: "+", color: "#f59e0b" },
        {
          label: "Avg. Response",
          value: 24,
          suffix: "h",
          color: "#8b5cf6",
        },
      ],
      highlights: [
        "Shipped production apps for real businesses",
        "Built IoT monitoring systems with real-time dashboards",
        "Integrated AI-powered automation workflows",
        "Serve clients across different timezones",
      ],
    },
    size: "md",
    className: "col-span-1 row-span-1",
  },
];

// Delegate to extracted sub-component
const SocialAndContact = ({ social }: { social: React.ComponentProps<typeof SocialCard>["social"] }) => (
  <SocialCard social={social} />
);

// Rest of the existing components remain the same...
const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: "easeOut",
    },
  },
};

const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.3,
    },
  },
};

// Achievement Dashboard Feature Component
// Delegate to extracted sub-component
const AchievementFeature = ({ achievements }: { achievements: React.ComponentProps<typeof AchievementsCard>["achievements"] }) => (
  <AchievementsCard achievements={achievements} />
);

// Delegate to extracted sub-component
const Profile = ({ profile }: { profile: React.ComponentProps<typeof ProfileCard>["profile"] }) => (
  <ProfileCard profile={profile} />
);

// Delegate to extracted sub-component
const TechStackFeature = ({ techStack }: { techStack: React.ComponentProps<typeof TechStackCard>["techStack"] }) => (
  <TechStackCard techStack={techStack} />
);

const BentoCard = ({ item }: { item: BentoItem }) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [isHovered, setIsHovered] = useState(false);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useTransform(y, [-100, 100], [2, -2]);
  const rotateY = useTransform(x, [-100, 100], [-2, 2]);

  function handleMouseMove(event: React.MouseEvent<HTMLDivElement>) {
    const rect = event.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = event.clientX - rect.left;
    const mouseY = event.clientY - rect.top;
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;
    x.set(xPct * 100);
    y.set(yPct * 100);
  }

  function handleMouseLeave() {
    x.set(0);
    y.set(0);
    setIsHovered(false);
  }

  return (
    <motion.div
      variants={fadeInUp}
      whileHover={{ y: -5 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      className="h-full"
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={handleMouseLeave}
      onMouseMove={handleMouseMove}
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
      }}
    >
      <div
        className={`
                    group relative bg-black flex flex-col gap-4 h-full rounded-xl p-5
                    bg-gradient-to-b from-neutral-50/60 via-neutral-50/40 to-neutral-50/30 
                    dark:from-neutral-900/60 dark:via-neutral-900/40 dark:to-neutral-900/30
                    border border-neutral-200/60 dark:border-neutral-800/60
                    before:absolute before:inset-0 before:rounded-xl
                    before:bg-gradient-to-b before:from-white/10 before:via-white/20 before:to-transparent 
                    dark:before:from-black/10 dark:before:via-black/20 dark:before:to-transparent
                    before:opacity-100 before:transition-opacity before:duration-500
                    after:absolute after:inset-0 after:rounded-xl after:bg-neutral-50/70 dark:after:bg-neutral-900/70 after:z-[-1]
                    backdrop-blur-[4px]
                    shadow-[0_4px_20px_rgb(0,0,0,0.04)] dark:shadow-[0_4px_20px_rgb(0,0,0,0.2)]
                    hover:border-neutral-300/50 dark:hover:border-neutral-700/50
                    hover:shadow-[0_8px_30px_rgb(0,0,0,0.06)] dark:hover:shadow-[0_8px_30px_rgb(0,0,0,0.3)]
                    hover:backdrop-blur-[6px]
                    hover:bg-gradient-to-b hover:from-neutral-50/60 hover:via-neutral-50/30 hover:to-neutral-50/20
                    dark:hover:from-neutral-800/60 dark:hover:via-neutral-800/30 dark:hover:to-neutral-800/20
                    transition-all duration-500 ease-out ${item.className}
                `}
        tabIndex={0}
        aria-label={`${item.title} - ${item.description}`}
      >
        <div
          className="relative z-10 flex flex-col gap-3 h-full"
          style={{ transform: "translateZ(20px)" }}
        >
          <div className="space-y-2 flex-1 flex flex-col">
            <div className="flex items-center justify-between">
              <h3 className="text-2xl font-semibold tracking-tight text-neutral-900 dark:text-neutral-100 group-hover:text-neutral-700 dark:group-hover:text-neutral-300 transition-colors duration-300">
                {item.title}
              </h3>
            </div>

            <p className="text-sm text-neutral-600 dark:text-neutral-400 tracking-tight">
              {item.description}
            </p>

            {/* Feature specific content */}
            {item.feature === "profile" && item.profile && (
              <Profile profile={item.profile} />
            )}

            {item.feature === "techStack" && item.techStack && (
              <TechStackFeature techStack={item.techStack} />
            )}

            {item.feature === "social" && item.social && (
              <SocialAndContact social={item.social} />
            )}

            {item.feature === "achievements" && item.achievements && (
              <AchievementFeature achievements={item.achievements} />
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default function About() {
  return (
    <section className="relative flex items-center justify-center flex-col min-h-screen my-6">
      <h2 className="heading-xl mb-10">
        About <span className="gradient-text">Me</span>
      </h2>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 gap-y-6">
        {/* Bento Grid */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={staggerContainer}
          className="grid gap-6"
        >
          <div className="grid md:grid-cols-3 gap-8">
            <motion.div variants={fadeInUp} className="md:col-span-2 relative">
              <GlowEffect
                colors={["#ffffff66", "#ffffff66", "#ffffff66", "#ffffff66"]}
                mode="static"
                blur="soft"
              />
              <BentoCard item={bentoItems[0]} />
            </motion.div>
            <motion.div variants={fadeInUp} className="md:col-span-1 relative">
              <GlowEffect
                colors={["#ffffff66", "#ffffff66", "#ffffff66", "#ffffff66"]}
                mode="static"
                blur="soft"
              />
              <BentoCard item={bentoItems[2]} />
            </motion.div>
          </div>
          <div className="grid md:grid-cols-2 gap-8">
            <motion.div variants={fadeInUp} className="md:col-span-1 relative">
              <GlowEffect
                colors={["#ffffff66", "#ffffff66", "#ffffff66", "#ffffff66"]}
                mode="static"
                blur="soft"
              />
              <BentoCard item={bentoItems[1]} />
            </motion.div>
            <motion.div variants={fadeInUp} className="md:col-span-1 relative">
              <GlowEffect
                colors={["#ffffff66", "#ffffff66", "#ffffff66", "#ffffff66"]}
                mode="static"
                blur="soft"
              />
              <BentoCard item={bentoItems[3]} />
            </motion.div>
          </div>
        </motion.div>

        {/* GitHub Activity */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="mt-8"
        >
          <GitHubHeatmap />
        </motion.div>
      </div>
    </section>
  );
}
