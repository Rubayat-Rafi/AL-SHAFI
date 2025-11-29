import mongoose from "mongoose";
import slugify from "slugify";
const CategorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Category name is required"],
      unique: true,
      trim: true,
    },

    slug: {
      type: String,
      unique: true,
      index: true,
    },

    image: {
      secure_url: { type: String, default: null },
      public_id: { type: String, default: null },
    },

    status: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

CategorySchema.pre("save", async function () {
  if (this.isModified("name")) {
    this.slug = slugify(this.name, { lower: true });
  }
});

export default mongoose.models.categories ||
  mongoose.model("categories", CategorySchema);
