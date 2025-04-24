import React, { useState } from 'react';
import { ArrowLeft, ArrowRight, Edit, Save, X, AlertCircle } from 'lucide-react';
import { useApp } from '../contexts/AppContext';
import FlashcardPreview from '../components/FlashcardPreview';

export default function PreviewScreen() {
  const { 
    flashcards, 
    setFlashcards, 
    setCurrentStep, 
    fileName,
    error,
    setError
  } = useApp();
  
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [isEditing, setIsEditing] = useState(false);
  const [editedFront, setEditedFront] = useState('');
  const [editedBack, setEditedBack] = useState('');
  
  const currentCard = flashcards[currentCardIndex];
  
  const goToPreviousCard = () => {
    if (currentCardIndex > 0) {
      setCurrentCardIndex(currentCardIndex - 1);
      setIsEditing(false);
    }
  };
  
  const goToNextCard = () => {
    if (currentCardIndex < flashcards.length - 1) {
      setCurrentCardIndex(currentCardIndex + 1);
      setIsEditing(false);
    }
  };
  
  const handleEdit = () => {
    setEditedFront(currentCard.formattedFront);
    setEditedBack(currentCard.formattedBack);
    setIsEditing(true);
  };
  
  const handleSave = () => {
    const updatedFlashcards = [...flashcards];
    updatedFlashcards[currentCardIndex] = {
      ...currentCard,
      formattedFront: editedFront,
      formattedBack: editedBack
    };
    setFlashcards(updatedFlashcards);
    setIsEditing(false);
  };
  
  const handleCancel = () => {
    setIsEditing(false);
  };
  
  const handleProceed = () => {
    if (flashcards.length === 0) {
      setError('No flashcards to export. Please import a valid OPML file.');
      return;
    }
    setCurrentStep(3);
  };
  
  const handleBack = () => {
    setCurrentStep(1);
  };

  if (flashcards.length === 0) {
    return (
      <div className="flex flex-col items-center max-w-2xl mx-auto">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-3">Preview Flashcards</h2>
          <p className="text-gray-600">No flashcards available. Please import a valid OPML file.</p>
        </div>
        
        <button
          onClick={handleBack}
          className="px-6 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
        >
          Go Back to Import
        </button>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center max-w-3xl mx-auto">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-3">Preview Flashcards</h2>
        <p className="text-gray-600">
          Reviewing {flashcards.length} flashcards from <span className="font-medium">{fileName}</span>
        </p>
      </div>
      
      {error && (
        <div className="w-full bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
          <div className="flex items-start">
            <AlertCircle className="w-5 h-5 text-red-500 mr-2 flex-shrink-0 mt-0.5" />
            <span className="text-red-700">{error}</span>
          </div>
        </div>
      )}
      
      <div className="w-full bg-white rounded-lg shadow-lg overflow-hidden mb-6">
        {isEditing ? (
          <div className="p-6">
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">Front (Question)</label>
              <textarea
                value={editedFront}
                onChange={(e) => setEditedFront(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                rows={4}
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">Back (Answer)</label>
              <textarea
                value={editedBack}
                onChange={(e) => setEditedBack(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                rows={4}
              />
            </div>
            <div className="flex justify-end space-x-3">
              <button
                onClick={handleCancel}
                className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 flex items-center"
              >
                <X className="w-4 h-4 mr-1" /> Cancel
              </button>
              <button
                onClick={handleSave}
                className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 flex items-center"
              >
                <Save className="w-4 h-4 mr-1" /> Save
              </button>
            </div>
          </div>
        ) : (
          <FlashcardPreview card={currentCard} />
        )}
      </div>
      
      <div className="w-full flex justify-between items-center mb-8">
        <div className="flex items-center">
          <button
            onClick={goToPreviousCard}
            disabled={currentCardIndex === 0}
            className={`p-2 rounded-md mr-2 ${
              currentCardIndex === 0 
                ? 'text-gray-400 cursor-not-allowed' 
                : 'text-gray-700 hover:bg-gray-100'
            }`}
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <span className="text-sm text-gray-600">
            Card {currentCardIndex + 1} of {flashcards.length}
          </span>
          <button
            onClick={goToNextCard}
            disabled={currentCardIndex === flashcards.length - 1}
            className={`p-2 rounded-md ml-2 ${
              currentCardIndex === flashcards.length - 1 
                ? 'text-gray-400 cursor-not-allowed' 
                : 'text-gray-700 hover:bg-gray-100'
            }`}
          >
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>
        
        {!isEditing && (
          <button
            onClick={handleEdit}
            className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 flex items-center"
          >
            <Edit className="w-4 h-4 mr-1" /> Edit Card
          </button>
        )}
      </div>
      
      <div className="w-full flex justify-between">
        <button
          onClick={handleBack}
          className="px-6 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
        >
          Back to Import
        </button>
        
        <button
          onClick={handleProceed}
          className="px-6 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
        >
          Proceed to Export
        </button>
      </div>
    </div>
  );
}