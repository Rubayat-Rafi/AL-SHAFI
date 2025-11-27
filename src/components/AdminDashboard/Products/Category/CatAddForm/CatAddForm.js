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
  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onloadend = () => {
      setImage(reader.result);
      setPreview(reader.result);
    };
    reader.readAsDataURL(file);
  };
  const handleUrlChange = (e) => {
    const value = e.target.value || "";
    setUrlInput(value);
    setImage(value);
    setPreview(value || null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name) return toast.warning("Category name is required!");
    if (!image) return toast.warning("Category image is required!");

    setLoading(true);
    try {
      const payload = { name, image, status };
      const { data } = await axios.post("/pages/api/products/category", payload);
      if (data?.success) {
        toast.success(data?.message);
        setName("");
        setStatus(true);
        setImage("");
        setPreview(null);
        setUrlInput("");
        setInputType("upload");
        router.refresh();
        setAddFlag(false);
      } else {
        toast.warning(data?.message);
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
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Category Name
          </label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter category name"
            className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            required
          />
        </div>


        <div className="flex gap-6 items-center">
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="radio"
              name="imageType"
              value="upload"
              checked={inputType === "upload"}
              onChange={() => {
                setInputType("upload");
                setImage("");
                setPreview(null);
                setUrlInput("");
              }}
              className="h-4 w-4 text-blue-600"
            />
            Upload
          </label>
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="radio"
              name="imageType"
              value="url"
              checked={inputType === "url"}
              onChange={() => {
                setInputType("url");
                setImage("");
                setPreview(null);
                setUrlInput("");
              }}
              className="h-4 w-4 text-blue-600"
            />
            URL
          </label>
        </div>

   
        {inputType === "upload" ? (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Category Image
            </label>
            <input
              key={inputType} 
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="block w-full text-sm text-gray-600 border border-gray-300 rounded-lg p-2"
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
              className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        )}

        {preview && (
          <div className="mt-3">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Preview
            </label>
            <div className="w-32 h-32 relative border rounded-lg overflow-hidden">
              <Image src={preview} alt="Preview" fill className="object-cover" />
            </div>
          </div>
        )}


        <div className="flex items-center gap-3 mt-2">
          <input
            type="checkbox"
            checked={status}
            onChange={(e) => setStatus(e.target.checked)}
            className="h-5 w-5 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
          />
          <span className="text-gray-700 text-sm font-medium">Active</span>
        </div>


        <button
          type="submit"
          disabled={loading}
          className={`w-full py-3 px-4 rounded-lg text-white font-semibold transition-colors duration-200 ${
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
