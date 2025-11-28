export const dynamic = "force-dynamic";
import ProductCard from "@/components/Products/ProductCard/ProductCard";
import dbConnect from "@/lib/dbConnect/dbConnect";
import product from "@/models/products/product/product";

const Collections = async ({ params }) => {
  const { slug } = await params;
  await dbConnect();

  const products = await product
    .find({ category: slug })
    .sort({ createdAt: -1 })
    .lean();

  const formattedProducts = products.map((prod) => ({
    ...prod,
    _id: prod._id.toString(),
  }));

  if (!formattedProducts || formattedProducts.length === 0) {
    return (
      <div className=" flex items-center justify-center text-xl ">
        No products found in this category.
      </div>
    );
  }

  return (
    <div className="">
      <h1 className="text-3xl font-bold mb-6 capitalize">{slug} Products</h1>

      <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {formattedProducts.map((prod) => (
          <ProductCard key={prod._id} product={JSON.stringify(prod)} />
        ))}
      </div>
    </div>
  );
};

export default Collections;
