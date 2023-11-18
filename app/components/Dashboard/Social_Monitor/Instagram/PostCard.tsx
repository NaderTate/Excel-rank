import InstagramCommentsPopup from "./CommentsPopup";
import InsightsPopup from "./InsightsPopup";
import AIReviewPopup from "./AIReviewPopup";
import { Image } from "@nextui-org/react";
function InstagramPostCard({
  data,
  pageToken,
}: {
  data: any;
  pageToken: string;
}) {
  return (
    <div className="rounded-xl bg-white dark:bg-background p-2 md:p-4 ">
      {(data.media_type == "IMAGE" || data.media_type == "CAROUSEL_ALBUM") && (
        <Image
          width={700}
          height={700}
          src={data.media_url}
          alt="post Iage"
          className="rounded-xl mb-4"
        />
      )}
      <div className=" grid grid-cols-3 gap-3 md:gap-5">
        <InsightsPopup
          media_type={data.media_type}
          pageToken={pageToken}
          postId={data.id}
        />
        <InstagramCommentsPopup
          postId={data.id}
          pageToken={pageToken}
          commentsCount={data.comments_count}
          likesCount={data.like_count}
        />
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
