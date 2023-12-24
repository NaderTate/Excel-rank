import Link from "next/link";
import Image from "next/image";

import { FaLongArrowAltRight } from "react-icons/fa";

const rankingFeatures: Array<string> = [
  "Google SEO",
  "Google Maps SEO",
  "Competitors Analysis",
];

const LocalRanking = () => {
  return (
    <div className="flex flex-col md:flex-row gap-5 items-center">
      <div className="p-2 md:p-16 md:w-1/2  max-w-3xl flex flex-col gap-5">
        <p className="text-[#034D82] dark:text-blue-300 text-4xl font-bold font-serif">
          Grow your local ranking
        </p>
        <p className="text-[#566d81] dark:text-gray-300">
          See how your business ranks on Google Maps and who your top
          copmetitors are.
        </p>
        <ul className="gap-2 flex flex-col">
          {rankingFeatures.map((feature, index) => (
            <li key={index} className="text-[#566d81] dark:text-gray-300">
              <Image
                src="images/check.svg"
                alt="check"
                width={20}
                height={20}
                layout="fixed"
                className="inline-block mr-2"
              />{" "}
              {feature}
            </li>
          ))}
        </ul>
        <div className="group">
          <Link
            href={{ pathname: "/localranking" }}
            className="text-[#04AADD] text-semibold text-xl cursor-pointer hover:text-black dark:hover:text-gray-100 transition"
          >
            Learn More
            <FaLongArrowAltRight className="inline-block ml-2 group-hover:translate-x-3 transition-transform" />
          </Link>
        </div>
      </div>
      <div className="p-2 md:pt-16 md:w-1/2 ">
        <Image
          src="https://res.cloudinary.com/dqkyatgoy/image/upload/v1699020724/map_jfogmg.svg"
          priority
          alt="group1"
          className="rounded-lg shadow-xl m-auto mr-10"
          width={500}
          height={500}
        />
      </div>
    </div>
  );
};

export default LocalRanking;
