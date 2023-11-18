"use client";
import { useEffect } from "react";
import Image from "next/image";

const Banner = ({ images, speed = 15000 }) => {
  // load the css file
  useEffect(() => {
    import("./index.css");
  }, []);
  return (
    <div className="inner">
      <div className="wrapper">
        <section style={{ "--speed": `${speed}ms` }}>
          {images.map((url) => (
            <div className="image" key={url}>
              <img src={url} alt={url} />
            </div>
          ))}
        </section>
        <section style={{ "--speed": `${speed}ms` }}>
          {images.map((url) => (
            <div className="image" key={url}>
              <img src={url} alt={url} className="rounded-xl" />
            </div>
          ))}
        </section>
        <section style={{ "--speed": `${speed}ms` }}>
          {images.map((url) => (
            <div className="image" key={url}>
              <img src={url} alt={url} />
            </div>
          ))}
        </section>
      </div>
    </div>
  );
};

export default Banner;
