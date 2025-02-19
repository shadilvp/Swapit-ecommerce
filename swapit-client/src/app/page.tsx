import Link from "next/link";
import Image from "next/image";

const Home = () => {
    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-[#02AE65] to-[#024529] relative overflow-hidden">
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
                        src="/isolated-png-consumer-rights-transparent-background-world-consumer-rights-day_1121752-27785_enhanced-removebg.png" // Replace with your actual image path
                        alt="Shopping Cart"
                        width={565}
                        height={575}
                        className="drop-shadow-lg"
                    />
                </div>
            </div>
        </div>
    );
};

export default Home;
