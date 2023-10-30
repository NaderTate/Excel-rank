'use client';
import { useState, useLayoutEffect, useEffect } from 'react';
import { BsFacebook } from 'react-icons/bs';
import { getFacebookLoginStatus, initFacebookSdk, fbLogin, Logout, getUserPages, getPageData } from '@/lib/FacebookSDK';
import { FiLogOut } from 'react-icons/fi';
import SkeletonLoad from '@/app/components/SkeletonLoad';
import FacebookPageData from '@/app/components/FacebookPageData';
function Page() {
  const [isConnected, setIsConnected] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [userPages, setUserPages] = useState<Array<{}> | null>(null);
  const [pageData, setPageData] = useState<{} | null>(null);
  const [showPageData, setShowPageData] = useState(false);
  const [currentPage, setCurrentPage] = useState<string>('');
  // Check if the user is connected to facebook
  useLayoutEffect(() => {
    setIsLoading(true);
    initFacebookSdk().then(() => {
      getFacebookLoginStatus().then((response: any) => {
        if (response.authResponse == null) {
          setIsConnected(false);
        } else if (response.authResponse) {
          setIsConnected(true);
        } else {
          alert('Something went wrong');
          setIsConnected(false);
        }
        setIsLoading(false);
      });
    });
  }, []);

  // get the user pages after login
  useEffect(() => {
    if (isConnected) {
      getUserPages().then((response) => {
        setUserPages(response.data);
      });
    }
  }, [isConnected]);
  async function login() {
    fbLogin().then(async (response) => {
      console.log(response);
      if (response.status === 'connected') {
        setIsConnected(true);
        const longTokenRequest = await fetch(`/api/extend_token`, {
          method: 'POST',
          body: JSON.stringify({
            shortToken: response.authResponse.accessToken,
          }),
        });
        const longToken = await longTokenRequest.json();
        if (!longToken.data.access_token) {
          alert('Error obtaining long token');
          setIsConnected(false);
        }
        localStorage.setItem('fbLongToken', longToken.data.access_token);
      } else {
        alert('Something went wrong');
        setIsConnected(false);
      }
    });
  }
  return (
    <div className="pt-20 bg-[#18191a] text-white min-h-screen">
      <div className="flex">
        <div className="h-full min-w-[320px]">
          <div className="h-screen overflow-auto  min-w-[320px] max-w-[340px] p-5 top-20 flex flex-col  fixed">

            <span className="text-2xl font-bold mb-5">Facebook analytics</span>
            <span className="text-sm mb-5">Get insights about your business on social media</span>
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
                      <FiLogOut className="text-white" />
                    </button>
                  </div>
                  <div>
                    <h1 className="text-xl font-bold my-3">Your pages</h1>
                    <div className="space-y-4">
                      {userPages ? (
                        userPages.map((page: any) => (
                          <div
                            onClick={async () => {
                              setShowPageData(true);
                              setCurrentPage(page.id);
                              const data = await getPageData(page.id, page.access_token);
                              setPageData(data);
                              console.log(data);
                            }}
                            key={page.id}
                            className={` rounded-md p-2 cursor-pointer text-white border ${
                              currentPage === page.id ? 'bg-slate-200/30 border-transparent ' : 'hover:bg-slate-200/50 border-slate-200/50  transition-colors'
                            }`}
                          >
                            <h1 className="text-lg font-bold ">{page.name}</h1>
                          </div>
                        ))
                      ) : (
                        <SkeletonLoad />
                      )}
                      {userPages?.length === 0 && <p>No pages found</p>}
                    </div>
                  </div>
                </div>
              ) : (
                <button onClick={login} className="bg-blue-800 text-white p-3 rounded-md my-2">
                  <BsFacebook className="inline" size={20} /> Connect your Facebook
                </button>
              ))}
          </div>
        </div>
        {isConnected && showPageData && <FacebookPageData data={pageData} />}
      </div>
    </div>
  );
}

export default Page;
