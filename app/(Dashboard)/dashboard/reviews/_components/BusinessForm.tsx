"use client";

import { Input, Button } from "@nextui-org/react";
import { motion, AnimatePresence } from "framer-motion";

import BusinessInfoCard from "./BusinessInfoCard";
import BusinessReviewSection from "./BusinessReviewSection";
import LoadingSkeleton from "@/components/Dashboard/LoadingSkeleton";

import { useFetchYelpAIReview } from "../_hooks/useFetchYelpAIReview";

export const itemVariants = {
  hidden: { y: 100, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { type: "spring", stiffness: 120, duration: 1 },
  },
};

export default function BusinessForm() {
  const { url, setUrl, review, info, loading, isInvalid, handleGetReviews } =
    useFetchYelpAIReview();

  return (
    <div className="flex flex-col w-full gap-3 p-2 md:p-8">
      <div className="flex flex-col gap-3 ">
        <h2 className="text-2xl  border-b-2 border-divider py-2  w-fit">
          Analyze your business reviews
        </h2>
        <Input
          value={url}
          type="text"
          label="Yelp page link"
          radius="full"
          variant="bordered"
          isInvalid={isInvalid}
          errorMessage={isInvalid && "Please enter a yelp link"}
          onValueChange={setUrl}
          endContent={
            <div className="flex items-center h-full">
              <Button
                isLoading={loading}
                isDisabled={!url || url.length < 1 || isInvalid}
                color="primary"
                radius="full"
                onPress={handleGetReviews}
              >
                Analyze
              </Button>
            </div>
          }
        />
      </div>
      <AnimatePresence>
        {info && <BusinessInfoCard info={info} />}
        {review && (
          <div>
            <motion.h2
              variants={itemVariants}
              className="text-2xl  py-2 text-center"
            >
              Results
            </motion.h2>
            {review.FinalReview && <BusinessReviewSection review={review} />}
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
              <LoadingSkeleton />
            </div>
            <div className="col-span-1 lg:col-span-5 w-full h-full border-slate-200/40 p-2">
              <LoadingSkeleton />
            </div>
            <div className="col-span-1 lg:col-span-2 w-full h-full border-slate-200/40 p-2">
              <LoadingSkeleton />
            </div>
            <div className="col-span-1 lg:col-span-2 w-full h-full border-slate-200/40 p-2">
              <LoadingSkeleton />
            </div>
            <div className="col-span-1 lg:col-span-2 w-full h-full border-slate-200/40 p-2">
              <LoadingSkeleton />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
