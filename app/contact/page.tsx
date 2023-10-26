import React from "react";

function page() {
  return (
    <div className="mains pt-20">
      <div className="flex flex-col  h-96 pt-52 items-center justify-center bg-amber-300 gap-10">
        <h1 className="text-4xl pageHeader">Contact Page</h1>
        <p className="mx-10 pageContent text-center line-clamp-3">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ac urna
          auctor, viverra sapien. Donec euismod turpis eget massa lobortis, eget
          scelerisque justo.
        </p>
      </div>
    </div>
  );
}

export default page;