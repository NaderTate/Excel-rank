import SkeletonLoad from "@/app/components/SkeletonLoad";
import { AnalyzeSocialComments } from "@/lib/actions/socials";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
} from "@nextui-org/react";
import { ChatCompletion } from "openai/resources/chat/index.mjs";
import { useState } from "react";
import { BiAnalyse } from "react-icons/bi";
function AIReviewPopup({
  postId,
  commentsCount,
  pageToken,
}: {
  postId: string;
  commentsCount: number;
  pageToken: string;
}) {
  const [review, setReview] = useState<string | null>(null);
  const [showComments, setShowComments] = useState<boolean>(false);
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const getComments = async () => {
    const comments = await fetch(
      `https://graph.facebook.com/v18.0/${postId}/comments?fields=text&access_token=${pageToken}`
    );
    return comments.json();
  };
  const handleAnalylize = async () => {
    if (showComments || commentsCount < 20) return;
    const comments = await getComments();
    const commentsString: string = comments.data
      .map((comment: { text: string }) => comment.text)
      .join("/");
    const review = await AnalyzeSocialComments(
      postId,
      commentsString,
      "instagram"
    );
    const JsonReview: ChatCompletion = JSON.parse(review.aiResponse);
    setReview(JsonReview.choices[0].message.content);
    setShowComments(true);
  };
  return (
    <div>
      <button
        title={
          commentsCount === null || commentsCount < 20
            ? "You need at least 20 comments to analyze"
            : ""
        }
        disabled={commentsCount === null || commentsCount < 20}
        onClick={() => {
          handleAnalylize();
          onOpen();
        }}
        type="button"
        className={`${
          commentsCount === null || commentsCount < 20
            ? "bg-gray-600 cursor-not-allowed"
            : "bg-blue-600 hover:bg-blue-700"
        }  rounded-md p-2 flex items-center gap-2 justify-center w-full`}
      >
        <div>
          <BiAnalyse className="inline" size={20} />
        </div>
        <span className=" line-clamp-1">Analyze Post</span>
      </button>
      <Modal
        placement="center"
        className="bg-background"
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        scrollBehavior="inside"
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                <h1 className="text-lg font-bold">Summary</h1>
              </ModalHeader>
              <ModalBody>
                {!review && <SkeletonLoad />}

                <p className="whitespace-pre-line">{review}</p>
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Close
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </div>
  );
}

export default AIReviewPopup;
