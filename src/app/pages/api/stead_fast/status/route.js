import { NextResponse } from "next/server";
import axios from "axios";
import dbConnect from "@/lib/dbConnect/dbConnect";

export async function POST(req) {
  try {
    await dbConnect();
    const { ids } = await req.json();
    if (!Array.isArray(ids) || ids.length === 0) {
      return NextResponse.json(
        { success: false, message: "No ids provided" },
        { status: 400 }
      );
    }

    const baseUrl = process.env.STEADFAST_BASE_URL;
    const apiKey = process.env.STEADFAST_API_KEY;
    const apiSecret = process.env.STEADFAST_SECRET_KEY;

    if (!baseUrl || !apiKey || !apiSecret) {
      return NextResponse.json(
        { success: false, message: "SteadFast credentials not configured" },
        { status: 500 }
      );
    }

    const statuses = await Promise.all(
      ids.map(async (cid) => {
        try {
          const { data } = await axios.get(
            `${baseUrl}/status_by_cid/${cid.toString()}`,
            {
              headers: {
                "Api-Key": apiKey,
                "Secret-Key": apiSecret,
                "Content-Type": "application/json",
              },
            }
          );
          return { cid, status: data };
        } catch (err) {
          return {
            cid,
            status: null,
            error:
              err?.response?.data || err?.message || "Failed to fetch status",
          };
        }
      })
    );

    return NextResponse.json({
      success: true,
      data: statuses,
    });
  } catch (error) {
    return NextResponse.json({
      success: false,
      message: error?.message || "Something went wrong",
    });
  }
}