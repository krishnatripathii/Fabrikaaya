'use client';

import React, { useEffect, useRef } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Heart, ArrowRight } from 'lucide-react';
import Swatch from './Swatch';
import { useApp } from '@/context/AppProvider';
import { getDesignerBySlug } from '@/data/designers';
import { formatPrice } from '@/lib/format';

export default function QuickViewModal() {
  const router = useRouter();
  const { quickViewItem, setQuickViewItem, isSaved, toggleSave } = useApp();
  const modalRef = useRef(null);

  const item = quickViewItem;
  const designer = item ? getDesignerBySlug(item.designerSlug) : null;
  const saved = item ? isSaved(item.id) : false;

  // Handle ESC key to close
  useEffect(() => {
    function handleKeyDown(e) {
      if (e.key === 'Escape') {
        setQuickViewItem(null);
      }
    }
    if (item) {
      window.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [item, setQuickViewItem]);

  if (!item) return null;

  const handleConnectClick = () => {
    setQuickViewItem(null);
    router.push(`/designers/${item.designerSlug}?connect=1`);
  };

  return (
    <AnimatePresence>
      {item && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-10">
          {/* Backdrop: ink at 60% with blur 4px */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setQuickViewItem(null)}
            className="fixed inset-0 bg-[var(--ink)]/60 backdrop-blur-[4px]"
            aria-hidden="true"
          />

          {/* Modal Container */}
          <motion.div
            ref={modalRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby="quick-view-title"
            initial={{ opacity: 0, scale: 0.96, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 10 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="relative z-10 w-full max-w-[880px] max-h-[90vh] overflow-y-auto bg-[var(--paper)] border border-[var(--hairline)] rounded-[8px] shadow-[0_20px_50px_-20px_rgba(27,22,18,0.35)] p-6 sm:p-8 md:p-10"
          >
            {/* Close Button */}
            <button
              type="button"
              onClick={() => setQuickViewItem(null)}
              aria-label="Close modal"
              className="absolute top-5 right-5 p-2 rounded-full border border-[var(--hairline)] bg-[var(--ivory)] text-[var(--ink)] hover:text-[var(--terracotta)] hover:border-[var(--terracotta)] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--terracotta)]"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
              {/* Left Column: Large Swatch Art */}
              <div className="md:col-span-5 w-full max-w-[340px] mx-auto md:max-w-none">
                <div className="p-2 bg-[var(--ivory)] rounded-[4px] border border-[var(--hairline)] shadow-xs">
                  <Swatch
                    pattern={item.pattern}
                    palette={item.palette}
                    aspect="4/5"
                    priority
                  />
                </div>
              </div>

              {/* Right Column: Details */}
              <div className="md:col-span-7 flex flex-col justify-between space-y-6">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-[var(--terracotta)] font-medium">
                      {item.craft}
                    </span>
                    <span className="text-[var(--hairline)]">·</span>
                    <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-[var(--umber)]">
                      {item.category}
                    </span>
                  </div>

                  <h2
                    id="quick-view-title"
                    className="font-display text-[36px] sm:text-[44px] font-medium leading-[1.05] text-[var(--ink)] mb-3"
                  >
                    {item.name}
                  </h2>

                  <div className="flex items-center justify-between border-b border-[var(--hairline)] pb-4 mb-4">
                    {designer && (
                      <Link
                        href={`/designers/${designer.slug}`}
                        onClick={() => setQuickViewItem(null)}
                        className="font-mono text-[12px] uppercase tracking-[0.14em] text-[var(--umber)] hover:text-[var(--terracotta)] transition-colors flex items-center gap-1 group"
                      >
                        By <span className="underline underline-offset-4 group-hover:text-[var(--terracotta)]">{designer.name}</span>
                        <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
                      </Link>
                    )}
                    <span className="font-body text-2xl font-medium text-[var(--ink)]">
                      {formatPrice(item.price)}
                    </span>
                  </div>

                  <p className="font-body text-[15px] text-[var(--umber)] leading-relaxed mb-6">
                    {item.description}
                  </p>

                  {/* Metadata List in DM Mono */}
                  <div className="bg-[var(--ivory)] p-4 rounded-[4px] border border-[var(--hairline)] mb-6 space-y-2">
                    <div className="grid grid-cols-3 gap-2 font-mono text-[11px] uppercase tracking-[0.14em]">
                      <div>
                        <span className="block text-[var(--umber)]/70 text-[9px]">Category</span>
                        <span className="text-[var(--ink)] font-medium">{item.category}</span>
                      </div>
                      <div>
                        <span className="block text-[var(--umber)]/70 text-[9px]">Occasion</span>
                        <span className="text-[var(--ink)] font-medium">{item.occasion}</span>
                      </div>
                      <div>
                        <span className="block text-[var(--umber)]/70 text-[9px]">Textile Craft</span>
                        <span className="text-[var(--ink)] font-medium">{item.craft}</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-3 pt-2">
                  <button
                    type="button"
                    onClick={() => toggleSave(item.id)}
                    className={`flex-1 py-3 px-6 rounded-full font-mono text-[11px] uppercase tracking-[0.16em] flex items-center justify-center gap-2 border transition-all duration-200 hover:-translate-y-0.5 active:scale-98 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--terracotta)] ${
                      saved
                        ? 'bg-[var(--terracotta)] text-[var(--ivory)] border-[var(--terracotta)]'
                        : 'bg-transparent text-[var(--ink)] border-[var(--hairline)] hover:border-[var(--terracotta)]'
                    }`}
                  >
                    <Heart
                      className={`w-4 h-4 ${saved ? 'fill-[var(--ivory)]' : ''}`}
                    />
                    <span>{saved ? 'Saved ✓' : 'Save to my edit'}</span>
                  </button>

                  <button
                    type="button"
                    onClick={handleConnectClick}
                    className="flex-1 py-3 px-6 rounded-full font-mono text-[11px] uppercase tracking-[0.16em] bg-[var(--ink)] text-[var(--ivory)] hover:bg-[var(--terracotta)] transition-all duration-200 hover:-translate-y-0.5 active:scale-98 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--terracotta)] flex items-center justify-center gap-2"
                  >
                    <span>Connect with designer</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
