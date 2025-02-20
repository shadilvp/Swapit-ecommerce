"use client";

import { create } from "zustand";

interface GlobalState {
  // Sidebar State
  isCollapsed: boolean;
  toggleSidebar: () => void;

  // Swap Product State
  selectedProduct: any | null;
  swappingProduct: any | null;
  setSelectedProduct: (product: any) => void;
  setSwappingProduct: (product: any) => void;
  resetSwap: () => void;
}

export const useGlobalStore = create<GlobalState>((set) => ({
  // Sidebar State
  isCollapsed: false,
  toggleSidebar: () => set((state) => ({ isCollapsed: !state.isCollapsed })),

  // Swap Product State
  selectedProduct: null,
  swappingProduct: null,
  setSelectedProduct: (product) => set({ selectedProduct: product }),
  setSwappingProduct: (product) => set({ swappingProduct: product }),
  resetSwap: () => set({ selectedProduct: null, swappingProduct: null }),
}));
