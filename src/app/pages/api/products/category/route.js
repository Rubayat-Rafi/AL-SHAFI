import { NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect/dbConnect";
import category from "@/models/products/category/category";
import { uploadToCloudinary } from "@/utils/cloudinary/cloudinary";
export async function POST(req) {
  try {
    const { name, image,status } = await req.json();
    await dbConnect();
    let finalImage = image;
    const isUrl = image?.startsWith("http://") || image?.startsWith("https://");
    if (!isUrl && image) {
      const uploaded = await uploadToCloudinary({
        img: image,
        path: "Al-Safi/categories",
      });

      finalImage = {
        secure_url: uploaded.secure_url,
        public_id: uploaded.public_id,
      };
    }

    const newCategory = new category({
      name,
      image: finalImage,
      status
    });
    const savedCategory = await newCategory.save();
    if (savedCategory) {
      return NextResponse.json({
        message: "Category uploaded successfully",
        success: true,
        category: savedCategory,
      });
    } else {
      return NextResponse.json({
        message: "Category not uploaded!",
        success: false,
      });
    }
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
    const finddAllCategory = await category.find();
    return NextResponse.json({
      message: "Category founded!",
      success: true,
      categories: finddAllCategory,
    });
  } catch (error) {
    return NextResponse.json({
      message: error?.message,
      success: false,
    });
  }
}
