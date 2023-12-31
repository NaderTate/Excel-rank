"use client";

import { Image } from "@nextui-org/react";
import { useEffect, useState } from "react";

import CommentsPopup from "./CommentsPopup";
import AIReviewPopup from "./AIReviewPopup";
import InsightsPopup from "./InsightsPopup";

type Props = {
  data: any;
  postId: string;
  pageToken: string;
  picture: string;
  name: string;
};

function PostCard({ data, postId, pageToken, picture, name }: Props) {
  const [commentsCount, setCommentsCount] = useState<number | null>(null);
  const [likesCount, setLikesCount] = useState<number | null>(null);
  const [showMessage, setShowMessage] = useState<boolean>(false);

  useEffect(() => {
    fetch(
      `https://graph.facebook.com/v18.0/${postId}?fields=likes.summary(true).limit(0),comments.summary(true).limit(0)&access_token=${pageToken}`
    )
      .then((res) => res.json())
      .then((res) => {
        setCommentsCount(res.comments?.summary.total_count);
        setLikesCount(res.likes.summary.total_count);
      });
  }, []);
  const {
    id,
    message,
    created_time,
    attachments: {
      data: [{ media }],
    },
  } = data;

  return (
    <div key={id} className="rounded-xl  p-2 md:p-4 flex flex-col gap-4">
      <div className="flex items-center">
        <Image
          alt="profile"
          src={picture}
          className="rounded-full"
          width={50}
          height={50}
        />
        <div className="ml-2 flex justify-center flex-col mb-3">
          <h1 className="text-lg font-bold ">{name}</h1>
          <h1 className="text-sm ">{new Date(created_time).toDateString()}</h1>
        </div>
      </div>

      <p className="whitespace-pre-line">
        {message?.length > 200 ? (
          <div>
            {showMessage ? message : message.slice(0, 200) + "..."}
            <button
              className="text-blue-100 ml-2"
              onClick={() => setShowMessage(!showMessage)}
            >
              {showMessage ? "Read less" : "Read more"}
            </button>
          </div>
        ) : (
          message
        )}
      </p>
      {media?.image?.src && (
        <img src={media?.image?.src} alt="post IMage" className="rounded-xl" />
      )}
      <div className=" grid grid-cols-3 gap-3 md:gap-5 text-white">
        <InsightsPopup pageToken={pageToken} postId={postId} />
        <CommentsPopup
          postId={postId}
          pageToken={pageToken}
          commentsCount={commentsCount}
          likesCount={likesCount || 0}
        />
        <AIReviewPopup
          postId={postId}
          commentsCount={commentsCount || 0}
          pageToken={pageToken}
        />
      </div>
    </div>
  );
}

export default PostCard;
