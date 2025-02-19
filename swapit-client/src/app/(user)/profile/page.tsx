"use client";

import { useState } from "react";
import { Upload, Package, Edit, ShoppingCart, DollarSign, RefreshCw, Star } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { fetchUserProfile } from "@/services/user/profile";
import { useRouter } from "next/navigation";
import { fetchSpecificProduct } from "@/services/product";
import Button from "@/components/ui/button";



const SpecificUserProductList = ({ userId }: { userId: string }) => {
    const router = useRouter();
  const { data: productData, isLoading, error } = useQuery({
    queryKey: ["product", userId],
    queryFn: () => fetchSpecificProduct(userId),
  });

  if (isLoading) return <p>Loading products...</p>;
  if (error) return <p>Error loading products</p>;

  return (
    <div>
      <h1 className="text-xl font-semibold mt-6">Products for Selling</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
        {productData?.product?.map((product: any) => (
          <div key={product._id} className="p-4 border rounded-lg shadow-md">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-40 object-cover rounded-md"
            />
            <h2 className="text-lg font-medium mt-2">{product.name}</h2>
            <p className="text-gray-600">{product.description}</p>
            {/* Add margin-bottom to create space below price */}
            <span className="text-green-600 font-bold block mt-2">${product.price}</span>
            <div className="mt-auto pt-2">
                <Button onClick={() => router.push(`/swapProduct?id=${product._id}&source=profile`)}>Select</Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
  
};




const Profile = () => {
  const router = useRouter();
  const [image, setImage] = useState<string | null>(null);

  const { data, isLoading, error } = useQuery({
    queryKey: ["userProfile"],
    queryFn: fetchUserProfile,
  });

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error loading profile</p>;

  const user = data?.user;

  return (
    <div className="p-6 max-w-4xl mx-auto space-y-6 text-gray-700 pt-20">
      {/* Profile Info */}
      <div className="flex items-center justify-between">
        <div className="flex flex-col items-center">
          <div className="w-24 h-24 rounded-full bg-gray-100 flex items-center justify-center overflow-hidden border border-gray-300 shadow-md">
            {image ? (
              <img src={user.image} alt="Profile" className="w-full h-full object-cover" />
            ) : (
              <Upload size={32} className="text-gray-500" />
            )}
          </div>
          {!image && (
            <button className="mt-2 bg-green-600 text-white hover:bg-green-700 px-4 py-2 rounded-md shadow-sm">
              Upload Image
            </button>
          )}
        </div>
        <div className="flex space-x-4 mt-4">
          <button className="flex items-center space-x-2 bg-green-600 text-white px-4 py-2 rounded-md shadow-md hover:bg-green-700">
            <ShoppingCart size={16} /> <span>Orders</span>
          </button>
          <button 
            className="flex items-center space-x-2 bg-green-600 text-white px-4 py-2 rounded-md shadow-md hover:bg-green-700"
            onClick={() => router.push("/sellProduct")}
          >
            <Package size={16} /> <span>Sell Product</span>
          </button>
          <button className="flex items-center space-x-2 bg-green-600 text-white px-4 py-2 rounded-md shadow-md hover:bg-green-700">
            <Edit size={16} /> <span>Edit Profile</span>
          </button>
        </div>
      </div>

      {/* User Information */}
      <div className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <p className="text-green-700 font-medium">Name*</p>
            <div className="bg-green-50 p-3 rounded-3xl text-green-900 rounded-tl-none">{user?.name}</div>
          </div>
          <div>
            <p className="text-green-700 font-medium">Email*</p>
            <div className="bg-green-50 p-3 rounded-3xl text-green-900 rounded-tl-none">{user?.email}</div>
          </div>
        </div>
        <div>
          <p className="text-green-700 font-medium">Phone*</p>
          <div className="bg-green-50 p-3 rounded-3xl text-green-900 rounded-tl-none">{user?.phone || "No phone number"}</div>
        </div>
        <div>
          <p className="text-green-700 font-medium">Addresses*</p>
          <div className="bg-green-50 p-3 rounded-3xl text-green-900 rounded-tl-none">
            <p>Address 1</p>
            <p>Address 2</p>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="p-4 border border-gray-300 rounded-2xl flex flex-col items-center bg-gray-100 shadow-md">
          <Package size={24} className="text-green-600" />
          <p className="font-medium">Products Sold</p>
          <span className="font-bold text-gray-900">{user?.productSold}</span>
        </div>
        <div className="p-4 border border-gray-300 rounded-2xl flex flex-col items-center bg-gray-100 shadow-md">
          <DollarSign size={24} className="text-green-600" />
          <p className="font-medium">Total Revenue</p>
          <span className="font-bold text-gray-900">{user?.totalRevenue}</span>
        </div>
        <div className="p-4 border border-gray-300 rounded-2xl flex flex-col items-center bg-gray-100 shadow-md">
          <RefreshCw size={24} className="text-green-600" />
          <p className="font-medium">Products Swapped</p>
          <span className="font-bold text-gray-900">{user?.productSwapped}</span>
        </div>
        <div className="p-4 border border-gray-300 rounded-2xl flex flex-col items-center bg-gray-100 shadow-md">
          <Star size={24} className="text-green-600" />
          <p className="font-medium">Points</p>
          <span className="font-bold text-gray-900">{user?.points}</span>
        </div>
      </div>
      <br />
      <br />
      {/* Product List (only if user._id is available) */}
      {user?._id && <SpecificUserProductList userId={user._id} />}
    </div>
  );
};

export default Profile;
