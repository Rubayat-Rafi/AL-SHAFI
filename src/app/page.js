export const dynamic = "force-dynamic";
import Banner from "@/components/Home/Banner/Banner";
import Products from "@/components/Home/Products/Products";
export default function Home() {
  return (
    <div>
      <Banner/>
      <div className=" max-w-[1440px] mx-auto px-5">
        <div>
          
          <Products />
        </div>
      </div>
    </div>
  );
}
