"use client";

import { useState } from "react";
import Image from "next/image";

const GalleryImages = ({ product }) => {
  const parseProduct = typeof product === "string" ? JSON.parse(product) : product;

  const thumb = parseProduct?.thumbnail;
  const imgs = parseProduct?.images;

  const [mainImage, setMainImage] = useState(thumb);
  const [backgroundPos, setBackgroundPos] = useState("center");

  const handleMouseMove = (e) => {
    const { left, top, width, height } =
      e.currentTarget.getBoundingClientRect();

    const x = ((e.pageX - left) / width) * 100;
    const y = ((e.pageY - top) / height) * 100;

    setBackgroundPos(`${x}% ${y}%`);
  };

  return (
    <div className="space-y-4">
      {/* Main Image + Zoom */}
      <div
        className="w-full h-[400px] rounded-xl shadow-md bg-no-repeat bg-cover cursor-zoom-in"
        style={{
          backgroundImage: `url(${mainImage?.secure_url})`,
          backgroundSize: "200%", // zoom level
          backgroundPosition: backgroundPos,
        }}
        onMouseMove={handleMouseMove}
        onMouseLeave={() => setBackgroundPos("center")}
      >
        <Image
          src={mainImage?.secure_url}
          width={600}
          height={600}
          priority
          alt={mainImage?.alt}
          className="opacity-0 w-full h-full"
        />
      </div>

      {/* Thumbnails */}
      <div className="grid grid-cols-4 gap-3">
        {/* Thumbnail */}
        <Image
          src={thumb?.secure_url}
          width={150}
          height={150}
          alt={thumb?.alt}
          priority
          onClick={() => setMainImage(thumb)}
          className="cursor-pointer rounded-lg border hover:scale-105 transition"
        />

        {/* Additional images */}
        {imgs?.map((img, idx) => (
          <Image
            key={idx}
            src={img?.secure_url}
            width={150}
            height={150}
            alt={img?.alt}
            priority
            onClick={() => setMainImage(img)}  // FIXED
            className="cursor-pointer rounded-lg border hover:scale-105 transition"
          />
        ))}
      </div>
    </div>
  );
};

export default GalleryImages;
