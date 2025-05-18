import { v4 as uuidv4 } from 'uuid';
import { format, startOfMonth, endOfMonth, startOfWeek, endOfWeek, isSameMonth, isSameDay, addDays } from 'date-fns';
import { MoodType, MoodEntry, MoodData, CalendarDay } from '../types';

export const moodEmojis: Record<MoodType, string> = {
  great: '😁',
  good: '🙂',
  neutral: '😐',
  bad: '😔',
  awful: '😫'
};

export const moodColors: Record<MoodType, string> = {
  great: 'bg-mood-great',
  good: 'bg-mood-good',
  neutral: 'bg-mood-neutral',
  bad: 'bg-mood-bad',
  awful: 'bg-mood-awful'
};

export const moodLabels: Record<MoodType, string> = {
  great: 'Great',
  good: 'Good',
  neutral: 'Neutral',
  bad: 'Bad',
  awful: 'Awful'
};

export const createMoodEntry = (date: Date, mood: MoodType, note?: string): MoodEntry => ({
  id: uuidv4(),
  date: format(date, 'yyyy-MM-dd'),
  mood,
  note,
  createdAt: new Date().toISOString()
});

export const getCalendarDays = (date: Date, moodData: MoodData): CalendarDay[] => {
  const monthStart = startOfMonth(date);
  const monthEnd = endOfMonth(date);
  const startDate = startOfWeek(monthStart);
  const endDate = endOfWeek(monthEnd);
  
  const days: CalendarDay[] = [];
  let currentDate = startDate;
  
  while (currentDate <= endDate) {
    const formattedDate = format(currentDate, 'yyyy-MM-dd');
    const moodEntry = moodData[formattedDate];
    
    days.push({
      date: new Date(currentDate),
      isCurrentMonth: isSameMonth(currentDate, monthStart),
      isToday: isSameDay(currentDate, new Date()),
      mood: moodEntry?.mood
    });
    
    currentDate = addDays(currentDate, 1);
  }
  
  return days;
};

export const formatDateForDisplay = (date: Date): string => {
  return format(date, 'MMMM d, yyyy');
};

export const getMoodStats = (moodData: MoodData): Record<MoodType, number> => {
  const stats: Record<MoodType, number> = {
    great: 0,
    good: 0,
    neutral: 0,
    bad: 0,
    awful: 0
  };
  
  Object.values(moodData).forEach(entry => {
    stats[entry.mood]++;
  });
  
  return stats;
};

export const getMostFrequentMood = (moodData: MoodData): MoodType | null => {
  if (Object.keys(moodData).length === 0) return null;
  
  const stats = getMoodStats(moodData);
  return Object.entries(stats)
    .sort((a, b) => b[1] - a[1])
    .map(([mood]) => mood as MoodType)[0];
};

export const getLocalStorageMoodData = (): MoodData => {
  const data = localStorage.getItem('moodData');
  return data ? JSON.parse(data) : {};
};

export const saveLocalStorageMoodData = (moodData: MoodData): void => {
  localStorage.setItem('moodData', JSON.stringify(moodData));
};

export const clearLocalStorageMoodData = (): void => {
  localStorage.removeItem('moodData');
}; 