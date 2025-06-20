import { usePathname } from "next/navigation";
import React from "react";
import FeedbackCard from "../ui/feedback";
import AppCard from "../ui/contactApps";

const Footer = () => {
  const pathName = usePathname();

  const adminRoutes = [
    "/dashboard",
    "/users",
    "/allProducts",
    "/orders",
    "/addProduct",
    "/customers",
  ];
  const dynamicRoutes = ["/allProducts/", "/customers"].some((route) =>
    pathName.includes(route)
  );

  if (
    pathName === "/login" ||
    pathName === "/user-register" ||
    adminRoutes.includes(pathName) ||
    dynamicRoutes
  ) {
    return null;
  }
  return (
    <div className="min-w-screen min-h-80 bg-[#000] text-gray-500 flex justify-between p-8 flex-wrap align-middle">
      <div className="flex justify-between items-center ">
        <FeedbackCard />
      </div>
      <div className="flex items-center justify-center">
        <div className="flex flex-col items-center space-y-4 text-center">
          <h3 className="text-2xl font-bold">
            <span className="text-[#19ff53] text-4 xl">S</span>WAPIFY
          </h3>
          <p>Indian E-commerce Platform</p>
          <p><span className="font-bold text-gray-400">Phone : </span>1234567890</p>
          <p><span className="font-bold text-gray-400">Email : </span>swapify@gmail.com</p>
          <p><span className="font-bold text-gray-400">Address : </span>Kerala, India</p>
        </div>
      </div>

      <div className="flex justify-between items-center ">
        <AppCard />
      </div>
    </div>
  );
};

export default Footer;
