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
    <div ref={ref} className="lg:min-h-[345px] min-h-[100px]">
      {inview && (
        <div
          className={`flex flex-col items-center xl:flex-row gap-10 justify-between ${
            i % 2 == 0 && "xl:flex-row-reverse"
          }`}
        >
          <div className={` ${i % 2 == 0 && " flex"} xl:max-w-[50vw]`}>
            <span className={`m-auto mr-0  `}>
              <GPT_Type_Effect text={text} />
            </span>
          </div>
          <img
            src={img}
            className="rounded-[40px]  shadow-lg landingImg "
            alt=""
          />
        </div>
      )}
    </div>
  );
};
export default Section;
