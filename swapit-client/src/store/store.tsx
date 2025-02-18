'use client';


import {create} from "zustand";


interface sidebarState {
    isCollapsed: boolean;
    toggleSidebar: () => void;
};


export const useSidebarStore = create<sidebarState>((set) => ({
    isCollapsed : false,
    toggleSidebar: () => set((state) => ({ isCollapsed: !state.isCollapsed })),
}));

