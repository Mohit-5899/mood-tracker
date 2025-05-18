import { motion } from 'framer-motion';
import { MoodType } from '../types';
import { moodEmojis, moodLabels } from '../utils/moodUtils';

interface MoodPickerProps {
  onSelectMood: (mood: MoodType) => void;
  selectedMood?: MoodType;
}

export const MoodPicker: React.FC<MoodPickerProps> = ({ onSelectMood, selectedMood }) => {
  const moods: MoodType[] = ['great', 'good', 'neutral', 'bad', 'awful'];
  
  // Map mood types to gradients for a more modern look
  const moodGradients: Record<MoodType, string> = {
    great: 'from-mood-great to-green-500',
    good: 'from-mood-good to-teal-500',
    neutral: 'from-mood-neutral to-violet-600',
    bad: 'from-mood-bad to-amber-500',
    awful: 'from-mood-awful to-red-600'
  };
  
  // Map mood types to glow effects
  const moodGlows: Record<MoodType, string> = {
    great: 'shadow-glow-lime',
    good: 'shadow-glow-teal',
    neutral: 'shadow-glow-purple',
    bad: 'shadow-glow-orange',
    awful: 'shadow-glow-red'
  };
  
  return (
    <div className="flex flex-col items-center py-6">
      <motion.h2 
        className="text-2xl font-display font-semibold mb-8 text-white bg-clip-text text-transparent bg-gradient-to-r from-accent-pink via-accent-purple to-accent-blue animate-gradient bg-[length:200%_auto]"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        How are you feeling today?
      </motion.h2>
      
      <div className="flex flex-wrap justify-center gap-4 md:gap-6">
        {moods.map((mood, index) => (
          <motion.button
            key={mood}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ 
              duration: 0.5, 
              delay: 0.1 * index,
              type: "spring",
              stiffness: 200
            }}
            whileHover={{ 
              scale: 1.15, 
              y: -5,
              transition: { type: "spring", stiffness: 400, damping: 10 }
            }}
            whileTap={{ scale: 0.95 }}
            className={`
              relative w-16 h-16 md:w-20 md:h-20 rounded-2xl bg-gradient-to-br ${moodGradients[mood]}
              flex items-center justify-center text-3xl md:text-4xl
              ${selectedMood === mood ? `${moodGlows[mood]} ring-2 ring-white/30` : 'shadow-card'}
              transform transition-all duration-300 border border-white/10
              overflow-hidden backdrop-blur-xs
            `}
            onClick={() => onSelectMood(mood)}
            aria-label={`Select mood: ${moodLabels[mood]}`}
          >
            <div className="absolute inset-0 bg-noise opacity-10"></div>
            <motion.span 
              className="filter drop-shadow-md relative z-10" 
              role="img" 
              aria-label={moodLabels[mood]}
              animate={selectedMood === mood ? { 
                scale: [1, 1.2, 1], 
                rotate: [0, 5, 0, -5, 0] 
              } : {}}
              transition={{ 
                duration: 0.5, 
                ease: "easeInOut",
                repeat: selectedMood === mood ? 1 : 0
              }}
            >
              {moodEmojis[mood]}
            </motion.span>
          </motion.button>
        ))}
      </div>
      
      {selectedMood && (
        <motion.div 
          initial={{ opacity: 0, y: 5 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-8"
        >
          <div className="px-6 py-2 rounded-full bg-dark-800/70 backdrop-blur-md text-white border border-dark-700/30 shadow-card">
            <span className="font-medium flex items-center">
              <span className="mr-2">Selected:</span> 
              <span className={`text-mood-${selectedMood} font-semibold`}>{moodLabels[selectedMood]}</span>
            </span>
          </div>
        </motion.div>
      )}
    </div>
  );
}; 