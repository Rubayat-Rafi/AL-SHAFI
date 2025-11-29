"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import Image from "next/image";
import { useRouter } from "next/navigation";

const AddProduct = ({ setAddFlag }) => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    productName: "",
    thumbnail: "",
    category: "",
    images: [],
    offerPrice: "",
    regularPrice: "",
    descriptions: "",
    stock: 0,
    status: "regular",
    shipping_fee: "free",
  });

  const [thumbnailType, setThumbnailType] = useState("upload");
  const [thumbnailPreview, setThumbnailPreview] = useState(null);
  const [categories, setCategories] = useState([]);
  const [imageFields, setImageFields] = useState([
    { type: "upload", value: "", preview: null },
  ]);
  const [loading, setLoading] = useState(false);

  // -----------------------------
  // FETCH CATEGORIES
  // -----------------------------
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

  // -----------------------------
  // HANDLE FORM CHANGE
  // -----------------------------
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // -----------------------------
  // THUMBNAIL HANDLERS
  // -----------------------------
  const handleThumbnailUpload = (file) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      setFormData((prev) => ({ ...prev, thumbnail: reader.result }));
      setThumbnailPreview(reader.result);
    };
    if (file) reader.readAsDataURL(file);
  };

  const handleThumbnailUrl = (url) => {
    setFormData((prev) => ({ ...prev, thumbnail: url }));
    setThumbnailPreview(url || null);
  };

  // -----------------------------
  // IMAGE HANDLERS
  // -----------------------------
  const handleImageChange = (index, type, value) => {
    const fields = [...imageFields];
    if (type === "upload") {
      const reader = new FileReader();
      reader.onloadend = () => {
        fields[index].value = reader.result;
        fields[index].preview = reader.result;
        setImageFields(fields);
        setFormData((prev) => ({
          ...prev,
          images: fields.map((f) => f.value).filter(Boolean),
        }));
      };
      if (value) reader.readAsDataURL(value);
    } else {
      fields[index].value = value;
      fields[index].preview = value || null;
      setImageFields(fields);
      setFormData((prev) => ({
        ...prev,
        images: fields.map((f) => f.value).filter(Boolean),
      }));
    }
  };

  const addImageField = () =>
    setImageFields([
      ...imageFields,
      { type: "upload", value: "", preview: null },
    ]);

  const removeImageField = (index) => {
    const fields = imageFields.filter((_, i) => i !== index);
    setImageFields(fields);
    setFormData((prev) => ({
      ...prev,
      images: fields.map((f) => f.value).filter(Boolean),
    }));
  };

  // -----------------------------
  // SUBMIT
  // -----------------------------
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await axios.post("/pages/api/products/product", formData);
      if (res.data.success) {
        toast.success("Product Added Successfully!");
        router.refresh();
        setFormData({
          productName: "",
          thumbnail: "",
          category: "",
          images: [],
          offerPrice: "",
          regularPrice: "",
          descriptions: "",
          stock: 0,
          status: "regular",
          shipping_fee: "free",
        });
        setThumbnailType("upload");
        setThumbnailPreview(null);
        setImageFields([{ type: "upload", value: "", preview: null }]);
      } else {
        toast.error(res.data.message || "Failed to add product");
      }
    } catch (error) {
      toast.error(error.message || "Something went wrong!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white shadow-lg rounded-lg space-y-6">
      <h2 className="text-3xl font-bold text-center text-gray-800">
        Add New Product
      </h2>
      <button onClick={() => setAddFlag(false)}>Cancel</button>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* PRODUCT NAME */}
        <input
          type="text"
          name="productName"
          placeholder="Product Name"
          value={formData.productName || ""}
          onChange={handleChange}
          required
          className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
        />

        {/* CATEGORY DROPDOWN */}
        <select
          name="category"
          value={formData.category || ""}
          onChange={handleChange}
          required
          className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
        >
          <option value="">Select Category</option>
          {categories.map((cat) => (
            <option key={cat._id} value={cat.slug}>
              {cat.name}
            </option>
          ))}
        </select>

        {/* THUMBNAIL */}
        <div className="flex items-center gap-4 mb-2">
          <label className="flex items-center gap-2">
            <input
              type="radio"
              checked={thumbnailType === "upload"}
              onChange={() => {
                setThumbnailType("upload");
                setFormData((prev) => ({ ...prev, thumbnail: "" }));
                setThumbnailPreview(null);
              }}
            />
            Upload
          </label>
          <label className="flex items-center gap-2">
            <input
              type="radio"
              checked={thumbnailType === "url"}
              onChange={() => {
                setThumbnailType("url");
                setFormData((prev) => ({ ...prev, thumbnail: "" }));
                setThumbnailPreview(null);
              }}
            />
            URL
          </label>
        </div>

        {thumbnailType === "upload" ? (
          <input
            type="file"
            accept="image/*"
            onChange={(e) => handleThumbnailUpload(e.target.files[0])}
            className="w-full border border-gray-300 rounded-lg p-2"
          />
        ) : (
          <input
            type="text"
            placeholder="Thumbnail URL"
            value={formData.thumbnail || ""}
            onChange={(e) => handleThumbnailUrl(e.target.value)}
            className="w-full border border-gray-300 rounded-lg p-2"
          />
        )}

        {thumbnailPreview && (
          <div className="w-32 h-32 relative border rounded overflow-hidden">
            <Image
              src={thumbnailPreview}
              alt="Thumbnail"
              fill
              className="object-cover"
            />
          </div>
        )}

        {/* ADDITIONAL IMAGES */}
        <div>
          <h4 className="font-medium mb-2 text-gray-700">Additional Images</h4>
          {imageFields.map((img, i) => (
            <div key={i} className="mb-4 border p-3 rounded-lg space-y-2">
              <div className="flex gap-4 mb-2">
                <label className="flex items-center gap-2">
                  <input
                    type="radio"
                    checked={img.type === "upload"}
                    onChange={() => {
                      const fields = [...imageFields];
                      fields[i].type = "upload";
                      fields[i].value = "";
                      fields[i].preview = null;
                      setImageFields(fields);
                    }}
                  />
                  Upload
                </label>
                <label className="flex items-center gap-2">
                  <input
                    type="radio"
                    checked={img.type === "url"}
                    onChange={() => {
                      const fields = [...imageFields];
                      fields[i].type = "url";
                      fields[i].value = "";
                      fields[i].preview = null;
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
                  className="w-full p-2 border border-gray-300 rounded-lg"
                />
              ) : (
                <input
                  type="text"
                  placeholder="Image URL"
                  value={img.value || ""}
                  onChange={(e) => handleImageChange(i, "url", e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded-lg"
                />
              )}

              {img.preview && (
                <div className="w-24 h-24 relative border rounded overflow-hidden">
                  <Image
                    src={img.preview}
                    alt={`Image ${i + 1}`}
                    fill
                    className="object-cover"
                  />
                </div>
              )}

              {imageFields.length > 1 && (
                <button
                  type="button"
                  onClick={() => removeImageField(i)}
                  className="text-red-600 hover:underline"
                >
                  Remove
                </button>
              )}
            </div>
          ))}

          <button
            type="button"
            onClick={addImageField}
            className="py-2 px-4 bg-green-600 text-white rounded hover:bg-green-700"
          >
            Add Image
          </button>
        </div>

        {/* OFFER PRICE */}
        <input
          type="number"
          name="offerPrice"
          placeholder="Offer Price"
          value={formData.offerPrice || ""}
          onChange={handleChange}
          required
          className="w-full p-3 border border-gray-300 rounded-lg"
        />

        {/* REGULAR PRICE */}
        <input
          type="number"
          name="regularPrice"
          placeholder="Regular Price"
          value={formData.regularPrice || ""}
          onChange={handleChange}
          required
          className="w-full p-3 border border-gray-300 rounded-lg"
        />

        {/* DESCRIPTION */}
        <textarea
          name="descriptions"
          placeholder="Descriptions"
          value={formData.descriptions || ""}
          onChange={handleChange}
          required
          className="w-full p-3 border border-gray-300 rounded-lg"
        />

        {/* STOCK */}
        <input
          type="number"
          name="stock"
          placeholder="Stock"
          value={formData.stock || 0}
          onChange={handleChange}
          className="w-full p-3 border border-gray-300 rounded-lg"
        />

        {/* STATUS */}
        <select
          name="status"
          value={formData.status || "regular"}
          onChange={handleChange}
          className="w-full p-3 border border-gray-300 rounded-lg"
        >
          <option value="regular">Regular</option>
          <option value="onSale">On Sale</option>
          <option value="new">New</option>
        </select>

        {/* SHIPPING FEE */}
        <select
          name="shipping_fee"
          value={formData.shipping_fee || "free"}
          onChange={handleChange}
          className="w-full p-3 border border-gray-300 rounded-lg"
        >
          <option value="free">Free</option>
          <option value="paid">Paid</option>
        </select>

        {/* SUBMIT BUTTON */}
        <button
          type="submit"
          disabled={loading}
          className={`w-full py-3 text-white rounded ${
            loading
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-blue-600 hover:bg-blue-700"
          }`}
        >
          {loading ? "Adding Product..." : "Add Product"}
        </button>
      </form>
    </div>
  );
};

export default AddProduct;
