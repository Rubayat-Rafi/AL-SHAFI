export const dynamic = "force-dynamic";
import GalleryImages from "@/components/Products/GalleryImages/GalleryImages";
import RelatedProducts from "@/components/Products/RelatedProducts/RelatedProducts";
import { FindAProduct } from "@/actions/actions";
import AddCartBtn from "@/components/Ui/Products/AddCartBtn/AddCartBtn";
import ProductSeenHistories from "@/components/Products/ProductSeenHistories/ProductSeenHistories";
import ConverterToHtml from "@/components/ConverterToHtml/ConverterToHtml";
import {
  Package,
  ShoppingCart,
  Truck,
  Shield,
  Heart,
  Share2,
  Star,
  Check,
  Tag,
  Leaf,
} from "lucide-react";
import Link from "next/link";
import SendReviews from "@/components/Products/ReviewSection/SendReviews/SendReviews";
import ShowReviews from "@/components/Products/ReviewSection/ShowReviews/ShowReviews";

const Collections = async ({ params }) => {
  const { slug } = await params;
  const product = await FindAProduct(slug);

  if (!product) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-background">
        <div className="bg-surface p-12 rounded-2xl shadow-lg text-center border border-border">
          <div className="bg-error/10 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
            <Package className="w-10 h-10 text-error" strokeWidth={1.5} />
          </div>
          <h2 className="text-2xl font-bold text-text mb-2">
            Product Not Found
          </h2>
          <p className="text-text-secondary mb-6">
            দুঃখিত, এই পণ্যটি খুঁজে পাওয়া যায়নি
          </p>
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-white rounded-xl hover:bg-primary-dark transition-all duration-200"
          >
            <ShoppingCart className="w-4 h-4" />
            Back to Shop
          </Link>
        </div>
      </div>
    );
  }

  // Calculate discount percentage
  const discountPercentage = product.regularPrice
    ? Math.round(
        ((product.regularPrice - product.offerPrice) / product.regularPrice) *
          100
      )
    : 0;

  return (
    <div className="bg-background ">
      {/* Breadcrumb */}
      <div className="py-6">
        <div className="container mx-auto px-4 md:px-6 lg:px-10 py-4">
          <div className="flex items-center gap-2 text-sm text-text-secondary">
            <Link href="/" className="hover:text-primary transition-colors">
              Home
            </Link>
            <span>/</span>
            <Link href="/shop" className="hover:text-primary transition-colors">
              Shop
            </Link>
            <span>/</span>
            <Link
              href={`/category/${product.category}`}
              className="hover:text-primary transition-colors"
            >
              {product.category}
            </Link>
            <span>/</span>
            <span className="text-text font-medium">{product.productName}</span>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 md:px-6 lg:px-10 py-8 md:py-12">
        {/* Main Product Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 mb-12">
          {/* Gallery Images */}
          <div className="sticky top-24 self-start">
            <GalleryImages product={JSON.stringify(product)} />
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            {/* Title & Category */}
            <div>
              <div className="flex items-center gap-2 mb-3">
                <span className="inline-flex items-center gap-1 px-3 py-1 bg-primary/10 text-primary rounded-full text-sm font-semibold">
                  <Tag className="w-3.5 h-3.5" />
                  {product.category}
                </span>
                {product.isOrganic && (
                  <span className="inline-flex items-center gap-1 px-3 py-1 bg-success/10 text-success rounded-full text-sm font-semibold">
                    <Leaf className="w-3.5 h-3.5" />
                    100% Organic
                  </span>
                )}
              </div>
              <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-text leading-tight">
                {product.productName}
              </h1>

              {/* Rating (if available) */}
              <div className="flex items-center gap-2 mt-3">
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-4 h-4 ${
                        i < 4
                          ? "fill-accent-orange text-accent-orange"
                          : "text-border"
                      }`}
                      strokeWidth={1.5}
                    />
                  ))}
                </div>
                <span className="text-sm text-text-secondary">
                  (4.0) 128 reviews
                </span>
              </div>
            </div>

            {/* Price Section */}
            <div className="bg-linear-to-br from-primary/5 to-accent/5 p-6 rounded-2xl border border-primary/20">
              <div className="flex items-center gap-4 mb-2">
                <span className="text-3xl md:text-4xl font-bold text-primary">
                  ৳{product.offerPrice.toLocaleString()}
                </span>
                {product.regularPrice > product.offerPrice && (
                  <>
                    <span className="text-xl md:text-2xl line-through text-text-muted">
                      ৳{product.regularPrice.toLocaleString()}
                    </span>
                    <span className="px-3 py-1 bg-error text-white rounded-full text-sm font-bold">
                      {discountPercentage}% OFF
                    </span>
                  </>
                )}
              </div>
              {product.regularPrice > product.offerPrice && (
                <p className="text-success text-sm font-semibold">
                  You save ৳
                  {(product.regularPrice - product.offerPrice).toLocaleString()}
                </p>
              )}
            </div>

            {/* Stock & Shipping Info */}
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-surface p-4 rounded-xl border border-border">
                <div className="flex items-center gap-2 mb-1">
                  <Package className="w-4 h-4 text-primary" strokeWidth={2} />
                  <span className="text-sm font-semibold text-text">
                    Stock Status
                  </span>
                </div>
                {product.stock > 0 ? (
                  <div className="flex items-center gap-1">
                    <Check className="w-4 h-4 text-success" strokeWidth={2.5} />
                    <span className="text-success font-semibold text-sm">
                      Available ({product.stock} items)
                    </span>
                  </div>
                ) : (
                  <span className="text-error font-semibold text-sm">
                    Out of Stock
                  </span>
                )}
              </div>

              <div className="bg-surface p-4 rounded-xl border border-border">
                <div className="flex items-center gap-2 mb-1">
                  <Truck className="w-4 h-4 text-primary" strokeWidth={2} />
                  <span className="text-sm font-semibold text-text">
                    Shipping
                  </span>
                </div>
                <span className="text-text-secondary font-semibold text-sm capitalize">
                  {product.shipping_fee}
                </span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="space-y-3">
              <AddCartBtn
                product={JSON.stringify(product)}
                styles="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-primary to-primary-dark text-white px-6 py-4 rounded-xl hover:from-primary-dark hover:to-primary transition-all duration-300 font-semibold text-base shadow-lg hover:shadow-xl hover:scale-[1.02] active:scale-[0.98] group"
              >
                <ShoppingCart
                  className="w-5 h-5 group-hover:scale-110 transition-transform"
                  strokeWidth={2}
                />
                <span>Add to Cart</span>
              </AddCartBtn>

              <div className="grid grid-cols-2 gap-3">
                <button className="flex items-center justify-center gap-2 px-4 py-3 border-2 border-border hover:border-primary text-text hover:text-primary rounded-xl transition-all duration-200 font-medium hover:bg-primary/5">
                  <Heart className="w-4 h-4" strokeWidth={2} />
                  <span className="hidden sm:inline">Wishlist</span>
                </button>
                <button className="flex items-center justify-center gap-2 px-4 py-3 border-2 border-border hover:border-primary text-text hover:text-primary rounded-xl transition-all duration-200 font-medium hover:bg-primary/5">
                  <Share2 className="w-4 h-4" strokeWidth={2} />
                  <span className="hidden sm:inline">Share</span>
                </button>
              </div>
            </div>

            {/* Trust Badges */}
            <div className="grid grid-cols-3 gap-4 pt-6 border-t border-border">
              <div className="text-center">
                <div className="bg-primary/10 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-2">
                  <Shield className="w-6 h-6 text-primary" strokeWidth={2} />
                </div>
                <p className="text-xs text-text-secondary font-medium">
                  Secure Payment
                </p>
              </div>
              <div className="text-center">
                <div className="bg-primary/10 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-2">
                  <Truck className="w-6 h-6 text-primary" strokeWidth={2} />
                </div>
                <p className="text-xs text-text-secondary font-medium">
                  Fast Delivery
                </p>
              </div>
              <div className="text-center">
                <div className="bg-primary/10 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-2">
                  <Leaf className="w-6 h-6 text-primary" strokeWidth={2} />
                </div>
                <p className="text-xs text-text-secondary font-medium">
                  100% Natural
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Description Section */}
        <div className="bg-surface rounded-2xl p-6 md:p-8 shadow-sm border border-border mb-12">
          <h2 className="text-2xl md:text-3xl font-bold text-text mb-6 flex items-center gap-3">
            <div className="w-1 h-8 bg-primary rounded-full"></div>
            Product Description
          </h2>
          <div className="prose prose-sm md:prose-base max-w-none text-text-secondary leading-relaxed">
            <ConverterToHtml html={product.descriptions} className="" />
          </div>
        </div>
        <div className="">
          <SendReviews product={JSON.stringify(product)}/>
          <ShowReviews slug={JSON.stringify(product?.slug)}/>
        </div>

        {/* Related Products */}
        <div className="mb-12">
          <RelatedProducts slug={product?.category} />
        </div>

        {/* Recently Viewed */}
        <div>
          <ProductSeenHistories />
        </div>
      </div>
    </div>
  );
};

export default Collections;
