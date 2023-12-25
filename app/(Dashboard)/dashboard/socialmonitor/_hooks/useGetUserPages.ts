"use client";

import {
  Logout,
  fbLogin,
  getFacebookLoginStatus,
  getFacebookPageData,
  getUserPages,
} from "@/lib/FacebookSDK";

import { useEffect, useState } from "react";

export const useGetUserPages = () => {
  const [isLoading, setIsLoading] = useState(true);

  const [isConnected, setIsConnected] = useState(false);

  const [userPages, setUserPages] = useState<Array<{
    id: string;
    access_token: string;
  }> | null>(null);

  const [currentPageData, setCurrentPageData] = useState<any>(null);

  // if the user has at least one page, set this to true, used later to show the data of the first page automatically after login
  const showPageData = !!(userPages && userPages.length > 0);

  useEffect(() => {
    getFacebookLoginStatus()
      .then((response: any) => {
        if (response.authResponse == null) setIsConnected(false);
        if (response.authResponse) {
          setIsConnected(true);
          getUserPages().then((response) => {
            setUserPages(response.data);
            if (response.data.length > 0) {
              getFacebookPageData(
                response.data[0].id,
                response.data[0].access_token
              ).then((data) => {
                // set the current page to the first page of the user
                setCurrentPageData(data);
              });
            }
          });
        } else {
          alert("Something went wrong");
          setIsConnected(false);
        }
      })
      .then(() => {
        setIsLoading(false);
      });
  }, []);

  const login = async function () {
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
  };

  const logout = async function () {
    await Logout();
    setIsConnected(false);
  };

  return {
    userPages,
    isLoading,
    isConnected,
    login,
    logout,
    showPageData,
    currentPageData,
    setCurrentPageData,
  };
};
