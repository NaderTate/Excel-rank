import Section from "./Section";

type Props = {
  data: { text: string; img: string }[];
};

function LandingPageAnimatedSection({ data }: Props) {
  return (
    <div className="space-y-28 lg:space-y-44 px-[30px] mt-44">
      {data.map(({ text, img }, i) => (
        <Section key={i} text={text} img={img} i={i} />
      ))}
    </div>
  );
}

export default LandingPageAnimatedSection;
