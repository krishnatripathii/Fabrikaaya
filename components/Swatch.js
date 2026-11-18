'use client';

import React, { useId } from 'react';

/**
 * Swatch Art Component
 * Renders an authentic, deterministic inline SVG fabric pattern.
 * No external photos/images.
 */
export default function Swatch({
  pattern = 'bandhani',
  palette = ['#B5472B', '#E3A72F', '#F6F0E6'],
  aspect = '4/5',
  className = '',
  priority = false,
}) {
  const reactId = useId().replace(/:/g, '');
  const base = palette[0] || '#B5472B';
  const accent1 = palette[1] || '#E3A72F';
  const accent2 = palette[2] || '#F6F0E6';

  const patternId = `pattern-${pattern}-${reactId}`;
  const filterId = `filter-blur-${reactId}`;
  const vignetteId = `vignette-${reactId}`;

  // Aspect ratio mapping
  const aspectClass =
    aspect === '4/5'
      ? 'aspect-[4/5]'
      : aspect === '3/4'
      ? 'aspect-[3/4]'
      : aspect === '1/1'
      ? 'aspect-square'
      : aspect === '16/9'
      ? 'aspect-[16/9]'
      : 'aspect-[4/5]';

  return (
    <div
      className={`relative w-full overflow-hidden rounded-[4px] border border-[var(--hairline)] ${aspectClass} ${className}`}
      style={{ backgroundColor: base }}
    >
      <svg
        className="w-full h-full block"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="none"
        width="100%"
        height="100%"
      >
        <defs>
          {/* Radial Vignette */}
          <radialGradient id={vignetteId} cx="50%" cy="50%" r="70%">
            <stop offset="60%" stopColor="rgba(27,22,18,0)" />
            <stop offset="100%" stopColor="rgba(27,22,18,0.15)" />
          </radialGradient>

          {/* Ikat blur filter */}
          {pattern === 'ikat' && (
            <filter id={filterId} x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="0.8" />
            </filter>
          )}

          {/* 1. BANDHANI */}
          {pattern === 'bandhani' && (
            <pattern
              id={patternId}
              width="56"
              height="56"
              patternUnits="userSpaceOnUse"
            >
              {/* Grid dots: alternating accent1 / accent2, every other row offset by 7px */}
              {/* Row 0: y = 7 */}
              <circle cx="7" cy="7" r="2.5" fill={accent1} />
              <circle cx="21" cy="7" r="2.5" fill={accent2} />
              <circle cx="35" cy="7" r="2.5" fill={accent1} />
              <circle cx="49" cy="7" r="2.5" fill={accent2} />

              {/* Row 1: y = 21 (offset by 7px) */}
              <circle cx="0" cy="21" r="2.5" fill={accent2} />
              <circle cx="14" cy="21" r="2.5" fill={accent1} />
              <circle cx="28" cy="21" r="2.5" fill={accent2} />
              <circle cx="42" cy="21" r="2.5" fill={accent1} />
              <circle cx="56" cy="21" r="2.5" fill={accent2} />

              {/* Row 2: y = 35 */}
              <circle cx="7" cy="35" r="2.5" fill={accent1} />
              <circle cx="21" cy="35" r="2.5" fill={accent2} />
              <circle cx="35" cy="35" r="2.5" fill={accent1} />
              <circle cx="49" cy="35" r="2.5" fill={accent2} />

              {/* Row 3: y = 49 (offset by 7px) */}
              <circle cx="0" cy="49" r="2.5" fill={accent2} />
              <circle cx="14" cy="49" r="2.5" fill={accent1} />
              <circle cx="28" cy="49" r="2.5" fill={accent2} />
              <circle cx="42" cy="49" r="2.5" fill={accent1} />
              <circle cx="56" cy="49" r="2.5" fill={accent2} />

              {/* Tiny inner white centers for authentic tie-dye effect */}
              <circle cx="7" cy="7" r="0.9" fill="#F6F0E6" opacity="0.8" />
              <circle cx="35" cy="7" r="0.9" fill="#F6F0E6" opacity="0.8" />
              <circle cx="14" cy="21" r="0.9" fill="#F6F0E6" opacity="0.8" />
              <circle cx="42" cy="21" r="0.9" fill="#F6F0E6" opacity="0.8" />

              {/* 4-dot clusters forming tiny diamonds every 56px */}
              <g fill={accent1}>
                <circle cx="28" cy="23" r="3" />
                <circle cx="33" cy="28" r="3" />
                <circle cx="28" cy="33" r="3" />
                <circle cx="23" cy="28" r="3" />
                <circle cx="28" cy="28" r="1.2" fill="#F6F0E6" />
              </g>
            </pattern>
          )}

          {/* 2. BLOCKPRINT */}
          {pattern === 'blockprint' && (
            <pattern
              id={patternId}
              width="64"
              height="64"
              patternUnits="userSpaceOnUse"
            >
              {/* Motif 1 at (16, 16) */}
              <g transform="translate(16, 16)">
                {/* 3-petal floral motif: three ellipses rotated 0/60/120 in accent1 */}
                <ellipse cx="0" cy="-6" rx="3.5" ry="6.5" fill={accent1} />
                <ellipse
                  cx="0"
                  cy="-6"
                  rx="3.5"
                  ry="6.5"
                  fill={accent1}
                  transform="rotate(60)"
                />
                <ellipse
                  cx="0"
                  cy="-6"
                  rx="3.5"
                  ry="6.5"
                  fill={accent1}
                  transform="rotate(120)"
                />
                <ellipse
                  cx="0"
                  cy="-6"
                  rx="3.5"
                  ry="6.5"
                  fill={accent1}
                  transform="rotate(180)"
                />
                <ellipse
                  cx="0"
                  cy="-6"
                  rx="3.5"
                  ry="6.5"
                  fill={accent1}
                  transform="rotate(240)"
                />
                <ellipse
                  cx="0"
                  cy="-6"
                  rx="3.5"
                  ry="6.5"
                  fill={accent1}
                  transform="rotate(300)"
                />
                {/* center circle in accent2 */}
                <circle cx="0" cy="0" r="3" fill={accent2} />
              </g>

              {/* Motif 2 at (48, 48) - offset alternate row by 32px */}
              <g transform="translate(48, 48)">
                <ellipse cx="0" cy="-6" rx="3.5" ry="6.5" fill={accent1} />
                <ellipse
                  cx="0"
                  cy="-6"
                  rx="3.5"
                  ry="6.5"
                  fill={accent1}
                  transform="rotate(60)"
                />
                <ellipse
                  cx="0"
                  cy="-6"
                  rx="3.5"
                  ry="6.5"
                  fill={accent1}
                  transform="rotate(120)"
                />
                <ellipse
                  cx="0"
                  cy="-6"
                  rx="3.5"
                  ry="6.5"
                  fill={accent1}
                  transform="rotate(180)"
                />
                <ellipse
                  cx="0"
                  cy="-6"
                  rx="3.5"
                  ry="6.5"
                  fill={accent1}
                  transform="rotate(240)"
                />
                <ellipse
                  cx="0"
                  cy="-6"
                  rx="3.5"
                  ry="6.5"
                  fill={accent1}
                  transform="rotate(300)"
                />
                <circle cx="0" cy="0" r="3" fill={accent2} />
              </g>

              {/* Tiny decorative stamens/dots */}
              <circle cx="16" cy="48" r="1.5" fill={accent2} opacity="0.5" />
              <circle cx="48" cy="16" r="1.5" fill={accent2} opacity="0.5" />
            </pattern>
          )}

          {/* 3. CHIKAN */}
          {pattern === 'chikan' && (
            <pattern
              id={patternId}
              width="40"
              height="40"
              patternUnits="userSpaceOnUse"
            >
              {/* 40px diamond lattice, stroke accent1 at 35% opacity, 1px */}
              <path
                d="M 20 0 L 40 20 L 20 40 L 0 20 Z"
                fill="none"
                stroke={accent1}
                strokeWidth="1"
                strokeOpacity="0.35"
              />
              {/* small leaf shapes arranged along lattice */}
              <g fill="#FFFFFF" fillOpacity="0.45" stroke={accent1} strokeWidth="0.5" strokeOpacity="0.4">
                {/* Top-right branch leaf */}
                <path d="M 28 8 C 30 6, 33 7, 32 11 C 30 11, 28 10, 28 8 Z" />
                {/* Bottom-right branch leaf */}
                <path d="M 32 29 C 33 33, 30 34, 28 32 C 28 30, 30 29, 32 29 Z" />
                {/* Bottom-left branch leaf */}
                <path d="M 12 32 C 10 34, 7 33, 8 29 C 10 29, 12 30, 12 32 Z" />
                {/* Top-left branch leaf */}
                <path d="M 8 11 C 7 7, 10 6, 12 8 C 12 10, 10 11, 8 11 Z" />
                {/* Center subtle flower */}
                <circle cx="20" cy="20" r="2.2" fill="#FFFFFF" fillOpacity="0.6" stroke={accent1} strokeWidth="0.5" />
              </g>

              {/* Tiny dots at lattice intersections */}
              <circle cx="20" cy="0" r="1.5" fill={accent1} opacity="0.65" />
              <circle cx="40" cy="20" r="1.5" fill={accent1} opacity="0.65" />
              <circle cx="20" cy="40" r="1.5" fill={accent1} opacity="0.65" />
              <circle cx="0" cy="20" r="1.5" fill={accent1} opacity="0.65" />
            </pattern>
          )}

          {/* 4. BROCADE */}
          {pattern === 'brocade' && (
            <pattern
              id={patternId}
              width="72"
              height="72"
              patternUnits="userSpaceOnUse"
            >
              {/* Gold boota/paisley motif (teardrop with curved tip) */}
              <g transform="translate(36, 36)">
                {/* Paisley / boota path */}
                <path
                  d="M 0 -14 C 7 -14, 11 -7, 10 2 C 9 9, 3 14, -3 15 C -9 15, -12 10, -11 4 C -10 -2, -5 -6, -2 -10 C -0.5 -12, -0.5 -13.5, 0 -14 Z"
                  fill="#E3A72F"
                  stroke={accent1}
                  strokeWidth="0.8"
                />
                {/* Inner paisley curl */}
                <path
                  d="M -1 2 C -0.5 6, 3 7, 5 3 C 6 0, 3 -3, 0 -6"
                  fill="none"
                  stroke={base}
                  strokeWidth="1"
                />
                {/* Small radiating dots */}
                <circle cx="0" cy="-17" r="1.2" fill="#E3A72F" />
                <circle cx="6" cy="-14" r="1" fill="#E3A72F" />
                <circle cx="12" cy="-7" r="1" fill="#E3A72F" />
                <circle cx="12" cy="3" r="1" fill="#E3A72F" />
              </g>
              {/* Corner mini boota motifs to tile harmoniously */}
              <circle cx="0" cy="0" r="2" fill="#E3A72F" opacity="0.7" />
              <circle cx="72" cy="0" r="2" fill="#E3A72F" opacity="0.7" />
              <circle cx="0" cy="72" r="2" fill="#E3A72F" opacity="0.7" />
              <circle cx="72" cy="72" r="2" fill="#E3A72F" opacity="0.7" />
            </pattern>
          )}

          {/* 5. AJRAKH */}
          {pattern === 'ajrakh' && (
            <pattern
              id={patternId}
              width="48"
              height="48"
              patternUnits="userSpaceOnUse"
            >
              {/* 48px diamonds drawn with stroke accent1 (madder red) 2px */}
              <path
                d="M 24 0 L 48 24 L 24 48 L 0 24 Z"
                fill="none"
                stroke={accent1}
                strokeWidth="2"
              />
              {/* Inner small diamond in accent2 */}
              <path
                d="M 24 14 L 34 24 L 24 34 L 14 24 Z"
                fill={accent2}
                fillOpacity="0.25"
                stroke={accent2}
                strokeWidth="1.5"
              />
              {/* Inner star / rosette center */}
              <circle cx="24" cy="24" r="2.5" fill={accent1} />
              <circle cx="24" cy="24" r="1" fill="#FFFFFF" />

              {/* Tiny white dots at corners */}
              <circle cx="24" cy="0" r="1.8" fill="#F6F0E6" />
              <circle cx="48" cy="24" r="1.8" fill="#F6F0E6" />
              <circle cx="24" cy="48" r="1.8" fill="#F6F0E6" />
              <circle cx="0" cy="24" r="1.8" fill="#F6F0E6" />

              {/* Corner lattice links */}
              <line x1="0" y1="0" x2="14" y2="14" stroke={accent1} strokeWidth="1" strokeDasharray="2,2" />
              <line x1="48" y1="0" x2="34" y2="14" stroke={accent1} strokeWidth="1" strokeDasharray="2,2" />
              <line x1="48" y1="48" x2="34" y2="34" stroke={accent1} strokeWidth="1" strokeDasharray="2,2" />
              <line x1="0" y1="48" x2="14" y2="34" stroke={accent1} strokeWidth="1" strokeDasharray="2,2" />
            </pattern>
          )}

          {/* 6. IKAT */}
          {pattern === 'ikat' && (
            <pattern
              id={patternId}
              width="56"
              height="84"
              patternUnits="userSpaceOnUse"
            >
              {/* Feathered zig-zag chevron bands with 3 alternating colors, band height 28px */}
              {/* Band 1: accent1 */}
              <g filter={`url(#${filterId})`}>
                <path
                  d="M 0 0 L 14 12 L 28 0 L 42 12 L 56 0 L 56 28 L 42 16 L 28 28 L 14 16 L 0 28 Z"
                  fill={accent1}
                />
                {/* Band 2: accent2 */}
                <path
                  d="M 0 28 L 14 40 L 28 28 L 42 40 L 56 28 L 56 56 L 42 44 L 28 56 L 14 44 L 0 56 Z"
                  fill={accent2}
                />
                {/* Band 3: base / accent1 mix */}
                <path
                  d="M 0 56 L 14 68 L 28 56 L 42 68 L 56 56 L 56 84 L 42 72 L 28 84 L 14 72 L 0 84 Z"
                  fill={accent1}
                  opacity="0.85"
                />
                {/* Stepped tie-dye bleed lines inside chevrons */}
                <line x1="14" y1="12" x2="14" y2="24" stroke="#F6F0E6" strokeWidth="1.2" opacity="0.6" />
                <line x1="42" y1="12" x2="42" y2="24" stroke="#F6F0E6" strokeWidth="1.2" opacity="0.6" />
                <line x1="28" y1="28" x2="28" y2="40" stroke={base} strokeWidth="1.2" opacity="0.7" />
              </g>
            </pattern>
          )}

          {/* 7. KOSA */}
          {pattern === 'kosa' && (
            <pattern
              id={patternId}
              width="60"
              height="60"
              patternUnits="userSpaceOnUse"
            >
              {/* Soft vertical stripes of varying width (accent1 at 18% opacity, widths 2/6/2/10px) */}
              <rect x="4" y="0" width="2" height="60" fill={accent1} fillOpacity="0.18" />
              <rect x="12" y="0" width="6" height="60" fill={accent1} fillOpacity="0.18" />
              <rect x="24" y="0" width="2" height="60" fill={accent1} fillOpacity="0.18" />
              <rect x="34" y="0" width="10" height="60" fill={accent1} fillOpacity="0.18" />
              <rect x="50" y="0" width="4" height="60" fill={accent1} fillOpacity="0.18" />

              {/* Tussar slub texture horizontal micro-flecks */}
              <line x1="8" y1="12" x2="18" y2="12" stroke={accent1} strokeWidth="0.75" strokeOpacity="0.25" />
              <line x1="28" y1="34" x2="44" y2="34" stroke={accent1} strokeWidth="0.75" strokeOpacity="0.25" />
              <line x1="2" y1="48" x2="14" y2="48" stroke={accent1} strokeWidth="0.75" strokeOpacity="0.25" />

              {/* Thin marigold zari line every 60px */}
              <line
                x1="59"
                y1="0"
                x2="59"
                y2="60"
                stroke="#E3A72F"
                strokeWidth="1.2"
                strokeOpacity="0.85"
              />
              <line
                x1="60"
                y1="0"
                x2="60"
                y2="60"
                stroke="#FFF2A3"
                strokeWidth="0.5"
                strokeOpacity="0.7"
              />
            </pattern>
          )}
        </defs>

        {/* Base background rect */}
        <rect width="100%" height="100%" fill={base} />

        {/* Pattern fill rect */}
        <rect width="100%" height="100%" fill={`url(#${patternId})`} />

        {/* Brocade top and bottom border bands (across top and bottom 12% of the art) */}
        {pattern === 'brocade' && (
          <g>
            {/* Top band */}
            <rect x="0" y="0" width="100%" height="12%" fill={accent1} fillOpacity="0.35" />
            <line x1="0" y1="4%" x2="100%" y2="4%" stroke="#E3A72F" strokeWidth="1.5" />
            <line x1="0" y1="8%" x2="100%" y2="8%" stroke="#E3A72F" strokeWidth="1.5" />
            
            {/* Bottom band */}
            <rect x="0" y="88%" width="100%" height="12%" fill={accent1} fillOpacity="0.35" />
            <line x1="0" y1="92%" x2="100%" y2="92%" stroke="#E3A72F" strokeWidth="1.5" />
            <line x1="0" y1="96%" x2="100%" y2="96%" stroke="#E3A72F" strokeWidth="1.5" />
          </g>
        )}

        {/* Subtle inner vignette */}
        <rect width="100%" height="100%" fill={`url(#${vignetteId})`} />

        {/* Hairline 1px border */}
        <rect
          x="0.5"
          y="0.5"
          width="calc(100% - 1px)"
          height="calc(100% - 1px)"
          fill="none"
          stroke="rgba(27,22,18,0.14)"
          strokeWidth="1"
        />
      </svg>
    </div>
  );
}
