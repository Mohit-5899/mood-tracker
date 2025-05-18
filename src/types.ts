export type MoodType = 'great' | 'good' | 'neutral' | 'bad' | 'awful';

export type MoodEntry = {
  id: string;
  date: string; // YYYY-MM-DD format
  mood: MoodType;
  note?: string;
  createdAt: string; // ISO date string
};

export type MoodData = {
  [date: string]: MoodEntry;
};

export interface CalendarDay {
  date: Date;
  isCurrentMonth: boolean;
  isToday: boolean;
  mood?: MoodType;
} 