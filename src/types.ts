// Re-export types from leaf module
export type { Activity, CityData, HistoryEntry } from './types/activity';

// Derived from src/cities/registry.ts — single source of truth for city list
import { CITY_REGISTRY } from './cities/registry';

export const CITIES: Record<string, { emoji: string; name: string }> =
  Object.fromEntries(
    Object.entries(CITY_REGISTRY).map(([key, { emoji, name }]) => [key, { emoji, name }])
  );

export const DEFAULT_CITY = 'shenzhen';
