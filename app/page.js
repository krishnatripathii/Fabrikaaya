'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import Swatch from '@/components/Swatch';
import Marquee from '@/components/Marquee';
import ItemCard from '@/components/ItemCard';
import DesignerCard from '@/components/DesignerCard';
import { items } from '@/data/items';
import { designers } from '@/data/designers';

const EASING = [0.22, 1, 0.36, 1];

export default function HomePage() {
  const featuredItems = items.slice(0, 4);
  const featuredDesigners = designers.slice(0, 3);

  return (
    <div className="flex flex-col w-full overflow-hidden">
      {/* 1. HERO SECTION */}
      <section className="relative min-h-[calc(100vh-72px)] flex items-center py-16 md:py-24 border-b border-[var(--hairline)]">
        <div className="max-w-[1320px] w-full mx-auto px-5 md:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
            {/* Left Content (cols 1-7) */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: EASING }}
              className="lg:col-span-7 space-y-6 md:space-y-8"
            >
              {/* Eyebrow */}
              <div className="inline-flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[var(--terracotta)]" />
                <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-[var(--umber)]">
                  Handcrafted India · Discover · Connect
                </span>
              </div>

              {/* H1 */}
              <h1 className="font-display font-medium text-[clamp(56px,9vw,144px)] leading-[0.92] tracking-tight text-[var(--ink)]">
                Find the fabric.
                <br />
                Meet the <em>hands</em> that make it.
              </h1>

              {/* Subcopy */}
              <p className="font-body text-base md:text-lg text-[var(--umber)] max-w-[46ch] leading-relaxed">
                Fabrikaaya is where India's independent designers and the people who love their work finally find each other.
              </p>

              {/* CTAs */}
              <div className="flex flex-wrap items-center gap-4 pt-2">
                <Link
                  href="/discover"
                  className="py-3.5 px-8 rounded-full font-mono text-[11px] uppercase tracking-[0.18em] bg-[var(--ink)] text-[var(--ivory)] hover:bg-[var(--terracotta)] transition-all duration-200 hover:-translate-y-0.5 active:scale-98 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--terracotta)] inline-flex items-center gap-2 group"
                >
                  <span>Start discovering</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>

                <Link
                  href="/designers"
                  className="py-3.5 px-8 rounded-full font-mono text-[11px] uppercase tracking-[0.18em] border border-[var(--ink)] text-[var(--ink)] hover:bg-[var(--ink)] hover:text-[var(--ivory)] transition-all duration-200 hover:-translate-y-0.5 active:scale-98 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--terracotta)]"
                >
                  Meet the designers
                </Link>
              </div>

              {/* Stats row */}
              <div className="pt-6 border-t border-[var(--hairline)] flex items-center gap-4 font-mono text-[11px] uppercase tracking-[0.18em] text-[var(--umber)]">
                <span>06 DESIGNERS</span>
                <span className="text-[var(--hairline)]">·</span>
                <span>12 PIECES</span>
                <span className="text-[var(--hairline)]">·</span>
                <span>06 CRAFTS</span>
              </div>
            </motion.div>

            {/* Right Hero: Composition of 3 overlapping floating Swatch cards (cols 8-12) */}
            <div className="lg:col-span-5 relative h-[420px] sm:h-[480px] md:h-[540px] flex items-center justify-center">
              {/* Card 1: Bandhani (back, left-ish, rotated -6deg) */}
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut', delay: 0 }}
                style={{ rotate: -6 }}
                className="absolute left-[5%] top-[10%] w-[62%] p-1.5 bg-[var(--paper)] rounded-[4px] border border-[var(--hairline)] shadow-[0_20px_50px_-20px_rgba(27,22,18,0.25)] z-10"
              >
                <Swatch
                  pattern="bandhani"
                  palette={['#B5472B', '#E3A72F', '#F6F0E6']}
                  aspect="4/5"
                  priority
                />
                <div className="p-2 text-center font-mono text-[9px] uppercase tracking-[0.16em] text-[var(--umber)]">
                  Bandhani · Jaipur
                </div>
              </motion.div>

              {/* Card 2: Brocade (middle, right-ish, rotated 3deg) */}
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
                style={{ rotate: 3 }}
                className="absolute right-[6%] top-[18%] w-[56%] p-1.5 bg-[var(--paper)] rounded-[4px] border border-[var(--hairline)] shadow-[0_20px_50px_-20px_rgba(27,22,18,0.25)] z-20"
              >
                <Swatch
                  pattern="brocade"
                  palette={['#1F2A44', '#E3A72F', '#B5472B']}
                  aspect="4/5"
                  priority
                />
                <div className="p-2 text-center font-mono text-[9px] uppercase tracking-[0.16em] text-[var(--umber)]">
                  Banarasi · Varanasi
                </div>
              </motion.div>

              {/* Card 3: Ikat (front, center-bottom, rotated -2deg) */}
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
                style={{ rotate: -2 }}
                className="absolute left-[20%] bottom-[4%] w-[50%] p-1.5 bg-[var(--paper)] rounded-[4px] border border-[var(--hairline)] shadow-[0_20px_50px_-20px_rgba(27,22,18,0.3)] z-30"
              >
                <Swatch
                  pattern="ikat"
                  palette={['#B5472B', '#1F2A44', '#E3A72F']}
                  aspect="4/5"
                  priority
                />
                <div className="p-2 text-center font-mono text-[9px] uppercase tracking-[0.16em] text-[var(--umber)]">
                  Double Ikat · Pochampally
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. MARQUEE STRIP */}
      <Marquee />

      {/* 3. HOW IT WORKS */}
      <section className="py-[72px] md:py-[120px] border-b border-[var(--hairline)]">
        <div className="max-w-[1320px] mx-auto px-5 md:px-8">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.7, ease: EASING }}
            className="mb-14 md:mb-20"
          >
            <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-[var(--terracotta)] block mb-2">
              The Ritual
            </span>
            <h2 className="font-display font-medium text-[clamp(36px,5vw,72px)] text-[var(--ink)]">
              Three quiet steps.
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
            {/* Step 1 */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.7, delay: 0, ease: EASING }}
              className="border-t border-[var(--hairline)] pt-8 relative"
            >
              <div className="font-display text-[120px] leading-none text-[var(--terracotta)]/25 mb-2 select-none">
                01
              </div>
              <h3 className="font-display text-[26px] font-medium text-[var(--ink)] mb-3">
                Discover
              </h3>
              <p className="font-body text-sm text-[var(--umber)] leading-relaxed">
                Browse handcrafted pieces by craft, occasion and budget.
              </p>
            </motion.div>

            {/* Step 2 */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.7, delay: 0.08, ease: EASING }}
              className="border-t border-[var(--hairline)] pt-8 relative"
            >
              <div className="font-display text-[120px] leading-none text-[var(--terracotta)]/25 mb-2 select-none">
                02
              </div>
              <h3 className="font-display text-[26px] font-medium text-[var(--ink)] mb-3">
                Save
              </h3>
              <p className="font-body text-sm text-[var(--umber)] leading-relaxed">
                Heart what moves you; your edit is kept for next time.
              </p>
            </motion.div>

            {/* Step 3 */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.7, delay: 0.16, ease: EASING }}
              className="border-t border-[var(--hairline)] pt-8 relative"
            >
              <div className="font-display text-[120px] leading-none text-[var(--terracotta)]/25 mb-2 select-none">
                03
              </div>
              <h3 className="font-display text-[26px] font-medium text-[var(--ink)] mb-3">
                Connect
              </h3>
              <p className="font-body text-sm text-[var(--umber)] leading-relaxed">
                Send a request straight to the designer for custom work or collaborations.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 4. FEATURED PIECES: Fresh from the loom */}
      <section className="py-[72px] md:py-[120px] border-b border-[var(--hairline)] bg-[var(--paper)]/30">
        <div className="max-w-[1320px] mx-auto px-5 md:px-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-12">
            <div>
              <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-[var(--terracotta)] block mb-2">
                Recent Weaves
              </span>
              <h2 className="font-display font-medium text-[clamp(36px,5vw,72px)] text-[var(--ink)]">
                Fresh from the loom.
              </h2>
            </div>
            <Link
              href="/discover"
              className="font-mono text-[11px] uppercase tracking-[0.18em] text-[var(--ink)] hover:text-[var(--terracotta)] transition-colors flex items-center gap-1.5 group self-start sm:self-auto"
            >
              <span>See all pieces</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredItems.map((item, idx) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-80px' }}
                transition={{ duration: 0.6, delay: idx * 0.06, ease: EASING }}
              >
                <ItemCard item={item} priority={idx < 2} />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. FEATURED DESIGNERS: The people behind the pattern */}
      <section className="py-[72px] md:py-[120px] border-b border-[var(--hairline)]">
        <div className="max-w-[1320px] mx-auto px-5 md:px-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-12">
            <div>
              <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-[var(--terracotta)] block mb-2">
                Master Karigars
              </span>
              <h2 className="font-display font-medium text-[clamp(36px,5vw,72px)] text-[var(--ink)]">
                The people behind the pattern.
              </h2>
            </div>
            <Link
              href="/designers"
              className="font-mono text-[11px] uppercase tracking-[0.18em] text-[var(--ink)] hover:text-[var(--terracotta)] transition-colors flex items-center gap-1.5 group self-start sm:self-auto"
            >
              <span>All 6 designers</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {featuredDesigners.map((designer, idx) => (
              <motion.div
                key={designer.slug}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-80px' }}
                transition={{ duration: 0.6, delay: idx * 0.06, ease: EASING }}
              >
                <DesignerCard designer={designer} />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. CTA BAND */}
      <section className="py-20 md:py-28 bg-[var(--indigo)] text-[var(--ivory)] text-center relative overflow-hidden">
        <div className="max-w-[800px] mx-auto px-5 md:px-8 relative z-10 space-y-8">
          <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-[var(--marigold)] block">
            Direct Atelier Access
          </span>

          <h2 className="font-display font-medium text-[clamp(36px,5vw,64px)] leading-tight text-[var(--ivory)]">
            Have a design in mind?
            <br />
            Say hello to a maker.
          </h2>

          <div className="pt-2">
            <Link
              href="/designers"
              className="py-3.5 px-8 rounded-full font-mono text-[11px] uppercase tracking-[0.18em] bg-[var(--marigold)] text-[var(--ink)] hover:bg-[var(--ivory)] transition-all duration-200 hover:-translate-y-0.5 active:scale-98 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--marigold)] inline-flex items-center gap-2 group"
            >
              <span>Browse designers</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </section>

      {/* 7. ABOUT SECTION (Editorial two-column layout with problem statement placeholder) */}
      <section className="py-[72px] md:py-[100px] border-t border-[var(--hairline)] bg-[var(--paper)]/40">
        <div className="max-w-[1320px] mx-auto px-5 md:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-start">
            <div className="lg:col-span-5 space-y-3">
              <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-[var(--terracotta)] block">
                The Problem & Mission
              </span>
              <h2 className="font-display font-medium text-[clamp(32px,4vw,56px)] text-[var(--ink)] leading-[0.95]">
                Why Fabrikaaya exists.
              </h2>
            </div>
            <div className="lg:col-span-7 font-body text-base sm:text-lg text-[var(--umber)] leading-relaxed">
              {'{PROBLEM_STATEMENT_HERE}'}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
