'use client';
import { useSession } from 'next-auth/react';
import { redirect } from 'next/navigation';

const ProtectedRoute = ({ children, plan }: { children: React.ReactNode; plan: string[] }) => {
  const { data: session, status }: any = useSession();

  if (status === 'loading') {
    return null;
  }

  const checkIfLoggedIn = () => {
    if (!session?.user) {
      redirect('/signin');
    }
  };

  // const checkIfSubscribed = () => {
  //   if (!plan.includes(session?.user?.plan)) {
  //     redirect('/pricing');
  //   }
  // };

  checkIfLoggedIn();
  // checkIfSubscribed();

  return children;
};

export default ProtectedRoute;
