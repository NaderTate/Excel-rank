"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
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

  // navbar scroll effect, Slide down when scrolling down, slide up when scrolling up and to stay at the top of the page when scrolling up and at the top of the page
  const [prevScrollPos, setPrevScrollPos] = useState(0);
  const [visible, setVisible] = useState(true);
  const [isScrolled, setIsScrolled] = useState(false);

  const handleScroll = () => {
    // find current scroll position
    const currentScrollPos = window.pageYOffset;

    // set state based on location info (explained in more detail below)
    setVisible(prevScrollPos > currentScrollPos || currentScrollPos < 10);
    setIsScrolled(currentScrollPos > 10);

    // set state to new scroll position
    setPrevScrollPos(currentScrollPos);
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, [prevScrollPos, visible, isScrolled, handleScroll]);

  return (
    <nav
      style={{ top: visible ? "0" : "-100px", transition: "top 0.6s" }}
      className="flex justify-between items-center bg-tra text-gray-600 right-0 w-full shadow-lg bg-white/80 backdrop-blur-sm dark:shadow-slate-800 z-50  dark:bg-gray-900 h-16 lg:h-20 fixed top-0"
    >
      <div className="py-2 sm:py-1 px-2 md:px-5 lg:px-8 sm:p-8 flex itmes-center ">
        <AnimatedLink href="/" className="flex items-center justify-center">
          <Image
            className=" w-8 h-8 lg:w-10 lg:h-10"
            src="/logo.svg"
            width={100}
            height={100}
            alt="logo"
          />
          <div className="hidden gradient_text sm:block ml-2 text-xl font-bold text-gray-900 dark:text-white sm:text-2xl md:text-3xl">
            EXCEL RANK
          </div>
        </AnimatedLink>
      </div>

      <ul className="hidden lg:flex items-center gap-5   font-medium">
        {navItems.map((item) => (
          <li className="navItem" key={item.name + "navbar"}>
            <AnimatedLink href={item.url}>{item.name}</AnimatedLink>
          </li>
        ))}
      </ul>

      <div className="flex items-center gap-4 justify-between pr-2 sm:pr-12 lg:px-4 ">
        {session?.user ? (
          <>
            <div className="group hidden lg:flex shrink-0 items-center rounded-lg transition ">
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
