"use client";
import { fetchSpecificProduct } from "@/services/product";
import { fetchSpecificUser } from "@/services/users";
import { useQuery } from "@tanstack/react-query";
import { useRouter, useSearchParams } from "next/navigation";
import { useGlobalStore } from "@/store/store"; 
import { useEffect } from "react";
import { sendNotification } from "@/services/notification";
import ResetButton from "@/components/ui/reset";
import MakeDealButtonProfile from "@/components/ui/makedeal";
import MakeDealButtonShop from "@/components/ui/makedeal copy";

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
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4 mt-16">
      {/* Main Swap Container */}
      <div className="w-full max-w-xl flex flex-col md:flex-row shadow-lg bg-[#e8e8e8]">
        {selectedProduct && swappingProduct ? (
          <>
            {/* Left: Selected Product */}
            <div className="flex-1 bg-[#e0e0e0] p-6 flex flex-col items-center my-10 mr-5 ml-10 rounded-3xl shadow-2xl">
              <h2 className="text-lg font-semibold text-gray-600 mb-2">Selected Product</h2>
              <img src={selectedProduct.image} alt={selectedProduct.name} className="w-48 h-48 object-cover rounded-lg shadow-md" />
              <h3 className="mt-2 text-base font-light text-gray-500">{selectedProduct.name}</h3>
              <p className="mt-3 text-base font-semibold text-gray-800">₹{selectedProduct.price}</p>
            </div>

            {/* Right: Swapping Product */}
            <div className="flex-1 bg-[#e0e0e0] p-6 flex flex-col items-center  my-10 ml-5 mr-10  rounded-3xl shadow-2xl">
              <h2 className="text-lg font-semibold mb-2 text-white">Swapping Product</h2>
              <img src={swappingProduct.image} alt={swappingProduct.name} className="w-48 h-48 object-cover rounded-lg shadow-md" />
              <h3 className="mt-2 text-base font-light text-gray-500">{swappingProduct.name}</h3>
              <p className="mt-3 text-base font-semibold text-gray-800">₹{swappingProduct.price}</p>
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
            className="px-8 py-3 text-black"
          >
            <MakeDealButtonShop/>
          </button>
        )}

        {!selectedProduct && (
          <button
            onClick={() => router.push("/profile")}
            className="px-8 py-3 text-black"
          >
            <MakeDealButtonProfile/>
          </button>
        )}

        {(selectedProduct || swappingProduct) && (
          <button
            onClick={resetSwap}
            className="px-5 py-2 "
          >
            <ResetButton/>
          </button>
        )}

        {selectedProduct && swappingProduct && (
          <button
            className=" py-2 bg-[#2c5232] text-white rounded-lg shadow-xl font-base text-sm transition-all duration-200 hover:bg-green-600 hover:scale-105"
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
