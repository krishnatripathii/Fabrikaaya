'use client';

import React from 'react';
import { motion } from 'framer-motion';
import DesignerCard from '@/components/DesignerCard';
import { designers } from '@/data/designers';

const EASING = [0.22, 1, 0.36, 1];

export default function DesignersPage() {
  return (
    <div className="min-h-screen py-10 md:py-16">
      <div className="max-w-[1320px] mx-auto px-5 md:px-8">
        {/* Header */}
        <div className="mb-12">
          <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-[var(--terracotta)] block mb-1">
            The Makers
          </span>
          <h1 className="font-display font-medium text-[clamp(44px,6vw,72px)] text-[var(--ink)]">
            Designers
          </h1>
          <p className="font-body text-base text-[var(--umber)] max-w-[50ch] mt-2">
            Independent ateliers and traditional master weavers keeping India's slow-craft heritage alive across six regional traditions.
          </p>
        </div>

        {/* 3-column grid (2 on tablet, 1 on mobile) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {designers.map((designer, idx) => (
            <motion.div
              key={designer.slug}
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: idx * 0.08, ease: EASING }}
            >
              <DesignerCard designer={designer} />
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
