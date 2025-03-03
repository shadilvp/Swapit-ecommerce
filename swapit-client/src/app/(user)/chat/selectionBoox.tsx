import { useGlobalStore } from "@/store/store";

const SelectionBox = () => {
    const { closeSelectionBox, setTransactionType,transactionType } = useGlobalStore(); 
    const handleSelection = (type: string) => {
      console.log(type)
      setTransactionType(type)
      closeSelectionBox();
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