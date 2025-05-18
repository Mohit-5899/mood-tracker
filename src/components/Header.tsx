import { motion } from 'framer-motion';

export const Header = () => {
  // We can remove the dark mode toggle since we're using a consistent dark theme with 3D elements
  
  return (
    <header className="py-6 relative z-10">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between">
          <motion.div 
            className="flex items-center"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <motion.div
              className="w-14 h-14 mr-4 rounded-xl bg-gradient-to-br from-accent-purple via-primary-600 to-accent-pink flex items-center justify-center shadow-glow-purple overflow-hidden border border-white/10"
              whileHover={{ scale: 1.05, rotate: 5 }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
            >
              <motion.svg 
                xmlns="http://www.w3.org/2000/svg" 
                viewBox="0 0 24 24" 
                fill="white" 
                className="w-8 h-8 drop-shadow-lg"
                animate={{ rotate: [0, 5, 0, -5, 0] }}
                transition={{ 
                  duration: 5, 
                  ease: "easeInOut", 
                  repeat: Infinity,
                  repeatType: "loop"
                }}
              >
                <path d="M13 3C9.23 3 6.19 5.95 6 9.66l-1.92 2.53c-.24.31 0 .81.42.81H6v3c0 1.11.89 2 2 2h1v3h7v-4.69c2.37-1.12 4-3.51 4-6.31 0-3.87-3.13-7-7-7zm0 5c-.55 0-1-.45-1-1s.45-1 1-1 1 .45 1 1-.45 1-1 1zm3 4c-.55 0-1-.45-1-1s.45-1 1-1 1 .45 1 1-.45 1-1 1zm-6 0c-.55 0-1-.45-1-1s.45-1 1-1 1 .45 1 1-.45 1-1 1z" />
              </motion.svg>
            </motion.div>
            
            <div>
              <h1 className="text-4xl font-bold font-display bg-clip-text text-transparent bg-gradient-to-r from-accent-pink via-accent-purple to-accent-blue animate-gradient bg-[length:200%_auto]">
                MoodTracker
              </h1>
              <p className="text-dark-300 text-sm mt-0.5 tracking-wide">Track your emotions • Monitor your well-being</p>
            </div>
          </motion.div>
        </div>
      </div>
    </header>
  );
}; 