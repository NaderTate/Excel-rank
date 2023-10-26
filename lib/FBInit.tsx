"use client";
import { useEffect } from "react";
import {
  getFacebookLoginStatus,
  initFacebookSdk,
  fbLogin,
  Logout,
} from "@/lib/FacebookSDK";

export default function FBInit() {
  useEffect(() => {
    console.log("Started use effect");
    initFacebookSdk().then(() => {
      getFacebookLoginStatus().then((response: any) => {
        if (response == null) {
          console.log("No login status for the person");
        } else {
          console.log(response);
        }
      });
    });
  }, []);
  async function login() {
    console.log("reached log in button");
    fbLogin().then((response) => {
      console.log(response);
      if (response.status === "connected") {
        console.log("Person is connected");
      } else {
        // something
      }
    });
  }
  return (
    <div>
      <button
        className="mx-2 border border-blue-800 rounded-md"
        onClick={login}
      >
        Login
      </button>
      <button
        className="mx-2 border border-blue-800 rounded-md"
        onClick={Logout}
      >
        log out
      </button>
      <button
        className="mx-2 border border-blue-800 rounded-md"
        onClick={getFacebookLoginStatus}
      >
        check status
      </button>
      <div
        className="fb-login-button"
        data-max-rows="1"
        data-size="<medium, large>"
        data-button-type="continue_with"
        data-width="100%"
        data-scope="public_profile, email,user_friends"
      ></div>
    </div>
  );
}
