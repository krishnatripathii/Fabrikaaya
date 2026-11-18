'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, ArrowRight, RotateCcw, Heart, Sparkles } from 'lucide-react';
import ItemCard from '@/components/ItemCard';
import { scoreQuiz, PALETTE_OPTIONS } from '@/lib/quizScore';
import { useApp } from '@/context/AppProvider';

const QUIZ_STORAGE_KEY = 'fabrikaaya_quiz';

const QUESTIONS = [
  {
    key: 'occasion',
    title: 'Where are you headed?',
    subtitle: 'Choose the mood and dress code for your occasion.',
    options: [
      { value: 'Wedding', label: 'Wedding', desc: 'Heirloom silks, royal brocades & ornate craft' },
      { value: 'Festive', label: 'Festive', desc: 'Vibrant hues, joyful gatherings & celebration wear' },
      { value: 'Everyday', label: 'Everyday', desc: 'Breezy mulmul, slow cottons & relaxed ease' },
    ],
  },
  {
    key: 'paletteId',
    title: 'Pick your palette',
    subtitle: 'Select the color harmony that speaks to you.',
    options: PALETTE_OPTIONS.map((p) => ({
      value: p.id,
      label: p.label,
      colors: p.colors,
    })),
  },
  {
    key: 'priceRange',
    title: 'How much do you want to spend?',
    subtitle: 'Filter by your dedicated atelier investment.',
    options: [
      { value: 'Under ₹5,000', label: 'Under ₹5,000', desc: 'Accessible handcrafted everyday luxuries' },
      { value: '₹5,000–₹12,000', label: '₹5,000–₹12,000', desc: 'Detailed artisanal weaves & co-ord ensembles' },
      { value: '₹12,000+', label: '₹12,000+', desc: 'Heirloom bridal lehengas & pure Banarasi handlooms' },
    ],
  },
  {
    key: 'category',
    title: 'What do you reach for?',
    subtitle: 'Your signature silhouette preference.',
    options: [
      { value: 'Sarees', label: 'Sarees', desc: 'Six yards of pure fluid tradition' },
      { value: 'Lehengas', label: 'Lehengas', desc: 'Grand flared silhouettes for ceremonies' },
      { value: 'Kurtas & Co-ords', label: 'Kurtas & Co-ords', desc: 'Modern paired comfort and tailored sets' },
      { value: 'Indo-western', label: 'Indo-western', desc: 'Contemporary jackets, drapes & silhouettes' },
    ],
  },
];

export default function QuizPage() {
  const { isHydrated, saveAll, showToast } = useApp();
  const [currentStep, setCurrentStep] = useState(0); // 0..3 for questions, 4 for result
  const [answers, setAnswers] = useState({
    occasion: '',
    paletteId: '',
    priceRange: '',
    category: '',
  });
  const [results, setResults] = useState(null);

  // Load persisted quiz result if present
  useEffect(() => {
    try {
      const savedQuiz = localStorage.getItem(QUIZ_STORAGE_KEY);
      if (savedQuiz) {
        const parsed = JSON.parse(savedQuiz);
        if (parsed && Array.isArray(parsed.results) && parsed.results.length > 0) {
          setAnswers(parsed.answers || {});
          setResults(parsed.results);
          setCurrentStep(4);
        }
      }
    } catch (e) {
      console.error('Failed to load quiz from localStorage', e);
    }
  }, []);

  const handleSelectOption = (key, value) => {
    const updatedAnswers = { ...answers, [key]: value };
    setAnswers(updatedAnswers);

    if (currentStep < 3) {
      setCurrentStep((prev) => prev + 1);
    } else {
      // Final step: calculate score and finish
      const finalScored = scoreQuiz(updatedAnswers);
      setResults(finalScored);
      setCurrentStep(4);
      try {
        localStorage.setItem(
          QUIZ_STORAGE_KEY,
          JSON.stringify({ answers: updatedAnswers, results: finalScored })
        );
      } catch (e) {
        console.error('Failed to save quiz to localStorage', e);
      }
    }
  };

  const handleBack = () => {
    if (currentStep > 0 && currentStep <= 3) {
      setCurrentStep((prev) => prev - 1);
    } else if (currentStep === 4) {
      setCurrentStep(3);
    }
  };

  const handleRetake = () => {
    setAnswers({
      occasion: '',
      paletteId: '',
      priceRange: '',
      category: '',
    });
    setResults(null);
    setCurrentStep(0);
    try {
      localStorage.removeItem(QUIZ_STORAGE_KEY);
    } catch (e) {
      console.error(e);
    }
  };

  const handleSaveAll = () => {
    if (!results || results.length === 0) return;
    const ids = results.map((r) => r.id);
    saveAll(ids);
    showToast(`Saved all ${ids.length} pieces to your edit ✓`);
  };

  const currentQ = QUESTIONS[currentStep];

  return (
    <div className="min-h-[calc(100vh-72px)] flex flex-col justify-between relative bg-[var(--ivory)] overflow-hidden">
      {/* 2px progress bar at the top (terracotta on hairline) */}
      <div className="w-full h-[2px] bg-[var(--hairline)] relative">
        <motion.div
          className="h-full bg-[var(--terracotta)]"
          initial={{ width: '0%' }}
          animate={{
            width: `${((Math.min(currentStep, 3) + 1) / 4) * 100}%`,
          }}
          transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
        />
      </div>

      {/* Main Container */}
      <div className="max-w-[1080px] w-full mx-auto px-5 md:px-8 py-10 md:py-16 flex-1 flex flex-col justify-center">
        {currentStep < 4 ? (
          <div className="w-full max-w-[720px] mx-auto">
            {/* Top Meta: Back + Question Counter */}
            <div className="flex items-center justify-between mb-8">
              {currentStep > 0 ? (
                <button
                  type="button"
                  onClick={handleBack}
                  className="font-mono text-[11px] uppercase tracking-[0.16em] text-[var(--umber)] hover:text-[var(--terracotta)] flex items-center gap-1.5 transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[var(--terracotta)] rounded"
                >
                  <ArrowLeft className="w-3.5 h-3.5" />
                  <span>Back</span>
                </button>
              ) : (
                <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-[var(--terracotta)]">
                  Style Consultation
                </span>
              )}

              <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-[var(--umber)]">
                Question {currentStep + 1} of 4
              </span>
            </div>

            {/* Question slide transition */}
            <AnimatePresence mode="wait">
              <motion.div
                key={currentStep}
                initial={{ opacity: 0, x: 40 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -40 }}
                transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                className="space-y-8"
              >
                <div>
                  <h1 className="font-display font-medium text-[clamp(36px,5vw,64px)] text-[var(--ink)] leading-[0.95] mb-3">
                    {currentQ.title}
                  </h1>
                  <p className="font-body text-sm sm:text-base text-[var(--umber)]">
                    {currentQ.subtitle}
                  </p>
                </div>

                {/* Answer Options as big outlined pill cards */}
                <div className="grid grid-cols-1 gap-3.5 pt-2">
                  {currentQ.options.map((option) => {
                    const isSelected = answers[currentQ.key] === option.value;

                    // Q2 Palette rendering with dual-color swatch circles
                    if (currentQ.key === 'paletteId') {
                      return (
                        <button
                          key={option.value}
                          type="button"
                          onClick={() => handleSelectOption(currentQ.key, option.value)}
                          className={`w-full py-4 px-6 rounded-full border text-left flex items-center justify-between transition-all duration-200 hover:-translate-y-0.5 hover:border-[var(--terracotta)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--terracotta)] ${
                            isSelected
                              ? 'bg-[var(--ink)] text-[var(--ivory)] border-[var(--ink)]'
                              : 'bg-[var(--paper)] text-[var(--ink)] border-[var(--hairline)]'
                          }`}
                        >
                          <div className="flex items-center gap-4">
                            {/* Dual-color swatch circle */}
                            <div className="w-8 h-8 rounded-full border border-[var(--hairline)] flex overflow-hidden shrink-0 shadow-xs">
                              <span
                                className="w-1/2 h-full inline-block"
                                style={{ backgroundColor: option.colors[0] }}
                              />
                              <span
                                className="w-1/2 h-full inline-block"
                                style={{ backgroundColor: option.colors[1] }}
                              />
                            </div>
                            <span className="font-display text-xl sm:text-2xl font-medium">
                              {option.label}
                            </span>
                          </div>

                          <ArrowRight
                            className={`w-4 h-4 transition-transform ${
                              isSelected ? 'text-[var(--marigold)] translate-x-1' : 'text-[var(--umber)]'
                            }`}
                          />
                        </button>
                      );
                    }

                    // Standard text pill options
                    return (
                      <button
                        key={option.value}
                        type="button"
                        onClick={() => handleSelectOption(currentQ.key, option.value)}
                        className={`w-full py-4 px-6 sm:px-8 rounded-full border text-left flex items-center justify-between transition-all duration-200 hover:-translate-y-0.5 hover:border-[var(--terracotta)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--terracotta)] ${
                          isSelected
                            ? 'bg-[var(--ink)] text-[var(--ivory)] border-[var(--ink)]'
                            : 'bg-[var(--paper)] text-[var(--ink)] border-[var(--hairline)]'
                        }`}
                      >
                        <div className="space-y-0.5 pr-4">
                          <span className="font-display text-xl sm:text-2xl font-medium block">
                            {option.label}
                          </span>
                          {option.desc && (
                            <span
                              className={`font-body text-xs block ${
                                isSelected ? 'text-[var(--ivory)]/75' : 'text-[var(--umber)]'
                              }`}
                            >
                              {option.desc}
                            </span>
                          )}
                        </div>

                        <ArrowRight
                          className={`w-4 h-4 shrink-0 transition-transform ${
                            isSelected ? 'text-[var(--marigold)] translate-x-1' : 'text-[var(--umber)]'
                          }`}
                        />
                      </button>
                    );
                  })}
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        ) : (
          /* Result Screen */
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="w-full space-y-10"
          >
            {/* Header + Action Bar */}
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 pb-6 border-b border-[var(--hairline)]">
              <div>
                <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-[var(--terracotta)] block mb-1">
                  Curated Match
                </span>
                <h1 className="font-display font-medium text-[clamp(40px,5vw,64px)] text-[var(--ink)] leading-tight">
                  Your edit, curated.
                </h1>
                <p className="font-body text-sm sm:text-base text-[var(--umber)] max-w-[50ch] mt-1">
                  Based on your occasion, preferred palette, silhouette, and budget, these four handcrafted pieces match your personal aesthetic.
                </p>
              </div>

              <div className="flex items-center gap-3 shrink-0">
                <button
                  type="button"
                  onClick={handleSaveAll}
                  className="py-3 px-6 rounded-full font-mono text-[11px] uppercase tracking-[0.16em] bg-[var(--ink)] text-[var(--ivory)] hover:bg-[var(--terracotta)] transition-all duration-200 hover:-translate-y-0.5 active:scale-98 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--terracotta)] flex items-center gap-2"
                >
                  <Heart className="w-3.5 h-3.5 fill-[var(--marigold)] text-[var(--marigold)]" />
                  <span>Save all</span>
                </button>

                <button
                  type="button"
                  onClick={handleRetake}
                  className="py-3 px-6 rounded-full font-mono text-[11px] uppercase tracking-[0.16em] border border-[var(--hairline)] text-[var(--ink)] hover:border-[var(--terracotta)] transition-all duration-200 hover:-translate-y-0.5 active:scale-98 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--terracotta)] flex items-center gap-2"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Retake</span>
                </button>
              </div>
            </div>

            {/* 4 ItemCards with Match Score */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {results &&
                results.map((item, idx) => (
                  <div key={item.id} className="flex flex-col gap-2">
                    {/* Score Match Badge */}
                    <div className="flex items-center justify-between px-1">
                      <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-[var(--terracotta)] font-medium flex items-center gap-1">
                        <Sparkles className="w-3 h-3 text-[var(--marigold)]" />
                        <span>{item.score}/9 match</span>
                      </span>
                      <span className="font-mono text-[10px] text-[var(--umber)]">
                        {item.matchPercentage}% match
                      </span>
                    </div>

                    <ItemCard item={item} priority={idx < 2} />
                  </div>
                ))}
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}
