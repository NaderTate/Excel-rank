"use client";

import { handleReviews } from "@/actions/client/yelp";
import { YelpBusinessInfo, YelpReview } from "@/types";
import { useSession } from "next-auth/react";
import { useMemo, useState } from "react";

export const useFetchYelpAIReview = () => {
  const [review, setReview] = useState<YelpReview | null>(null);
  const [info, setInfo] = useState<YelpBusinessInfo | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [url, setUrl] = useState<string>("");
  const { data: session } = useSession();
  function validateYelpLink(link: string) {
    const yelpRegex = /^https?:\/\/(www\.)?yelp\.com\/biz\/[a-zA-Z0-9_-]+$/;
    return yelpRegex.test(link);
  }
  const isInvalid = useMemo(() => {
    if (url === "") return false;

    return validateYelpLink(url) ? false : true;
  }, [url]);
  const handleGetReviews = async () => {
    if (!url || !validateYelpLink(url)) return;
    setLoading(true);
    const biz = await fetch(`/api/bizinfo`, {
      method: "POST",
      body: JSON.stringify({ link: url }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const yelpData: YelpBusinessInfo = await biz.json();
    setInfo(yelpData);
    const data =
      session && (await handleReviews(url, session?.user?.id, yelpData));
    if (data?.success) {
      setReview(
        JSON.parse(JSON.parse(data?.data?.aiResponse || "").data.content)
      );
    }
    setLoading(false);
  };
  return {
    review,
    info,
    loading,
    url,
    setUrl,
    isInvalid,
    handleGetReviews,
  };
};
