"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

import Main from "./_components/maps/Main";
import Card from "./_components/ServiceCard";
import SearchSimulatorForm from "./_components/search_simulator/Main";

function Page() {
  const [content, setContent] = useState<"maps" | "search" | null>(null);

  const buttonStyle = `rounded-md font-semibold px-4 py-2`;

  return (
    <AnimatePresence mode="wait">
      {content === null && (
        <motion.div
          exit={{ scale: 0, opacity: 0 }}
          transition={{ duration: 0.5, type: "spring" }}
          className="h-screen flex flex-col justify-center items-center"
        >
          <h1 className="text-4xl text-center font-bold my-5 ">
            Select a service
          </h1>
          <div className="flex flex-col md:flex-row gap-5">
            <div onClick={() => setContent("maps")}>
              <Card
                key={1}
                img="https://res.cloudinary.com/dqkyatgoy/image/upload/v1698749901/google-maps-logo-3d-render_68185-818-removebg-preview_uwaqi8.png"
                title="Maps Ranking"
                description="See your business ranking on google maps, and see how you compare to your competitors"
              />
            </div>
            <div onClick={() => setContent("search")}>
              <Card
                key={2}
                img="https://res.cloudinary.com/dqkyatgoy/image/upload/v1698749897/google-icon-isolated_68185-565-removebg-preview_chkrc2.png"
                title="Search Simulator"
                description="Test your website's and google ads performance in any country in the world "
              />
            </div>
          </div>
        </motion.div>
      )}

      {content && (
        <div key={"switch"} className="flex justify-center gap-5 mt-28">
          <button
            className={
              content == "maps"
                ? buttonStyle + " bg-blue-700 text-white"
                : buttonStyle + " bg-white text-black"
            }
            onClick={() => {
              setContent("maps");
            }}
          >
            Maps Ranking
          </button>
          <button
            className={
              content == "search"
                ? buttonStyle + " bg-blue-700 text-white"
                : buttonStyle + " bg-white text-black"
            }
            onClick={() => {
              setContent("search");
            }}
          >
            Search Simulator
          </button>
        </div>
      )}
      {content === "maps" && (
        <motion.div
          key={"maps"}
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0, opacity: 0 }}
          transition={{ duration: 0.4, type: "spring" }}
        >
          <Main />
        </motion.div>
      )}
      {content === "search" && (
        <motion.div
          key={"search"}
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0, opacity: 0 }}
          transition={{ duration: 0.4, type: "spring" }}
        >
          <SearchSimulatorForm />
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default Page;
