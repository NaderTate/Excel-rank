'use client';
import React from 'react';
import { productsList } from '@/lib/data';
import Pcard from './Pcard';

export default function Main({ reviewedlinks }: { reviewedlinks: Array<any> }) {
  return (
    <div className="flex flex-col sm:flex-row w-full px-4 min-h-screen pt-10 gap-4 md:gap-8">
      <div className="flex flex-col sm:w-1/4 md:w-1/5 w-full gap-3">
        <h1 className="text-2xl text-gray-900">Reviewed Links</h1>
        {reviewedlinks && (
          <div className="flex flex-col gap-2">
            {reviewedlinks.map((link) => (
              <div
                key={link.id + 'reviewedlinks'}
                className="flex items-center rounded-lg shadow-lg bg-slate-400/10 p-2 cursor-pointer hover:bg-slate-400/30"
              >
                <img className="w-10 mr-1 h-10 rounded-full" src={link.image} alt="business image" />
                <div className="flex flex-col gap-1">
                  <p className="text-sm text-gray-900  line-clamp-1">{link.title}</p>
                  <p className="text-xs text-gray-500 line-clamp-1">{link.address}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
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
    </div>
  );
}
