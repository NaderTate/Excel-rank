import { motion } from "framer-motion";

import { itemVariants } from "./BusinessForm";

import { YelpReview } from "@/types";

import { GoDot } from "react-icons/go";
import { HiStar } from "react-icons/hi";

type Props = { review: YelpReview };

const BusinessReviewSection = ({ review }: Props) => {
  const containerVariant = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 2 },
    },
  };
  return (
    <motion.ul
      variants={containerVariant}
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
          <div>
            <HiStar className="text-4xl text-amber-300 mt-2" />
          </div>
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
  );
};

export default BusinessReviewSection;
