import Link from "next/link";
import { AiOutlineLike } from "react-icons/ai";
import { BiAnalyse } from "react-icons/bi";
import InstagramCommentsPopup from "./CommentsPopup";
import InsightsPopup from "./InsightsPopup";

function InstagramPostCard({
  data,
  pageToken,
}: {
  data: any;
  pageToken: string;
}) {
  const handleAnalylize = async () => {
    console.log("analyzing");
  };
  return (
    <div className="rounded-xl bg-white dark:bg-background p-2 md:p-4 ">
      {" "}
      {(data.media_type == "IMAGE" || data.media_type == "CAROUSEL_ALBUM") && (
        <img
          src={data.media_url}
          alt="post IMage"
          className="rounded-xl mb-4"
        />
      )}
      <div className=" grid grid-cols-3 gap-3 md:gap-5">
        <InsightsPopup pageToken={pageToken} postId={data.id} />
        <div className="flex justify-around bg-blue-600 text-white rounded-md p-2">
          <div className="flex items-center">
            {data.like_count} <AiOutlineLike />
          </div>
          <InstagramCommentsPopup
            postId={data.id}
            pageToken={pageToken}
            commentsCount={data.comments_count}
          />
        </div>
        <button
          title={
            data.comments_count < 20
              ? "You need at least 20 comments to analyze"
              : ""
          }
          disabled={data.comments_count === null || data.comments_count < 20}
          onClick={handleAnalylize}
          type="button"
          className={`${
            data.comments_count < 20
              ? "bg-gray-600 cursor-not-allowed"
              : "bg-blue-600 hover:bg-blue-700"
          } text-white rounded-md p-2 flex items-center gap-2 justify-center"`}
        >
          <div>
            <BiAnalyse className="inline" size={20} />
          </div>
          <span className=" line-clamp-1">Analyze Post</span>
        </button>
      </div>
    </div>
  );
}

export default InstagramPostCard;
