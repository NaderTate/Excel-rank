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
import { useState } from "react";
import { SlGraph } from "react-icons/sl";
function InsightsPopup({
  postId,
  pageToken,
}: {
  postId: string;
  pageToken: string;
}) {
  const [insights, setInsights] = useState<[] | null>(null);
  const [showInsights, setShowInsights] = useState<boolean>(false);
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  function rearrangeArray(data: []) {
    // Define the desired order of keys
    const order = [
      "likes",
      "comments",
      "saved",
      "reach",
      "impressions",
      "total_interactions",
      "follows",
      "profile_visits",
    ];

    // Create a custom sorting function based on the order
    function customSort(a: { name: string }, b: { name: string }) {
      const indexA = order.indexOf(a.name);
      const indexB = order.indexOf(b.name);
      return indexA - indexB;
    }

    // Sort the data array using the custom sorting function
    const sortedData = data.sort(customSort);

    return sortedData;
  }
  const getInsights = () => {
    if (showInsights) return;
    fetch(
      `https://graph.facebook.com/v18.0/${postId}/insights?metric=saved%2Creach%2Cimpressions%2Ctotal_interactions%2Clikes%2Ccomments%2Cfollows%2Cprofile_visits&access_token=${pageToken}`
    )
      .then((res) => res.json())
      .then((res) => {
        const rearrangedInsights = rearrangeArray(res.data);

        setInsights(rearrangedInsights);
        setShowInsights(true);
      });
  };

  return (
    <div>
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
                {insights?.map((insight: any) => (
                  <div key={insight.name}>
                    <div className="flex justify-between mfgdr-36 border-b ">
                      <h1 className="text-lg font-bold">{insight.title}</h1>
                      <h1 className="text-lg ">{insight.values[0].value}</h1>
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
    </div>
  );
}

export default InsightsPopup;
