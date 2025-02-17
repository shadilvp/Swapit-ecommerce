"use client";
import Link from "next/link";
import {Bell, ShoppingBasket, Search, User} from "lucide-react"
import { usePathname, useRouter } from "next/navigation";

const Header = () => {
  const pathName = usePathname()
  const router = useRouter();
  const adminRoutes = ["/dashboard", "/users", "/allProducts", "/orders", "/addProduct"];

  if(pathName === "/login" || pathName === "/user-register" || adminRoutes.includes(pathName)){
    return null
  }
    return (
      <header className="bg-[#ffffff] text-black py-4">
        <div className="container mx-auto flex justify-between items-center px-6">
          

        <Link href="/" className="flex items-center">
            {/* <Image src="/LOGO-removebg-preview 3.png" alt="Swapify Logo"/> */}
            
        </Link>

  

        <nav className="hidden md:flex space-x-6 text-lg">
        <button 
        onClick={() => router.push("/")} 
        className="hover:text-white transition"
      >
        Home
      </button>

      <span className="border-l text-black h-6"></span>

      <button 
        onClick={() => router.push("/shop")} 
        className="hover:text-white transition"
      >
        Shop
      </button>

      <span className="border-l text-black h-6"></span>

      <button 
        onClick={() => router.push("/our-story")} 
        className="hover:text-white transition"
      >
        Our Story
      </button>

    </nav>
  
          {/* Icons */}
          <div className="flex items-center space-x-4">
            <Bell className="text-black hover:text-white cursor-pointer" size={24} />
            <ShoppingBasket className="text-black hover:text-white cursor-pointer" size={24} />
            <Search className="text-black hover:text-white cursor-pointer rounded-full p-1 " size={28} />
            <User className="text-black hover:text-white cursor-pointer" size={24} />
          </div>
  
        </div>
      </header>
    );
  };
  
  export default Header