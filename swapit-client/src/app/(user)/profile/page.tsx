"use client";

import { useEffect, useState } from "react";
import { Upload, Package, Edit, ShoppingCart, DollarSign, RefreshCw, Star, MessageCircleMore, LogOut } from "lucide-react";
import { useMutation, useQuery } from "@tanstack/react-query";
import { editProfile, fetchUserProfile } from "@/services/user/profile";
import { useRouter } from "next/navigation";
import { fetchSpecificProduct } from "@/services/product";
import Button from "@/components/ui/button";
import { logoutUser } from "@/services/auth";



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
  const [isEditing, setIsEditing] = useState(false);
  const [profileImage, setImage] = useState<string | null>(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  const { data, isLoading, error } = useQuery({
    queryKey: ["userProfile"],
    queryFn: fetchUserProfile,
  });
  
  useEffect(() => {
    if (data?.user) {
      setName(data.user.name || "");
      setEmail(data.user.email || "");
      setPhone(data.user.phone || "");
      setImage(data.user.profileImage || null);
    }
  }, [data]);

  const mutation = useMutation({
    mutationFn: editProfile,
    onSuccess: () => {
      setIsEditing(false);
    },
    onError: (error) => {
      console.error("Profile update failed:", error);
    },
  });


  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error loading profile</p>;

  const user = data?.user;
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImage(URL.createObjectURL(file)); // Show preview
    }
  };

  // const mutation = useMutation({
  //   mutationFn: logoutUser,
  //   onSuccess: () => {
  //     router.push("/login");
  //   },
  //   onError: (error) => {
  //     console.error("Logout failed:", error);
  //   },
  // });

  const handleLogOut = () => {
    // mutation.mutate();
    router.push("/login");
  }

  const handleSaveProfile = () => {
    mutation.mutate({
      name,
      email,
      phone,
      profileImage, // This should be handled with an actual upload service like Cloudinary
    });
  };

  return (
    <div className="p-6 max-w-4xl mx-auto space-y-6 text-gray-700 pt-20">
      {/* Profile Info */}
      <div className="flex items-center justify-between">
        <div className="flex flex-col items-center">
          <div className="w-24 h-24 rounded-full bg-gray-100 flex items-center justify-center overflow-hidden border border-gray-300 shadow-md">
            {profileImage ? (
              <img src={profileImage} alt="Profile" className="w-full h-full object-cover" />
            ) : (
              <Upload size={32} className="text-gray-500" />
            )}
          </div>

          {/* Upload Button in Edit Mode */}
          {isEditing && (
            <input type="file" accept="image/*" onChange={handleFileChange} className="mt-2" />
          )}

          {/* Edit / Confirm Button */}
          <button
            className="flex items-center space-x-2 mt-2 bg-green-600 text-white hover:bg-green-700 px-4 py-2 rounded-md shadow-sm"
            onClick={() => {
              if (isEditing) {
                handleSaveProfile();
              } else {
                setIsEditing(true);
              }
            }}
          >
            <Edit size={16} /> <span>{isEditing ? "Confirm" : "Edit Profile"}</span>
          </button>
        </div>
        <div className="flex space-x-4 mt-4">
        <button 
          className="flex items-center space-x-2 bg-green-600 text-white px-4 py-2 rounded-md shadow-md hover:bg-green-700"
          onClick={() => router.push("/profile/messages")}
        >
            <MessageCircleMore size={16} /> <span>Messages</span>
          </button>
          <button className="flex items-center space-x-2 bg-green-600 text-white px-4 py-2 rounded-md shadow-md hover:bg-green-700">
            <ShoppingCart size={16} /> <span>Orders</span>
          </button>
          <button 
            className="flex items-center space-x-2 bg-green-600 text-white px-4 py-2 rounded-md shadow-md hover:bg-green-700"
            onClick={() => router.push("/profile/sellProduct")}
          >
            <Package size={16} /> <span>Sell Product</span>
          </button>
          <button 
            className="flex items-center space-x-2 bg-green-600 text-white px-4 py-2 rounded-md shadow-md hover:bg-green-700"
            onClick={handleLogOut}
          >
            <LogOut size={16} /> <span>Log Out</span>
          </button>
        </div>
      </div>

      {/* User Information */}
      <div className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <p className="text-green-700 font-medium">Name*</p>
            {isEditing ? (
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="bg-green-50 p-3 w-full rounded-3xl text-green-900 rounded-tl-none border border-green-300"
              />
            ) : (
              <div className="bg-green-50 p-3 rounded-3xl text-green-900 rounded-tl-none">{name}</div>
            )}
          </div>
          <div>
            <p className="text-green-700 font-medium">Email*</p>
            {isEditing ? (
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="bg-green-50 p-3 w-full rounded-3xl text-green-900 rounded-tl-none border border-green-300"
              />
            ) : (
              <div className="bg-green-50 p-3 rounded-3xl text-green-900 rounded-tl-none">{email}</div>
            )}
          </div>
        </div>
        <div>
          <p className="text-green-700 font-medium">Phone*</p>
          {isEditing ? (
            <input
              type="text"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="bg-green-50 p-3 w-full rounded-3xl text-green-900 rounded-tl-none border border-green-300"
            />
          ) : (
            <div className="bg-green-50 p-3 rounded-3xl text-green-900 rounded-tl-none">{phone || "No phone number"}</div>
          )}
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


