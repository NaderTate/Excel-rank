import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";

import { FaLongArrowAltRight } from "react-icons/fa";

const Main = () => {
  return (
    <section className=" p-2 md:p-5 main_gradient md:min-h-screen w-full flex flex-col md:flex-row items-center ">
      <div className="flex flex-col md:flex-row ">
        <div className=" max-w-4xl md:pl-28 flex flex-col gap-8">
          <motion.p
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-xl sm:text-3xl md:text-6xl text-white font-bold font-serif"
          >
            Grow your presence, reputation and revenue
            <span className="relative block w-fit mt-4">
              faster
              <Image
                src="/images/main/faster.svg"
                alt="faster"
                width={100}
                height={100}
                layout="fixed"
                className="absolute top-14 w-full right-0"
              />
            </span>
          </motion.p>
          <motion.p
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-white text-sm md:text-lg mt-8 font-serif"
          >
            With AI, you can analyze and manage your reviews across all
            platforms, <br /> Stay focused and save your time.
          </motion.p>
          <div className="flex flex-col md:flex-row gap-4">
            <motion.div
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <Link
                href={{ pathname: "/reviews" }}
                className="bg-white px-8 py-4 rounded-md font-bold text-[#00A8DB] hover:text-white hover:bg-[#00A8DB] transition-colors duration-300 w-fit
        "
              >
                See How It Works
              </Link>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.6 }}
            >
              <Link
                href={{ pathname: "/pricing" }}
                className="text-white px-8 py-4 font-semibold rounded-md hover:text-[#00A8DB] hover:bg-white transition-colors duration-300"
              >
                Get A Free Demo
                <FaLongArrowAltRight className="inline-block ml-2 " />
              </Link>
            </motion.div>
          </div>
        </div>
      </div>
      <div className="relative w-1/4 self-start hidden md:block ">
        <motion.div
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.8 }}
          className="absolute top-[13vh] !w-[700px]"
        >
          <Image
            src="/images/main/group1.png"
            alt="group1"
            className=" translate-x-28 w-full drop-shadow-2xl"
            layout="responsive"
            width={600}
            height={600}
          />
        </motion.div>
        <motion.div
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 1 }}
          className="absolute top-2 !w-[300px]"
        >
          <Image
            src="/images/main/group3.png"
            alt="group1"
            className="translate-x-80 w-full drop-shadow-xl"
            layout="responsive"
            width={300}
            height={300}
          />
        </motion.div>
        <motion.div
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 1.2 }}
          className="absolute top-40 !w-[400px]"
        >
          <Image
            src="/images/main/group2.png"
            alt="group1"
            className=" -translate-x-10 drop-shadow-lg w-full scale-125"
            layout="responsive"
            width={300}
            height={300}
          />
        </motion.div>
        <div className="absolute !w-[700px]">
          <Image
            src="/images/main/ring.svg"
            alt="group1"
            className="w-full drop-shadow-2xl"
            layout="responsive"
            width={600}
            height={600}
          />
        </div>
      </div>
    </section>
  );
};

export default Main;
