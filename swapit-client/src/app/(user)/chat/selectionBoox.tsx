"use client"

import { useGlobalStore } from "@/store/store";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { editProduct, fetchSpecificProduct } from "@/services/product";
import { useMutation, useQuery } from "@tanstack/react-query";

const SenderSelectionBox = () => {
  const router = useRouter();
  const { closeSelectionBox, setTransactionType, userOrDealer, productId } = useGlobalStore();
  const [localAmount, setLocalAmount] = useState("");
  const [isConfirmed, setIsConfirmed] = useState(false);

  const { data, isLoading, error } = useQuery({
    queryKey: ["product", productId],
    queryFn: () => fetchSpecificProduct(productId),
    enabled: !!productId,
  });

  const productPrice = data?.product?.price;

  const updateProductMutation = useMutation({
    mutationFn: (data: { productId: string; price: number }) =>
      editProduct(data.productId, { price: data.price }),
    onSuccess: () => {
      console.log("Product price updated successfully");
      setIsConfirmed(true);
    },
    onError: (error) => {
      console.error("Error updating product price:", error);
      alert("Failed to update product price. Please try again.");
    },
  });

  const handleConfirm = async () => {
    if (!localAmount) {
      alert("Please enter an amount.");
      return;
    }

    try {
      await updateProductMutation.mutateAsync({
        productId,
        price: Number(localAmount),
      });
    } catch (error) {
      console.error("Error during confirmation:", error);
    }
  };

  const handleSelection = (type: string) => {
    if (userOrDealer === 2 && !isConfirmed) {
      alert("Please confirm the amount before proceeding.");
      return;
    }

    setTransactionType(type);
    closeSelectionBox();
    if (type === "swap") {
      router.push(`/checkout/swap?productId=${productId}`);
    } else {
      router.push(`/checkout/sell?productId=${productId}`);
    }
  };

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setLocalAmount(value);
  };

  if (isLoading) {
    return (
      <div className="p-4 bg-white rounded-md text-center text-green-600 shadow">
        Loading product details...
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-4 bg-red-100 rounded-md text-center text-red-600 shadow">
        Failed to fetch product details. Please try again.
      </div>
    );
  }

  return (
    <div className="min-w-fit min-h-fit border-black p-2 bg-white shadow-md rounded-md text-black">
      {userOrDealer === 1 && productPrice && (
        <p className="mb-2">Product amount is: {productPrice}</p>
      )}

      {userOrDealer === 2 && (
        <div className="mb-2">
          <label htmlFor="amount" className="block text-sm font-medium text-gray-700">Amount</label>
          <input
            type="text"
            id="amount"
            value={localAmount}
            onChange={handleAmountChange}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm"
            placeholder="Enter amount"
          />
          {localAmount && (
            <button
              className="bg-blue-600 text-white px-3 py-1 rounded mt-2"
              onClick={handleConfirm}
              disabled={updateProductMutation.isPending}
            >
              {updateProductMutation.isPending ? "Confirming..." : "Confirm"}
            </button>
          )}
        </div>
      )}

      <p>Choose the type</p>
      <button
        className="bg-green-600 text-white px-3 py-1 rounded mr-2"
        onClick={() => handleSelection("sell")}
        disabled={userOrDealer === 2 && !isConfirmed} 
      >
        sell
      </button>
      <button
        className="bg-green-600 text-white px-3 py-1 rounded"
        onClick={() => handleSelection("swap")}
        disabled={userOrDealer === 2 && !isConfirmed} 
      >
        swap
      </button>
    </div>
  );
};

export default SenderSelectionBox;