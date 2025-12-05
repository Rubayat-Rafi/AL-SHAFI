import { NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect/dbConnect";
import User from "@/models/User/User";

export async function PUT(req, { params }) {
  try {
    await dbConnect();
    const { id } = await params;

    const { orderId, qty, checkoutOrderID, cartIds } = await req.json();

    // CASE 1: Checkout flow: add order + remove cart items
    if (checkoutOrderID) {
      if (!Array.isArray(cartIds) || cartIds.length === 0) {
        return NextResponse.json(
          { success: false, message: "cartIds must be a non-empty array" },
          { status: 400 }
        );
      }

      const updatedUser = await User.findOneAndUpdate(
        { _id: id },
        {
          $push: {
            orders: checkoutOrderID,
          },
          $pull: {
            carts: {
              _id: { $in: cartIds },
            },
          },
        },
        { new: true }
      );

      if (!updatedUser) {
        return NextResponse.json(
          {
            success: false,
            message: "User not found or carts not matched",
          },
          { status: 404 }
        );
      }

      return NextResponse.json({
        success: true,
        message: "Order added and cart items removed",
        data: updatedUser,
      });
    }


    if (!orderId || typeof qty !== "number") {
      return NextResponse.json(
        { success: false, message: "orderId and numeric qty are required" },
        { status: 400 }
      );
    }

    const updatedUser = await User.findOneAndUpdate(
      { _id: id, "carts._id": orderId },
      {
        $set: {
          "carts.$.qty": qty,
        },
      },
      { new: true }
    );

    if (!updatedUser) {
      return NextResponse.json(
        {
          success: false,
          message: "User or cart item not found",
        },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Cart quantity updated",
      data: updatedUser,
    });
  } catch (err) {
    return NextResponse.json(
      {
        success: false,
        message: err?.message || "Something went wrong",
      },
      { status: 500 }
    );
  }
}

export async function DELETE(req, { params }) {
  try {
    await dbConnect();
    const { searchParams } = new URL(req.url);
    const cartId = searchParams.get("cartId")?.trim() || "";
    const { id } = await params;
    const updatedUser = await User.findByIdAndUpdate(
      id,
      {
        $pull: {
          carts: { _id: cartId },
        },
      },
      { new: true }
    );

    return NextResponse.json({
      success: true,
      message: "Cart item deleted",
      deletedCart: updatedUser,
    });
  } catch (err) {
    return NextResponse.json({
      success: false,
      message: err?.message || "Something went wrong",
    });
  }
}