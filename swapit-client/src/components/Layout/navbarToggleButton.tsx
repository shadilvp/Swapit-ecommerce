'use client';


import { FiMenu } from "react-icons/fi";
import { useGlobalStore } from "@/store/store";
import AdminPanelName from "../ui/adminPanelName";

const NavbarToggleButton = () => {
  const {toggleSidebar} = useGlobalStore  ();
  return (
    <nav className=" text-green-600 flex items-center justify-between bg-white shadow p-4">
      <button onClick={toggleSidebar} className="text-xl">
        <FiMenu />
      </button>
      <AdminPanelName/>
    </nav>
  );
};

export default NavbarToggleButton;
