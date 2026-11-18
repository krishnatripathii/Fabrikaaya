import React from 'react';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

export const metadata = {
  title: '404 · Thread Not Found — Fabrikaaya',
};

export default function NotFound() {
  return (
    <div className="min-h-[70vh] flex items-center justify-center py-20 px-5 md:px-8 text-center">
      <div className="max-w-[480px] mx-auto space-y-6">
        <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-[var(--terracotta)] block">
          Error 404
        </span>

        <div className="font-display text-[120px] sm:text-[144px] font-medium leading-none text-[var(--ink)]">
          404
        </div>

        <p className="font-display italic text-2xl sm:text-3xl text-[var(--umber)]">
          This thread has come loose.
        </p>

        <p className="font-body text-sm text-[var(--umber)] max-w-[34ch] mx-auto leading-relaxed">
          The page or weaver atelier you are searching for does not exist in our handloom archive.
        </p>

        <div className="pt-4">
          <Link
            href="/"
            className="inline-flex items-center gap-2 py-3.5 px-8 rounded-full font-mono text-[11px] uppercase tracking-[0.18em] bg-[var(--ink)] text-[var(--ivory)] hover:bg-[var(--terracotta)] transition-all duration-200 hover:-translate-y-0.5 active:scale-98 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--terracotta)]"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Return home</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
