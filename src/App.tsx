import React from 'react';
import { Router } from './components/Router';
import { AppProvider } from './contexts/AppContext';
import Header from './components/Header';
import Footer from './components/Footer';

function App() {
  return (
    <AppProvider>
      <div className="flex flex-col min-h-screen bg-slate-50">
        <Header />
        <main className="flex-grow container mx-auto px-4 py-8">
          <Router />
        </main>
        <Footer />
      </div>
    </AppProvider>
  );
}

export default App;