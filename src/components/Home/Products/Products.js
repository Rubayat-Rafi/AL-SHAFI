export const dynamic = "force-dynamic";
import ProductCard from "@/components/Products/ProductCard/ProductCard";
import { HomeProducts } from "@/app/actions/actions";
const Products = async () => {
const products = await HomeProducts()
  return (
    <div className="px-4 md:px-8 lg:px-16 py-8">
      <p className="text-center text-4xl font-bold mb-8">ALL PRODUCTS</p>

      <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
        {products?.map((prod, idx) => (
          <ProductCard key={prod._id || idx} product={JSON.stringify(prod)} />
        ))}
      </div>
    </div>
  );
};

export default Products;
