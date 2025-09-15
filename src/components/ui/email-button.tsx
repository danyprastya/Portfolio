// Enhanced Email Dialog Component

import { cn } from "@/lib/utils";
import emailFormSchema, { EmailFormData } from "@/utils/validation/email-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Dialog, DialogTrigger, DialogContent, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Label } from "@radix-ui/react-label";
import { TooltipProvider, Tooltip, TooltipTrigger, TooltipContent } from "@radix-ui/react-tooltip";
import { Mail, Loader2 } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import AnimatedInput from "./AnimatedInput";
import { BorderTrail } from "./border-trail";
import { Button } from "./button";
import { DialogHeader, DialogFooter } from "./dialog";
import FileUpload from "./file-upload";
import { Textarea } from "./textarea";
import { useToast } from "./toast";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const EmailDialog = ({ email }: { email: string }) => {
  const [isOpen, setIsOpen] = useState(false);
  const { addToast } = useToast();

  // Fixed: Initial state should be false, only show when submitting
  // const [isLoading, setIsLoading] = useState(false);
  const [showBorderTrail, setShowBorderTrail] = useState(false);
  const [attachedFiles, setAttachedFiles] = useState<File[]>([]);

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<EmailFormData>({
    resolver: zodResolver(emailFormSchema),
  });

  const formValues = watch();

  // Fixed: Move border trail logic to form submission
  const onSubmit = async (formData: EmailFormData) => {
    try {
      setShowBorderTrail(true);

      console.log("[v0] Submitting form with attached files:", attachedFiles);

      // Create FormData for file upload support
      const submitData = new FormData();
      submitData.append("name", formData.name);
      submitData.append("email", formData.email);
      submitData.append("subject", formData.subject);
      submitData.append("message", formData.message);

      attachedFiles.forEach((file, index) => {
        submitData.append(`attachment_${index}`, file);
        console.log(
          `[v0] File ${index} attached to FormData:`,
          file.name,
          file.size
        );
      });

      console.log("[v0] FormData entries:");
      for (const [key, value] of submitData.entries()) {
        console.log(`[v0] ${key}:`, value);
      }

      const response = await fetch("/api/sendEmail", {
        method: "POST",
        body: submitData, // Use FormData instead of JSON
      });

      if (response.ok) {
        addToast({
          type: "success",
          title: "Email sent successfully!",
          description: "I'll get back to you within 24 hours.",
        });
        reset();
        setAttachedFiles([]); // Reset file state
        setIsOpen(false);
      } else {
        const errorData = await response.json();
        addToast({
          type: "error",
          title: "Failed to send email",
          description: errorData.error || "Please try again later.",
        });
      }
    } catch (error) {
      console.error("Error sending email:", error);
      addToast({
        type: "error",
        title: "Network error",
        description: "Please check your connection and try again.",
      });
    } finally {
      setShowBorderTrail(false);
    }
  };

  const handleFileUpload = (file: File) => {
    console.log("[v0] File uploaded callback received:", file.name, file.size);
    setAttachedFiles((prev) => [...prev, file]);
    addToast({
      type: "success",
      title: "File attached",
      description: `${file.name} has been attached to your email.`,
    });
  };

  const handleFileRemove = (fileIndex: number) => {
    console.log("[v0] File removed callback received for index:", fileIndex);
    setAttachedFiles((prev) => prev.filter((_, index) => index !== fileIndex));
    addToast({
      type: "info",
      title: "File removed",
      description: "Attachment has been removed from your email.",
    });
  };

  const handleAnimationComplete = () => {
    // Animation completed, hide the trail
    setShowBorderTrail(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <DialogTrigger asChild>
              <Button
                className={cn(
                  "w-12 h-12 p-0",
                  "bg-neutral-100/80 dark:bg-neutral-800/80",
                  "hover:bg-neutral-200/80 dark:hover:bg-neutral-700/80",
                  "text-neutral-700 dark:text-neutral-300",
                  "border border-neutral-200/60 dark:border-neutral-700/60",
                  "backdrop-blur-sm transition-all duration-300",
                  "rounded-xl",
                  "hover:scale-105"
                )}
              >
                <Mail className="w-4 h-4" />
              </Button>
            </DialogTrigger>
          </TooltipTrigger>
          <TooltipContent side="top" className="glass text-sm font-medium">
            <p>Send me an email</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>

      <DialogContent
        className={cn(
          "sm:max-w-lg w-[95vw] max-h-[90vh] font-sans",
          "bg-white/95 dark:bg-neutral-900/95 backdrop-blur-sm",
          "border border-neutral-200/60 dark:border-neutral-800/60",
          "flex flex-col" // Make dialog flex container
        )}
      >
        {/* Fixed: Show border trail only when submitting */}
        {showBorderTrail && (
          <BorderTrail
            className={cn(
              "bg-gradient-to-r from-green-300 via-green-500 to-green-300 transition-opacity duration-300",
              "dark:from-green-700/30 dark:via-green-500 dark:to-green-700/30"
            )}
            size={120}
            transition={{
              ease: [0, 0.5, 0.8, 0.5],
              duration: 2,
              repeat: Infinity
            }}
            onAnimationComplete={handleAnimationComplete}
          />
        )}

        <DialogHeader className="flex-shrink-0 pb-2">
          <DialogTitle className="font-sans text-lg sm:text-xl font-semibold">
            Send me an email
          </DialogTitle>
          <DialogDescription className="font-sans text-sm text-neutral-600 dark:text-neutral-400">
            Fill out the form below and I&apos;ll get back to you soon!
          </DialogDescription>
        </DialogHeader>
        <div className="flex-1 overflow-y-auto pr-1">
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="space-y-3 m-5 font-sans"
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="space-y-2">
                <AnimatedInput
                  label="Name"
                  placeholder="Your name"
                  autoComplete="name"
                  value={formValues.name || ""}
                  onChange={(value) => setValue("name", value)}
                  disabled={isSubmitting}
                  className={cn(
                    errors.name && "border-red-500 focus:border-red-500"
                  )}
                />
                {errors.name && (
                  <span className="text-red-500 text-xs font-sans">
                    {errors.name.message}
                  </span>
                )}
              </div>

              <div className="space-y-2">
                <AnimatedInput
                  label="Email"
                  placeholder="your@email.com"
                  value={formValues.email || ""}
                  onChange={(value) => setValue("email", value)}
                  disabled={isSubmitting}
                  autoComplete="email"
                  className={cn(
                    errors.email && "border-red-500 focus:border-red-500"
                  )}
                />
                {errors.email && (
                  <span className="text-red-500 text-xs font-sans">
                    {errors.email.message}
                  </span>
                )}
              </div>
            </div>

            <div className="space-y-2">
              <AnimatedInput
                label="Subject"
                placeholder="Project inquiry..."
                value={formValues.subject || ""}
                onChange={(value) => setValue("subject", value)}
                disabled={isSubmitting}
                autoComplete="off"
                className={cn(
                  errors.subject && "border-red-500 focus:border-red-500"
                )}
              />
              {errors.subject && (
                <span className="text-red-500 text-xs font-sans">
                  {errors.subject.message}
                </span>
              )}
            </div>

            <div className="space-y-2">
              <Label
                htmlFor="message"
                className="font-sans text-sm font-medium"
              >
                Message
              </Label>
              <Textarea
                id="message"
                {...register("message")}
                placeholder="Tell me about your project..."
                rows={2}
                className={cn(
                  "font-sans resize-none text-sm",
                  "bg-white/80 dark:bg-neutral-800/80",
                  "border-neutral-200 dark:border-neutral-700",
                  "focus:border-neutral-400 dark:focus:border-neutral-600",
                  errors.message && "border-red-500 focus:border-red-500"
                )}
                disabled={isSubmitting}
              />
              {errors.message && (
                <span className="text-red-500 text-xs font-sans">
                  {errors.message.message}
                </span>
              )}
            </div>

            <div className="space-y-1">
              <Label className="font-sans text-sm font-medium">
                Attachments (Optional) - {attachedFiles.length} file
                {attachedFiles.length !== 1 ? "s" : ""} attached
              </Label>
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
                ]}
                maxFileSize={10 * 1024 * 1024} // 10MB
                uploadDelay={0}
                className="w-full"
              />
            </div>
          </form>
        </div>

        <DialogFooter className="flex-shrink-0 pt-3 mt-2 border-t border-neutral-200/60 dark:border-neutral-700/60">
          <Button
            type="submit"
            onClick={handleSubmit(onSubmit)}
            className={cn(
              "w-full font-sans font-medium text-sm sm:text-base",
              "bg-neutral-800 dark:bg-neutral-200",
              "text-white dark:text-neutral-800",
              "hover:bg-neutral-700 dark:hover:bg-neutral-300",
              "disabled:opacity-50 disabled:cursor-not-allowed",
              "h-10 sm:h-11"
            )}
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Sending...
              </>
            ) : (
              "Send Email"
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default EmailDialog