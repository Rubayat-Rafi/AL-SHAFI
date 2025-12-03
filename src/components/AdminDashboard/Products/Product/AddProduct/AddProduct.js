"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import Image from "next/image";
import { useRouter } from "next/navigation";
import RichTextEditor from "@/components/RichTextEditor/RichTextEditor";

const AddProduct = ({ setAddFlag }) => {
  const router = useRouter();

  // rich text descriptions state
  const [descriptions, setDescriptions] = useState("");

  const [formData, setFormData] = useState({
    productName: "",
    thumbnail: "",
    thumbnailAlt: "",
    category: "",
    images: [],
    offerPrice: "",
    regularPrice: "",
    descriptions: "",
    stock: "",
    status: "regular",
    shipping_fee: "free",

    seoTitle: "",
    seoDescription: "",
    seoKeywords: "",
    seoImage: "",
  });

  const [thumbnailType, setThumbnailType] = useState("upload");
  const [thumbnailPreview, setThumbnailPreview] = useState(null);
  const [categories, setCategories] = useState([]);
  const [imageFields, setImageFields] = useState([
    { type: "upload", value: "", preview: null, alt: "" },
  ]);

  const [loading, setLoading] = useState(false);

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

  // HANDLE INPUT CHANGE
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "stock" ? Number(value) : value,
    }));
  };

  // HANDLE THUMBNAIL UPLOAD
  const handleThumbnailUpload = (file) => {
    if (!file) return;
    const reader = new FileReader();

    reader.onloadend = () => {
      const result = reader.result;
      setFormData((prev) => ({ ...prev, thumbnail: result }));
      setThumbnailPreview(result);
    };

    reader.readAsDataURL(file);
  };

  const handleThumbnailUrl = (url) => {
    setFormData((prev) => ({ ...prev, thumbnail: url }));
    setThumbnailPreview(url || null);
  };

  // HANDLE IMAGE CHANGE
  const handleImageChange = (index, type, value) => {
    const fields = [...imageFields];

    if (type === "upload") {
      if (!value) return;
      const file = value;
      const reader = new FileReader();

      reader.onloadend = () => {
        const result = reader.result;
        fields[index].value = result;
        fields[index].preview = result;
        setImageFields(fields);

        const images = fields.map((f) => f.value).filter(Boolean);
        setFormData((prev) => ({ ...prev, images }));
      };

      reader.readAsDataURL(file);
    } else {
      const strVal = value || "";
      fields[index].value = strVal;
      fields[index].preview = strVal || null;
      setImageFields(fields);

      const images = fields.map((f) => f.value).filter(Boolean);
      setFormData((prev) => ({ ...prev, images }));
    }
  };

  const handleImageAltChange = (index, alt) => {
    const fields = [...imageFields];
    fields[index].alt = alt;
    setImageFields(fields);
  };

  const addImageField = () => {
    setImageFields((prev) => [
      ...prev,
      { type: "upload", value: "", preview: null, alt: "" },
    ]);
  };

  const removeImageField = (index) => {
    const fields = imageFields.filter((_, i) => i !== index);
    setImageFields(fields);

    const images = fields.map((f) => f.value).filter(Boolean);
    setFormData((prev) => ({ ...prev, images }));
  };

  // SUBMIT FORM
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (!descriptions || descriptions.trim() === "") {
      toast.error("Description is required");
      setLoading(false);
      return;
    }

    const images = imageFields.map((f) => f.value).filter(Boolean);
    const imagesAlt = imageFields
      .filter((f) => f.value)
      .map((f) => f.alt || formData.productName);

    const seoKeywordsArray =
      formData.seoKeywords
        ?.split(",")
        .map((k) => k.trim())
        .filter((k) => k.length > 0) || [];

    const { seoKeywords, ...restForm } = formData;

    const payload = {
      ...restForm,
      descriptions,
      images,
      imagesAlt,
      seoKeywords: seoKeywordsArray,
    };

    try {
      const res = await axios.post("/pages/api/products/product", payload);
      if (res.data.success) {
        toast.success("Product Added Successfully!");
        router.refresh();

        setFormData({
          productName: "",
          thumbnail: "",
          thumbnailAlt: "",
          category: "",
          images: [],
          offerPrice: "",
          regularPrice: "",
          descriptions: "",
          stock: "",
          status: "regular",
          shipping_fee: "free",
          seoTitle: "",
          seoDescription: "",
          seoKeywords: "",
          seoImage: "",
        });

        setDescriptions("");
        setThumbnailType("upload");
        setThumbnailPreview(null);
        setImageFields([{ type: "upload", value: "", preview: null, alt: "" }]);
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
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-lg space-y-6">
      <h2 className="text-3xl font-bold text-center text-gray-800">
        Add New Product
      </h2>

      <button onClick={() => setAddFlag(false)} className="text-sm text-red-500">
        Cancel
      </button>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* PRODUCT NAME */}
        <input
          type="text"
          name="productName"
          placeholder="Product Name"
          value={formData.productName}
          onChange={handleChange}
          required
          className="w-full p-3 border border-gray-300 rounded-lg"
        />

        {/* CATEGORY */}
        <select
          name="category"
          value={formData.category}
          onChange={handleChange}
          required
          className="w-full p-3 border border-gray-300 rounded-lg"
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
          <label>
            <input
              type="radio"
              checked={thumbnailType === "upload"}
              onChange={() => {
                setThumbnailType("upload");
                setFormData((prev) => ({ ...prev, thumbnail: "" }));
                setThumbnailPreview(null);
              }}
            />{" "}
            Upload
          </label>

          <label>
            <input
              type="radio"
              checked={thumbnailType === "url"}
              onChange={() => {
                setThumbnailType("url");
                setFormData((prev) => ({ ...prev, thumbnail: "" }));
                setThumbnailPreview(null);
              }}
            />{" "}
            URL
          </label>
        </div>

        {thumbnailType === "upload" ? (
          <input
            type="file"
            accept="image/*"
            onChange={(e) =>
              handleThumbnailUpload(e.target.files?.[0] || null)
            }
            className="w-full border p-2 rounded"
          />
        ) : (
          <input
            type="text"
            placeholder="Thumbnail URL"
            value={formData.thumbnail}
            onChange={(e) => handleThumbnailUrl(e.target.value)}
            className="w-full border p-2 rounded"
          />
        )}

        <input
          type="text"
          name="thumbnailAlt"
          placeholder="Thumbnail Alt Text"
          value={formData.thumbnailAlt}
          onChange={handleChange}
          className="w-full border p-2 rounded"
        />

        {thumbnailPreview && (
          <div className="w-32 h-32 relative border rounded overflow-hidden">
            <Image
              src={thumbnailPreview}
              alt={formData.thumbnailAlt || "Thumbnail"}
              fill
              className="object-cover"
            />
          </div>
        )}

        {/* IMAGE FIELDS */}
        <div>
          <h4 className="font-medium">Additional Images</h4>

          {imageFields.map((img, i) => (
            <div key={i} className="border p-3 rounded mb-4 space-y-2">
              <div className="flex gap-4">
                <label>
                  <input
                    type="radio"
                    checked={img.type === "upload"}
                    onChange={() => {
                      const f = [...imageFields];
                      f[i].type = "upload";
                      f[i].value = "";
                      f[i].preview = null;
                      setImageFields(f);
                    }}
                  />{" "}
                  Upload
                </label>

                <label>
                  <input
                    type="radio"
                    checked={img.type === "url"}
                    onChange={() => {
                      const f = [...imageFields];
                      f[i].type = "url";
                      f[i].value = "";
                      f[i].preview = null;
                      setImageFields(f);
                    }}
                  />{" "}
                  URL
                </label>
              </div>

              {img.type === "upload" ? (
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) =>
                    handleImageChange(i, "upload", e.target.files?.[0] || null)
                  }
                  className="w-full border p-2 rounded"
                />
              ) : (
                <input
                  type="text"
                  placeholder="Image URL"
                  value={img.value}
                  onChange={(e) =>
                    handleImageChange(i, "url", e.target.value)
                  }
                  className="w-full border p-2 rounded"
                />
              )}

              <input
                type="text"
                placeholder="Image Alt"
                value={img.alt}
                onChange={(e) => handleImageAltChange(i, e.target.value)}
                className="w-full border p-2 rounded"
              />

              {img.preview && (
                <div className="w-20 h-20 relative border rounded overflow-hidden">
                  <Image
                    src={img.preview}
                    alt={img.alt || "Image preview"}
                    fill
                    className="object-cover"
                  />
                </div>
              )}

              {imageFields.length > 1 && (
                <button
                  type="button"
                  className="text-red-500"
                  onClick={() => removeImageField(i)}
                >
                  Remove
                </button>
              )}
            </div>
          ))}

          <button
            type="button"
            onClick={addImageField}
            className="bg-green-600 text-white px-4 py-2 rounded"
          >
            Add Image
          </button>
        </div>

        {/* PRICES */}
        <input
          type="number"
          name="offerPrice"
          placeholder="Offer Price"
          value={formData.offerPrice}
          onChange={handleChange}
          required
          className="w-full border p-2 rounded"
        />

        <input
          type="number"
          name="regularPrice"
          placeholder="Regular Price"
          value={formData.regularPrice}
          onChange={handleChange}
          required
          className="w-full border p-2 rounded"
        />

        {/* DESCRIPTION */}
        <RichTextEditor
          value={descriptions}
          onChange={setDescriptions}
          placeholder="Type your descriptions"
        />

        {/* STOCK */}
        <input
          type="number"
          name="stock"
          placeholder="Stock"
          value={formData.stock}
          onChange={handleChange}
          className="w-full border p-2 rounded"
        />

        {/* STATUS */}
        <select
          name="status"
          value={formData.status}
          onChange={handleChange}
          className="w-full border p-2 rounded"
        >
          <option value="regular">Regular</option>
          <option value="onSale">On Sale</option>
          <option value="new">New</option>
          <option value="hot">Hot</option>
        </select>

        {/* SHIPPING */}
        <select
          name="shipping_fee"
          value={formData.shipping_fee}
          onChange={handleChange}
          className="w-full border p-2 rounded"
        >
          <option value="free">Free</option>
          <option value="paid">Paid</option>
        </select>

        {/* SEO */}
        <div className="border border-gray-200 rounded-lg p-4 space-y-3">
          <h3 className="font-semibold text-gray-800 text-lg">SEO Settings</h3>

          <input
            type="text"
            name="seoTitle"
            placeholder="SEO Title (optional)"
            value={formData.seoTitle}
            onChange={handleChange}
            className="w-full border p-2 rounded"
          />

          <textarea
            name="seoDescription"
            placeholder="SEO Description (optional)"
            value={formData.seoDescription}
            onChange={handleChange}
            className="w-full border p-2 rounded"
            rows="3"
          />

          <input
            type="text"
            name="seoKeywords"
            placeholder="SEO Keywords (comma separated)"
            value={formData.seoKeywords}
            onChange={handleChange}
            className="w-full border p-2 rounded"
          />

          <input
            type="text"
            name="seoImage"
            placeholder="SEO Image URL (OpenGraph image)"
            value={formData.seoImage}
            onChange={handleChange}
            className="w-full border p-2 rounded"
          />
        </div>

        {/* SUBMIT */}
        <button
          type="submit"
          disabled={loading}
          className={`w-full py-3 text-white rounded ${
            loading ? "bg-gray-400" : "bg-blue-600 hover:bg-blue-700"
          }`}
        >
          {loading ? "Adding Product…" : "Add Product"}
        </button>
      </form>
    </div>
  );
};

export default AddProduct;
