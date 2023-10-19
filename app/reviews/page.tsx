import React from "react";
import CircleSocials from "../components/CircleSocials";

function page() {
  return (
    <div className="bg-[#F3F3F3] p-[30px] mt-96">
      <div className="h-96 w-full mb-20 flex items-center justify-center bg-gray-200 animate-pulse">
        Something will be here...
      </div>
      <div className="grid grid-cols-2 items-center">
        <div className="text-4xl">
          The ultimate AI-powered review analyzer for any business. Whether it’s
          <span className="font-bold">
            {" "}
            Yelp, Google, Airbnb, TripAdvisor,{" "}
          </span>
          or any other website, we’ve got you covered.
        </div>
        <div className="m-auto mr-0">
          <CircleSocials />
        </div>
      </div>
    </div>
  );
}

export default page;
