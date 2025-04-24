import React from 'react';
import { Github, Heart } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-white py-6 border-t border-gray-200">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-gray-600 mb-4 md:mb-0">
            © {new Date().getFullYear()} OPML to Anki Converter
          </p>
          <div className="flex items-center space-x-4">
            <a 
              href="#" 
              className="text-gray-600 hover:text-blue-500 transition-colors duration-200 flex items-center"
            >
              <Github className="w-5 h-5 mr-1" />
              <span className="text-sm">Source Code</span>
            </a>
            <span className="text-sm text-gray-600 flex items-center">
              Made with <Heart className="w-4 h-4 mx-1 text-red-500" /> by developers
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}