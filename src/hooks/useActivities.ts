import { useState, useEffect } from 'react';
import { useCity } from './useCity';
import type { Activity } from '../types';
import { CITY_REGISTRY } from '../cities/registry';

// Derived from registry — single source of truth
const FALLBACKS: Record<string, Activity[]> = Object.fromEntries(
  Object.entries(CITY_REGISTRY).map(([key, { fallback }]) => [key, fallback])
);

const cache = new Map<string, Activity[]>();

export function useActivities(): Activity[] {
  const { city } = useCity();
  const [activities, setActivities] = useState<Activity[]>(() => cache.get(city) ?? []);

  useEffect(() => {
    // Return cached data immediately
    if (cache.has(city)) {
      setActivities(cache.get(city)!);
      return;
    }

    let cancelled = false;

    fetch(`${import.meta.env.BASE_URL}data/${city}.json`)
      .then(res => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        return res.json();
      })
      .then((data: { activities: Activity[] }) => {
        if (!cancelled) {
          cache.set(city, data.activities);
          setActivities(data.activities);
        }
      })
      .catch(() => {
        const fallback = FALLBACKS[city] ?? FALLBACKS.shenzhen;
        if (!cancelled) {
          cache.set(city, fallback);
          setActivities(fallback);
        }
      });

    return () => { cancelled = true; };
  }, [city]);

  return activities;
}
