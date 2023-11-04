import "./globals.css";
import type { Metadata } from "next";
import { Quicksand } from "next/font/google";
import SessionProv from "@components/auth/SessionProv";
import Navbar from "@components/Navbar";
import Script from "next/script";

const quick = Quicksand({
  subsets: ["latin", "latin-ext"],
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Craft Care",
  description:
    "Craft Care is a platform for crafters to manage their business.",
  icons: [
    {
      href: "/logo.svg",
      url: "/logo.svg",
      sizes: "any",
      type: "image/svg+xml",
    },
  ],
};

export default function RootLayout({
  children,
  session,
}: {
  children: React.ReactNode;
  session: any;
}) {
  return (
    <html lang="en">
      <body className={quick.className}>
        <div id="fb-root"></div>
        <Script
          async
          defer
          crossOrigin="anonymous"
          src="https://connect.facebook.net/en_US/sdk.js#xfbml=1&version=v18.0&appId=603592791842712"
          nonce="FeUOmNvb"
        />
        <SessionProv session={session}>
          <Navbar />
          {children}
        </SessionProv>
      </body>
    </html>
  );
}
