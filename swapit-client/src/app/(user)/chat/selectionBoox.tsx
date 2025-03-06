"use client"

import { useGlobalStore } from "@/store/store";
import { useRouter } from "next/navigation";

const SelectionBox = () => {
  const router = useRouter()
    const { closeSelectionBox, setTransactionType } = useGlobalStore(); 
    const handleSelection = (type: string) => {
      // console.log(type)

      setTransactionType(type)
      closeSelectionBox();
      if(type == "swap"){
        router.push("/checkout/swap")
      }else{
        router.push("/checkout/sell")
      }
    };

    return (
      <div className="min-w-fit min-h-fit border-black p-2 bg-white shadow-md rounded-md">
        <p>Choose the type</p>
        <button 
          className="bg-green-600 text-white px-3 py-1 rounded mr-2"
          onClick={() => handleSelection("sell")}
        >sell
        </button>
        <button 
          className="bg-green-600 text-white px-3 py-1 rounded"
          onClick={() => handleSelection("swap")}
        >swap
        </button>
      </div>
    );
  };

  export default SelectionBox;