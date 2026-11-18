'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Heart } from 'lucide-react';
import Swatch from './Swatch';
import { useApp } from '@/context/AppProvider';
import { getDesignerBySlug } from '@/data/designers';
import { formatPrice } from '@/lib/format';

export default function ItemCard({ item, priority = false }) {
  const { isSaved, toggleSave, setQuickViewItem } = useApp();
  const saved = isSaved(item.id);
  const designer = getDesignerBySlug(item.designerSlug);

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.96 }}
      transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
      className="group relative flex flex-col rounded-[4px] border border-[var(--hairline)] bg-[var(--paper)] p-2 transition-all duration-350 hover:-translate-y-1.5 hover:shadow-[0_20px_50px_-20px_rgba(27,22,18,0.25)]"
    >
      {/* Visual art container */}
      <div className="relative w-full overflow-hidden rounded-[2px]">
        {/* Clickable swatch to open Quick View */}
        <button
          type="button"
          onClick={() => setQuickViewItem(item)}
          className="w-full block text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--terracotta)]"
          aria-label={`Quick view ${item.name}`}
        >
          <div className="transform transition-transform duration-350 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.04]">
            <Swatch
              pattern={item.pattern}
              palette={item.palette}
              aspect="4/5"
              priority={priority}
            />
          </div>
        </button>

        {/* Top-left: Craft tag */}
        <div className="absolute top-2.5 left-2.5 pointer-events-none">
          <span className="inline-block px-2.5 py-1 bg-[var(--paper)]/95 backdrop-blur-sm border border-[var(--hairline)] rounded-full font-mono text-[10px] uppercase tracking-[0.12em] text-[var(--ink)] shadow-xs">
            {item.craft}
          </span>
        </div>

        {/* Top-right: Heart / Save button */}
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            toggleSave(item.id);
          }}
          aria-label={saved ? `Remove ${item.name} from saved` : `Save ${item.name}`}
          className="absolute top-2.5 right-2.5 w-9 h-9 rounded-full bg-[var(--paper)]/90 backdrop-blur-sm border border-[var(--hairline)] flex items-center justify-center transition-all duration-200 hover:scale-105 active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--terracotta)]"
        >
          <motion.div
            key={saved ? 'saved' : 'unsaved'}
            animate={saved ? { scale: [1, 1.35, 1] } : { scale: 1 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
          >
            <Heart
              className={`w-4 h-4 transition-colors ${
                saved
                  ? 'fill-[var(--terracotta)] text-[var(--terracotta)]'
                  : 'text-[var(--ink)] hover:text-[var(--terracotta)]'
              }`}
            />
          </motion.div>
        </button>
      </div>

      {/* Item info below art */}
      <div className="pt-3.5 pb-2 px-1 flex flex-col gap-1.5 flex-1 justify-between">
        <button
          type="button"
          onClick={() => setQuickViewItem(item)}
          className="text-left font-display text-[22px] font-medium leading-snug text-[var(--ink)] hover:text-[var(--terracotta)] transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[var(--terracotta)] rounded"
        >
          {item.name}
        </button>

        <div className="flex items-center justify-between gap-2 pt-1">
          {designer ? (
            <Link
              href={`/designers/${designer.slug}`}
              className="font-mono text-[11px] uppercase tracking-[0.14em] text-[var(--umber)] hover:text-[var(--terracotta)] transition-colors truncate focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[var(--terracotta)] rounded"
              title={designer.name}
            >
              {designer.name}
            </Link>
          ) : (
            <span className="font-mono text-[11px] uppercase tracking-[0.14em] text-[var(--umber)]">
              Artisan
            </span>
          )}

          <span className="font-body text-sm font-medium text-[var(--ink)] whitespace-nowrap">
            {formatPrice(item.price)}
          </span>
        </div>
      </div>
    </motion.div>
  );
}
