import { BiComment } from "react-icons/bi";
import SkeletonLoad from "./SkeletonLoad";
import PostCard from "./PostCard";

function FacebookPageData({ data }: { data: any }) {
  if (data?.id)
    return (
      <div className="p-5">
        <img
          width={50}
          height={50}
          className="rounded-md mb-2"
          src={data?.picture?.data?.url}
          alt=""
        />
        <h1 className="font-semibold">{data?.name}</h1>
        <h1>{data?.followers_count} followers</h1>
        <h1 className="font-bold text-xl mt-5">
          posts ({data?.published_posts.data.length})
        </h1>
        {data?.published_posts.data.map((post: any) => (
          <PostCard
            key={post.id}
            data={post}
            postId={post.id}
            pageToken={data.access_token}
          />
        ))}
      </div>
    );
  else return <SkeletonLoad />;
}

export default FacebookPageData;
