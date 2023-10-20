import LandingPageAnimatedSection from "@/app/components/LandingPageAnimatedSection";
import { localRankingLandinPageItems } from "@/lib/data";
function page() {
  return (
    <div className="bg-[#F3F3F3] p-[30px]">
      <div className="h-96 w-full mb-20 flex items-center justify-center bg-gray-200 animate-pulse">
        Something will be here...
      </div>
      <LandingPageAnimatedSection data={localRankingLandinPageItems} />
    </div>
  );
}

export default page;
