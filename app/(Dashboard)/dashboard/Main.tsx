'use client';
import React from 'react';
import { productsList } from '@/lib/data';
import Pcard from './Pcard';

export default function Main() {
  return (
    <div className="flex flex-col flex-1 w-full gap-3">
      <div className="flex items-center justify-center flex-1 w-full h-32 animate-pulse bg-slate-400/50 rounded-lg">
        <p>history section comming soon...</p>
      </div>
      <div className="py-1 my-3 border-b border-gray-300/50">
        <h1 className="text-2xl text-gray-900">Services</h1>
      </div>
      <div className="items-center justify-center grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {productsList.map((product) => (
          <Pcard key={product.name + 'servicesCard'} product={product} />
        ))}
      </div>
    </div>
  );
}
