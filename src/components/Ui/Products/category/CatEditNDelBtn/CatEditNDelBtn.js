"use client";

import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "react-toastify";
import Image from "next/image";

const CatEditNDelBtn = ({ type, cat }) => {
  const router = useRouter();
  const category = typeof cat === "string" ? JSON.parse(cat) : cat;

  const [editFlag, setEditFlag] = useState(false);

  const [editName, setEditName] = useState(category?.name || "");
  const [editStatus, setEditStatus] = useState(
    typeof category?.status === "boolean" ? category.status : true
  );

  const [editImage, setEditImage] = useState(
    category?.image?.secure_url || ""
  ); // URL or base64

  const [preview, setPreview] = useState(
    category?.image?.secure_url || null
  );

  // ⭐ NEW: image alt text
  const [editImageAlt, setEditImageAlt] = useState(
    category?.image?.alt || category?.name || ""
  );

  const [loading, setLoading] = useState(false);
  const [inputType, setInputType] = useState(
    editImage ? "url" : "upload"
  );
  const [urlInput, setUrlInput] = useState(
    editImage && inputType === "url" ? editImage : ""
  );

  // -----------------------------
  // FILE HANDLING
  // -----------------------------
  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      const result = reader.result;
      setEditImage(result);
      setPreview(result);
    };
    reader.readAsDataURL(file);
  };

  // -----------------------------
  // URL HANDLING
  // -----------------------------
  const handleUrlChange = (e) => {
    const value = e.target.value || "";
    setUrlInput(value);
    setEditImage(value);
    setPreview(value || null);
  };

  // -----------------------------
  // DELETE HANDLER
  // -----------------------------
  const deleteHandler = async () => {
    if (!category?._id) return;

    if (!window.confirm("Are you sure you want to delete this category?"))
      return;

    setLoading(true);
    try {
      const { data } = await axios.delete(
        `/pages/api/products/category/${category._id}`
      );

      if (data?.success) {
        toast.success(data?.message);
        router.refresh();
      } else {
        toast.warning(data?.message);
      }
    } catch (error) {
      toast.error(error?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  // -----------------------------
  // EDIT HANDLER
  // -----------------------------
  const editHandler = async (e) => {
    e.preventDefault();

    if (!editName.trim()) {
      toast.warning("Name cannot be empty!");
      return;
    }

    if (!editImage) {
      toast.warning("Image is required!");
      return;
    }

    setLoading(true);

    try {
      const payload = {
        name: editName,
        status: editStatus,
        image: editImage,
        imageAlt: editImageAlt, // send alt to API
      };

      const { data } = await axios.patch(
        `/pages/api/products/category/${category._id}`,
        payload
      );

      if (data?.success) {
        toast.success(data?.message);
        setEditFlag(false);
        router.refresh();
      } else {
        toast.warning(data?.message);
      }
    } catch (error) {
      toast.error(error?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  // -----------------------------
  // BUTTON STYLES
  // -----------------------------
  const base =
    "px-4 py-1 text-sm font-medium rounded-md shadow-sm transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-1 disabled:opacity-50 disabled:cursor-not-allowed";

  const styles =
    type === "Delete"
      ? `${base} bg-red-600 text-white hover:bg-red-700 border border-red-700 focus:ring-red-500`
      : `${base} bg-green-600 text-white hover:bg-green-700 border border-green-700 focus:ring-green-500`;

  return (
    <div className="relative">
      <button
        onClick={type === "Delete" ? deleteHandler : () => setEditFlag(true)}
        className={styles}
        disabled={loading}
      >
        {loading && type === "Delete" ? "Processing..." : type}
      </button>

      {/* Edit Modal */}
      {type === "Edit" && editFlag && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4">
          <form
            onSubmit={editHandler}
            className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md relative"
          >
            <h3 className="text-lg font-semibold mb-4 text-gray-800">
              Edit Category
            </h3>

            {/* Name */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Name
              </label>
              <input
                type="text"
                value={editName}
                onChange={(e) => setEditName(e.target.value)}
                className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-green-500"
                required
              />
            </div>

            {/* Image Type Toggle */}
            <div className="flex gap-4 mb-2">
              <label className="flex items-center gap-1 cursor-pointer">
                <input
                  type="radio"
                  name="imageType"
                  value="upload"
                  checked={inputType === "upload"}
                  onChange={() => {
                    setInputType("upload");
                    setEditImage("");
                    setPreview(null);
                    setUrlInput("");
                  }}
                  className="h-4 w-4"
                />
                Upload
              </label>
              <label className="flex items-center gap-1 cursor-pointer">
                <input
                  type="radio"
                  name="imageType"
                  value="url"
                  checked={inputType === "url"}
                  onChange={() => {
                    setInputType("url");
                    setEditImage("");
                    setPreview(null);
                    setUrlInput("");
                  }}
                  className="h-4 w-4"
                />
                URL
              </label>
            </div>

            {/* Image Input */}
            {inputType === "upload" ? (
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Category Image
                </label>
                <input
                  key={inputType}
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  className="w-full text-sm text-gray-600"
                />
              </div>
            ) : (
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Image URL
                </label>
                <input
                  type="text"
                  value={urlInput}
                  onChange={handleUrlChange}
                  placeholder="Enter image URL"
                  className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-green-500"
                />
              </div>
            )}

            {/* Image Alt Text */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Image Alt Text
              </label>
              <input
                type="text"
                value={editImageAlt}
                onChange={(e) => setEditImageAlt(e.target.value)}
                placeholder="Describe the category image (for SEO & accessibility)"
                className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>

            {/* Preview */}
            {preview && (
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Preview
                </label>
                <Image
                  src={preview}
                  alt={editImageAlt || "Preview"}
                  width={500}
                  height={500}
                  className="w-32 h-32 object-cover rounded-md border"
                />
              </div>
            )}

            {/* Status */}
            <div className="flex items-center gap-2 mb-4">
              <input
                type="checkbox"
                checked={editStatus}
                onChange={(e) => setEditStatus(e.target.checked)}
                className="h-4 w-4 text-green-600 border-gray-300 rounded focus:ring-green-500"
              />
              <span className="text-gray-700 text-sm font-medium">Active</span>
            </div>
            {/* Buttons */}
            <div className="flex justify-between gap-3">
              <button
                type="submit"
                disabled={loading}
                className={`px-4 py-2 rounded-md text-white font-medium transition-all duration-200 ${
                  loading ? "bg-green-300" : "bg-green-600 hover:bg-green-700"
                }`}
              >
                {loading ? "Saving..." : "Save"}
              </button>
              <button
                type="button"
                onClick={() => setEditFlag(false)}
                className="px-4 py-2 rounded-md text-gray-700 bg-gray-200 hover:bg-gray-300 transition-all duration-200"
              >
                Cancel
              </button>
            </div>

            {/* Close Icon */}
            <button
              type="button"
              onClick={() => setEditFlag(false)}
              className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
            >
              ✕
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default CatEditNDelBtn;
