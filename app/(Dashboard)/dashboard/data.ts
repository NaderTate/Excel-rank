import { FcComments, FcPositiveDynamic, FcShare } from "react-icons/fc";

export const services = [
  {
    name: "Review Manager",
    link: "/dashboard/reviews",
    icon: FcComments,
    description:
      "Reviewalyzer instantly analyzes product reviews using advanced NLP. It delivers an easy to grasp summary highlighting key themes, so you can make informed purchase decisions fast.",
  },
  {
    name: "Local Ranking",
    link: "/dashboard/localranking",
    icon: FcPositiveDynamic,
    description:
      "Compare your business SEO and advertising performance with your competitors.",
  },
  {
    name: "Social Monitoring",
    link: "/dashboard/socialmonitor",
    icon: FcShare,
    description:
      "Track your social media performance and analyze your customers’ feedback.",
  },
];
