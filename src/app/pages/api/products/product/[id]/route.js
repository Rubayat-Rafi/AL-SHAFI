import { NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect/dbConnect";
import Product from "@/models/products/product/product";
import {
  uploadToCloudinary,
  deleteFromCloudinary,
} from "@/utils/cloudinary/cloudinary";
export async function PATCH(req, { params }) {
  try {
    const { id } = await params;
    const {
      productName,
      category,
      thumbnail,
      images,
      offerPrice,
      regularPrice,
      descriptions,
      stock,
      status,
      shipping_fee,
    } = await req.json();

    await dbConnect();

    const existing = await Product.findById(id);
    if (!existing) {
      return NextResponse.json({
        message: "Product not found",
        success: false,
      });
    }
    let finalThumbnail = existing.thumbnail;
    if (thumbnail && thumbnail !== existing.thumbnail?.secure_url) {
      const isUrl =
        thumbnail.startsWith("http://") || thumbnail.startsWith("https://");
      if (!isUrl) {
        if (existing.thumbnail?.public_id) {
          await deleteFromCloudinary(existing.thumbnail.public_id);
        }
        const uploaded = await uploadToCloudinary({
          img: thumbnail,
          path: "Al-Safi/products/thumbnails",
        });
        finalThumbnail = {
          secure_url: uploaded.secure_url,
          public_id: uploaded.public_id,
        };
      } else {
        finalThumbnail = { secure_url: thumbnail, public_id: "external" };
      }
    }
    let finalImages = [];
    const existingMap = {};
    existing.images.forEach((img) => {
      existingMap[img.secure_url] = img;
    });

    for (const img of images) {
      const isUrl = img.startsWith("http://") || img.startsWith("https://");

      if (!isUrl) {
        const uploaded = await uploadToCloudinary({
          img,
          path: "Al-Safi/products/images",
        });
        finalImages.push({
          secure_url: uploaded.secure_url,
          public_id: uploaded.public_id,
        });
      } else {
        if (existingMap[img]) {
          finalImages.push(existingMap[img]);
          delete existingMap[img];
        } else {
          finalImages.push({ secure_url: img, public_id: "external" });
        }
      }
    }

    for (const url in existingMap) {
      const img = existingMap[url];
      if (img.public_id && img.public_id !== "external") {
        await deleteFromCloudinary(img.public_id);
      }
    }

    existing.productName = productName || existing.productName;
    existing.category = category || existing.category;
    existing.thumbnail = finalThumbnail;
    existing.images = finalImages;
    existing.offerPrice = offerPrice || existing.offerPrice;
    existing.regularPrice = regularPrice || existing.regularPrice;
    existing.descriptions = descriptions || existing.descriptions;
    existing.stock = stock ?? existing.stock;
    existing.status = status || existing.status;
    existing.shipping_fee = shipping_fee || existing.shipping_fee;

    const updated = await existing.save();

    return NextResponse.json({
      message: "Product updated successfully",
      success: true,
      product: updated,
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

    const existing = await Product.findById(id);
    if (!existing) {
      return NextResponse.json({
        message: "Product not found",
        success: false,
      });
    }

    if (existing.thumbnail?.public_id) {
      await deleteFromCloudinary(existing.thumbnail.public_id);
    }

    if (existing.images?.length) {
      for (const img of existing.images) {
        if (img.public_id) {
          await deleteFromCloudinary(img.public_id);
        }
      }
    }

    await Product.findByIdAndDelete(id);

    return NextResponse.json({
      message: "Product deleted successfully",
      success: true,
    });
  } catch (error) {
    return NextResponse.json({
      message: error.message,
      success: false,
    });
  }
}
