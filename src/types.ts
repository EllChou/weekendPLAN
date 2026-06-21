export interface Activity {
  emoji: string;
  title: string;
  category: string;
  budget: string;
  duration: string;
  tags: string[];
}

export interface CityData {
  city: string;
  updated: string;
  curator: string;
  activities: Activity[];
}

export interface HistoryEntry {
  date: string;
  title: string;
  emoji: string;
  city: string;
  status: 'done' | 'skipped';
}

export const CITIES: Record<string, { emoji: string; name: string }> = {
  shenzhen:   { emoji: '🏙️', name: '深圳' },
  chengdu:    { emoji: '🌶️', name: '成都' },
  chongqing:  { emoji: '🏔️', name: '重庆' },
  ningbo:     { emoji: '🌊', name: '宁波' },
};

export const DEFAULT_CITY = 'shenzhen';
