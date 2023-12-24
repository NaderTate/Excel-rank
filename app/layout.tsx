import "./globals.css";

import Script from "next/script";
import type { Metadata } from "next";
import { Quicksand } from "next/font/google";
import { getServerSession } from "next-auth";

import { Providers } from "../components/Providers";

import { authOptions } from "@/lib/authOptions";

const quick = Quicksand({
  subsets: ["latin", "latin-ext"],
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Excel Rank",
  description: "Improve your reputation, make more money",
  icons: [
    {
      href: "/logo.svg",
      url: "/logo.svg",
      sizes: "any",
      type: "image/svg+xml",
    },
  ],
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);

  return (
    <html lang="en">
      <body className={quick.className}>
        <Providers session={session}>
          <div id="fb-root"></div>
          <Script
            async
            defer
            crossOrigin="anonymous"
            src="https://connect.facebook.net/en_US/sdk.js#xfbml=1&version=v18.0&appId=603592791842712"
            nonce="FeUOmNvb"
          />
          {children}
        </Providers>
      </body>
    </html>
  );
}
