"use client";
import { useState, useLayoutEffect, useEffect } from "react";
import { BsFacebook, BsInstagram } from "react-icons/bs";
import {
  getFacebookLoginStatus,
  initFacebookSdk,
  fbLogin,
  Logout,
  getUserPages,
  getFacebookPageData,
  getInstagramPageData,
} from "@/lib/FacebookSDK";
import { FiLogOut } from "react-icons/fi";
import SkeletonLoad from "@/app/components/SkeletonLoad";
import FacebookPageData from "@/app/components/Dashboard/Social_Monitor/Facebook/PageData";
import InstagramPageData from "@/app/components/Dashboard/Social_Monitor/Instagram/PageData";
import { FcNext } from "react-icons/fc";
import Image from "next/image";
import { Image as NextUIImage } from "@nextui-org/react";
import Link from "next/link";
function Page() {
  const [isConnected, setIsConnected] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [userPages, setUserPages] = useState<Array<{}> | null>(null);
  const [pageData, setPageData] = useState<{} | null>(null);
  const [showPageData, setShowPageData] = useState(false);
  const [currentPage, setCurrentPage] = useState<string>("");
  const [currentPageToken, setCurrentPageToken] = useState<string>("");
  const [contentType, setContentType] = useState<"facebook" | "instagram">(
    "facebook"
  );
  const [showSideBar, setShowSideBar] = useState(false);
  // Check if the user is connected to facebook
  useEffect(() => {
    getFacebookLoginStatus()
      .then((response: any) => {
        if (response.authResponse == null) {
          setIsConnected(false);
        } else if (response.authResponse) {
          setIsConnected(true);
        } else {
          alert("Something went wrong");
          setIsConnected(false);
        }
      })
      .then(() => {
        setIsLoading(false);
      });
  }, []);

  // get the user pages after login
  useLayoutEffect(() => {
    getUserPages().then((response) => {
      setUserPages(response.data);
      if (response.data.length > 0) {
        setCurrentPage(response.data[0].id);
        setCurrentPageToken(response.data[0].access_token);
        setShowPageData(true);
        getFacebookPageData(
          response.data[0].id,
          response.data[0].access_token
        ).then((data) => {
          setPageData(data);
        });
      }
    });
  }, [isConnected]);
  async function login() {
    fbLogin().then(async (response) => {
      if (response.status === "connected") {
        setIsConnected(true);
        const longTokenRequest = await fetch(`/api/extend_token`, {
          method: "POST",
          body: JSON.stringify({
            shortToken: response.authResponse.accessToken,
          }),
        });
        const longToken = await longTokenRequest.json();
        if (!longToken.data.access_token) {
          alert("Error obtaining long token");
          setIsConnected(false);
        }
        localStorage.setItem("fbLongToken", longToken.data.access_token);
      } else {
        alert("Something went wrong");
        setIsConnected(false);
      }
    });
  }
  const handleClickOutside = (event: MouseEvent) => {
    if ((event.target as Element).closest("#sidebar") === null) {
      setShowSideBar(false);
    }
  };
  const handleKeyPress = (event: KeyboardEvent) => {
    if (event.key === "Escape") {
      // Perform your action here
      setShowSideBar(false);
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleClickOutside);
    document.addEventListener("keydown", handleKeyPress);

    return () => {
      document.removeEventListener("click", handleClickOutside);
      document.removeEventListener("keydown", handleKeyPress);
    };
  });
  return (
    <div className="  min-h-screen">
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
            <div className=" p-5  flex flex-col ">
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
              {isLoading && <SkeletonLoad />}
              {!isLoading &&
                (isConnected ? (
                  <div>
                    <div className="bg-blue-500 font-bold text-white p-3 rounded-md flex justify-between items-center">
                      Connected
                      <button
                        className="mx-2 bg-red-600 rounded-full p-2 m-auto mr-0"
                        onClick={async () => {
                          await Logout();
                          setIsConnected(false);
                        }}
                      >
                        <FiLogOut className="" />
                      </button>
                    </div>
                    <div>
                      <h1 className="text-xl font-bold my-3">Your pages</h1>

                      <div className="space-y-4">
                        {userPages ? (
                          userPages.map((page: any) => (
                            <div key={page.id}>
                              <div
                                onClick={async () => {
                                  setCurrentPageToken(page.access_token);
                                  setContentType("facebook");
                                  setShowPageData(true);
                                  setCurrentPage(page.id);
                                  setShowSideBar(false);
                                  const data = await getFacebookPageData(
                                    page.id,
                                    page.access_token
                                  );
                                  setPageData(data);
                                }}
                                className={` rounded-md p-2 cursor-pointer  border flex items-center gap-3 ${
                                  currentPage === page.id
                                    ? "bg-slate-200/30 border-transparent "
                                    : "hover:bg-slate-200/50 border  transition-colors"
                                }`}
                              >
                                <div>
                                  <BsFacebook size={20} />
                                </div>
                                <h1 className="text-lg font-bold ">
                                  {page.name}
                                </h1>
                              </div>
                              {page.instagram_business_account && (
                                <div
                                  onClick={async () => {
                                    setCurrentPageToken(page.access_token);
                                    setContentType("instagram");
                                    setShowPageData(true);
                                    setCurrentPage(
                                      page.instagram_business_account.id
                                    );
                                    setShowSideBar(false);
                                    const data = await getInstagramPageData(
                                      page.instagram_business_account.id,
                                      page.access_token
                                    );
                                    setPageData(data);
                                  }}
                                  className={`my-3 rounded-md p-2 cursor-pointer  border flex items-center gap-3 ${
                                    currentPage ===
                                    page.instagram_business_account.id
                                      ? "bg-slate-200/30 border-transparent "
                                      : "hover:bg-slate-200/50 border  transition-colors"
                                  }`}
                                >
                                  <div>
                                    <BsInstagram size={20} />
                                  </div>
                                  <h1 className="text-lg font-bold ">
                                    {page.instagram_business_account.username}
                                  </h1>
                                </div>
                              )}
                            </div>
                          ))
                        ) : (
                          <SkeletonLoad />
                        )}
                        {userPages?.length === 0 && (
                          <p>
                            No pages found. <br /> <br /> Make sure you selected
                            your page during the login and that you have
                            Facebook access to the page. <br /> <br /> Go to
                            your page settings {">"} new pages experience and
                            make sure your account is listed under{" "}
                            <span className="font-bold">
                              Poeple with Facebook access
                            </span>
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                ) : (
                  <button
                    onClick={login}
                    className="bg-blue-800 text-white  p-3 rounded-md my-2 font-semibold"
                  >
                    <BsFacebook className="inline" size={20} /> Connect your
                    Facebook
                  </button>
                ))}
            </div>
          </div>
        </div>
        <div className="lg:ml-80 w-full">
          {isConnected &&
            showPageData &&
            (contentType === "facebook" ? (
              <FacebookPageData data={pageData} />
            ) : (
              <InstagramPageData data={pageData} pageToken={currentPageToken} />
            ))}
        </div>
      </div>
    </div>
  );
}

export default Page;
