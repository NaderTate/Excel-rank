'use client';
import { useState } from 'react';
import { useLoadScript } from '@react-google-maps/api';
import Map from './Map';

export default function Main() {
  const [step, setStep] = useState('Keyword');
  const stepsList = ['Location', 'Keyword', 'Map'];

  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY as string,
    libraries: ['places'],
  });
  return (
    <div>
      <div>
        <h2 className="sr-only">Steps</h2>

        <div className="relative after:absolute after:inset-x-0 after:top-1/2 after:block after:h-0.5 after:-translate-y-1/2 after:rounded-lg after:bg-gray-100 bg-white">
          <ol className="relative z-10 flex justify-between text-sm font-medium text-gray-500">
            {stepsList.map((stepItem, index) => (
              <li
                key={index}
                className={`${
                  stepsList.indexOf(stepItem) <= stepsList.indexOf(step) ? 'text-gray-900' : ''
                } flex items-center gap-2  p-2`}
              >
                <span
                  className={`flex items-center justify-center w-6 h-6 rounded-full  ${
                    stepsList.indexOf(stepItem) <= stepsList.indexOf(step)
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-100 font-bold'
                  }`}
                >
                  <span>{index + 1}</span>
                </span>

                <span className="hidden sm:block"> {stepItem} </span>
              </li>
            ))}
          </ol>
        </div>
      </div>
      <div>{isLoaded ? <Map step={step} setStep={setStep} /> : <div>Loading...</div>}</div>
    </div>
  );
}
