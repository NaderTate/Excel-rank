"use client";

import Link from "next/link";
import Image from "next/image";
import SignIn from "@components/auth/SignIn-btn";
import { usePathname } from "next/navigation";
import { useSession } from "next-auth/react";
import DropDown from "./DropDown";
import Drawer from "./Drawer";
import { navItems } from "@/lib/data";
import AnimatedLink from "../animatedLink";

const Navbar = () => {
  const { data: session }: any = useSession();
  const pathname = usePathname();

  if (pathname === "/signin") {
    return null;
  }

  return (
    <nav className="flex justify-between items-center bg-tra text-gray-600 right-0 w-full shadow-lg bg-white/90 dark:shadow-slate-800 z-10  dark:bg-gray-900 h-16 lg:h-20">
      <div className="py-2 sm:py-1 px-2 md:px-5 lg:px-8 sm:p-8flex itmes-center ">
        <AnimatedLink href="/" className="flex items-center justify-center">
          <Image
            className=" w-8 h-8 lg:w-10 lg:h-10"
            src="/logo.svg"
            width={100}
            height={100}
            alt="logo"
          />
          <div className="hidden gradient_text sm:block ml-2 text-xl font-bold text-gray-900 dark:text-white sm:text-2xl md:text-3xl">
            Craft Care
          </div>
        </AnimatedLink>
      </div>

      <ul className="hidden md:flex items-center gap-5 text-lg lg:text-xl font-medium">
        {navItems.map((item) => (
          <li key={item.name + "navbar"}>
            <AnimatedLink href={item.url}>{item.name}</AnimatedLink>
          </li>
        ))}
      </ul>

      <div className="flex items-center gap-4 justify-between pr-2 sm:pr-12 lg:px-4 ">
        {session?.user ? (
          <>
            <div className="group hidden md:flex shrink-0 items-center rounded-lg transition ">
              <span className="sr-only">Menu</span>
              <img
                alt="Profile"
                src={session.user?.image}
                className="h-10 w-10 md:h-12 md:w-12 rounded-full object-cover"
              />
              <DropDown user={session.user} />
            </div>
          </>
        ) : (
          <div className="hidden md:block">
            <SignIn />
          </div>
        )}
        <Drawer user={session?.user} />
      </div>
    </nav>
  );
};

export default Navbar;
