import Image from "next/image";

import "./index.css";
const images: Array<string> = [
  "https://res.cloudinary.com/dqkyatgoy/image/upload/v1697733891/image_50_xzekzy.svg",
  "https://res.cloudinary.com/dqkyatgoy/image/upload/v1697733891/image_44_khna8j.svg",
  "https://res.cloudinary.com/dqkyatgoy/image/upload/v1697733890/image_45_svjlh7.svg",
  "https://res.cloudinary.com/dqkyatgoy/image/upload/v1697733892/trustpilot-2_1_gwmrrd.svg",
  "https://res.cloudinary.com/dqkyatgoy/image/upload/v1697733890/image_43_llhgbm.svg",
  "https://res.cloudinary.com/dqkyatgoy/image/upload/v1697733890/image_39_imisc4.svg",
  "https://res.cloudinary.com/dqkyatgoy/image/upload/v1697733902/image_48_xpn6xr.svg",
  "https://res.cloudinary.com/dqkyatgoy/image/upload/v1697733892/image_42_e131zo.svg",
];

const SlidingLogos = () => {
  return (
    <>
      <h1 className="text-xl md:text-3xl font-bold text-center mt-20 gradient_text font-serif">
        Analyze thousands of comments and reviews on:
      </h1>
      <div className="inner">
        <div className="wrapper">
          <section className="logos-sections">
            {images.map((url) => (
              <div className="image" key={url}>
                <Image
                  width={70}
                  height={70}
                  src={url}
                  alt={"logo"}
                  className="object-contain"
                />
              </div>
            ))}
          </section>
          <section className="logos-sections">
            {images.map((url) => (
              <div className="image" key={url}>
                <Image
                  width={70}
                  height={70}
                  src={url}
                  alt={"logo"}
                  className="rounded-xl object-contain "
                />
              </div>
            ))}
          </section>
          <section className="logos-sections object-contain">
            {images.map((url) => (
              <div className="image" key={url}>
                <Image width={70} height={70} src={url} alt={"logo"} />
              </div>
            ))}
          </section>
        </div>
      </div>
    </>
  );
};

export default SlidingLogos;
