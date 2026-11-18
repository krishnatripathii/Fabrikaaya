'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Trash2, CheckCircle2 } from 'lucide-react';
import EmptyState from '@/components/EmptyState';
import { useApp } from '@/context/AppProvider';
import { timeAgo } from '@/lib/format';

export default function RequestsPage() {
  const router = useRouter();
  const { requests, withdrawRequest, isHydrated, showToast } = useApp();
  const [currentTime, setCurrentTime] = useState(Date.now());
  const [confirmWithdrawId, setConfirmWithdrawId] = useState(null);

  // 1-second tick interval for live status updates and timeAgo calculation
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(Date.now());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleConfirmWithdraw = (reqId, designerName) => {
    withdrawRequest(reqId);
    setConfirmWithdrawId(null);
    showToast(`Request to ${designerName} withdrawn ✓`);
  };

  // Neutral skeleton until hydrated
  if (!isHydrated) {
    return (
      <div className="min-h-screen py-10 md:py-16">
        <div className="max-w-[840px] mx-auto px-5 md:px-8">
          <div className="mb-10">
            <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-[var(--terracotta)] block mb-1">
              Atelier Correspondence
            </span>
            <div className="h-12 w-52 bg-[var(--paper)] rounded animate-pulse" />
          </div>
          <div className="space-y-4">
            {[1, 2].map((i) => (
              <div
                key={i}
                className="h-36 bg-[var(--paper)] rounded-[4px] border border-[var(--hairline)] animate-pulse"
              />
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-10 md:py-16">
      <div className="max-w-[840px] mx-auto px-5 md:px-8">
        {/* Header */}
        <div className="mb-10">
          <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-[var(--terracotta)] block mb-1">
            Atelier Correspondence
          </span>
          <div className="flex items-baseline gap-3">
            <h1 className="font-display font-medium text-[clamp(44px,6vw,72px)] text-[var(--ink)]">
              My requests
            </h1>
            <span className="font-mono text-[14px] text-[var(--umber)] font-normal tracking-[0.05em]">
              ({requests.length})
            </span>
          </div>
          <p className="font-body text-base text-[var(--umber)] max-w-[50ch] mt-2">
            Direct requests sent to master artisans and independent textile designers for bespoke pieces.
          </p>
        </div>

        {/* Requests List */}
        {requests.length > 0 ? (
          <div className="space-y-6">
            <AnimatePresence mode="popLayout">
              {requests.map((req) => {
                const createdAtMs = new Date(req.createdAt).getTime();
                const elapsedSeconds = Math.max(
                  0,
                  Math.floor((currentTime - createdAtMs) / 1000)
                );

                // If real reply exists from /designer-view, use it!
                const hasRealReply = Boolean(req.replyText);

                let status = req.status || 'sent';
                let statusLabel = 'Sent';

                if (hasRealReply) {
                  status = 'replied';
                  statusLabel = 'Replied';
                } else if (req.status === 'seen') {
                  status = 'seen';
                  statusLabel = 'Seen';
                } else if (req.status === 'replied') {
                  status = 'replied';
                  statusLabel = 'Replied';
                } else {
                  // Fall back to simulation progression: Sent -> Seen (after 6s) -> Replied (after 15s)
                  if (elapsedSeconds >= 15) {
                    status = 'replied';
                    statusLabel = 'Replied';
                  } else if (elapsedSeconds >= 6) {
                    status = 'seen';
                    statusLabel = 'Seen';
                  } else {
                    status = 'sent';
                    statusLabel = 'Sent';
                  }
                }

                const designerFirstName = req.designerName
                  ? req.designerName.split(' ')[0]
                  : 'Designer';

                const isConfirming = confirmWithdrawId === req.id;

                return (
                  <motion.div
                    key={req.id}
                    layout
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.96, height: 0, marginBottom: 0 }}
                    transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                    className="rounded-[4px] border border-[var(--hairline)] bg-[var(--paper)] p-6 sm:p-7 shadow-xs space-y-4 overflow-hidden"
                  >
                    {/* Top row: Designer link + Status pill */}
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <Link
                          href={`/designers/${req.designerSlug}`}
                          className="font-display text-[26px] font-medium text-[var(--ink)] hover:text-[var(--terracotta)] transition-colors inline-flex items-center gap-1.5 group"
                        >
                          <span>{req.designerName}</span>
                          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                        </Link>
                        <div className="flex flex-wrap items-center gap-2 pt-1 font-mono text-[11px] uppercase tracking-[0.14em] text-[var(--umber)]">
                          <span>{req.purpose}</span>
                          <span className="text-[var(--hairline)]">·</span>
                          <span>Budget: {req.budget}</span>
                          <span className="text-[var(--hairline)]">·</span>
                          <span className="text-[var(--umber)]/70">
                            {timeAgo(req.createdAt)}
                          </span>
                        </div>
                      </div>

                      {/* Status Pill with smooth color transitions */}
                      <motion.div layout className="shrink-0">
                        <span
                          className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full font-mono text-[10px] uppercase tracking-[0.16em] font-medium transition-all duration-500 ${
                            status === 'sent'
                              ? 'border border-[var(--umber)] text-[var(--umber)] bg-transparent'
                              : status === 'seen'
                              ? 'bg-[var(--marigold)] text-[var(--ink)] border border-[var(--marigold)]'
                              : 'bg-[var(--terracotta)] text-[var(--ivory)] border border-[var(--terracotta)]'
                          }`}
                        >
                          <span
                            className={`w-1.5 h-1.5 rounded-full ${
                              status === 'sent'
                                ? 'bg-[var(--umber)]'
                                : status === 'seen'
                                ? 'bg-[var(--ink)] animate-pulse'
                                : 'bg-[var(--ivory)]'
                            }`}
                          />
                          <span>{statusLabel}</span>
                        </span>
                      </motion.div>
                    </div>

                    {/* Message clamp */}
                    <p className="font-body text-sm text-[var(--umber)] line-clamp-3 leading-relaxed bg-[var(--ivory)]/60 p-3.5 rounded-[4px] border border-[var(--hairline)]">
                      &ldquo;{req.message}&rdquo;
                    </p>

                    {/* Reply bubble expands underneath if Replied (real or simulated) */}
                    <AnimatePresence>
                      {status === 'replied' && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                          className="overflow-hidden"
                        >
                          <div className="pt-2">
                            <div className="bg-[var(--ivory)] border-l-2 border-[var(--terracotta)] p-4 rounded-r-[4px] shadow-xs">
                              <div className="flex items-center gap-2 mb-1.5">
                                <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-[var(--terracotta)] font-medium">
                                  Response from {designerFirstName}
                                </span>
                                <span className="text-[var(--hairline)]">·</span>
                                <span className="font-mono text-[10px] text-[var(--umber)]/70">
                                  {hasRealReply && req.repliedAt
                                    ? timeAgo(req.repliedAt)
                                    : 'Just now'}
                                </span>
                              </div>
                              <p className="font-body text-sm text-[var(--ink)] leading-relaxed italic">
                                &ldquo;
                                {hasRealReply
                                  ? req.replyText
                                  : `Hi ${req.name}! Loved your note. I'd be happy to talk, let's take it forward over a call this week. — ${designerFirstName}`}
                                &rdquo;
                              </p>
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>

                    {/* Withdraw Request Row */}
                    <div className="pt-2 border-t border-[var(--hairline)] flex items-center justify-between">
                      {isConfirming ? (
                        <div className="flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.14em]">
                          <span className="text-[var(--terracotta)] font-medium">
                            Withdraw request?
                          </span>
                          <button
                            type="button"
                            onClick={() => handleConfirmWithdraw(req.id, req.designerName)}
                            className="text-[var(--terracotta)] underline underline-offset-4 hover:opacity-80"
                          >
                            Yes, withdraw
                          </button>
                          <span className="text-[var(--hairline)]">/</span>
                          <button
                            type="button"
                            onClick={() => setConfirmWithdrawId(null)}
                            className="text-[var(--umber)] hover:text-[var(--ink)]"
                          >
                            Cancel
                          </button>
                        </div>
                      ) : (
                        <button
                          type="button"
                          onClick={() => setConfirmWithdrawId(req.id)}
                          className="font-mono text-[10px] uppercase tracking-[0.16em] text-[var(--umber)]/70 hover:text-[var(--terracotta)] transition-colors flex items-center gap-1.5 py-1"
                        >
                          <Trash2 className="w-3 h-3" />
                          <span>Withdraw request</span>
                        </button>
                      )}

                      <span className="font-mono text-[10px] uppercase tracking-[0.12em] text-[var(--umber)]/50">
                        ID #{req.id.slice(-6)}
                      </span>
                    </div>
                  </motion.div>
                );
              })}
            </AnimatePresence>

            {/* Prototype footnote */}
            <div className="pt-8 text-center">
              <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-[var(--umber)]/60">
                ✦ Replies are simulated for this prototype unless answered via Designer View.
              </p>
            </div>
          </div>
        ) : (
          <EmptyState
            title="No requests yet."
            description="Found a textile craft you love? Reach out directly to a designer to commission a bespoke garment."
            actionText="Meet the designers"
            onAction={() => router.push('/designers')}
          />
        )}
      </div>
    </div>
  );
}
