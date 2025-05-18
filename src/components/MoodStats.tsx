import { useMemo } from 'react';
import { motion } from 'framer-motion';
import { MoodData, MoodType } from '../types';
import { getMoodStats, moodEmojis, moodLabels } from '../utils/moodUtils';

interface MoodStatsProps {
  moodData: MoodData;
}

export const MoodStats = ({ moodData }: MoodStatsProps) => {
  const stats = useMemo(() => getMoodStats(moodData), [moodData]);
  const totalEntries = useMemo(
    () => Object.values(stats).reduce((total, count) => total + count, 0),
    [stats]
  );

  const getPercentage = (count: number): number => {
    if (totalEntries === 0) return 0;
    return Math.round((count / totalEntries) * 100);
  };

  const moodTypes: MoodType[] = ['great', 'good', 'neutral', 'bad', 'awful'];

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    show: { opacity: 1, x: 0 }
  };

  if (totalEntries === 0) {
    return (
      <motion.div 
        className="card p-6 my-4"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h2 className="text-xl font-semibold mb-4">Mood Statistics</h2>
        <motion.p 
          className="text-gray-500 dark:text-gray-400 text-center"
          initial={{ scale: 0.9 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          Add some mood entries to see your statistics here!
        </motion.p>
      </motion.div>
    );
  }

  return (
    <motion.div 
      className="card p-6 my-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <motion.h2 
        className="text-xl font-semibold mb-4"
        initial={{ y: -10, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        Mood Statistics
      </motion.h2>
      
      <motion.p 
        className="text-sm text-gray-500 dark:text-gray-400 mb-4"
        initial={{ y: -5, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.1 }}
      >
        Based on {totalEntries} recorded {totalEntries === 1 ? 'day' : 'days'}
      </motion.p>

      <motion.div 
        className="space-y-3"
        variants={containerVariants}
        initial="hidden"
        animate="show"
      >
        {moodTypes.map((mood, index) => (
          <motion.div 
            key={mood} 
            className="flex items-center"
            variants={itemVariants}
            transition={{ duration: 0.5 }}
          >
            <motion.div 
              className="w-8 text-center mr-2"
              whileHover={{ scale: 1.2 }}
              transition={{ type: "spring", stiffness: 400 }}
            >
              {moodEmojis[mood]}
            </motion.div>
            <div className="w-20 mr-2">{moodLabels[mood]}</div>
            <div className="flex-1 h-6 bg-gray-100 dark:bg-gray-700 rounded-full overflow-hidden">
              <motion.div
                className={`h-full ${mood === 'great' ? 'bg-mood-great' : 
                              mood === 'good' ? 'bg-mood-good' : 
                              mood === 'neutral' ? 'bg-mood-neutral' : 
                              mood === 'bad' ? 'bg-mood-bad' : 'bg-mood-awful'}`}
                style={{ width: "0%" }}
                initial={{ width: "0%" }}
                animate={{ width: `${getPercentage(stats[mood])}%` }}
                transition={{ 
                  duration: 1,
                  delay: 0.2 + (index * 0.1),
                  ease: "easeOut" 
                }}
                role="progressbar"
                aria-valuenow={getPercentage(stats[mood])}
                aria-valuemin={0}
                aria-valuemax={100}
              ></motion.div>
            </div>
            <motion.div 
              className="w-12 text-right ml-2 text-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.5 + (index * 0.1) }}
            >
              {getPercentage(stats[mood])}%
            </motion.div>
          </motion.div>
        ))}
      </motion.div>
    </motion.div>
  );
};