'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Swatch from './Swatch';

export default function EmptyState({
  title = 'Nothing matches that thread.',
  description,
  actionText,
  onAction,
}) {
  return (
    <div className="py-20 px-4 text-center max-w-[480px] mx-auto flex flex-col items-center">
      {/* 3 small floating swatch circles */}
      <div className="flex items-center justify-center -space-x-3 mb-6" aria-hidden="true">
        <motion.div
          animate={{ y: [0, -6, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
          className="w-14 h-14 rounded-full overflow-hidden border-2 border-[var(--paper)] shadow-md"
        >
          <Swatch pattern="bandhani" palette={['#B5472B', '#E3A72F', '#F6F0E6']} aspect="1/1" />
        </motion.div>
        <motion.div
          animate={{ y: [-4, 6, -4] }}
          transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
          className="w-16 h-16 rounded-full overflow-hidden border-2 border-[var(--paper)] shadow-lg z-10"
        >
          <Swatch pattern="ikat" palette={['#1F2A44', '#E3A72F', '#B5472B']} aspect="1/1" />
        </motion.div>
        <motion.div
          animate={{ y: [0, -7, 0] }}
          transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
          className="w-14 h-14 rounded-full overflow-hidden border-2 border-[var(--paper)] shadow-md"
        >
          <Swatch pattern="brocade" palette={['#5A4A3C', '#E3A72F', '#F6F0E6']} aspect="1/1" />
        </motion.div>
      </div>

      <h3 className="font-display text-[28px] sm:text-[32px] font-medium text-[var(--ink)] mb-2">
        {title}
      </h3>

      {description && (
        <p className="font-body text-sm text-[var(--umber)] mb-6 max-w-[36ch] leading-relaxed">
          {description}
        </p>
      )}

      {actionText && onAction && (
        <button
          type="button"
          onClick={onAction}
          className="py-2.5 px-6 rounded-full font-mono text-[11px] uppercase tracking-[0.16em] bg-[var(--ink)] text-[var(--ivory)] hover:bg-[var(--terracotta)] transition-all duration-200 hover:-translate-y-0.5 active:scale-98 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--terracotta)]"
        >
          {actionText}
        </button>
      )}
    </div>
  );
}
