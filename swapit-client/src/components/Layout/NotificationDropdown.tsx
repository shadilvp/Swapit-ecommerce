"use client";
import { useState } from "react";
import { Bell } from "lucide-react";
import { getNotification, updateNotificationStatus } from "@/services/notification";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { fetchSpecificUser } from "@/services/users";
import { useRouter } from "next/navigation";

// Define types for notifications
interface NotificationType {
  _id: string;
  sender: string;
  message: string;
  status: "pending" | "approved" | "rejected";
  swappingProduct: { name: string; image: string; _id:string};
  selectedProduct: { name: string; image: string; _id:string };
}

// Define types for NotificationItem props
interface NotificationItemProps {
  notification: NotificationType;
  isExpanded: boolean;
  setExpandedId: (id: string | null) => void;
  updateStatusMutation: any;
}

const NotificationDropdown = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const queryClient = useQueryClient();

  // Fetch all notifications

  const { data: notifications, isLoading } = useQuery<NotificationType[]>({
    queryKey: ["userNotifications"],
    queryFn: getNotification,
  });


  // Mutation to update notification status
  const updateStatusMutation = useMutation({
    mutationFn: ({ notificationId, status }: { notificationId: string; status: "approved" | "rejected" }) =>
      updateNotificationStatus(notificationId, status),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["userNotifications"] });
    },
  });

  return (
    <div className="relative">
      {/* Bell Icon - Click to Toggle */}
      <Bell
        className="text-black hover:text-gray-600 cursor-pointer"
        size={24}
        onClick={() => setIsOpen(!isOpen)}
      />

      {/* Dropdown Menu */}
      {isOpen && (
        <div className="absolute right-0 mt-2 w-96 bg-white border rounded shadow-lg p-4">
          {isLoading ? (
            <p className="text-gray-500">Loading...</p>
          ) : (notifications ?? []).length > 0 ? (
            (notifications ?? []).map((notification) => (
              <NotificationItem
                key={notification._id}
                notification={notification}
                isExpanded={expandedId === notification._id}
                setExpandedId={setExpandedId}
                updateStatusMutation={updateStatusMutation}
              />
            ))
          ) : (
            <p className="text-gray-700">No new notifications</p>
          )}
        </div>
      )}
    </div>
  );
};

// Notification Item Component
const NotificationItem = ({ notification, isExpanded, setExpandedId, updateStatusMutation }: NotificationItemProps) => {
  const router = useRouter();
  const { data: fromUserData } = useQuery({
    queryKey: ["user", notification.sender],
    queryFn: () => fetchSpecificUser(notification.sender),
    enabled: !!notification.sender,
  });

  // Check if the notification contains both selectedProduct and swappingProduct
  const hasProducts = notification.selectedProduct && notification.swappingProduct;

  return (
    <div className="bg-gray-100 p-4 rounded-md mb-3 shadow">
      <div className="flex items-center justify-between">
        {/* User Details */}
        <div className="flex items-center gap-3">
          <img
            src={fromUserData?.profileImage || "/user.png"}
            alt="User Avatar"
            className="w-10 h-10 rounded-full border"
          />
          <div>
            <p className="font-semibold text-black">{fromUserData?.user?.name || "Unknown User"}</p>
            <p className="text-sm text-black">{notification.message}</p>             

            {/* Show 'See more...' only if both products exist */}
            {hasProducts && (
              <span
                className="text-xs text-gray-500 cursor-pointer"
                onClick={() => setExpandedId(isExpanded ? null : notification._id)}
              >
                See more...
              </span>
            )}
          </div>
        </div>

        {/* Action Buttons - Only show if both products exist */}
        <div className="flex gap-3">
          {/* Confirm and Reject buttons only when both products exist */}
          {hasProducts && (
            <>
              <button
                className="text-green-600 font-semibold hover:underline"
                onClick={() => updateStatusMutation.mutate({ notificationId: notification._id, status: "approved" })}
              >
                Confirm
              </button>
              <button
                className="text-yellow-600 font-semibold hover:underline"
                onClick={() => updateStatusMutation.mutate({ notificationId: notification._id, status: "rejected" })}
              >
                Reject
              </button>
            </>
          )}

          {/* Delete button should always be visible */}
          <button
            className="text-red-600 font-semibold hover:underline"
            onClick={() => updateStatusMutation.mutate({ notificationId: notification._id, status: "delete" })}
          >
            Delete
          </button>
        </div>
      </div>

      {/* Expanded Notification Details - Only show if both products exist */}
      {hasProducts && isExpanded && (
        <div className="mt-3 p-3 border rounded bg-white">
          <h3 className="font-semibold">Details</h3>
          <div className="flex justify-between mt-2">
            {/* Product Offered */}
            <div className="text-center">
              <img
                src={notification.swappingProduct.image}
                alt="Swapping Product"
                className="w-16 h-16 rounded border"
              />
              <p className="text-xs mt-1 text-black">{notification.swappingProduct.name}</p>
            </div>

            {/* Product Needed */}
            <div className="text-center">
              <img
                src={notification.selectedProduct.image}
                alt="Selected Product"
                className="w-16 h-16 rounded border"
                onClick={() => router.push(`/shop/${notification.selectedProduct._id}`)}
              />
              <p className="text-xs mt-1 text-black">{notification.selectedProduct.name}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};


export default NotificationDropdown;
