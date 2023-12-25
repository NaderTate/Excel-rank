import { Dispatch, SetStateAction } from "react";

import LoadingSkeleton from "@/components/Dashboard/LoadingSkeleton";

import { useGetUserPages } from "../_hooks/useGetUserPages";
import { getFacebookPageData, getInstagramPageData } from "@/lib/FacebookSDK";

import { FiLogOut } from "react-icons/fi";
import { BsFacebook, BsInstagram } from "react-icons/bs";

type Props = {
  userPages:
    | {
        id: string;
        access_token: string;
      }[]
    | null;
  currentPageId: string;
  setShowSideBar: Dispatch<SetStateAction<boolean>>;
  setContentType: Dispatch<SetStateAction<"facebook" | "instagram">>;
  setCurrentPageData: Dispatch<SetStateAction<any>>;
  isConnected: boolean;
};
function SideBar({
  userPages,
  currentPageId,
  setContentType,
  setCurrentPageData,
  setShowSideBar,
  isConnected,
}: Props) {
  const { logout, login } = useGetUserPages();
  return isConnected ? (
    <>
      <div className="bg-blue-500 font-bold text-white p-3 rounded-md flex justify-between items-center">
        Connected
        <button
          className="mx-2 bg-red-600 rounded-full p-2 m-auto mr-0"
          onClick={logout}
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
                    setContentType("facebook");
                    setShowSideBar(false);
                    const data = await getFacebookPageData(
                      page.id,
                      page.access_token
                    );
                    setCurrentPageData({
                      ...data,
                      access_token: page.access_token,
                    });
                  }}
                  className={` rounded-md p-2 cursor-pointer  border flex items-center gap-3 ${
                    currentPageId === page.id
                      ? "dark:bg-slate-200/30 bg-slate-200 border-transparent"
                      : "hover:bg-slate-200/50 border  transition-colors"
                  }`}
                >
                  <div>
                    <BsFacebook size={20} />
                  </div>
                  <h1 className="text-lg font-bold ">{page.name}</h1>
                </div>
                {page.instagram_business_account && (
                  <div
                    onClick={async () => {
                      setContentType("instagram");

                      setShowSideBar(false);
                      const data = await getInstagramPageData(
                        page.instagram_business_account.id,
                        page.access_token
                      );
                      setCurrentPageData({
                        ...data,
                        access_token: page.access_token,
                      });
                    }}
                    className={`my-3 rounded-md p-2 cursor-pointer  border flex items-center gap-3 ${
                      currentPageId === page.instagram_business_account.id
                        ? "dark:bg-slate-200/30 bg-slate-200 border-transparent"
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
            <LoadingSkeleton />
          )}
          {userPages?.length === 0 && (
            <p>
              No pages found. <br /> <br /> Make sure you selected your page
              during the login and that you have Facebook access to the page.{" "}
              <br /> <br /> Go to your page settings {">"} new pages experience
              and make sure your account is listed under{" "}
              <span className="font-bold">Poeple with Facebook access</span>
            </p>
          )}
        </div>
      </div>
    </>
  ) : (
    <button
      onClick={login}
      className="bg-blue-800 text-white  p-3 rounded-md my-2 font-semibold"
    >
      <BsFacebook className="inline" size={20} /> Connect your Facebook
    </button>
  );
}

export default SideBar;
