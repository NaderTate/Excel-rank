"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { Image as NextUIImage } from "@nextui-org/react";

import SideBar from "./_components/SideBar";
import FacebookPageData from "./_components/facebook/PageData";
import InstagramPageData from "./_components/instagram/PageData";
import LoadingSkeleton from "@/components/Dashboard/LoadingSkeleton";

import { useGetUserPages } from "./_hooks/useGetUserPages";
import { useHandleShowSidebar } from "./_hooks/useHandleShowSidebar";

import { FcNext } from "react-icons/fc";

function Page() {
  const {
    userPages,
    isConnected,
    isLoading,
    showPageData,
    currentPageData,
    setCurrentPageData,
  } = useGetUserPages();
  const { showSideBar, setShowSideBar } = useHandleShowSidebar();
  const [contentType, setContentType] = useState<"facebook" | "instagram">(
    "facebook"
  );

  return (
    <div className="min-h-screen">
      <div className="fixed bottom-[20px] left-0 w-12 rounded-r-full bg-gray-100/70 z-50">
        <button
          onClick={() => setShowSideBar(!showSideBar)}
          className="w-full h-10 flex justify-center items-center rounded-r-full lg:hidden"
        >
          <FcNext
            className={`h-5 w-5 opacity-75 transition-all duration-300 transform ${
              showSideBar ? "-rotate-180" : ""
            }`}
          />
        </button>
      </div>
      <div className="flex">
        <div
          id="sidebar"
          className={`z-20 h-full min-w-[320px] fixed  lg:opacity-100 transition-all -mt-16 lg:translate-x-0 ${
            showSideBar
              ? " opacity-100 translate-x-0"
              : " -translate-x-full opacity-0"
          } `}
        >
          <div
            className={` h-screen overflow-auto min-w-[320px] max-w-[340px] bg-background fixed  z-10 `}
          >
            <div className="p-5 flex flex-col ">
              <Link href={{ pathname: "/dashboard" }}>
                <NextUIImage
                  as={Image}
                  src="/logo.svg"
                  alt="Logo"
                  width={70}
                  height={70}
                  className="object-contain"
                />
              </Link>
              <span className="text-2xl font-bold mb-5">
                Facebook analytics
              </span>
              <span className="text-sm mb-5">
                Get insights about your business on social media
              </span>
              {isLoading && <LoadingSkeleton />}
              {!isLoading && (
                <SideBar
                  userPages={userPages}
                  currentPageId={currentPageData?.id}
                  isConnected={isConnected}
                  setShowSideBar={setShowSideBar}
                  setContentType={setContentType}
                  setCurrentPageData={setCurrentPageData}
                />
              )}
            </div>
          </div>
        </div>
        <div className="lg:ml-80 w-full">
          {isConnected &&
            showPageData &&
            (contentType === "facebook" ? (
              <FacebookPageData data={currentPageData} />
            ) : (
              <InstagramPageData
                data={currentPageData}
                pageToken={currentPageData?.access_token as string}
              />
            ))}
        </div>
      </div>
    </div>
  );
}

export default Page;
