'use client';


import { FiMenu } from "react-icons/fi";
import { useSidebarStore } from "@/store/store";

const NavbarToggleButton = () => {
  const {toggleSidebar,isCollapsed} = useSidebarStore();
  // console.log("Sidebar State:", isCollapsed);
  return (
    <nav className=" text-green-600 flex items-center justify-between bg-white shadow p-4">
      <button onClick={toggleSidebar} className="text-xl">
        <FiMenu />
      </button>
      <h1 className="text-lg font-bold">Admin Panel</h1>
    </nav>
  );
};

export default NavbarToggleButton;
