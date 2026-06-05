"use client";

import Image from "next/image";
import { TextLoop } from "@/components/ui/text-loop";

interface ProfileCardProps {
  profile: {
    imageUrl: string;
    title: React.ReactNode;
    description: React.ReactNode;
    role: string[];
  };
}

export function ProfileCard({ profile }: ProfileCardProps) {
  return (
    <div className="pt-2 relative">
      <div className="grid grid-flow-col justify-center items-center grid-rows-3 gap-4">
        <div className="row-span-3 justify-center items-center flex relative w-full h-full">
          <div className="relative w-[130px] h-[170px] sm:w-[150px] sm:h-[200px] rounded-2xl overflow-hidden ring-2 ring-border/40 ring-offset-2 ring-offset-background flex-shrink-0">
            <Image
              src={profile.imageUrl}
              alt="Dany Prastya — Web Developer"
              fill
              className="object-cover"
              style={{ objectPosition: "center 20%" }}
              priority
            />
          </div>
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
                initial: { y: 20, rotateX: 90, opacity: 0, filter: "blur(4px)" },
                animate: { y: 0, rotateX: 0, opacity: 1, filter: "blur(0px)" },
                exit: { y: -20, rotateX: -90, opacity: 0, filter: "blur(4px)" },
              }}
            >
              {profile.role}
            </TextLoop>
          </div>
        </div>

        <div className="text-left col-span-2 row-span-2 text-sm text-muted-foreground leading-relaxed">
          {profile.description}
        </div>
      </div>
    </div>
  );
}
