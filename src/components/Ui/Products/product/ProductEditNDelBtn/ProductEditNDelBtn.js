"use client";

import axios from "axios";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import Image from "next/image";

const ProductEditNDelBtn = ({ type, product }) => {
  const router = useRouter();
  const prod = typeof product === "string" ? JSON.parse(product) : product;

  const [categories, setCategories] = useState([]);
  const [editFlag, setEditFlag] = useState(false);
  const [loading, setLoading] = useState(false);

  const [editData, setEditData] = useState({
    productName: prod?.productName || "",
    category: prod?.category || "",
    thumbnail: prod?.thumbnail?.secure_url || "",
    images: prod?.images?.map((img) => img.secure_url) || [],
    offerPrice: prod?.offerPrice || "",
    regularPrice: prod?.regularPrice || "",
    descriptions: prod?.descriptions || "",
    stock: prod?.stock ?? 0,
    status: prod?.status || "regular",
    shipping_fee: prod?.shipping_fee || "free",
  });

  const [thumbnailType, setThumbnailType] = useState(
    editData.thumbnail ? "url" : "upload"
  );
  const [thumbnailPreview, setThumbnailPreview] = useState(
    editData.thumbnail || ""
  );

  const [imageFields, setImageFields] = useState(
    editData.images.length > 0
      ? editData.images.map((img) => ({
          type: "url",
          value: img || "",
          preview: img || "",
        }))
      : [{ type: "upload", value: "", preview: "" }]
  );

  // ----------------------------- HANDLE FORM CHANGE -----------------------------
  const handleChange = (e) => {
    setEditData({ ...editData, [e.target.name]: e.target.value || "" });
  };

  // ----------------------------- THUMBNAIL HANDLERS -----------------------------
  const handleThumbnailUpload = (file) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      const result = reader.result || "";
      setEditData((prev) => ({ ...prev, thumbnail: result }));
      setThumbnailPreview(result);
    };
    reader.readAsDataURL(file);
  };

  const handleThumbnailUrl = (url) => {
    setEditData((prev) => ({ ...prev, thumbnail: url || "" }));
    setThumbnailPreview(url || "");
  };

  // ----------------------------- ADDITIONAL IMAGES HANDLERS -----------------------------
  const handleImageChange = (index, type, value) => {
    const fields = [...imageFields];
    if (type === "upload") {
      const reader = new FileReader();
      reader.onloadend = () => {
        const result = reader.result || "";
        fields[index] = { ...fields[index], value: result, preview: result };
        setImageFields(fields);
        setEditData((prev) => ({
          ...prev,
          images: fields.map((f) => f.value).filter(Boolean),
        }));
      };
      reader.readAsDataURL(value);
    } else {
      fields[index] = {
        ...fields[index],
        value: value || "",
        preview: value || "",
      };
      setImageFields(fields);
      setEditData((prev) => ({
        ...prev,
        images: fields.map((f) => f.value).filter(Boolean),
      }));
    }
  };

  const addImageField = () => {
    setImageFields([
      ...imageFields,
      { type: "upload", value: "", preview: "" },
    ]);
  };

  const removeImageField = (index) => {
    const fields = imageFields.filter((_, i) => i !== index);
    setImageFields(fields);
    setEditData((prev) => ({
      ...prev,
      images: fields.map((f) => f.value).filter(Boolean),
    }));
  };

  // ----------------------------- DELETE HANDLER -----------------------------
  const deleteHandler = async () => {
    if (!prod?._id) return;
    if (!window.confirm("Are you sure you want to delete this product?"))
      return;

    setLoading(true);
    try {
      const { data } = await axios.delete(
        `/pages/api/products/product/${prod._id}`
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

  // ----------------------------- EDIT HANDLER -----------------------------
  const editHandler = async (e) => {
    e.preventDefault();
    if (!editData.productName.trim())
      return toast.warning("Product name is required!");
    if (!editData.thumbnail) return toast.warning("Thumbnail is required!");

    setLoading(true);
    try {
      const payload = { ...editData };
      const { data } = await axios.patch(
        `/pages/api/products/product/${prod._id}`,
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

  // ----------------------------- FETCH CATEGORIES -----------------------------
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const { data } = await axios.get("/pages/api/products/category");
        if (data?.success) {
          setCategories(data.categories.filter((cat) => cat.status));
        }
      } catch (error) {
        toast.error("Failed to load categories");
      }
    };
    fetchCategories();
  }, []);

  const baseBtn =
    "px-4 py-1 text-sm font-medium rounded-md shadow-sm transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-1 disabled:opacity-50 disabled:cursor-not-allowed";
  const styles =
    type === "Delete"
      ? `${baseBtn} bg-red-600 text-white hover:bg-red-700 border border-red-700 focus:ring-red-500`
      : `${baseBtn} bg-green-600 text-white hover:bg-green-700 border border-green-700 focus:ring-green-500`;

  return (
    <div>
      <button
        onClick={type === "Delete" ? deleteHandler : () => setEditFlag(true)}
        className={styles}
        disabled={loading}
      >
        {loading && type === "Delete" ? "Processing..." : type}
      </button>

      {type === "Edit" && editFlag && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4">
          <form
            onSubmit={editHandler}
            className="bg-white rounded-lg shadow-lg p-6 w-full max-w-lg relative space-y-4 overflow-y-auto max-h-screen"
          >
            <h3 className="text-lg font-semibold text-gray-800">
              Edit Product
            </h3>

            {/* Product Name */}
            <input
              type="text"
              name="productName"
              placeholder="Product Name"
              value={editData.productName || ""}
              onChange={handleChange}
              className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
              required
            />

            {/* Category */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Category
              </label>
              <select
                name="category"
                value={editData.category}
                onChange={handleChange}
                className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
              >
                <option value="">Select Category</option>
                {categories.map((cat) => (
                  <option key={cat._id} value={cat.slug}>
                    {cat.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Thumbnail */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Thumbnail
              </label>
              <div className="flex gap-2 mb-2">
                <label className="flex items-center gap-1 cursor-pointer">
                  <input
                    type="radio"
                    value="upload"
                    checked={thumbnailType === "upload"}
                    onChange={() => {
                      setThumbnailType("upload");
                      setEditData((prev) => ({ ...prev, thumbnail: "" }));
                      setThumbnailPreview("");
                    }}
                  />
                  Upload
                </label>
                <label className="flex items-center gap-1 cursor-pointer">
                  <input
                    type="radio"
                    value="url"
                    checked={thumbnailType === "url"}
                    onChange={() => {
                      setThumbnailType("url");
                      setEditData((prev) => ({ ...prev, thumbnail: "" }));
                      setThumbnailPreview("");
                    }}
                  />
                  URL
                </label>
              </div>

              {thumbnailType === "upload" ? (
                <input
                  key="thumbnail-upload"
                  type="file"
                  accept="image/*"
                  onChange={(e) => handleThumbnailUpload(e.target.files[0])}
                  className="w-full text-sm text-gray-600"
                />
              ) : (
                <input
                  key="thumbnail-url"
                  type="text"
                  value={editData.thumbnail || ""}
                  onChange={(e) => handleThumbnailUrl(e.target.value)}
                  placeholder="Thumbnail URL"
                  className="w-full border p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                />
              )}

              {thumbnailPreview && (
                <Image
                  src={thumbnailPreview}
                  alt="Thumbnail Preview"
                  width={200}
                  height={200}
                  className="mt-2 rounded-md border object-cover"
                />
              )}
            </div>

            {/* Additional Images */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Additional Images
              </label>
              {imageFields.map((img, i) => (
                <div
                  key={`${i}-${img.type}`}
                  className="mb-2 border p-2 rounded space-y-1"
                >
                  <div className="flex gap-2">
                    <label className="flex items-center gap-1">
                      <input
                        type="radio"
                        checked={img.type === "upload"}
                        onChange={() => {
                          const fields = [...imageFields];
                          fields[i] = {
                            type: "upload",
                            value: "",
                            preview: "",
                          };
                          setImageFields(fields);
                        }}
                      />
                      Upload
                    </label>
                    <label className="flex items-center gap-1">
                      <input
                        type="radio"
                        checked={img.type === "url"}
                        onChange={() => {
                          const fields = [...imageFields];
                          fields[i] = { type: "url", value: "", preview: "" };
                          setImageFields(fields);
                        }}
                      />
                      URL
                    </label>
                  </div>

                  {img.type === "upload" ? (
                    <input
                      key={`upload-${i}`}
                      type="file"
                      accept="image/*"
                      onChange={(e) =>
                        handleImageChange(i, "upload", e.target.files[0])
                      }
                      className="w-full p-1 border rounded"
                    />
                  ) : (
                    <input
                      key={`url-${i}`}
                      type="text"
                      placeholder="Image URL"
                      value={img.value || ""}
                      onChange={(e) =>
                        handleImageChange(i, "url", e.target.value)
                      }
                      className="w-full p-1 border rounded"
                    />
                  )}

                  {img.preview && (
                    <Image
                      src={img.preview}
                      alt={`Image ${i + 1}`}
                      width={80}
                      height={80}
                      className="mt-1 rounded-md border object-cover"
                    />
                  )}

                  {imageFields.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeImageField(i)}
                      className="text-red-600 text-xs hover:underline"
                    >
                      Remove
                    </button>
                  )}
                </div>
              ))}

              <button
                type="button"
                onClick={addImageField}
                className="py-1 px-3 bg-green-600 text-white rounded hover:bg-green-700"
              >
                Add Image
              </button>
            </div>

            {/* Prices */}
            <div className="flex gap-2">
              <input
                type="number"
                name="offerPrice"
                placeholder="Offer Price"
                value={editData.offerPrice || ""}
                onChange={handleChange}
                className="w-1/2 p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
              />
              <input
                type="number"
                name="regularPrice"
                placeholder="Regular Price"
                value={editData.regularPrice || ""}
                onChange={handleChange}
                className="w-1/2 p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>

            {/* Product Description */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Product Description
              </label>
              <textarea
                name="descriptions"
                value={editData.descriptions}
                onChange={handleChange}
                rows={4}
                placeholder="Enter full product description..."
                className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
              ></textarea>
            </div>

            {/* Stock */}
            <input
              type="number"
              name="stock"
              placeholder="Stock"
              value={editData.stock ?? 0}
              onChange={handleChange}
              className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
            />

            {/* Status */}
            <select
              name="status"
              value={editData.status || "regular"}
              onChange={handleChange}
              className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
            >
              <option value="regular">Regular</option>
              <option value="onSale">On Sale</option>
              <option value="new">New</option>
            </select>

            {/* Shipping Fee */}
            <select
              name="shipping_fee"
              value={editData.shipping_fee || "free"}
              onChange={handleChange}
              className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
            >
              <option value="free">Free</option>
              <option value="paid">Paid</option>
            </select>

            {/* Buttons */}
            <div className="flex justify-between gap-2 mt-3">
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
                className="px-4 py-2 rounded-md text-gray-700 bg-gray-200 hover:bg-gray-300"
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

export default ProductEditNDelBtn;
