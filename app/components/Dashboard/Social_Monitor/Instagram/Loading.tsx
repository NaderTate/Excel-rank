import { Skeleton } from "@nextui-org/react";
import React from "react";

function Loading() {
  return (
    <div className="w-full space-y-5 p-4">
      <div className="flex items-center gap-2">
        <Skeleton disableAnimation className="rounded-full w-24 h-24 " />
        <div className="space-y-2 w-full">
          <Skeleton disableAnimation className="rounded-full w-full h-4" />
          <Skeleton disableAnimation className="rounded-full w-3/4 h-4" />
          <Skeleton disableAnimation className="rounded-full w-1/2 h-4" />
        </div>
      </div>
      <Skeleton disableAnimation className="rounded-lg w-12 h-4" />
      <Skeleton
        disableAnimation
        className="rounded-lg sm:w-1/2 aspect-square"
      />
    </div>
  );
}

export default Loading;
