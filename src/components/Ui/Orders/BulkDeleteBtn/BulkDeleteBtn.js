"use client";
import { TrashIcon } from "@heroicons/react/24/outline";
import axios from "axios";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { useState } from "react";

const BulkDeleteBtn = () => {
  const router = useRouter();
  const { orderBulkIds } = useSelector((state) => state?.slice);
  const [loading, setLoading] = useState(false);

  const bulkdeleteHandler = async () => {
    try {
      setLoading(true);

      const { data } = await axios.post(
        `/pages/api/orders/bulk_delete`,
        orderBulkIds
      );

      if (data?.success) {
        toast.success(data?.message);
        router.refresh();
      } else {
        toast.warning(data?.message);
        router.refresh();
      }
    } catch (error) {
      toast.error(error?.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      {orderBulkIds?.length === 0 ? (
        "Mark"
      ) : (
        <button
          onClick={bulkdeleteHandler}
          disabled={loading}
          className="flex items-center justify-center p-2 rounded disabled:opacity-50"
        >
          {loading ? (
            // 🔵 Tailwind Loader
            <svg
              className="h-5 w-5 animate-spin"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              ></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
              ></path>
            </svg>
          ) : (
            <TrashIcon className="h-5 w-5 text-red-600" />
          )}
        </button>
      )}
    </div>
  );
};

export default BulkDeleteBtn;
