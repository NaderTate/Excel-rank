"use client";
import LandingPageAnimatedSection from "@/app/components/LandingPages/LandingPageAnimatedSection";
import { localRankingLandinPageItems } from "@/lib/data";
import Link from "next/link";
import { motion } from "framer-motion";

function page() {
  return (
    <div className="bg-[#F3F3F3] ">
      <div className="min-h-screen w-screen main_gradient text-white">
        <motion.h1
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-5xl  text-center pt-48 font-bold "
        >
          Dominate on Google Maps <br /> SEO
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-center mt-10 font-semibold"
        >
          See how you rank on Google maps in different locations <br /> and how
          you stand against your competitors
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="flex justify-center"
        >
          <Link
            href={{ pathname: "/pricing" }}
            className="bg-white px-8 py-4 rounded-md font-bold text-[#00A8DB] hover:text-white hover:bg-[#00A8DB] transition-colors duration-300 mt-10 "
          >
            Get Started
          </Link>
        </motion.div>
      </div>
      <div className="p-[30px]">
        <LandingPageAnimatedSection data={localRankingLandinPageItems} />
      </div>
    </div>
  );
}

export default page;
