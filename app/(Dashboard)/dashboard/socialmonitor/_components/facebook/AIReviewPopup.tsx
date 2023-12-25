import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
  Spinner,
} from "@nextui-org/react";
import { useState } from "react";

import { AnalyzeSocialComments } from "@/actions/client/socials";
import { ChatCompletion } from "openai/resources/chat/index.mjs";

import { BiAnalyse } from "react-icons/bi";

type Props = {
  postId: string;
  commentsCount: number;
  pageToken: string;
};

function AIReviewPopup({ postId, commentsCount, pageToken }: Props) {
  const [review, setReview] = useState<string | null>(null);
  const [showComments, setShowComments] = useState<boolean>(false);
  const [loading, setLoading] = useState(false);

  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const getComments = async () => {
    const comments = await fetch(
      `https://graph.facebook.com/v18.0/${postId}/comments?access_token=${pageToken}`
    );
    return comments.json();
  };

  const handleAnalylize = async () => {
    if (showComments || commentsCount < 20) return;
    setLoading(true);
    const comments = await getComments();
    const commentsString: string = comments.data
      .map((comment: { message: string }) => comment.message)
      .join("/");

    const review = await AnalyzeSocialComments(
      postId,
      commentsString,
      "facebook"
    );

    const JsonReview: ChatCompletion = JSON.parse(review.aiResponse);
    setReview(JsonReview.choices[0].message.content);
    setShowComments(true);
    setLoading(false);
  };
  return (
    <>
      <Button
        fullWidth
        color="primary"
        onPress={() => {
          handleAnalylize();
          onOpen();
        }}
        startContent={<BiAnalyse />}
      >
        Analyze Post
      </Button>
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
                {!review && loading && (
                  <div className="flex justify-center flex-col items-center gap-2">
                    <h1>Analyzing</h1>
                    <Spinner />
                  </div>
                )}
                {commentsCount < 20 && (
                  <p className="text-center">
                    You need at least 20 comments to start the analysis
                  </p>
                )}
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
    </>
  );
}

export default AIReviewPopup;
