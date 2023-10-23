"use client";
import { motion, AnimatePresence } from "framer-motion";
import { useInView } from "react-intersection-observer";

import { useEffect, useRef, useState } from "react";

function CircleSocials() {
  const { ref, inView } = useInView({
    threshold: 1,
    triggerOnce: true,
  });
  const Images: Array<string> = [
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
    const coordinates_: {}[] = [];
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
  const [coordinates, setCoordinates] = useState<{}[]>([]);
  useEffect(() => {
    setCoordinates(getCoordinates(Images));
  }, []);
  return (
    <div ref={ref}>
      {/* {inView && (
        <AnimatePresence mode="wait">
          <motion.div className="bg-white w-[486px] m-auto h-[486px] rounded-full relative shadow-xl">
            <motion.img
              src="https://res.cloudinary.com/dqkyatgoy/image/upload/v1697733892/image_42_e131zo.svg"
              alt=""
              className="absolute w-[65px] top-0 left-0 right-0 bottom-0 m-auto"
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
            />
            <motion.div
              className="flex justify-center items-center h-full"
              variants={{
                hidden: { opacity: 0, scale: 0 },
                visible: (i) => ({
                  opacity: 1,
                  scale: 1,
                  transition: { delay: i * 0.2 },
                }),
              }}
              initial="hidden"
              animate="visible"
              custom={coordinates?.length}
            >
              {coordinates?.map((coordinate: any, i: number) => (
                <motion.img
                  key={coordinate.url}
                  className="absolute w-[65px]"
                  style={{ left: coordinate.x, top: coordinate.y }}
                  src={coordinate.url}
                  variants={{
                    hidden: { opacity: 0, scale: 0 },
                    visible: {
                      opacity: 1,
                      scale: 1,
                      transition: { delay: i * 0.2 },
                    },
                  }}
                />
              ))}
            </motion.div>
          </motion.div>
        </AnimatePresence>
      )} */}
      {inView && (
        <div
          className={`bg-white max-w-[486px] m-auto max-h-[486px] rounded-full relative shadow-xl ${
            inView ? " opacity-100" : " opacity-0"
          } transition-opacity duration-300 `}
        >
          <div className="flex justify-center items-center h-full imgContainer ">
            {coordinates?.map((coordinate: any, i: number) => (
              <img
                key={coordinate.url}
                className={`absolute w-[65px] hover:rotate-[180] transition-transform duration-500 hover:scale-105`}
                style={{ left: coordinate.x, top: coordinate.y }}
                src={coordinate.url}
              />
            ))}
            <img
              src="https://res.cloudinary.com/dqkyatgoy/image/upload/v1697733892/image_42_e131zo.svg"
              alt=""
              className="absolute w-[65px] top-0 left-0 right-0 bottom-0 m-auto"
            />
          </div>
        </div>
      )}
    </div>
  );
}

export default CircleSocials;
