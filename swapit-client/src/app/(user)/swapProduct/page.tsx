"use client";
import { fetchSpecificProduct } from "@/services/product";
import { fetchSpecificUser } from "@/services/users";// Import the function to fetch user details
import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "next/navigation";

const ProductSwap = () => {
  const searchParams = useSearchParams();
  const productId = searchParams.get("id");

  // Fetch Product Details
  const { data: productData, isLoading: productLoading, error: productError } = useQuery({
    queryKey: ["product", productId],
    queryFn: () => fetchSpecificProduct(productId),
    enabled: !!productId,
  });

  const product = productData?.product;
  console.log("user Id",product.seller)

  const userId = product.seller
    const {data, sellerLoading, sellerError } = useQuery({
        queryKey:["user", userId],
        queryFn: ()=> fetchSpecificUser(userId),
        enabled: !!userId,
    });

  // console.log("seller",seller)

  if (productLoading) return <p className="text-center text-gray-600">Loading product...</p>;
  if (productError) return <p className="text-center text-red-600">Error loading product details.</p>;

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      {/* Main Swap Container */}
      <div className="w-full max-w-4xl flex flex-col md:flex-row shadow-lg">
        {/* Choose Your Product */}
        <div className="flex-1 bg-green-300 p-6 flex flex-col items-center">
          <h2 className="text-lg font-semibold text-green-900 mb-2">Choose Your Product</h2>
          <button className="border border-green-900 px-4 py-1 rounded-md text-green-900">Select</button>
          <div className="w-full h-64 bg-green-400 mt-4 flex items-center justify-center text-green-900 font-semibold">
            Product Details
          </div>
        </div>

        {/* Swapping Product */}
        <div className="flex-1 bg-green-500 p-6 flex flex-col items-center text-white">
          <h2 className="text-lg font-semibold mb-2">Swapping Product</h2>
          {product ? (
            <div className="w-full flex flex-col items-center">
              <img
                src={product.image}
                alt={product.name}
                className="w-48 h-48 object-cover rounded-lg shadow-md"
              />
              <h3 className="mt-2 text-xl font-bold">{product.name}</h3>
              <p className="text-sm mt-1 italic">{product.condition}</p>
              <p className="text-lg font-semibold mt-1">₹{product.price}</p>
              <p className="text-sm mt-1">{product.description}</p>
              <p className="text-xs mt-1">{product.location.address}</p>

              {/* Seller Details */}
              {sellerLoading ? (
                <p className="text-sm mt-2">Loading seller details...</p>
              ) : sellerError ? (
                <p className="text-sm text-red-400 mt-2">Failed to load seller info</p>
              ) : seller ? (
                <div className="mt-4 text-white text-center">
                  <h4 className="text-lg font-semibold">Seller Details</h4>
                  <p className="text-sm">Name: {seller.name}</p>
                  <p className="text-sm">Mobile: {seller.mobile}</p>
                  <p className="text-sm">Email: {seller.email}</p>
                </div>
              ) : (
                <p className="text-sm mt-2">No seller information available</p>
              )}
            </div>
          ) : (
            <p>No product details available</p>
          )}
        </div>
      </div>

      {/* Make A Deal Button */}
      <button className="mt-6 px-6 py-2 bg-green-400 text-white rounded-md shadow-md font-semibold">
        Make A Deal
      </button>
    </div>
  );
};

export default ProductSwap;
