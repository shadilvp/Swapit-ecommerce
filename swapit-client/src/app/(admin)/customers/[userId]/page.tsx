"use client";

import { useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import { useGlobalStore } from "@/store/store";
import { fetchSpecificUser } from "@/services/users";
import Image from "next/image";

const UserDetails = () => {
  const { isCollapsed } = useGlobalStore();
  const params = useParams();
  const userId = Array.isArray(params.userId)
  ? params.userId[0]
  : (params.userId as string);

  const { data, isLoading, error } = useQuery({
    queryKey: ["user", userId],
    queryFn: () => fetchSpecificUser(userId),
    enabled: !!userId,
  });

  if (isLoading)
    return (
      <h1 className="text-center text-xl text-green-600">Loading user...</h1>
    );
  if (error)
    return <p className="text-center text-red-500">Error fetching user.</p>;

  const user = data?.user;

  return (
    <div
      className={`p-6 bg-gray-50 min-h-screen transition-all duration-300 ${
        isCollapsed ? "ml-16" : "ml-64"
      } text-black`}
    >
      <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg p-6">
        <h1 className="text-2xl font-bold text-green-700 border-b pb-3 mb-4">
          User Details
        </h1>

        <div className="flex flex-col md:flex-row items-center md:items-start space-y-6 md:space-y-0 md:space-x-8">
          {/* Profile Image */}
          <div className="flex-shrink-0">
            <Image
              src={user?.profileImage || "/placeholder-user.jpg"}
              alt={user?.name || "User Profile"}
              width={160}
              height={160}
              className="rounded-full shadow-md border border-green-300 object-cover"
            />
          </div>

          {/* User Info */}
          <div className="space-y-3 w-full">
            <p className="text-lg">
              <strong className="text-green-700">User ID:</strong> {user?._id}
            </p>
            <p className="text-lg">
              <strong className="text-green-700">Name:</strong> {user?.name}
            </p>
            <p className="text-lg">
              <strong className="text-green-700">Email:</strong> {user?.email}
            </p>
            <p className="text-lg">
              <strong className="text-green-700">Wallet Balance:</strong> $
              {user?.wallet.toFixed(2)}
            </p>

            {/* Call to Action Buttons */}
            <div className="flex space-x-4 mt-4">
              <button className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md shadow-md">
                products
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDetails;
