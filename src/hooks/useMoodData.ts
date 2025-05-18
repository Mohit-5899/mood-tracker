import { useState, useEffect } from 'react';
import { MoodData, MoodType, MoodEntry } from '../types';
import { createMoodEntry, getLocalStorageMoodData, saveLocalStorageMoodData, clearLocalStorageMoodData } from '../utils/moodUtils';

export const useMoodData = () => {
  const [moodData, setMoodData] = useState<MoodData>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Load mood data from localStorage on first render
    const storedData = getLocalStorageMoodData();
    setMoodData(storedData);
    setLoading(false);
  }, []);

  // Save to localStorage whenever moodData changes
  useEffect(() => {
    if (!loading) {
      saveLocalStorageMoodData(moodData);
    }
  }, [moodData, loading]);

  const addMoodEntry = (date: Date, mood: MoodType, note?: string) => {
    const newEntry = createMoodEntry(date, mood, note);
    setMoodData(prev => ({
      ...prev,
      [newEntry.date]: newEntry
    }));
    return newEntry;
  };

  const updateMoodEntry = (entryId: string, updates: Partial<MoodEntry>) => {
    setMoodData(prev => {
      const updatedData = { ...prev };
      
      // Find the entry with the matching ID
      const entryKey = Object.keys(updatedData).find(
        key => updatedData[key].id === entryId
      );
      
      if (entryKey) {
        updatedData[entryKey] = {
          ...updatedData[entryKey],
          ...updates
        };
      }
      
      return updatedData;
    });
  };

  const deleteMoodEntry = (entryId: string) => {
    setMoodData(prev => {
      const updatedData = { ...prev };
      
      // Find the entry with the matching ID
      const entryKey = Object.keys(updatedData).find(
        key => updatedData[key].id === entryId
      );
      
      if (entryKey) {
        delete updatedData[entryKey];
      }
      
      return updatedData;
    });
  };

  const getMoodEntryForDate = (date: Date): MoodEntry | undefined => {
    const formattedDate = new Intl.DateTimeFormat('en-CA', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit'
    }).format(date).replace(/\//g, '-');
    
    return moodData[formattedDate];
  };

  const resetAllData = () => {
    clearLocalStorageMoodData();
    setMoodData({});
  };

  return {
    moodData,
    loading,
    addMoodEntry,
    updateMoodEntry,
    deleteMoodEntry,
    getMoodEntryForDate,
    resetAllData
  };
}; 