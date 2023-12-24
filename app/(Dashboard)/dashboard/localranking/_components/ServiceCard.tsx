import Image from "next/image";
import { motion } from "framer-motion";
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
      className={`text-gray-900 flex flex-col items-center justify-center rounded-xl w-80 h-96 p-5 bg-gradient-to-tl from-fuchsia-400 via-sky-100 to-sky-400 transition-all cursor-pointer hover:shadow-xl`}
    >
      <Image
        alt="icon"
        width={200}
        height={200}
        src={img}
        className=" rounded-full object-contain "
      />
      <h1 className="text-2xl font-bold ">{title}</h1>
      <p className="text-center font-semibold mt-4">{description}</p>
    </motion.div>
  );
};
export default Card;
