"use client";
import React from "react";
import Image from "next/image";
import { FaLongArrowAltRight } from "react-icons/fa";
import Banner from "@components/Banner";
import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "@nextui-org/react";

const arrImages: Array<string> = [
  "https://res.cloudinary.com/dqkyatgoy/image/upload/v1697733891/image_50_xzekzy.svg",
  "https://res.cloudinary.com/dqkyatgoy/image/upload/v1697733891/image_44_khna8j.svg",
  "https://res.cloudinary.com/dqkyatgoy/image/upload/v1697733890/image_45_svjlh7.svg",
  "https://res.cloudinary.com/dqkyatgoy/image/upload/v1697733892/trustpilot-2_1_gwmrrd.svg",
  "https://res.cloudinary.com/dqkyatgoy/image/upload/v1697733890/image_43_llhgbm.svg",
  "https://res.cloudinary.com/dqkyatgoy/image/upload/v1697733890/image_39_imisc4.svg",
  "https://res.cloudinary.com/dqkyatgoy/image/upload/v1697733902/image_48_xpn6xr.svg",
  "https://res.cloudinary.com/dqkyatgoy/image/upload/v1697733892/image_42_e131zo.svg",
];

const arrRankingFeatures: Array<string> = [
  "Google SEO",
  "Google Maps SEO",
  "Competitors Analysis",
];

export default function Main() {
  return (
    <main className="w-full overflow-x-hidden ">
      <section className=" p-2 md:p-5 main_gradient md:min-h-screen w-full flex flex-col md:flex-row items-center ">
        <div className="flex flex-col md:flex-row ">
          <div className=" max-w-4xl md:pl-28 flex flex-col gap-8">
            <motion.p
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-xl sm:text-3xl md:text-6xl text-white font-bold font-serif"
            >
              Grow your presence, reputation and revenue
              <span className="relative block w-fit mt-4">
                faster
                <Image
                  src="/images/main/faster.svg"
                  alt="faster"
                  width={100}
                  height={100}
                  layout="fixed"
                  className="absolute top-14 w-full right-0"
                />
              </span>
            </motion.p>
            <motion.p
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-white text-sm md:text-lg mt-8 font-serif"
            >
              With AI, you can analyze and manage your reviews across all
              platforms, <br /> Stay focused and save your time.
            </motion.p>
            <div className="flex flex-col md:flex-row gap-4">
              <motion.div
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.4 }}
              >
                <Link
                  href={{ pathname: "/reviews" }}
                  className="bg-white px-8 py-4 rounded-md font-bold text-[#00A8DB] hover:text-white hover:bg-[#00A8DB] transition-colors duration-300 w-fit
              "
                >
                  See How It Works
                </Link>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.6 }}
              >
                <Link
                  href={{ pathname: "/pricing" }}
                  className="text-white px-8 py-4 font-semibold rounded-md hover:text-[#00A8DB] hover:bg-white transition-colors duration-300"
                >
                  Get A Free Demo
                  <FaLongArrowAltRight className="inline-block ml-2 " />
                </Link>
              </motion.div>
            </div>
          </div>
        </div>
        <div className="relative w-1/4 self-start hidden md:block ">
          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.8 }}
            className="absolute top-[13vh] !w-[700px]"
          >
            <Image
              src="/images/main/group1.png"
              alt="group1"
              className=" translate-x-28 w-full drop-shadow-2xl"
              layout="responsive"
              width={600}
              height={600}
            />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 1 }}
            className="absolute top-2 !w-[300px]"
          >
            <Image
              src="/images/main/group3.png"
              alt="group1"
              className="translate-x-80 w-full drop-shadow-xl"
              layout="responsive"
              width={300}
              height={300}
            />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 1.2 }}
            className="absolute top-40 !w-[400px]"
          >
            <Image
              src="/images/main/group2.png"
              alt="group1"
              className=" -translate-x-10 drop-shadow-lg w-full scale-125"
              layout="responsive"
              width={300}
              height={300}
            />
          </motion.div>
          <div className="absolute !w-[700px]">
            <Image
              src="/images/main/ring.svg"
              alt="group1"
              className="w-full drop-shadow-2xl"
              layout="responsive"
              width={600}
              height={600}
            />
          </div>
        </div>
      </section>
      <section>
        {/* infinit horizontal auto scroll loop for the images */}
        <div className="w-full flex flex-col items-center gap-8">
          <h1 className="text-xl md:text-3xl font-bold text-center mt-20 gradient_text font-serif">
            Analyze thousands of comments and reviews on:
          </h1>
          <Banner images={arrImages} />
          <article className="w-full flex flex-col gap-10">
            <div className="flex flex-col-reverse md:flex-row gap-5 items-center">
              <div className="p-2 md:p-16 md:w-1/2 lg:w-1/3">
                <Image
                  src="/images/main/Group 21.png"
                  alt="group1"
                  className=""
                  // layout="responsive"
                  width={300}
                  height={500}
                />
              </div>
              <div className="p-2 md:p-16 md:w-1/2 lg:w-2/3 max-w-3xl flex flex-col gap-5">
                <p className="text-[#034D82] dark:text-blue-300 text-4xl font-bold font-serif">
                  Measure your posts impressions and reach
                </p>
                <p className="text-[#566d81] dark:text-gray-300">
                  Track your performance for metrics like follower evolution,
                  average engagement rate per post and reach and impressions
                  accross all your social media platforms from one dashboard.
                </p>
                <div className="group">
                  <Link href={{ pathname: "/socialmonitor" }}>
                    <p className="text-[#04AADD] text-semibold text-xl cursor-pointer hover:text-black dark:hover:text-gray-100 transition">
                      Learn more
                      <FaLongArrowAltRight className="inline-block ml-2 group-hover:translate-x-3 transition-transform" />
                    </p>
                  </Link>
                </div>
              </div>
            </div>
            <div className="flex flex-col md:flex-row gap-5 items-center">
              <div className="p-2 md:p-16 md:w-1/2  max-w-3xl flex flex-col gap-5">
                <p className="text-[#034D82] dark:text-blue-300 text-4xl font-bold font-serif">
                  Grow your local ranking
                </p>
                <p className="text-[#566d81] dark:text-gray-300">
                  See how your business ranks on Google Maps and who your top
                  copmetitors are.
                </p>
                <ul className="gap-2 flex flex-col">
                  {arrRankingFeatures.map((feature, index) => (
                    <li
                      key={index}
                      className="text-[#566d81] dark:text-gray-300"
                    >
                      <Image
                        src="images/check.svg"
                        alt="check"
                        width={20}
                        height={20}
                        layout="fixed"
                        className="inline-block mr-2"
                      />{" "}
                      {feature}
                    </li>
                  ))}
                </ul>
                <div className="group">
                  <Link
                    href={{ pathname: "/localranking" }}
                    className="text-[#04AADD] text-semibold text-xl cursor-pointer hover:text-black dark:hover:text-gray-100 transition"
                  >
                    Learn More
                    <FaLongArrowAltRight className="inline-block ml-2 group-hover:translate-x-3 transition-transform" />
                  </Link>
                </div>
              </div>
              <div className="p-2 md:pt-16 md:w-1/2 ">
                <Image
                  src="https://res.cloudinary.com/dqkyatgoy/image/upload/v1699020724/map_jfogmg.svg"
                  priority
                  alt="group1"
                  className="rounded-lg shadow-xl m-auto mr-10"
                  width={500}
                  height={500}
                />
              </div>
            </div>
            <div className="flex flex-col-reverse md:flex-row gap-5 items-center">
              <div className="p-2 md:p-16 md:w-[1000px] w-full">
                <Image
                  quality={100}
                  src="https://res.cloudinary.com/dqkyatgoy/image/upload/v1700253517/macbook_o24pbs.png"
                  alt="group1"
                  className="object-contain"
                  // layout="responsive"
                  width={2000}
                  height={2000}
                />
              </div>
              <div className="p-2 md:p-16 md:w-1/2 lg:w-2/3 max-w-3xl flex flex-col gap-5">
                <p className="text-[#034D82] dark:text-blue-300 text-4xl font-bold font-serif">
                  Summarize your reviews on Yelp, Google and other websites
                </p>
                <p className="text-[#566d81] dark:text-gray-300">
                  With the power of AI, you don&apos;t have to maually go
                  through thousands of reviews on different websites. Let the AI
                  do the hard work and give you a brief of what your cusomers
                  think about business.
                </p>
                <div className="group">
                  <Link href={{ pathname: "/reviews" }}>
                    <p className="text-[#04AADD] text-semibold text-xl cursor-pointer hover:text-black dark:hover:text-gray-100 transition">
                      Learn more
                      <FaLongArrowAltRight className="inline-block ml-2 group-hover:translate-x-3 transition-transform" />
                    </p>
                  </Link>
                </div>
              </div>
            </div>
          </article>
        </div>
      </section>
      <section className="w-full flex flex-col items-center gap-8 p-5 md:p-16">
        <article
          style={{
            backgroundImage: 'url("/images/main/rings.png")',
            backgroundRepeat: "no-repeat",
            backgroundPosition: "right center",
          }}
          className="w-full flex p-5 flex-col md:flex-row justify-between items-center  gap-8 bg-[#00B8D9] rounded-lg "
        >
          <div className="text-white font-semibold text-2xl">
            <p>Improve your rating, make more money</p>
          </div>
          <Button className="bg-white px-8 py-4 h-fit rounded-md font-bold text-[#00A8DB] hover:text-white hover:bg-[#00A8DB] transition-colors duration-300">
            Get your free trial
          </Button>
        </article>
      </section>
    </main>
  );
}
