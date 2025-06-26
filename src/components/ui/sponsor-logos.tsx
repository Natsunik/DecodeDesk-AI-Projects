import React from 'react';

interface SponsorLogosProps {
  className?: string;
}

export function SponsorLogos({ className = '' }: SponsorLogosProps) {
  const sponsors = [
    {
      name: 'Netlify',
      logo: '/netlify-logo-color.svg',
      url: 'https://netlify.com',
      alt: 'Netlify - Deploy modern static websites'
    },
    {
      name: 'Entri',
      logo: '/entri-logo-white.svg',
      url: 'https://entri.app',
      alt: 'Entri - Career platform'
    },
    {
      name: 'Supabase',
      logo: '/Supabas-logo-color.svg',
      url: 'https://supabase.com',
      alt: 'Supabase - Open source Firebase alternative'
    }
  ];

  return (
    <div
      className={`fixed bottom-4 right-4 z-40 bg-black/80 rounded-xl px-4 py-3 shadow-xl flex flex-col items-center space-y-2 ${className}`}
      style={{ minWidth: '220px' }}
    >
      <div className="flex flex-wrap items-center justify-center gap-3 md:gap-4">
        {sponsors.map((sponsor) => (
          <a
            key={sponsor.name}
            href={sponsor.url}
            target="_blank"
            rel="noopener noreferrer"
            className="transition-transform hover:scale-105 active:scale-95 opacity-90 hover:opacity-100"
            aria-label={`Visit ${sponsor.name}`}
          >
            <img
              src={sponsor.logo}
              alt={sponsor.alt}
              className="h-7 md:h-8 w-auto max-w-[90px] object-contain"
            />
          </a>
        ))}
      </div>
      <div className="flex items-center gap-2 text-xs text-white/70">
        <span>Powered by</span>
        <a
          href="https://bolt.new/"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-white/90 transition-colors font-semibold"
        >
          Bolt.new
        </a>
      </div>
    </div>
  );
}
