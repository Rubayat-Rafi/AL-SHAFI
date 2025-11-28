export const dynamic = "force-dynamic";
import Categories from "@/components/Categories/Categories";
import Banner from "@/components/Home/Banner/Banner";
import Products from "@/components/Home/Products/Products";
import Navbar from "@/components/Navbar/Navbar";
import Topbar from "@/components/Topbar/Topbar";
export default function Home() {
  return (
    <div>
      <div>
        <Topbar />
        <Navbar />
        <Categories />
      </div>
      <Banner />
      <div className=" max-w-[1440px] mx-auto px-5">
        <div>
          <Products />
        </div>
      </div>
    </div>
  );
}
