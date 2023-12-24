"use client";

import { Button } from "@nextui-org/react";

import Main from "./_sections/Main";
import SlidingLogos from "./_sections/SlidingLogos";
import LocalRanking from "./_sections/services/LocalRanking";
import SocialMonitor from "./_sections/services/SocialMonitor";
import ReviewManager from "./_sections/services/ReviewManager";

export default function page() {
  return (
    <main className="w-full overflow-x-hidden ">
      <Main />
      <section>
        <div className="w-full flex flex-col items-center gap-8">
          <SlidingLogos />
          <div className="w-full flex flex-col gap-10">
            <SocialMonitor />
            <LocalRanking />
            <ReviewManager />
          </div>
        </div>
      </section>
      <section className="w-full flex flex-col items-center gap-8 p-5 md:p-16">
        <div
          style={{
            backgroundImage: 'url("/images/main/rings.png")',
            backgroundRepeat: "no-repeat",
            backgroundPosition: "right center",
          }}
          className="w-full flex p-5 flex-col md:flex-row justify-between items-center  gap-8 bg-[#00B8D9] rounded-lg "
        >
          <div className="text-white font-semibold text-2xl">
            <p>Improve your rating, make more money</p>
          </div>
          <Button className="bg-white px-8 py-4 h-fit rounded-md font-bold text-[#00A8DB] hover:text-white hover:bg-[#00A8DB] transition-colors duration-300">
            Get your free trial
          </Button>
        </div>
      </section>
    </main>
  );
}
