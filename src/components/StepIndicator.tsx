import React from 'react';
import { Check } from 'lucide-react';
import { Step } from '../types';

interface StepIndicatorProps {
  steps: Step[];
  currentStep: number;
}

export default function StepIndicator({ steps, currentStep }: StepIndicatorProps) {
  return (
    <div className="hidden md:flex items-center space-x-4">
      {steps.map((step, index) => {
        const isCompleted = step.number < currentStep;
        const isCurrent = step.number === currentStep;
        
        return (
          <React.Fragment key={step.number}>
            {index > 0 && (
              <div 
                className={`h-0.5 w-8 ${
                  steps[index - 1].number < currentStep ? 'bg-blue-500' : 'bg-gray-300'
                }`}
              />
            )}
            <div className="flex flex-col items-center">
              <div 
                className={`
                  flex items-center justify-center w-8 h-8 rounded-full 
                  ${isCompleted ? 'bg-blue-500' : isCurrent ? 'bg-blue-500' : 'bg-gray-300'}
                  text-white text-sm font-medium transition-all duration-200
                `}
              >
                {isCompleted ? <Check className="w-4 h-4" /> : step.number}
              </div>
              <span 
                className={`
                  mt-1 text-xs font-medium 
                  ${isCurrent ? 'text-blue-600' : isCompleted ? 'text-blue-500' : 'text-gray-500'}
                `}
              >
                {step.name}
              </span>
            </div>
          </React.Fragment>
        );
      })}
    </div>
  );
}