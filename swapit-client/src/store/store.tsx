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

  // Selection Box State
  showSelectionBox: boolean;
  toggleSelectionBox: () => void;
  closeSelectionBox: () => void;

  //selectionBox values state
  transactionType: string;
  setTransactionType: (type: string) => void;
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

  // Selection Box State
  showSelectionBox: false,
  toggleSelectionBox: () => set((state) => ({ showSelectionBox: !state.showSelectionBox })),
  closeSelectionBox: () => set({ showSelectionBox: false }),

  //selectionBox values state
  transactionType: "available",
  setTransactionType: (type) => set({ transactionType: type }),
}));
