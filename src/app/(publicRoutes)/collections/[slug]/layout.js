export const dynamic = "force-dynamic";

import Categories from "@/components/Categories/Categories";
import Navbar from "@/components/Navbar/Navbar";
import SideBar from "@/components/Products/Collections/SideBar/SideBar";
import Topbar from "@/components/Topbar/Topbar";
const Layout = async ({ children, params }) => {
  const { slug } = await params;
  return (
    <div className="">
      <div>
        <div className=" bg-yellow-600 text-white py-5">
          <p className=" text-center uppercase text-5xl">{slug}</p>
        </div>
        <div className="max-w-[1400px] py-5 mx-auto px-5">
          <div className="  flex flex-col md:flex-row  ">
            {/* Sidebar */}
            <aside className="w-full  md:w-64 p-4">
              <div className=" overflow-y-scroll">
                <SideBar slug={slug} />
              </div>
            </aside>

            {/* Main Content */}
            <main className=" flex-1 ">
              <div className=" overflow-y-scroll ">{children}</div>
            </main>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Layout;
