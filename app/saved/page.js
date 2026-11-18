'use client';

import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import ItemCard from '@/components/ItemCard';
import EmptyState from '@/components/EmptyState';
import { useApp } from '@/context/AppProvider';
import { items } from '@/data/items';

export default function SavedPage() {
  const router = useRouter();
  const { savedIds, isHydrated } = useApp();

  // If not yet hydrated, show neutral/skeleton state to avoid hydration mismatch
  if (!isHydrated) {
    return (
      <div className="min-h-screen py-10 md:py-16">
        <div className="max-w-[1320px] mx-auto px-5 md:px-8">
          <div className="mb-10">
            <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-[var(--terracotta)] block mb-1">
              Curated Collection
            </span>
            <div className="h-12 w-48 bg-[var(--paper)] rounded animate-pulse" />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {[1, 2, 3, 4].map((i) => (
              <div
                key={i}
                className="aspect-[4/5] bg-[var(--paper)] rounded-[4px] border border-[var(--hairline)] animate-pulse"
              />
            ))}
          </div>
        </div>
      </div>
    );
  }

  const savedItems = items.filter((item) => savedIds.includes(item.id));

  return (
    <div className="min-h-screen py-10 md:py-16">
      <div className="max-w-[1320px] mx-auto px-5 md:px-8">
        {/* Header */}
        <div className="mb-10">
          <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-[var(--terracotta)] block mb-1">
            Curated Collection
          </span>
          <div className="flex items-baseline gap-3">
            <h1 className="font-display font-medium text-[clamp(44px,6vw,72px)] text-[var(--ink)]">
              My edit
            </h1>
            <span className="font-mono text-[14px] text-[var(--umber)] font-normal tracking-[0.05em]">
              ({savedItems.length} {savedItems.length === 1 ? 'piece' : 'pieces'})
            </span>
          </div>
          <p className="font-body text-base text-[var(--umber)] max-w-[50ch] mt-2">
            Your personal archive of handcrafted Indian garments saved for custom tailoring or future orders.
          </p>
        </div>

        {/* Content */}
        {savedItems.length > 0 ? (
          <motion.div
            layout
            className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
          >
            <AnimatePresence mode="popLayout">
              {savedItems.map((item) => (
                <ItemCard key={item.id} item={item} />
              ))}
            </AnimatePresence>
          </motion.div>
        ) : (
          <EmptyState
            title="Your edit is empty."
            description="Tap the heart on anything you love."
            actionText="Go discover"
            onAction={() => router.push('/discover')}
          />
        )}
      </div>
    </div>
  );
}
