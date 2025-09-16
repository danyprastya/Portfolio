import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { Github, Linkedin, Instagram, Music2, Sparkles } from "lucide-react";
import { useState } from "react";
import { Button } from "./button";

const EnhancedSocialButton = ({
  className,
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement>) => {
  const [isVisible, setIsVisible] = useState(false);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const shareButtons = [
    {
      icon: Github,
      label: "GitHub",
      url: "https://github.com/danyprastya",
      color: "hover:bg-gray-700 hover:text-white",
    },
    {
      icon: Linkedin,
      label: "LinkedIn",
      url: "https://www.linkedin.com/in/dany-prastya-al-hakim-9b181428b",
      color: "hover:bg-blue-600 hover:text-white",
    },
    {
      icon: Instagram,
      label: "Instagram",
      url: "https://instagram.com/danyhkm_",
      color: "hover:bg-pink-500 hover:text-white",
    },
    {
      icon: Music2,
      label: "Tiktok",
      url: "https://tiktok.com/dnyhkm",
      color: "hover:bg-gray-700 hover:text-white",
    },
  ];

  const handleShare = (index: number, url: string) => {
    setActiveIndex(index);
    window.open(url, "_blank");
    setTimeout(() => setActiveIndex(null), 300);
  };

  return (
    <div
      className="relative"
      onMouseEnter={() => setIsVisible(true)}
      onMouseLeave={() => setIsVisible(false)}
    >
      <motion.div
        animate={{
          opacity: isVisible ? 0 : 1,
        }}
        transition={{
          duration: 0.2,
          ease: "easeInOut",
        }}
      >
        <Button
          className={cn(
            "h-12 min-w-32 relative",
            "bg-neutral-100 dark:bg-neutral-800/80",
            "hover:bg-neutral-200 dark:hover:bg-neutral-700",
            "text-neutral-700 dark:text-neutral-300",
            "border border-neutral-200 dark:border-neutral-700",
            "transition-colors duration-200",
            className
          )}
          {...props}
        >
          <span className="flex items-center gap-2">
            <Sparkles className="w-5 h-5" />
            Social Links
          </span>
        </Button>
      </motion.div>

      <motion.div
        className="absolute top-0 left-0 flex h-12 overflow-hidden"
        animate={{
          width: isVisible ? "auto" : 0,
        }}
        transition={{
          duration: 0.3,
          ease: [0.23, 1, 0.32, 1],
        }}
      >
        {shareButtons.map((button, i) => (
          <motion.button
            type="button"
            key={`share-${button.label}`}
            aria-label={button.label}
            onClick={() => handleShare(i, button.url)}
            className={cn(
              "h-12 w-12",
              "flex items-center justify-center",
              "bg-neutral-700 dark:bg-neutral-200",
              "text-neutral-100 dark:text-neutral-800",
              i === 0 && "rounded-l-lg",
              i === 3 && "rounded-r-lg",
              "border-r border-neutral-600 dark:border-neutral-300 last:border-r-0",
              "outline-none relative overflow-hidden",
              "transition-all duration-200",
              // Fixed hover colors with !important to ensure specificity
              button.color.includes("gray") &&
                "hover:!bg-gray-700 hover:!text-white",
              button.color.includes("blue") &&
                "hover:!bg-blue-600 hover:!text-white",
              button.color.includes("pink") &&
                "hover:!bg-pink-500 hover:!text-white"
            )}
            animate={{
              opacity: isVisible ? 1 : 0,
              x: isVisible ? 0 : 0,
            }}
            transition={{
              duration: 0.3,
              ease: [0.23, 1, 0.32, 1],
              delay: isVisible ? i * 0.05 : 0,
            }}
          >
            <motion.div
              className="relative z-10"
              animate={{
                scale: activeIndex === i ? 0.85 : 1,
              }}
              transition={{
                duration: 0.2,
                ease: "easeInOut",
              }}
            >
              <button.icon className="w-4 h-4" />
            </motion.div>
            <motion.div
              className="absolute inset-0 bg-white dark:bg-black"
              initial={{ opacity: 0 }}
              animate={{
                opacity: activeIndex === i ? 0.15 : 0,
              }}
              transition={{
                duration: 0.2,
                ease: "easeInOut",
              }}
            />
          </motion.button>
        ))}
      </motion.div>
    </div>
  );
};

export default EnhancedSocialButton;