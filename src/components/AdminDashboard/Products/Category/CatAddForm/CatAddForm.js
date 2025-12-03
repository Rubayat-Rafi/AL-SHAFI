"use client";

import Image from "next/image";
import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

const CatAddForm = ({ setAddFlag }) => {
  const router = useRouter();

  const [name, setName] = useState("");
  const [status, setStatus] = useState(true);
  const [image, setImage] = useState("");
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [inputType, setInputType] = useState("upload");
  const [urlInput, setUrlInput] = useState("");
  const [imageAlt, setImageAlt] = useState("");   
  const [resetKey, setResetKey] = useState(Date.now());

  // -----------------------------
  // FILE HANDLING
  // -----------------------------
  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      const result = reader.result;
      setImage(result);
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
    setImage(value);
    setPreview(value || null);
  };

  // -----------------------------
  // SUBMIT DATA
  // -----------------------------
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name.trim()) {
      toast.warning("Category name is required!");
      return;
    }

    if (!image) {
      toast.warning("Category image is required!");
      return;
    }

    setLoading(true);

    try {
      const payload = {
        name,
        image,
        status,
        imageAlt: imageAlt || name, 
      };

      const { data } = await axios.post(
        "/pages/api/products/category",
        payload
      );

      if (data?.success) {
        toast.success(data.message);

        // reset
        setName("");
        setStatus(true);
        setImage("");
        setPreview(null);
        setUrlInput("");
        setImageAlt("");              
        setInputType("upload");
        setResetKey(Date.now());

        router.refresh();
        setAddFlag(false);
      } else {
        toast.warning(data.message);
      }
    } catch (err) {
      toast.error(err?.message || "Something went wrong!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative max-w-md mx-auto bg-white p-6 rounded-xl shadow-lg border border-gray-200">
      <button
        onClick={() => setAddFlag(false)}
        className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 transition"
      >
        ✕
      </button>

      <h2 className="text-2xl font-semibold text-gray-800 mb-6 text-center">
        Add New Category
      </h2>

      <form onSubmit={handleSubmit} className="space-y-5">
        {/* Category Name */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Category Name
          </label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter category name"
            className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        {/* Upload vs URL */}
        <div className="flex gap-6 items-center">
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="radio"
              value="upload"
              checked={inputType === "upload"}
              onChange={() => {
                setInputType("upload");
                setImage("");
                setPreview(null);
                setUrlInput("");
                setResetKey(Date.now());
              }}
            />
            Upload
          </label>

          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="radio"
              value="url"
              checked={inputType === "url"}
              onChange={() => {
                setInputType("url");
                setImage("");
                setPreview(null);
                setUrlInput("");
                setResetKey(Date.now());
              }}
            />
            URL
          </label>
        </div>

        {/* Image Input */}
        {inputType === "upload" ? (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Category Image
            </label>
            <input
              key={resetKey}
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="w-full text-sm border border-gray-300 rounded-lg p-2"
            />
          </div>
        ) : (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Image URL
            </label>
            <input
              type="text"
              value={urlInput}
              onChange={handleUrlChange}
              placeholder="Enter image URL"
              className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-500"
            />
          </div>
        )}

        {/* Preview + Alt */}
        {preview && (
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Preview
            </label>
            <div className="w-32 h-32 relative border rounded-lg overflow-hidden">
              <Image
                src={preview}
                alt={imageAlt || name || "Category preview"}
                fill
                className="object-cover"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Image Alt Text
              </label>
              <input
                type="text"
                value={imageAlt}
                onChange={(e) => setImageAlt(e.target.value)}
                placeholder="Describe this image (for SEO & accessibility)"
                className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
        )}

        {/* Status */}
        <div className="flex items-center gap-3 mt-2">
          <input
            type="checkbox"
            checked={status}
            onChange={(e) => setStatus(e.target.checked)}
          />
          <span className="text-gray-700">Active</span>
        </div>

        {/* Submit */}
        <button
          type="submit"
          disabled={loading}
          className={`w-full py-3 px-4 rounded-lg text-white font-semibold transition ${
            loading ? "bg-blue-300" : "bg-blue-600 hover:bg-blue-700"
          }`}
        >
          {loading ? "Saving..." : "Add Category"}
        </button>
      </form>
    </div>
  );
};

export default CatAddForm;
