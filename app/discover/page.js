'use client';

import React, { useState, useMemo, useEffect, Suspense } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, X, Clock } from 'lucide-react';
import ItemCard from '@/components/ItemCard';
import Swatch from '@/components/Swatch';
import EmptyState from '@/components/EmptyState';
import { items, getItemById } from '@/data/items';
import { getDesignerBySlug } from '@/data/designers';
import { useApp } from '@/context/AppProvider';
import { formatPrice } from '@/lib/format';

const CATEGORIES = [
  'All',
  'Sarees',
  'Lehengas',
  'Kurtas',
  'Co-ords',
  'Indo-western',
];

const OCCASIONS = ['All occasions', 'Wedding', 'Festive', 'Casual'];

const SORT_OPTIONS = [
  'Featured',
  'Price: Low to High',
  'Price: High to Low',
];

export default function DiscoverPage() {
  const { recentIds, setQuickViewItem, isHydrated } = useApp();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedOccasion, setSelectedOccasion] = useState('All occasions');
  const [maxPrice, setMaxPrice] = useState(25000);
  const [selectedSort, setSelectedSort] = useState('Featured');

  // Read ?q= from URL on load to prefill search
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const sp = new URLSearchParams(window.location.search);
      const q = sp.get('q');
      if (q) {
        setSearchQuery(q);
      }
    }
  }, []);

  const isFilterActive =
    searchQuery.trim() !== '' ||
    selectedCategory !== 'All' ||
    selectedOccasion !== 'All occasions' ||
    maxPrice < 25000 ||
    selectedSort !== 'Featured';

  const resetFilters = () => {
    setSearchQuery('');
    setSelectedCategory('All');
    setSelectedOccasion('All occasions');
    setMaxPrice(25000);
    setSelectedSort('Featured');
  };

  const filteredItems = useMemo(() => {
    let result = items.filter((item) => {
      // 1. Search Query
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase().trim();
        const designer = getDesignerBySlug(item.designerSlug);
        const designerName = designer ? designer.name.toLowerCase() : '';
        const nameMatches = item.name.toLowerCase().includes(query);
        const craftMatches = item.craft.toLowerCase().includes(query);
        const designerMatches = designerName.includes(query);

        if (!nameMatches && !craftMatches && !designerMatches) {
          return false;
        }
      }

      // 2. Category
      if (selectedCategory !== 'All' && item.category !== selectedCategory) {
        return false;
      }

      // 3. Occasion
      if (
        selectedOccasion !== 'All occasions' &&
        item.occasion !== selectedOccasion
      ) {
        return false;
      }

      // 4. Max Price
      if (item.price > maxPrice) {
        return false;
      }

      return true;
    });

    // 5. Sort
    if (selectedSort === 'Price: Low to High') {
      result.sort((a, b) => a.price - b.price);
    } else if (selectedSort === 'Price: High to Low') {
      result.sort((a, b) => b.price - a.price);
    }

    return result;
  }, [searchQuery, selectedCategory, selectedOccasion, maxPrice, selectedSort]);

  // Map recentIds to full items
  const recentItems = useMemo(() => {
    return recentIds
      .map((id) => getItemById(id))
      .filter((item) => Boolean(item));
  }, [recentIds]);

  return (
    <div className="min-h-screen py-10 md:py-16">
      <div className="max-w-[1320px] mx-auto px-5 md:px-8">
        {/* Header */}
        <div className="mb-8">
          <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-[var(--terracotta)] block mb-1">
            The Edit
          </span>
          <div className="flex items-baseline gap-3">
            <h1 className="font-display font-medium text-[clamp(44px,6vw,72px)] text-[var(--ink)]">
              Discover
            </h1>
            <span className="font-mono text-[14px] text-[var(--umber)] font-normal tracking-[0.05em]">
              ({filteredItems.length} {filteredItems.length === 1 ? 'piece' : 'pieces'})
            </span>
          </div>
        </div>
      </div>

      {/* Sticky Toolbar below Nav at top 72px */}
      <div className="sticky top-[72px] z-30 bg-[#F6F0E6]/95 backdrop-blur-[12px] border-y border-[var(--hairline)] py-4 transition-colors">
        <div className="max-w-[1320px] mx-auto px-5 md:px-8 space-y-3.5">
          {/* Top row: Search input + Occasion + Sort + Clear */}
          <div className="flex flex-wrap items-center gap-3">
            {/* Search Input: pill, 44px high */}
            <div className="relative flex-1 min-w-[260px]">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--umber)] pointer-events-none" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search by name, craft or designer…"
                className="w-full h-[44px] pl-11 pr-10 bg-[var(--paper)] rounded-full border border-[var(--hairline)] font-body text-sm text-[var(--ink)] placeholder:text-[var(--umber)]/50 focus:border-[var(--terracotta)] focus:outline-none transition-colors"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery('')}
                  aria-label="Clear search query"
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 p-1 text-[var(--umber)] hover:text-[var(--ink)]"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>

            {/* Occasion dropdown */}
            <div className="relative shrink-0">
              <label htmlFor="filter-occasion" className="sr-only">Occasion</label>
              <select
                id="filter-occasion"
                value={selectedOccasion}
                onChange={(e) => setSelectedOccasion(e.target.value)}
                className="h-[44px] px-4 pr-8 bg-[var(--paper)] rounded-full border border-[var(--hairline)] font-mono text-[11px] uppercase tracking-[0.14em] text-[var(--ink)] focus:border-[var(--terracotta)] focus:outline-none cursor-pointer"
              >
                {OCCASIONS.map((occ) => (
                  <option key={occ} value={occ}>
                    {occ}
                  </option>
                ))}
              </select>
            </div>

            {/* Price range slider */}
            <div className="flex items-center gap-2.5 px-4 h-[44px] bg-[var(--paper)] rounded-full border border-[var(--hairline)] shrink-0">
              <span className="font-mono text-[11px] uppercase tracking-[0.12em] text-[var(--umber)] whitespace-nowrap">
                Up to ₹{maxPrice.toLocaleString('en-IN')}
              </span>
              <input
                type="range"
                min="2000"
                max="25000"
                step="500"
                value={maxPrice}
                onChange={(e) => setMaxPrice(Number(e.target.value))}
                aria-label="Filter by maximum price"
                className="w-24 sm:w-28 accent-[var(--terracotta)] cursor-pointer"
              />
            </div>

            {/* Sort dropdown */}
            <div className="relative shrink-0">
              <label htmlFor="filter-sort" className="sr-only">Sort by</label>
              <select
                id="filter-sort"
                value={selectedSort}
                onChange={(e) => setSelectedSort(e.target.value)}
                className="h-[44px] px-4 pr-8 bg-[var(--paper)] rounded-full border border-[var(--hairline)] font-mono text-[11px] uppercase tracking-[0.14em] text-[var(--ink)] focus:border-[var(--terracotta)] focus:outline-none cursor-pointer"
              >
                {SORT_OPTIONS.map((opt) => (
                  <option key={opt} value={opt}>
                    {opt}
                  </option>
                ))}
              </select>
            </div>

            {/* Clear filters button (appears only when any filter is active) */}
            {isFilterActive && (
              <button
                type="button"
                onClick={resetFilters}
                className="font-mono text-[11px] uppercase tracking-[0.14em] text-[var(--terracotta)] hover:underline underline-offset-4 py-2 px-3 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[var(--terracotta)] rounded"
              >
                Clear filters
              </button>
            )}
          </div>

          {/* Bottom row: Category Chips */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none" role="tablist" aria-label="Category filter">
            {CATEGORIES.map((cat) => {
              const isSelected = selectedCategory === cat;
              return (
                <button
                  key={cat}
                  role="tab"
                  aria-selected={isSelected}
                  onClick={() => setSelectedCategory(cat)}
                  className={`h-8 px-4 rounded-full font-mono text-[10px] uppercase tracking-[0.16em] transition-all duration-200 shrink-0 border ${
                    isSelected
                      ? 'bg-[var(--ink)] text-[var(--ivory)] border-[var(--ink)]'
                      : 'bg-transparent text-[var(--ink)] border-[var(--hairline)] hover:border-[var(--ink)]'
                  }`}
                >
                  {cat}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      <div className="max-w-[1320px] mx-auto px-5 md:px-8 pt-8 space-y-8">
        {/* Recently Viewed horizontal scroller (hidden if empty) */}
        {isHydrated && recentItems.length > 0 && (
          <section
            aria-label="Recently viewed pieces"
            className="pb-6 border-b border-[var(--hairline)] space-y-3"
          >
            <div className="flex items-center gap-2">
              <Clock className="w-3.5 h-3.5 text-[var(--terracotta)]" />
              <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-[var(--umber)]">
                Recently Viewed
              </span>
            </div>

            <div className="flex items-center gap-4 overflow-x-auto pb-2 scrollbar-thin">
              {recentItems.map((item) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setQuickViewItem(item)}
                  className="w-[140px] shrink-0 text-left group p-2 bg-[var(--paper)] rounded-[4px] border border-[var(--hairline)] transition-all duration-200 hover:-translate-y-1 hover:border-[var(--terracotta)] hover:shadow-xs focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--terracotta)]"
                >
                  <div className="w-full overflow-hidden rounded-[2px] mb-2">
                    <Swatch
                      pattern={item.pattern}
                      palette={item.palette}
                      aspect="4/5"
                    />
                  </div>
                  <div className="space-y-0.5">
                    <p className="font-display text-sm font-medium text-[var(--ink)] line-clamp-1 group-hover:text-[var(--terracotta)] transition-colors">
                      {item.name}
                    </p>
                    <p className="font-body text-xs text-[var(--umber)]">
                      {formatPrice(item.price)}
                    </p>
                  </div>
                </button>
              ))}
            </div>
          </section>
        )}

        {/* Loading Skeletons on initial hydration */}
        {!isHydrated ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 min-[1100px]:grid-cols-4 gap-6">
            {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
              <div
                key={i}
                className="bg-[var(--paper)] rounded-[4px] border border-[var(--hairline)] p-2 space-y-3 animate-pulse"
              >
                <div className="aspect-[4/5] bg-[var(--ivory)] rounded-[2px]" />
                <div className="h-5 bg-[var(--ivory)] rounded w-3/4 mx-1" />
                <div className="flex justify-between mx-1">
                  <div className="h-4 bg-[var(--ivory)] rounded w-1/3" />
                  <div className="h-4 bg-[var(--ivory)] rounded w-1/4" />
                </div>
              </div>
            ))}
          </div>
        ) : filteredItems.length > 0 ? (
          <motion.div
            layout
            className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 min-[1100px]:grid-cols-4 gap-6"
          >
            <AnimatePresence mode="popLayout">
              {filteredItems.map((item, idx) => (
                <ItemCard key={item.id} item={item} priority={idx < 4} />
              ))}
            </AnimatePresence>
          </motion.div>
        ) : (
          <EmptyState
            title="Nothing matches that thread."
            description="Try widening your price range, clearing your search, or exploring another craft category."
            actionText="Clear filters"
            onAction={resetFilters}
          />
        )}
      </div>
    </div>
  );
}
