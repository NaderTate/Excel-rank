import { Skeleton } from "@nextui-org/react";
function Loading() {
  return (
    <div className="w-full space-y-5 p-4">
      <Skeleton disableAnimation className="rounded-lg w-full h-36 sm:h-56" />
      <div className="flex items-center gap-2">
        <Skeleton disableAnimation className="rounded-full w-12 h-12" />
        <div className="space-y-2">
          <Skeleton disableAnimation className="rounded-full w-36 h-4" />
          <Skeleton disableAnimation className="rounded-full w-24 h-4" />
        </div>
      </div>
      <Skeleton
        disableAnimation
        className="rounded-lg sm:w-1/2 aspect-square"
      />
    </div>
  );
}

export default Loading;
