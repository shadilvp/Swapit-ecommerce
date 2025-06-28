"use client";
import Link from "next/link";
import { ShoppingBasket, User } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import NotificationDropdown from "./NotificationDropdown";
import Image from "next/image";
import logo from "../../../public/logo1.png";

const Header = () => {
  const pathName = usePathname();
  const router = useRouter();

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

  const isHomePage = pathName === "/";

  return (
    <header
      className={`fixed top-0 left-0 w-full py-4 transition-all z-50 ${
        isHomePage
          ? "bg-gradient-to-r from-[#02ae6600] to-[#02452900]"
          : "bg-white shadow-md"
      }`}
    >
      <div className="container mx-auto flex justify-between items-center px-6">
        {/* Logo */}
        <Link
          href="/"
          className="flex items-center"
        >
          {!isHomePage && (
            <Image src={logo} alt="Swapify Logo" width={40} />
          )}
        </Link>

        {/* Navigation */}
        <nav
          className={`hidden md:flex space-x-6 text-lg ${
            isHomePage ? "text-white" : "text-black"
          }`}
        >
          <button
            onClick={() => router.push("/")}
            className="hover:text-gray-300 transition"
          >
            Home
          </button>
          <span
            className={`border-l h-6 ${
              isHomePage ? "border-white" : "border-black"
            }`}
          ></span>
          <button
            onClick={() => router.push("/shop")}
            className="hover:text-gray-300 transition"
          >
            Shop
          </button>
          <span
            className={`border-l h-6 ${
              isHomePage ? "border-white" : "border-black"
            }`}
          ></span>
          <button
            className="hover:text-gray-300 transition"
          >
            Our Story
          </button>
        </nav>

        {/* Icons */}
        <div
          className={`${
            isHomePage
              ? "bg-[#37664400]"
              : "bg-[#e8e8e8] border border-white shadow-2xl"
          } flex items-center space-x-4  px-6 rounded-full`}
        >
          <NotificationDropdown />
          <ShoppingBasket
            className={`${
              isHomePage
                ? "text-white hover:text-gray-300"
                : "text-black hover:text-gray-600"
            } cursor-pointer`}
            size={24}
          />
          {/* <Search className={`${isHomePage ? "text-white hover:text-gray-300" : "text-black hover:text-gray-600"} cursor-pointer rounded-full p-1`} size={28} /> */}
          <User
            className={`${
              isHomePage
                ? "text-white hover:text-gray-300"
                : "text-black hover:text-gray-600"
            } cursor-pointer`}
            size={24}
            onClick={() => router.push("/profile")}
          />
        </div>
      </div>
    </header>
  );
};

export default Header;
