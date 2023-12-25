import { motion } from "framer-motion";
import { Tooltip, Chip } from "@nextui-org/react";

import { itemVariants } from "./BusinessForm";

import { YelpBusinessInfo } from "@/types";

type Props = {
  info: YelpBusinessInfo;
};

const BusinessInfoCard = ({ info }: Props) => {
  const { day, month, year } = {
    day: new Date().getDate(),
    month: new Date().toLocaleString("default", { month: "short" }),
    year: new Date().getFullYear(),
  };
  return (
    <motion.div
      variants={itemVariants}
      initial="hidden"
      animate="visible"
      exit="hidden"
      className="w-full "
    >
      <div className="flex transition hover:shadow-xl rounded-xl border">
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
              content={
                info.openNow
                  ? "This business is open now"
                  : "This business is closed now"
              }
            >
              <Chip color={info.openNow ? "success" : "danger"}>
                {info.openNow ? "Open" : "Closed"}
              </Chip>
            </Tooltip>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default BusinessInfoCard;
