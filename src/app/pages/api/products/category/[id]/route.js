import { NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect/dbConnect";
import Category from "@/models/products/category/category";
import {
  uploadToCloudinary,
  deleteFromCloudinary,
} from "@/utils/cloudinary/cloudinary";
export async function PATCH(req, { params }) {
  try {
    const { id } = await params;
    const { name, image, status } = await req.json();
    await dbConnect();
    const existing = await Category.findById(id);
    if (!existing) {
      return NextResponse.json({
        message: "Category not found",
        success: false,
      });
    }
    let finalImage = existing.image;
    if (image && image !== existing.image.secure_url) {
      const isUrl = image.startsWith("http://") || image.startsWith("https://");
      if (!isUrl) {
        if (existing.image?.public_id) {
          await deleteFromCloudinary(existing.image.public_id);
        }
        const uploaded = await uploadToCloudinary({
          img: image,
          path: "Al-Safi/categories",
        });

        finalImage = {
          secure_url: uploaded.secure_url,
          public_id: uploaded.public_id,
        };
      }
    }
    existing.name = name || existing.name;
    existing.image = finalImage;
    existing.status = status;
    const updated = await existing.save();
    return NextResponse.json({
      message: "Category updated successfully",
      success: true,
      category: updated,
    });
  } catch (error) {
    return NextResponse.json({
      message: error.message,
      success: false,
    });
  }
}
export async function DELETE(req, { params }) {
  try {
    const { id } = await params;
    await dbConnect();
    const existing = await Category.findById(id);

    if (!existing) {
      return NextResponse.json({
        message: "Category not found",
        success: false,
      });
    }
    if (existing.image?.public_id) {
      await deleteFromCloudinary(existing.image.public_id);
    }
    await Category.findByIdAndDelete(id);
    return NextResponse.json({
      message: "Category deleted successfully",
      success: true,
    });
  } catch (error) {
    return NextResponse.json({
      message: error.message,
      success: false,
    });
  }
}
