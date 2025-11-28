export const dynamic = "force-dynamic";
import dbConnect from "@/lib/dbConnect/dbConnect";
import Product from "@/models/products/product/product";
import ProductCard from "../ProductCard/ProductCard";

const RelatedProducts = async ({ slug }) => {
  await dbConnect();
  const products = await Product.find({ category: slug })
    .sort({ createdAt: -1 })
    .lean();
  const formattedProducts = products.map((prod) => ({
    ...prod,
    _id: prod._id.toString(),
  }));

  if (!formattedProducts || formattedProducts.length === 0) {
    return (
      <div className="min-h-[150px] flex items-center justify-center text-gray-500">
        No related products found.
      </div>
    );
  }

  return (
    <section className="my-10">
      <h2 className="text-2xl md:text-3xl font-bold mb-6 border-b pb-2 text-gray-800">
        Related Products
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {formattedProducts.map((prod) => (
          <ProductCard key={prod._id} product={JSON.stringify(prod)} />
        ))}
      </div>
    </section>
  );
};

export default RelatedProducts;
