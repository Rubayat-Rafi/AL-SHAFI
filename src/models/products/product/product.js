import mongoose from "mongoose";
import slugify from "slugify";
const productSchema = new mongoose.Schema(
  {
    productName: {
      type: String,
      required: true,
      trim: true,
    },
    slug: {
      type: String,
      unique: true,
      lowercase: true,
      index: true,
    },
    thumbnail: {
      secure_url: { type: String, required: true, default: "" },
      public_id: { type: String, required: true, default: "" },
    },
    category: {
      type: String,
      required: true,
      trim: true,
    },
    images: {
      type: [
        {
          secure_url: { type: String, required: true, default: "" },
          public_id: { type: String, required: true, default: "" },
        },
      ],
      default: [],
    },
    offerPrice: {
      type: Number,
      required: true,
    },
    regularPrice: {
      type: Number,
      required: true,
    },
    descriptions: {
      type: String,
      required: true,
      trim: true,
    },
    stock: {
      type: Number,
      default: 0,
      min: 0,
    },
    total_sell: {
      type: Number,
      default: 0,
    },

    status: {
      type: String,
      enum: ["regular", "onSale", "new"],
      default: "regular",
    },

    shipping_fee: {
      type: String,
      enum: ["free", "paid"],
      default: "free",
    },
  },
  { timestamps: true }
);

productSchema.pre("save", function () {
  if (this.isModified("productName")) {
    this.slug = slugify(this.productName, {
      lower: true,
      strict: true,
      replacement: "-",
      trim: true,
    });
  }
});
export default mongoose.models.products ||
  mongoose.model("products", productSchema);
