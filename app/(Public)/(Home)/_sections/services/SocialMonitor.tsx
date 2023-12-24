import Link from "next/link";
import Image from "next/image";

import { FaLongArrowAltRight } from "react-icons/fa";

const SocialMonitor = () => {
  return (
    <div className="flex flex-col-reverse md:flex-row gap-5 items-center">
      <div className="p-2 md:p-16 md:w-1/2 lg:w-1/3">
        <Image
          src="/images/main/Group 21.png"
          alt="group1"
          className=""
          // layout="responsive"
          width={300}
          height={500}
        />
      </div>
      <div className="p-2 md:p-16 md:w-1/2 lg:w-2/3 max-w-3xl flex flex-col gap-5">
        <p className="text-[#034D82] dark:text-blue-300 text-4xl font-bold font-serif">
          Measure your posts impressions and reach
        </p>
        <p className="text-[#566d81] dark:text-gray-300">
          Track your performance for metrics like follower evolution, average
          engagement rate per post and reach and impressions accross all your
          social media platforms from one dashboard.
        </p>
        <div className="group">
          <Link href={{ pathname: "/socialmonitor" }}>
            <p className="text-[#04AADD] text-semibold text-xl cursor-pointer hover:text-black dark:hover:text-gray-100 transition">
              Learn more
              <FaLongArrowAltRight className="inline-block ml-2 group-hover:translate-x-3 transition-transform" />
            </p>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SocialMonitor;
