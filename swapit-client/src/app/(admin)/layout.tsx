"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactNode} from "react";

import "./globals.css";
import AdminSidebar from "@/components/Layout/AdminSideBar"
import NavbarToggleButton from "@/components/Layout/navbarToggleButton";
import { useGlobalStore } from "@/store/store"; 




export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {

  const { isCollapsed } = useGlobalStore();

  return (
    <QueryClientProvider client={new QueryClient()}>
      <div className="admin-layout flex">
        {/* Sidebar, shown based on Zustand state */}
        {!isCollapsed && <AdminSidebar />}
        <div className="flex-1">
          <NavbarToggleButton />
          <main className="p-6">{children}</main>
        </div>
      </div>
    </QueryClientProvider>
  );
}
