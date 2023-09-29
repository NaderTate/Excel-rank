'use client';
import { useState, useRef } from 'react';
import { AiOutlineCloseCircle } from 'react-icons/ai';
import { FiChevronDown } from 'react-icons/fi';
import { AnimatePresence, motion } from 'framer-motion';

export default function KeywordsSection({
  keywords,
  suggestedKeywords,
  setKeywords,
}: {
  keywords: Array<string>;
  suggestedKeywords: Array<string>;
  setKeywords: (keywords: Array<string>) => void;
}) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [closed, setClosed] = useState<Boolean>(false);

  const onEnter = (e: any) => {
    if (e.key === 'Enter') {
      setKeywords([...keywords, e.target.value]);
      e.target.value = '';
    }
  };

  const focusInput = () => {
    inputRef.current?.focus();
  };

  return (
    <div className="my-5 p-2 md:p-10 ">
      <h1 className="text-xl md:text-3xl my-2 font-bold">Select keywords 📝</h1>
      <div onClick={focusInput} className="flex flex-wrap p-2 gap-2 border bg-white rounded-lg min-h-[50px]">
        {keywords &&
          keywords.map((word, index) => (
            <div key={index + 'keyword' + word} className=" p-1 flex items-center justify-center text-sm bg-gray-500/30 rounded-lg border">
              <span>{word}</span>
              <AiOutlineCloseCircle
                className="p-1 w-6 h-6 text-black cursor-pointer"
                onClick={() => {
                  setKeywords(keywords.filter((w) => w !== word));
                }}
              />
            </div>
          ))}
        <input
          ref={inputRef}
          onKeyDown={onEnter}
          type="text"
          className="bg-transparent outline-none focus:outline-none flex-1"
          placeholder={!keywords ? 'Please insert the keywords' : ''}
        />
      </div>
      <div className="flex flex-col gap-2 mt-10 bg-gray-300 shadow-sm border rounded-xl p-4">
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }} className="flex flex-col gap-2">
          <div onClick={() => setClosed(!closed)} className="flex justify-between items-center cursor-pointer">
            <h1 className="xs:text-lg sm:text-xl font-bold">Suggested keywords</h1>
            <button type="button" className="focus:outline-none">
              <FiChevronDown className={`text-2xl transition ${closed ? 'transform rotate-180' : ''}`} />
            </button>
          </div>
          <AnimatePresence>
            {!closed && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
                className="flex flex-wrap gap-2 overflow-hidden"
              >
                {suggestedKeywords.map((word) => (
                  <div
                    key={word + 'suggestion'}
                    onClick={() => {
                      if (!keywords.includes(word)) {
                        setKeywords([...keywords, word]);
                      }
                    }}
                    className=" p-1 flex flex-1 items-center justify-between text-sm cursor-pointer bg-slate-100 transition hover:bg-slate-200 rounded-lg border"
                  >
                    <span>{word}</span>
                    {/* Add */}
                    <span className=" text-xl mx-2 text-black">+</span>
                  </div>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </div>
  );
}
