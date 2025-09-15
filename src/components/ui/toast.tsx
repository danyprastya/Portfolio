// components/ui/toast.tsx
"use client";

import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, CheckCircle2, AlertCircle } from "lucide-react";
import { cn } from "@/lib/utils";

export interface ToastProps {
  id: string;
  title?: string;
  description?: string;
  type?: "success" | "error" | "info";
  duration?: number;
  onClose: (id: string) => void;
}

export const Toast = React.forwardRef<
  React.ElementRef<typeof motion.div>,
  ToastProps
>(({ id, title, description, type = "info", duration = 5000, onClose }, ref) => {
  React.useEffect(() => {
    if (duration > 0) {
      const timer = setTimeout(() => {
        onClose(id);
      }, duration);

      return () => clearTimeout(timer);
    }
  }, [id, duration, onClose]);

  const getIcon = () => {
    switch (type) {
      case "success":
        return <CheckCircle2 className="w-5 h-5 text-green-500" />;
      case "error":
        return <AlertCircle className="w-5 h-5 text-red-500" />;
      default:
        return <AlertCircle className="w-5 h-5 text-blue-500" />;
    }
  };

  const getBorderColor = () => {
    switch (type) {
      case "success":
        return "border-green-200 dark:border-green-800";
      case "error":
        return "border-red-200 dark:border-red-800";
      default:
        return "border-blue-200 dark:border-blue-800";
    }
  };

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -50, scale: 0.95 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      className={cn(
        "relative flex items-start gap-3 p-4 rounded-lg shadow-lg",
        "bg-white/95 dark:bg-neutral-900/95 backdrop-blur-sm",
        "border",
        getBorderColor(),
        "max-w-sm w-full"
      )}
    >
      <div className="flex-shrink-0 mt-0.5">{getIcon()}</div>
      
      <div className="flex-1 min-w-0">
        {title && (
          <div className="text-sm font-semibold text-neutral-900 dark:text-neutral-100">
            {title}
          </div>
        )}
        {description && (
          <div className="text-sm text-neutral-600 dark:text-neutral-400 mt-1">
            {description}
          </div>
        )}
      </div>

      <button
        onClick={() => onClose(id)}
        className="flex-shrink-0 p-1 rounded-md hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
      >
        <X className="w-4 h-4 text-neutral-500 dark:text-neutral-400" />
      </button>
    </motion.div>
  );
});
Toast.displayName = "Toast";

// Toast Provider Context
interface ToastContextValue {
  addToast: (toast: Omit<ToastProps, "id" | "onClose">) => void;
  removeToast: (id: string) => void;
  toasts: ToastProps[];
}

const ToastContext = React.createContext<ToastContextValue | undefined>(
  undefined
);

export function useToast() {
  const context = React.useContext(ToastContext);
  if (!context) {
    throw new Error("useToast must be used within a ToastProvider");
  }
  return context;
}

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = React.useState<ToastProps[]>([]);

  const addToast = React.useCallback(
    (toast: Omit<ToastProps, "id" | "onClose">) => {
      const id = Math.random().toString(36).substr(2, 9);
      const newToast: ToastProps = {
        ...toast,
        id,
        onClose: removeToast,
      };
      setToasts((prev) => [...prev, newToast]);
    },
    []
  );

  const removeToast = React.useCallback((id: string) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id));
  }, []);

  return (
    <ToastContext.Provider value={{ addToast, removeToast, toasts }}>
      {children}
      <div className="fixed top-4 right-4 z-50 space-y-2">
        <AnimatePresence>
          {toasts.map((toast) => (
            <Toast key={toast.id} {...toast} />
          ))}
        </AnimatePresence>
      </div>
    </ToastContext.Provider>
  );
}