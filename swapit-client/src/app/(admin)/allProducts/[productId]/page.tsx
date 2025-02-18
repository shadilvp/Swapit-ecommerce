"use client"

import { useQuery } from "@tanstack/react-query";
import { fetchSpecificProduct } from "@/services/product";
import { useParams } from "next/navigation";
import { useSidebarStore } from "@/store/store";



const productDetails = () => {
    const { isCollapsed } = useSidebarStore();
    const {productId} = useParams();
    const {data, isLoading, error } = useQuery({
        queryKey:["product", productId],
        queryFn: ()=> fetchSpecificProduct(productId),
        enabled: !!productId,
    });
    // console.log("product", data)
    
    if(isLoading) return <h1>Loading Product ...</h1>
    if(error) return  <p>error fetching product</p>
    return(
        <div className={`p-4 bg-white text-green-500 min-h-screen transition-all duration-300 ${isCollapsed ? 'ml-16' : 'ml-64'}`}>
        <h1>Product Details</h1>
        <p><strong>ID:</strong> {data.product._id}</p>
        <p><strong>Name:</strong> {data.product.name}</p>
        <p><strong>Price:</strong> ${data.product.price}</p>
        <p><strong>Description:</strong> {data.product.description}</p>
      </div>
    )
}

export default productDetails