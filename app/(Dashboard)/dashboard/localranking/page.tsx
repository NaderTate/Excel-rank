"use client";
import { useState } from "react";
import Main from "@/app/components/maps/Main";
import { AnimatePresence, motion } from "framer-motion";
import SearchSimulator from "@/app/components/SearchSimulator";

function page() {
  const [content, setContent] = useState<"maps" | "search" | null>(null);
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
        className="flex flex-col items-center justify-center rounded-xl w-80 h-96 p-5 bg-gradient-to-tl from-fuchsia-400 via-sky-100 to-sky-400 transition-all cursor-pointer"
      >
        <img src={img} className=" rounded-full h-52 object-contain " />
        <h1 className="text-2xl font-bold ">{title}</h1>
        <p className="text-center font-semibold mt-4">{description}</p>
      </motion.div>
    );
  };
  return (
    <AnimatePresence mode="wait">
      {content == null && (
        <div className="h-screen flex flex-col justify-center items-center">
          <h1 className="text-4xl text-center font-bold my-5 mt-16">
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
        </div>
      )}
      {content === "maps" && (
        <motion.div
          key={"maps"}
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0, opacity: 0 }}
          transition={{ duration: 0.5, type: "spring" }}
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
          transition={{ duration: 0.5, type: "spring" }}
        >
          <SearchSimulator />
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default page;
