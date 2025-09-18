"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { motion, AnimatePresence } from "motion/react";
import { Mail, User, MessageSquare, Send, Paperclip, Star } from "lucide-react";
import EmailSendingStatus from "@/components/ui/email-sending-status";
import FileUpload from "@/components/ui/file-upload";

// Validation schema
const contactSchema = z.object({
  name: z
    .string()
    .min(2, "Name must be at least 2 characters")
    .max(50, "Name must be less than 50 characters"),
  email: z.string().email("Please enter a valid email address"),
  subject: z
    .string()
    .min(5, "Subject must be at least 5 characters")
    .max(100, "Subject must be less than 100 characters"),
  message: z
    .string()
    .min(10, "Message must be at least 10 characters")
    .max(1000, "Message must be less than 1000 characters"),
});

type ContactFormData = z.infer<typeof contactSchema>;
type EmailStatus = "sending" | "success" | "error";

// Utility functions
function cn(...classes: (string | undefined | null | false)[]): string {
  return classes.filter(Boolean).join(" ");
}

const useToast = () => {
  const addToast = ({
    type,
    title,
    description,
  }: {
    type: string;
    title: string;
    description: string;
  }) => {
    console.log(`[Toast ${type.toUpperCase()}] ${title}: ${description}`);
  };
  return { addToast };
};

// Input component interfaces
interface AnimatedInputProps {
  label: string;
  placeholder: string;
  value: string;
  onChange: (value: string) => void;
  disabled?: boolean;
  className?: string;
  autoComplete?: string;
  type?: string;
}

// Minimalist Input Component - No backgrounds, just borders and text
const MinimalInput = ({
  label,
  placeholder,
  value,
  onChange,
  disabled = false,
  className = "",
  autoComplete = "off",
  type = "text",
}: AnimatedInputProps) => {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <div className="relative group">
      <motion.div
        className="absolute -top-2 left-0 right-0 h-px bg-gradient-to-r from-transparent via-blue-500/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        layoutId={`top-border-${label}`}
      />

      <div className="relative py-4">
        <motion.label
          className={cn(
            "absolute left-0 transition-all duration-300 pointer-events-none font-medium tracking-wide",
            isFocused || value
              ? "-top-6 text-xs text-blue-600 dark:text-blue-400"
              : "top-4 text-base text-zinc-500 dark:text-zinc-400"
          )}
          animate={{
            y: isFocused || value ? 0 : 0,
            scale: isFocused || value ? 1 : 1,
          }}
          transition={{ duration: 0.3, ease: "easeOut" }}
        >
          {label}
        </motion.label>

        <input
          type={type}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          placeholder={isFocused ? placeholder : ""}
          disabled={disabled}
          autoComplete={autoComplete}
          className={cn(
            "w-full bg-transparent border-0 border-b-2 focus:border-b-0 border-zinc-200 dark:border-zinc-700 px-0 py-3 transition-all duration-300",
            // "focus:border-blue-500 dark:focus:border-blue-400 focus:outline-none",
            "text-zinc-900 dark:text-zinc-100 text-lg font-light",
            "placeholder:text-zinc-400 dark:placeholder:text-zinc-500 placeholder:font-light",
            "disabled:opacity-50 disabled:cursor-not-allowed",
            className
          )}
        />

        <motion.div
          className="absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-blue-500 to-purple-500"
          initial={{ width: 0 }}
          animate={{ width: isFocused ? "100%" : "0%" }}
          transition={{ duration: 0.3, ease: "easeOut" }}
        />
      </div>

      <motion.div
        className="absolute -bottom-2 left-0 right-0 h-px bg-gradient-to-r from-transparent via-purple-500/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        layoutId={`bottom-border-${label}`}
      />
    </div>
  );
};

// Minimalist Textarea Component
const MinimalTextarea = ({
  label,
  placeholder,
  value,
  onChange,
  disabled = false,
  className = "",
  rows = 4,
}: AnimatedInputProps & { rows?: number }) => {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <div className="relative group">
      <motion.div
        className="absolute -top-2 left-0 right-0 h-px bg-gradient-to-r from-transparent via-blue-500/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        layoutId={`top-border-${label}`}
      />

      <div className="relative py-4">
        <motion.label
          className={cn(
            "absolute left-0 transition-all duration-300 pointer-events-none font-medium tracking-wide",
            isFocused || value
              ? "-top-6 text-xs text-blue-600 dark:text-blue-400"
              : "top-4 text-base text-zinc-500 dark:text-zinc-400"
          )}
          animate={{
            y: isFocused || value ? 0 : 0,
            scale: isFocused || value ? 1 : 1,
          }}
          transition={{ duration: 0.3, ease: "easeOut" }}
        >
          {label}
        </motion.label>

        <textarea
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          placeholder={isFocused ? placeholder : ""}
          disabled={disabled}
          rows={rows}
          className={cn(
            "w-full bg-transparent border-0 border-b-2 focus:border-b-0 border-zinc-200 dark:border-zinc-700 px-0 py-3 transition-all duration-300",
            // "focus:border-blue-500 dark:focus:border-blue-400 focus:outline-none",
            "text-zinc-900 dark:text-zinc-100 text-lg font-light leading-relaxed",
            "placeholder:text-zinc-400 dark:placeholder:text-zinc-500 placeholder:font-light",
            "disabled:opacity-50 disabled:cursor-not-allowed resize-none",
            className
          )}
        />

        <motion.div
          className="absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-blue-500 to-purple-500"
          initial={{ width: 0 }}
          animate={{ width: isFocused ? "100%" : "0%" }}
          transition={{ duration: 0.3, ease: "easeOut" }}
        />
      </div>

      <motion.div
        className="absolute -bottom-2 left-0 right-0 h-px bg-gradient-to-r from-transparent via-purple-500/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        layoutId={`bottom-border-${label}`}
      />
    </div>
  );
};

// Main Contact Component
export default function Contact() {
  const [emailStatus, setEmailStatus] = useState<EmailStatus | null>(null);
  const [attachedFiles, setAttachedFiles] = useState<File[]>([]);
  const [currentFormData, setCurrentFormData] =
    useState<ContactFormData | null>(null);
  const [errorMessage, setErrorMessage] = useState("");
  const { addToast } = useToast();

  const {
    handleSubmit,
    reset,
    setValue,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      name: "",
      email: "",
      subject: "",
      message: "",
    },
  });

  const formValues = watch();

  const onSubmit = async (formData: ContactFormData) => {
    // Store form data for the status component
    setCurrentFormData(formData);
    setEmailStatus("sending");

    try {
      console.log(
        "[Contact] Submitting form with attached files:",
        attachedFiles
      );

      const submitData = new FormData();
      submitData.append("name", formData.name);
      submitData.append("email", formData.email);
      submitData.append("subject", formData.subject);
      submitData.append("message", formData.message);

      attachedFiles.forEach((file, index) => {
        submitData.append(`attachment_${index}`, file);
      });

      const response = await fetch("/api/sendEmail", {
        method: "POST",
        body: submitData,
      });

      const result = await response.json();

      if (response.ok) {
        setEmailStatus("success");
        addToast({
          type: "success",
          title: "Email sent successfully!",
          description: "I'll get back to you within 24-48 hours.",
        });

        setTimeout(() => {
          reset();
          setAttachedFiles([]);
          setEmailStatus(null);
          setCurrentFormData(null);
        }, 3000);
      } else {
        setEmailStatus("error");
        setErrorMessage(
          result.error || "Failed to send email. Please try again later."
        );
        addToast({
          type: "error",
          title: "Failed to send email",
          description: result.error || "Please try again later.",
        });
      }
    } catch (error) {
      console.error("Error sending email:", error);
      setEmailStatus("error");
      setErrorMessage(
        "Network error. Please check your connection and try again."
      );
      addToast({
        type: "error",
        title: "Network error",
        description: "Please check your connection and try again.",
      });
    }
  };

  const handleFileUpload = (file: File) => {
    console.log("[Contact] File uploaded:", file.name, file.size);
    setAttachedFiles((prev) => [...prev, file]);
    addToast({
      type: "success",
      title: "File attached",
      description: `${file.name} has been attached to your message.`,
    });
  };

  const handleFileRemove = (fileIndex: number) => {
    console.log("[Contact] File removed at index:", fileIndex);
    setAttachedFiles((prev) => prev.filter((_, index) => index !== fileIndex));
    addToast({
      type: "info",
      title: "File removed",
      description: "Attachment has been removed from your message.",
    });
  };

  const handleStatusComplete = () => {
    setEmailStatus(null);
    setCurrentFormData(null);
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center py-20 px-4">
      {/* Background blur overlay */}
      <AnimatePresence>
        {emailStatus && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/20 dark:bg-black/40 backdrop-blur-sm z-40"
          />
        )}
      </AnimatePresence>

      {/* Email Status Modal */}
      <AnimatePresence>
        {emailStatus && currentFormData && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="fixed inset-0 flex items-center justify-center z-50 p-4"
          >
            <EmailSendingStatus
              status={emailStatus}
              onComplete={handleStatusComplete}
              senderName={currentFormData.name}
              senderEmail={currentFormData.email}
              recipientName="Dany Prastya"
              recipientEmail="danyprastyaalhakim@gmail.com"
              subject={currentFormData.subject}
              errorMessage={errorMessage}
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute top-20 left-10 w-2 h-2 bg-blue-500/20 rounded-full"
          animate={{
            y: [0, -20, 0],
            opacity: [0.2, 0.6, 0.2],
          }}
          transition={{ duration: 4, repeat: Infinity }}
        />
        <motion.div
          className="absolute top-1/3 right-20 w-1 h-1 bg-purple-500/30 rounded-full"
          animate={{
            y: [0, -15, 0],
            opacity: [0.3, 0.7, 0.3],
          }}
          transition={{ duration: 3, repeat: Infinity, delay: 1 }}
        />
        <motion.div
          className="absolute bottom-1/4 left-1/4 w-1.5 h-1.5 bg-blue-400/25 rounded-full"
          animate={{
            y: [0, -10, 0],
            opacity: [0.25, 0.5, 0.25],
          }}
          transition={{ duration: 5, repeat: Infinity, delay: 2 }}
        />
      </div>

      <div className="w-full max-w-4xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ delay: 0.3, type: "spring", stiffness: 200 }}
            className="inline-flex items-center justify-center w-20 h-20 mb-8 relative"
          >
            <motion.div
              className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-purple-500/10 rounded-full"
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            />
            <Mail className="w-10 h-10 text-blue-600 dark:text-blue-400 relative z-10" />
            <motion.div
              className="absolute inset-0 border border-blue-500/20 rounded-full"
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
          </motion.div>

          <motion.h2
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="text-4xl lg:text-6xl font-light tracking-tight mb-6 text-zinc-900 dark:text-zinc-100"
          >
            Let&apos;s{" "}
            <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-blue-600 bg-clip-text text-transparent font-medium">
              Connect
            </span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7, duration: 0.8 }}
            className="text-xl font-light text-zinc-600 dark:text-zinc-400 max-w-2xl mx-auto leading-relaxed"
          >
            Have an idea you&apos;d like to explore? I&apos;d love to hear about
            it and discuss how we can bring it to life.
          </motion.p>
        </motion.div>

        {/* Contact Form */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9, duration: 0.8 }}
          className="max-w-3xl mx-auto"
        >
          <div className="space-y-12">
            {/* Name and Email Row */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 1.1, duration: 0.6 }}
              >
                <MinimalInput
                  label="Your Name"
                  placeholder="What should I call you?"
                  value={formValues.name || ""}
                  onChange={(value) => setValue("name", value)}
                  disabled={isSubmitting}
                  autoComplete="name"
                  className={cn(errors.name && "border-red-500")}
                />
                {errors.name && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex items-center gap-2 mt-2 text-red-500 text-sm"
                  >
                    <User className="w-4 h-4" />
                    {errors.name.message}
                  </motion.div>
                )}
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 1.2, duration: 0.6 }}
              >
                <MinimalInput
                  label="Email Address"
                  placeholder="Where can I reach you?"
                  type="email"
                  value={formValues.email || ""}
                  onChange={(value) => setValue("email", value)}
                  disabled={isSubmitting}
                  autoComplete="email"
                  className={cn(errors.email && "border-red-500")}
                />
                {errors.email && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex items-center gap-2 mt-2 text-red-500 text-sm"
                  >
                    <Mail className="w-4 h-4" />
                    {errors.email.message}
                  </motion.div>
                )}
              </motion.div>
            </div>

            {/* Subject */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.3, duration: 0.6 }}
            >
              <MinimalInput
                label="Subject"
                placeholder="What's on your mind?"
                value={formValues.subject || ""}
                onChange={(value) => setValue("subject", value)}
                disabled={isSubmitting}
                autoComplete="off"
                className={cn(errors.subject && "border-red-500")}
              />
              {errors.subject && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex items-center gap-2 mt-2 text-red-500 text-sm"
                >
                  <MessageSquare className="w-4 h-4" />
                  {errors.subject.message}
                </motion.div>
              )}
            </motion.div>

            {/* Message */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.4, duration: 0.6 }}
            >
              <MinimalTextarea
                label="Your Message"
                placeholder="Tell me about your project, idea, or just say hello..."
                value={formValues.message || ""}
                onChange={(value) => setValue("message", value)}
                disabled={isSubmitting}
                rows={6}
                className={cn(errors.message && "border-red-500")}
              />
              {errors.message && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex items-center gap-2 mt-2 text-red-500 text-sm"
                >
                  <MessageSquare className="w-4 h-4" />
                  {errors.message.message}
                </motion.div>
              )}
            </motion.div>

            {/* File Upload */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.5, duration: 0.6 }}
              className="space-y-6"
            >
              <div className="flex items-center gap-4">
                <motion.div
                  whileHover={{ rotate: 12 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <Paperclip className="w-6 h-6 text-zinc-500 dark:text-zinc-400" />
                </motion.div>
                <div>
                  <h3 className="text-lg font-light text-zinc-900 dark:text-zinc-100">
                    Share Files
                  </h3>
                  <p className="text-sm text-zinc-500 dark:text-zinc-400">
                    Optional attachments to help explain your project
                  </p>
                </div>
                {attachedFiles.length > 0 && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="ml-auto flex items-center gap-2 px-3 py-1 border border-blue-200 dark:border-blue-800 rounded-full text-sm text-blue-600 dark:text-blue-400"
                  >
                    <Star className="w-4 h-4" />
                    {attachedFiles.length} file
                    {attachedFiles.length !== 1 ? "s" : ""}
                  </motion.div>
                )}
              </div>

              <FileUpload
                onUploadSuccess={handleFileUpload}
                onFileRemove={handleFileRemove}
                currentFiles={attachedFiles}
                acceptedFileTypes={[
                  "image/*",
                  "application/pdf",
                  ".doc",
                  ".docx",
                  ".txt",
                  ".zip",
                  ".rar",
                ]}
                maxFileSize={10 * 1024 * 1024}
                uploadDelay={0}
                className="w-full"
              />
            </motion.div>

            {/* Submit Button */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.6, duration: 0.6 }}
              className="flex justify-center pt-8"
            >
              <motion.button
                type="button"
                onClick={handleSubmit(onSubmit)}
                disabled={isSubmitting}
                whileHover={{ scale: isSubmitting ? 1 : 1.02 }}
                whileTap={{ scale: isSubmitting ? 1 : 0.98 }}
                className={cn(
                  "group relative rounded-full px-16 py-5 text-lg font-light tracking-wide transition-all duration-500",
                  "text-zinc-900 dark:text-zinc-100 border-2 border-zinc-300 dark:border-zinc-700",
                  "hover:border-blue-500 dark:hover:border-blue-400 hover:text-blue-600 dark:hover:text-blue-400",
                  "disabled:opacity-50 disabled:cursor-not-allowed",
                  "focus:outline-none focus:ring-4 focus:ring-blue-500/10"
                )}
              >
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-blue-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  layoutId="button-bg"
                />

                <div className="relative flex items-center justify-center gap-4">
                  {isSubmitting ? (
                    <>
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{
                          duration: 1,
                          repeat: Infinity,
                          ease: "linear",
                        }}
                        className="w-5 h-5 border border-current border-t-transparent rounded-full"
                      />
                      <span>Sending your message...</span>
                    </>
                  ) : (
                    <>
                      <span>Send Message</span>
                      <motion.div
                        whileHover={{ x: 4 }}
                        transition={{ type: "spring", stiffness: 400 }}
                      >
                        <Send className="w-5 h-5" />
                      </motion.div>
                    </>
                  )}
                </div>
              </motion.button>
            </motion.div>
          </div>
        </motion.div>

        {/* Footer Message */}
        {/* <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2, duration: 0.8 }}
          className="text-center mt-16"
        >
          <p className="text-zinc-500 dark:text-zinc-400 font-light">
            Usually respond within <span className="text-blue-600 dark:text-blue-400 font-medium">24 hours</span>
          </p>
        </motion.div> */}
      </div>
    </section>
  );
}
