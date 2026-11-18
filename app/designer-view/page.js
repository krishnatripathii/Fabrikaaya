'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageSquare, Check, Send, Eye, User, Mail, DollarSign, Tag, ArrowRight } from 'lucide-react';
import { designers } from '@/data/designers';
import { useApp } from '@/context/AppProvider';
import { timeAgo } from '@/lib/format';
import EmptyState from '@/components/EmptyState';

export default function DesignerViewPage() {
  const { requests, updateRequest, isHydrated, showToast } = useApp();
  const [selectedDesignerSlug, setSelectedDesignerSlug] = useState(
    designers[0]?.slug || 'meera-kasliwal'
  );
  const [replyOpenForId, setReplyOpenForId] = useState(null);
  const [replyInput, setReplyInput] = useState('');

  const currentDesigner =
    designers.find((d) => d.slug === selectedDesignerSlug) || designers[0];

  const filteredRequests = requests.filter(
    (req) => req.designerSlug === currentDesigner.slug
  );

  const handleOpenReply = (req) => {
    setReplyOpenForId(req.id);
    setReplyInput(req.replyText || '');
  };

  const handleSendReply = (requestId, buyerName) => {
    if (replyInput.trim().length < 10) return;

    updateRequest(requestId, {
      status: 'replied',
      replyText: replyInput.trim(),
      repliedAt: new Date().toISOString(),
    });

    setReplyOpenForId(null);
    setReplyInput('');
    showToast(`Reply sent to ${buyerName} ✓`);
  };

  const handleMarkAsSeen = (requestId, buyerName) => {
    updateRequest(requestId, {
      status: 'seen',
    });
    showToast(`Marked request from ${buyerName} as seen ✓`);
  };

  return (
    <div className="min-h-screen pb-20">
      {/* Top Banner: Designer view (prototype) */}
      <aside
        aria-label="Prototype environment notice"
        className="w-full bg-[var(--ink)] text-[var(--ivory)] py-2 px-5 md:px-8 border-b border-[var(--hairline)]"
      >
        <div className="max-w-[1320px] mx-auto flex items-center justify-between text-xs font-mono uppercase tracking-[0.18em]">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[var(--marigold)] animate-pulse" />
            <span className="text-[var(--marigold)]">Designer view (prototype)</span>
          </div>
          <span className="text-[var(--ivory)]/60 hidden sm:inline">
            Direct artisan inbox simulation
          </span>
        </div>
      </aside>

      <div className="max-w-[1080px] mx-auto px-5 md:px-8 pt-10 md:pt-14">
        {/* Header with Designer Selector */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-8 border-b border-[var(--hairline)] mb-10">
          <div>
            <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-[var(--terracotta)] block mb-1">
              Artisan Atelier Portal
            </span>
            <h1 className="font-display font-medium text-[clamp(36px,5vw,60px)] text-[var(--ink)] leading-[0.95]">
              Inbox: {currentDesigner.name}
            </h1>
            <p className="font-body text-sm text-[var(--umber)] mt-2">
              Viewing incoming custom garment commissions and patron inquiries as this artisan.
            </p>
          </div>

          {/* Designer Selector Dropdown */}
          <div className="shrink-0 space-y-1.5">
            <label
              htmlFor="designer-select"
              className="block font-mono text-[10px] uppercase tracking-[0.18em] text-[var(--umber)]"
            >
              Switch Designer:
            </label>
            <select
              id="designer-select"
              value={selectedDesignerSlug}
              onChange={(e) => {
                setSelectedDesignerSlug(e.target.value);
                setReplyOpenForId(null);
              }}
              className="h-11 px-4 pr-10 bg-[var(--paper)] rounded-full border border-[var(--hairline)] font-mono text-[11px] uppercase tracking-[0.14em] text-[var(--ink)] focus:border-[var(--terracotta)] focus:outline-none cursor-pointer"
            >
              {designers.map((d) => (
                <option key={d.slug} value={d.slug}>
                  {d.name} ({d.city})
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Requests List */}
        {!isHydrated ? (
          <div className="space-y-4">
            {[1, 2].map((i) => (
              <div
                key={i}
                className="h-40 bg-[var(--paper)] rounded-[4px] border border-[var(--hairline)] animate-pulse"
              />
            ))}
          </div>
        ) : filteredRequests.length > 0 ? (
          <div className="space-y-6">
            <div className="flex items-center justify-between font-mono text-[11px] uppercase tracking-[0.16em] text-[var(--umber)] pb-2">
              <span>{filteredRequests.length} incoming inquiry</span>
              <span>Updated real-time</span>
            </div>

            <AnimatePresence>
              {filteredRequests.map((req) => (
                <motion.div
                  key={req.id}
                  layout
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.98 }}
                  transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                  className="bg-[var(--paper)] rounded-[4px] border border-[var(--hairline)] p-6 sm:p-8 shadow-xs space-y-5"
                >
                  {/* Top Meta row */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[var(--hairline)] pb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-[var(--ivory)] border border-[var(--hairline)] flex items-center justify-center font-display text-lg font-medium text-[var(--ink)]">
                        {req.name[0]}
                      </div>
                      <div>
                        <h2 className="font-display text-2xl font-medium text-[var(--ink)] leading-snug">
                          {req.name}
                        </h2>
                        <a
                          href={`mailto:${req.email}`}
                          className="font-mono text-[11px] text-[var(--umber)] hover:text-[var(--terracotta)] transition-colors"
                        >
                          {req.email}
                        </a>
                      </div>
                    </div>

                    {/* Status Pill */}
                    <div className="flex items-center gap-3">
                      <span className="font-mono text-[11px] text-[var(--umber)]/70">
                        {timeAgo(req.createdAt)}
                      </span>

                      <span
                        className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full font-mono text-[10px] uppercase tracking-[0.16em] font-medium ${
                          req.status === 'sent'
                            ? 'border border-[var(--umber)] text-[var(--umber)] bg-transparent'
                            : req.status === 'seen'
                            ? 'bg-[var(--marigold)] text-[var(--ink)] border border-[var(--marigold)]'
                            : 'bg-[var(--terracotta)] text-[var(--ivory)] border border-[var(--terracotta)]'
                        }`}
                      >
                        <span
                          className={`w-1.5 h-1.5 rounded-full ${
                            req.status === 'sent'
                              ? 'bg-[var(--umber)]'
                              : req.status === 'seen'
                              ? 'bg-[var(--ink)]'
                              : 'bg-[var(--ivory)]'
                          }`}
                        />
                        <span className="capitalize">{req.status}</span>
                      </span>
                    </div>
                  </div>

                  {/* Purpose & Budget tags */}
                  <div className="flex flex-wrap items-center gap-3 font-mono text-[11px] uppercase tracking-[0.14em]">
                    <span className="px-3 py-1 bg-[var(--ivory)] rounded-full border border-[var(--hairline)] text-[var(--ink)]">
                      Looking for: {req.purpose}
                    </span>
                    <span className="px-3 py-1 bg-[var(--ivory)] rounded-full border border-[var(--hairline)] text-[var(--ink)]">
                      Budget: {req.budget}
                    </span>
                  </div>

                  {/* Message body */}
                  <div className="bg-[var(--ivory)]/70 p-4 rounded-[4px] border border-[var(--hairline)] space-y-1">
                    <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-[var(--umber)] block">
                      Patron Note:
                    </span>
                    <p className="font-body text-sm text-[var(--ink)] leading-relaxed italic">
                      &ldquo;{req.message}&rdquo;
                    </p>
                  </div>

                  {/* If already replied, show the reply */}
                  {req.replyText && (
                    <div className="bg-[var(--ivory)] border-l-2 border-[var(--terracotta)] p-4 rounded-r-[4px] space-y-1">
                      <div className="flex items-center justify-between font-mono text-[10px] uppercase tracking-[0.16em]">
                        <span className="text-[var(--terracotta)] font-medium">
                          Sent Response by {currentDesigner.name}
                        </span>
                        {req.repliedAt && (
                          <span className="text-[var(--umber)]/70">
                            {timeAgo(req.repliedAt)}
                          </span>
                        )}
                      </div>
                      <p className="font-body text-sm text-[var(--ink)] leading-relaxed">
                        &ldquo;{req.replyText}&rdquo;
                      </p>
                    </div>
                  )}

                  {/* Inline Reply Form */}
                  {replyOpenForId === req.id && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      className="pt-2 space-y-3"
                    >
                      <label
                        htmlFor={`reply-textarea-${req.id}`}
                        className="block font-mono text-[10px] uppercase tracking-[0.16em] text-[var(--umber)]"
                      >
                        Type response to {req.name} (min 10 characters):
                      </label>
                      <textarea
                        id={`reply-textarea-${req.id}`}
                        rows={3}
                        value={replyInput}
                        onChange={(e) => setReplyInput(e.target.value)}
                        placeholder={`Hi ${req.name}, thank you for reaching out! I would love to craft this piece...`}
                        className="w-full p-3 bg-[var(--ivory)] rounded-[4px] border border-[var(--hairline)] focus:border-[var(--terracotta)] font-body text-sm text-[var(--ink)] focus:outline-none resize-none"
                      />
                      <div className="flex items-center justify-between">
                        <span
                          className={`font-mono text-[10px] ${
                            replyInput.trim().length >= 10
                              ? 'text-[var(--umber)]'
                              : 'text-[var(--terracotta)]'
                          }`}
                        >
                          {replyInput.trim().length}/10 min characters
                        </span>

                        <div className="flex items-center gap-2">
                          <button
                            type="button"
                            onClick={() => setReplyOpenForId(null)}
                            className="py-2 px-4 rounded-full font-mono text-[10px] uppercase tracking-[0.14em] text-[var(--umber)] hover:text-[var(--ink)]"
                          >
                            Cancel
                          </button>

                          <button
                            type="button"
                            disabled={replyInput.trim().length < 10}
                            onClick={() => handleSendReply(req.id, req.name)}
                            className="py-2 px-5 rounded-full font-mono text-[10px] uppercase tracking-[0.16em] bg-[var(--ink)] text-[var(--ivory)] hover:bg-[var(--terracotta)] disabled:opacity-40 disabled:hover:bg-[var(--ink)] transition-all flex items-center gap-1.5"
                          >
                            <Send className="w-3 h-3" />
                            <span>Send reply</span>
                          </button>
                        </div>
                      </div>
                    </motion.div>
                  )}

                  {/* Action buttons */}
                  {replyOpenForId !== req.id && (
                    <div className="flex items-center gap-3 pt-2">
                      <button
                        type="button"
                        onClick={() => handleOpenReply(req)}
                        className="py-2 px-5 rounded-full font-mono text-[10px] uppercase tracking-[0.16em] bg-[var(--ink)] text-[var(--ivory)] hover:bg-[var(--terracotta)] transition-all duration-200 flex items-center gap-1.5"
                      >
                        <MessageSquare className="w-3 h-3" />
                        <span>{req.replyText ? 'Edit reply' : 'Reply'}</span>
                      </button>

                      {req.status === 'sent' && (
                        <button
                          type="button"
                          onClick={() => handleMarkAsSeen(req.id, req.name)}
                          className="py-2 px-4 rounded-full font-mono text-[10px] uppercase tracking-[0.16em] border border-[var(--hairline)] text-[var(--ink)] hover:border-[var(--terracotta)] transition-all duration-200 flex items-center gap-1.5"
                        >
                          <Eye className="w-3 h-3" />
                          <span>Mark as seen</span>
                        </button>
                      )}
                    </div>
                  )}
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        ) : (
          <EmptyState
            title="No requests for you yet."
            description="Send one from the buyer side to see it appear here in the designer portal."
            actionText="Go to discover"
            onAction={() => (window.location.href = '/discover')}
          />
        )}
      </div>
    </div>
  );
}
