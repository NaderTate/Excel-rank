import prisma from "@/lib/prisma";

import { Image } from "@nextui-org/react";
import { getServerSession } from "next-auth";
import { Image as NUIImage } from "@nextui-org/react";

import BusinessForm from "./_components/BusinessForm";

import { authOptions } from "@/lib/authOptions";

export const metadata = {
  title: "Reviews Manager",
  description: "Analyze thousands of reviews within seconds",
};

export default async function Page() {
  const session = await getServerSession(authOptions);
  const userLinks = await prisma.aiReview.findMany({
    where: {
      userId: session?.user.id,
    },
  });

  return (
    <div className="flex flex-col sm:flex-row w-full min-h-screen  gap-4 md:gap-8 px-5">
      {userLinks.length > 0 && (
        <div className="sm:flex flex-col hidden sm:w-1/4 md:w-1/5 w-full gap-3 border-r p-1 pt-14 -mt-10">
          <h1 className="text-2xl ">Reviewed Links</h1>

          {userLinks && (
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
          )}
        </div>
      )}

      <div className="flex flex-col flex-1 w-full gap-3">
        <BusinessForm />
      </div>
    </div>
  );
}
