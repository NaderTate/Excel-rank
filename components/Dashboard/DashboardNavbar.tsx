"use client";
import Image from "next/image";
import { useState } from "react";
import { usePathname } from "next/navigation";
import { dashboardNavItems } from "@/lib/data";
import { ThemeSwitcher } from "@/components/ThemeSwitch";
import {
  Navbar as NextUINav,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenu,
  NavbarMenuItem,
  NavbarMenuToggle,
} from "@nextui-org/react";
import { Link as NUILink } from "@nextui-org/react";
import Link from "next/link";
import UserAvatar from "../Navbar/UserAvatar";

const DashboardNav = () => {
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
          <Link href={"/"} className="flex items-center justify-center ml-2">
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
        {dashboardNavItems.map((item, index) => (
          <NavbarItem key={`${item}-${index}`}>
            <NUILink
              as={Link}
              color={pathname === item.url ? "primary" : "foreground"}
              className="w-full"
              href={item.url}
            >
              {item.name}
            </NUILink>
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
        {dashboardNavItems.map((item, index) => (
          <NavbarMenuItem key={`${item}-${index}`}>
            <NUILink
              as={Link}
              color={pathname === item.url ? "primary" : "foreground"}
              className="w-full"
              href={item.url}
            >
              {item.name}
            </NUILink>
          </NavbarMenuItem>
        ))}
      </NavbarMenu>
    </NextUINav>
  );
};

export default DashboardNav;
