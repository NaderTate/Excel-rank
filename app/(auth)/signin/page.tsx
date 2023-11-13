"use client";

import SignWith from "@components/auth/SignWith";
import Link from "next/link";
import Image from "next/image";

import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";

const Page = () => {
  // get the session from the server side and redirect if user is logged in
  const { data: session, status } = useSession();

  if (status === "loading") {
    return null;
  }

  if (session?.user) {
    redirect("/dashboard");
  }

  return (
    <section className="  lg:h-screen lg:overflow-hidden">
      <div className="lg:grid lg:min-h-screen lg:grid-cols-12">
        <section className="relative flex h-56 items-end  lg:col-span-5 lg:h-full xl:col-span-6">
          <img
            alt="Night"
            src="https://res.cloudinary.com/dyjiz4nff/image/upload/v1694502428/StarPi/dev/mahdis-mousavi-hJ5uMIRNg5k-unsplash_zfrgkx.webp"
            className="absolute inset-0 h-full w-full object-cover z-0"
          />
          <div className="hidden lg:relative lg:block lg:p-12  backdrop-blur-sm text-white">
            <Link className="block  brightness-0 invert" href="/">
              <span className="sr-only">Home</span>
              <div className=" border-gray-100 drop-shadow-xl w-16 h-16 border-[18px] rounded-full"></div>
            </Link>
            <h2 className="mt-6 text-2xl font-bold  sm:text-3xl md:text-4xl">
              Welcome to Excel Rank
            </h2>
            <p className="mt-4 leading-relaxed /90 text-lg">
              Improve your business reputation, make more money
            </p>
          </div>
        </section>
        <main className="flex items-center justify-center px-1 sm:px-8 py-8 lg:col-span-7 lg:py-12 xl:col-span-6">
          <div className="w-full px-3 sm:px-8">
            <div className="relative -mt-16 block lg:hidden">
              <Link
                className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-white text-blue-600  sm:h-20 sm:w-20"
                href="/"
              >
                <span className="sr-only">Home</span>
                <Image src="/logo.svg" alt="icon" width={60} height={80} />
              </Link>
              <h1 className="mt-2 text-2xl font-bold   sm:text-3xl md:text-4xl">
                Welcome to Excel Rank
              </h1>
              <p className="mt-4 leading-relaxed   text-sm sm:text-lg">
                Improve your business reputation, make more money
              </p>
            </div>
            <div className="relative flex flex-col-reverse sm:flex-col gap-5 mt-10">
              <div className="absolute w-[140%] h-[140%]  -top-10 -right-10 -z-[1] hidden sm:block"></div>
              <div className="flex flex-col gap-4">
                <h2 className="text-xl font-semibold sm:text-2xl md:text-3xl">
                  Make Better Business Decisions
                </h2>
                <p className="mb-10 leading-relaxed  text-sm sm:text-lg">
                  Step into the World of AI and Machine Learning with Excel
                  Rank. We provide solutions to your business problems with the
                  help of AI and Machine Learning.
                </p>
              </div>
              <div className="flex flex-col gap-4">
                <h2 className="text-xl  sm:text-xl md:text-2xl">
                  Sign with Email
                </h2>
                <div className="relative w-full items-center flex">
                  <input
                    type="email"
                    placeholder="Email"
                    className="w-full px-4 py-3 border border-gray-300 rounded-full focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                  />
                  <button
                    type="button"
                    className="absolute gradient_bg right-0 m-1 rounded-full w-20 py-2 text-gray-200 hover:text-white transition
                  "
                  >
                    Sign In
                  </button>
                </div>
              </div>
              <SignWith />
            </div>
          </div>
        </main>
      </div>
    </section>
  );
};

export default Page;
