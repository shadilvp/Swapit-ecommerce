import Link from "next/link";
const Home = () => {
    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
            <div className="max-w-3xl text-center p-6 bg-white shadow-lg rounded-lg">
                <h1 className="text-4xl font-bold text-gray-800 mb-4">Welcome to Swapit</h1>
                <p className="text-gray-600 mb-6">
                    Swap, trade, and exchange items with ease! Join our community and start swapping today.
                </p>
        
                <div className="space-x-4">
                    <Link href="/auth/userRegister" className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition">
                        Sign Up
                    </Link>
                    <Link href="/auth/login" className="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600 transition">
                        Login
                    </Link>
                </div>
            </div>
        </div>
    )
};

export default Home;