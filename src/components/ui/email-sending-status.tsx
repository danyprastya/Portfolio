/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { motion, AnimatePresence } from "motion/react";
import { Card, CardContent } from "./card";
import { Mail, CheckCircle, XCircle, Send, User, AtSign } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./tooltip";
import { useState, useEffect } from "react";

// cn utility function
function cn(...classes: (string | undefined | null | false)[]): string {
  return classes.filter(Boolean).join(" ");
}

type EmailStatus = "sending" | "success" | "error";

interface EmailSendingStatusProps {
  status: EmailStatus;
  onComplete?: () => void;
  senderName?: string;
  senderEmail?: string;
  recipientName?: string;
  recipientEmail?: string;
  subject?: string;
  errorMessage?: string;
}

const draw = {
  hidden: { pathLength: 0, opacity: 0 },
  visible: (i: number) => ({
    pathLength: 1,
    opacity: 1,
    transition: {
      pathLength: {
        delay: i * 0.2,
        type: "spring",
        duration: 1.5,
        bounce: 0.2,
        ease: [0.22, 1, 0.36, 1],
      },
      opacity: { delay: i * 0.2, duration: 0.3 },
    },
  }),
};

export function Checkmark({
  size = 100,
  strokeWidth = 2,
  color = "currentColor",
  className = "",
}: {
  size?: number;
  strokeWidth?: number;
  color?: string;
  className?: string;
}) {
  return (
    <motion.svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      initial="hidden"
      animate="visible"
      className={className}
    >
      <title>Animated Checkmark</title>
      <motion.circle
        cx="50"
        cy="50"
        r="42"
        stroke={color}
        variants={draw as any}
        custom={0}
        style={{
          strokeWidth,
          strokeLinecap: "round",
          fill: "transparent",
          filter: "drop-shadow(0 0 2px rgba(16, 185, 129, 0.2))",
        }}
      />
      <motion.path
        d="M32 50L45 63L68 35"
        stroke={color}
        variants={draw as any}
        custom={1}
        style={{
          strokeWidth: strokeWidth + 0.5,
          strokeLinecap: "round",
          strokeLinejoin: "round",
          fill: "transparent",
          filter: "drop-shadow(0 0 1px rgba(16, 185, 129, 0.3))",
        }}
      />
    </motion.svg>
  );
}

export default function EmailSendingStatus({
  status,
  onComplete,
  senderName = "You",
  senderEmail = "sender@example.com",
  recipientName = "John Doe",
  recipientEmail = "recipient@example.com",
  subject = "Important Message",
  errorMessage = "Failed to send email. Please try again.",
}: EmailSendingStatusProps) {
  const [displayMessage, setDisplayMessage] = useState("");
  const timestamp = new Date().toLocaleString();
  const messageId = `MSG-${Math.random()
    .toString(36)
    .substr(2, 9)
    .toUpperCase()}`;

  useEffect(() => {
    let timer: NodeJS.Timeout;

    switch (status) {
      case "sending":
        setDisplayMessage("Composing and sending your message...");
        break;
      case "success":
        setDisplayMessage(`Email delivered successfully to ${recipientName}`);
        timer = setTimeout(() => {
          onComplete?.();
        }, 3000);
        break;
      case "error":
        setDisplayMessage(errorMessage);
        timer = setTimeout(() => {
          onComplete?.();
        }, 5000);
        break;
    }

    return () => {
      if (timer) clearTimeout(timer);
    };
  }, [status, recipientName, errorMessage, onComplete]);

  const getStatusColor = () => {
    switch (status) {
      case "sending":
        return "text-blue-500";
      case "success":
        return "text-emerald-500";
      case "error":
        return "text-red-500";
      default:
        return "text-zinc-500";
    }
  };

  const getBackgroundColor = () => {
    switch (status) {
      case "sending":
        return "hover:border-blue-500/20 dark:hover:border-blue-500/20";
      case "success":
        return "hover:border-emerald-500/20 dark:hover:border-emerald-500/20";
      case "error":
        return "hover:border-red-500/20 dark:hover:border-red-500/20";
      default:
        return "hover:border-zinc-500/20 dark:hover:border-zinc-500/20";
    }
  };

  const getGlowColor = () => {
    switch (status) {
      case "sending":
        return "bg-blue-500/10 dark:bg-blue-500/5";
      case "success":
        return "bg-emerald-500/10 dark:bg-emerald-500/5";
      case "error":
        return "bg-red-500/10 dark:bg-red-500/5";
      default:
        return "bg-zinc-500/10 dark:bg-zinc-500/5";
    }
  };

  const getSpinnerColor = () => {
    switch (status) {
      case "sending":
        return "rgb(59 130 246)";
      case "success":
        return "rgb(16 185 129)";
      case "error":
        return "rgb(239 68 68)";
      default:
        return "rgb(113 113 122)";
    }
  };

  return (
    <TooltipProvider>
      <Card
        className={cn(
          "w-full max-w-sm mx-auto p-6 h-[420px] flex flex-col bg-white dark:bg-zinc-900 border border-zinc-200/60 dark:border-zinc-800/60 backdrop-blur-sm shadow-[0_0_0_1px_rgba(0,0,0,0.03)] dark:shadow-[0_0_0_1px_rgba(255,255,255,0.03)] transition-all duration-500",
          getBackgroundColor()
        )}
      >
        <CardContent className="flex-1 flex flex-col justify-center space-y-4">
          <div className="h-[80px] flex items-center justify-center">
            <motion.div
              className="flex justify-center"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.5,
                ease: [0.22, 1, 0.36, 1],
              }}
            >
              <div className="relative w-[100px] h-[100px] flex items-center justify-center">
                <motion.div
                  className={cn(
                    "absolute inset-0 blur-2xl rounded-full",
                    getGlowColor()
                  )}
                  initial={{ opacity: 0 }}
                  animate={{
                    opacity: [0, 1, 0.8],
                  }}
                  transition={{
                    duration: 1.5,
                    times: [0, 0.5, 1],
                    ease: [0.22, 1, 0.36, 1],
                  }}
                />
                <AnimatePresence mode="wait">
                  {status === "sending" ? (
                    <motion.div
                      key="sending"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{
                        opacity: 0,
                        rotate: 360,
                      }}
                      transition={{
                        duration: 0.6,
                        ease: "easeInOut",
                      }}
                      className="w-[100px] h-[100px] flex items-center justify-center"
                    >
                      <div className="relative z-10">
                        <motion.div
                          className="absolute inset-0 rounded-full border-2 border-transparent"
                          style={{
                            borderLeftColor: getSpinnerColor(),
                            borderTopColor: `${getSpinnerColor()} / 0.2`,
                            filter: "blur(0.5px)",
                          }}
                          animate={{
                            rotate: 360,
                            scale: [1, 1.02, 1],
                          }}
                          transition={{
                            rotate: {
                              duration: 2,
                              repeat: Infinity,
                              ease: "linear",
                            },
                            scale: {
                              duration: 2,
                              repeat: Infinity,
                              ease: "easeInOut",
                            },
                          }}
                        />
                        <div
                          className={cn(
                            "relative z-10 bg-white dark:bg-zinc-900 rounded-full p-5",
                            status === "sending" &&
                              "shadow-[0_0_15px_rgba(59,130,246,0.1)]"
                          )}
                        >
                          <Send className={cn("h-10 w-10", getStatusColor())} />
                        </div>
                      </div>
                    </motion.div>
                  ) : status === "success" ? (
                    <motion.div
                      key="success"
                      initial={{
                        opacity: 0,
                        rotate: -180,
                      }}
                      animate={{
                        opacity: 1,
                        rotate: 0,
                      }}
                      transition={{
                        duration: 0.6,
                        ease: "easeInOut",
                      }}
                      className="w-[100px] h-[100px] flex items-center justify-center"
                    >
                      <div className="relative z-10 bg-white dark:bg-zinc-900 rounded-full p-5 border border-emerald-500">
                        <CheckCircle
                          className="h-10 w-10 text-emerald-500"
                          strokeWidth={3.5}
                        />
                      </div>
                    </motion.div>
                  ) : status === "error" ? (
                    <motion.div
                      key="error"
                      initial={{
                        opacity: 0,
                        scale: 0.8,
                      }}
                      animate={{
                        opacity: 1,
                        scale: 1,
                      }}
                      transition={{
                        duration: 0.6,
                        ease: "easeInOut",
                      }}
                      className="w-[100px] h-[100px] flex items-center justify-center"
                    >
                      <div className="relative z-10 bg-white dark:bg-zinc-900 rounded-full p-5 border border-red-500">
                        <XCircle
                          className="h-10 w-10 text-red-500"
                          strokeWidth={3.5}
                        />
                      </div>
                    </motion.div>
                  ) : null}
                </AnimatePresence>
              </div>
            </motion.div>
          </div>

          <div className="h-[280px] flex flex-col">
            <motion.div
              className="space-y-2 text-center w-full mb-4"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                delay: 0.3,
                duration: 0.8,
                ease: [0.22, 1, 0.36, 1],
              }}
            >
              <AnimatePresence mode="wait">
                <motion.h2
                  key={`${status}-title`}
                  className="text-lg tracking-tighter font-semibold uppercase text-zinc-900 dark:text-zinc-100"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{
                    duration: 0.5,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                >
                  {status === "sending" && "Email in Progress"}
                  {status === "success" && "Email Sent"}
                  {status === "error" && "Email Failed"}
                </motion.h2>
              </AnimatePresence>

              <AnimatePresence mode="wait">
                <motion.div
                  key={`${status}-id`}
                  className={cn("text-xs font-medium", getStatusColor())}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{
                    duration: 0.4,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                >
                  {status === "sending" && "Processing your email..."}
                  {status === "success" && `Message ID: ${messageId}`}
                  {status === "error" && "Please try again"}
                </motion.div>
              </AnimatePresence>

              {/* From/To Section with smooth animation */}
              <div className="flex items-center gap-4 mt-4">
                <motion.div
                  className="flex-1 relative"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{
                    duration: 0.3,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                >
                  <motion.div
                    className="flex flex-col items-start relative"
                    initial={{ gap: "12px" }}
                    animate={{
                      gap: status === "success" ? "0px" : "12px",
                    }}
                    transition={{
                      duration: 0.6,
                      ease: [0.32, 0.72, 0, 1],
                    }}
                  >
                    {/* From Section */}
                    <motion.div
                      className={cn(
                        "w-full bg-zinc-50 dark:bg-zinc-800/50 rounded-xl p-2.5 border border-zinc-200 dark:border-zinc-700/50 backdrop-blur-md transition-all duration-300",
                        status === "success"
                          ? "rounded-b-none border-b-0"
                          : "hover:border-emerald-500/30"
                      )}
                      animate={{
                        y: 0,
                        scale: 1,
                      }}
                      transition={{
                        duration: 0.6,
                        ease: [0.32, 0.72, 0, 1],
                      }}
                    >
                      <div className="space-y-1 w-full">
                        <motion.span
                          className="text-xs font-medium text-zinc-500 dark:text-zinc-400 flex items-center gap-1.5"
                          initial={{ opacity: 1 }}
                          animate={{ opacity: 1 }}
                          transition={{
                            duration: 0.3,
                            ease: [0.22, 1, 0.36, 1],
                          }}
                        >
                          <User className="w-3 h-3" />
                          From
                        </motion.span>
                        <div className="flex flex-col gap-1.5">
                          <motion.div
                            className="flex items-center gap-2.5 group"
                            initial={{ opacity: 1 }}
                            animate={{ opacity: 1 }}
                            transition={{
                              duration: 0.3,
                              ease: [0.22, 1, 0.36, 1],
                            }}
                          >
                            <motion.span
                              className="inline-flex items-center justify-center w-7 h-7 rounded-lg bg-white dark:bg-zinc-900 shadow-lg border border-zinc-300 dark:border-zinc-700 text-sm font-medium text-zinc-900 dark:text-zinc-100 transition-colors duration-300"
                              whileHover={{
                                scale: 1.05,
                              }}
                              transition={{
                                type: "spring",
                                stiffness: 400,
                                damping: 10,
                              }}
                            >
                              {senderName.charAt(0).toUpperCase()}
                            </motion.span>
                            <div className="flex flex-col items-start">
                              <motion.span
                                className="font-medium text-zinc-900 dark:text-zinc-100 tracking-tight"
                                initial={{
                                  opacity: status === "success" ? 1 : 0.7,
                                }}
                                animate={{
                                  opacity: status === "success" ? 1 : 0.7,
                                }}
                                transition={{
                                  duration: 0.3,
                                  ease: [0.22, 1, 0.36, 1],
                                }}
                              >
                                {senderName}
                              </motion.span>
                              <motion.span
                                className="text-xs text-zinc-500 dark:text-zinc-400"
                                initial={{ opacity: 1 }}
                                animate={{ opacity: 1 }}
                                transition={{
                                  duration: 0.3,
                                  ease: [0.22, 1, 0.36, 1],
                                }}
                              >
                                {senderEmail}
                              </motion.span>
                            </div>
                          </motion.div>
                        </div>
                      </div>
                    </motion.div>

                    {/* To Section */}
                    <motion.div
                      className={cn(
                        "w-full bg-zinc-50 dark:bg-zinc-800/50 rounded-xl p-2.5 border border-zinc-200 dark:border-zinc-700/50 backdrop-blur-md transition-all duration-300",
                        status === "success"
                          ? "rounded-t-none border-t-0"
                          : "hover:border-emerald-500/30"
                      )}
                      animate={{
                        y: 0,
                        scale: 1,
                      }}
                      transition={{
                        duration: 0.6,
                        ease: [0.32, 0.72, 0, 1],
                      }}
                    >
                      <div className="space-y-1 w-full">
                        <motion.span
                          className="text-xs font-medium text-zinc-500 dark:text-zinc-400 flex items-center gap-1.5"
                          initial={{ opacity: 1 }}
                          animate={{ opacity: 1 }}
                          transition={{
                            duration: 0.3,
                            ease: [0.22, 1, 0.36, 1],
                          }}
                        >
                          <AtSign className="w-3 h-3" />
                          To
                        </motion.span>
                        <div className="flex flex-col gap-1.5">
                          <motion.div
                            className="flex items-center gap-2.5 group"
                            initial={{ opacity: 1 }}
                            animate={{ opacity: 1 }}
                            transition={{
                              duration: 0.3,
                              ease: [0.22, 1, 0.36, 1],
                            }}
                          >
                            <motion.span
                              className="inline-flex items-center justify-center w-7 h-7 rounded-lg bg-white dark:bg-zinc-900 shadow-lg border border-zinc-300 dark:border-zinc-700 text-sm font-medium text-zinc-900 dark:text-zinc-100 transition-colors duration-300"
                              whileHover={{
                                scale: 1.05,
                              }}
                              transition={{
                                type: "spring",
                                stiffness: 400,
                                damping: 10,
                              }}
                            >
                              {recipientName.charAt(0).toUpperCase()}
                            </motion.span>
                            <div className="flex flex-col items-start">
                              <motion.span
                                className="font-medium text-zinc-900 dark:text-zinc-100 tracking-tight"
                                initial={{
                                  opacity: status === "success" ? 1 : 0.7,
                                }}
                                animate={{
                                  opacity: status === "success" ? 1 : 0.7,
                                }}
                                transition={{
                                  duration: 0.3,
                                  ease: [0.22, 1, 0.36, 1],
                                }}
                              >
                                {recipientName}
                              </motion.span>
                              <motion.span
                                className="text-xs text-zinc-500 dark:text-zinc-400"
                                initial={{ opacity: 1 }}
                                animate={{ opacity: 1 }}
                                transition={{
                                  duration: 0.3,
                                  ease: [0.22, 1, 0.36, 1],
                                }}
                              >
                                {recipientEmail}
                              </motion.span>
                            </div>
                          </motion.div>
                        </div>
                      </div>
                    </motion.div>
                  </motion.div>
                </motion.div>
              </div>

              <motion.div
                className="flex items-center justify-center gap-2 text-xs text-zinc-500 dark:text-zinc-400 mt-2"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{
                  delay: 0.5,
                  duration: 0.6,
                  ease: [0.22, 1, 0.36, 1],
                }}
              >
                <AnimatePresence mode="wait">
                  <motion.span
                    key={`${status}-message`}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{
                      duration: 0.4,
                      ease: [0.22, 1, 0.36, 1],
                    }}
                  >
                    {status === "sending" && "Subject: " + subject}
                    {status === "success" && `Delivered at ${timestamp}`}
                    {status === "error" && displayMessage}
                  </motion.span>
                </AnimatePresence>

                {status !== "sending" && (
                  <Tooltip>
                    <TooltipTrigger>
                      <Mail className="w-3 h-3 text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-300 transition-colors" />
                    </TooltipTrigger>
                    <TooltipContent>
                      <p className="text-xs">
                        {status === "success"
                          ? "Email delivered successfully with confirmation"
                          : "Email delivery failed - please check your connection"}
                      </p>
                    </TooltipContent>
                  </Tooltip>
                )}
              </motion.div>
            </motion.div>
          </div>
        </CardContent>
      </Card>
    </TooltipProvider>
  );
}
