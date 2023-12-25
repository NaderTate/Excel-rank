import prisma from "@/lib/prisma";

import { getServerSession } from "next-auth";

import BusinessForm from "./_components/BusinessForm";
import ReviewedLinks from "./_components/ReviewedLinks";

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
    <div className="flex flex-col sm:flex-row w-full min-h-screen gap-4 md:gap-8 px-5">
      {userLinks.length > 0 && <ReviewedLinks userLinks={userLinks} />}
      <div className="flex flex-col flex-1 w-full">
        <BusinessForm />
      </div>
    </div>
  );
}
