"use client";

import Image from "next/image";
import { motion } from "framer-motion";

type Props = {
  text: string;
  img: string;
  i: number;
};

const Section = ({ text, img, i }: Props) => {
  return (
    <div className="lg:min-h-[345px] min-h-[100px]">
      <div
        className={`flex flex-col items-center xl:flex-row gap-10 justify-between ${
          i % 2 == 0 && "xl:flex-row-reverse"
        }`}
      >
        <div className={` ${i % 2 == 0 && " flex"} xl:max-w-[50vw]`}>
          <motion.p
            initial={{ y: 50, opacity: 0 }}
            whileInView={{
              y: 0,
              opacity: 1,
            }}
            transition={{
              duration: 0.85,
              delay: 0.25,
            }}
            viewport={{ once: true }}
            className="whitespace-pre-line text-lg sm:text-2xl lg:text-3xl xl:text-4xl text-center xl:text-start font-semibold"
          >
            {text}
          </motion.p>
        </div>
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          whileInView={{
            y: 0,
            opacity: 1,
          }}
          transition={{
            duration: 1,
          }}
          viewport={{ once: true }}
        >
          <Image
            priority
            width={600}
            height={600}
            src={img}
            className="rounded-[40px]  shadow-lg landingImg object-contain"
            alt=""
          />
        </motion.div>
      </div>
    </div>
  );
};
export default Section;
