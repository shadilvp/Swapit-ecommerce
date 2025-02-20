"use client";
import { fetchSpecificProduct } from "@/services/product";
import { fetchSpecificUser } from "@/services/users";
import { useQuery } from "@tanstack/react-query";
import { useRouter, useSearchParams } from "next/navigation";
import { useGlobalStore } from "@/store/store"; 
import { useEffect } from "react";
import { sendNotification } from "@/services/notification";

const ProductSwap = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const productId = searchParams.get("id");
  const source = searchParams.get("source");

  const { selectedProduct, swappingProduct, setSelectedProduct, setSwappingProduct, resetSwap } = useGlobalStore();

  // console.log("selected",selectedProduct)
  // console.log("swapped",swappingProduct)

  // Fetch Product Details
  const { data: productData } = useQuery({
    queryKey: ["product", productId],
    queryFn: () => fetchSpecificProduct(productId),
    enabled: !!productId,
  });

  const product = productData?.product;

  //  Use useEffect to prevent state updates during rendering
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
      const params = {
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
      };
      console.log("datas for notification")
      await sendNotification(params);
      alert("Swap request sent successfully!");
    } catch (error) {
      alert("Failed to send swap request. Please try again.");
    }
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      {/* Main Swap Container */}
      <div className="w-full max-w-4xl flex flex-col md:flex-row shadow-lg">
        {selectedProduct && swappingProduct ? (
          <>
            {/* Left: Selected Product */}
            <div className="flex-1 bg-green-300 p-6 flex flex-col items-center">
              <h2 className="text-lg font-semibold text-green-900 mb-2">Selected Product</h2>
              <img src={selectedProduct.image} alt={selectedProduct.name} className="w-48 h-48 object-cover rounded-lg shadow-md" />
              <h3 className="mt-2 text-xl font-bold">{selectedProduct.name}</h3>
              <p className="text-lg font-semibold">₹{selectedProduct.price}</p>
            </div>

            {/* Right: Swapping Product */}
            <div className="flex-1 bg-green-500 p-6 flex flex-col items-center text-white">
              <h2 className="text-lg font-semibold mb-2">Swapping Product</h2>
              <img src={swappingProduct.image} alt={swappingProduct.name} className="w-48 h-48 object-cover rounded-lg shadow-md" />
              <h3 className="mt-2 text-xl font-bold">{swappingProduct.name}</h3>
              <p className="text-lg font-semibold">₹{swappingProduct.price}</p>
            </div>
          </>
        ) : (
          <p className="text-center text-gray-600">Please select products to swap.</p>
        )}
      </div>

      {/* Buttons */}
      <div className="flex flex-col gap-3 mt-6">
        {!swappingProduct && (
          <button
            onClick={() => router.push("/shop")}
            className="px-8 py-3 bg-green-500 text-white rounded-lg shadow-md font-semibold text-lg transition-all duration-200 hover:bg-green-600 hover:scale-105"
          >
            Choose from Shop
          </button>
        )}

        {!selectedProduct && (
          <button
            onClick={() => router.push("/profile")}
            className="px-8 py-3 bg-green-500 text-white rounded-lg shadow-md font-semibold text-lg transition-all duration-200 hover:bg-green-600 hover:scale-105"
          >
            Choose from Profile
          </button>
        )}

        {(selectedProduct || swappingProduct) && (
          <button
            onClick={resetSwap}
            className="px-8 py-3 bg-green-500 text-white rounded-lg shadow-md font-semibold text-lg transition-all duration-200 hover:bg-green-600 hover:scale-105"
          >
            Reset Selection
          </button>
        )}

        {selectedProduct && swappingProduct && (
          <button
            className="px-8 py-3 bg-green-500 text-white rounded-lg shadow-md font-semibold text-lg transition-all duration-200 hover:bg-green-600 hover:scale-105"
            onClick={handleMakeDeal}
          >
            Make a Deal
          </button>
        )}
      </div>

    </div>
  );
};

export default ProductSwap;
