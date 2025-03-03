"use client";

import { useEffect, useState } from "react";
import { Upload, Package, Edit, ShoppingCart, LogOut, MessageCircleMore } from "lucide-react";
import { useMutation, useQuery } from "@tanstack/react-query";
import { editProfile, fetchUserProfile } from "@/services/user/profile";
import { useRouter } from "next/navigation";
import SpecificUserProductList from "./SpecificUserProductList";

const Profile = () => {
  const router = useRouter();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState<{
    profileImage: string | File | null;
    name: string;
    email: string;
    phone: string;
  }>({
    profileImage: null, // Change from File to null
    name: "",
    email: "",
    phone: "",
  });

  const { data, isLoading, error } = useQuery({
    queryKey: ["userProfile"],
    queryFn: fetchUserProfile,
  });

  const userData = data?.user;

  useEffect(() => {
    if (userData) {
      setFormData({
        profileImage: userData.profileImage || null,
        name: userData.name || "",
        email: userData.email || "",
        phone: userData.phone || "",
      });
    }
  }, [userData]);

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
      const imageUrl = URL.createObjectURL(file); // Preview only
      setFormData((prev) => ({
        ...prev,
        profileImage: file, // Store actual file
      }));
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSaveProfile = () => {
    const formDataToSend = new FormData();
    formDataToSend.append("name", formData.name);
    formDataToSend.append("email", formData.email);
    formDataToSend.append("phone", formData.phone);
    if (formData.profileImage && formData.profileImage instanceof File) {
      formDataToSend.append("profileImage", formData.profileImage);
    }
  
    mutation.mutate(formDataToSend);
  };

  return (
    <div className="p-6 max-w-4xl mx-auto space-y-6 text-gray-700 pt-20">
      <div className="flex items-center justify-between">
        <div className="flex flex-col items-center">
          <div className="w-24 h-24 rounded-full bg-gray-100 flex items-center justify-center overflow-hidden border border-gray-300 shadow-md">
            {formData.profileImage ? (
              <img
              src={formData.profileImage instanceof File ? URL.createObjectURL(formData.profileImage) : formData.profileImage || ""}
              alt="Profile"
              className="w-full h-full object-cover"
            />
            ) : (
              <Upload size={32} className="text-gray-500" />
            )}
          </div>

          {isEditing && <input type="file" accept="image/*" onChange={handleFileChange} className="mt-2" />}

          <button
            className="flex items-center space-x-2 mt-2 bg-green-600 text-white hover:bg-green-700 px-4 py-2 rounded-md shadow-sm"
            onClick={() => {
              if (isEditing) {
                handleSaveProfile();
              }
              setIsEditing(!isEditing);
            }}
          >
            <Edit size={16} /> <span>{isEditing ? "Confirm" : "Edit Profile"}</span>
          </button>
        </div>

        <div className="flex space-x-4 mt-4">
          <button className="flex items-center space-x-2 bg-green-600 text-white px-4 py-2 rounded-md shadow-md hover:bg-green-700">
            <MessageCircleMore size={16} /> <span>Messages</span>
          </button>
          <button className="flex items-center space-x-2 bg-green-600 text-white px-4 py-2 rounded-md shadow-md hover:bg-green-700">
            <ShoppingCart size={16} /> <span>Orders</span>
          </button>
          <button className="flex items-center space-x-2 bg-green-600 text-white px-4 py-2 rounded-md shadow-md hover:bg-green-700">
            <Package size={16} /> <span>Sell Product</span>
          </button>
          <button
            className="flex items-center space-x-2 bg-green-600 text-white px-4 py-2 rounded-md shadow-md hover:bg-green-700"
            onClick={() => router.push("/login")}
          >
            <LogOut size={16} /> <span>Log Out</span>
          </button>
        </div>
      </div>

      <div className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <p className="text-green-700 font-medium">Name*</p>
            {isEditing ? (
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="bg-green-50 p-3 w-full rounded-3xl text-green-900 border border-green-300"
              />
            ) : (
              <div className="bg-green-50 p-3 rounded-3xl text-green-900">{formData.name}</div>
            )}
          </div>
          <div>
            <p className="text-green-700 font-medium">Email*</p>
            {isEditing ? (
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="bg-green-50 p-3 w-full rounded-3xl text-green-900 border border-green-300"
              />
            ) : (
              <div className="bg-green-50 p-3 rounded-3xl text-green-900">{formData.email}</div>
            )}
          </div>
        </div>
        <div>
          <p className="text-green-700 font-medium">Phone*</p>
          {isEditing ? (
            <input
              type="text"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className="bg-green-50 p-3 w-full rounded-3xl text-green-900 border border-green-300"
            />
          ) : (
            <div className="bg-green-50 p-3 rounded-3xl text-green-900">{formData.phone || "No phone number"}</div>
          )}
        </div>
      </div>

      {user?._id && <SpecificUserProductList userId={user._id} />}
    </div>
  );
};

export default Profile;
