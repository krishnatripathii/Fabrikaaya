'use client';

import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useApp } from '@/context/AppProvider';

export default function Toast() {
  const { toastMessage, hideToast } = useApp();

  useEffect(() => {
    if (!toastMessage) return;
    const timer = setTimeout(() => {
      hideToast();
    }, 3000);
    return () => clearTimeout(timer);
  }, [toastMessage, hideToast]);

  return (
    <AnimatePresence>
      {toastMessage && (
        <motion.div
          role="status"
          aria-live="polite"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 16 }}
          transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
          className="fixed bottom-6 left-1/2 -translate-x-1/2 z-[90] max-w-[90vw] px-6 py-3.5 bg-[var(--ink)] text-[var(--ivory)] text-sm rounded-full shadow-[0_20px_50px_-20px_rgba(27,22,18,0.35)] flex items-center gap-2 border border-[var(--hairline)]"
        >
          <span className="font-mono text-xs uppercase tracking-wider text-[var(--marigold)]">
            ✦
          </span>
          <span className="font-body font-medium">{toastMessage}</span>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
