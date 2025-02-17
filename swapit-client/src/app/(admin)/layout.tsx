"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactNode, useState } from "react";
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import AdminSidebar from "@/components/Layout/AdminSideBar"
import NavbarToggleButton from "@/components/Layout/navbarToggleButton";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});



export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  const [queryClient] = useState(() => new QueryClient());
  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(false);

  return (
    <QueryClientProvider client={queryClient}>
      <div className="admin-layout, flex">
      {isSidebarOpen && <AdminSidebar onClose={() => setIsSidebarOpen(false)} />}
      <div className="flex-1">
        <NavbarToggleButton onToggleSidebar={() => setIsSidebarOpen((prev) => !prev)} />
        <main className="p-6">{children}</main>
      </div>
      </div>
    </QueryClientProvider>
  );
}
