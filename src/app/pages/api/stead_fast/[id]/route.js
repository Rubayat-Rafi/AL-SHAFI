import { NextResponse } from "next/server";
import { dbConnection } from "@/lib/dbConnection/dbConnection";
import Order from "@/models/Order";

export async function DELETE(_req, { params }) {
  try {
    const { id } = await params;
    await dbConnection();
    await Order.findByIdAndDelete(id);
    return NextResponse.json({ success: true, message: "Order deleted" });
  } catch (err) {
    return NextResponse.json({ success: true, message: err?.message });
  }
}