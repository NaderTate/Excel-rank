import Main from "./Main";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import prisma from "@/lib/prisma";

const page = async () => {
  const session: any = await getServerSession(authOptions);
  const userLinks = await prisma.aiReview.findMany({
    where: {
      userId: session.user.id,
    },
  });

  return (
    <main className="flex flex-col flex-1 w-full px-4 sm:px-6 lg:px-8 py-8 min-h-screen ">
      <Main />
    </main>
  );
};

export default page;
