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
    <div className={`flex flex-col items-center space-y-4 ${className}`}>
      <p className="text-white/70 text-sm font-medium">
        Made with ❤️ for the Hackathon
      </p>
      
      <div className="flex flex-wrap items-center justify-center gap-6 md:gap-8">
        {sponsors.map((sponsor) => (
          <a
            key={sponsor.name}
            href={sponsor.url}
            target="_blank"
            rel="noopener noreferrer"
            className="transition-transform hover:scale-105 active:scale-95 opacity-80 hover:opacity-100"
            aria-label={`Visit ${sponsor.name}`}
          >
            <img
              src={sponsor.logo}
              alt={sponsor.alt}
              className="h-8 md:h-10 w-auto max-w-[120px] object-contain"
            />
          </a>
        ))}
      </div>
      
      <div className="flex items-center gap-2 text-xs text-white/60">
        <span>Powered by</span>
        <a
          href="https://bolt.new/"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-white/80 transition-colors"
        >
          Bolt.new
        </a>
      </div>
    </div>
  );
}