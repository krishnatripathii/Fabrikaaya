'use client';

import React from 'react';

const ITEMS = [
  'BANDHANI',
  'IKAT',
  'CHIKANKARI',
  'AJRAKH',
  'BANARASI',
  'KOSA SILK',
  'BLOCK PRINT',
];

export default function Marquee() {
  return (
    <aside
      aria-label="Traditional textile crafts marquee"
      className="relative w-full h-[64px] bg-[var(--indigo)] text-[var(--ivory)] border-y border-[var(--hairline)] overflow-hidden flex items-center group cursor-default"
    >
      <div className="flex w-max animate-marquee group-hover:[animation-play-state:paused]">
        {/* Sequence 1 */}
        <div className="flex items-center shrink-0">
          {ITEMS.map((craft, i) => (
            <span key={`seq1-${i}`} className="flex items-center">
              <span className="font-display italic text-[28px] font-medium tracking-wide px-4">
                {craft}
              </span>
              <span className="text-[var(--marigold)] text-lg px-2 select-none" aria-hidden="true">
                ✦
              </span>
            </span>
          ))}
        </div>

        {/* Sequence 2 for continuous loop */}
        <div className="flex items-center shrink-0" aria-hidden="true">
          {ITEMS.map((craft, i) => (
            <span key={`seq2-${i}`} className="flex items-center">
              <span className="font-display italic text-[28px] font-medium tracking-wide px-4">
                {craft}
              </span>
              <span className="text-[var(--marigold)] text-lg px-2 select-none">
                ✦
              </span>
            </span>
          ))}
        </div>

        {/* Sequence 3 to be safe on ultra-wide screens */}
        <div className="flex items-center shrink-0" aria-hidden="true">
          {ITEMS.map((craft, i) => (
            <span key={`seq3-${i}`} className="flex items-center">
              <span className="font-display italic text-[28px] font-medium tracking-wide px-4">
                {craft}
              </span>
              <span className="text-[var(--marigold)] text-lg px-2 select-none">
                ✦
              </span>
            </span>
          ))}
        </div>
      </div>
    </aside>
  );
}
