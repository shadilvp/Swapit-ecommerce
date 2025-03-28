"use client";

import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { fetchProducts, fetchCategories } from "@/services/product";
import Loader from "@/components/ui/loader";

import { DropdownMenu } from "@/components/ui/dropDownMenu";
import Checkbox from "@/components/ui/checkBox1";
import Input from "@/components/ui/input";
import Select from "@/components/ui/selectionBox";
import ProductCard from "@/components/ui/productCards";
import { useRouter, useSearchParams } from "next/navigation";
import SearchInput from "@/components/ui/search";
import Radio from "@/components/ui/radioButton";

const Shop = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const categoryFromQuery = searchParams.get("category") || "";

  const [filters, setFilters] = useState({
    search: "",
    condition: "",
    category: "",
    subCategory: categoryFromQuery,
    page: 1,
    minPrice: "",
    maxPrice: "",
  });

  const {
    data: categories,
    isLoading: isLoadingCategories,
    error,
  } = useQuery({
    queryKey: ["categories"],
    queryFn: fetchCategories,
  });

  useEffect(() => {
    if (categoryFromQuery && categories) {
      const foundCategory = categories.find(
        (cat: any) => cat.name === categoryFromQuery
      );
      if (foundCategory) {
        setFilters((prev) => ({
          ...prev,
          category: foundCategory._id,
          subCategory: "",
        }));
        console.log(filters);
      }
    }
  }, [categoryFromQuery, categories]);

  const { data, isLoading } = useQuery({
    queryKey: ["products", filters],
    queryFn: () => fetchProducts(filters),
  });

  const handleSwapCartButton = (product: any) => {
    if (product.condition === "new") {
      router.push("/");
    } else {
      router.push(`/swapProduct?id=${product._id}&source=shop`);
    }
  };

  return (
    <div
      className={`bg-[#e8e8e8] min-h-screen transition-all duration-300  md:px-16 py-4 mt-20`}
    >
      <div className="w-full font-extralight">
        <h2 className="text-8xl text-green-800 mb-2 ">Catalog</h2>
        <div className="max-w-prose h-1 bg-green-800 mt-4"></div>
      </div>
      <br />
      <br />

      <div className="flex gap-6">
        {/* Fixed Sidebar Filters */}
        <aside className="hidden md:block w-1/4 p-6  h-screen sticky top-6 mr-6 text-green-800">
          <h3 className="text-lg font-semibold  mb-4">Filters</h3>

          {/* Search */}
          <SearchInput
            placeholder="Search products..."
            value={filters.search}
            onChange={(e) => setFilters({ ...filters, search: e.target.value })}
          />

          {/* Condition Filter */}
          <div className="mt-4">
            <h3 className="font-semibold text-green-800">
              Filter by Condition
            </h3>
            <Radio
              label="New"
              checked={filters.condition === "new"}
              onChange={() => setFilters({ ...filters, condition: "new" })}
            />
            <Radio
              label="Used"
              checked={filters.condition === "used"}
              onChange={() => setFilters({ ...filters, condition: "used" })}
            />
          </div>

          {/* Category Filter */}
          <div className="mt-4">
            <h3 className="font-semibold text-green-800">Filter by Category</h3>
            {isLoadingCategories ? (
              <Loader />
            ) : error ? (
              <p className="text-red-500">Error loading categories</p>
            ) : (
              categories?.map((category: any) => (
                <div key={category._id} className="mt-2">
                  <label className="font-semibold text-green-800">
                    {category.name}
                  </label>
                  <Select
                    value={
                      filters.category === category._id
                        ? filters.subCategory
                        : ""
                    }
                    onChange={(e) =>
                      setFilters({
                        ...filters,
                        category: category._id,
                        subCategory: e.target.value,
                      })
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
          <div className="md:hidden mb-4">
            <DropdownMenu>
              <div className="p-4 bg-white rounded-lg shadow z-40">
                <Input
                  placeholder="Search products..."
                  value={filters.search}
                  onChange={(e) =>
                    setFilters({ ...filters, search: e.target.value })
                  }
                />
                {/* Condition */}
                <div className="mt-3">
                  <h3 className="font-semibold text-gray-700">
                    Filter by Condition
                  </h3>
                  <Checkbox
                    label="New"
                    checked={filters.condition === "new"}
                    onChange={() =>
                      setFilters({ ...filters, condition: "new" })
                    }
                  />
                  <Checkbox
                    label="Used"
                    checked={filters.condition === "used"}
                    onChange={() =>
                      setFilters({ ...filters, condition: "used" })
                    }
                  />
                </div>

                {/* Category */}
                <div className="mt-3">
                  <h3 className="font-semibold text-gray-700">
                    Filter by Category
                  </h3>
                  {isLoadingCategories ? (
                    <Loader />
                  ) : error ? (
                    <p className="text-red-500">Error loading categories</p>
                  ) : (
                    categories?.map((category: any) => (
                      <div key={category._id} className="mt-2">
                        <label className="font-semibold text-gray-700">
                          {category.name}
                        </label>
                        <Select
                          value={
                            filters.category === category._id
                              ? filters.subCategory
                              : ""
                          }
                          onChange={(e) =>
                            setFilters({
                              ...filters,
                              category: category._id,
                              subCategory: e.target.value,
                            })
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
            <Loader />
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {data?.products?.map((product: any) => (
              <ProductCard
                key={product._id}
                product={product}
                handleSwapCartButton={handleSwapCartButton} // ✅ Pass down function
              />
            ))}
          </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default Shop;
