"use client"

import Link from "next/link";
import Image from "next/image";
import Header from "@/components/Layout/Header";
import { useRouter } from "next/navigation";
// import Footer from "@/components/Footer"; // Ensure you have a footer component

const Home = () => {
    const router = useRouter();

    const categories = [
        { title: "fashion", img: "/Fasion.png" },
        { title: "sports", img: "/Sports.png" },
        { title: "electronics", img: "/electronics.png" },
        { title: "furniture", img: "/Furniture.png" },
        { title: "mobiles", img: "/Mobiles.png" },
        { title: "books", img: "/Books.png" },
    ];

    const handleCategoryClick = (category: any) => {
        router.push(`/shop?category=${encodeURIComponent(category)}`);
    };

    return (
        <div className="h-screen overflow-y-scroll snap-mandatory snap-y">
            {/* Navbar */}
            <Header />

            {/* Hero Section */}
            <section className="min-h-screen flex items-center justify-center bg-gradient-to-r from-[#02AE65] to-[#024529] relative overflow-hidden snap-start">
                {/* Blurred white ellipse */}
                <div className="absolute right-14 top-1/2 transform -translate-y-1/2 w-96 h-96 bg-white rounded-full blur-3xl opacity-30"></div>

                {/* Content */}
                <div className="relative flex items-center max-w-6xl w-full px-6">
                    {/* Left Section */}
                    <div className="flex-1">
                        <h1 className="text-5xl font-bold text-green-800 mb-4">
                            Shop Smarter, <br /> <span className="text-gray-100">Live Better!</span>
                        </h1>
                        <p className="text-lg text-green-900 mb-6">
                            Find the best deals and trade items with ease.
                        </p>
                        <Link href="/shop">
                            <button className="px-6 py-3 text-lg font-semibold bg-green-900 text-white rounded-full shadow-md hover:bg-green-500 transition">
                                Explore Deals
                            </button>
                        </Link>
                    </div>

                    {/* Right Section - Shopping Cart Image */}
                    <div className="flex-1 flex justify-end">
                        <Image
                            src="/isolated-png-consumer-rights-transparent-background-world-consumer-rights-day_1121752-27785_enhanced-removebg.png"
                            alt="Shopping Cart"
                            width={565}
                            height={575}
                            className="drop-shadow-lg"
                        />
                    </div>
                </div>
            </section>

            {/* Categories Section */}
            <section className="min-h-screen bg-white grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 p-10 snap-start">
            {categories.map((category, index) => (
                <button
                    key={index}
                    onClick={() => handleCategoryClick(category.title)}
                    className="relative group overflow-hidden rounded-lg shadow-md w-full"
                >
                    <div className="w-full h-full">
                        <Image
                            src={category.img}
                            alt={category.title}
                            width={300}
                            height={300}
                            className="w-full h-full object-cover cursor-pointer"
                        />
                    </div>
                </button>
            ))}
            </section>


            {/* Featured Section (Placeholder for Gray Box in your Design) */}
            <section className="min-h-screen bg-gray-300 flex items-center justify-center snap-start">
                <div className="w-3/4 h-3/4 bg-gray-400 rounded-xl"></div>
            </section>

            {/* Footer Section */}
            {/* <Footer /> */}
        </div>
    );
};

export default Home;
