import { NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect/dbConnect";
export async function POST(req, res) {
  try {
    await dbConnect();
    const reqBody = await req.json();
    console.log(reqBody)
    return NextResponse.json({
      message: "Order cteated successfully",
      success: true,
    });
  } catch (error) {
    return NextResponse.json({
      message: error?.message,
      success: false,
    });
  }
}
