import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { format } from 'date-fns';
import { MoodEntry, MoodType } from '../types';
import { moodEmojis, moodLabels } from '../utils/moodUtils';
import { MoodPicker } from './MoodPicker';

interface MoodDetailsProps {
  selectedDate: Date;
  moodEntry?: MoodEntry;
  onSaveMood: (date: Date, mood: MoodType, note?: string) => void;
  onDeleteMood: (entryId: string) => void;
}

export const MoodDetails = ({
  selectedDate,
  moodEntry,
  onSaveMood,
  onDeleteMood,
}: MoodDetailsProps) => {
  const [selectedMood, setSelectedMood] = useState<MoodType | undefined>(
    moodEntry?.mood
  );
  const [note, setNote] = useState<string>(moodEntry?.note || '');
  const [isEditing, setIsEditing] = useState<boolean>(true);
  
  // Reset state when selectedDate changes
  useEffect(() => {
    setSelectedMood(moodEntry?.mood);
    setNote(moodEntry?.note || '');
    setIsEditing(true); // Always show mood picker when date changes
  }, [selectedDate, moodEntry]);

  const handleSave = () => {
    if (selectedMood) {
      onSaveMood(selectedDate, selectedMood, note || undefined);
      setIsEditing(false);
    }
  };

  const handleDelete = () => {
    if (moodEntry) {
      onDeleteMood(moodEntry.id);
      setSelectedMood(undefined);
      setNote('');
      setIsEditing(true);
    }
  };

  const formattedDate = format(selectedDate, 'EEEE, MMMM d, yyyy');

  return (
    <div className="card">
      <h2 className="text-xl font-semibold mb-4 text-center">
        {formattedDate}
      </h2>

      {isEditing ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          <MoodPicker
            selectedMood={selectedMood}
            onSelectMood={setSelectedMood}
          />

          <div className="mt-6">
            <label
              htmlFor="mood-note"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
            >
              Notes (optional)
            </label>
            <textarea
              id="mood-note"
              value={note}
              onChange={(e) => setNote(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-lg
                         bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100
                         focus:outline-none focus:ring-2 focus:ring-primary-500"
              rows={3}
              placeholder="How was your day? What happened?"
            />
          </div>

          <div className="mt-4 flex justify-end space-x-3">
            {moodEntry && (
              <button
                onClick={() => setIsEditing(false)}
                className="btn btn-outline"
                type="button"
              >
                Cancel
              </button>
            )}
            <button
              onClick={handleSave}
              className="btn btn-primary"
              type="button"
              disabled={!selectedMood}
            >
              Save
            </button>
          </div>
        </motion.div>
      ) : (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
          className="text-center"
        >
          <div className="flex justify-center mb-4">
            <span className="text-5xl">{moodEmojis[moodEntry?.mood as MoodType]}</span>
          </div>
          <p className="text-xl mb-4">{moodLabels[moodEntry?.mood as MoodType]}</p>
          
          {moodEntry?.note && (
            <div className="mt-4 mb-6 text-left">
              <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">
                Your notes:
              </h3>
              <p className="text-gray-800 dark:text-gray-200 whitespace-pre-line">
                {moodEntry.note}
              </p>
            </div>
          )}

          <div className="mt-6 flex justify-center space-x-3">
            <button
              onClick={() => setIsEditing(true)}
              className="btn btn-outline"
              type="button"
            >
              Edit
            </button>
            <button
              onClick={handleDelete}
              className="btn btn-outline text-red-500 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20"
              type="button"
            >
              Delete
            </button>
          </div>
        </motion.div>
      )}
    </div>
  );
}; 