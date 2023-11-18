"use client";
import LandingPageAnimatedSection from "@/app/components/LandingPages/LandingPageAnimatedSection";
import { socialMonitoringLandingPageItems } from "@/lib/data";
import Link from "next/link";
import { motion } from "framer-motion";

function page() {
  return (
    <div className="">
      <div className="min-h-screen w-screen main_gradient text-white">
        <motion.h1
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-5xl  text-center pt-48 font-bold "
        >
          All your Socials in one place
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-center mt-10 font-semibold"
        >
          Track, analyze and manage all your social media platforms in one
          place. <br />
          Use AI to analyze your insights in seconds
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
      <div className=" p-[30px]">
        <LandingPageAnimatedSection data={socialMonitoringLandingPageItems} />
      </div>
    </div>
  );
}

export default page;
