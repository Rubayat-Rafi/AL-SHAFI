import dbConnect from "@/lib/dbConnect/dbConnect";
import UserOrder from "@/models/Order/UserOrder";
import Category from "@/models/Products/Category/Category";
import Product from "@/models/Products/Product/Product";
import { cookies } from "next/headers";
import * as jose from "jose";
import User from "@/models/User/User";
import { authHelper } from "@/helper/user/authHelper/authHelper";
import Review from "@/models/Products/Review/Review";
const JWT_SECRET = process.env.JWT_SECRET;

export async function AllCategories() {
  try {
    await dbConnect();
    const categories = await Category.find()
      .sort({ createdAt: -1 })
      .lean()
      .exec();
    const formattedCategories = categories.map((cat) => ({
      ...cat,
      _id: cat._id.toString(),
    }));

    return formattedCategories;
  } catch (error) {
    throw new Error(error?.message);
  }
}

export async function CategoryWiseProducts(slug) {
  try {
    await dbConnect();
    const query = slug === "all-products" ? {} : { category: slug };
    const products = await Product.find(query)
      .sort({ createdAt: -1 })
      .lean()
      .exec();
    const formattedProducts = products.map((prod) => ({
      ...prod,
      _id: prod._id.toString(),
    }));
    return formattedProducts;
  } catch (error) {
    throw new Error(error?.message);
  }
}

// ==============================================================================
export async function FindProductBySlug(slug) {
  try {
    await dbConnect();
    const product = await Product.findOne({ slug }).lean().exec();
    const formattedProduct = {
      ...product,
      _id: product._id.toString(),
      createdAt: product.createdAt?.toString(),
      updatedAt: product.updatedAt?.toString(),
    };
    return formattedProduct;
  } catch (error) {
    throw new Error(error?.message);
  }
}

export async function FindAProduct(slug) {
  try {
    await dbConnect();
    const product = await Product.findOne({ slug }).lean().exec();
    const formattedProduct = {
      ...product,
      _id: product._id.toString(),
      createdAt: product.createdAt?.toString(),
      updatedAt: product.updatedAt?.toString(),
    };
    return formattedProduct;
  } catch (error) {
    throw new Error(error?.message);
  }
}

export async function FindProducstBySlugs(slugs) {
  try {
    await dbConnect();
    const products = await Product.find({ slug: { $in: slugs } })
      .lean()
      .exec();
    const formattedProducts = products.map((p) => ({
      ...p,
      _id: p._id.toString(),
    }));
    return formattedProducts;
  } catch (error) {
    throw new Error(error?.message);
  }
}

export async function HomeProducts() {
  try {
    await dbConnect();
    const products = await Product.find().sort({ createdAt: -1 }).lean().exec();
    const formattedProducts = products.map((prod) => ({
      ...prod,
      _id: prod._id.toString(),
    }));
    return formattedProducts;
  } catch (error) {
    throw new Error(error?.message);
  }
}
export async function AllProducts() {
  try {
    await dbConnect();
    const products = await Product.find().sort({ createdAt: -1 }).lean().exec();
    const formattedProducts = products.map((prod) => ({
      ...prod,
      _id: prod._id.toString(),
    }));
    return formattedProducts;
  } catch (error) {
    throw new Error(error?.message);
  }
}
// ==============================================================================================================
export async function AllUserOrders() {
  try {
    await dbConnect();
    const userOrders = await UserOrder.find()
      .sort({ createdAt: -1 })
      .lean()
      .exec();
    const formattedOrders = userOrders.map((prod) => ({
      ...prod,
      _id: prod._id.toString(),
    }));
    return formattedOrders;
  } catch (error) {
    throw new Error(error?.message);
  }
}
export async function ordersByStatus({ status }) {
  try {
    await dbConnect();
    const userOrders = await UserOrder.find({ status: status })
      .sort({ createdAt: -1 })
      .lean()
      .exec();
    const formattedOrders = userOrders.map((prod) => ({
      ...prod,
      _id: prod._id.toString(),
    }));
    return formattedOrders;
  } catch (error) {
    throw new Error(error?.message);
  }
}
// export async function ordersByInvoice({ invices }) {
//   try {
//     await dbConnect();
//     const userOrders = await UserOrder.find({ status: status })
//       .sort({ createdAt: -1 })
//       .lean()
//       .exec();
//     const formattedOrders = userOrders.map((prod) => ({
//       ...prod,
//       _id: prod._id.toString(),
//     }));
//     return formattedOrders;
//   } catch (error) {
//     throw new Error(error?.message);
//   }
// }

// ========================================================================================

export const AuthUser = async () => {
  try {
    await dbConnect();
    const cookieStore = await cookies();
    const tokenCookie = cookieStore.get("auth_token");
    if (!tokenCookie) return null;
    const token = tokenCookie.value;
    const { payload } = await jose.jwtVerify(
      token,
      new TextEncoder().encode(JWT_SECRET)
    );
    const user = await User.findById(payload?.id)
      .select("-password")
      .lean()
      .exec();
    return user || null;
  } catch (err) {
    console.error("Token verification failed:", err);
    return null;
  }
};

// ======================================================
// reviews sections
export async function ReviewsBySlug({ slug }) {
  try {
    await dbConnect();
    const reviews = await Review.find({ slug, status: true })
      .sort({ createdAt: -1 })
      .lean()
      .exec();
    const formattedReviews = reviews.map((review) => ({
      ...review,
      _id: review._id.toString(),
    }));
    return formattedReviews;
  } catch (error) {
    throw new Error(error?.message);
  }
}
export async function ReviewsByStatus({ st }) {
  try {
    await dbConnect();
    const reviews = await Review.find({ status: st })
      .sort({ createdAt: -1 })
      .lean()
      .exec();
    const formattedReviews = reviews.map((review) => ({
      ...review,
      _id: review._id.toString(),
    }));
    return formattedReviews;
  } catch (error) {
    throw new Error(error?.message);
  }
}
