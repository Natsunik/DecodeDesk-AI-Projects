"use client";

import { useState } from "react";
import { ArrowRight, Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface Hero2Props {
  onGetStarted?: () => void;
  onLogin?: () => void;
}

const Hero2 = ({ onGetStarted, onLogin }: Hero2Props) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="relative min-h-screen overflow-hidden bg-black">
      {/* Gradient background with grain effect */}
      <div className="flex flex-col items-end absolute -right-60 -top-10 blur-xl z-0 ">
        <div className="h-[10rem] rounded-full w-[60rem] z-1 bg-gradient-to-b blur-[6rem] from-purple-600 to-sky-600"></div>
        <div className="h-[10rem] rounded-full w-[90rem] z-1 bg-gradient-to-b blur-[6rem] from-pink-900 to-yellow-400"></div>
        <div className="h-[10rem] rounded-full w-[60rem] z-1 bg-gradient-to-b blur-[6rem] from-yellow-600 to-sky-500"></div>
      </div>
      <div className="absolute inset-0 z-0 bg-noise opacity-30"></div>

      {/* Content container */}
      <div className="relative z-10">
        {/* Navigation */}
        <nav className="container mx-auto flex items-center justify-between px-4 py-4 mt-6">
          <div className="flex items-center">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-white text-black">
              <span className="font-bold">🧠</span>
            </div>
            <span className="ml-2 text-xl font-bold text-white">DecodeDesk</span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            <div className="flex items-center space-x-6">
              <NavItem label="Features" />
              <NavItem label="About" />
              <NavItem label="Pricing" />
              <NavItem label="Contact us" />
            </div>
            <div className="flex items-center space-x-3">
              <button 
                onClick={onLogin}
                className="h-12 rounded-full border border-gray-600 px-8 text-base font-medium text-white hover:bg-white/10"
              >
                Login
              </button>
              <button 
                onClick={onGetStarted}
                className="h-12 rounded-full bg-white px-8 text-base font-medium text-black hover:bg-white/90"
              >
                Get Started
              </button>
            </div>
          </div>

          {/* Mobile menu button */}
          <button
            className="md:hidden"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            <span className="sr-only">Toggle menu</span>
            {mobileMenuOpen ? (
              <X className="h-6 w-6 text-white" />
            ) : (
              <Menu className="h-6 w-6 text-white" />
            )}
          </button>
        </nav>

        {/* Mobile Navigation Menu with animation */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ y: "-100%" }}
              animate={{ y: 0 }}
              exit={{ y: "-100%" }}
              transition={{ duration: 0.3 }}
              className="fixed inset-0 z-50 flex flex-col p-4 bg-black/95 md:hidden"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-white text-black">
                    <span className="font-bold">🧠</span>
                  </div>
                  <span className="ml-2 text-xl font-bold text-white">
                    DecodeDesk
                  </span>
                </div>
                <button onClick={() => setMobileMenuOpen(false)}>
                  <X className="h-6 w-6 text-white" />
                </button>
              </div>
              <div className="mt-8 flex flex-col space-y-6">
                <MobileNavItem label="Features" />
                <MobileNavItem label="About" />
                <MobileNavItem label="Pricing" />
                <MobileNavItem label="Contact us" />
                <div className="pt-4">
                  <button 
                    onClick={onLogin}
                    className="w-full justify-start border border-gray-700 text-white h-12 rounded-full px-8"
                  >
                    Login
                  </button>
                </div>
                <button 
                  onClick={onGetStarted}
                  className="h-12 rounded-full bg-white px-8 text-base font-medium text-black hover:bg-white/90"
                >
                  Get Started
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Badge */}
        <div className="mx-auto mt-6 flex max-w-fit items-center justify-center space-x-2 rounded-full bg-white/10 px-4 py-2 backdrop-blur-sm">
          <span className="text-sm font-medium text-white">
            Cut through corporate BS with AI!
          </span>
          <ArrowRight className="h-4 w-4 text-white" />
        </div>

        {/* Hero section */}
        <div className="container mx-auto mt-12 px-4 text-center">
          <h1 className="mx-auto max-w-4xl text-5xl font-bold leading-tight text-white md:text-6xl lg:text-7xl">
            DecodeDesk: Instantly Translate Corporate Jargon to Real Talk
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-gray-300">
            Translate corporate jargon into honest, plain English instantly. 
            No more wondering what your colleagues actually mean. Free for everyone!
          </p>
          <div className="mt-10 flex flex-col items-center justify-center space-y-4 sm:flex-row sm:space-x-4 sm:space-y-0">
            <a href="#demo" className="h-12 rounded-full bg-white px-8 text-base font-medium text-black hover:bg-white/90 flex items-center justify-center">
              Try It Now - No Signup Required
            </a>
            <a href="#demo" className="h-12 rounded-full border border-gray-600 px-8 text-base font-medium text-white hover:bg-white/10 flex items-center justify-center">
              See Examples
            </a>
          </div>

          <div className="relative mx-auto my-20 w-full max-w-6xl">
            <div className="absolute inset-0 rounded shadow-lg bg-white blur-[10rem] bg-grainy opacity-20" />

            {/* Hero Image */}
            <img
              src="https://images.unsplash.com/photo-1551434678-e076c223a692?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
              alt="Corporate meeting with people discussing business"
              className="relative w-full h-auto shadow-md rounded"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

function NavItem({
  label,
  hasDropdown,
}: {
  label: string;
  hasDropdown?: boolean;
}) {
  return (
    <div className="flex items-center text-sm text-gray-300 hover:text-white cursor-pointer">
      <span>{label}</span>
      {hasDropdown && (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="ml-1"
        >
          <path d="m6 9 6 6 6-6" />
        </svg>
      )}
    </div>
  );
}

function MobileNavItem({ label }: { label: string }) {
  return (
    <div className="flex items-center justify-between border-b border-gray-800 pb-2 text-lg text-white cursor-pointer">
      <span>{label}</span>
      <ArrowRight className="h-4 w-4 text-gray-400" />
    </div>
  );
}

export { Hero2 };