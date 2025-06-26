import React from 'react';

interface BoltBadgeProps {
  className?: string;
}

export function BoltBadge({ className = '' }: BoltBadgeProps) {
  return (
    <div className={`fixed top-16 right-4 z-50 ${className}`}>
      <a
        href="https://bolt.new/"
        target="_blank"
        rel="noopener noreferrer"
        className="block transition-transform hover:scale-105 active:scale-95"
        aria-label="Powered by Bolt.new"
      >
        <img
          src="/bolt-white_circle_360x360.png"
          alt="Powered by Bolt.new"
          className="w-12 h-12 md:w-16 md:h-16 rounded-full shadow-lg hover:shadow-xl transition-shadow"
        />
      </a>
    </div>
  );
}