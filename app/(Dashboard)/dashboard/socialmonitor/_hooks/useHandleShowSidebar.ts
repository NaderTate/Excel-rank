"use client";

import { useEffect, useState } from "react";

export const useHandleShowSidebar = () => {
  const [showSideBar, setShowSideBar] = useState(false);

  const handleClickOutside = (event: MouseEvent) => {
    if ((event.target as Element).closest("#sidebar") === null) {
      setShowSideBar(false);
    }
  };
  const handleKeyPress = (event: KeyboardEvent) => {
    if (event.key === "Escape") {
      setShowSideBar(false);
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleClickOutside);
    document.addEventListener("keydown", handleKeyPress);

    return () => {
      document.removeEventListener("click", handleClickOutside);
      document.removeEventListener("keydown", handleKeyPress);
    };
  });
  return { showSideBar, setShowSideBar };
};
