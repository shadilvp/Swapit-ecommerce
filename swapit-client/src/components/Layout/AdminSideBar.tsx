'use client';

import { useState } from 'react';
import { FiHome, FiBox, FiUsers, FiShoppingCart, FiStar, FiLogOut, FiSearch, FiPlus } from 'react-icons/fi';
import Image from 'next/image';
import { useRouter } from "next/navigation";

const AdminSidebar = () => {
  const [active, setActive] = useState('Dashboard');
  const router = useRouter();

  const menuItems = [
    { name: 'Dashboard', icon: <FiHome />, path:"/dashboard"},
    { name: 'New Products', icon: <FiBox />, path:"/newProducts"},
    { name: 'Add Product', icon: <FiPlus />, path:"/addProduct" },
    { name: 'Old Products', icon: <FiBox />, path:"/oldProducts" },
    { name: 'Customer', icon: <FiUsers />, path:"/customers" },
    { name: 'Orders', icon: <FiShoppingCart />, path:"/orders" },
    { name: 'Reviews', icon: <FiStar />, path:"/reviews" },
  ];

  return (
    <div className="fixed top-0 left-0 h-screen w-64 bg-green-500 text-white flex flex-col p-4 shadow-lg">
      {/* Logo */}
      <div className="flex items-center justify-center mb-6">
        <h1 className="text-2xl font-bold">SWAPIFY</h1>
      </div>

      {/* Clock Placeholder */}
      <div className="text-center text-lg mb-2">02 : 25 : 34</div>
      <div className="text-center text-sm mb-4">Sep - 03 - 2025</div>

      {/* Search Bar */}
      <div className="relative mb-6">
        <input
          type="text"
          placeholder="Search..."
          className="w-full p-2 rounded-lg text-black"
        />
        <FiSearch className="absolute right-3 top-3 text-gray-500" />
      </div>

      {/* Menu Items */}
      <nav className="flex-1 overflow-y-auto">
        {menuItems.map((item) => (
          <div
            key={item.name}
            className={`flex items-center p-3 rounded-lg cursor-pointer transition-all ${
              active === item.name ? 'bg-white text-green-600' : 'hover:bg-green-600'
            }`}
            onClick={() => {
              setActive(item.name);
              if (item.path) {
                router.push(item.path);
              }
            }}
          >
            {item.icon}
            <span className="ml-3">{item.name}</span>
          </div>
        ))}
      </nav>

      {/* Profile & Logout */}
      <div className="mt-auto">
        <div className="flex items-center p-3 rounded-lg">
          <Image
            src="/Screenshot 2025-02-12 140408.png"
            alt="User Avatar"
            width={30}
            height={30}
            className="rounded-full"
          />
          <span className="ml-3">Name</span>
        </div>
        <div className="flex items-center p-3 rounded-lg cursor-pointer hover:bg-green-600">
          <FiLogOut />
          <span className="ml-3">Logout</span>
        </div>
      </div>
    </div>
  );
};

export default AdminSidebar;
