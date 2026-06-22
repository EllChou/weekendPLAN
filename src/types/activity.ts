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
