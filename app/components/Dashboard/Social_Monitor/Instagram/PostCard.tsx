import { AiOutlineLike } from "react-icons/ai";
import InstagramCommentsPopup from "./CommentsPopup";
import InsightsPopup from "./InsightsPopup";
import AIReviewPopup from "./AIReviewPopup";

function InstagramPostCard({
  data,
  pageToken,
}: {
  data: any;
  pageToken: string;
}) {
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
        <AIReviewPopup
          postId={data.id}
          commentsCount={data.comments_count}
          pageToken={pageToken}
        />
      </div>
    </div>
  );
}

export default InstagramPostCard;
