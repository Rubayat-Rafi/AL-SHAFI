import { NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect/dbConnect";
import Product from "@/models/products/product/product";
import { uploadToCloudinary } from "@/utils/cloudinary/cloudinary";
export async function POST(req) {
  try {
    const {
      productName,
      thumbnail,
      category,
      images,
      offerPrice,
      regularPrice,
      descriptions,
      stock,
      status,
      shipping_fee,
    } = await req.json();
    await dbConnect();
    let finalThumbnail = { secure_url: "", public_id: "" };
    const isThumbnailUrl =
      thumbnail?.startsWith("http://") || thumbnail?.startsWith("https://");

    if (!isThumbnailUrl && thumbnail) {
      const uploaded = await uploadToCloudinary({
        img: thumbnail,
        path: "Al-Safi/products/thumbnail",
      });
      finalThumbnail = {
        secure_url: uploaded.secure_url,
        public_id: uploaded.public_id,
      };
    } else if (isThumbnailUrl) {
      finalThumbnail = { secure_url: thumbnail, public_id: "" };
    }
    const finalImages = await Promise.all(
      images.map(async (img) => {
        const isUrl = img?.startsWith("http://") || img?.startsWith("https://");
        if (!isUrl && img) {
          const uploaded = await uploadToCloudinary({
            img,
            path: "Al-Safi/products/images",
          });
          return { secure_url: uploaded.secure_url, public_id: uploaded.public_id };
        } else if (isUrl) {
          return { secure_url: img, public_id: "" };
        }
        return null;
      })
    );
    const filteredImages = finalImages.filter(Boolean);
    const newProduct = new Product({
      productName,
      thumbnail: finalThumbnail,
      category,
      images: filteredImages,
      offerPrice,
      regularPrice,
      descriptions,
      stock,
      status,
      shipping_fee,
    });
    const savedProduct = await newProduct.save();
    return NextResponse.json({
      message: savedProduct
        ? "Product uploaded successfully"
        : "Product not uploaded!",
      success: !!savedProduct,
      product: savedProduct || null,
    });
  } catch (error) {
    return NextResponse.json({
      message: error.message || "Something went wrong",
      success: false,
    });
  }
}

export async function GET() {
  try {
    await dbConnect();
    const finddAllProducts = await Product.find();
    return NextResponse.json({
      message: "Category founded!",
      success: true,
      products: finddAllProducts,
    });
  } catch (error) {
    return NextResponse.json({
      message: error?.message,
      success: false,
    });
  }
}
