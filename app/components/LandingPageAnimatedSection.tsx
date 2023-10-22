import Section from "./Section";

function LandingPageAnimatedSection({
  data,
}: {
  data: { text: string; img: string }[];
}) {
  return (
    <div className="space-y-44">
      {data.map(({ text, img }, i) => (
        <Section key={i} text={text} img={img} i={i} />
      ))}
    </div>
  );
}

export default LandingPageAnimatedSection;
