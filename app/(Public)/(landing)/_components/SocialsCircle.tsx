"use client";

import { motion } from "framer-motion";

import { useEffect, useState } from "react";

function SocialsCircle() {
  const Images = [
    "https://res.cloudinary.com/dqkyatgoy/image/upload/v1697733891/image_50_xzekzy.svg",
    "https://res.cloudinary.com/dqkyatgoy/image/upload/v1697733891/image_44_khna8j.svg",
    "https://res.cloudinary.com/dqkyatgoy/image/upload/v1697733890/image_45_svjlh7.svg",
    "https://res.cloudinary.com/dqkyatgoy/image/upload/v1697733892/trustpilot-2_1_gwmrrd.svg",
    "https://res.cloudinary.com/dqkyatgoy/image/upload/v1697733890/image_43_llhgbm.svg",
    "https://res.cloudinary.com/dqkyatgoy/image/upload/v1697733890/image_39_imisc4.svg",
    "https://res.cloudinary.com/dqkyatgoy/image/upload/v1697733902/image_48_xpn6xr.svg",
  ];

  // take the array of images and get the absolute x and y coordinates for each image so that they form a circle
  // the images should be spaced evenly around the circle
  const getCoordinates = (images: Array<string>) => {
    const coordinates_: { url: string; x: number; y: number }[] = [];
    const radius = 160;
    const center = 210;
    const angle = (2 * Math.PI) / images.length; // Calculate the angle between each image
    for (let i = 0; i < images.length; i++) {
      const x = center + radius * Math.cos(i * angle); // Multiply the angle by i to distribute the images evenly
      const y = center + radius * Math.sin(i * angle); // Multiply the angle by i to distribute the images evenly
      coordinates_.push({ x, y, url: images[i] });
    }
    return coordinates_;
  };

  const [coordinates, setCoordinates] = useState<
    { url: string; x: number; y: number }[]
  >([]);

  useEffect(() => {
    setCoordinates(getCoordinates(Images));
  }, []);
  return (
    <div>
      <motion.div
        initial={{ opacity: 0, scale: 0 }}
        whileInView={{ opacity: 1, scale: 1 }}
        className={`bg-white m-auto h-[485px] w-[485px] rounded-full relative shadow-xl transition-opacity duration-300 `}
      >
        <div className="flex justify-center items-center h-full  ">
          {coordinates?.map((coordinate, i) => (
            <motion.img
              initial={{ opacity: 0, scale: 0 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: i * 0.2 }}
              viewport={{ once: true }}
              key={coordinate.url}
              className={`absolute w-[65px] hover:rotate-[180] transition-transform duration-500 hover:scale-105`}
              style={{ left: coordinate.x, top: coordinate.y }}
              src={coordinate.url}
            />
          ))}
          <motion.img
            initial={{ opacity: 0, scale: 0 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            src="https://res.cloudinary.com/dqkyatgoy/image/upload/v1697733892/image_42_e131zo.svg"
            alt=""
            className="absolute w-[65px] top-0 left-0 right-0 bottom-0 m-auto"
          />
        </div>
      </motion.div>
    </div>
  );
}

export default SocialsCircle;
