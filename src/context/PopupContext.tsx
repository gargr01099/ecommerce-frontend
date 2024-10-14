// context/PopupContext.tsx
import React, { createContext, useContext, useState, ReactNode } from "react";

interface PopupContextType {
  message: string | null;
  showPopup: (msg: string) => void;
  closePopup: () => void;
}

const PopupContext = createContext<PopupContextType | undefined>(undefined);

export const PopupProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [message, setMessage] = useState<string | null>(null);

  const showPopup = (msg: string) => setMessage(msg);
  const closePopup = () => setMessage(null);

  return (
    <PopupContext.Provider value={{ message, showPopup, closePopup }}>
      {children}
    </PopupContext.Provider>
  );
};

export const usePopup = (): PopupContextType => {
  const context = useContext(PopupContext);
  if (!context) {
    throw new Error("usePopup must be used within a PopupProvider");
  }
  return context;
};
