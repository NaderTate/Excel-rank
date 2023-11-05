"use client";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useState } from "react";
import { BiComment } from "react-icons/bi";
import SkeletonLoad from "../../SkeletonLoad";

function InstagramCommentsPopup({
  postId,
  pageToken,
  commentsCount,
}: {
  postId: string;
  pageToken: string;
  commentsCount: number | null;
}) {
  const [comments, setComments] = useState<[] | null>(null);
  const [showComments, setShowComments] = useState<boolean>(false);

  const getComments = () => {
    if (showComments) return;
    fetch(
      `https://graph.facebook.com/v18.0/${postId}/comments?fields=from,text,timestamp&access_token=${pageToken}`
    )
      .then((res) => res.json())
      .then((res) => {
        setComments(res.data);
        setShowComments(true);
      });
  };

  return (
    <Dialog>
      <DialogTrigger onClick={getComments}>
        <div className="flex items-center">
          {commentsCount} <BiComment />
        </div>
      </DialogTrigger>
      <DialogContent className="min-h-[70vh] flex flex-col items-start w-full bg-[#18191a] backdrop-blur-sm border-0 rounded-xl text-gray-50">
        <DialogHeader>
          <DialogTitle>Comments</DialogTitle>
        </DialogHeader>
        {!comments && <SkeletonLoad />}
        {comments?.length === 0 && (
          <h1 className="text-lg font-bold">No comments</h1>
        )}
        {comments?.map((comment: any) => (
          <div
            key={comment.id}
            className="border border-blue-300 rounded-md p-2 w-full"
          >
            <div className="flex items-center">
              <h1 className="text-lg font-bold  mr-1">
                {comment.from?.username}
              </h1>
              <span className="text-sm text-gray-100">
                ({new Date(comment.timestamp).toDateString()})
              </span>
            </div>
            <h1 className="">{comment.text}</h1>
          </div>
        ))}
      </DialogContent>
    </Dialog>
  );
}

export default InstagramCommentsPopup;
