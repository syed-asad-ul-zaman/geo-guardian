"use client";

import React, { createContext, useContext, useState } from "react";
import { EONETEvent, EONETCategory } from "@/lib/api";

interface GlobalStateContextType {
  selectedEvent: EONETEvent | null;
  setSelectedEvent: (event: EONETEvent | null) => void;
  categories: EONETCategory[];
  activeCategoryId: string;
  setActiveCategoryId: (id: string) => void;
}

const GlobalStateContext = createContext<GlobalStateContextType | undefined>(undefined);

export function GlobalStateProvider({ 
  children, 
  initialCategories, 
  initialActiveId 
}: { 
  children: React.ReactNode;
  initialCategories: EONETCategory[];
  initialActiveId: string;
}) {
  const [selectedEvent, setSelectedEvent] = useState<EONETEvent | null>(null);
  const [activeCategoryId, setActiveCategoryId] = useState(initialActiveId);

  return (
    <GlobalStateContext.Provider value={{ 
      selectedEvent, 
      setSelectedEvent, 
      categories: initialCategories,
      activeCategoryId,
      setActiveCategoryId
    }}>
      {children}
    </GlobalStateContext.Provider>
  );
}

export function useGlobalState() {
  const context = useContext(GlobalStateContext);
  if (context === undefined) {
    throw new Error("useGlobalState must be used within a GlobalStateProvider");
  }
  return context;
}
