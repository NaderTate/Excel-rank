"use client";
import { useRef, useState } from "react";
import { HiStar } from "react-icons/hi";
import { GoDot } from "react-icons/go";
import { motion, AnimatePresence } from "framer-motion";
import SkeletonLoad from "@components/SkeletonLoad";

export default function Page() {
  const inputRef = useRef<HTMLInputElement>(null);
  const [review, setReview] = useState<any>(null);
  const [info, setInfo] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const handleGetReviews = async () => {
    const url = inputRef.current?.value;
    if (!url) return;
    setLoading(true);
    const biz = await fetch(`/api/bizinfo`, {
      method: "POST",
      body: JSON.stringify({ link: url }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const yelpData = await biz.json();
    setInfo(yelpData);
    console.log(yelpData);
    const res = await fetch("/api/review", {
      method: "POST",
      body: JSON.stringify({ link: url }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await res.json();
    console.log(data);
    setReview(JSON.parse(JSON.parse(data.aiResponse).data.content));
    setLoading(false);
  };

  const itemVariants = {
    hidden: { y: 100, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: "spring", stiffness: 120, duration: 1 },
    },
  };

  const listItemContainerVariant = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 2 },
    },
  };

  return (
    <div className="flex flex-col w-full gap-3 p-2 md:p-8">
      <div className="flex flex-col gap-3 ">
        <h2 className="text-2xl text-gray-900 border-b py-2 border-gray-300/50 w-fit">
          GET REVIEWS FROM CUSTOMERS
        </h2>
        <div className="relative w-full items-center flex">
          <input
            ref={inputRef}
            type="text"
            placeholder="Input the business URL"
            className="w-full px-4 py-3 border border-gray-300 rounded-full focus:ring-2 focus:border-transparent"
          />
          <button
            onClick={handleGetReviews}
            type="button"
            className="absolute gradient_bg right-0 m-1 rounded-full w-20 py-2 text-gray-200 hover:text-white transition"
          >
            Get Reviews
          </button>
        </div>
      </div>
      <AnimatePresence>
        {info && (
          <motion.div
            variants={itemVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
            className="w-full text-slate-100"
          >
            <div>
              <h1 className="text-2xl text-gray-900 py-2 text-center">
                {info.name}
              </h1>
              <p className="text-gray-500 text-center">
                {info.location?.address1} | {info.location?.city} |{" "}
                {info.location?.country}
              </p>
            </div>
            {info.image && (
              <div className="flex justify-center">
                <img
                  className=" w-3/4 md:w-1/2 rounded-xl border border-gray-500/30 shadow-xl"
                  src={info.image}
                  alt="business image"
                />
              </div>
            )}
          </motion.div>
        )}
        {loading && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="w-full grid grid-cols-1 lg:grid-cols-6 gap-3 text-slate-100"
          >
            <div className="col-span-1 w-full h-full border-slate-200/40 p-2">
              <SkeletonLoad />
            </div>
            <div className="col-span-1 lg:col-span-5 w-full h-full border-slate-200/40 p-2">
              <SkeletonLoad />
            </div>
            <div className="col-span-1 lg:col-span-2 w-full h-full border-slate-200/40 p-2">
              <SkeletonLoad />
            </div>
            <div className="col-span-1 lg:col-span-2 w-full h-full border-slate-200/40 p-2">
              <SkeletonLoad />
            </div>
            <div className="col-span-1 lg:col-span-2 w-full h-full border-slate-200/40 p-2">
              <SkeletonLoad />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      <AnimatePresence>
        {review && (
          <div>
            <motion.h2
              variants={itemVariants}
              className="text-2xl text-gray-900 py-2 text-center"
            >
              Results
            </motion.h2>
            {review.FinalReview && (
              <motion.ul
                variants={listItemContainerVariant}
                initial="hidden"
                animate="visible"
                className="grid grid-cols-1 lg:grid-cols-6 gap-3 text-slate-100 "
              >
                <motion.li
                  variants={itemVariants}
                  initial="hidden"
                  animate="visible"
                  className="gradient_bg_dark rounded-2xl shadow-lg col-span-1 w-full h-full border-slate-200/40 p-2"
                >
                  <h3 className="text-xl m-2 w-fit">Overall Rating</h3>
                  <p
                    style={{
                      textShadow: "5px 5px 10px rgba(0,0,0,0.8)",
                    }}
                    className="text-white h-3/5 flex items-center justify-center p-8 text-5xl text-center"
                  >
                    {review.OverAllRating}
                    <HiStar className="text-4xl text-amber-300 mt-2" />
                  </p>
                </motion.li>
                <motion.li
                  variants={itemVariants}
                  initial="hidden"
                  animate="visible"
                  className="lg:col-span-5 gap-3 flex flex-col justify-between gradient_bg_dark border border-slate-200/40 rounded-2xl shadow-lg p-2"
                >
                  <h3 className="text-xl m-2 w-fit">Final Review</h3>
                  <p className="text-white m-2 drop-shadow-xl font-sans text-justify first-letter:ml-6">
                    {review.FinalReview}
                  </p>
                </motion.li>
                <motion.li
                  variants={itemVariants}
                  initial="hidden"
                  animate="visible"
                  className="lg:col-span-2 gap-3 flex flex-col  gradient_bg_dark border border-slate-200/40 rounded-2xl shadow-lg p-2"
                >
                  <h3 className="text-xl m-2 w-fit">Prositive Points</h3>
                  {review.max3PositiveThings.map((item: any, index: number) => (
                    <p key={item + "positive" + index} className="text-white">
                      <GoDot className="inline-block mx-2" />
                      {item}
                    </p>
                  ))}
                </motion.li>
                <motion.li
                  variants={itemVariants}
                  initial="hidden"
                  animate="visible"
                  className="lg:col-span-2 gap-3 flex flex-col gradient_bg_dark border border-slate-200/40 rounded-2xl shadow-lg p-2"
                >
                  <h3 className="text-xl m-2 w-fit">Negative Points</h3>
                  {review.max3NegativeThings.map((item: any, index: number) => (
                    <p key={item + "negative" + index} className="text-white">
                      <GoDot className="inline-block mx-2" />
                      {item}
                    </p>
                  ))}
                </motion.li>
                <motion.li
                  variants={itemVariants}
                  initial="hidden"
                  animate="visible"
                  className="lg:col-span-2 gap-3 flex flex-col gradient_bg_dark border border-slate-200/40 rounded-2xl shadow-lg p-2"
                >
                  <h3 className="text-xl m-2 w-fit">Suggestions</h3>
                  {review.RecommendationsForImprovement.map(
                    (item: any, index: number) => (
                      <p key={item + "recom" + index} className="text-white">
                        <GoDot className="inline-block mx-2" />
                        {item}
                      </p>
                    )
                  )}
                </motion.li>
              </motion.ul>
            )}
          </div>
        )}
        {loading && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="w-full grid grid-cols-1 lg:grid-cols-6 gap-3 text-slate-100"
          >
            <div className="col-span-1 w-full h-full border-slate-200/40 p-2">
              <SkeletonLoad />
            </div>
            <div className="col-span-1 lg:col-span-5 w-full h-full border-slate-200/40 p-2">
              <SkeletonLoad />
            </div>
            <div className="col-span-1 lg:col-span-2 w-full h-full border-slate-200/40 p-2">
              <SkeletonLoad />
            </div>
            <div className="col-span-1 lg:col-span-2 w-full h-full border-slate-200/40 p-2">
              <SkeletonLoad />
            </div>
            <div className="col-span-1 lg:col-span-2 w-full h-full border-slate-200/40 p-2">
              <SkeletonLoad />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
