"use client";

import { useParams, useSearchParams } from "next/navigation";
import { useState, useEffect, useCallback } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import io, { Socket } from "socket.io-client";
import { fetchMessages, sendMessageApi } from "@/services/user/message";
import { fetchUserProfile } from "@/services/user/profile";
import { useGlobalStore } from "@/store/store";
import SenderSelectionBox from "../selectionBoox";

interface Message {
  sender: string;
  message: string;
  timestamp: string;
  selectionBox: boolean;
  product: string;
}

const ChatPage = () => {
  const {
    showSelectionBox,
    toggleSelectionBox,
    transactionType,
    setuserOrDealer,
    setProductId,
  } = useGlobalStore();
  const { sellerId } = useParams();
  const searchParams = useSearchParams();
  const productId = searchParams.get("productId") ?? "";
  const from = searchParams.get("from") ?? "";

  const [message, setMessage] = useState("");
  const queryClient = useQueryClient();

  const { data, isLoading: currentUserLoading } = useQuery({
    queryKey: ["userProfile"],
    queryFn: fetchUserProfile,
  });

  useEffect(() => {
    if (from && productId) {
      setuserOrDealer(Number(from));
      setProductId(productId);
    }
  }, [from, productId, setProductId, setuserOrDealer]);

  const currentUser = data?.user._id;

  useEffect(() => {
    const newSocket: Socket = io("http://localhost:4001");

    newSocket.on("receiveMessage", (newMessage: Message) => {
      queryClient.setQueryData(["messages", sellerId], (oldMessages: Message[] = []) => [
        ...oldMessages,
        newMessage,
      ]);
    });

    return () => {
      newSocket.disconnect();
    };
  }, [sellerId, queryClient]);

  const { data: messages = [], isLoading } = useQuery<Message[]>({
    queryKey: ["messages", sellerId],
    queryFn: () => fetchMessages(sellerId as string),
  });

  const sendMessageMutation = useMutation({
    mutationFn: ({
      sellerId,
      message,
      productId,
      transactionType,
      selectionBox,
    }: {
      sellerId: string;
      message: string;
      productId: string;
      transactionType: string;
      selectionBox: boolean;
    }) => sendMessageApi(sellerId, message, productId, transactionType, selectionBox),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["messages", sellerId] });
    },
  });

  const formatTimestamp = (timestamp: string) => {
    return new Intl.DateTimeFormat("en-US", {
      hour: "numeric",
      minute: "numeric",
      hour12: true,
    }).format(new Date(timestamp));
  };

  const handleSelectionBox = () => {
    toggleSelectionBox();
  };

  const sendMessage = useCallback(
    (msg = message, withSelectionBox = false) => {
      if ((!withSelectionBox && msg.trim() === "") || !productId) return;

      sendMessageMutation.mutate({
        sellerId: sellerId as string,
        message: msg,
        productId,
        transactionType,
        selectionBox: withSelectionBox,
      });

      setMessage("");
    },
    [message, productId, sellerId, sendMessageMutation, transactionType]
  );

  useEffect(() => {
    if (showSelectionBox) {
      sendMessage("selection box", true);
    }
  }, [showSelectionBox, sendMessage]);

  const isSelectionBoxActive = messages.some(
    (msg: Message) => msg.selectionBox === true && msg.product === productId
  );

  return (
    <div className="min-h-screen bg-green-100 flex flex-col items-center py-6 pt-24">
      <div className="bg-white w-full max-w-lg p-6 rounded-lg shadow-lg">
        <h2 className="text-xl font-bold text-green-700 mb-4">
          {Number(from) === 1 ? "Chat with Seller" : "Chat with Customer"}
        </h2>
        {isLoading || currentUserLoading ? (
          <p>Loading messages...</p>
        ) : (
          <div className="h-96 overflow-y-auto p-2 flex flex-col space-y-2">
            {messages
              .filter((msg) => msg.product === productId)
              .map((msg, index) => {
                const isSender = msg.sender === currentUser;
                return msg.message === "selectionBox" ? null : (
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

            {(Number(from) === 2 && showSelectionBox) || (Number(from) === 1 && isSelectionBoxActive) ? (
              <SenderSelectionBox />
            ) : null}
          </div>
        )}

        <div className="mt-4 flex items-center border rounded-lg overflow-hidden">
          {Number(from) === 2 && (
            <button className="bg-slate-300 text-black py-5 px-3" onClick={handleSelectionBox}>
              ?
            </button>
          )}
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="flex-1 p-3 border-none outline-none text-black"
            placeholder="Type a message..."
          />
          <button
            className="bg-green-600 text-white px-4 py-5"
            onClick={() => sendMessage()}
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
