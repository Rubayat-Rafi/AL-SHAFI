"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import Image from "next/image";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { useForm, useFieldArray } from "react-hook-form";
import RichTextEditor from "@/components/RichTextEditor/RichTextEditor";
const AddProduct = ({ setAddFlag }) => {
  const router = useRouter();

  const [thumbnailPreview, setThumbnailPreview] = useState(null);
  const [thumbnailType, setThumbnailType] = useState("upload");
  const [categories, setCategories] = useState([]);

  // -------------------------------
  // React Hook Form Initial Setup
  // -------------------------------
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    control,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      productName: "",
      thumbnail: "",
      thumbnailAlt: "",
      category: "",
      images: [{ value: "", alt: "", type: "upload", preview: null }],
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
    },
  });

  // Dynamic image fields
  const { fields, append, remove, update } = useFieldArray({
    control,
    name: "images",
  });

  const descriptions = watch("descriptions");
  const images = watch("images");
  const thumbnail = watch("thumbnail");

  // -------------------------------
  // Load Categories
  // -------------------------------
  useEffect(() => {
    axios
      .get("/pages/api/products/category", {
        headers: { "x-request-source": "12Hirock@" },
      })
      .then((res) => {
        if (res.data.success) {
          setCategories(res.data.categories.filter((c) => c.status));
        }
      })
      .catch(() => toast.error("Failed to load categories"));
  }, []);

  // -------------------------------
  // Thumbnail Upload
  // -------------------------------
  const handleThumbnailUpload = (file) => {
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      setValue("thumbnail", reader.result);
      setThumbnailPreview(reader.result);
    };
    reader.readAsDataURL(file);
  };

  // -------------------------------
  // Handle image field change
  // -------------------------------
  const handleImageChange = (i, type, fileOrUrl) => {
    const reader = new FileReader();

    if (type === "upload") {
      if (!fileOrUrl) return;
      reader.onloadend = () => {
        update(i, {
          ...fields[i],
          type: "upload",
          value: reader.result,
          preview: reader.result,
        });
      };
      reader.readAsDataURL(fileOrUrl);
    } else {
      update(i, {
        ...fields[i],
        type: "url",
        value: fileOrUrl,
        preview: fileOrUrl || null,
      });
    }
  };

  // -------------------------------
  // Submit
  // -------------------------------
  const onSubmit = async (data) => {
    if (!data.descriptions.trim()) {
      toast.error("Description is required");
      return;
    }

    const payload = {
      ...data,
      images: data.images.map((img) => img.value).filter(Boolean),
      imagesAlt: data.images.map((img) => img.alt || data.productName),
      seoKeywords: data.seoKeywords
        ?.split(",")
        .map((k) => k.trim())
        .filter((k) => k.length > 0),
    };

    try {
    
      const res = await axios.post("/pages/api/products/product", payload);
      if (res.data.success) {
        toast.success("Product Added Successfully!");
        router.refresh();
        reset();
        setThumbnailPreview(null);
      }
    } catch (err) {
      toast.error(err.message || "Something went wrong!");
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-lg space-y-6">
      <h2 className="text-3xl font-bold text-center text-gray-800">
        Add New Product
      </h2>

      <button
        onClick={() => setAddFlag(false)}
        className="text-red-500 text-sm"
      >
        Cancel
      </button>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {/* PRODUCT NAME */}
        <input
          {...register("productName", { required: true })}
          placeholder="Product Name"
          className="w-full p-3 border rounded"
        />
        {errors.productName && (
          <p className="text-red-500 text-sm">Product Name is required</p>
        )}

        {/* CATEGORY */}
        <select
          {...register("category", { required: true })}
          className="w-full p-3 border rounded"
        >
          <option value="">Select Category</option>
          {categories.map((cat) => (
            <option key={cat._id} value={cat.slug}>
              {cat.name}
            </option>
          ))}
        </select>

        {/* THUMBNAIL */}
        <div className="flex gap-4">
          <label>
            <input
              type="radio"
              checked={thumbnailType === "upload"}
              onChange={() => {
                setThumbnailType("upload");
                setValue("thumbnail", "");
                setThumbnailPreview(null);
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
                setValue("thumbnail", "");
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
            className="w-full border p-2 rounded"
          />
        ) : (
          <input
            {...register("thumbnail")}
            placeholder="Thumbnail URL"
            onChange={(e) => setThumbnailPreview(e.target.value)}
            className="w-full border p-2 rounded"
          />
        )}

        {thumbnailPreview && (
          <div className="w-32 h-32 relative border rounded overflow-hidden">
            <Image src={thumbnailPreview} alt="preview" fill />
          </div>
        )}

        {/* THUMB ALT */}
        <input
          {...register("thumbnailAlt")}
          placeholder="Thumbnail Alt Text"
          className="w-full border p-2 rounded"
        />

        {/* IMAGES */}
        <div>
          <h4 className="font-medium">Additional Images</h4>

          {fields.map((img, i) => (
            <div key={img.id} className="border p-3 rounded mb-4">
              {/* Type Selector */}
              <div className="flex gap-4 mb-2">
                <label>
                  <input
                    type="radio"
                    checked={img.type === "upload"}
                    onChange={() =>
                      update(i, { ...img, type: "upload", value: "", preview: "" })
                    }
                  />
                  Upload
                </label>

                <label>
                  <input
                    type="radio"
                    checked={img.type === "url"}
                    onChange={() =>
                      update(i, { ...img, type: "url", value: "", preview: "" })
                    }
                  />
                  URL
                </label>
              </div>

              {/* Input */}
              {img.type === "upload" ? (
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) =>
                    handleImageChange(i, "upload", e.target.files[0])
                  }
                  className="w-full border p-2 rounded"
                />
              ) : (
                <input
                  value={img.value}
                  placeholder="Image URL"
                  onChange={(e) =>
                    handleImageChange(i, "url", e.target.value)
                  }
                  className="w-full border p-2 rounded"
                />
              )}

              {/* Alt Text */}
              <input
                {...register(`images.${i}.alt`)}
                placeholder="Image Alt"
                className="w-full border p-2 rounded mt-2"
              />

              {/* Preview */}
              {img.preview && (
                <div className="w-20 h-20 relative border rounded mt-2 overflow-hidden">
                  <Image src={img.preview} alt="preview" fill />
                </div>
              )}

              {/* Remove */}
              {fields.length > 1 && (
                <button
                  type="button"
                  className="text-red-500 mt-2"
                  onClick={() => remove(i)}
                >
                  Remove
                </button>
              )}
            </div>
          ))}

          <button
            type="button"
            onClick={() =>
              append({ value: "", alt: "", type: "upload", preview: null })
            }
            className="bg-green-600 text-white px-4 py-2 rounded"
          >
            Add Image
          </button>
        </div>

        {/* PRICES */}
        <input
          {...register("offerPrice", { required: true })}
          type="number"
          placeholder="Offer Price"
          className="w-full border p-2 rounded"
        />

        <input
          {...register("regularPrice", { required: true })}
          type="number"
          placeholder="Regular Price"
          className="w-full border p-2 rounded"
        />

        {/* DESCRIPTION (RICH TEXT) */}
        <RichTextEditor
          value={descriptions}
          onChange={(v) => setValue("descriptions", v)}
        />

        {/* STOCK */}
        <input
          {...register("stock", { required: true })}
          type="number"
          placeholder="Stock"
          className="w-full border p-2 rounded"
        />

        {/* STATUS */}
        <select {...register("status")} className="w-full border p-2 rounded">
          <option value="regular">Regular</option>
          <option value="onSale">On Sale</option>
          <option value="new">New</option>
          <option value="hot">Hot</option>
        </select>

        {/* SHIPPING */}
        <select
          {...register("shipping_fee")}
          className="w-full border p-2 rounded"
        >
          <option value="free">Free</option>
          <option value="paid">Paid</option>
        </select>

        {/* SEO SECTION */}
        <div className="border p-4 rounded space-y-3">
          <h3 className="font-semibold">SEO Settings</h3>

          <input
            {...register("seoTitle")}
            placeholder="SEO Title"
            className="w-full border p-2 rounded"
          />

          <textarea
            {...register("seoDescription")}
            rows={3}
            placeholder="SEO Description"
            className="w-full border p-2 rounded"
          />

          <input
            {...register("seoKeywords")}
            placeholder="SEO Keywords (comma separated)"
            className="w-full border p-2 rounded"
          />

          <input
            {...register("seoImage")}
            placeholder="SEO Image URL"
            className="w-full border p-2 rounded"
          />
        </div>

        {/* SUBMIT */}
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-3 rounded hover:bg-blue-700"
        >
          Add Product
        </button>
      </form>
    </div>
  );
};

export default AddProduct;
