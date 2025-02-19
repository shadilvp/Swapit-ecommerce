'use client';

import { useSidebarStore } from '@/store/store';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { FiHome, FiBox, FiUsers, FiShoppingCart, FiStar, FiLogOut, FiSearch, FiPlus, FiX } from 'react-icons/fi';
import Image from 'next/image';
import { logoutUser } from '@/services/auth';
import { useMutation } from '@tanstack/react-query';

const AdminSidebar = () => {
  const { isCollapsed, toggleSidebar } = useSidebarStore();
  const [active, setActive] = useState<string>('Dashboard');
  const router = useRouter();

  const menuItems = [
    { name: 'Dashboard', icon: <FiHome />, path: "/dashboard" },
    { name: 'All Products', icon: <FiBox />, path: "/allProducts" },
    { name: 'Customers', icon: <FiUsers />, path: "/customers" },
    { name: 'Orders', icon: <FiShoppingCart />, path: "/orders" },
    { name: 'Reviews', icon: <FiStar />, path: "/reviews" },
  ];

  const { mutate: handleLogout, isPending } = useMutation({
    mutationFn: logoutUser,
    onSuccess: () => {
      router.push("/login");
    },
    onError: (error) => {
      console.error("Logout failed", error);
    },
  });

  return (
    <div className={`fixed top-0 left-0 h-screen bg-green-500 text-white flex flex-col p-4 shadow-lg transition-all duration-300 ${isCollapsed ? 'w-16' : 'w-64'}`}>

      <button
        className="absolute top-4 right-4 text-white"
        onClick={toggleSidebar}
      >
        <FiX size={24} />
      </button>

      <div className="flex items-center justify-between mb-6">
        {!isCollapsed && <h1 className="text-2xl font-bold">SWAPIFY</h1>}
      </div>

      {/* Search Bar */}
      {!isCollapsed && (
        <div className="relative mb-6">
          <input type="text" placeholder="Search..." className="w-full p-2 rounded-lg text-black" />
          <FiSearch className="absolute right-3 top-3 text-gray-500" />
        </div>
      )}

      {/* Menu Items */}
      <nav className="flex-1 overflow-y-auto">
        {menuItems.map((item) => (
          <div
            key={item.name}
            className={`flex items-center p-3 rounded-lg cursor-pointer transition-all ${active === item.name ? 'bg-white text-green-600' : 'hover:bg-green-600'}`}
            onClick={() => {
              setActive(item.name);
              router.push(item.path);
            }}
          >
            {item.icon}
            {!isCollapsed && <span className="ml-3">{item.name}</span>}
          </div>
        ))}
      </nav>

      {/* Profile & Logout */}
      <div className="mt-auto">
        <div className="flex items-center p-3 rounded-lg">
          <Image src="/Screenshot 2025-02-12 140408.png" alt="User Avatar" width={30} height={30} className="rounded-full" />
          {!isCollapsed && <span className="ml-3">Name</span>}
        </div>
        <div 
          className="flex items-center p-3 rounded-lg cursor-pointer hover:bg-green-600 transition" 
          onClick={() => handleLogout()}
        >
          <FiLogOut />
          <span className="ml-3">{isPending ? "Logging out..." : "Logout"}</span>
        </div>
      </div>
    </div>
  );
};

export default AdminSidebar;
