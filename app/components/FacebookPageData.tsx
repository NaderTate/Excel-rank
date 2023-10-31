import SkeletonLoad from "./SkeletonLoad";
import PostCard from "./PostCard";

function FacebookPageData({ data }: { data: any }) {
  if (data?.published_posts)
    return (
      <div className="p-5 bg-[#18191a] text-white w-full flex flex-col">
        <div
          style={{
            backgroundImage: `linear-gradient(120deg, black, rgba(0,0,0,0.8), rgba(0,0,0,0.6), rgba(0, 0, 0, 0.067) , transparent),url(${data?.cover?.source})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
          className="bg-[#242526] p-5 py-14 rounded-md flex flex-col"
        >
          <img
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
  else return <SkeletonLoad />;
}

export default FacebookPageData;
