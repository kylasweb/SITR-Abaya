"use client";

import { useState, useEffect } from 'react';
import { quotes } from '@/lib/quotes';
import { Separator } from './ui/separator';

export default function IslamicQuote() {
  const [quoteIndex, setQuoteIndex] = useState<number | null>(null);

  useEffect(() => {
    // Set the initial quote on the client to avoid hydration mismatch
    setQuoteIndex(Math.floor(Math.random() * quotes.length));

    const interval = setInterval(() => {
      setQuoteIndex(prevIndex => (prevIndex !== null ? (prevIndex + 1) % quotes.length : 0));
    }, 3600000); // Change quote every hour (60 * 60 * 1000 ms)

    return () => clearInterval(interval);
  }, []);

  const currentQuote = quoteIndex !== null ? quotes[quoteIndex] : null;

  if (!currentQuote) {
    return (
      <div className="container mx-auto px-4 py-12 text-center">
        <div className="h-10 bg-muted/50 animate-pulse rounded-md w-3/4 mx-auto"></div>
        <div className="h-4 bg-muted/50 animate-pulse rounded-md w-1/4 mx-auto mt-4"></div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-12 text-center">
      <blockquote className="font-headline text-xl md:text-2xl italic text-primary-foreground max-w-4xl mx-auto">
        "{currentQuote.text}"
      </blockquote>
      <p className="mt-4 text-sm text-primary-foreground/80 tracking-wide">
        - {currentQuote.source}
      </p>
    </div>
  );
}
