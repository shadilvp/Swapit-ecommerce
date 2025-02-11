"use client";
import Link from "next/link";
import {Bell, ShoppingBasket, Search, User} from "lucide-react"

const Header = () => {
    return (
      <header className="bg-[#ffffff] text-black py-4">
        <div className="container mx-auto flex justify-between items-center px-6">
          

        <Link href="/" className="flex items-center">
            {/* <Image src="/LOGO-removebg-preview 3.png" alt="Swapify Logo"/> */}
            <Image></Image>
        </Link>

  

          <nav className="hidden md:flex space-x-6 text-lg">
            <Link href="/shop" className="hover:text-white transition">Shop</Link>
            <span className="border-l text-black h-6"></span>
            <Link href="/our-story" className="hover:text-white transition">Our Story</Link>
            <span className="border-l text-black h-6"></span>
            <Link href="/contact" className="hover:text-white transition">Contact</Link>
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