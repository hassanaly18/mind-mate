"use client";
import React, { useState, useEffect } from "react";
import { supabase } from "../supabase";
import { motion } from "framer-motion";
import { 
  BookOpen, 
  Send, 
  Loader, 
  Smile, 
  Frown, 
  Angry, 
  Meh,
  Calendar,
  ArrowRight
} from "lucide-react";

const Journal = () => {
  const [entry, setEntry] = useState("");
  const [mood, setMood] = useState("Happy");
  const [aiResponse, setAiResponse] = useState("");
  const [loading, setLoading] = useState(false);
  const [charCount, setCharCount] = useState(0);
  const [date, setDate] = useState("");

  useEffect(() => {
    // Set today's date in a nice format
    const today = new Date();
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    setDate(today.toLocaleDateString('en-US', options));
    
    // Add autofocus to the textarea
    const textarea = document.getElementById('journal-entry');
    if (textarea) textarea.focus();
  }, []);

  // Update character count when entry changes
  useEffect(() => {
    setCharCount(entry.length);
  }, [entry]);

  const handleSubmit = async () => {
    if (!entry.trim()) return;
    
    setLoading(true);

    try {
      const res = await fetch("/api/reflect", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ entry }),
      });

      const { reflection } = await res.json();
      setAiResponse(reflection);

      const {
        data: { user },
      } = await supabase.auth.getUser();
      
      if (user) {
        await supabase.from("journal_entries").insert({
          user_id: user.id,
          content: entry,
          mood,
          ai_response: reflection,
        });
      }
    } catch (error) {
      console.error("Error generating reflection:", error);
    } finally {
      setLoading(false);
    }
  };

  // Get appropriate icon based on mood
  const getMoodIcon = () => {
    switch(mood) {
      case 'Happy':
        return <Smile className="w-5 h-5 text-yellow-500" />;
      case 'Sad':
        return <Frown className="w-5 h-5 text-blue-500" />;
      case 'Angry':
        return <Angry className="w-5 h-5 text-red-500" />;
      case 'Neutral':
        return <Meh className="w-5 h-5 text-gray-500" />;
      default:
        return <Smile className="w-5 h-5 text-yellow-500" />;
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="max-w-4xl mx-auto my-8 px-4"
    >
      <div className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm rounded-2xl shadow-xl p-6 md:p-8 border border-gray-100 dark:border-gray-700">
        <div className="flex items-center justify-between mb-8">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-blue-500 flex items-center">
              <BookOpen className="mr-3 w-7 h-7" />
              Today's Journal
            </h1>
            <div className="mt-2 flex items-center text-gray-500 dark:text-gray-400 text-sm">
              <Calendar className="w-4 h-4 mr-1" />
              <span>{date}</span>
            </div>
          </motion.div>
          
          <motion.div 
            className="flex items-center space-x-2"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
          >
            <span className="text-gray-600 dark:text-gray-300 text-sm mr-2">Current Mood:</span>
            <div className="relative">
              <div className="flex items-center space-x-2 bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg px-3 py-2 shadow-sm">
                {getMoodIcon()}
                <select
                  value={mood}
                  id="mood"
                  onChange={(e) => setMood(e.target.value)}
                  className="appearance-none bg-transparent border-none outline-none focus:ring-0 text-gray-700 dark:text-gray-200 pr-8"
                >
                  <option value="Happy">Happy</option>
                  <option value="Sad">Sad</option>
                  <option value="Angry">Angry</option>
                  <option value="Neutral">Neutral</option>
                </select>
                <ArrowRight className="w-4 h-4 text-gray-400 absolute right-3 pointer-events-none" />
              </div>
            </div>
          </motion.div>
        </div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.5 }}
          className="mb-6"
        >
          <div className="relative">
            <textarea
              id="journal-entry"
              className="w-full p-5 border border-gray-200 dark:border-gray-700 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500 dark:focus:ring-purple-600 bg-white dark:bg-gray-900 text-gray-700 dark:text-gray-200 transition-all duration-300 text-lg min-h-[200px]"
              rows={8}
              placeholder="Write about your day, thoughts, feelings, or anything on your mind..."
              value={entry}
              onChange={(e) => setEntry(e.target.value)}
            />
            <div className="absolute bottom-3 right-3 text-xs text-gray-500 dark:text-gray-400">
              {charCount} characters
            </div>
          </div>
          
          <div className="flex justify-end mt-2">
            <p className="text-xs text-gray-500 dark:text-gray-400 italic">
              Your entry is private and secure.
            </p>
          </div>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.5 }}
        >
          <motion.button
            whileHover={{ scale: 1.02, y: -2 }}
            whileTap={{ scale: 0.98 }}
            className={`w-full flex items-center justify-center py-4 rounded-xl font-medium shadow-md transition-all ${
              !entry.trim() ? 
              "bg-gray-300 dark:bg-gray-700 text-gray-500 dark:text-gray-400 cursor-not-allowed" : 
              "bg-gradient-to-r from-purple-600 to-blue-500 hover:from-purple-700 hover:to-blue-600 text-white shadow-lg hover:shadow-xl"
            }`}
            onClick={handleSubmit}
            disabled={loading || !entry.trim()}
          >
            {loading ? (
              <>
                <Loader className="w-5 h-5 mr-2 animate-spin" />
                <span>Generating Reflection...</span>
              </>
            ) : (
              <>
                <Send className="w-5 h-5 mr-2" />
                <span>Get AI Reflection</span>
              </>
            )}
          </motion.button>
        </motion.div>

        {aiResponse && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mt-10"
          >
            <div className="flex items-center mb-4">
              <div className="h-8 w-8 rounded-full bg-gradient-to-r from-purple-600 to-blue-500 flex items-center justify-center mr-3 shadow-md">
                <span className="text-white font-bold">AI</span>
              </div>
              <h3 className="text-xl font-semibold bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-blue-500">
                MindMate's Reflection
              </h3>
            </div>
            
            <div className="bg-gradient-to-r from-purple-50 to-blue-50 dark:from-purple-900/20 dark:to-blue-900/20 p-6 rounded-xl border border-purple-100 dark:border-purple-800/30 shadow-md">
              <p className="text-gray-700 dark:text-gray-200 leading-relaxed">{aiResponse}</p>
            </div>
            
            <div className="mt-6 flex justify-end">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="text-sm flex items-center space-x-1 text-purple-600 dark:text-purple-400 hover:text-purple-800 dark:hover:text-purple-300"
              >
                <span>Save to Favorites</span>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path>
                </svg>
              </motion.button>
            </div>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
};

export default Journal;

// "use client";
// import React, { useState } from "react";
// import { supabase } from "../supabase";

// const Journal = () => {
//   const [entry, setEntry] = useState("");
//   const [mood, setMood] = useState("Happy");
//   const [aiResponse, setAiResponse] = useState("");
//   const [loading, setLoading] = useState(false);

//   const handleSubmit = async () => {
//     setLoading(true);

//     const res = await fetch("/api/reflect", {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify({ entry }),
//     });

//     const { reflection } = await res.json();
//     setAiResponse(reflection);

//     const {
//       data: { user },
//     } = await supabase.auth.getUser();
//     if (user) {
//       await supabase.from("journal_entries").insert({
//         user_id: user.id,
//         content: entry,
//         mood,
//         ai_response: reflection,
//       });
//     }

//     setLoading(false);
//   };
//   return (
//     <div className="max-w-3xl mx-auto mt-12 px-4 space-y-6">
//       <h1 className="text-3xl font-bold text-center text-blue-500 mb-6">
//         New Journal Entry
//       </h1>
//       <textarea
//         className="w-full  p-4 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
//         rows={5}
//         placeholder="Write about your day..."
//         value={entry}
//         onChange={(e) => setEntry(e.target.value)}
//       />
//       <div className="flex justify-between items-center">
//         <label htmlFor="mood">Mood: </label>
//         <select
//           value={mood}
//           id="mood"
//           onChange={(e) => setMood(e.target.value)}
//           className="p-2 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
//         >
//           <option className="bg-gray-800" value="Happy">Happy</option>
//           <option className="bg-gray-800" value="Sad">Sad</option>
//           <option className="bg-gray-800" value="Angry">Angry</option>
//           <option className="bg-gray-800" value="Neutrl">Neutral</option>
//         </select>
//       </div>

//       <button className="w-full bg-blue-600 text-white py-3 rounded-md hover:bg-blue-900 transition cursor-pointer " onClick={handleSubmit} disabled={loading || !entry}>
//         {loading ? "Generating Response..." : "Generate Response"}
//       </button>

//       {aiResponse && (
//         <div className="mt-6 bg-blue-50 dark:bg-gray-800 p-4 rounded border-l-4 border-blue-400">
//           <p className="text-blue-700 dark:text-blue-300 italic">{aiResponse}</p>
//         </div>
//       )}
//     </div>
//   );
// };

// export default Journal;
