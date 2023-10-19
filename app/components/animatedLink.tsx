"use client";
import useAnimatedRouter from "../useAnimatedRouter";
import Link from "next/link";
import React from "react";

type Props = {
  href: string;
  children: React.ReactNode;
  className?: string;
};
export default function AnimatedLink({ href, children, className }: Props) {
  const { animatedRoute } = useAnimatedRouter();
  return (
    <Link
      className={className}
      href={href}
      onClick={() => {
        animatedRoute(href);
      }}
      passHref
    >
      {children}
    </Link>
  );
}
