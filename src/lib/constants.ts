// Fear Gauge thresholds and weights — single source of truth
export const FEAR_THRESHOLDS = {
  CALM_MAX: 30,
  CAUTIOUS_MAX: 60,
} as const;

export const FEAR_WEIGHTS = {
  gold: 0.35,
  dxy: 0.25,
  chf: 0.20,
  jpy: 0.20,
} as const;

export const FEAR_NORMALIZATION = {
  baseline: 50,
  multiplier: 25,
} as const;

export const COLORS = {
  calm: '#22C55E',
  caution: '#F59E0B',
  fear: '#EF4444',
  accentBlue: '#2563EB',
  accentGold: '#D4AF37',
} as const;

export function getFearLabel(score: number): 'Calm' | 'Cautious' | 'Fear' {
  if (score <= FEAR_THRESHOLDS.CALM_MAX) return 'Calm';
  if (score <= FEAR_THRESHOLDS.CAUTIOUS_MAX) return 'Cautious';
  return 'Fear';
}

export function getFearColor(score: number): string {
  if (score <= FEAR_THRESHOLDS.CALM_MAX) return COLORS.calm;
  if (score <= FEAR_THRESHOLDS.CAUTIOUS_MAX) return COLORS.caution;
  return COLORS.fear;
}
