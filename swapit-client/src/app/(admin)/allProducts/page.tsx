"use client";

import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { fetchProducts, fetchCategories } from "@/services/product";

import { DropdownMenu } from "@/components/ui/dropDownMenu";
import Button from "@/components/ui/button";
import Checkbox from "@/components/ui/checkBox1";
import Input from "@/components/ui/input";
import Select from "@/components/ui/selectionBox";
import { Eye, Edit, Trash } from "lucide-react";
import { useRouter } from "next/navigation";
import { useGlobalStore } from '@/store/store';
import DeleteButton from "@/components/ui/deleteIcon";
import EditButton from "@/components/ui/editButton";



const NewProducts = () => {
  const router = useRouter();
  const [filters, setFilters] = useState({
    search: "",
    condition: "",
    category: "",
    subCategory: "",
    page: 1,
    minPrice: "",
    maxPrice: "",
  });
  
  const { data, isLoading } = useQuery({
    queryKey: ["products", filters],
    queryFn: () => fetchProducts(filters),
  });
  console.log("admin Shop - Products:", data);


  const { data: categories, isLoading: isLoadingCategories, error } = useQuery({
    queryKey: ["categories"],
    queryFn: fetchCategories,
  });
  const { isCollapsed } = useGlobalStore();

  return (
    <div className={`p-4 bg-white min-h-screen transition-all duration-300 ${isCollapsed ? 'ml-16' : 'ml-64'}`}>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">Product List</h2>
        <Button onClick={() => router.push("/addProduct")}>Add Product</Button>

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
              <h3 className="font-semibold text-gray-700">Filter by Condition</h3>
              <Checkbox
                label="New"
                checked={filters.condition === "new"}
                onChange={() => setFilters({ ...filters, condition: "new" })}
              />
              <Checkbox
                label="Used"
                checked={filters.condition === "used"}
                onChange={() => setFilters({ ...filters, condition: "used" })}
              />
            </div>

            {/* Category Filter */}
            <div className="mt-3">
              <h3 className="font-semibold text-gray-700">Filter by Category</h3>
              {isLoadingCategories ? (
                <p className="text-gray-600">Loading categories...</p>
              ) : error ? (
                <p className="text-red-500">Error loading categories</p>
              ) : (
                categories?.map((category: any) => (
                  <div key={category._id} className="mt-2">
                    <label className="font-semibold text-gray-700">{category.name}</label>
                    <Select
                      value={filters.category === category._id ? filters.subCategory : ""}
                      onChange={(e) =>
                        setFilters({ ...filters, category: category._id, subCategory: e.target.value })
                      }
                    >
                      <option value="">Select {category.name}</option>
                      {category.subCategories.map((sub: string) => (
                        <option key={sub} value={sub}>
                          {sub}
                        </option>
                      ))}
                    </Select>
                  </div>
                ))
              )}
            </div>

            {/* Clear Filters Button */}
            <Button
              onClick={() =>
                setFilters({
                  search: "",
                  condition: "",
                  category: "",
                  subCategory: "",
                  minPrice: "",
                  maxPrice: "",
                  page: 1,
                })
              }
            >
              Clear Filters
            </Button>
          </div>
        </DropdownMenu>
      </div>

      {/* Product Table */}
      {isLoading ? (
        <p>Loading products...</p>
      ) : (
        <table className="w-full border-collapse text-black border border-gray-300 mt-4">
          <thead>
            <tr className="bg-green-500 text-white text-left">
              <th className="border p-2 w-12">No</th>
              <th className="border p-2 w-16">Image</th>
              <th className="border p-2">Name</th>
              <th className="border p-2">Price</th>
              <th className="border p-2">Quantity</th>
              <th className="border p-2">Category</th>
              <th className="border p-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {data?.products?.map((product: any, index: number) => (
              <tr key={product.id} className="text-left border">
                <td className="border p-2">{index + 1}</td>
                <td className="border p-2">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-10 h-10 object-cover rounded-md"
                  />
                </td>
                <td className="border p-2">{product.name}</td>
                <td className="border p-2">${product.price}</td>
                <td className="border p-2">{product.quantity}</td>
                <td className="border p-2">{product.category.name}</td>
                <td className=" p-2 flex justify-around space-x-2">
                  <button 
                    className="text-blue-500 hover:text-blue-700" 
                    onClick={()=>router.push(`/allProducts/${product._id}`)}
                  >
                    <Eye size={30} />
                  </button>
                  <button className="text-green-500 hover:text-green-700">
                    <EditButton/>
                  </button>
                  <button className="text-red-500 hover:text-red-700">
                    <DeleteButton  />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default NewProducts;
