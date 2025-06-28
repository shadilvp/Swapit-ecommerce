"use client";

import Button from "@/components/ui/button";
import { fetchSpecificProduct } from "@/services/product";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import Image from "next/image";

// Define Product type
interface Product {
  _id: string;
  name: string;
  description: string;
  image: string;
  price: number;
}

const SpecificUserProductList = ({ userId }: { userId: string }) => {
  const router = useRouter();

  const { data: productData, isLoading, error } = useQuery({
    queryKey: ["product", userId],
    queryFn: () => fetchSpecificProduct(userId),
  });

  if (isLoading) return <p>Loading products...</p>;
  if (error) return <p>Error loading products</p>;

  return (
    <div>
      <h1 className="text-xl font-semibold mt-6">Products for Selling</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
        {productData?.product?.map((product: Product) => (
          <div key={product._id} className="p-4 border rounded-lg shadow-md">
            <div className="relative w-full h-40 rounded-md overflow-hidden">
              <Image
                src={product.image}
                alt={product.name}
                fill
                className="object-cover"
              />
            </div>
            <h2 className="text-lg font-medium mt-2">{product.name}</h2>
            <p className="text-gray-600">{product.description}</p>
            <span className="text-green-600 font-bold block mt-2">${product.price}</span>
            <div className="mt-auto pt-2">
              <Button onClick={() => router.push(`/swapProduct?id=${product._id}&source=profile`)}>
                Select
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SpecificUserProductList;
