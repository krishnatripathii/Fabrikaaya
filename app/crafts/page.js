import React from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import Swatch from '@/components/Swatch';

export const metadata = {
  title: 'Craft Stories · Fabrikaaya',
  description:
    'Explore the six legendary textile traditions preserved across India—from the sixteen-stage resist dyes of Kutch Ajrakh to the golden wild Tussar cocoons of Chhattisgarh.',
  openGraph: {
    title: 'Craft Stories · Fabrikaaya',
    description:
      'Explore the six legendary textile traditions preserved across India.',
  },
};

const CRAFTS = [
  {
    name: 'Bandhani',
    region: 'GUJARAT & RAJASTHAN',
    pattern: 'bandhani',
    palette: ['#B5472B', '#E3A72F', '#F6F0E6'],
    history:
      'Derived from the Sanskrit word bandhana meaning to tie, Bandhani is an ancient resist-dyeing practice dating back to the Indus Valley Civilization. Master women pluck microscopic folds of fine mulmul or silk with pointed fingernails, binding each dot with waxed thread before immersing the yardage in natural vats. When unfurled, thousands of sacred cosmic rings bloom across fields of madder, saffron, and desert earth.',
    techniques: ['Plucked Resist', 'Natural Madder', 'Fingernail Pinching'],
    query: 'Bandhani',
  },
  {
    name: 'Chikankari',
    region: 'LUCKNOW, UTTAR PRADESH',
    pattern: 'chikan',
    palette: ['#F6F0E6', '#5A4A3C', '#B5472B'],
    history:
      'Nurtured under the refined royal patronage of Awadh courts, Chikankari is the sublime art of white-on-white needlecraft. Master artisans trace delicate Persian floral vines and paisleys onto diaphanous muslin before rendering them through thirty-two distinct stitches. The celebrated bakhiya creates ethereal shadow play from the reverse side, imparting an understated, whisper-quiet elegance that captures the fragrant moonlight of old Lucknow.',
    techniques: ['Shadow Work', 'Tepchi Stitch', 'Fine Mulmul'],
    query: 'Chikankari',
  },
  {
    name: 'Banarasi',
    region: 'VARANASI, UTTAR PRADESH',
    pattern: 'brocade',
    palette: ['#1F2A44', '#E3A72F', '#B5472B'],
    history:
      'Woven on pit looms along the sacred ghats of the Ganga, Banarasi brocades represent the zenith of Indian handloom weaving. Inspired by Mughal courtly flora, weavers interlace pure silk warp threads with genuine gold and silver zari using the demanding kadwa technique, engraving each floral boota individually without loose floating threads behind. A single heirloom bridal drape commands several months of patient, rhythmic discipline.',
    techniques: ['Zari Boota', 'Pit Loom', 'Kadwa Weaving'],
    query: 'Banarasi',
  },
  {
    name: 'Ajrakh',
    region: 'KUTCH, GUJARAT',
    pattern: 'ajrakh',
    palette: ['#1F2A44', '#B5472B', '#F6F0E6'],
    history:
      'Ajrakh is an extraordinarily complex alchemy of astronomy, sacred geometry, and natural chemistry practiced by the Khatri community in Kutch. Over sixteen meticulous stages of washing in river waters, harda treatment, resist printing with hand-carved teak blocks, and immersion in living indigo and madder vats, the cloth absorbs the midnight stars and red earth, breathing freely with every wash and change in weather.',
    techniques: ['16-Stage Resist', 'Natural Indigo', 'Teakwood Blocks'],
    query: 'Ajrakh',
  },
  {
    name: 'Ikat',
    region: 'POCHAMPALLY, TELANGANA',
    pattern: 'ikat',
    palette: ['#B5472B', '#1F2A44', '#E3A72F'],
    history:
      'In Pochampally, the weaver does not decorate woven cloth—they calculate and dye the warp and weft yarns with geometric mathematical precision before touching the loom. When interlaced, the yarns surrender their deliberate calculations to create subtly feathered, blurred contours that no machine can replicate. The iconic telia rumal oily resist protects yarn vibrancy, yielding textiles of profound optical rhythm.',
    techniques: ['Double Ikat', 'Yarn Tie-Dye', 'Telia Rumal'],
    query: 'Ikat',
  },
  {
    name: 'Kosa Silk',
    region: 'BILASPUR & CHAMPA, CHHATTISGARH',
    pattern: 'kosa',
    palette: ['#5A4A3C', '#E3A72F', '#F6F0E6'],
    history:
      'Harvested from wild Antheraea mylitta silkworms grazing upon Saja and Sal trees in the dense tropical forests of central India, Kosa is renowned for its organic dull-gold patina. Deeply resilient and naturally thermoregulating, village women reel the coarse yarn by hand before local weavers interlace it on wooden shuttles with fine zari margins, creating a textured drape celebrated across Chhattisgarh for centuries.',
    techniques: ['Wild Tussar', 'Forest Cocoon Reeling', 'Pure Zari Edging'],
    query: 'Kosa silk',
  },
];

export default function CraftsPage() {
  return (
    <div className="min-h-screen py-12 md:py-20">
      <div className="max-w-[1320px] mx-auto px-5 md:px-8">
        {/* Header */}
        <div className="mb-16 md:mb-24 max-w-[700px]">
          <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-[var(--terracotta)] block mb-1">
            Living Archive
          </span>
          <h1 className="font-display font-medium text-[clamp(44px,6vw,84px)] text-[var(--ink)] leading-[0.95]">
            The crafts.
          </h1>
          <p className="font-body text-base md:text-lg text-[var(--umber)] mt-3 leading-relaxed">
            Six regional textile disciplines preserved by generations of master karigars, each carrying centuries of geographic memory, botanical alchemy, and dedicated hands.
          </p>
        </div>

        {/* Six Large Editorial Rows */}
        <div className="space-y-20 md:space-y-32">
          {CRAFTS.map((craft, idx) => {
            const isReversed = idx % 2 === 1;

            return (
              <section
                key={craft.name}
                aria-labelledby={`craft-title-${idx}`}
                className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center pb-20 border-b border-[var(--hairline)]"
              >
                {/* Visual Swatch Column */}
                <div
                  className={`lg:col-span-6 ${
                    isReversed ? 'lg:order-2' : 'lg:order-1'
                  }`}
                >
                  <div className="p-3 bg-[var(--paper)] rounded-[4px] border border-[var(--hairline)] shadow-[0_20px_50px_-20px_rgba(27,22,18,0.25)] max-w-[520px] mx-auto lg:max-w-none">
                    <Swatch
                      pattern={craft.pattern}
                      palette={craft.palette}
                      aspect="4/5"
                    />
                    <div className="pt-2.5 px-2 flex items-center justify-between font-mono text-[10px] uppercase tracking-[0.16em] text-[var(--umber)]">
                      <span>{craft.name}</span>
                      <span>Archive specimen · {idx + 1}/6</span>
                    </div>
                  </div>
                </div>

                {/* Editorial Content Column */}
                <div
                  className={`lg:col-span-6 space-y-6 ${
                    isReversed ? 'lg:order-1' : 'lg:order-2'
                  }`}
                >
                  <div className="space-y-2">
                    <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-[var(--terracotta)] block">
                      {craft.region}
                    </span>
                    <h2
                      id={`craft-title-${idx}`}
                      className="font-display font-medium text-[44px] sm:text-[56px] text-[var(--ink)] leading-[0.95]"
                    >
                      {craft.name}
                    </h2>
                  </div>

                  <p className="font-body text-base text-[var(--umber)] leading-relaxed">
                    {craft.history}
                  </p>

                  {/* Technique tags */}
                  <div className="space-y-2 pt-1">
                    <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-[var(--umber)] block">
                      Technique & Heritage:
                    </span>
                    <div className="flex flex-wrap gap-2">
                      {craft.techniques.map((tech) => (
                        <span
                          key={tech}
                          className="px-3.5 py-1 rounded-full border border-[var(--hairline)] bg-[var(--paper)] font-mono text-[10px] uppercase tracking-[0.14em] text-[var(--ink)]"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Link to Discover */}
                  <div className="pt-4">
                    <Link
                      href={`/discover?q=${encodeURIComponent(craft.query)}`}
                      className="inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.18em] text-[var(--ink)] hover:text-[var(--terracotta)] group transition-colors py-2 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[var(--terracotta)] rounded"
                    >
                      <span className="underline underline-offset-4">
                        See {craft.name} pieces
                      </span>
                      <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </div>
                </div>
              </section>
            );
          })}
        </div>
      </div>
    </div>
  );
}
