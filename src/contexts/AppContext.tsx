import React, { createContext, useContext, useState, ReactNode } from 'react';
import { OpmlNode, FlashCard } from '../types';

interface AppContextType {
  opmlData: OpmlNode[] | null;
  setOpmlData: (data: OpmlNode[] | null) => void;
  flashcards: FlashCard[];
  setFlashcards: (cards: FlashCard[]) => void;
  currentStep: number;
  setCurrentStep: (step: number) => void;
  fileName: string;
  setFileName: (name: string) => void;
  error: string | null;
  setError: (error: string | null) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: ReactNode }) {
  const [opmlData, setOpmlData] = useState<OpmlNode[] | null>(null);
  const [flashcards, setFlashcards] = useState<FlashCard[]>([]);
  const [currentStep, setCurrentStep] = useState(1);
  const [fileName, setFileName] = useState('');
  const [error, setError] = useState<string | null>(null);

  return (
    <AppContext.Provider
      value={{
        opmlData,
        setOpmlData,
        flashcards,
        setFlashcards,
        currentStep,
        setCurrentStep,
        fileName,
        setFileName,
        error,
        setError
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
}