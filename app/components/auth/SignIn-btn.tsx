'use client';

import Link from 'next/link';

const SignIn = () => {
  return (
    <div className="flex items-center justify-center text-gray-800 font-semibold text-lg md:text-xl lg:text-2xl">
      <Link
        href="/signin"
        className="border border-gray-600/50 rounded-xl px-2 py-1 hover:bg-gray-600 hover:text-white transition"
      >
        GET START
      </Link>
    </div>
  );
};

export default SignIn;
