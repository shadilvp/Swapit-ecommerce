"use client";
import { useState } from "react";
import { Bell } from "lucide-react";

const NotificationDropdown = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative">
      {/* Bell Icon - Click to Toggle */}
      <Bell
        className="text-black hover:text-gray-600 cursor-pointer"
        size={24}
        onClick={() => setIsOpen(!isOpen)}
      />

      {/* Dropdown Menu */}
      {isOpen && (
        <div className="absolute right-0 mt-2 w-64 bg-white border rounded shadow-lg p-4">
          <p className="text-gray-700">No new notifications</p>
          {/* Example notification */}
          <p className="text-sm text-gray-500">🔔 You have a new message</p>
        </div>
      )}
    </div>
  );
};

export default NotificationDropdown;
