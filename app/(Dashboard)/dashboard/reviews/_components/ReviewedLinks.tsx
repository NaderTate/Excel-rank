import { Image } from "@nextui-org/react";
import { Image as NUIImage } from "@nextui-org/react";

import { AiReview } from "@prisma/client";

type Props = { userLinks: AiReview[] };

const ReviewedLinks = ({ userLinks }: Props) => {
  return (
    <div className="sm:flex flex-col hidden sm:w-1/4 md:w-1/5 w-full gap-3 border-r p-1 pt-14 -mt-10">
      <h1 className="text-2xl ">Reviewed Links</h1>
      <div className="flex flex-col gap-2">
        {userLinks.map((link) => (
          <div
            key={link.id + "reviewedlinks"}
            className="flex items-center rounded-lg shadow-lg shadow-blue-800/20 transition-colors p-2 cursor-pointer hover:bg-slate-400/30"
          >
            <NUIImage
              as={Image}
              width={40}
              height={40}
              className="mr-1 rounded-full aspect-square object-cover"
              src={link.image as string}
              alt="business image"
            />
            <div className="flex flex-col gap-1">
              <p className="text-sm line-clamp-1">{link.title}</p>
              <p className="text-xs text-gray-500 line-clamp-1">
                {link.address}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ReviewedLinks;
