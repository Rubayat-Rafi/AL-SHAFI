export const dynamic = "force-dynamic";
import TopBar from "@/components/AdminDashboard/TopBar/TopBar";
import Navbar from "@/components/Navbar/Navbar";
import SideBar from "@/components/Products/Collections/SideBar/SideBar";
const Layout = async ({ children, params }) => {
  const { slug } = await params;
  return (
    <div className="">
      <TopBar />
      <Navbar />
      <div className=" max-w-[1400px] py-5 mx-auto px-5 flex flex-col md:flex-row  ">
        {/* Sidebar */}
        <aside className="w-full h-[85vh]  md:w-64  shadow-md p-4">
          <div className=" overflow-y-scroll">
            <SideBar slug={slug} />
          </div>
        </aside>

        {/* Main Content */}
        <main className=" h-[85vh] flex-1 ">
          <div className=" overflow-y-scroll ">{children}</div>
        </main>
      </div>
    </div>
  );
};

export default Layout;
