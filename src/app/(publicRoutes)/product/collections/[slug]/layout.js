export const dynamic = "force-dynamic";
import Container from "@/components/Container/Container";
import SideBar from "@/components/Products/Collections/SideBar/SideBar";
import ProductSeenHistories from "@/components/Products/ProductSeenHistories/ProductSeenHistories";
const Layout = async ({ children, params }) => {
  const { slug } = await params;



  return (
    <div >
      <div>
        <div className=" bg-primary text-white py-10 mb-10">
          <p className=" text-center uppercase text-4xl font-montserrat">{slug}</p>
        </div>
        <Container>

          <div className="flex flex-col md:flex-row">
            <aside className="w-full  md:w-64 p-4">
              <div >
                <SideBar slug={slug} />
              </div>
            </aside>
            <main className=" flex-1">
              <div className="">{children}</div>
              <div>
                <ProductSeenHistories />
              </div>
            </main>
          </div>

        </Container>
      </div>
    </div>
  );
};

export default Layout;
