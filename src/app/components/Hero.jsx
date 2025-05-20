import React from "react";
import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";


export const Hero = () => {
  return (
    <section className="relative pt-16 pb-20 overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-purple-300/30 dark:bg-purple-900/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/3 right-1/3 w-80 h-80 bg-blue-300/20 dark:bg-blue-900/20 rounded-full blur-3xl"></div>
      </div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="relative inline-block"
          >
            <h1 className="text-5xl md:text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-blue-500 inline-block">
              Welcome to MindMate
            </h1>
            <motion.div 
              animate={{ 
                rotate: [0, 10, -10, 10, 0],
                y: [0, -3, 3, -3, 0] 
              }}
              transition={{ 
                repeat: Infinity, 
                repeatType: "reverse", 
                duration: 5,
                ease: "easeInOut"
              }}
              className="absolute -top-6 -right-8 text-3xl"
            >
              ✨
            </motion.div>
          </motion.div>
          
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            className="mt-6 text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed"
          >
            Your personal AI-powered mental health companion, designed to help you 
            navigate your emotional journey with personalized support and insights.
            Start your path to better mental well-being today.
          </motion.p>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9, duration: 0.8 }}
            className="mt-10 flex flex-col sm:flex-row justify-center gap-4"
          >
            <motion.a 
              whileHover={{ scale: 1.05, y: -3 }}
              whileTap={{ scale: 0.95 }}
              href="/"
              className="px-8 py-4 rounded-xl bg-gradient-to-r from-purple-600 to-blue-500 text-white font-medium shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-2"
            >
              <Sparkles size={20} /> 
              <span>Start Journaling</span>
            </motion.a>
            <motion.a 
              whileHover={{ scale: 1.05, y: -3 }}
              whileTap={{ scale: 0.95 }}
              href="/"
              className="px-8 py-4 rounded-xl bg-white dark:bg-gray-800 text-gray-800 dark:text-white ring-1 ring-purple-200 dark:ring-purple-900 font-medium shadow-md hover:shadow-lg transition-all"
            >
              Track Mood
            </motion.a>
          </motion.div>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2, duration: 0.8 }}
          className="mt-16 relative"
        >
          <div className="relative mx-auto w-full max-w-4xl h-64 md:h-96 rounded-2xl overflow-hidden shadow-2xl">
            <div className="absolute inset-0 bg-gradient-to-br from-purple-500/90 to-blue-600/90 flex items-center justify-center">
              <motion.div
                animate={{ 
                  y: [0, -10, 0],
                  opacity: [0.8, 1, 0.8]
                }}
                transition={{ 
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
                className="text-white text-center px-4"
              >
                <h3 className="text-2xl md:text-3xl font-bold mb-4">Transform Your Mental Health Journey</h3>
                <p className="max-w-2xl mx-auto text-white/90">
                  Journal your thoughts, track your moods, and receive AI-powered insights to help you understand your emotional patterns.
                </p>
              </motion.div>
            </div>
          </div>
          
          <div className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 w-3/4 h-8 bg-black/10 dark:bg-black/30 blur-xl rounded-full"></div>
        </motion.div>
      </div>
    </section>
  );
};


// const Hero = () => {
//   return (
//     <section className="text-center py-24">
//       <h1 className="text-5xl font-extrabold text-blue-600 dark:text-blue-400">Welcome to MindMate</h1>
//       <p className="mt-6 text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
//         Your personal AI-powered mental health companion. MindMate is designed
//         to help you manage your mental well-being with personalized support and
//         resources. Whether you're looking for mindfulness exercises, mood
//         tracking, or just someone to talk to, MindMate is here for you.
//       </p>
//       <div className="mt-8 flex justify-center gap-4">
//         <Link className="px-6 py-3 rounded-xl bg-blue-600 text-white hover:bg-blue-800 transition" href={"/"}>Start Journaling</Link>
//         <Link className="px-6 py-3 rounded-xl bg-blue-600 text-white hover:bg-blue-800 transition" href={"/"}>Track Mood</Link>
//       </div>
//     </section>
//   );
// };

// export default Hero;
