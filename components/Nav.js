'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { useApp } from '@/context/AppProvider';

const NAV_LINKS = [
  { label: 'Discover', href: '/discover' },
  { label: 'Designers', href: '/designers' },
  { label: 'Quiz', href: '/quiz' },
  { label: 'Saved', href: '/saved' },
  { label: 'Requests', href: '/requests' },
];

export default function Nav() {
  const pathname = usePathname();
  const { savedCount, isHydrated } = useApp();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileMenuOpen]);

  return (
    <>
      <header className="sticky top-0 z-40 w-full h-[72px] bg-[#F6F0E6]/85 backdrop-blur-[12px] border-b border-[var(--hairline)] transition-colors">
        <div className="max-w-[1320px] h-full mx-auto px-5 md:px-8 flex items-center justify-between">
          {/* Left: Wordmark */}
          <Link
            href="/"
            className="flex items-center gap-1.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--terracotta)] rounded-sm group"
          >
            <span className="font-display italic font-medium text-[28px] lowercase text-[var(--ink)] tracking-tight">
              fabrikaaya
            </span>
            <span className="w-1.5 h-1.5 rounded-full bg-[var(--marigold)] inline-block mt-1 group-hover:scale-125 transition-transform" />
          </Link>

          {/* Desktop Nav Links */}
          <nav className="hidden md:flex items-center gap-8" aria-label="Main Navigation">
            {NAV_LINKS.map((link) => {
              const isActive =
                link.href === '/'
                  ? pathname === '/'
                  : pathname === link.href || pathname.startsWith(`${link.href}/`);

              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className="relative py-2 font-mono text-[12px] uppercase tracking-[0.18em] text-[var(--ink)] hover:text-[var(--terracotta)] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--terracotta)] rounded flex items-center gap-1.5 group"
                >
                  <span>{link.label}</span>
                  {link.label === 'Saved' && isHydrated && savedCount > 0 && (
                    <motion.span
                      key={savedCount}
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: 'spring', stiffness: 500, damping: 25 }}
                      className="w-[18px] h-[18px] rounded-full bg-[var(--terracotta)] text-[var(--ivory)] text-[10px] font-mono flex items-center justify-center font-normal"
                    >
                      {savedCount}
                    </motion.span>
                  )}
                  {/* Underline */}
                  {isActive ? (
                    <motion.span
                      layoutId="nav-underline"
                      className="absolute bottom-0 left-0 right-0 h-[2px] bg-[var(--terracotta)]"
                      transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                    />
                  ) : (
                    <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-[var(--terracotta)] scale-x-0 origin-left transition-transform duration-300 group-hover:scale-x-100" />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Mobile Hamburger button */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(true)}
            aria-label="Open menu"
            className="md:hidden p-2 text-[var(--ink)] hover:text-[var(--terracotta)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--terracotta)] rounded"
          >
            <Menu className="w-6 h-6" />
          </button>
        </div>
      </header>

      {/* Mobile Full-Screen Overlay Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label="Mobile Navigation"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-0 z-50 bg-[var(--ivory)] flex flex-col justify-between p-8"
          >
            {/* Top Bar inside Menu */}
            <div className="flex items-center justify-between">
              <Link
                href="/"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center gap-1.5"
              >
                <span className="font-display italic font-medium text-[28px] lowercase text-[var(--ink)]">
                  fabrikaaya
                </span>
                <span className="w-1.5 h-1.5 rounded-full bg-[var(--marigold)] inline-block mt-1" />
              </Link>
              <button
                type="button"
                onClick={() => setMobileMenuOpen(false)}
                aria-label="Close menu"
                className="p-2 text-[var(--ink)] hover:text-[var(--terracotta)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--terracotta)] rounded-full border border-[var(--hairline)]"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Menu Links */}
            <div className="flex flex-col gap-6 my-auto">
              {NAV_LINKS.map((link, idx) => {
                const isActive =
                  link.href === '/'
                    ? pathname === '/'
                    : pathname === link.href || pathname.startsWith(`${link.href}/`);
                return (
                  <motion.div
                    key={link.href}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                      delay: 0.08 * idx,
                      duration: 0.5,
                      ease: [0.22, 1, 0.36, 1],
                    }}
                  >
                    <Link
                      href={link.href}
                      onClick={() => setMobileMenuOpen(false)}
                      className={`font-display text-[48px] leading-tight flex items-center justify-between transition-colors ${
                        isActive
                          ? 'text-[var(--terracotta)] italic'
                          : 'text-[var(--ink)] hover:text-[var(--terracotta)]'
                      }`}
                    >
                      <span>{link.label}</span>
                      {link.label === 'Saved' && isHydrated && savedCount > 0 && (
                        <span className="text-xl font-mono px-3 py-1 rounded-full bg-[var(--terracotta)] text-[var(--ivory)]">
                          {savedCount}
                        </span>
                      )}
                    </Link>
                  </motion.div>
                );
              })}
            </div>

            {/* Bottom Meta */}
            <div className="border-t border-[var(--hairline)] pt-6 font-mono text-[11px] uppercase tracking-[0.18em] text-[var(--umber)] flex justify-between items-center">
              <span>SSTC Bhilai · Minor Project</span>
              <span>© 2026</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
