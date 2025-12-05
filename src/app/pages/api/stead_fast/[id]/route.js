import { NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect/dbConnect";
import Order from "@/models/Order/Order";

export async function DELETE(_req, { params }) {
  try {
    const { id } = await params;
    await dbConnect();
    await Order.findByIdAndDelete(id);
    return NextResponse.json({ success: true, message: "Order deleted" });
  } catch (err) {
    return NextResponse.json({ success: true, message: err?.message });
  }
}