import { Image } from "@nextui-org/react";

import PostCard from "./PostCard";
import Loading from "./Loading";

type Props = {
  data: any;
};

function FacebookPageData({ data }: Props) {
  if (data?.published_posts)
    return (
      <div className="p-5  w-full flex flex-col">
        <div
          style={{
            backgroundImage: `linear-gradient(120deg, black, rgba(0,0,0,0.8), rgba(0,0,0,0.6), rgba(0, 0, 0, 0.067) , transparent),url(${data?.cover?.source})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
          className=" p-5 py-14 rounded-md flex flex-col"
        >
          <Image
            width={50}
            height={50}
            className="rounded-md mb-2"
            src={data?.picture?.data?.url}
            alt=""
          />
          <h1 className="font-semibold">{data?.name}</h1>
          <h1>{data?.followers_count} followers</h1>
          <h1 className="font-semibold">
            posts ({data?.published_posts.data.length})
          </h1>
        </div>
        <div className="flex flex-col gap-5 mt-5 max-w-2xl">
          {data?.published_posts.data
            .filter(
              (post: any) =>
                post.attachments.data[0].title !==
                "This content isn't available at the moment"
            )
            .map((post: any) => (
              <PostCard
                key={post.id}
                data={post}
                postId={post.id}
                pageToken={data.access_token}
                picture={data.picture?.data.url}
                name={data.name}
              />
            ))}
        </div>
      </div>
    );
  else return <Loading />;
}

export default FacebookPageData;
