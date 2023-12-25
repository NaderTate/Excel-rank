"use client";

import {
  Navbar as NextUINav,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenu,
  NavbarMenuItem,
  NavbarMenuToggle,
} from "@nextui-org/react";
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { usePathname } from "next/navigation";

import UserAvatar from "./UserAvatar";
import { ThemeSwitcher } from "@/components/ThemeSwitch";

import { navItems } from "@/lib/data";

const Navbar = () => {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <NextUINav
      onMenuOpenChange={setIsMenuOpen}
      shouldHideOnScroll
      maxWidth="full"
    >
      <NavbarContent>
        <NavbarMenuToggle
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          className="lg:hidden"
        />
        <NavbarBrand>
          <Link
            href={{ pathname: "/" }}
            className="flex items-center justify-center ml-2"
          >
            <Image
              className=" w-8 h-8 lg:w-10 lg:h-10"
              src="/logo.svg"
              width={100}
              height={100}
              alt="logo"
            />
            <div className=" gradient_text  ml-2 text-xl font-bold  sm:text-2xl md:text-3xl">
              EXCEL RANK
            </div>
          </Link>
        </NavbarBrand>
      </NavbarContent>

      <NavbarContent className="hidden lg:flex gap-4" justify="center">
        {navItems.map((item, index) => (
          <NavbarItem key={`${item}-${index}`}>
            <Link
              color={pathname === item.url ? "primary" : "foreground"}
              className="w-full"
              href={{ pathname: item.url }}
            >
              {item.name}
            </Link>
          </NavbarItem>
        ))}
      </NavbarContent>
      <NavbarContent justify="end">
        <NavbarItem>
          <ThemeSwitcher />
        </NavbarItem>
        <NavbarItem>
          <UserAvatar />
        </NavbarItem>
      </NavbarContent>
      <NavbarMenu>
        {navItems.map((item, index) => (
          <NavbarMenuItem key={`${item}-${index}`}>
            <Link
              color={pathname === item.url ? "primary" : "foreground"}
              className="w-full"
              href={{ pathname: item.url }}
            >
              {item.name}
            </Link>
          </NavbarMenuItem>
        ))}
      </NavbarMenu>
    </NextUINav>
  );
};

export default Navbar;
