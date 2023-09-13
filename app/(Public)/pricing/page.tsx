import React from 'react';
import { pricingItems } from '@/lib/data';

export default function page() {
  return (
    <div className="mx-auto px-4 sm:px-6 min-h-screen flex items-center justify-center pt-20">
      <div className="flex flex-wrap items-center justify-center gap-8">
        {pricingItems.map((item) => (
          <div
            key={item.name + 'pricing'}
            className="rounded-2xl border max-w-xl border-blue-600 p-6 shadow-sm ring-1 ring-blue-600 sm:order-last sm:px-8 lg:p-12 transition hover:scale-[1.01] hover:shadow-lg cursor-pointer"
          >
            <div className="text-center">
              <h2 className="text-lg md:text-xl font-medium text-gray-900">
                {item.name}
                <span className="sr-only">Plan</span>
              </h2>

              <p className="mt-2 sm:mt-4">
                <strong className="text-3xl font-bold text-gray-900 sm:text-4xl">
                  {item.price}$
                </strong>

                <span className="text-sm font-medium text-gray-700">/month</span>
              </p>
            </div>

            <ul className="mt-6 space-y-2">
              {item.features.map((feature, index) => (
                <li key={item.name + index + 'feature'} className="flex items-center gap-1">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="h-5 w-5 text-indigo-700"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                  </svg>

                  <span className="text-gray-700">{feature}</span>
                </li>
              ))}
            </ul>

            <a
              href="#"
              className="mt-8 block rounded-full border gradient_bg  hover:border-blue-700 transition  hover:scale-[1.02] text-center text-white p-3"
            >
              Get Started
            </a>
          </div>
        ))}
      </div>
    </div>
  );
}
