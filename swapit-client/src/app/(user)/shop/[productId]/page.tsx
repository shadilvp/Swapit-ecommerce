"use client";

import { useQuery } from "@tanstack/react-query";
import { fetchSpecificProduct } from "@/services/product";
import { useParams } from "next/navigation";
import { motion } from "framer-motion";

const ProductDetails = () => {
  const { productId } = useParams();
  const { data, isLoading, error } = useQuery({
    queryKey: ["product", productId],
    queryFn: () => fetchSpecificProduct(productId),
    enabled: !!productId,
  });

  if (isLoading) return <h1 className="text-center text-lg font-bold">Loading Product ...</h1>;
  if (error) return <p className="text-center text-red-500">Error fetching product</p>;

  const product = data?.product;

  return (
    <div className="min-h-screen p-6 bg-gray-100 flex justify-center items-center">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-3xl w-full">
        <div className="flex flex-col md:flex-row items-center gap-6">
          {/* Product Image */}
          <img
            src={product.image}
            alt={product.name}
            className="w-full md:w-1/2 h-80 object-cover rounded-lg shadow-md"
          />

          {/* Product Info */}
          <div className="flex-1">
            <h1 className="text-2xl font-bold text-gray-800">{product.name}</h1>
            <p className="text-gray-600 mt-2">{product.description}</p>
            <p className="text-green-600 text-lg font-semibold mt-2">${product.price}</p>

            {/* Sliding Button */}
            <div className="mt-6">
              <SlideButton condition={product.condition} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Sliding Button Component
const SlideButton = ({ condition }: { condition: string }) => {
  const buttonText = condition === "new" ? "Add to Cart" : "Check Out";
  
  return (
    <motion.div
      className="relative w-40 h-12 bg-gray-200 rounded-full flex items-center overflow-hidden"
      whileTap={{ scale: 0.95 }}
    >
      <motion.div
        className="absolute left-0 bg-green-500 text-white h-full flex items-center justify-center px-4 rounded-full cursor-pointer"
        initial={{ x: 0 }}
        whileHover={{ x: 100 }}
        transition={{ type: "spring", stiffness: 200, damping: 15 }}
      >
        {buttonText}
      </motion.div>
    </motion.div>
  );
};

export default ProductDetails;
