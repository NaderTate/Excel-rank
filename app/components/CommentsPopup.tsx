"use client";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useEffect, useState } from "react";
import { BiComment } from "react-icons/bi";
import SkeletonLoad from "./SkeletonLoad";

function CommentsPopup({
  postId,
  pageToken,
  commentsCount,
}: {
  postId: string;
  pageToken: string;
  commentsCount: number | null;
}) {
  const [comments, setComments] = useState<[] | null>(null);
  useEffect(() => {
    fetch(
      `https://graph.facebook.com/v18.0/${postId}/comments?access_token=${pageToken}`
    )
      .then((res) => res.json())
      .then((res) => {
        setComments(res.data);
      });
  }, []);

  return (
    <Dialog>
      <DialogTrigger>
        <div className="flex items-center">
          {commentsCount} <BiComment />
        </div>
      </DialogTrigger>
      <DialogContent className="min-h-[70vh] flex flex-col items-start w-full">
        <DialogHeader>
          <DialogTitle className="text-blue-600">Comments</DialogTitle>
        </DialogHeader>
        {!comments && <SkeletonLoad />}
        {comments?.map((comment: any) => (
          <div
            key={comment.id}
            className="border border-blue-300 rounded-md p-2 w-full"
          >
            <div className="flex items-center">
              <h1 className="text-lg font-bold  mr-1">{comment.from.name}</h1>
              <span className="text-sm text-gray-600">
                ({new Date(comment.created_time).toDateString()})
              </span>
            </div>
            <h1 className="">{comment.message}</h1>
          </div>
        ))}
      </DialogContent>
    </Dialog>
  );
}

export default CommentsPopup;
