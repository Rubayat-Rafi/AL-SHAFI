import { NextResponse } from "next/server";
import Order from "@/models/Order/Order";
export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const rawIds = searchParams.get("ids");
    if (!rawIds) {
      return NextResponse.json({
        message: "No ids provided",
        success: false,
      });
    }

    let idsParam = [];

    try {
      const parsed = JSON.parse(rawIds);
      if (!Array.isArray(parsed)) {
        throw new Error("ids must be an array");
      }
      idsParam = parsed;
    } catch (err) {
      return NextResponse.json({
        message: err?.message,
        success: false,
      });
    }

    const orders = await Order.find({ _id: { $in: idsParam } }).sort({
      createdAt: -1,
    });
    return NextResponse.json({
      message: "Orders found",
      success: true,
      data: orders,
    });
  } catch (error) {
    console.error("GET /api/orders error:", error);
    return NextResponse.json({
      message: error?.message || "Something went wrong",
      success: false,
    });
  }
}