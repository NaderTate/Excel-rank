"use client";
import { useInView } from "react-intersection-observer";
import { useState, useEffect } from "react";
import { reviewsLandingPageItems } from "@/lib/data";
import CircleSocials from "../../components/CircleSocials";
import LandingPageAnimatedSection from "../../components/LandingPageAnimatedSection";
import GPT_Type_Effect from "@/app/components/GPT_Type_Effect";

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
    <div className="bg-[#F3F3F3] p-[30px] ">
      <div className="h-96 w-full mb-20 flex items-center justify-center bg-gray-200 animate-pulse">
        Something will be here...
      </div>
      <div className="space-y-[175px] min-h-[486px]">
        <div ref={ref} className="min-h-[300px]">
          {inview && (
            <div className="flex flex-col lg:flex-row items-center">
              <div className="">
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
