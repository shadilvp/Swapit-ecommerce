"use client";

import { fetchAllMessages } from "@/services/user/message";
import { fetchUserProfile } from "@/services/user/profile";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";

const Messages = () => {
  const { data, isLoading: userLoading } = useQuery({
    queryKey: ["userProfile"],
    queryFn: fetchUserProfile,
  });

  const { data: messages = [], isLoading: messagesLoading } = useQuery({
    queryKey: ["allMessages"],
    queryFn: fetchAllMessages,
  });
  console.log(messages)

  const userId = data?.user._id;
  if (userLoading || messagesLoading) return <p>Loading...</p>;

  // Filter messages where the logged-in user is the receiver
  const receivedMessages = messages.filter((msg: any) => msg.receiver._id === userId);

  // Group messages by sender ID and product ID
  const groupedMessages: { [key: string]: any } = {};

  receivedMessages.forEach((msg: any) => {
    if (!groupedMessages[msg.product._id]) {
      groupedMessages[msg.product._id] = msg;
    }
  });

  const firstMessages = Object.values(groupedMessages);

  const num = 2;
  return (
    <div className="min-h-screen bg-gray-100 p-6 flex justify-center items-center">
      <div className="w-full max-w-md">
        <h2 className="text-xl font-bold text-green-700 mb-4 text-center">Messages</h2>

{firstMessages.map((msg: any) => (
  <Link
    key={msg.product._id}
    href={`/chat/${msg.sender._id}?productId=${msg.product._id}&from=${num}`}
  >
    <div className="bg-white p-4 rounded-lg shadow-lg flex justify-between items-center cursor-pointer hover:bg-green-50 m-4 hover:scale-105">
      <div>
        <p className="font-semibold text-green-700">Product: {msg.product.name}</p>
        <p className="font-semibold text-green-700">Sender: {msg.sender.name}</p>
        <p className="text-gray-500 text-sm truncate w-48">{msg.message}</p>
      </div>
      <span className="text-xs text-gray-400">
        {new Date(msg.timestamp).toLocaleTimeString()}
      </span>
    </div>
  </Link>
))}

      </div>
    </div>
  );
};

export default Messages;
