import React from 'react';
import { FileSpreadsheet, Bookmark } from 'lucide-react';
import { useApp } from '../contexts/AppContext';
import StepIndicator from './StepIndicator';

const steps = [
  { number: 1, name: 'Import', description: 'Upload HTML file' },
  { number: 2, name: 'Preview', description: 'Review flashcards' },
  { number: 3, name: 'Export', description: 'Download Anki package' }
];

export default function Header() {
  const { currentStep } = useApp();

  return (
    <header className="bg-white shadow-sm">
      <div className="container mx-auto px-4 py-4">
        <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4">
          <div className="flex items-center">
            <div className="flex items-center justify-center w-10 h-10 bg-blue-500 text-white rounded-lg mr-3">
              <FileSpreadsheet className="w-6 h-6" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-900 flex items-center">
                HTML to Anki
                <Bookmark className="w-5 h-5 ml-2 text-orange-500" />
              </h1>
              <p className="text-sm text-gray-600">Convert your HTML files to Anki flashcards</p>
            </div>
          </div>
          
          <StepIndicator steps={steps} currentStep={currentStep} />
        </div>
      </div>
    </header>
  );
}