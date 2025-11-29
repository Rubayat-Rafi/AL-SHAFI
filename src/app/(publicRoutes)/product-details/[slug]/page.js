export const dynamic = "force-dynamic";
import GalleryImages from "@/components/Products/GalleryImages/GalleryImages";
import RelatedProducts from "@/components/Products/RelatedProducts/RelatedProducts";
import { FindAProduct } from "@/app/actions/actions";
import AddCartBtn from "@/components/Ui/Products/AddCartBtn/AddCartBtn";
import ProductSeenHistories from "@/components/Products/ProductSeenHistories/ProductSeenHistories";
const Collections = async ({ params }) => {
  const { slug } = await params;
  const product = await FindAProduct(slug);
  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center text-xl font-semibold">
        Product Not Found!
      </div>
    );
  }
  return (
    <div className="container mx-auto px-5 py-10">
      <div className="grid md:grid-cols-2 gap-10">
        <div className="w-full">
          <GalleryImages
            thumbnail={JSON.stringify(product?.thumbnail.secure_url)}
            images={JSON.stringify(product?.images)}
          />
        </div>
        <div className="space-y-6">
          <h1 className="text-3xl font-bold">{product.productName}</h1>
          <p className="text-gray-500">Category: {product.category}</p>
          <div className="flex items-center gap-4">
            <span className="text-2xl font-semibold text-green-600">
              ৳{product.offerPrice}
            </span>
            <span className="text-xl line-through text-gray-400">
              ৳{product.regularPrice}
            </span>
          </div>
          <p className="text-sm text-gray-500">
            Stock:{" "}
            {product.stock > 0 ? (
              <span className="text-green-600 font-semibold">
                Available ({product.stock})
              </span>
            ) : (
              <span className="text-red-600 font-semibold">Out of Stock</span>
            )}
          </p>

          <p className="text-sm">
            Shipping:
            <span className="font-semibold capitalize">
              {" "}
              {product.shipping_fee}
            </span>
          </p>
          <AddCartBtn
            product={JSON.stringify(product)}
            styles={
              "bg-black text-white px-6 py-3 rounded-lg hover:bg-gray-900 duration-200"
            }
          />
        </div>
      </div>
      <div className="mt-8">
        <h2 className="text-xl font-semibold mb-2">Description</h2>
        <p className="text-gray-700 leading-relaxed">{product.descriptions}</p>
      </div>
      <div>
        <RelatedProducts slug={product?.category} />
      </div>
      <div>
        <ProductSeenHistories />
      </div>
    </div>
  );
};

export default Collections;
