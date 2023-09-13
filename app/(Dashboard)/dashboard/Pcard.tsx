import React from 'react';
import Link from 'next/link';

export default function Pcard({ product }: any) {
  return (
    <Link href={product.link} className="h-full">
      <article className="hover:animate-background rounded-xl w-full h-full  bg-gradient-to-r from-green-300 via-blue-500 to-purple-600 p-0.5 shadow-xl transition hover:bg-[length:400%_400%] hover:shadow-sm hover:[animation-duration:_4s]">
        <div className="rounded-[10px] h-full bg-white p-4 sm:p-6">
          <product.icon className="h-6 w-6 text-gray-400" />

          <h3 className="mt-0.5 text-lg font-medium text-gray-900">{product.name}</h3>

          <div className="mt-4">
            <p className="text-sm text-gray-500">{product.description}</p>
          </div>
        </div>
      </article>
    </Link>
  );
}
