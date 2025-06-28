"use client";

import { blockUser, fetchUsers } from "@/services/users";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useGlobalStore } from "@/store/store";
import { Eye, Trash, User } from "lucide-react";
import { DropdownMenu } from "@/components/ui/dropDownMenu";
import Button from "@/components/ui/button";
import Checkbox from "@/components/ui/checkBox1";
import Input from "@/components/ui/input";
import Image from "next/image";

interface User {
  id: string;
  name: string;
  email: string;
  wallet: number;
  createdAt: string;
  profileImage?: string;
  isBlock?: boolean;
}


const Customers = () => {
  const router = useRouter();
  const queryClient = useQueryClient();

  const [filters, setFilters] = useState({
    search: "",
    page: 1,
    isBlock: false,
  });

  const { data, isLoading } = useQuery({
    queryKey: ["users", filters],
    queryFn: () => fetchUsers(filters),
  });

  const { isCollapsed } = useGlobalStore();

  const { mutate: toggleBlockUser, isPending: isBlocking } = useMutation({
    mutationFn: (userId: string) => blockUser(userId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
    },
    onError: (error) => {
      console.error("Error blocking user:", error);
    },
  });

  return (
    <div>
      <div
        className={`p-4 bg-white min-h-screen transition-all duration-300 ${
          isCollapsed ? "ml-16" : "ml-64"
        }`}
      >
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">Product List</h2>

          {/* Dropdown Menu */}
          <DropdownMenu>
            <div className="p-4 w-64 bg-white rounded shadow-md">
              <Input
                placeholder="Search products..."
                value={filters.search}
                onChange={(e) =>
                  setFilters({ ...filters, search: e.target.value })
                }
              />

              {/* Condition Filter */}
              <div className="mt-3">
                <h3 className="font-semibold text-gray-700">Blocked Users</h3>
                <Checkbox
                  label="blocked users"
                  checked={filters.isBlock === true}
                  onChange={() => setFilters({ ...filters, isBlock: true })}
                />
              </div>

              {/* Clear Filters Button */}
              <Button
                onClick={() =>
                  setFilters({
                    search: "",
                    isBlock: false,
                    page: 1,
                  })
                }
              >
                Clear Filters
              </Button>
            </div>
          </DropdownMenu>
        </div>

        {/* user Table */}
        {isLoading ? (
          <p>Loading products...</p>
        ) : (
          <table className="w-full border-collapse text-black border border-gray-300 mt-4">
            <thead>
              <tr className="bg-green-500 text-white text-left">
                <th className="border p-2 w-12">No</th>
                <th className="border p-2 w-16">Image</th>
                <th className="border p-2">Name</th>
                <th className="border p-2">email</th>
                <th className="border p-2">wallet</th>
                <th className="border p-2">createdAt</th>
                <th className="border p-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {data?.users?.map((users: User, index: number) => (
                <tr key={users.id} className="text-left border">
                  <td className="border p-2">{index + 1}</td>
                  <td className="border p-2">
                    <Image
                      src={users.profileImage || "/placeholder.jpg"}
                      alt={users.name}
                      fill
                      className="object-cover rounded-md"
                    />
                  </td>
                  <td className="border p-2">
                    {" "}
                    {users?.name ? (
                      users.name
                    ) : (
                      <User size={20} className="text-gray-500" />
                    )}
                  </td>
                  <td className="border p-2">${users.email}</td>
                  <td className="border p-2">{users.wallet}</td>
                  <td className="border p-2">{users.createdAt}</td>
                  <td className=" p-2 flex justify-around space-x-2">
                    <button
                      className="text-blue-500 hover:text-blue-700"
                      onClick={() => router.push(`/customers/${users.id}`)}
                    >
                      <Eye size={30} />
                    </button>
                    <button
                      className="text-green-500 hover:text-green-700"
                      onClick={() => toggleBlockUser(users.id)}
                      disabled={isBlocking}
                    >
                      {isBlocking
                        ? "Processing..."
                        : users?.isBlock
                        ? "Unblock User"
                        : "Block User"}
                    </button>
                    <button className="text-red-500 hover:text-red-700">
                      <Trash size={30} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default Customers;
