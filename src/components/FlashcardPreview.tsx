import React, { useState } from 'react';
import { RotateCw } from 'lucide-react';
import { FlashCard } from '../types';

interface FlashcardPreviewProps {
  card: FlashCard;
}

export default function FlashcardPreview({ card }: FlashcardPreviewProps) {
  const [isFlipped, setIsFlipped] = useState(false);
  
  const handleFlip = () => {
    setIsFlipped(!isFlipped);
  };
  
  return (
    <div 
      className="w-full h-96 relative cursor-pointer"
      onClick={handleFlip}
    >
      <div 
        className={`
          absolute inset-0 flex flex-col items-center justify-center p-8 text-center transition-all duration-300 transform 
          ${isFlipped ? 'opacity-0 rotate-y-180 pointer-events-none' : 'opacity-100 rotate-y-0'}
        `}
      >
        <div className="mb-auto w-full text-right">
          <span className="text-xs uppercase tracking-wide text-gray-500 font-semibold">Front</span>
        </div>
        
        <div className="flex-grow flex items-center justify-center w-full">
          <div 
            className="max-w-full overflow-auto"
            dangerouslySetInnerHTML={{ __html: card.formattedFront }}
          />
        </div>
        
        <div className="mt-auto flex justify-center">
          <button
            className="flex items-center text-sm text-blue-500 hover:text-blue-600"
            onClick={(e) => {
              e.stopPropagation();
              handleFlip();
            }}
          >
            <RotateCw className="w-4 h-4 mr-1" /> Flip Card
          </button>
        </div>
      </div>
      
      <div 
        className={`
          absolute inset-0 flex flex-col items-center justify-center p-8 text-center transition-all duration-300 transform 
          ${isFlipped ? 'opacity-100 rotate-y-0' : 'opacity-0 rotate-y-180 pointer-events-none'}
        `}
      >
        <div className="mb-auto w-full text-right">
          <span className="text-xs uppercase tracking-wide text-gray-500 font-semibold">Back</span>
        </div>
        
        <div className="flex-grow flex items-center justify-center w-full">
          <div 
            className="max-w-full overflow-auto"
            dangerouslySetInnerHTML={{ __html: card.formattedBack }}
          />
        </div>
        
        <div className="mt-auto flex justify-center">
          <button
            className="flex items-center text-sm text-blue-500 hover:text-blue-600"
            onClick={(e) => {
              e.stopPropagation();
              handleFlip();
            }}
          >
            <RotateCw className="w-4 h-4 mr-1" /> Flip Card
          </button>
        </div>
      </div>
    </div>
  );
}