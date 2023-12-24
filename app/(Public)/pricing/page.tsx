import { pricingItems } from "./data";

import { IoCheckmark } from "react-icons/io5";

export default function Page() {
  return (
    <div className="mx-auto px-4 sm:px-6 min-h-screen flex items-center justify-center pt-20">
      <div className="flex flex-wrap items-center justify-center gap-8">
        {pricingItems.map((item) => (
          <div
            key={item.name + "pricing"}
            className="rounded-2xl border max-w-xl border-blue-600 p-6 shadow-sm ring-1 ring-blue-600 sm:order-last sm:px-8 lg:p-12 transition hover:scale-[1.01] hover:shadow-lg cursor-pointer"
          >
            <div className="text-center">
              <h2 className="text-lg md:text-xl font-medium ">
                {item.name}
                <span className="sr-only">Plan</span>
              </h2>

              <p className="mt-2 sm:mt-4">
                <strong className="text-3xl font-bold  sm:text-4xl">
                  {item.price}$
                </strong>

                <span className="text-sm font-medium ">/month</span>
              </p>
            </div>

            <ul className="mt-6 space-y-2">
              {item.features.map((feature, index) => (
                <li
                  key={item.name + index + "feature"}
                  className="flex items-center gap-1"
                >
                  <IoCheckmark size={20} className="text-indigo-700" />
                  <span>{feature}</span>
                </li>
              ))}
            </ul>

            <a
              href="#"
              className="mt-8 block rounded-full border main_gradient transition  hover:scale-[1.02] text-center text-white p-3"
            >
              Get Started
            </a>
          </div>
        ))}
      </div>
    </div>
  );
}
