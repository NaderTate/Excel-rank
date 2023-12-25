"use client";

import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
} from "@nextui-org/react";
import Image from "next/image";
import { useState } from "react";

import { SlGraph } from "react-icons/sl";

type Props = {
  postId: string;
  pageToken: string;
};

function InsightsPopup({ postId, pageToken }: Props) {
  const [insights, setInsights] = useState<any[] | null>(null);
  const [showInsights, setShowInsights] = useState<boolean>(false);
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const emojiWidth = 25;

  const metrics = [
    { name: "post_engaged_users", displayName: "Engaged Users" },
    {
      name: "post_engaged_fan",
      displayName: "Engaged Fans",
    },
    {
      name: "post_negative_feedback",
      displayName: "Negative Feedback",
    },
    {
      name: "post_clicks",
      displayName: "Clicks",
    },
    {
      name: "post_impressions",
      displayName: "Impressions",
    },
    {
      name: "post_impressions_paid",
      displayName: "Paid Impressions",
    },
    {
      name: "post_impressions_organic",
      displayName: "Organic Impressions",
    },
  ];

  const reactions = [
    { name: "post_reactions_like_total", img: "like.svg" },
    { name: "post_reactions_love_total", img: "love.svg" },
    { name: "post_reactions_wow_total", img: "wow.svg" },
    { name: "post_reactions_haha_total", img: "haha.svg" },
    { name: "post_reactions_sorry_total", img: "sad.svg" },
    { name: "post_reactions_anger_total", img: "angry.svg" },
  ];

  const getInsights = () => {
    if (showInsights) return;

    fetch(
      `https://graph.facebook.com/v18.0/${postId}/insights?metric=${metrics
        .map((metric) => metric.name)
        .join(",")}
      ,${reactions
        .map((reaction) => reaction.name)
        .join(",")}&access_token=${pageToken}`
    )
      .then((res) => res.json())
      .then((res) => {
        setInsights(res.data);
        // setShowInsights(true);
      });
  };

  return (
    <>
      <Button
        fullWidth
        color="primary"
        startContent={<SlGraph />}
        onClick={() => {
          getInsights();
          onOpen();
        }}
      >
        Insights
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
                <h1 className="text-lg font-bold">Insights</h1>
              </ModalHeader>
              <ModalBody>
                <div className="flex gap-3">
                  {reactions.map((reaction) => (
                    <div
                      key={reaction.name}
                      className="flex flex-col items-center"
                    >
                      <Image
                        src={`/images/emojies/${reaction.img}`}
                        alt="sad"
                        width={emojiWidth}
                        height={emojiWidth}
                      />
                      <span>
                        {
                          insights?.find(
                            (insight: any) => insight.name === reaction.name
                          )?.values[0].value
                        }
                      </span>
                    </div>
                  ))}
                </div>

                {insights
                  ?.filter(
                    (insight: any) =>
                      !reactions.find(
                        (reaction) => reaction.name === insight.name
                      )
                  )
                  .map((insight: any) => (
                    <div key={insight.name}>
                      <div className="flex justify-between mfgdr-36 border-b ">
                        <h1 className=" font-bold">
                          {
                            metrics.find(
                              (metric) => metric.name === insight.name
                            )?.displayName
                          }
                        </h1>
                        <h1 className=" ">{insight.values[0].value}</h1>
                      </div>
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
    </>
  );
}

export default InsightsPopup;
