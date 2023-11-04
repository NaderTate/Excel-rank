import LandingPageAnimatedSection from "@/app/components/LandingPageAnimatedSection";
import { socialMonitoringLandingPageItems } from "@/lib/data";
import Link from "next/link";

function page() {
  return (
    <div className="bg-[#F3F3F3]">
      <div className="min-h-screen w-screen main_gradient text-white">
        <h1 className="text-5xl  text-center pt-48 font-bold ">
          All your Socials in one place
        </h1>
        <p className="text-center mt-10 font-semibold">
          Track, analyze and manage all your social media platforms in one
          place. <br />
          Use AI to analyze your insights in seconds
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
      <div className=" p-[30px]">
        <LandingPageAnimatedSection data={socialMonitoringLandingPageItems} />
      </div>
    </div>
  );
}

export default page;
