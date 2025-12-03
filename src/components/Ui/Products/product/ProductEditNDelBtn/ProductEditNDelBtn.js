"use client";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import Image from "next/image";
import RichTextEditor from "@/components/RichTextEditor/RichTextEditor";
import ConverterToHtml from "@/components/ConverterToHtml/ConverterToHtml";

const ProductEditNDelBtn = ({ type, product }) => {
  const router = useRouter();
  const prod = typeof product === "string" ? JSON.parse(product) : product;

  const [categories, setCategories] = useState([]);
  const [editFlag, setEditFlag] = useState(false);
  const [loading, setLoading] = useState(false);

  // EDIT INITIAL DATA
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
    seoTitle: prod?.seoTitle || "",
    seoDescription: prod?.seoDescription || "",
    seoKeywords: prod?.seoKeywords?.join(", ") || "",
    seoImage: prod?.seoImage || "",
  });

  const [descriptions, setDescriptions] = useState(prod?.descriptions || "");

  // Thumbnail states
  const [thumbnailType, setThumbnailType] = useState(
    editData.thumbnail ? "url" : "upload"
  );
  const [thumbnailPreview, setThumbnailPreview] = useState(
    editData.thumbnail || ""
  );

  // Image fields
  const [imageFields, setImageFields] = useState(
    editData.images.length > 0
      ? editData.images.map((img) => ({
          type: "url",
          value: img || "",
          preview: img || "",
        }))
      : [{ type: "upload", value: "", preview: "" }]
  );

  // Handle input
  const handleChange = (e) => {
    setEditData({ ...editData, [e.target.name]: e.target.value || "" });
  };

  // Thumbnail Upload
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

  // Handle Images
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

  // DELETE HANDLER
  const deleteHandler = async () => {
    if (!prod?._id) return;

    if (!window.confirm("Are you sure you want to delete this product?")) return;

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

  // EDIT HANDLER
  const editHandler = async (e) => {
    e.preventDefault();

    if (!editData.productName.trim())
      return toast.warning("Product name is required!");

    if (!editData.thumbnail)
      return toast.warning("Thumbnail is required!");

    if (!descriptions.trim())
      return toast.warning("Description is required!");

    setLoading(true);

    try {
      const payload = {
        ...editData,
        descriptions,
        seoKeywords: editData.seoKeywords
          .split(",")
          .map((k) => k.trim())
          .filter((k) => k.length > 0),
      };

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

  // FETCH CATEGORIES
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const { data } = await axios.get("/pages/api/products/category", {
          headers: { "x-request-source": "12Hirock@" },
        });

        if (data?.success) {
          setCategories(data.categories.filter((cat) => cat.status));
        }
      } catch (error) {
        toast.error("Failed to load categories");
      }
    };

    fetchCategories();
  }, []);

  const baseBtn = "px-4 py-1 text-sm font-medium rounded-md shadow-sm transition-all";
  const styles =
    type === "Delete"
      ? `${baseBtn} bg-red-600 text-white hover:bg-red-700`
      : `${baseBtn} bg-green-600 text-white hover:bg-green-700`;

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
            <h3 className="text-lg font-semibold">Edit Product</h3>

            {/* Product Name */}
            <input
              type="text"
              name="productName"
              value={editData.productName}
              onChange={handleChange}
              placeholder="Product Name"
              className="w-full p-2 border rounded"
              required
            />

            {/* Category */}
            <select
              name="category"
              value={editData.category}
              onChange={handleChange}
              className="w-full p-2 border rounded"
            >
              <option value="">Select Category</option>
              {categories.map((cat) => (
                <option key={cat._id} value={cat.slug}>
                  {cat.name}
                </option>
              ))}
            </select>

            {/* Thumbnail */}
            <div>
              <label className="font-medium">Thumbnail</label>
              <div className="flex gap-3 mt-1">
                <label>
                  <input
                    type="radio"
                    checked={thumbnailType === "upload"}
                    onChange={() => {
                      setThumbnailType("upload");
                      setEditData((prev) => ({ ...prev, thumbnail: "" }));
                      setThumbnailPreview("");
                    }}
                  />
                  Upload
                </label>

                <label>
                  <input
                    type="radio"
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
                  type="file"
                  accept="image/*"
                  onChange={(e) =>
                    handleThumbnailUpload(e.target.files[0])
                  }
                  className="w-full mt-2"
                />
              ) : (
                <input
                  type="text"
                  value={editData.thumbnail}
                  onChange={(e) => handleThumbnailUrl(e.target.value)}
                  placeholder="Thumbnail URL"
                  className="w-full p-2 border rounded mt-2"
                />
              )}

              {thumbnailPreview && (
                <Image
                  src={thumbnailPreview}
                  alt="Thumbnail"
                  width={200}
                  height={200}
                  className="mt-2 rounded border"
                />
              )}
            </div>

            {/* Images */}
            <div>
              <label className="font-medium">Additional Images</label>

              {imageFields.map((img, i) => (
                <div key={i} className="mt-2 p-2 border rounded">
                  <div className="flex gap-2">
                    <label>
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

                    <label>
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
                      type="file"
                      accept="image/*"
                      onChange={(e) =>
                        handleImageChange(i, "upload", e.target.files[0])
                      }
                      className="w-full mt-2"
                    />
                  ) : (
                    <input
                      type="text"
                      value={img.value}
                      onChange={(e) =>
                        handleImageChange(i, "url", e.target.value)
                      }
                      placeholder="Image URL"
                      className="w-full p-2 border rounded mt-2"
                    />
                  )}

                  {img.preview && (
                    <Image
                      src={img.preview}
                      alt="Preview"
                      width={80}
                      height={80}
                      className="mt-2 rounded border"
                    />
                  )}

                  {imageFields.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeImageField(i)}
                      className="text-red-600 text-xs mt-1"
                    >
                      Remove
                    </button>
                  )}
                </div>
              ))}

              <button
                type="button"
                onClick={addImageField}
                className="bg-green-600 text-white py-1 px-3 rounded mt-3"
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
                value={editData.offerPrice}
                onChange={handleChange}
                className="w-1/2 p-2 border rounded"
              />
              <input
                type="number"
                name="regularPrice"
                placeholder="Regular Price"
                value={editData.regularPrice}
                onChange={handleChange}
                className="w-1/2 p-2 border rounded"
              />
            </div>

            {/* Description */}
            <div>
              <label className="font-medium">Product Description</label>
              <RichTextEditor
                value={descriptions}
                onChange={setDescriptions}
                placeholder="Type full product description…"
              />

              <div className="mt-2 border rounded p-2 bg-gray-50">
                <p className="text-xs text-gray-500 mb-1">Preview:</p>
                <ConverterToHtml
                  html={descriptions}
                  className="prose max-w-none text-sm"
                />
              </div>
            </div>

            {/* Stock */}
            <input
              type="number"
              name="stock"
              value={editData.stock}
              onChange={handleChange}
              className="w-full p-2 border rounded"
              placeholder="Stock"
            />

            {/* Status */}
            <select
              name="status"
              value={editData.status}
              onChange={handleChange}
              className="w-full p-2 border rounded"
            >
              <option value="regular">Regular</option>
              <option value="onSale">On Sale</option>
              <option value="new">New</option>
            </select>

            {/* Shipping */}
            <select
              name="shipping_fee"
              value={editData.shipping_fee}
              onChange={handleChange}
              className="w-full p-2 border rounded"
            >
              <option value="free">Free</option>
              <option value="paid">Paid</option>
            </select>

            {/* SEO */}
            <div className="border-t pt-3">
              <h4 className="font-semibold text-gray-800 mb-2">
                SEO Settings
              </h4>

              <input
                type="text"
                name="seoTitle"
                value={editData.seoTitle}
                onChange={handleChange}
                placeholder="SEO Title"
                className="w-full p-2 border rounded mb-2"
              />

              <textarea
                name="seoDescription"
                value={editData.seoDescription}
                onChange={handleChange}
                placeholder="SEO Description"
                className="w-full p-2 border rounded mb-2"
                rows={3}
              />

              <input
                type="text"
                name="seoKeywords"
                value={editData.seoKeywords}
                onChange={handleChange}
                placeholder="SEO Keywords (comma separated)"
                className="w-full p-2 border rounded mb-2"
              />

              <input
                type="text"
                name="seoImage"
                value={editData.seoImage}
                onChange={handleChange}
                placeholder="SEO Image URL"
                className="w-full p-2 border rounded"
              />
            </div>

            {/* Buttons */}
            <div className="flex justify-between mt-4">
              <button
                type="submit"
                disabled={loading}
                className={`px-4 py-2 rounded text-white ${
                  loading ? "bg-gray-400" : "bg-green-600"
                }`}
              >
                {loading ? "Saving…" : "Save"}
              </button>

              <button
                type="button"
                onClick={() => setEditFlag(false)}
                className="px-4 py-2 rounded bg-gray-200 hover:bg-gray-300"
              >
                Cancel
              </button>
            </div>

            <button
              type="button"
              onClick={() => setEditFlag(false)}
              className="absolute top-3 right-3 text-gray-500 text-xl"
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
