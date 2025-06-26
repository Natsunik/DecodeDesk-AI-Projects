import React from 'react';
import { SponsorLogos } from './sponsor-logos';

interface FooterProps {
  onNavigate?: (page: 'contact' | 'pricing') => void;
}

export function Footer({ onNavigate }: FooterProps) {
  return (
    <footer className="bg-black border-t border-gray-800 text-white py-12">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center mb-4">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-white text-black mr-2">
                <span className="font-bold">🧠</span>
              </div>
              <span className="text-xl font-bold">DecodeDesk</span>
            </div>
            <p className="text-gray-400">
              AI-powered corporate speak translator. Cut through the jargon and get to the truth.
            </p>
          </div>
          
          <div>
            <h3 className="font-semibold mb-4">Product</h3>
            <ul className="space-y-2 text-white/70">
              <li><a href="#features" className="hover:text-white">Features</a></li>
              <li><a href="#pricing" className="hover:text-white">Pricing</a></li>
              <li><a href="#examples" className="hover:text-white">Examples</a></li>
              <li><a href="#api" className="hover:text-white">API</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-semibold mb-4">Company</h3>
            <ul className="space-y-2 text-white/70">
              <li><a href="#about" className="hover:text-white">About</a></li>
              <li><a href="#blog" className="hover:text-white">Blog</a></li>
              <li><a href="#careers" className="hover:text-white">Careers</a></li>
              <li>
                <button 
                  onClick={() => onNavigate?.('contact')}
                  className="hover:text-white"
                >
                  Contact
                </button>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-semibold mb-4">Support</h3>
            <ul className="space-y-2 text-white/70">
              <li><a href="#help" className="hover:text-white">Help Center</a></li>
              <li><a href="#privacy" className="hover:text-white">Privacy</a></li>
              <li><a href="#terms" className="hover:text-white">Terms</a></li>
              <li><a href="#security" className="hover:text-white">Security</a></li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-800 mt-8 pt-8">
          {/* Sponsor Logos Section */}
          <div className="mb-8">
            <SponsorLogos />
          </div>
          
          {/* Footer Links */}
          <div className="text-center text-gray-400">
            <p className="text-white/70">
              Made with ❤️ by DecodeDesk | 
              <a href="#privacy" className="hover:text-white ml-1">Privacy Policy</a> | 
              <button onClick={() => onNavigate?.('contact')} className="hover:text-white ml-1">Contact</button> | 
              <a href="#twitter" className="hover:text-white ml-1">Twitter/X</a> | 
              <a href="#github" className="hover:text-white ml-1">GitHub</a>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}