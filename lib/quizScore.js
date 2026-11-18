import { items } from '@/data/items';

export const PALETTE_OPTIONS = [
  {
    id: 'terracotta-marigold',
    label: 'Terracotta & Marigold',
    colors: ['#B5472B', '#E3A72F'],
  },
  {
    id: 'indigo-madder',
    label: 'Indigo & Madder',
    colors: ['#1F2A44', '#B5472B'],
  },
  {
    id: 'ivory-umber',
    label: 'Ivory & Umber',
    colors: ['#F6F0E6', '#5A4A3C'],
  },
  {
    id: 'gold-earth',
    label: 'Gold & Earth',
    colors: ['#E3A72F', '#5A4A3C'],
  },
];

/**
 * Score items according to user quiz answers.
 * answers: {
 *   occasion: 'Wedding' | 'Festive' | 'Everyday',
 *   paletteId: 'terracotta-marigold' | 'indigo-madder' | 'ivory-umber' | 'gold-earth',
 *   priceRange: 'Under ₹5,000' | '₹5,000–₹12,000' | '₹12,000+',
 *   category: 'Sarees' | 'Lehengas' | 'Kurtas & Co-ords' | 'Indo-western'
 * }
 */
export function scoreQuiz(answers) {
  const chosenPalette = PALETTE_OPTIONS.find((p) => p.id === answers.paletteId);
  const paletteColors = chosenPalette ? chosenPalette.colors : [];

  const scored = items.map((item) => {
    let score = 0;

    // 1. Occasion (+3)
    if (answers.occasion === 'Wedding' && item.occasion === 'Wedding') {
      score += 3;
    } else if (answers.occasion === 'Festive' && item.occasion === 'Festive') {
      score += 3;
    } else if (answers.occasion === 'Everyday' && item.occasion === 'Casual') {
      score += 3;
    }

    // 2. Category (+2)
    if (answers.category === 'Sarees' && item.category === 'Sarees') {
      score += 2;
    } else if (answers.category === 'Lehengas' && item.category === 'Lehengas') {
      score += 2;
    } else if (
      answers.category === 'Kurtas & Co-ords' &&
      (item.category === 'Kurtas' || item.category === 'Co-ords')
    ) {
      score += 2;
    } else if (
      answers.category === 'Indo-western' &&
      item.category === 'Indo-western'
    ) {
      score += 2;
    }

    // 3. Price range (+2)
    if (answers.priceRange === 'Under ₹5,000' && item.price < 5000) {
      score += 2;
    } else if (
      answers.priceRange === '₹5,000–₹12,000' &&
      item.price >= 5000 &&
      item.price <= 12000
    ) {
      score += 2;
    } else if (answers.priceRange === '₹12,000+' && item.price > 12000) {
      score += 2;
    }

    // 4. Palette overlap (+1 per color overlap)
    if (Array.isArray(item.palette) && paletteColors.length > 0) {
      paletteColors.forEach((color) => {
        if (item.palette.includes(color)) {
          score += 1;
        }
      });
    }

    return {
      ...item,
      score,
      matchPercentage: Math.min(100, Math.round((score / 9) * 100)),
    };
  });

  // Sort by score descending; break ties by lower price
  scored.sort((a, b) => {
    if (b.score !== a.score) {
      return b.score - a.score;
    }
    return a.price - b.price;
  });

  // Return top 4 items
  return scored.slice(0, 4);
}
