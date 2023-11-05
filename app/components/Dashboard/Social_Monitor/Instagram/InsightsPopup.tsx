"use client";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
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
        console.log(res.data);
      });
  };

  return (
    <Dialog>
      <DialogTrigger
        onClick={getInsights}
        className="bg-blue-600 text-white rounded-md p-2 line-clamp-1 w-full flex items-center justify-center gap-2"
      >
        <SlGraph /> Insights
      </DialogTrigger>
      <DialogContent className="overflow-auto max-h-[90vh]">
        <DialogHeader>
          <DialogTitle>Your Post insights</DialogTitle>
          {insights?.map((insight: any) => (
            <div key={insight.name}>
              <div className="flex justify-between mfgdr-36 border-b ">
                <h1 className="text-lg font-bold">{insight.title}</h1>
                <h1 className="text-lg ">{insight.values[0].value}</h1>
              </div>
            </div>
          ))}
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}

export default InsightsPopup;
