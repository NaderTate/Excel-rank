'use client';
import { useSession, signIn, signOut } from 'next-auth/react';

export default function Home() {
  const { data: session }: any = useSession();
  console.log(session);

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <>
        <h1> Welcome to Next.js!</h1>

        {session ? (
          <>
            <span>Signed in as {session.user.email}</span>
            <button onClick={() => signOut()}>Sign out</button>
          </>
        ) : (
          <>
            <span>You are not signed in </span>
            <button onClick={() => signIn()}>Sign in</button>
          </>
        )}
      </>
    </main>
  );
}
