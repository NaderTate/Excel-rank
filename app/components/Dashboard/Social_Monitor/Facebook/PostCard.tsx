"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { AiOutlineLike } from "react-icons/ai";
import { BiAnalyse, BiLogoFacebookCircle } from "react-icons/bi";
import CommentsPopup from "./CommentsPopup";
import { getFacebookReview } from "@/lib/actions/socials";

function PostCard({
  data,
  postId,
  pageToken,
  picture,
  name,
}: {
  data: any;
  postId: string;
  pageToken: string;
  picture: string;
  name: string;
}) {
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
    permalink_url,
    message,
    created_time,
    attachments: {
      data: [{ media }],
    },
  } = data;

  const getComments = async () => {
    const comments = await fetch(
      `https://graph.facebook.com/v18.0/${postId}/comments?access_token=${pageToken}`
    );
    return comments.json();
  };

  const handleAnalylize = async () => {
    console.log("analyzing");
    const comments = await getComments();
    if (comments.data.length < 20) return;
    const commentsString = comments.data
      .map((comment: any) => comment.message)
      .join(" ");
    console.log(commentsString);
    const review = await getFacebookReview(id, commentsString);
    console.log(review);
  };

  return (
    <div>
      <div key={id} className="rounded-xl  p-2 md:p-4 flex flex-col gap-4">
        <div className="flex items-center">
          <img alt="port pic" src={picture} className="rounded-full w-12" />
          <div className="ml-2 flex justify-center flex-col mb-3">
            <h1 className="text-lg font-bold ">{name}</h1>
            <h1 className="text-sm ">
              {new Date(created_time).toDateString()}
            </h1>
          </div>
        </div>

        <p className="  whitespace-pre-line">
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
          <img
            src={media?.image?.src}
            alt="post IMage"
            className="rounded-xl"
          />
        )}
        <div className=" grid grid-cols-3 gap-3 md:gap-5 text-white">
          <Link
            href={{ pathname: permalink_url }}
            className="w-full"
            target="_blank"
          >
            <button className="bg-blue-600  rounded-md p-2 line-clamp-1 w-full flex items-center justify-center gap-2">
              <div>
                <BiLogoFacebookCircle className="inline" size={20} />
              </div>
              <span className="line-clamp-1">View on Facebook</span>
            </button>
          </Link>
          <div className="flex justify-around bg-blue-600  rounded-md p-2">
            <div className="flex items-center">
              {likesCount} <AiOutlineLike />
            </div>
            <CommentsPopup
              postId={postId}
              pageToken={pageToken}
              commentsCount={commentsCount}
            />
          </div>
          <button
            title={
              commentsCount === null || commentsCount < 20
                ? "You need at least 20 comments to analyze"
                : ""
            }
            disabled={commentsCount === null || commentsCount < 20}
            onClick={handleAnalylize}
            type="button"
            className={`${
              commentsCount === null || commentsCount < 20
                ? "bg-gray-600 cursor-not-allowed"
                : "bg-blue-600 hover:bg-blue-700"
            }  rounded-md p-2 flex items-center gap-2 justify-center `}
          >
            <div>
              <BiAnalyse className="inline" size={20} />
            </div>
            <span className=" line-clamp-1">Analyze Post</span>
          </button>
        </div>
      </div>
    </div>
  );
}

export default PostCard;
