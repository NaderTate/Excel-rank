import Link from "next/link";
import Image from "next/image";

import { FaLongArrowAltRight } from "react-icons/fa";

const ReviewManager = () => {
  return (
    <div className="flex flex-col-reverse md:flex-row gap-5 items-center">
      <div className="p-2 md:p-16 md:w-[1000px] w-full">
        <Image
          quality={100}
          src="https://res.cloudinary.com/dqkyatgoy/image/upload/v1700253517/macbook_o24pbs.png"
          alt="group1"
          className="object-contain"
          // layout="responsive"
          width={2000}
          height={2000}
        />
      </div>
      <div className="p-2 md:p-16 md:w-1/2 lg:w-2/3 max-w-3xl flex flex-col gap-5">
        <p className="text-[#034D82] dark:text-blue-300 text-4xl font-bold font-serif">
          Summarize your reviews on Yelp, Google and other websites
        </p>
        <p className="text-[#566d81] dark:text-gray-300">
          With the power of AI, you don&apos;t have to maually go through
          thousands of reviews on different websites. Let the AI do the hard
          work and give you a brief of what your cusomers think about business.
        </p>
        <div className="group">
          <Link href={{ pathname: "/reviews" }}>
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

export default ReviewManager;
