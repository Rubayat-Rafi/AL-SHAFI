export const dynamic = "force-dynamic";
import { CategoryWiseProducts } from "@/actions/actions";
import ProductCard from "@/components/Products/ProductCard/ProductCard";
const Collections = async ({ params }) => {
  const { slug } = await params;
  const products = await CategoryWiseProducts(slug);
  if (!products || products.length === 0) {
    return (
      <div className=" h-[50vh] flex items-center justify-center text-xl ">
        No products found in this category.
      </div>
    );
  }
  return (
    <div className="">
      <h1 className="text-2xl font-bold mb-6 uppercase font-montserrat">{slug} Products</h1>
      <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((prod) => (
          <ProductCard key={prod._id} product={JSON.stringify(prod)} />
        ))}
      </div>
    </div>
  );
};

export default Collections;
