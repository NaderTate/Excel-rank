import { Image } from "@nextui-org/react";

import Carousel from "./Carousel";
import InsightsPopup from "./InsightsPopup";
import AIReviewPopup from "./AIReviewPopup";
import InstagramCommentsPopup from "./CommentsPopup";

type Props = {
  data: any;
  pageToken: string;
};

function InstagramPostCard({ data, pageToken }: Props) {
  return (
    <div className="rounded-xl bg-white dark:bg-background p-2 md:p-4 ">
      {data.media_type == "IMAGE" && (
        <div>
          <Image
            width={700}
            height={700}
            src={data.media_url}
            alt="post Iage"
            className="rounded-xl "
          />
        </div>
      )}
      {data.media_type == "CAROUSEL_ALBUM" && (
        <Carousel
          images={data.children.data.map(
            (item: { id: string; media_url: string }) => item.media_url
          )}
        />
      )}
      <div className=" grid grid-cols-3 gap-3 md:gap-5 my-4">
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
      <p className="font-semibold">
        {new Date(data.timestamp).toLocaleString()}
      </p>{" "}
      <p className="whitespace-pre-line line-clamp-4">{data.caption}</p>
    </div>
  );
}

export default InstagramPostCard;
