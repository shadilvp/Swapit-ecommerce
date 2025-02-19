"use client"

import { useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import { useSidebarStore } from "@/store/store";
import { fetchSpecificUser } from "@/services/users";



const userDetails = () => {
    const { isCollapsed } = useSidebarStore();
    const {userId} = useParams();
    
    const {data, isLoading, error } = useQuery({
        queryKey:["user", userId],
        queryFn: ()=> fetchSpecificUser(userId),
        enabled: !!userId,
    });
    // console.log("product", data)
    
    if(isLoading) return <h1>Loading user ...</h1>
    if(error) return  <p>error fetching user</p>
    return(
        <div className={`p-4 bg-white text-green-500 min-h-screen transition-all duration-300 ${isCollapsed ? 'ml-16' : 'ml-64'}`}>
        <h1>user Details</h1>
        <p><strong>ID:</strong> {data.user._id}</p>
        <p><strong>Name:</strong> {data.user.name}</p>
        <p><strong>Email:</strong> {data.user.email}</p>
        <p><strong>Wallet:</strong> {data.user.wallet}</p>
      </div>
    )
}

export default userDetails