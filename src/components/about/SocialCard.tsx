"use client";

/* eslint-disable @typescript-eslint/no-explicit-any */
import { MapPin, Clock3, Phone } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  TooltipProvider,
  Tooltip,
  TooltipTrigger,
  TooltipContent,
} from "@/components/ui/tooltip";
import EnhancedSocialButton from "@/components/ui/social-button";
import EmailDialog from "@/components/ui/email-button";

interface SocialCardProps {
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
}

const statusColor = (status: string) => {
  switch (status) {
    case "available": return "bg-green-500";
    case "busy": return "bg-yellow-500";
    case "unavailable": return "bg-red-500";
    default: return "bg-gray-500";
  }
};

export function SocialCard({ social }: SocialCardProps) {
  const handleWhatsApp = () => {
    const message = encodeURIComponent(
      "Hi Dany! I'm interested in discussing a project with you."
    );
    window.open(
      `https://wa.me/${social.contacts.whatsapp.replace(/[^\d]/g, "")}?text=${message}`,
      "_blank"
    );
  };

  return (
    <div className="space-y-6 mt-4">
      {/* Availability */}
      <div className="flex items-center w-fit gap-3 p-3 rounded-lg bg-neutral-50 dark:bg-neutral-800/50">
        <div className="relative">
          <div className={`w-3 h-3 rounded-full ${statusColor(social.availability.status)}`} />
          <div className={`absolute inset-0 w-3 h-3 rounded-full ${statusColor(social.availability.status)} animate-ping opacity-75`} />
        </div>
        <div className="text-sm">
          <div className="font-medium text-neutral-900 dark:text-neutral-100">Open to work</div>
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

      {/* CTAs */}
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
                  "backdrop-blur-sm transition-all duration-300 rounded-xl hover:scale-105"
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
}
