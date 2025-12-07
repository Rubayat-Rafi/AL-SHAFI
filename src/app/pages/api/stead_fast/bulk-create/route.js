import UserOrder from "@/models/Order/UserOrder";
import { NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect/dbConnect";

export async function POST(req) {
  try {
    await dbConnect();
    const orders = await req.json();

    if (!orders || orders.length === 0) {
      return NextResponse.json(
        { error: "No orders provided" },
        { status: 400 }
      );
    }

    // Prepare payload for SteadFast
    const data = orders.map((order) => ({
      invoice: order.invoice,
      recipient_name: order.fullName || "N/A",
      recipient_address: order.addresses?.[0]?.address || "N/A",
      recipient_phone: order.phone || "",
      cod_amount: order.totals?.grandTotal || 0,
      note: order.note || "",
    }));

    const payload = { data: JSON.stringify(data) };

    const response = await fetch(
      `${process.env.STEADFAST_BASE_URL}/create_order/bulk-order`,
      {
        method: "POST",
        headers: {
          "Api-Key": process.env.STEADFAST_API_KEY,
          "Secret-Key": process.env.STEADFAST_SECRET_KEY,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      }
    );

    const result = await response.json();
    console.log(result?.data);
    // Create a map by invoice
    const resultMap = {};
    result?.data?.forEach((item) => {
      if (item?.invoice) resultMap[item.invoice] = item;
    });

    // Update only orders that have a returned consignment/tracking
    for (const order of orders) {
      const returned = resultMap[order.invoice];
      if (!returned) continue; // Skip if SteadFast didn't return data

      const updateData = {};
      if (returned.consignment_id)
        updateData.consignment_id = returned.consignment_id;
      if (returned.tracking_code)
        updateData.tracking_code = returned.tracking_code;
      updateData.status = "in_review"; // Always update status

      await UserOrder.findByIdAndUpdate(order._id, { $set: updateData });
    }

    return NextResponse.json({
      message: "Orders updated successfully",
      success: true,
    });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
