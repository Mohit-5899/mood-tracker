import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { format, addMonths, subMonths } from 'date-fns';
import { CalendarDay, MoodData } from '../types';
import { getCalendarDays, moodColors } from '../utils/moodUtils';

interface CalendarProps {
  moodData: MoodData;
  onSelectDate: (date: Date) => void;
  selectedDate: Date;
}

export const Calendar: React.FC<CalendarProps> = ({ moodData, onSelectDate, selectedDate }) => {
  const [currentMonth, setCurrentMonth] = useState<Date>(new Date());
  const [direction, setDirection] = useState<number>(0);
  const calendarDays = getCalendarDays(currentMonth, moodData);

  const nextMonth = () => {
    setDirection(1);
    setCurrentMonth(addMonths(currentMonth, 1));
  };

  const prevMonth = () => {
    setDirection(-1);
    setCurrentMonth(subMonths(currentMonth, 1));
  };

  const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  // Animation variants
  const variants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 200 : -200,
      opacity: 0
    }),
    center: {
      x: 0,
      opacity: 1
    },
    exit: (direction: number) => ({
      x: direction < 0 ? 200 : -200,
      opacity: 0
    })
  };

  return (
    <div className="card my-6 overflow-hidden">
      <div className="flex items-center justify-between mb-4">
        <motion.button
          onClick={prevMonth}
          className="btn btn-outline py-1 px-3"
          aria-label="Previous month"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          &lt;
        </motion.button>
        
        <AnimatePresence mode="wait" custom={direction}>
          <motion.h2
            key={currentMonth.toString()}
            className="text-xl font-semibold"
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.3 }}
          >
            {format(currentMonth, 'MMMM yyyy')}
          </motion.h2>
        </AnimatePresence>
        
        <motion.button
          onClick={nextMonth}
          className="btn btn-outline py-1 px-3"
          aria-label="Next month"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          &gt;
        </motion.button>
      </div>

      <motion.div 
        className="grid grid-cols-7 gap-1 mb-1"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        {daysOfWeek.map((day) => (
          <div
            key={day}
            className="text-center text-sm font-medium text-gray-500 dark:text-gray-400"
          >
            {day}
          </div>
        ))}
      </motion.div>

      <AnimatePresence mode="wait" custom={direction}>
        <motion.div
          key={currentMonth.toString()}
          custom={direction}
          variants={variants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{ duration: 0.3 }}
          className="grid grid-cols-7 gap-1"
        >
          {calendarDays.map((day: CalendarDay, index: number) => {
            const isSelected = day.date.toDateString() === selectedDate.toDateString();
            const moodColor = day.mood ? moodColors[day.mood] : '';
            
            return (
              <motion.button
                key={index}
                whileHover={{ scale: 1.1, zIndex: 10 }}
                whileTap={{ scale: 0.95 }}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ 
                  opacity: day.isCurrentMonth ? 1 : 0.5, 
                  scale: 1,
                  transition: { 
                    delay: index * 0.01,
                    duration: 0.2
                  } 
                }}
                onClick={() => onSelectDate(day.date)}
                className={`
                  relative h-10 w-full rounded-full flex items-center justify-center
                  text-sm font-medium
                  ${!day.isCurrentMonth ? 'text-gray-400 dark:text-gray-600' : ''}
                  ${isSelected ? 'ring-2 ring-primary-500 ring-offset-2 dark:ring-offset-gray-800' : ''}
                  ${day.isToday ? 'font-bold' : ''}
                `}
                disabled={!day.isCurrentMonth}
                aria-label={format(day.date, 'EEEE, MMMM do, yyyy')}
                aria-selected={isSelected}
                aria-current={day.isToday ? 'date' : undefined}
              >
                {moodColor && (
                  <motion.span 
                    className={`absolute inset-1 ${moodColor} opacity-70 rounded-full z-0`}
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 0.3 }}
                    aria-hidden="true"
                  ></motion.span>
                )}
                <span className="z-10 relative">
                  {format(day.date, 'd')}
                </span>
              </motion.button>
            );
          })}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}; 