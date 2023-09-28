'use client';
import { useState } from 'react';
import { useLoadScript } from '@react-google-maps/api';
import KeywordsSection from './KeywordsSection';
import PlacesSection from './PlacesSection';
import MapSection from './MapSection';

export default function Main() {
  const [step, setStep] = useState('Location');
  const [placeData, setPlaceData] = useState({
    position: null as any,
    id: '' as string,
    suggestedKeywords: [] as string[],
  });
  const [keywords, setKeywords] = useState<string[]>([]);
  const [placeResults, setPlaceResults] = useState<any[]>([]);

  const stepsList = ['Location', 'Keyword', 'Map'];

  const setPlaceDataHelper = (position: google.maps.LatLngLiteral, id: string, suggestedKeywords: string[]) => {
    setPlaceData({ position, id, suggestedKeywords });
  };

  const locationHash: any = {
    Location: <PlacesSection setPlace={setPlaceData} />,
    Keyword: <KeywordsSection keywords={keywords} suggestedKeywords={placeData.suggestedKeywords} setKeywords={setKeywords} />,
    Map: <MapSection keywords={keywords} placeData={placeData} />,
  };

  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY as string,
    libraries: ['places'],
  });

  const handleNext = async () => {
    switch (step) {
      case 'Location':
        if (placeData.position) {
          setStep('Keyword');
        } else {
          alert('Please select a location');
        }
        break;
      case 'Keyword':
        if (keywords.length > 0) {
          setStep('Map');
          // return nearby places data from google places api
        } else {
          alert('Please select a keyword');
        }
        break;
      case 'Map':
        break;
      default:
        break;
    }
  };

  return (
    <div className="flex flex-col items-stretch  justify-center py-14 px-5 lg:px-28">
      <div className="p-2 md:p-10 rounded-2xl bg-slate-50 shadow-lg">
        <div className=" ">
          <h2 className="sr-only">Steps</h2>
          <div className="relative after:absolute after:inset-x-0 after:top-1/2 after:block after:h-0.5 after:-translate-y-1/2 after:rounded-lg after:bg-gray-100 border-b ">
            <ol className="relative z-[1] flex justify-between text-sm font-medium text-gray-500">
              {stepsList.map((stepItem, index) => (
                <li
                  key={index}
                  className={`${stepsList.indexOf(stepItem) <= stepsList.indexOf(step) ? 'text-gray-900' : ''} flex items-center gap-2  p-2`}
                >
                  <span
                    className={`flex items-center justify-center w-6 h-6 rounded-full  ${
                      stepsList.indexOf(stepItem) <= stepsList.indexOf(step) ? 'bg-blue-600 text-white' : 'bg-gray-100 font-bold'
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
        <div className=" w-full">{isLoaded && locationHash[step]}</div>
        {/* Next and Prev */}
        <div className="flex justify-between w-full px-2 md:px-10  ">
          {step !== stepsList[0] ? (
            <button
              onClick={() => setStep(stepsList[stepsList.indexOf(step) - 1])}
              className="inline-flex items-center px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50"
            >
              Previous
            </button>
          ) : (
            <span></span>
          )}
          {step !== stepsList[2] && (
            <button
              onClick={handleNext}
              className="inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md shadow-sm hover:bg-blue-700"
            >
              Next
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
