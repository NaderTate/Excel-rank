'use client';
import { useRef } from 'react';

export default function Page() {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleGetReviews = async () => {
    const url = inputRef.current?.value;
    if (!url) return;

    const res = await fetch('/api/review', {
      method: 'POST',
      body: JSON.stringify({ link: url }),
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const data = await res.json();
    console.log(data);
  };

  return (
    <div className="mt-20 flex flex-col w-full gap-3 p-2 md:p-8">
      <h2 className="text-2xl text-gray-900 border-b py-2 border-gray-300/50 w-fit">
        GET REVIEWS FROM CUSTOMERS
      </h2>
      <div className="relative w-full items-center flex">
        <input
          ref={inputRef}
          type="text"
          placeholder="Input the business URL"
          className="w-full px-4 py-3 border border-gray-300 rounded-full focus:ring-2 focus:border-transparent"
        />
        <button
          onClick={handleGetReviews}
          type="button"
          className="absolute gradient_bg right-0 m-1 rounded-full w-20 py-2 text-gray-200 hover:text-white transition"
        >
          Get Reviews
        </button>
      </div>
      <div>
        <h2 className="text-2xl text-gray-900 border-b py-2 border-gray-300/50 w-fit">Results</h2>
      </div>
    </div>
  );
}
