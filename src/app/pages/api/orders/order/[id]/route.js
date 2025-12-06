import { NextResponse } from "next/server";
import UserOrder from "@/models/Order/UserOrder";
import dbConnect from "@/lib/dbConnect/dbConnect";
export async function DELETE(_req, res) {
  try {
    await dbConnect();
    const { id } = await res.params;
    const response = await UserOrder.findByIdAndDelete({ _id: id });
    if (response) {
      return NextResponse.json({
        message: "deleted successfully",
        success: true,
      });
    } else {
      return NextResponse.json({
        message: "deleted not successfully",
        success: false,
      });
    }
  } catch (error) {
    return NextResponse.json({
      message: error?.message,
      success: true,
    });
  }
}
