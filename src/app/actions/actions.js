import dbConnect from "@/lib/dbConnect/dbConnect";
import category from "@/models/products/category/category";
import Product from "@/models/products/product/product";

export async function AllCategories() {
  try {
    await dbConnect();
    const categories = await category.find().sort({ createdAt: -1 }).lean();
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
