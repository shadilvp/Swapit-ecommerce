"use client";

import { useQuery } from "@tanstack/react-query";
import { fetchSpecificProduct } from "@/services/product";
import { useParams, useRouter } from "next/navigation";
import { fetchSpecificUser } from "@/services/users";
import Loader from "@/components/ui/simpleLoadder";
import ChatWithSellerButton from "@/components/ui/chatWithSeller";
import Image from "next/image";

const ProductDetails = () => {
  const rawProductId = useParams().productId;
  const productId = typeof rawProductId === "string" ? rawProductId : "";
  const router = useRouter();

  // Fetch product details
  const { data, isLoading, error } = useQuery({
    queryKey: ["product", productId],
    queryFn: () => fetchSpecificProduct(productId),
    enabled: !!productId,
  });

  const product = data?.product;
  const sellerId = product?.seller || "";

  const {
    data: sellerData,
    isLoading: sellerLoading,
    error: sellerError,
  } = useQuery({
    queryKey: ["user", sellerId],
    queryFn: () => fetchSpecificUser(sellerId),
    enabled: !!sellerId,
  });

  const num = 1;
  if (isLoading) return <Loader />;
  if (error)
    return <p className="text-center text-red-500">Error fetching product</p>;
  const handleChat = () => {
    if (sellerId && productId) {
      router.push(`/chat/${sellerId}?productId=${productId}&from=${num}`);
    }
  };

  return (
    <div className="min-h-[80vh] p-6 bg-gray-100 flex justify-center items-center">
      <div className="flex flex-col md:flex-row gap-6 max-w-4xl w-full m-20">
        {/* Left: Product Image & Details */}
        <div className="md:w-1/2 w-full bg-white p-6 rounded-lg shadow-lg flex flex-col items-center">
          <Image
            src={product.image}
            alt={product.name}
            width={500}
            height={320}
            className="w-full h-80 object-cover rounded-lg shadow-md"
            priority
          />
          <div className="mt-4 text-center">
            <h1 className="text-2xl font-bold text-gray-800">{product.name}</h1>
            <p className="text-gray-600 mt-2">{product.description}</p>
            <p className="text-green-600 text-lg font-semibold mt-2">
              ${product.price}
            </p>
          </div>
        </div>

        {/* Right: Extra Info */}
        <div className="md:w-1/2 w-full flex flex-col gap-4">
          {/* Price Box */}
          <div className="bg-white p-4 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold">Price</h2>
            <p className="text-gray-700">${product.price}</p>
          </div>

          {/* Seller Box */}
          <div className="bg-white p-4 rounded-lg shadow-md ">
            <h2 className="text-xl font-semibold">Seller</h2>
            {sellerLoading ? (
              <Loader />
            ) : sellerError ? (
              <p className="text-red-500">Error fetching seller</p>
            ) : (
              <p className="text-gray-700">
                {sellerData?.user?.name || "Unknown Seller"}
              </p>
            )}
            <div className="mt-2 w-full items-center" onClick={handleChat}>
              <ChatWithSellerButton />
            </div>
          </div>

          {/* Location Box */}
          <div className="mt-4 p-4 bg-gray-100 rounded-lg shadow-md">
            <h3 className="text-lg font-semibold text-gray-700">Location</h3>
            <p className="text-gray-600">{product.location.address}</p>

            {/* Google Maps Embed */}
            <iframe
              className="w-full h-48 mt-2 rounded-lg"
              src={`https://www.google.com/maps?q=${product.location.latitude},${product.location.longitude}&output=embed`}
              allowFullScreen
              loading="lazy"
            ></iframe>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
