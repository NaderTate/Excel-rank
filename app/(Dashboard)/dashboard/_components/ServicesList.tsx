import { services } from "../data";

import ServiceCard from "./ServiceCard";

type Props = {};

const ServicesList = ({}: Props) => {
  return (
    <div className="items-center justify-center grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
      {services.map((service) => (
        <ServiceCard key={service.name + "servicesCard"} service={service} />
      ))}
    </div>
  );
};

export default ServicesList;
