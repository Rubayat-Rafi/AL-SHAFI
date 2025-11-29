"use client";

import { useState } from "react";
import Image from "next/image";

const GalleryImages = ({ thumbnail, images }) => {
  const thumb = JSON.parse(thumbnail); 
  const imgs = JSON.parse(images);

  const [mainImage, setMainImage] = useState(thumb);
  const [backgroundPos, setBackgroundPos] = useState("center");

  // handle zoom movement
  const handleMouseMove = (e) => {
    const { left, top, width, height } = e.currentTarget.getBoundingClientRect();

    const x = ((e.pageX - left) / width) * 100;
    const y = ((e.pageY - top) / height) * 100;

    setBackgroundPos(`${x}% ${y}%`);
  };

  return (
    <div className="space-y-4">
      {/* Main Image with Magnifying Effect */}
      <div
        className="w-full h-[400px] rounded-xl shadow-md bg-no-repeat bg-cover cursor-zoom-in"
        style={{
          backgroundImage: `url(${mainImage})`,
          backgroundSize: "200%",        // zoom level
          backgroundPosition: backgroundPos,
        }}
        onMouseMove={handleMouseMove}
        onMouseLeave={() => setBackgroundPos("center")}
      >
        {/* Hidden real image for maintaining layout */}
        <Image
          src={mainImage}
          width={600}
          height={600}
          priority
          alt="Zoom Image"
          className="opacity-0 w-full h-full"
        />
      </div>

      {/* Thumbnails */}
      <div className="grid grid-cols-4 gap-3">

        {/* First Thumbnail */}
        <Image
          src={thumb}
          width={150}
          height={150}
          alt="Thumbnail"
          priority
          onClick={() => setMainImage(thumb)}
          className="cursor-pointer rounded-lg border hover:scale-105 transition"
        />

        {/* Other Images */}
        {imgs?.map((img) => (
          <Image
            key={img._id}
            src={img.secure_url}
            width={150}
            height={150}
            priority
            alt="Gallery Image"
            onClick={() => setMainImage(img.secure_url)}
            className="cursor-pointer rounded-lg border hover:scale-105 transition"
          />
        ))}
      </div>
    </div>
  );
};

export default GalleryImages;
