/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { cn } from "@/lib/utils";
import {
  Phone,
  Music2,
  Github,
  Linkedin,
  Instagram,
  MapPin,
  Clock3,
} from "lucide-react";
import {
  motion,
  useMotionValue,
  useTransform,
  type Variants,
} from "motion/react";
import { useState, useEffect, useRef } from "react";
import { GlowEffect } from "../ui/glow-effect";
import Image from "next/image";
import { TextLoop } from "../ui/text-loop";
import skillData from "@/data/skills.json";
import * as SiIcons from "react-icons/si";
import { Button } from "@/components/ui/button";
import {
  TooltipProvider,
  Tooltip,
  TooltipTrigger,
  TooltipContent,
} from "@/components/ui/tooltip";
import EnhancedSocialButton from "../ui/social-button";
import EmailDialog from "../ui/email-button";

interface BentoItem {
  id: string;
  title: string;
  description: string;
  icons?: boolean;
  href?: string;
  feature?:
    // | "chart"
    // | "counter"
    // | "code"
    // | "timeline"
    // | "spotlight"
    // | "icons"
    // | "typing"
    // | "metrics"
    | "profile" //fitur sendiri
    | "techStack" //fitur sendiri
    | "social" //fitur baru
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
  // spotlightItems?: string[];
  // timeline?: Array<{ year: string; event: string }>;
  // code?: string;
  // codeLang?: string;
  // typingText?: string;
  // metrics?: Array<{
  //   label: string;
  //   value: number;
  //   suffix?: string;
  //   color?: string;
  // }>;
  // statistic?: {
  //   value: string;
  //   label: string;
  //   start?: number;
  //   end?: number;
  //   suffix?: string;
  // };
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
      imageUrl: "/profile.png",
      title: "Hello, I'm Dany Prastya",
      description: (
        <>
          I&apos;m a passionate computer science student and freelance developer
          with <strong>3+ years of experience</strong> specializing in{" "}
          <strong>full-stack web development</strong>,{" "}
          <strong>mobile applications</strong>, <strong>IoT systems</strong>,
          <strong>data analyst</strong>, and <strong>machine learning</strong>.
        </>
      ),
      role: [
        "Full-Stack Developer",
        "Mobile App Developer",
        "IoT System Builder",
        "Data analyst",
        "Tech Innovator",
      ],
    },
    size: "md",
    className: "col-span-2 row-span-1 md:col-span-2 md:row-span-1",
  },
  {
    id: "techStack",
    title: "My Skill",
    description: "Here's some Tech Stack that i have experience in",
    href: "#",
    feature: "techStack",
    techStack: Object.entries(skillData.techStack).map(([category, items]) => ({
      category,
      items: (items as Array<any>).map((item) => ({
        title: item.name,
        icon: item.icon, // contoh: "SiReact"
      })),
    })),
    size: "lg",
    className: "col-span-2 row-span-1 md:col-span-2 md:row-span-1",
  },
  {
    id: "social",
    title: "Let's Connect",
    description: "Ready to collaborate? Let's build something amazing together",
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
          url: "https://www.linkedin.com/in/dany-prastya-al-hakim-9b181428b",
          icon: Linkedin,
          color: "hover:bg-blue-600 hover:text-white",
        },
        {
          name: "Instagram",
          url: "https://instagram.com/danyhkm_",
          icon: Instagram,
          color: "hover:bg-pink-500 hover:text-white",
        },
        {
          name: "Tiktok",
          url: "https://tiktok.com/dnyhkm",
          icon: Music2,
          color: "hover:bg-pink-500 hover:text-white",
        },
      ],
      availability: {
        status: "available",
        location: "Bandung, Indonesia",
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
          label: "Projects Completed",
          value: 50,
          suffix: "+",
          color: "#10b981",
        },
        { label: "Years Experience", value: 3, suffix: "+", color: "#3b82f6" },
        { label: "Happy Clients", value: 25, suffix: "+", color: "#f59e0b" },
        {
          label: "Technologies Mastered",
          value: 20,
          suffix: "+",
          color: "#8b5cf6",
        },
      ],
      highlights: [
        "🏆 Won 2024 Campus Innovation Award",
        "🚀 Deployed applications with 99.9% uptime",
        "⚡ Optimized systems achieving 40% performance boost",
        "🎯 Consistently deliver projects 15% ahead of schedule",
        "💡 Mentored 10+ junior developers successfully",
      ],
    },
    size: "md",
    className: "col-span-1 row-span-1",
  },
  // {
  //   id: "stat1",
  //   title: "AI Agents & Automation",
  //   description:
  //     "Intelligent agents that learn, adapt, and automate complex workflows",
  //   href: "#",
  //   feature: "typing",
  //   typingText:
  //     "const createAgent = async () => {\n  const agent = new AIAgent({\n    model: 'gpt-4-turbo',\n    tools: [codeAnalysis, dataProcessing],\n    memory: new ConversationalMemory()\n  });\n\n  // Train on domain knowledge\n  await agent.learn(domainData);\n\n  return agent;\n};",
  //   size: "md",
  //   className: "col-span-2 row-span-1 col-start-1 col-end-3",
  // },
];

// Social and Contact Feature Component
const SocialAndContact = ({
  social,
}: {
  social: {
    contacts: { whatsapp: string; email: string };
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
}) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "available":
        return "bg-green-500";
      case "busy":
        return "bg-yellow-500";
      case "unavailable":
        return "bg-red-500";
      default:
        return "bg-gray-500";
    }
  };

  const handleWhatsApp = () => {
    const message = encodeURIComponent(
      "Hi Dany! I'm interested in discussing a project with you."
    );
    window.open(
      `https://wa.me/${social.contacts.whatsapp.replace(
        /[^\d]/g,
        ""
      )}?text=${message}`,
      "_blank"
    );
  };

  return (
    <div className="space-y-6 mt-4">
      {/* Availability Status */}
      <div className="flex items-center w-fit gap-3 p-3 rounded-lg bg-neutral-50 dark:bg-neutral-800/50">
        <div className="relative">
          <div
            className={`w-3 h-3 rounded-full ${getStatusColor(
              social.availability.status
            )}`}
          />
          <div
            className={`absolute inset-0 w-3 h-3 rounded-full ${getStatusColor(
              social.availability.status
            )} animate-ping opacity-75`}
          />
        </div>
        <div className="text-sm">
          <div className="font-medium text-neutral-900 dark:text-neutral-100">
            Open to work
          </div>
        </div>
      </div>

      {/* Location & Timezone */}
      <div className="flex items-center gap-4 text-sm text-neutral-600 dark:text-neutral-400">
        <div className="flex items-center gap-1">
          <MapPin className="w-4 h-4" />
          {social.availability.location}
        </div>
        <div className="flex items-center gap-1">
          <Clock3 className="w-4 h-4" />
          {social.availability.timezone}
        </div>
      </div>

      {/* Main CTAs */}
      <div className="flex items-center justify-start gap-3">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                onClick={handleWhatsApp}
                className={cn(
                  "w-12 h-12 p-0",
                  "bg-neutral-100/80 dark:bg-neutral-800/80",
                  "hover:bg-neutral-200/80 dark:hover:bg-green-400",
                  "text-neutral-700 dark:text-neutral-300 dark:hover:text-white",
                  "border border-neutral-200/60 dark:border-neutral-700/60",
                  "backdrop-blur-sm transition-all duration-300",
                  "rounded-xl",
                  "hover:scale-105"
                )}
              >
                <Phone className="w-5 h-5" />
              </Button>
            </TooltipTrigger>
            <TooltipContent side="top" className="glass text-sm font-medium">
              <p>WhatsApp Chat</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>

        <EmailDialog email={social.contacts.email} />

        <EnhancedSocialButton />
      </div>
    </div>
  );
};

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
const AchievementFeature = ({
  achievements,
}: {
  achievements: {
    stats: Array<{
      label: string;
      value: number;
      suffix?: string;
      color: string;
    }>;
    highlights: string[];
  };
}) => {
  const [counters, setCounters] = useState(achievements.stats.map(() => 0));
  const [hasAnimated, setHasAnimated] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated) {
          setHasAnimated(true);

          // Animate counters
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
                const newCounters = [...prev];
                newCounters[index] = Math.floor(current);
                return newCounters;
              });
            }, duration / steps);
          });
        }
      },
      { threshold: 0.3 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, [achievements.stats, hasAnimated]);

  return (
    <div ref={containerRef} className="space-y-6 mt-4">
      {/* Stats Grid */}
      <div className="grid grid-cols-2 gap-4">
        {achievements.stats.map((stat, index) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={hasAnimated ? { opacity: 1, scale: 1 } : {}}
            transition={{ delay: index * 0.1, duration: 0.5 }}
            className="text-center p-4 rounded-lg bg-white/50 dark:bg-black/20 backdrop-blur-sm"
          >
            <div
              className="text-2xl font-bold mb-1"
              style={{ color: stat.color }}
            >
              {counters[index]}
              {stat.suffix || ""}
            </div>
            <div className="text-xs text-neutral-600 dark:text-neutral-400 font-medium">
              {stat.label}
            </div>
          </motion.div>
        ))}
      </div>

      {/* Highlights */}
      <div className="space-y-3">
        <h4 className="text-sm font-semibold text-neutral-800 dark:text-neutral-200">
          Key Highlights
        </h4>
        <div className="space-y-2">
          {achievements.highlights.map((highlight, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              animate={hasAnimated ? { opacity: 1, x: 0 } : {}}
              transition={{ delay: 0.5 + index * 0.1 }}
              className="flex items-center gap-2 text-sm text-neutral-700 dark:text-neutral-300"
            >
              <span className="text-base">{highlight.split(" ")[0]}</span>
              <span className="flex-1">{highlight.substring(2)}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

const Profile = ({
  profile,
}: {
  profile: {
    imageUrl: string;
    title: React.ReactNode;
    description: React.ReactNode;
    role: string[];
  };
}) => {
  return (
    <div className="pt-2 relative">
      <div className="grid grid-flow-col justify-center items-center grid-rows-3 gap-4 ">
        <div className="row-span-3 justify-center items-center flex relative w-full h-full">
          <Image src={profile.imageUrl} alt="profil" width={130} height={130} />
        </div>
        <div className="leading-tight col-span-2 gap-2">
          <h3 className="">{profile.title}</h3>

          <div className="inline-flex whitespace-pre-wrap text-sm">
            i&apos;m a{" "}
            <TextLoop
              className="overflow-y-clip"
              transition={{
                type: "spring",
                stiffness: 900,
                damping: 80,
                mass: 10,
              }}
              variants={{
                initial: {
                  y: 20,
                  rotateX: 90,
                  opacity: 0,
                  filter: "blur(4px)",
                },
                animate: {
                  y: 0,
                  rotateX: 0,
                  opacity: 1,
                  filter: "blur(0px)",
                },
                exit: {
                  y: -20,
                  rotateX: -90,
                  opacity: 0,
                  filter: "blur(4px)",
                },
              }}
            >
              {profile.role}
            </TextLoop>
          </div>
        </div>
        <div className="text-left col-span-2 row-span-2">
          {profile.description}
        </div>
      </div>
    </div>
  );
};

const TechStackFeature = ({
  techStack,
}: {
  techStack: Array<{
    category: string;
    items: Array<{ title: string; icon: string }>;
  }>;
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>("Frontend");
  const [hasAnimated, setHasAnimated] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  // ambil semua kategori unik
  const categories = [...techStack.map((group) => group.category)];

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated) {
          setHasAnimated(true);
        }
      }
      //     // Animate counters
      //     achievements.stats.forEach((stat, index) => {
      //       const duration = 2000;
      //       const steps = 60;
      //       const increment = stat.value / steps;
      //       let current = 0;

      //       const timer = setInterval(() => {
      //         current += increment;
      //         if (current >= stat.value) {
      //           current = stat.value;
      //           clearInterval(timer);
      //         }

      //         setCounters((prev) => {
      //           const newCounters = [...prev];
      //           newCounters[index] = Math.floor(current);
      //           return newCounters;
      //         });
      //       }, duration / steps);
      //     });
      //   }
      // },
      // { threshold: 0.3 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, [hasAnimated]);

  // filter sesuai pilihan
  const filteredGroups =
    selectedCategory === "All"
      ? techStack
      : techStack.filter((group) => group.category === selectedCategory);

  return (
    <div ref={containerRef} className="space-y-6 mt-4">
      {/* tombol filter */}
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

      {/* tampilkan item */}
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
      {/* Progress Skills Bar (Optional Enhancement) */}
      <div className="space-y-3">
        <h4 className="text-base font-semibold text-neutral-800 dark:text-neutral-200">
          Expertise Level
        </h4>
        {[
          { skill: "Full-Stack Development", level: 85 },
          { skill: "Mobile Apps Development", level: 80 },
          { skill: "IoT Systems", level: 75 },
          { skill: "Data Analyst", level: 70 },
        ].map((item, index) => (
          <div key={item.skill} className="space-y-1">
            <div className="flex justify-between text-xs">
              <span className="text-neutral-600 dark:text-neutral-400">
                {item.skill}
              </span>
              <span className="text-neutral-500 dark:text-neutral-500">
                {item.level}%
              </span>
            </div>
            <div className="h-1.5 bg-neutral-200 dark:bg-neutral-700 rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-gradient-to-r from-blue-500 to-purple-600 rounded-full"
                initial={{ width: 0 }}
                animate={hasAnimated ? { width: `${item.level}%` } : {}}
                transition={{ delay: 1 + index * 0.1, duration: 0.8 }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// const TypingCodeFeature = ({ text }: { text: string }) => {
//   const [displayedText, setDisplayedText] = useState("");
//   const [currentIndex, setCurrentIndex] = useState(0);
//   const terminalRef = useRef<HTMLDivElement>(null);

//   useEffect(() => {
//     if (currentIndex < text.length) {
//       const timeout = setTimeout(() => {
//         setDisplayedText((prev) => prev + text[currentIndex]);
//         setCurrentIndex((prev) => prev + 1);

//         if (terminalRef.current) {
//           terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
//         }
//       }, Math.random() * 30 + 10); // Random typing speed for realistic effect

//       return () => clearTimeout(timeout);
//     }
//   }, [currentIndex, text]);

//   // Reset animation when component unmounts and remounts
//   useEffect(() => {
//     setDisplayedText("");
//     setCurrentIndex(0);
//   }, []);

//   return (
//     <div className="mt-3 relative">
//       <div className="flex items-center gap-2 mb-2">
//         <div className="text-xs text-neutral-500 dark:text-neutral-400">
//           server.ts
//         </div>
//       </div>
//       <div
//         ref={terminalRef}
//         className="bg-neutral-900 dark:bg-black text-neutral-100 p-3 rounded-md text-xs font-mono h-[150px] overflow-y-auto"
//       >
//         <pre className="whitespace-pre-wrap">
//           {displayedText}
//           <span className="animate-pulse">|</span>
//         </pre>
//       </div>
//     </div>
//   );
// };

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

            {/* {item.feature === "typing" && item.typingText && (
              <TypingCodeFeature text={item.typingText} />
            )} */}

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
      <h1 className="heading-xl mb-10">
        About <span className="gradient-text">Me</span>
      </h1>
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
      </div>
    </section>
  );
}
