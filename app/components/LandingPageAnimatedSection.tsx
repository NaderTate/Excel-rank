function LandingPageAnimatedSection({
  data,
}: {
  data: { text: string; img: string }[];
}) {
  return (
    <div className="space-y-44">
      {data.map((section, i) => (
        <div
          key={i}
          className={`flex items-center justify-between ${
            i % 2 == 0 && " flex-row-reverse"
          }`}
        >
          <div className={`text-[36px] font-semibold ${i % 2 == 0 && " flex"}`}>
            <span
              className={`m-auto mr-0 text-[36px] w-[552px] whitespace-pre-line `}
            >
              {section.text}
            </span>
          </div>
          <img src={section.img} className="rounded-[40px] shadow-lg" alt="" />
        </div>
      ))}
    </div>
  );
}

export default LandingPageAnimatedSection;
