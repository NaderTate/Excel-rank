import { reviewsLandingPageItems } from "@/lib/data";
import CircleSocials from "../../components/CircleSocials";
import LandingPageAnimatedSection from "../../components/LandingPageAnimatedSection";

function page() {
  return (
    <div className="bg-[#F3F3F3] p-[30px] ">
      <div className="h-96 w-full mb-20 flex items-center justify-center bg-gray-200 animate-pulse">
        Something will be here...
      </div>
      <div className="space-y-[175px]">
        <div className="grid grid-cols-2 items-center">
          <div className="text-[36px]">
            The ultimate AI-powered review analyzer for any business. Whether
            it’s
            <span className="font-bold">
              Yelp, Google, Airbnb, TripAdvisor,
            </span>
            or any other website, we’ve got you covered.
          </div>
          <div className="m-auto mr-0">
            <CircleSocials />
          </div>
        </div>
        <LandingPageAnimatedSection data={reviewsLandingPageItems} />
      </div>
    </div>
  );
}

export default page;
