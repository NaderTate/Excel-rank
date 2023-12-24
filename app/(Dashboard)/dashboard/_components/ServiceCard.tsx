import Link from "next/link";

import { IconType } from "react-icons";

type Props = {
  service: {
    name: string;
    description: string;
    icon: IconType;
    link: string;
  };
};

const ServiceCard = ({ service }: Props) => {
  return (
    <Link href={service.link} className="h-full">
      <div className="hover:animate-background rounded-xl w-full h-full  bg-gradient-to-r from-green-300 via-blue-500 to-purple-600 p-0.5 shadow-xl transition hover:bg-[length:400%_400%] hover:shadow-sm hover:[animation-duration:_4s]">
        <div className="rounded-[10px] h-full dark:bg-background p-4 sm:p-6 bg-white">
          <service.icon className="h-6 w-6 text-gray-400" />

          <h3 className="mt-0.5 text-lg font-medium ">{service.name}</h3>

          <div className="mt-4">
            <p className="text-sm ">{service.description}</p>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ServiceCard;
