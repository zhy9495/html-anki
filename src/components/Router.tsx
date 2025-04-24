import React from 'react';
import { useApp } from '../contexts/AppContext';
import ImportScreen from '../screens/ImportScreen';
import PreviewScreen from '../screens/PreviewScreen';
import ExportScreen from '../screens/ExportScreen';

export function Router() {
  const { currentStep } = useApp();

  switch (currentStep) {
    case 1:
      return <ImportScreen />;
    case 2:
      return <PreviewScreen />;
    case 3:
      return <ExportScreen />;
    default:
      return <ImportScreen />;
  }
}