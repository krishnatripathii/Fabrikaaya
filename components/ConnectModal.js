'use client';

import React, { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Loader2 } from 'lucide-react';
import { useApp } from '@/context/AppProvider';

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function ConnectModal() {
  const router = useRouter();
  const { connectModalData, setConnectModalData, addRequest, showToast } = useApp();
  const designer = connectModalData?.designer;

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    purpose: 'Custom outfit',
    budget: '₹5,000–₹15,000',
    message: '',
  });

  const [touched, setTouched] = useState({
    name: false,
    email: false,
    purpose: false,
    budget: false,
    message: false,
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  // Reset form when opened with a designer
  useEffect(() => {
    if (designer) {
      setFormData({
        name: '',
        email: '',
        purpose: 'Custom outfit',
        budget: '₹5,000–₹15,000',
        message: '',
      });
      setTouched({
        name: false,
        email: false,
        purpose: false,
        budget: false,
        message: false,
      });
      setIsSubmitting(false);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [designer]);

  // Handle ESC
  useEffect(() => {
    function onKeyDown(e) {
      if (e.key === 'Escape' && !isSubmitting) {
        setConnectModalData(null);
      }
    }
    if (designer) {
      window.addEventListener('keydown', onKeyDown);
    }
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [designer, isSubmitting, setConnectModalData]);

  if (!designer) return null;

  const firstName = designer.name.split(' ')[0];

  // Validation
  const errors = {
    name:
      formData.name.trim().length < 2
        ? 'Name must be at least 2 characters.'
        : null,
    email: !EMAIL_REGEX.test(formData.email.trim())
      ? 'Please enter a valid email address.'
      : null,
    message:
      formData.message.trim().length < 20
        ? `Message must be at least 20 characters (${formData.message.trim().length}/20).`
        : null,
  };

  const isValid = !errors.name && !errors.email && !errors.message;

  const handleBlur = (field) => {
    setTouched((prev) => ({ ...prev, [field]: true }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setTouched({
      name: true,
      email: true,
      purpose: true,
      budget: true,
      message: true,
    });

    if (!isValid || isSubmitting) return;

    setIsSubmitting(true);

    // 600ms simulated spinner state
    setTimeout(() => {
      addRequest({
        designerSlug: designer.slug,
        designerName: designer.name,
        name: formData.name.trim(),
        email: formData.email.trim(),
        purpose: formData.purpose,
        budget: formData.budget,
        message: formData.message.trim(),
      });

      setConnectModalData(null);
      showToast(`Request sent to ${designer.name} ✓`);
      router.push('/requests');
    }, 600);
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
        {/* Backdrop: ink at 60% with blur 4px */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => !isSubmitting && setConnectModalData(null)}
          className="fixed inset-0 bg-[var(--ink)]/60 backdrop-blur-[4px]"
          aria-hidden="true"
        />

        {/* Modal Window: 560px */}
        <motion.div
          role="dialog"
          aria-modal="true"
          aria-labelledby="connect-modal-title"
          initial={{ opacity: 0, scale: 0.96, y: 12 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.96, y: 12 }}
          transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
          className="relative z-10 w-full max-w-[560px] bg-[var(--paper)] border border-[var(--hairline)] rounded-[8px] shadow-[0_20px_50px_-20px_rgba(27,22,18,0.35)] p-6 sm:p-9"
        >
          {/* Close button */}
          <button
            type="button"
            disabled={isSubmitting}
            onClick={() => setConnectModalData(null)}
            aria-label="Close dialog"
            className="absolute top-5 right-5 p-2 rounded-full border border-[var(--hairline)] bg-[var(--ivory)] text-[var(--ink)] hover:text-[var(--terracotta)] hover:border-[var(--terracotta)] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--terracotta)]"
          >
            <X className="w-4 h-4" />
          </button>

          <div className="mb-6">
            <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-[var(--terracotta)] block mb-1">
              Direct Connection
            </span>
            <h2
              id="connect-modal-title"
              className="font-display text-[32px] sm:text-[38px] font-medium text-[var(--ink)] leading-tight"
            >
              Say hello to {firstName}
            </h2>
            <p className="font-body text-xs text-[var(--umber)] mt-1">
              {designer.craft} · {designer.city}
            </p>
          </div>

          <form onSubmit={handleSubmit} noValidate className="space-y-5">
            {/* 1. Name */}
            <div className="relative pt-3">
              <label
                htmlFor="connect-name"
                className="block font-mono text-[10px] uppercase tracking-[0.18em] text-[var(--umber)] mb-1"
              >
                Your Name *
              </label>
              <input
                id="connect-name"
                type="text"
                required
                value={formData.name}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, name: e.target.value }))
                }
                onBlur={() => handleBlur('name')}
                placeholder="e.g. Ananya Sen"
                className="w-full bg-transparent border-0 border-b border-[var(--hairline)] focus:border-[var(--terracotta)] focus:ring-0 px-0 py-2 font-body text-sm text-[var(--ink)] placeholder:text-[var(--umber)]/40 transition-colors focus:outline-none"
              />
              {touched.name && errors.name && (
                <p className="font-mono text-[11px] text-[var(--terracotta)] mt-1.5">
                  {errors.name}
                </p>
              )}
            </div>

            {/* 2. Email */}
            <div className="relative pt-2">
              <label
                htmlFor="connect-email"
                className="block font-mono text-[10px] uppercase tracking-[0.18em] text-[var(--umber)] mb-1"
              >
                Email Address *
              </label>
              <input
                id="connect-email"
                type="email"
                required
                value={formData.email}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, email: e.target.value }))
                }
                onBlur={() => handleBlur('email')}
                placeholder="ananya@example.com"
                className="w-full bg-transparent border-0 border-b border-[var(--hairline)] focus:border-[var(--terracotta)] focus:ring-0 px-0 py-2 font-body text-sm text-[var(--ink)] placeholder:text-[var(--umber)]/40 transition-colors focus:outline-none"
              />
              {touched.email && errors.email && (
                <p className="font-mono text-[11px] text-[var(--terracotta)] mt-1.5">
                  {errors.email}
                </p>
              )}
            </div>

            {/* 3. Purpose */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div>
                <label
                  htmlFor="connect-purpose"
                  className="block font-mono text-[10px] uppercase tracking-[0.18em] text-[var(--umber)] mb-1"
                >
                  Looking For
                </label>
                <select
                  id="connect-purpose"
                  value={formData.purpose}
                  onChange={(e) =>
                    setFormData((prev) => ({ ...prev, purpose: e.target.value }))
                  }
                  className="w-full bg-transparent border-0 border-b border-[var(--hairline)] focus:border-[var(--terracotta)] focus:ring-0 px-0 py-2 font-body text-sm text-[var(--ink)] cursor-pointer focus:outline-none"
                >
                  <option value="Custom outfit">Custom outfit</option>
                  <option value="Bulk order">Bulk order</option>
                  <option value="Collaboration">Collaboration</option>
                  <option value="Just a question">Just a question</option>
                </select>
              </div>

              {/* 4. Budget */}
              <div>
                <label
                  htmlFor="connect-budget"
                  className="block font-mono text-[10px] uppercase tracking-[0.18em] text-[var(--umber)] mb-1"
                >
                  Budget Range
                </label>
                <select
                  id="connect-budget"
                  value={formData.budget}
                  onChange={(e) =>
                    setFormData((prev) => ({ ...prev, budget: e.target.value }))
                  }
                  className="w-full bg-transparent border-0 border-b border-[var(--hairline)] focus:border-[var(--terracotta)] focus:ring-0 px-0 py-2 font-body text-sm text-[var(--ink)] cursor-pointer focus:outline-none"
                >
                  <option value="Under ₹5,000">Under ₹5,000</option>
                  <option value="₹5,000–₹15,000">₹5,000–₹15,000</option>
                  <option value="₹15,000+">₹15,000+</option>
                  <option value="Not sure">Not sure</option>
                </select>
              </div>
            </div>

            {/* 5. Message */}
            <div className="relative pt-2">
              <div className="flex items-center justify-between mb-1">
                <label
                  htmlFor="connect-message"
                  className="block font-mono text-[10px] uppercase tracking-[0.18em] text-[var(--umber)]"
                >
                  Message *
                </label>
                <span
                  className={`font-mono text-[10px] ${
                    formData.message.trim().length >= 20
                      ? 'text-[var(--umber)]'
                      : 'text-[var(--terracotta)]'
                  }`}
                >
                  {formData.message.trim().length}/20 min
                </span>
              </div>
              <textarea
                id="connect-message"
                rows={3}
                required
                value={formData.message}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, message: e.target.value }))
                }
                onBlur={() => handleBlur('message')}
                placeholder="Describe your silhouette, preferred craft, occasion, or custom requirements…"
                className="w-full bg-transparent border-0 border-b border-[var(--hairline)] focus:border-[var(--terracotta)] focus:ring-0 px-0 py-2 font-body text-sm text-[var(--ink)] placeholder:text-[var(--umber)]/40 resize-none transition-colors focus:outline-none"
              />
              {touched.message && errors.message && (
                <p className="font-mono text-[11px] text-[var(--terracotta)] mt-1.5">
                  {errors.message}
                </p>
              )}
            </div>

            {/* Submit Button */}
            <div className="pt-4">
              <button
                type="submit"
                disabled={!isValid || isSubmitting}
                className="w-full py-3.5 px-6 rounded-full font-mono text-[11px] uppercase tracking-[0.18em] bg-[var(--ink)] text-[var(--ivory)] hover:bg-[var(--terracotta)] disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:bg-[var(--ink)] transition-all duration-200 hover:-translate-y-0.5 active:scale-98 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--terracotta)] flex items-center justify-center gap-2"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin text-[var(--ivory)]" />
                    <span>Sending note…</span>
                  </>
                ) : (
                  <span>Send request →</span>
                )}
              </button>
            </div>
          </form>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
