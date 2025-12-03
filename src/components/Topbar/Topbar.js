import Link from "next/link";

const Topbar = () => {
  return (
    <div className=" bg-primary  py-2">
      <p className="text-center text-sm text-white text-clip text-shadow-2xs">
        আমাদের যে কোন পণ্য অর্ডার করতে কল বা WhatsApp করুন:{" "}
        <Link  href="tel:+8801718099526" className="hover:text-text transition-colors duration-300 ease-in-out hover:underline">+880 171 8099 526</Link>
      </p>
    </div>
  );
};

export default Topbar;
