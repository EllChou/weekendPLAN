import { useState, useCallback } from 'react';
import type { HistoryEntry } from '../types';

const HISTORY_KEY = 'weekendplan_history';
const MAX_HISTORY = 20;

function readHistory(): HistoryEntry[] {
  try {
    return JSON.parse(localStorage.getItem(HISTORY_KEY) || '[]');
  } catch {
    return [];
  }
}

export function useHistory(city: string) {
  const [history, setHistory] = useState<HistoryEntry[]>(readHistory);

  const addEntry = useCallback((entry: Omit<HistoryEntry, 'city'>) => {
    const full: HistoryEntry = { ...entry, city };
    setHistory(prev => {
      const next = [full, ...prev].slice(0, MAX_HISTORY);
      try {
        localStorage.setItem(HISTORY_KEY, JSON.stringify(next));
      } catch {}
      return next;
    });
  }, [city]);

  const cityHistory = history.filter(h => h.city === city).slice(0, 5);

  return { allHistory: history, cityHistory, addEntry };
}
