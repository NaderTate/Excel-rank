"use client";
import { useState } from "react";
import Main from "@/app/components/Dashboard/maps/Main";
import { AnimatePresence, motion } from "framer-motion";
import SearchSimulator from "@/app/components/Dashboard/SearchSimulator";
import Image from "next/image";

function Page() {
  const [content, setContent] = useState<"maps" | "search" | null>(null);

  const buttonStyle = `rounded-md font-semibold px-4 py-2`;
  const Card = ({
    img,
    title,
    description,
  }: {
    img: string;
    title: string;
    description: string;
  }) => {
    return (
      <motion.div
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0, opacity: 0 }}
        transition={{ duration: 0.5, type: "spring" }}
        className={`text-gray-900 flex flex-col items-center justify-center rounded-xl w-80 h-96 p-5 bg-gradient-to-tl from-fuchsia-400 via-sky-100 to-sky-400 transition-all cursor-pointer hover:shadow-xl`}
      >
        <Image
          alt="icon"
          width={200}
          height={200}
          src={img}
          className=" rounded-full object-contain "
        />
        <h1 className="text-2xl font-bold ">{title}</h1>
        <p className="text-center font-semibold mt-4">{description}</p>
      </motion.div>
    );
  };

  return (
    <AnimatePresence mode="wait">
      {content === null && (
        <motion.div
          exit={{ scale: 0, opacity: 0 }}
          transition={{ duration: 0.5, type: "spring" }}
          className="h-screen flex flex-col justify-center items-center"
        >
          <h1 className="text-4xl text-center font-bold my-5 ">
            Select a tool
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
          <SearchSimulator />
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default Page;
