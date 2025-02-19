"use client";

import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { fetchProducts, fetchCategories } from "@/services/product";

import { DropdownMenu } from "@/components/ui/dropDownMenu";
import Button from "@/components/ui/button";
import Checkbox from "@/components/ui/checkBox";
import Input from "@/components/ui/input";
import Select from "@/components/ui/selectionBox";
import { useRouter } from "next/navigation";
import { Heart } from "lucide-react";

const Shop = () => {
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

  const { data: categories, isLoading: isLoadingCategories, error } = useQuery({
    queryKey: ["categories"],
    queryFn: fetchCategories,
  });

  const handleSwapCartButton = (product: any) => {
    if (product.condition === "new") {
      router.push("/");
    } else {
      router.push(`/swapProduct?id=${product._id}`);
    }
  };
  


  return (
    <div className={`bg-white min-h-screen transition-all duration-300 px-4 md:px-16 py-6 `}>
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Catalog</h2>

      <div className="flex gap-6">
        {/* Fixed Sidebar Filters */}
        <aside className="hidden md:block w-1/4 bg-gray-100 p-6 rounded-lg shadow-md h-screen sticky top-6">
          <h3 className="text-lg font-semibold text-gray-700 mb-4">Filters</h3>

          {/* Search */}
          <Input
            placeholder="Search products..."
            value={filters.search}
            onChange={(e) => setFilters({ ...filters, search: e.target.value })}
          />

          {/* Condition Filter */}
          <div className="mt-4">
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
          <div className="mt-4">
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
          <button
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
            className="mt-4 w-full"
          >
            Clear Filters
          </button>
        </aside>

        {/* Main Content */}
        <main className="flex-1">
          {/* Mobile Filter Dropdown */}
          <div className="md:hidden mb-4">
            <DropdownMenu>
              <div className="p-4 bg-white rounded-lg shadow">
                <h3 className="text-lg font-semibold text-gray-700 mb-4">Filters</h3>
                <Input
                  placeholder="Search products..."
                  value={filters.search}
                  onChange={(e) => setFilters({ ...filters, search: e.target.value })}
                />
                {/* Condition */}
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

                {/* Category */}
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
              </div>
            </DropdownMenu>
          </div>

          {/* Product Cards */}
          {isLoading ? (
            <p>Loading products...</p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {data?.products?.map((product: any) => (
                <div key={product._id} className="bg-white rounded-lg shadow p-4 relative">
                  {/* Wishlist Icon */}
                  <button className="absolute top-2 right-2 text-gray-600 hover:text-red-500">
                    <Heart size={20} />
                  </button>

                  {/* Product Image */}
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-48 object-cover rounded-lg"
                  />

                  {/* Product Info */}
                  <h3 className="mt-2 font-semibold text-gray-800">{product.name}</h3>
                  <p className="text-green-600 font-bold">${product.price}</p>

                  {/* Actions */}
                  <div className="flex justify-between mt-3">
                    <Button onClick={() => router.push(`/allProducts/${product._id}`)}>View</Button>
                    <Button onClick={() => handleSwapCartButton(product)}>
                        {product.condition === "new" ? "Add to Cart" : "Swap"}
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default Shop;
