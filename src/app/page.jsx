"use client"
import { useState, useEffect } from "react";
// import { motion } from "framer-motion";
// import {  Moon, SunMoon } from "lucide-react";
import { Hero } from "./components/Hero";
import Testimonials from "./components/Testimonials";
import Features from "./components/Features";

export default function Home() {
  const [darkMode, setDarkMode] = useState(false);
  
  useEffect(() => {
    // Check for system preference
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    setDarkMode(prefersDark);
    
    // Apply the theme
    if (prefersDark) {
      document.documentElement.classList.add('dark');
    }
  }, []);
  
  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    document.documentElement.classList.toggle('dark');
  };
  
  return (
    <div className="min-h-screen bg-gradient-to-b from-indigo-50 to-white dark:from-gray-900 dark:to-gray-800 transition-colors duration-500">
      {/* <nav className="sticky top-0 z-50 backdrop-blur-md bg-white/70 dark:bg-gray-900/70 shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <motion.div 
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="flex-shrink-0"
              >
                <span className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-blue-500">MindMate</span>
              </motion.div>
              <div className="hidden md:block ml-10">
                <div className="flex items-center space-x-6">
                  <a href="#" className="text-gray-700 dark:text-gray-200 hover:text-purple-600 dark:hover:text-purple-400 px-3 py-2 rounded-md text-sm font-medium transition-colors">Home</a>
                  <a href="#" className="text-gray-700 dark:text-gray-200 hover:text-purple-600 dark:hover:text-purple-400 px-3 py-2 rounded-md text-sm font-medium transition-colors">Features</a>
                  <a href="#" className="text-gray-700 dark:text-gray-200 hover:text-purple-600 dark:hover:text-purple-400 px-3 py-2 rounded-md text-sm font-medium transition-colors">Testimonials</a>
                  <a href="#" className="text-gray-700 dark:text-gray-200 hover:text-purple-600 dark:hover:text-purple-400 px-3 py-2 rounded-md text-sm font-medium transition-colors">About</a>
                </div>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <button
                onClick={toggleDarkMode}
                className="p-2 rounded-full text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                aria-label="Toggle dark mode"
              >
                {darkMode ? <Moon size={20} /> : <SunMoon size={20} />}
              </button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-gradient-to-r from-purple-600 to-blue-500 hover:from-purple-700 hover:to-blue-600 text-white px-4 py-2 rounded-lg font-medium shadow-lg hover:shadow-xl transition-all"
              >
                Login
              </motion.button>
            </div>
          </div>
        </div>
      </nav> */}

      <div className="space-y-24 pb-20">
        <Hero />
        <Features />
        <Testimonials />
      </div>
    </div>
  );
}


