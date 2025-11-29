import Image from "next/image";

const Banner = () => {
  return (
    <div className=" relative overflow-hidden max-w-[1440px] mx-auto xl:px-20 md:px-10 sm:px-2 px-4">
      <Image
        src="https://res.cloudinary.com/dusp1j4e0/image/upload/v1764307818/Al-Safi/banners/web-Banner_utejvo.webp"
        alt="banner"
        className="w-full h-auto"
        height={500}
        width={500}
      />
    </div>
  );
};

export default Banner;

// <div className="grid lg:grid-cols-5  place-items-center gap-4">
//       <div className="col-span-3 w-full">
//         <Image
//           src="https://res.cloudinary.com/dusp1j4e0/image/upload/v1764307818/Al-Safi/banners/web-Banner_utejvo.webp"
//           alt="banner"
//           className="w-full h-auto"
//           height={500}
//           width={500}
//         />
//       </div>

//       <div className="flex flex-col items-center space-y-4 col-span-2 w-full">
//         <Image
//           src="https://res.cloudinary.com/dusp1j4e0/image/upload/v1764307818/Al-Safi/banners/web-Banner_utejvo.webp"
//           alt="banner"
//           className="w-full h-auto"
//           height={600}
//           width={300}
//         />
//         <Image
//           src="https://res.cloudinary.com/dusp1j4e0/image/upload/v1764307818/Al-Safi/banners/web-Banner_utejvo.webp"
//           alt="banner"
//           className="w-full h-auto"
//           height={600}
//           width={300}
//         />
//       </div>
//     </div>
