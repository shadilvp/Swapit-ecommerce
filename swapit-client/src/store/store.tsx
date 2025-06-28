"use client";

import { create } from "zustand";
import { Product } from "@/types"; // ✅ import your Product type

interface GlobalState {
  // Sidebar State
  isCollapsed: boolean;
  toggleSidebar: () => void;

  // Swap Product State
  selectedProduct: Product | null;
  swappingProduct: Product | null;
  setSelectedProduct: (product: Product | null) => void;
  setSwappingProduct: (product: Product | null) => void;
  resetSwap: () => void;

  // Selection Box State
  showSelectionBox: boolean;
  toggleSelectionBox: () => void;
  closeSelectionBox: () => void;

  // Selection Box values state
  transactionType: string;
  setTransactionType: (type: string) => void;

  // Amount for the product
  userOrDealer: number;
  setuserOrDealer: (type: number) => void;

  productId: string;
  setProductId: (type: string) => void;
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

  // Selection Box values state
  transactionType: "available",
  setTransactionType: (type) => set({ transactionType: type }),

  userOrDealer: 0,
  setuserOrDealer: (value: number) => set({ userOrDealer: value }),

  productId: "",
  setProductId: (value: string) => set({ productId: value }),
}));
