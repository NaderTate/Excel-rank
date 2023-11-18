import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
} from "@nextui-org/react";
import { useState } from "react";
import { BiComment } from "react-icons/bi";
import SkeletonLoad from "@/app/components/SkeletonLoad";
import { FaRegHeart } from "react-icons/fa";

function InstagramCommentsPopup({
  postId,
  pageToken,
  commentsCount,
  likesCount,
}: {
  postId: string;
  pageToken: string;
  commentsCount: number | null;
  likesCount: number;
}) {
  const [comments, setComments] = useState<[] | null>(null);
  const [showComments, setShowComments] = useState<boolean>(false);

  const getComments = () => {
    if (showComments) return;
    fetch(
      `https://graph.facebook.com/v18.0/${postId}/comments?fields=from,text,timestamp&access_token=${pageToken}`
    )
      .then((res) => res.json())
      .then((res) => {
        setComments(res.data);
        setShowComments(true);
      });
  };
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  return (
    <div>
      <Button
        fullWidth
        color="primary"
        onClick={() => {
          getComments();
          onOpen();
        }}
      >
        <div className="flex items-center justify-around w-full">
          <div className="flex items-center">
            {likesCount} <FaRegHeart />
          </div>
          <div className="flex items-center">
            {commentsCount} <BiComment />
          </div>
        </div>
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
                Comments ({commentsCount})
              </ModalHeader>
              <ModalBody>
                {!comments && <SkeletonLoad />}
                {comments?.length === 0 && (
                  <h1 className="text-lg font-bold">No comments</h1>
                )}
                {comments?.map((comment: any) => (
                  <div
                    key={comment.id}
                    className="border border-blue-300 rounded-md p-2 w-full"
                  >
                    <div className="flex items-center">
                      <h1 className="text-lg font-bold  mr-1">
                        {comment.from?.username}
                      </h1>
                      <span className="text-sm ">
                        ({new Date(comment.timestamp).toDateString()})
                      </span>
                    </div>
                    <h1 className="">{comment.text}</h1>
                  </div>
                ))}
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

export default InstagramCommentsPopup;
