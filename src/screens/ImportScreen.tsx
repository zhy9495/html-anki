import React, { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { Upload, AlertCircle, FileUp } from 'lucide-react';
import { useApp } from '../contexts/AppContext';
import { parseHtmlFile } from '../utils/htmlParser';

export default function ImportScreen() {
  const { 
    setOpmlData, 
    setFileName, 
    setCurrentStep, 
    error, 
    setError, 
    setFlashcards 
  } = useApp();

  const onDrop = useCallback(async (acceptedFiles: File[]) => {
    setError(null);
    const file = acceptedFiles[0];
    
    if (!file) return;
    
    if (!file.name.toLowerCase().endsWith('.html') && !file.name.toLowerCase().endsWith('.htm')) {
      setError('Please upload a valid HTML file');
      return;
    }

    try {
      const fileContent = await file.text();
      const data = parseHtmlFile(fileContent);
      
      if (!data || data.length === 0) {
        setError('No valid content found in the HTML file');
        return;
      }
      
      setFileName(file.name);
      setOpmlData(data);
      
      // Convert to flashcards
      const cards = [];
      for (const node of data) {
        if (node.children.length > 0) {
          for (const child of node.children) {
            cards.push({
              id: `${node.id}-${child.id}`,
              front: node.text,
              back: child.text,
              formattedFront: node.formattedText,
              formattedBack: child.formattedText
            });
          }
        }
      }
      
      setFlashcards(cards);
      setCurrentStep(2); // Move to preview step
    } catch (err) {
      console.error(err);
      setError('Error processing the HTML file. Please check the file format.');
    }
  }, [setOpmlData, setFileName, setCurrentStep, setError, setFlashcards]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'text/html': ['.html', '.htm'],
    },
    maxFiles: 1
  });

  return (
    <div className="flex flex-col items-center max-w-2xl mx-auto">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-3">Import HTML File</h2>
        <p className="text-gray-600 max-w-lg mx-auto">
          Upload your HTML file to convert it to Anki flashcards. We'll preserve formatting like 
          bold text and font colors.
        </p>
      </div>

      <div 
        {...getRootProps()} 
        className={`
          w-full border-2 border-dashed rounded-lg p-8 mb-6
          transition-all duration-200 ease-in-out
          ${isDragActive 
            ? 'border-blue-500 bg-blue-50' 
            : 'border-gray-300 hover:border-blue-400 hover:bg-blue-50'
          }
        `}
      >
        <input {...getInputProps()} />
        <div className="flex flex-col items-center justify-center text-center">
          <div className={`
            p-4 rounded-full mb-4
            ${isDragActive ? 'bg-blue-100' : 'bg-gray-100'}
          `}>
            <Upload className={`w-10 h-10 ${isDragActive ? 'text-blue-500' : 'text-gray-500'}`} />
          </div>
          <p className="text-lg font-medium text-gray-700 mb-2">
            {isDragActive ? 'Drop your HTML file here' : 'Drag & drop your HTML file here'}
          </p>
          <p className="text-sm text-gray-500 mb-4">or</p>
          <button
            type="button"
            className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors flex items-center"
          >
            <FileUp className="w-4 h-4 mr-2" />
            Browse Files
          </button>
          <p className="text-xs text-gray-500 mt-4">Supports .html and .htm files</p>
        </div>
      </div>

      {error && (
        <div className="w-full bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
          <div className="flex items-start">
            <AlertCircle className="w-5 h-5 text-red-500 mr-2 flex-shrink-0 mt-0.5" />
            <span className="text-red-700">{error}</span>
          </div>
        </div>
      )}

      <div className="bg-white rounded-lg shadow-md p-6 w-full">
        <h3 className="font-semibold text-lg text-gray-800 mb-4">How it works</h3>
        <ol className="list-decimal pl-6 space-y-3 text-gray-600">
          <li>Upload your HTML file with your notes and formatting</li>
          <li>Headings become the front (question) of your flashcards</li>
          <li>Content following each heading becomes the back (answer) of your flashcards</li>
          <li>Preview your flashcards before exporting</li>
          <li>Download as an Anki package (.apkg) ready to import into Anki</li>
        </ol>
      </div>
    </div>
  );
}