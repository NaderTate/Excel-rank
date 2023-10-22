"use client";
import { useInView } from "react-intersection-observer";
import { useState, useEffect } from "react";
import GPT_Type_Effect from "./GPT_Type_Effect";

const Section = ({
  text,
  img,
  i,
}: {
  text: string;
  img: string;
  i: number;
}) => {
  const { ref, inView } = useInView({
    threshold: 0.7,
  });
  const [inview, setInView] = useState(false);
  useEffect(() => {
    if (inView) {
      setInView(true);
    }
  }, [inView]);

  return (
    <div ref={ref} className="min-h-[345px]">
      {inview && (
        <div
          className={`flex items-center justify-between ${
            i % 2 == 0 && " flex-row-reverse"
          }`}
        >
          <div className={`text-[36px] font-semibold ${i % 2 == 0 && " flex"}`}>
            <span
              className={`m-auto mr-0 text-[36px] w-[552px] whitespace-pre-line `}
            >
              <GPT_Type_Effect text={text} />
            </span>
          </div>
          <img
            src={img}
            className="rounded-[40px]  shadow-lg landingImg min-h-[345px]"
            alt=""
          />
        </div>
      )}
    </div>
  );
};
export default Section;
