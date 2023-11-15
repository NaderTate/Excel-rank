import React from "react";
import SkeletonLoad from "@/app/components/SkeletonLoad";
import Image from "next/image";
import Link from "next/link";
import { BiLinkAlt } from "react-icons/bi";
import InstagramPostCard from "./PostCard";

function InstagramPageData({
  data,
  pageToken,
}: {
  data: any;
  pageToken: string;
}) {
  if (data?.ig_id)
    return (
      <div className="p-5">
        <div className="flex items-center gap-5">
          <img
            loading="lazy"
            src={data?.profile_picture_url}
            width={100}
            height={100}
            className="rounded-full"
            alt={data.username}
          />
          <div>
            <h1 className="text-lg">{data.username}</h1>
            <div className="flex gap-5 my-1">
              <h1 className="mr-2">
                <span className="font-bold"> {data.media_count} </span>
                posts
              </h1>
              <h1>
                <span className="font-bold">{data.followers_count} </span>
                followers
              </h1>
              <h1>
                <span className="font-bold">{data.follows_count} </span>
                following
              </h1>
            </div>
            <h1 className="my-2 font-semibold">{data.name}</h1>
            <h1 className="max-w-2xl">{data.biography}</h1>
            <Link
              className="flex items-center gap-2 text-blue-600 dark:text-blue-200 font-semibold"
              href={{ pathname: data.website }}
              target="_blank"
            >
              <BiLinkAlt />
              {data.website}
            </Link>
          </div>
        </div>
        <h1 className="my-5 font-semibold text-2xl">Posts</h1>
        <div className="max-w-2xl space-y-4">
          {data.media.data.map((post: any) => (
            <InstagramPostCard
              key={post.id}
              data={post}
              pageToken={pageToken}
            />
          ))}
        </div>
      </div>
    );
  else return <SkeletonLoad />;
}

export default InstagramPageData;
