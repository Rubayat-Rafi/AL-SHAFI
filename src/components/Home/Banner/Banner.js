"use client";
import Image from "next/image";
import { useEffect, useState } from "react";

const Banner = () => {
  const slides = ["/banner.jpg", "/banner2.avif", "/banner3.avif"];

  const [index, setIndex] = useState(0);

  // Auto slide logic
  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % slides.length);
    }, 5000); // 5 seconds

    return () => clearInterval(interval);
  }, [slides.length]);

  return (
    <div className="max-w-[1440px] mx-auto xl:px-20 md:px-10 sm:px-2 px-4 py-6 ">
      <div className="grid grid-cols-10 gap-4 w-full h-[400px] md:h-[450px]">
        {/* Main Banner */}
        <div className="relative w-full h-full lg:col-span-8 col-span-10 overflow-hidden">
          {slides.map((src, i) => (
            <Image
              key={i}
              src={src}
              alt="banner"
              fill
              className={`object-cover transition-opacity duration-700 rounded-md ${
                i === index ? "opacity-100" : "opacity-0"
              }`}
            />
          ))}


          {/* DOTS AT BOTTOM CENTER */}
          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
            {slides.map((_, i) => (
              <button
                key={i}
                onClick={() => setIndex(i)}
                className={`w-3 h-3 rounded-full transition-all ${
                  index === i ? "bg-primary scale-125" : "bg-text/30"
                }`}
              />
            ))}
          </div>

        </div>

        {/* Side Banners */}
        <div className="w-full  md:h-full  col-span-10 lg:col-span-2 flex flex-row lg:flex-col space-x-4 lg:space-x-0 lg:space-y-4">
          {/* Small Image 1 */}
          <div className="relative w-full lg:h-1/2 h-full">
            <Image
              src="/post1.jpg"
              alt="post1"
              fill
              className="rounded-md object-cover"
            />
          </div>

          {/* Small Image 2 */}
          <div className="relative w-full lg:h-1/2 h-full">
            <Image
              src="/post2.webp"
              alt="post2"
              fill
              className="rounded-md object-cover"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Banner;
