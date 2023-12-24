"use client";

import Link from "next/link";
import { motion } from "framer-motion";

import SocialsCircle from "../_components/SocialsCircle";
import LandingPageAnimatedSection from "../_components/AnimatedSections";

import { reviewsLandingPageItems } from "./data";

function Page() {
  return (
    <>
      <div className="min-h-screen w-screen main_gradient text-white">
        <motion.h1
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-5xl  text-center pt-48 font-bold "
        >
          Analyze thousands of reviews <br /> within seconds
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-center mt-10 font-semibold"
        >
          Use the power of AI to summarize thousands of reviews from Yelp,
          Google, <br /> TripAdvisor, Airbnb, and all social media platforms
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
      <div className="space-y-[175px] min-h-[486px] p-[30px]">
        <div className="min-h-[300px]">
          <div className="flex flex-col lg:flex-row items-center justify-center">
            <div className="xl:max-w-[50vw]">
              <p className="whitespace-pre-line text-lg sm:text-2xl lg:text-3xl xl:text-4xl text-center xl:text-start font-semibold">
                The ultimate AI-powered review analyzer for any business.
                Whether it’s Yelp, Google, Airbnb, TripAdvisor, or any other
                website, we’ve got you covered.
              </p>
            </div>
            <div className=" lg:mr-0 min-h-[486px] lg:m-auto scale-75 lg:scale-100 flex justify-center">
              <SocialsCircle />
            </div>
          </div>
        </div>
        <LandingPageAnimatedSection data={reviewsLandingPageItems} />
      </div>
    </>
  );
}

export default Page;
