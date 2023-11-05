import React from 'react';

const rankMap = (rank: number) => {
  if (rank <= 3) return 'green-card-selection';
  if (rank <= 10) return 'yellow-card-selection';
  return 'red-card-selection';
};

export default function MCard({ id, placeData, Rank }: { id: string; placeData: any; Rank: number }) {
  return (
    <article className={`flex  transition hover:shadow-xl max-w-xs  ${id === placeData?.place_id ? rankMap(Rank) : 'bg-white'}`}>
      <div className="rotate-180 p-2 [writing-mode:_vertical-lr]">
        <div className="flex items-center justify-between gap-4 text-xs font-bold uppercase text-gray-900">
          <span>RANK</span>
          <span className="w-px flex-1 bg-gray-900/10"></span>
          <span>{Rank}</span>
        </div>
      </div>

      <div className="hidden sm:block sm:basis-16">
        <img alt={placeData?.name} src={placeData?.icon} className="aspect-square h-full w-full object-contain" />
      </div>

      <div className="flex flex-1 flex-col justify-between">
        <div className="border-s border-gray-900/10 p-1 sm:border-l-transparent sm:p-2">
          <h3 className="font-bold text-sm uppercase text-gray-900">{placeData?.name}</h3>

          <p className="mt-2 line-clamp-2 text-xs text-gray-700">{placeData?.vicinity}</p>
        </div>

        <div className="sm:flex sm:items-end sm:justify-end">
          <span className="block bg-slate-100 px-5 py-3 text-center text-xs font-bold uppercase text-gray-900 transition hover:bg-white">
            {placeData?.rating} ⭐
          </span>
        </div>
      </div>
    </article>
  );
}
