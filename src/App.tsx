import { useState } from 'react';
import { motion } from 'framer-motion';
import { useMoodData } from './hooks/useMoodData';
import { Header } from './components/Header';
import { Calendar } from './components/Calendar';
import { MoodDetails } from './components/MoodDetails';
import { MoodStats } from './components/MoodStats';
import { MoodType } from './types';

// Apply theme styles to Tailwind classes
const bgClass = "min-h-screen bg-dark-900 bg-noise";
const cardClass = "backdrop-blur-md bg-dark-800/70 rounded-xl shadow-card border border-dark-700/30 p-5";
const cardHoverClass = "transition-all duration-300 hover:shadow-card-hover";

function App() {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [showResetConfirm, setShowResetConfirm] = useState<boolean>(false);
  const { 
    moodData, 
    loading, 
    addMoodEntry, 
    updateMoodEntry, 
    deleteMoodEntry, 
    getMoodEntryForDate,
    resetAllData 
  } = useMoodData();

  const handleSaveMood = (date: Date, mood: MoodType, note?: string) => {
    const existingEntry = getMoodEntryForDate(date);
    
    if (existingEntry) {
      updateMoodEntry(existingEntry.id, { mood, note });
    } else {
      addMoodEntry(date, mood, note);
    }
  };

  const handleDeleteMood = (entryId: string) => {
    deleteMoodEntry(entryId);
  };
  
  const handleResetClick = () => {
    setShowResetConfirm(true);
  };
  
  const handleConfirmReset = () => {
    resetAllData();
    setShowResetConfirm(false);
  };

  const selectedMoodEntry = getMoodEntryForDate(selectedDate);

  if (loading) {
    return (
      <div className={`${bgClass} flex items-center justify-center`}>
        <div className="animate-pulse">
          <p className="text-slate-300">Loading your mood data...</p>
        </div>
      </div>
    );
  }

  return (
    <div className={bgClass}>
      {/* Animated gradient background */}
      <div className="fixed inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-br from-dark-900 via-primary-900/50 to-dark-900 opacity-90"></div>
        
        {/* Animated orbs */}
        <motion.div
          className="absolute top-20 left-10 w-72 h-72 rounded-full bg-accent-purple/20 blur-3xl"
          animate={{
            x: [0, 30, 0],
            y: [0, 20, 0],
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            repeatType: "reverse"
          }}
        />
        
        <motion.div
          className="absolute bottom-20 right-10 w-96 h-96 rounded-full bg-accent-blue/20 blur-3xl"
          animate={{
            x: [0, -40, 0],
            y: [0, 30, 0],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            repeatType: "reverse"
          }}
        />
        
        <motion.div
          className="absolute top-1/3 right-1/4 w-80 h-80 rounded-full bg-accent-cyan/20 blur-3xl"
          animate={{
            x: [0, 50, 0],
            y: [0, -30, 0],
            scale: [1, 1.15, 1],
          }}
          transition={{
            duration: 18,
            repeat: Infinity,
            repeatType: "reverse"
          }}
        />
      </div>
      
      <Header />
      
      <main className="container mx-auto px-4 py-6 max-w-7xl relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="space-y-6">
            <motion.div 
              className={`${cardClass} ${cardHoverClass} overflow-hidden`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <Calendar 
                moodData={moodData} 
                selectedDate={selectedDate} 
                onSelectDate={setSelectedDate} 
              />
            </motion.div>
            <motion.div 
              className={`${cardClass} ${cardHoverClass} overflow-hidden`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <MoodStats moodData={moodData} />
            </motion.div>
          </div>
          
          <motion.div 
            className={`${cardClass} ${cardHoverClass} overflow-hidden`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <MoodDetails
              selectedDate={selectedDate}
              moodEntry={selectedMoodEntry}
              onSaveMood={handleSaveMood}
              onDeleteMood={handleDeleteMood}
            />
          </motion.div>
        </div>
      </main>
      
      <footer className="container mx-auto px-4 py-4 text-center text-sm text-slate-400 relative z-10">
        <div className="flex flex-wrap justify-center items-center space-x-2">
          <p className="text-dark-300">MoodTracker &copy; {new Date().getFullYear()} • Track your daily emotions and monitor your mental health</p>
          <button 
            onClick={handleResetClick} 
            className="text-dark-300 hover:text-accent-pink transition-colors ml-2 text-sm font-medium underline"
          >
            Reset Data
          </button>
        </div>
      </footer>
      
      {/* Reset confirmation modal */}
      {showResetConfirm && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-md flex items-center justify-center z-50">
          <motion.div 
            className="bg-dark-800 rounded-xl p-6 max-w-md mx-4 border border-dark-700/50 shadow-glow-purple"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.3, type: "spring", stiffness: 500, damping: 30 }}
          >
            <h3 className="text-xl font-semibold mb-4 text-white">Reset All Data?</h3>
            <p className="text-dark-200 mb-6">
              This will permanently delete all your mood entries. This action cannot be undone.
            </p>
            <div className="flex justify-end space-x-4">
              <motion.button 
                onClick={() => setShowResetConfirm(false)}
                className="px-4 py-2 rounded-lg bg-dark-700 text-white hover:bg-dark-600 transition-colors"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Cancel
              </motion.button>
              <motion.button 
                onClick={handleConfirmReset}
                className="px-4 py-2 rounded-lg bg-gradient-to-r from-accent-pink to-red-500 text-white"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Reset All Data
              </motion.button>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
}

export default App; 