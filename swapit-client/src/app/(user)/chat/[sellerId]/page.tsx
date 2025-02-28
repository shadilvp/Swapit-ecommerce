"use client";

import { useParams } from "next/navigation";
import { useState, useEffect } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import io from "socket.io-client";
import { fetchMessages,sendMessageApi } from "@/services/user/message"; 

const socket = io("http://localhost:4001");

interface Message {
  sender: string;
  receiver: any;
  message: string;
  createdAt?: string;
}

const ChatPage = () => {
  const { sellerId } = useParams();
  const [message, setMessage] = useState("");
  const queryClient = useQueryClient();

  // Fetch messages using React Query
  const { data: messages = [], isLoading } = useQuery<Message[]>({
    queryKey: ["messages", sellerId],
    queryFn: () => fetchMessages(sellerId as string),
  });

  // Send message mutation
  const sendMessageMutation = useMutation({
    mutationFn: ({ sellerId, message }: { sellerId: string; message: string }) =>
      sendMessageApi(sellerId, message),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["messages", sellerId] }); // Refresh messages after sending
    },
  });

  // Listen for incoming messages via Socket.io
  useEffect(() => {
    socket.on("receiveMessage", (newMessage: Message) => {
      queryClient.setQueryData(["messages", sellerId], (oldMessages: Message[] = []) => [
        ...oldMessages,
        newMessage,
      ]);
    });

    return () => {
      socket.off("receiveMessage");
    };
  }, [sellerId, queryClient]);

  // Send Message Handler
  const sendMessage = () => {
    if (message.trim() === "") return;
    sendMessageMutation.mutate({ sellerId: sellerId as string, message });
    setMessage("");
  };

  return (
    <div className="min-h-screen p-6 bg-gray-100 flex flex-col items-center">
      <div className="bg-white w-full max-w-lg p-6 rounded-lg shadow-lg">
        <h2 className="text-xl font-bold mb-4">Chat with Seller</h2>

        {isLoading ? (
          <p>Loading messages...</p>
        ) : (
          <div className="h-80 overflow-y-auto border p-2 rounded-md">
 <div className="h-80 overflow-y-auto border p-2 rounded-md">
  {messages.map((msg, index) => (
    <div key={index} className={`p-2 my-1 ${msg.sender === "me" ? "text-right" : "text-left"}`}>
      <p className={`inline-block px-3 py-2 rounded-lg ${msg.sender === "me" ? "bg-gray-200" : "bg-blue-500 text-white"}`}>
        {msg.message}
      </p>
    </div>
  ))}
</div>

          </div>
        )}

        <div className="mt-4 flex">
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="flex-1 p-2 border rounded-l-md"
            placeholder="Type a message..."
          />
          <button
            className="bg-blue-500 text-white px-4 rounded-r-md"
            onClick={sendMessage}
            disabled={sendMessageMutation.isPending}
          >
            {sendMessageMutation.isPending ? "Sending..." : "Send"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatPage;
