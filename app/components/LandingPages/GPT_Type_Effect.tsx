"use client";
import { useState, useEffect } from "react";
function GPT_Type_Effect({
  text,
  delay = 30,
}: {
  text: string;
  delay?: number;
}) {
  const [displayText, setDisplayText] = useState("");
  const [completedTyping, setCompletedTyping] = useState(false);
  useEffect(() => {
    setCompletedTyping(false);
    let i = 0;
    const intervalId = setInterval(() => {
      setDisplayText(text.slice(0, i));
      i++;
      if (i > text.length) {
        clearInterval(intervalId);
        setCompletedTyping(true);
      }
    }, delay);
    return () => clearInterval(intervalId);
  }, []);
  return (
    <div>
      <h1 className="whitespace-pre-line text-lg sm:text-2xl lg:text-3xl xl:text-4xl text-center xl:text-start font-semibold">
        {displayText}{" "}
        {!completedTyping && (
          <svg
            viewBox="8 4 8 16"
            xmlns="http://www.w3.org/2000/svg"
            className="cursor"
          >
            <rect x="10" y="6" width="4" height="12" fill="#000000" />
          </svg>
        )}
      </h1>
    </div>
  );
}

export default GPT_Type_Effect;
