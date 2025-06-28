"use client";

import { useQuery } from "@tanstack/react-query";
import { fetchSpecificProduct } from "@/services/product";
import { useParams } from "next/navigation";
import { useGlobalStore } from "@/store/store";
import Image from "next/image";

const ProductDetails = () => {
  const { isCollapsed } = useGlobalStore();
  const { productId } = useParams();
  const id = Array.isArray(productId) ? productId[0] : productId!;

  const { data, isLoading, error } = useQuery({
    queryKey: ["product", id],
    queryFn: () => fetchSpecificProduct(id),
    enabled: !!id,
  });

  if (isLoading)
    return (
      <h1 className="text-center text-xl text-green-600">Loading Product...</h1>
    );
  if (error)
    return <p className="text-center text-red-500">Error fetching product.</p>;

  const product = data?.product;

  return (
    <div
      className={`p-6 bg-white min-h-screen transition-all duration-300 ${
        isCollapsed ? "ml-16" : "ml-64"
      } `}
    >
      <div className="max-w-5xl mx-auto bg-green-50 shadow-lg rounded-lg p-6 ">
        <h1 className="text-2xl font-bold text-green-700 border-b pb-3 mb-4">
          Product Details
        </h1>

        <div className="grid md:grid-cols-2 gap-6 ">
          {/* Product Image */}
          <div className="flex justify-center hover:scale-105 relative w-full max-w-sm h-64 rounded-lg shadow-md overflow-hidden">
            <Image
              src={product.image || "/placeholder.jpg"}
              alt={product.name}
              fill
              className="object-cover"
            />
          </div>

          {/* Product Info */}
          <div className="space-y-3 text-black">
            <p className="text-lg ">
              <strong className="text-green-700">Name:</strong> {product.name}
            </p>
            <p className="text-lg">
              <strong className="text-green-700">Price:</strong> $
              {product.price}
            </p>
            <p className="text-lg">
              <strong className="text-green-700">Category:</strong>{" "}
              {product.category}
            </p>
            <p className="text-lg">
              <strong className="text-green-700">Description:</strong>{" "}
              {product.description}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
