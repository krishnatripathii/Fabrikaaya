'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { getItemsByDesigner } from '@/data/items';

export default function DesignerCard({ designer }) {
  const pieces = getItemsByDesigner(designer.slug);
  const initials = designer.name
    .split(' ')
    .map((n) => n[0])
    .join('');
  const monogramBg = designer.palette[0] || '#B5472B';

  return (
    <Link
      href={`/designers/${designer.slug}`}
      className="group block rounded-[4px] border border-[var(--hairline)] bg-[var(--paper)] p-7 transition-all duration-300 hover:bg-[var(--ivory)] hover:border-[var(--terracotta)] hover:shadow-[0_20px_50px_-20px_rgba(27,22,18,0.25)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--terracotta)]"
    >
      <div className="flex items-start justify-between gap-4 mb-6">
        {/* Monogram circle */}
        <div
          className="w-[72px] h-[72px] rounded-full flex items-center justify-center text-[var(--ivory)] font-display text-[32px] font-medium border border-[var(--hairline)] shadow-xs shrink-0"
          style={{ backgroundColor: monogramBg }}
        >
          {initials}
        </div>

        {/* Commission pill */}
        {designer.openToCommissions && (
          <span className="inline-block px-3 py-1 bg-[var(--marigold)]/25 text-[var(--ink)] border border-[var(--marigold)]/40 rounded-full font-mono text-[10px] uppercase tracking-[0.14em]">
            Open to commissions
          </span>
        )}
      </div>

      <div className="space-y-1.5 mb-4">
        <h3 className="font-display text-[30px] font-medium text-[var(--ink)] leading-tight group-hover:text-[var(--terracotta)] transition-colors">
          {designer.name}
        </h3>
        <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-[var(--umber)]">
          {designer.city} · {designer.craft}
        </p>
      </div>

      <p className="font-body text-sm text-[var(--umber)] line-clamp-2 leading-relaxed mb-6">
        {designer.bio}
      </p>

      {/* Footer row */}
      <div className="pt-4 border-t border-[var(--hairline)] flex items-center justify-between font-mono text-[11px] uppercase tracking-[0.14em] text-[var(--umber)]">
        <span>{pieces.length} {pieces.length === 1 ? 'piece' : 'pieces'}</span>
        <span className="flex items-center gap-1.5 text-[var(--ink)] group-hover:text-[var(--terracotta)] font-medium">
          View profile
          <ArrowRight className="w-3.5 h-3.5 transform transition-transform duration-200 group-hover:translate-x-1" />
        </span>
      </div>
    </Link>
  );
}
