"use client";

import { fetchSpecificProduct } from "@/services/product";
import { useQuery } from "@tanstack/react-query";
import { useRouter, useSearchParams } from "next/navigation";
import { useGlobalStore } from "@/store/store";
import { useEffect, useState } from "react";
import { sendNotification } from "@/services/notification";
import ResetButton from "@/components/ui/reset";
import MakeDealButtonProfile from "@/components/ui/makedeal";
import MakeDealButtonShop from "@/components/ui/makedeal copy";
import Image from "next/image";
import { Product } from "@/types";

interface ProductResponse {
  product: Product;
}

const ProductSwap = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const productId = searchParams.get("id") as string | null;
  const source = searchParams.get("source");

  const {
    selectedProduct,
    swappingProduct,
    setSelectedProduct,
    setSwappingProduct,
    resetSwap,
  } = useGlobalStore();

  const [isSubmitting, setIsSubmitting] = useState(false);

  const { data: productData } = useQuery<ProductResponse>({
    queryKey: ["product", productId],
    queryFn: () => fetchSpecificProduct(productId as string),
    enabled: !!productId,
  });

  const product = productData?.product;

  useEffect(() => {
    if (product) {
      if (source === "shop" && !swappingProduct) {
        setSwappingProduct(product);
      }
      if (source === "profile" && !selectedProduct) {
        setSelectedProduct(product);
      }
    }
  }, [product, source, setSelectedProduct, setSwappingProduct, swappingProduct, selectedProduct]);

  const handleMakeDeal = async () => {
    if (!selectedProduct || !swappingProduct) return;

    try {
      setIsSubmitting(true);
      await sendNotification({
        sellerId: swappingProduct.seller,
        selectedProduct: {
          _id: selectedProduct._id,
          name: selectedProduct.name,
          image: selectedProduct.image,
          price: selectedProduct.price,
        },
        swappingProduct: {
          _id: swappingProduct._id,
          name: swappingProduct.name,
          image: swappingProduct.image,
          price: swappingProduct.price,
        },
      });

      alert("Swap request sent successfully!");
      resetSwap();
      router.push("/profile");
    } catch (error) {
      alert("Failed to send swap request. Please try again.");
      console.log("Swap error:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4 mt-16">
      <div className="w-full max-w-xl flex flex-col md:flex-row shadow-lg bg-[#e8e8e8]">
        {selectedProduct && swappingProduct ? (
          <>
            {/* Selected Product */}
            <div className="flex-1 bg-[#e0e0e0] p-6 flex flex-col items-center my-10 mr-5 ml-10 rounded-3xl shadow-2xl">
              <h2 className="text-lg font-semibold text-gray-600 mb-2">Selected Product</h2>
              <Image
                src={selectedProduct.image}
                alt={selectedProduct.name || "Selected Product"}
                width={192}
                height={192}
                className="object-cover rounded-lg shadow-md"
              />
              <h3 className="mt-2 text-base font-light text-gray-500">{selectedProduct.name}</h3>
              <p className="mt-3 text-base font-semibold text-gray-800">₹{selectedProduct.price}</p>
            </div>

            {/* Swapping Product */}
            <div className="flex-1 bg-[#e0e0e0] p-6 flex flex-col items-center my-10 ml-5 mr-10 rounded-3xl shadow-2xl">
              <h2 className="text-lg font-semibold mb-2 text-white">Swapping Product</h2>
              <Image
                src={swappingProduct.image}
                alt={swappingProduct.name || "Swapping Product"}
                width={192}
                height={192}
                className="object-cover rounded-lg shadow-md"
              />
              <h3 className="mt-2 text-base font-light text-gray-500">{swappingProduct.name}</h3>
              <p className="mt-3 text-base font-semibold text-gray-800">₹{swappingProduct.price}</p>
            </div>
          </>
        ) : (
          <p className="text-center text-gray-600">Please select products to swap.</p>
        )}
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col gap-3 mt-6">
        {!swappingProduct && (
          <button onClick={() => router.push("/shop")} className="px-8 py-3 text-black">
            <MakeDealButtonShop />
          </button>
        )}

        {!selectedProduct && (
          <button onClick={() => router.push("/profile")} className="px-8 py-3 text-black">
            <MakeDealButtonProfile />
          </button>
        )}

        {(selectedProduct || swappingProduct) && (
          <button onClick={resetSwap} className="px-5 py-2">
            <ResetButton />
          </button>
        )}

        {selectedProduct && swappingProduct && (
          <button
            onClick={handleMakeDeal}
            disabled={isSubmitting}
            className={`py-2 rounded-lg shadow-xl font-base text-sm transition-all duration-200 ${
              isSubmitting
                ? "bg-gray-400 text-white cursor-not-allowed"
                : "bg-[#2c5232] text-white hover:bg-green-600 hover:scale-105"
            }`}
          >
            {isSubmitting ? "Sending..." : "Make a Deal"}
          </button>
        )}
      </div>
    </div>
  );
};



export default ProductSwap;
