"use client";
import { useState } from "react";
import { Bell } from "lucide-react";
import {
  getNotification,
  updateNotificationStatus,
} from "@/services/notification";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { fetchSpecificUser } from "@/services/users";
import { usePathname, useRouter } from "next/navigation";
import Image from "next/image";
import { UseMutationResult } from "@tanstack/react-query";

interface NotificationType {
  _id: string;
  sender: string;
  message: string;
  status: "pending" | "approved" | "rejected";
  swappingProduct: { name: string; image: string; _id: string };
  selectedProduct: { name: string; image: string; _id: string };
}

const NotificationDropdown = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const queryClient = useQueryClient();
  const pathName = usePathname();

  const { data: notifications, isLoading } = useQuery<NotificationType[]>({
    queryKey: ["userNotifications"],
    queryFn: getNotification,
  });

  const unreadCount = (notifications ?? []).filter(
    (n) => n.status === "pending"
  ).length;

  const updateStatusMutation = useMutation({
    mutationFn: ({
      notificationId,
      status,
    }: {
      notificationId: string;
      status: "approved" | "rejected" | "delete";
    }) => updateNotificationStatus(notificationId, status),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["userNotifications"] });
    },
  });

  const isHomePage = pathName === "/";

  return (
    <div className="relative">
      {/* Bell Icon - Click to Toggle */}
      <div className="relative inline-block" onClick={() => setIsOpen(!isOpen)}>
        <Bell
          className={`${
            isHomePage
              ? "text-white hover:text-gray-300 mt-3"
              : "text-black hover:text-gray-600 mt-3"
          } cursor-pointer`}
          size={24}
        />
        {unreadCount > 0 && (
          <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold px-1.5 py-0.5 rounded-full">
            {unreadCount}
          </span>
        )}
      </div>

      {/* Dropdown Menu */}
      {isOpen && (
        <div className="absolute right-0 mt-2 w-96 bg-white border rounded shadow-lg p-4 max-h-80 overflow-y-auto">
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

const NotificationItem = ({
  notification,
  isExpanded,
  setExpandedId,
  updateStatusMutation,
}: {
  notification: NotificationType;
  isExpanded: boolean;
  setExpandedId: (id: string | null) => void;
  updateStatusMutation: UseMutationResult<
    void, // or the actual return type of `updateNotificationStatus` if it's not void
    unknown, // or a specific error type, e.g., AxiosError
    {
      notificationId: string;
      status: "approved" | "rejected" | "delete";
    }
  >;
}) => {
  const router = useRouter();
  const { data: fromUserData } = useQuery({
    queryKey: ["user", notification.sender],
    queryFn: () => fetchSpecificUser(notification.sender),
    enabled: !!notification.sender,
  });
  const hasProducts =
    notification.selectedProduct && notification.swappingProduct;

  return (
    <div className="bg-gray-100 p-4 rounded-md mb-3 shadow">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Image
            src={fromUserData?.profileImage || "/user.png"}
            alt="User Avatar"
            fill
            className="object-cover"
          />
          <div>
            <p className="font-semibold text-black">
              {fromUserData?.user?.name || "Unknown User"}
            </p>
            <p className="text-sm text-black">{notification.message}</p>
            <button>chat</button>
            {hasProducts && (
              <span
                className="text-xs text-gray-500 cursor-pointer"
                onClick={() =>
                  setExpandedId(isExpanded ? null : notification._id)
                }
              >
                See more...
              </span>
            )}
          </div>
        </div>
        <div className="flex gap-3">
          {hasProducts && (
            <>
              <button
                className="text-green-600 font-semibold hover:underline"
                disabled={updateStatusMutation.isPending}
                onClick={() =>
                  updateStatusMutation.mutate({
                    notificationId: notification._id,
                    status: "approved",
                  })
                }
              >
                {updateStatusMutation.isPending ? "Loading..." : "Confirm"}
              </button>
              <button
                className="text-yellow-600 font-semibold hover:underline"
                disabled={updateStatusMutation.isPending}
                onClick={() =>
                  updateStatusMutation.mutate({
                    notificationId: notification._id,
                    status: "rejected",
                  })
                }
              >
                {updateStatusMutation.isPending ? "Loading..." : "Reject"}
              </button>
            </>
          )}
          <button
            className="text-red-600 font-semibold hover:underline"
            disabled={updateStatusMutation.isPending}
            onClick={() =>
              updateStatusMutation.mutate({
                notificationId: notification._id,
                status: "delete",
              })
            }
          >
            {updateStatusMutation.isPending ? "Loading..." : "Delete"}
          </button>
        </div>
      </div>
      {hasProducts && isExpanded && (
        <div className="mt-3 p-3 border rounded bg-white">
          <h3 className="font-semibold">Details</h3>
          <div className="flex justify-between mt-2">
            <div className="text-center">
              <Image
                src={notification.swappingProduct.image}
                alt="Swapping Product"
                width={64}
                height={64}
                className="rounded border object-cover"
              />
              <p className="text-xs mt-1 text-black">
                {notification.swappingProduct.name}
              </p>
            </div>
            <div className="text-center">
              <Image
                src={notification.selectedProduct.image}
                alt="Selected Product"
                width={64}
                height={64}
                className="rounded border cursor-pointer object-cover"
                onClick={() =>
                  router.push(`/shop/${notification.selectedProduct._id}`)
                }
              />
              <p className="text-xs mt-1 text-black">
                {notification.selectedProduct.name}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default NotificationDropdown;
