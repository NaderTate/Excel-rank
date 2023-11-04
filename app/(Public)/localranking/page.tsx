import LandingPageAnimatedSection from "@/app/components/LandingPageAnimatedSection";
import { localRankingLandinPageItems } from "@/lib/data";
import Link from "next/link";
function page() {
  return (
    <div className="bg-[#F3F3F3] ">
      <div className="min-h-screen w-screen main_gradient text-white">
        <h1 className="text-5xl  text-center pt-48 font-bold ">
          Dominate on Google Maps <br /> SEO
        </h1>
        <p className="text-center mt-10 font-semibold">
          See how you rank on Google maps in different locations <br /> and how
          you stand against your competitors
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
      <div className="p-[30px]">
        <LandingPageAnimatedSection data={localRankingLandinPageItems} />
      </div>
    </div>
  );
}

export default page;
