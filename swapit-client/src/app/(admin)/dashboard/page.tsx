"use client";

import { FiTruck, FiUsers, FiBox } from "react-icons/fi";
import { PiSwap } from "react-icons/pi";
import { GiGreenhouse } from "react-icons/gi";
import { GoGraph } from "react-icons/go";
import { useGlobalStore } from '@/store/store';



const AdminDashboard = () => {
  const { isCollapsed } = useGlobalStore();


  return (
    <div className={`p-6 bg-gray-200 min-h-screen flex flex-col transition-all duration-300 ${isCollapsed ? 'ml-16' : 'ml-64'}`}>

      <div className="grid grid-cols-4 gap-4 flex-1">
        <div className="bg-white p-10 rounded-lg shadow-lg col-span-1 row-span-2 transition-transform transform hover:scale-105">
          <GoGraph size={70} className="text-[#01BA6A]" />
          <h2 className="text-lg font-semibold text-black mb-2">Revenue</h2>
          <p className="text-black">New Products: <span className="font-bold">$1234</span></p>
          <p className="text-black">Resold Products: <span className="font-bold">$1234</span></p>
          <p className="text-black">Swapped Products: <span className="font-bold">$1234</span></p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-lg flex items-center gap-4 transition-transform transform hover:scale-105">
          <FiTruck size={50} className="text-[#01BA6A]" />
          <div>
            <h3 className="text-lg font-semibold text-black">Total Orders</h3>
            <p className="text-xl font-bold text-black">000</p>
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-lg flex items-center gap-4 transition-transform transform hover:scale-105">
          <FiBox size={50} className="text-[#01BA6A]" />
          <div>
            <h3 className="text-lg font-semibold text-black">Resold Items</h3>
            <p className="text-xl font-bold text-black">000</p>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-lg flex items-center gap-4 transition-transform transform hover:scale-105">
          <FiUsers size={50} className="text-[#01BA6A]" />
          <div>
            <h3 className="text-lg font-semibold text-black">Total Customers</h3>
            <p className="text-xl font-bold text-black">000</p>
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-lg flex items-center gap-4 transition-transform transform hover:scale-105">
          <FiBox size={50} className="text-[#01BA6A]" />
          <div>
            <h3 className="text-lg font-semibold text-black">New Items</h3>
            <p className="text-xl font-bold text-black">000</p>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-lg flex items-center gap-4 transition-transform transform hover:scale-105">
          <PiSwap size={50} className="text-[#01BA6A]" />
          <div>
            <h3 className="text-lg font-semibold text-black">Swapped Items</h3>
            <p className="text-xl font-bold text-black">000</p>
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-lg flex items-center gap-4 transition-transform transform hover:scale-105">
          <GiGreenhouse size={50} className="text-[#01BA6A]" />
          <div>
            <h3 className="text-lg font-semibold text-black">Environmental Impact</h3>
            <p className="text-xl font-bold text-black">0.00%</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-6 flex-1 mt-6">
        <div className="bg-white p-6 rounded-lg shadow-lg flex items-center justify-center transition-transform transform hover:scale-105 col-span-2">
          <h2 className="text-lg font-semibold text-black">Monthly Graph</h2>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-lg flex items-center justify-center transition-transform transform hover:scale-105 col-span-1">
          <h2 className="text-lg font-semibold text-black">Calendar</h2>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
