"use client";

import Link from "next/link";
import Image from "next/image";
import Header from "@/components/Layout/Header";
import { useRouter } from "next/navigation";
import expImage1 from "../../public/expImage1.png";
import expImage2 from "../../public/expImage2.png";
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
        <div className="absolute right-14 top-1/2 transform -translate-y-1/2 w-96 h-96 bg-white rounded-full blur-3xl opacity-30"></div>

        {/* Content */}
        <div className="relative flex items-center max-w-6xl w-full px-6">
          {/* Left Section */}
          <div className="flex-1">
            <h1 className="text-5xl font-bold text-green-800 mb-4">
              Shop Smarter, <br />{" "}
              <span className="text-gray-100">Live Better!</span>
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

      <div className="h-32 bg-gradient-to-b from-[#30966b00] to-[#cde5cf] w-full -mt-32 z-10 relative"></div>

      {/* Categories Section */}
      <div className=" flex justify-center bg-[#cde5cf] align-middle">
        <section className="max-h-screen bg-[#e9e8e8] grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 md:grid-rows-2 gap-10 p-12 pr-12 snap-start w-8/10 m-10 rounded-2xl shadow-2xl">
          {categories.map((category, index) => (
            <button
              key={index}
              onClick={() => handleCategoryClick(category.title)}
              className="relative group overflow-hidden rounded-lg shadow-md w-72"
            >
              <div className="w-full h-full">
                <Image
                  src={category.img}
                  alt={category.title}
                  width={300}
                  height={300}
                  className=" object-cover cursor-pointer"
                />
              </div>
            </button>
          ))}
        </section>
      </div>

      {/* Featured Section (Placeholder for Gray Box in your Design) */}
      <section className="min-h-screen bg-white   snap-start">
        <div className="w-4/4 h-3/4  rounded-xl">
          <div className="mt-20 space-y-20">
            {/* First Section */}
            <div className="flex items-center justify-between">
              <Image
                src={expImage1}
                alt="Image"
                className="w-1/2 object-cover hidden md:block"
              />
              <div className="max-w-xl p-20 ">
                <h2 className="text-[#E58411] font-light text-xl mb-2">
                  EXPERIENCES
                </h2>
                <h1 className="font-bold text-3xl mb-4">
                  We Provide You The <br /> Best Experience
                </h1>
                <p className="max-w-[50ch] text-gray-300">
                  You don’t have to worry about the result because all of these
                  interiors are made by people who are professionals in their
                  fields with an elegant and luxurious style and with premium
                  quality materials
                </p>
              </div>
            </div>

            {/* Second Section */}
            <div className="flex items-center justify-between mb-20">
              <div className="max-w-2xl p-20">
                <h2 className="text-[#E58411] font-light  text-xl mb-2">
                  MATERIALS
                </h2>
                <h1 className="font-bold text-3xl mb-4">
                  Very Serious <br /> Materials For Making <br /> Furniture
                </h1>
                <p className="max-w-[50ch] text-gray-300">
                  Because panto was very serious about designing furniture for
                  our environment, using a very expensive and famous capital but
                  at a relatively low price
                </p>
              </div>
              <div className="relative w-1/2">
                <Image
                  src={expImage2}
                  alt="Image 3"
                  className="rounded-xl object-cover w-full   relative -right-[20.5%] hidden md:block"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer Section */}
      {/* <Footer /> */}
    </div>
  );
};

export default Home;
