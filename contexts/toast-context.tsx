import React, { createContext, useContext, ReactNode } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

interface ToastContextProps {
  showToast: (message: string, type: "success" | "error" | "info") => void;
}

interface ToastProviderProps {
  children: ReactNode;
}

const ToastContext = createContext<ToastContextProps | undefined>(undefined);

export const ToastProvider: React.FC<ToastProviderProps> = ({ children }) => {
  const showToast = (message: string, type: "success" | "error" | "info") => {
    if (type === "success") {
      toast.success(message, { position: "top-right" });
    } else if (type === "error") {
      toast.error(message, { position: "top-right" });
    } else {
      toast.info(message, { position: "top-right" });
    }
  };

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
    </ToastContext.Provider>
  );
};

export const useToast = (): ToastContextProps => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error("useToast must be used within a ToastProvider");
  }
  return context;
};
