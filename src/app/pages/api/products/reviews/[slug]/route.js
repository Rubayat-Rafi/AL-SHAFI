import dbConnect from "@/lib/dbConnect/dbConnect";
import Review from "@/models/Products/Review/Review";
import { NextResponse } from "next/server";

export async function GET(_req, { params }) {
  try {
    await dbConnect();
    const { slug } = await params;
    const reviews = await Review.find({ slug, status: true })
      .sort({ createdAt: -1 })
      .lean()
      .exec();
    const formattedReviews = reviews.map((review) => ({
      ...review,
      _id: review._id.toString(),
    }));

    return NextResponse.json({
      message: "Reviews",
      success: true,
      reviews: formattedReviews,
    });
  } catch (error) {
    return NextResponse.json({
      message: error?.message,
      success: false,
    });
  }
}
