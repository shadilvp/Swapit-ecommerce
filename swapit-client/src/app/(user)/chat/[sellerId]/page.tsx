"use client";

import { useParams, useSearchParams } from "next/navigation";
import { useState, useEffect } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import io from "socket.io-client";
import { fetchMessages, sendMessageApi } from "@/services/user/message";
import { fetchUserProfile } from "@/services/user/profile";
import { useGlobalStore } from "@/store/store";
import SelectionBox from "../selectionBoox";



const ChatPage = () => {
  const { showSelectionBox, toggleSelectionBox,transactionType } = useGlobalStore(); 
  const { sellerId } = useParams();
  const searchParams = useSearchParams();
  const productId = searchParams.get("productId");

  const [message, setMessage] = useState("");
  const queryClient = useQueryClient();
  const [socket, setSocket] = useState<any>(null);

  // Fetch logged-in user profile
  const { data, isLoading: currentUserLoading } = useQuery({
    queryKey: ["userProfile"],
    queryFn: fetchUserProfile,
  });
  const currentUser = data?.user._id;

  // Initialize socket connection
  useEffect(() => {
    const newSocket = io("http://localhost:4001");
    setSocket(newSocket);

    newSocket.on("receiveMessage", (newMessage) => {
      queryClient.setQueryData(["messages", sellerId], (oldMessages: any[] = []) => [
        ...oldMessages,
        newMessage,
      ]);
    });

    return () => {
      newSocket.disconnect();
    };
  }, [sellerId, queryClient]);

  // Fetch messages
  const { data: messages = [], isLoading } = useQuery({
    queryKey: ["messages", sellerId],
    queryFn: () => fetchMessages(sellerId as string),
  });

  // Send message mutation
  const sendMessageMutation = useMutation({
    mutationFn: ({ sellerId, message, productId, transactionType, selectionBox }: { sellerId: string; message: string; productId: string; transactionType: string, selectionBox: boolean; }) =>
      sendMessageApi(sellerId, message, productId, transactionType, selectionBox),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["messages", sellerId] });
    },
  });

  // Send message handler
  const sendMessage = () => {
    if (message.trim() === "" || !productId) return;
    sendMessageMutation.mutate({ 
      sellerId: sellerId as string,
      message, productId, 
      transactionType, 
      selectionBox :showSelectionBox, 
    });
    setMessage("");
  };

  // Function to format timestamps
  const formatTimestamp = (timestamp: string) => {
    return new Intl.DateTimeFormat("en-US", {
      hour: "numeric",
      minute: "numeric",
      hour12: true,
    }).format(new Date(timestamp));
  };

  return (
    <div className="min-h-screen bg-green-100 flex flex-col items-center py-6 pt-24">
      <div className="bg-white w-full max-w-lg p-6 rounded-lg shadow-lg">
        <h2 className="text-xl font-bold text-green-700 mb-4">Chat with Seller</h2>

        {isLoading || currentUserLoading ? (
          <p>Loading messages...</p>
        ) : (
          <div className="h-96 overflow-y-auto p-2 flex flex-col space-y-2">
            
            {messages
              .filter((msg: any) => msg.product === productId)
              .map((msg: any, index: number) => {
                const isSender = msg.sender === currentUser; // Check if the logged-in user is the sender

                return (
                  <div key={index} className={`flex ${isSender ? "justify-end" : "justify-start"} my-1`}>
                    <div
                      className={`px-4 py-2 rounded-3xl text-white max-w-xs md:max-w-md lg:max-w-lg 
                      ${isSender ? "bg-green-500 rounded-br-none" : "bg-green-700 rounded-bl-none"} shadow-md`}
                    >
                      <p>{msg.message}</p>
                      <p className="text-xs text-gray-300 mt-1 text-right">{formatTimestamp(msg.timestamp)}</p>
                    </div>
                  </div>
                );
              })}
              {showSelectionBox && <SelectionBox />}
          </div>
        )}

        {/* Message Input */}
        <div className="mt-4 flex items-center border rounded-lg overflow-hidden">
          <button
            className="bg-slate-300 text-black py-5 px-3"
            onClick={toggleSelectionBox}
          >
            ?
          </button>
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="flex-1 p-3 border-none outline-none text-black"
            placeholder="Type a message..."
          />
          <button
            className="bg-green-600 text-white px-4 py-5"
            onClick={sendMessage}
            disabled={sendMessageMutation.isPending}
          >
            {sendMessageMutation.isPending ? "..." : "➤"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatPage;
