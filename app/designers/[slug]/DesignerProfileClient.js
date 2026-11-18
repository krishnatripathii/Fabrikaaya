'use client';

import React, { useEffect } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import Swatch from '@/components/Swatch';
import ItemCard from '@/components/ItemCard';
import EmptyState from '@/components/EmptyState';
import { getDesignerBySlug } from '@/data/designers';
import { getItemsByDesigner } from '@/data/items';
import { useApp } from '@/context/AppProvider';

const DESIGNER_PATTERNS = {
  'meera-kasliwal': 'blockprint',
  'farhan-qadri': 'chikan',
  'rukmini-pandey': 'brocade',
  'zainab-khatri': 'ajrakh',
  'anand-reddy': 'ikat',
  'devika-sahu': 'kosa',
};

export default function DesignerProfileClient({ slug }) {
  const { setConnectModalData } = useApp();
  const designer = getDesignerBySlug(slug);
  const items = designer ? getItemsByDesigner(designer.slug) : [];

  // Check if ?connect=1 is present in the URL on mount
  useEffect(() => {
    if (typeof window !== 'undefined' && designer) {
      const searchParams = new URLSearchParams(window.location.search);
      if (searchParams.get('connect') === '1') {
        setConnectModalData({ designer });
      }
    }
  }, [designer, setConnectModalData]);

  // 404 handling if slug doesn't exist
  if (!designer) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center py-20 px-4">
        <EmptyState
          title="Designer not found"
          description="The master karigar you are looking for does not exist in our atelier archive."
          actionText="Back to designers"
          onAction={() => {
            if (typeof window !== 'undefined') {
              window.location.href = '/designers';
            }
          }}
        />
      </div>
    );
  }

  const initials = designer.name
    .split(' ')
    .map((n) => n[0])
    .join('');
  const pattern = DESIGNER_PATTERNS[designer.slug] || 'bandhani';
  const monogramBg = designer.palette[0] || '#B5472B';

  return (
    <div className="min-h-screen py-10 md:py-16">
      <div className="max-w-[1320px] mx-auto px-5 md:px-8">
        {/* Back link */}
        <div className="mb-8">
          <Link
            href="/designers"
            className="inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.16em] text-[var(--umber)] hover:text-[var(--terracotta)] transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[var(--terracotta)] rounded"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>All Designers</span>
          </Link>
        </div>

        {/* Header split */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center pb-16 border-b border-[var(--hairline)]">
          {/* Left Column (cols 1-7) */}
          <div className="lg:col-span-7 space-y-6">
            <div className="flex items-center gap-6">
              {/* Large Monogram Circle (120px) */}
              <div
                className="w-[100px] h-[100px] sm:w-[120px] sm:h-[120px] rounded-full flex items-center justify-center text-[var(--ivory)] font-display text-[44px] sm:text-[52px] font-medium border border-[var(--hairline)] shadow-xs shrink-0"
                style={{ backgroundColor: monogramBg }}
              >
                {initials}
              </div>

              <div>
                <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-[var(--umber)] mb-1">
                  {designer.city} · {designer.craft}
                </p>
                {designer.openToCommissions && (
                  <span className="inline-block px-3 py-1 bg-[var(--marigold)]/25 text-[var(--ink)] border border-[var(--marigold)]/40 rounded-full font-mono text-[10px] uppercase tracking-[0.14em]">
                    Open to commissions
                  </span>
                )}
              </div>
            </div>

            {/* H1 in Cormorant 72px */}
            <h1 className="font-display font-medium text-[clamp(44px,6vw,72px)] text-[var(--ink)] leading-[0.95]">
              {designer.name}
            </h1>

            {/* Full bio paragraph */}
            <p className="font-body text-base sm:text-lg text-[var(--umber)] leading-relaxed max-w-[54ch]">
              {designer.bio}
            </p>

            {/* Speciality chips (outline pills) */}
            <div className="flex flex-wrap items-center gap-2 pt-2">
              <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-[var(--umber)] mr-1">
                Specialities:
              </span>
              {designer.specialities.map((spec) => (
                <span
                  key={spec}
                  className="px-3.5 py-1 rounded-full border border-[var(--hairline)] font-mono text-[10px] uppercase tracking-[0.14em] text-[var(--ink)] bg-[var(--paper)]/50"
                >
                  {spec}
                </span>
              ))}
            </div>

            {/* Sticky-ish primary button "Request to connect" */}
            <div className="pt-4">
              <button
                type="button"
                onClick={() => setConnectModalData({ designer })}
                className="py-3.5 px-8 rounded-full font-mono text-[11px] uppercase tracking-[0.18em] bg-[var(--ink)] text-[var(--ivory)] hover:bg-[var(--terracotta)] transition-all duration-200 hover:-translate-y-0.5 active:scale-98 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--terracotta)] inline-flex items-center gap-2 group shadow-sm"
              >
                <span>Request to connect</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>

          {/* Right Column (cols 8-12): Tall Swatch (pattern of their craft, 3:4) with paper frame */}
          <div className="lg:col-span-5 max-w-[420px] mx-auto lg:max-w-none w-full">
            <div className="p-2 sm:p-2.5 bg-[var(--paper)] rounded-[4px] border border-[var(--hairline)] shadow-[0_20px_50px_-20px_rgba(27,22,18,0.25)]">
              <Swatch
                pattern={pattern}
                palette={designer.palette}
                aspect="3/4"
                priority
              />
              <div className="pt-2 text-center font-mono text-[10px] uppercase tracking-[0.16em] text-[var(--umber)]">
                {designer.craft} · Signature weave
              </div>
            </div>
          </div>
        </div>

        {/* Below: H2 "Their pieces" + grid of that designer's items */}
        <div className="pt-16">
          <div className="mb-10">
            <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-[var(--terracotta)] block mb-1">
              Portfolio
            </span>
            <h2 className="font-display font-medium text-[clamp(32px,4vw,56px)] text-[var(--ink)]">
              Their pieces
            </h2>
          </div>

          {items.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {items.map((item) => (
                <ItemCard key={item.id} item={item} />
              ))}
            </div>
          ) : (
            <p className="font-body text-sm text-[var(--umber)]">
              No pieces currently in the archive for this designer.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
