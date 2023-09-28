import Main from './Main';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import prisma from '@/lib/prisma';

export default async function Page() {
  const session: any = await getServerSession(authOptions);
  const userLinks = await prisma.aiReview.findMany({
    where: {
      userId: session.user.id,
    },
  });

  return (
    <div className="flex flex-col sm:flex-row w-full min-h-screen  gap-4 md:gap-8">
      <div className="flex flex-col sm:w-1/4 md:w-1/5 w-full gap-3 bg-slate-200/50 p-1 pt-14 -mt-10">
        <h1 className="text-2xl text-gray-900">Reviewed Links</h1>
        {userLinks && (
          <div className="flex flex-col gap-2">
            {userLinks.map((link) => (
              <div
                key={link.id + 'reviewedlinks'}
                className="flex items-center rounded-lg shadow-lg bg-slate-400/10 p-2 cursor-pointer hover:bg-slate-400/30"
              >
                <img className="w-10 mr-1 h-10 rounded-full" src={link.image as string} alt="business image" />
                <div className="flex flex-col gap-1">
                  <p className="text-sm text-gray-900  line-clamp-1">{link.title}</p>
                  <p className="text-xs text-gray-500 line-clamp-1">{link.address}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      <div className="flex flex-col flex-1 w-full gap-3">
        <Main />
      </div>
    </div>
  );
}
