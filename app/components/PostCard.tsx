import Link from "next/link";
import { useEffect, useState } from "react";
import { AiOutlineLike } from "react-icons/ai";
import { BiComment } from "react-icons/bi";
import CommentsPopup from "./CommentsPopup";

function PostCard({
  data,
  postId,
  pageToken,
}: {
  data: any;
  postId: string;
  pageToken: string;
}) {
  const [commentsCount, setCommentsCount] = useState<number | null>(null);
  const [likesCount, setLikesCount] = useState<number | null>(null);
  useEffect(() => {
    fetch(
      `https://graph.facebook.com/v18.0/${postId}?fields=likes.summary(true).limit(0),comments.summary(true).limit(0)&access_token=${pageToken}`
    )
      .then((res) => res.json())
      .then((res) => {
        setCommentsCount(res.comments.summary.total_count);
        setLikesCount(res.likes.summary.total_count);
      });
  }, []);
  return (
    <div>
      <div key={data.id} className="border border-blue-300 rounded-md p-2">
        <Link href={{ pathname: data.permalink_url }} target="_blank">
          <h1 className="text-lg font-bold text-blue-600">{data.message}</h1>
        </Link>
        <h1 className="text-sm text-gray-600">
          {new Date(data.created_time).toDateString()}
        </h1>
        <div className="flex justify-between">
          <div className="flex items-center">
            {likesCount} <AiOutlineLike />
          </div>
          <CommentsPopup
            postId={postId}
            pageToken={pageToken}
            commentsCount={commentsCount}
          />
        </div>
      </div>
    </div>
  );
}

export default PostCard;
