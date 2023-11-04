"use client";
import { useInView } from "react-intersection-observer";
import { useState, useEffect } from "react";
import { reviewsLandingPageItems } from "@/lib/data";
import CircleSocials from "../../components/LandingPages/CircleSocials";
import LandingPageAnimatedSection from "../../components/LandingPages/LandingPageAnimatedSection";
import GPT_Type_Effect from "@/app/components/LandingPages/GPT_Type_Effect";
import Link from "next/link";

function Page() {
  const { ref, inView } = useInView({
    threshold: 0.7,
  });
  const [inview, setInView] = useState(false);
  const text = `The ultimate AI-powered review analyzer for any business. Whether it’s Yelp, Google, Airbnb, TripAdvisor, or any other website, we’ve got you covered.`;
  useEffect(() => {
    if (inView) {
      setInView(true);
    }
  }, [inView]);

  return (
    <div className="bg-[#F3F3F3]  ">
      <div className="min-h-screen w-screen   main_gradient text-white">
        <h1 className="text-5xl  text-center pt-48 font-bold ">
          Analyze thousands of reviews <br /> within seconds
        </h1>
        <p className="text-center mt-10 font-semibold">
          Use the power of AI to summarize thousands of reviews from Yelp,
          Google, <br /> TripAdvisor, Airbnb, and all social media platforms
        </p>
        <div className="flex justify-center">
          <Link
            href={{ pathname: "/pricing" }}
            className="bg-white px-8 py-4 rounded-md font-bold text-[#00A8DB] hover:text-white hover:bg-[#00A8DB] transition-colors duration-300 mt-10 "
          >
            Get Started
          </Link>
        </div>
      </div>
      <div className="space-y-[175px] min-h-[486px] p-[30px]">
        <div ref={ref} className="min-h-[300px]">
          {inview && (
            <div className="flex flex-col lg:flex-row items-center">
              <div className="xl:max-w-[50vw]">
                <GPT_Type_Effect text={text} />
              </div>
              <div className="m-auto lg:mr-0 min-h-[486px]">
                <CircleSocials />
              </div>
            </div>
          )}
        </div>

        <LandingPageAnimatedSection data={reviewsLandingPageItems} />
      </div>
    </div>
  );
}

export default Page;
