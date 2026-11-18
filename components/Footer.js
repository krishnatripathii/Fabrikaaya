'use client';

import React from 'react';
import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="relative bg-[var(--indigo)] text-[var(--ivory)] overflow-hidden pt-20 pb-12 border-t border-[var(--hairline)]">
      <div className="max-w-[1320px] mx-auto px-5 md:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 pb-16 border-b border-[var(--ivory)]/10">
          {/* Col 1: About */}
          <div className="md:col-span-5 space-y-4">
            <div className="flex items-center gap-1.5">
              <span className="font-display italic font-medium text-[32px] lowercase text-[var(--ivory)]">
                fabrikaaya
              </span>
              <span className="w-2 h-2 rounded-full bg-[var(--marigold)] inline-block mt-1" />
            </div>
            <p className="font-body text-sm text-[var(--ivory)]/75 max-w-[38ch] leading-relaxed">
              Where India's independent designers and the people who love handcrafted fashion finally find each other. Slow cloth, honest hands, direct connection.
            </p>
          </div>

          {/* Col 2: Explore */}
          <div className="md:col-span-4 space-y-3">
            <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-[var(--marigold)]">
              Explore
            </p>
            <ul className="space-y-2.5 font-body text-sm">
              <li>
                <Link
                  href="/discover"
                  className="hover:text-[var(--marigold)] transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[var(--marigold)]"
                >
                  The Edit · Discover Pieces
                </Link>
              </li>
              <li>
                <Link
                  href="/designers"
                  className="hover:text-[var(--marigold)] transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[var(--marigold)]"
                >
                  The Makers · All Designers
                </Link>
              </li>
              <li>
                <Link
                  href="/crafts"
                  className="hover:text-[var(--marigold)] transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[var(--marigold)]"
                >
                  Craft Stories · Textile Heritage
                </Link>
              </li>
              <li>
                <Link
                  href="/quiz"
                  className="hover:text-[var(--marigold)] transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[var(--marigold)]"
                >
                  Style Quiz · Personal Consultation
                </Link>
              </li>
              <li>
                <Link
                  href="/saved"
                  className="hover:text-[var(--marigold)] transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[var(--marigold)]"
                >
                  My Saved Edit
                </Link>
              </li>
              <li>
                <Link
                  href="/requests"
                  className="hover:text-[var(--marigold)] transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[var(--marigold)]"
                >
                  Direct Requests & Responses
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Academic / Project note & Prototype Link */}
          <div className="md:col-span-3 space-y-3">
            <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-[var(--marigold)]">
              Context
            </p>
            <p className="font-body text-sm text-[var(--ivory)]/75 leading-relaxed">
              Built as a minor project, SSTC Bhilai.
            </p>
            <p className="font-mono text-[11px] uppercase tracking-[0.12em] text-[var(--ivory)]/50 pt-2">
              B.Tech Computer Science & Design
            </p>

            <div className="pt-4 border-t border-[var(--ivory)]/10">
              <Link
                href="/designer-view"
                className="font-mono text-[11px] uppercase tracking-[0.18em] text-[var(--ivory)]/70 hover:text-[var(--marigold)] transition-colors inline-flex items-center gap-1.5 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[var(--marigold)]"
              >
                <span>Designer view (prototype)</span>
                <span>↗</span>
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom row */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 font-mono text-[11px] uppercase tracking-[0.18em] text-[var(--ivory)]/60">
          <span>© 2026 Fabrikaaya. Made with care in Chhattisgarh.</span>
          <span className="text-[var(--ivory)]/40">Handcrafted Indian Fashion Archive</span>
        </div>
      </div>

      {/* Giant "fabrikaaya" wordmark at 18vw in Cormorant italic, color ivory at 8% opacity, clipped at bottom */}
      <div
        className="pointer-events-none select-none absolute -bottom-6 left-1/2 -translate-x-1/2 whitespace-nowrap leading-none font-display italic font-medium z-0"
        style={{
          fontSize: '18vw',
          color: 'rgba(246, 240, 230, 0.08)',
          lineHeight: 0.8,
        }}
        aria-hidden="true"
      >
        fabrikaaya
      </div>
    </footer>
  );
}
