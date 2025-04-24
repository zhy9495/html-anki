import React, { useState } from 'react';
import { ArrowLeft, Download, CheckCircle, AlertCircle, Loader2 } from 'lucide-react';
import { useApp } from '../contexts/AppContext';
import { generateAnkiPackage } from '../utils/ankiExporter';

export default function ExportScreen() {
  const { flashcards, setCurrentStep, fileName } = useApp();
  const [isExporting, setIsExporting] = useState(false);
  const [exportComplete, setExportComplete] = useState(false);
  const [exportError, setExportError] = useState<string | null>(null);
  const [deckName, setDeckName] = useState(fileName.replace('.opml', ''));
  
  const handleBack = () => {
    setCurrentStep(2);
  };
  
  const handleExport = async () => {
    if (!deckName.trim()) {
      setExportError('Please enter a valid deck name');
      return;
    }
    
    setIsExporting(true);
    setExportError(null);
    
    try {
      await generateAnkiPackage(flashcards, deckName);
      setExportComplete(true);
    } catch (error) {
      console.error('Export error:', error);
      setExportError('Error generating Anki package. Please try again.');
    } finally {
      setIsExporting(false);
    }
  };
  
  const handleNewConversion = () => {
    setCurrentStep(1);
  };
  
  return (
    <div className="flex flex-col items-center max-w-2xl mx-auto">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-3">Export to Anki</h2>
        <p className="text-gray-600">
          Create an Anki package with {flashcards.length} flashcards
        </p>
      </div>
      
      <div className="w-full bg-white rounded-lg shadow-md p-6 mb-8">
        <div className="mb-6">
          <label htmlFor="deckName" className="block text-sm font-medium text-gray-700 mb-2">
            Deck Name
          </label>
          <input
            type="text"
            id="deckName"
            value={deckName}
            onChange={(e) => setDeckName(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter deck name"
            disabled={isExporting || exportComplete}
          />
        </div>
        
        {exportError && (
          <div className="mb-6 bg-red-50 border border-red-200 rounded-lg p-4">
            <div className="flex items-start">
              <AlertCircle className="w-5 h-5 text-red-500 mr-2 flex-shrink-0 mt-0.5" />
              <span className="text-red-700">{exportError}</span>
            </div>
          </div>
        )}
        
        {exportComplete ? (
          <div className="mb-6 bg-green-50 border border-green-200 rounded-lg p-4">
            <div className="flex items-start">
              <CheckCircle className="w-5 h-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-green-700 font-medium">Export complete!</p>
                <p className="text-green-600 text-sm mt-1">
                  Your Anki package has been downloaded. You can now import it into Anki.
                </p>
              </div>
            </div>
          </div>
        ) : (
          <div className="flex justify-between items-center mb-2">
            <p className="text-sm text-gray-500">
              Total cards: <span className="font-medium">{flashcards.length}</span>
            </p>
            <p className="text-sm text-gray-500">
              Format: <span className="font-medium">.apkg</span>
            </p>
          </div>
        )}
        
        <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 mb-6">
          <h4 className="font-medium text-gray-800 mb-2">How to use your Anki package</h4>
          <ol className="list-decimal pl-5 text-sm text-gray-600 space-y-1">
            <li>Download the Anki package (.apkg file)</li>
            <li>Open Anki on your computer</li>
            <li>Click "File" &gt; "Import" and select the downloaded file</li>
            <li>All your cards will be imported with formatting preserved</li>
          </ol>
        </div>
        
        {exportComplete ? (
          <button
            onClick={handleNewConversion}
            className="w-full py-3 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
          >
            Convert Another File
          </button>
        ) : (
          <button
            onClick={handleExport}
            disabled={isExporting}
            className={`
              w-full py-3 rounded-md transition-colors flex items-center justify-center
              ${isExporting 
                ? 'bg-blue-400 cursor-not-allowed' 
                : 'bg-blue-500 hover:bg-blue-600'}
              text-white
            `}
          >
            {isExporting ? (
              <>
                <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                Generating Anki Package...
              </>
            ) : (
              <>
                <Download className="w-5 h-5 mr-2" />
                Export as Anki Package
              </>
            )}
          </button>
        )}
      </div>
      
      {!exportComplete && (
        <button
          onClick={handleBack}
          className="px-6 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 flex items-center"
        >
          <ArrowLeft className="w-4 h-4 mr-1" />
          Back to Preview
        </button>
      )}
    </div>
  );
}