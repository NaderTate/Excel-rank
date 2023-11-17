"use client";
import { useMemo, useState } from "react";
import { HiStar } from "react-icons/hi";
import { GoDot } from "react-icons/go";
import { motion, AnimatePresence } from "framer-motion";
import SkeletonLoad from "@components/SkeletonLoad";
import { useSession } from "next-auth/react";
import { handleReviews } from "@/lib/actions/yelp";
import { Input, Button, Tooltip } from "@nextui-org/react";
import { YelpBusiness } from "@/app/types";
export default function Main() {
  const [review, setReview] = useState<any>(null);
  const [info, setInfo] = useState<YelpBusiness | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [url, setUrl] = useState<string>("");
  const { data: session } = useSession();
  function validateYelpLink(link: string) {
    const yelpRegex = /^https?:\/\/(www\.)?yelp\.com\/biz\/[a-zA-Z0-9_-]+$/;
    return yelpRegex.test(link);
  }
  const isInvalid = useMemo(() => {
    if (url === "") return false;

    return validateYelpLink(url) ? false : true;
  }, [url]);
  const handleGetReviews = async () => {
    if (!url || !validateYelpLink(url)) return;
    setLoading(true);
    const biz = await fetch(`/api/bizinfo`, {
      method: "POST",
      body: JSON.stringify({ link: url }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const yelpData: YelpBusiness = await biz.json();
    setInfo(yelpData);
    const data =
      session && (await handleReviews(url, session?.user?.id, yelpData));
    console.log(data);
    if (data?.success) {
      setReview(
        JSON.parse(JSON.parse(data?.data?.aiResponse || "").data.content)
      );
    }
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

  const { day, month, year } = {
    day: new Date().getDate(),
    month: new Date().toLocaleString("default", { month: "short" }),
    year: new Date().getFullYear(),
  };

  return (
    <div className="flex flex-col w-full gap-3 p-2 md:p-8">
      <div className="flex flex-col gap-3 ">
        <h2 className="text-2xl  border-b py-2  w-fit">
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
                onClick={handleGetReviews}
              >
                Analyze
              </Button>
            </div>
          }
        />
      </div>
      <AnimatePresence>
        {info && (
          <motion.div
            variants={itemVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
            className="w-full "
          >
            <article className="flex  transition hover:shadow-xl rounded-xl border">
              <div className="rotate-180 p-2 [writing-mode:_vertical-lr]">
                <div className="flex items-center justify-between gap-4 text-xs font-bold uppercase ">
                  <span>{year}</span>
                  <span className="w-px flex-1 bg-gray-900/10 dark:bg-white/10"></span>
                  <span>
                    {day} - {month}
                  </span>
                </div>
              </div>

              <div className="hidden sm:block sm:basis-56">
                <img
                  alt="business image"
                  src={info.image}
                  className="aspect-square h-full w-full object-cover"
                />
              </div>

              <div className="flex flex-1 flex-col justify-between">
                <div className="border-s  p-4 sm:border-l-transparent sm:p-6">
                  <a href="#">
                    <h3 className="font-bold uppercase ">{info.name}</h3>
                  </a>

                  <p className="mt-2 line-clamp-3 text-sm/relaxed ">
                    {info.location?.address1} | {info.location?.city} |{" "}
                    {info.location?.country}
                  </p>
                </div>

                <div className="flex items-end justify-end">
                  <Tooltip
                    color={info.openNow ? "success" : "danger"}
                    showArrow={true}
                    content={
                      info.openNow
                        ? "This business is open now"
                        : "This business is closed now"
                    }
                  >
                    <Button color={info.openNow ? "success" : "danger"}>
                      {info.openNow ? "Open" : "Closed"}
                    </Button>
                  </Tooltip>
                </div>
              </div>
            </article>
          </motion.div>
        )}
        {review && (
          <div>
            <motion.h2
              variants={itemVariants}
              className="text-2xl  py-2 text-center"
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
