import dbConnect from "@/lib/dbConnect/dbConnect";
import UserOrder from "@/models/Order/UserOrder";
import Category from "@/models/Products/Category/Category";
import Product from "@/models/Products/Product/Product";

export async function AllCategories() {
  try {
    await dbConnect();
    const categories = await Category.find().sort({ createdAt: -1 }).lean();
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
    const products = await Product.find({ category: slug })
      .sort({ createdAt: -1 })
      .lean();
    const formattedProducts = products.map((prod) => ({
      ...prod,
      _id: prod._id.toString(),
    }));
    return formattedProducts;
  } catch (error) {
    throw new Error(error?.message);
  }
}
export async function FindProductBySlug(slug) {
  try {
    await dbConnect();
    const product = await Product.findOne({ slug }).lean();
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
    const product = await Product.findOne({ slug }).lean();
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
    const products = await Product.find({ slug: { $in: slugs } }).lean();
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
    const products = await Product.find().sort({ createdAt: -1 }).lean();
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
    const userOrders = await UserOrder.find().sort({ createdAt: -1 }).lean();
    const formattedOrders = userOrders.map((prod) => ({
      ...prod,
      _id: prod._id.toString(),
    }));
    return formattedOrders;
  } catch (error) {
    throw new Error(error?.message);
  }
}
