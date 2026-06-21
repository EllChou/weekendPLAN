import { createContext, useContext, useState, useCallback, type ReactNode } from 'react';
import { DEFAULT_CITY } from '../types';

interface CityContextValue {
  city: string;
  setCity: (city: string) => void;
}

const CityContext = createContext<CityContextValue | null>(null);

const CITY_STORAGE_KEY = 'weekendplan_city';

function getStoredCity(): string {
  try {
    const stored = localStorage.getItem(CITY_STORAGE_KEY);
    if (stored) return stored;
  } catch {}
  return DEFAULT_CITY;
}

export function CityProvider({ children }: { children: ReactNode }) {
  const [city, setCityState] = useState<string>(getStoredCity);

  const setCity = useCallback((newCity: string) => {
    setCityState(newCity);
    try {
      localStorage.setItem(CITY_STORAGE_KEY, newCity);
    } catch {}
  }, []);

  return (
    <CityContext.Provider value={{ city, setCity }}>
      {children}
    </CityContext.Provider>
  );
}

export function useCityContext(): CityContextValue {
  const ctx = useContext(CityContext);
  if (!ctx) throw new Error('useCityContext must be used within CityProvider');
  return ctx;
}
