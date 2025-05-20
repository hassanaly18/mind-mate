"use client";
import React, { useEffect, useState } from "react";
import { supabase } from "../supabase";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { 
  ClockIcon, 
  ChevronDown, 
  ChevronUp, 
  CalendarDays, 
  Bookmark,
  Trash2,
  RefreshCw,
  FilterIcon
} from "lucide-react";

const Timeline = () => {
  const [entries, setEntries] = useState([]);
  const [expandedEntry, setExpandedEntry] = useState({});
  const [loading, setLoading] = useState(true);
  const [filterMood, setFilterMood] = useState("All");
  const router = useRouter();
  
  useEffect(() => {
    fetchEntries();
  }, []);

  const fetchEntries = async () => {
    setLoading(true);
    const {
      data: { user },
    } = await supabase.auth.getUser();
    
    if (!user) {
      router.push("/login");
      return;
    }

    let query = supabase
      .from("journal_entries")
      .select("*")
      .eq("user_id", user.id)
      .order("created_at", { ascending: false });
    
    if (filterMood !== "All") {
      query = query.eq("mood", filterMood);
    }
    
    const { data, error } = await query;
    
    if (error) {
      console.error("Error fetching entries:", error.message);
    } else {
      setEntries(data || []);
    }
    setLoading(false);
  };

  const toggleExpand = (id) => {
    setExpandedEntry((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const truncateText = (text, maxLines = 3) => {
    if (!text) return "";
    const lines = text.split("\n");
    return lines.length <= maxLines
      ? text
      : lines.slice(0, maxLines).join("\n") + "...";
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getMoodColor = (mood) => {
    switch(mood) {
      case 'Happy':
        return 'from-yellow-400 to-yellow-300 border-yellow-300';
      case 'Sad':
        return 'from-blue-400 to-blue-300 border-blue-300';
      case 'Angry':
        return 'from-red-400 to-red-300 border-red-300';
      case 'Neutral':
        return 'from-gray-400 to-gray-300 border-gray-300';
      default:
        return 'from-purple-400 to-purple-300 border-purple-300';
    }
  };

  const getMoodEmoji = (mood) => {
    switch(mood) {
      case 'Happy':
        return '😊';
      case 'Sad':
        return '😢';
      case 'Angry':
        return '😠';
      case 'Neutral':
        return '😐';
      default:
        return '🤔';
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
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="flex items-center justify-between mb-8"
        >
          <div>
            <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-blue-500 flex items-center">
              <ClockIcon className="mr-3 w-7 h-7" />
              Journal Timeline
            </h1>
            <p className="text-gray-500 dark:text-gray-400 mt-2">
              Your journey of thoughts and reflections
            </p>
          </div>
          
          <motion.div 
            className="flex items-center space-x-2"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
          >
            <div className="flex space-x-2">
              <div className="relative">
                <div className="flex items-center space-x-2 bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg px-3 py-2 shadow-sm">
                  <FilterIcon className="w-4 h-4 text-gray-500" />
                  <select
                    value={filterMood}
                    onChange={(e) => {
                      setFilterMood(e.target.value);
                      setTimeout(() => fetchEntries(), 100);
                    }}
                    className="appearance-none bg-transparent border-none outline-none focus:ring-0 text-gray-700 dark:text-gray-200 pr-8"
                  >
                    <option value="All">All Moods</option>
                    <option value="Happy">Happy</option>
                    <option value="Sad">Sad</option>
                    <option value="Angry">Angry</option>
                    <option value="Neutral">Neutral</option>
                  </select>
                </div>
              </div>
              
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={fetchEntries}
                className="bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg p-2 shadow-sm hover:shadow"
              >
                <RefreshCw className="w-5 h-5 text-purple-500" />
              </motion.button>
            </div>
          </motion.div>
        </motion.div>

        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500"></div>
          </div>
        ) : entries.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.5 }}
            className="text-center py-16 bg-gray-50 dark:bg-gray-900/50 rounded-xl border border-dashed border-gray-300 dark:border-gray-700"
          >
            <div className="text-6xl mb-4">📝</div>
            <h3 className="text-xl font-semibold text-gray-700 dark:text-gray-300 mb-2">No Journal Entries Yet</h3>
            <p className="text-gray-500 dark:text-gray-400 mb-6">Start journaling to see your entries here</p>
            <motion.button
              whileHover={{ scale: 1.02, y: -2 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => router.push("/journal")}
              className="bg-gradient-to-r from-purple-600 to-blue-500 hover:from-purple-700 hover:to-blue-600 text-white py-3 px-6 rounded-xl font-medium shadow-lg hover:shadow-xl transition-all"
            >
              Create First Entry
            </motion.button>
          </motion.div>
        ) : (
          <div className="space-y-6">
            {entries.map((entry, index) => (
              <motion.div
                key={entry.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 + index * 0.1, duration: 0.5 }}
                className={`bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm hover:shadow-md transition-shadow overflow-hidden`}
              >
                <div className="border-l-4 relative bg-gradient-to-r from-white/80 to-gray-50 dark:from-gray-900/80 dark:to-gray-800/50 border-l-purple-500">
                  <div className="p-5">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center space-x-2">
                        <CalendarDays className="w-4 h-4 text-gray-500 dark:text-gray-400" />
                        <span className="text-sm text-gray-500 dark:text-gray-400">
                          {formatDate(entry.created_at)}
                        </span>
                      </div>
                      <div className={`px-3 py-1 rounded-full text-xs font-medium flex items-center bg-gradient-to-r ${getMoodColor(entry.mood)} text-white`}>
                        <span className="mr-1">{getMoodEmoji(entry.mood)}</span>
                        {entry.mood}
                      </div>
                    </div>

                    <div className="prose dark:prose-invert max-w-none">
                      <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200">
                        Journal Entry
                      </h3>
                      <div className="bg-gray-50 dark:bg-gray-800/50 rounded-lg p-4 border border-gray-100 dark:border-gray-700 mb-4">
                        <p className="text-gray-700 dark:text-gray-300 whitespace-pre-line">
                          {entry.content}
                        </p>
                      </div>

                      <h4 className="text-lg font-medium text-purple-600 dark:text-purple-400 flex items-center">
                        <div className="h-6 w-6 rounded-full bg-gradient-to-r from-purple-600 to-blue-500 flex items-center justify-center mr-2 shadow-sm">
                          <span className="text-white text-xs font-bold">AI</span>
                        </div>
                        MindMate's Reflection
                      </h4>
                      
                      <div className="bg-gradient-to-r from-purple-50 to-blue-50 dark:from-purple-900/20 dark:to-blue-900/20 p-4 rounded-lg border border-purple-100 dark:border-purple-800/30">
                        <p className="text-gray-700 dark:text-gray-300 whitespace-pre-line">
                          {expandedEntry[entry.id]
                            ? entry.ai_response
                            : truncateText(entry.ai_response)}
                        </p>
                        
                        {entry.ai_response && entry.ai_response.split("\n").length > 3 && (
                          <button
                            onClick={() => toggleExpand(entry.id)}
                            className="mt-2 text-sm flex items-center space-x-1 text-purple-600 dark:text-purple-400 hover:text-purple-800 dark:hover:text-purple-300 font-medium"
                          >
                            {expandedEntry[entry.id] ? (
                              <>
                                <span>View Less</span>
                                <ChevronUp className="w-4 h-4" />
                              </>
                            ) : (
                              <>
                                <span>View More</span>
                                <ChevronDown className="w-4 h-4" />
                              </>
                            )}
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex justify-end px-5 py-3 bg-gray-50 dark:bg-gray-800/30 border-t border-gray-100 dark:border-gray-700">
                    <div className="flex space-x-2">
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="flex items-center space-x-1 px-3 py-1 rounded-md text-sm text-purple-600 dark:text-purple-400 hover:bg-purple-50 dark:hover:bg-purple-900/20"
                      >
                        <Bookmark className="w-4 h-4" />
                        <span>Save</span>
                      </motion.button>
                      
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="flex items-center space-x-1 px-3 py-1 rounded-md text-sm text-red-500 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20"
                      >
                        <Trash2 className="w-4 h-4" />
                        <span>Delete</span>
                      </motion.button>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
        
        {entries.length > 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.5 }}
            className="mt-8 flex justify-center"
          >
            <motion.button
              whileHover={{ scale: 1.02, y: -2 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => router.push("/journal")}
              className="bg-gradient-to-r from-purple-600 to-blue-500 hover:from-purple-700 hover:to-blue-600 text-white py-3 px-6 rounded-xl font-medium shadow-lg hover:shadow-xl transition-all"
            >
              Create New Entry
            </motion.button>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
};

export default Timeline;


// "use client";
// import React, { useEffect, useState } from "react";
// import { supabase } from "../supabase";
// import { useRouter } from "next/navigation";

// const Timeline = () => {
//   const [entries, setEntries] = useState([]);
//   const [expandedEntry, setExpandedEntry] = useState({})
//   const router = useRouter();

//   useEffect(() => {
//     fetchEntries();
//   }, []);

//   const fetchEntries = async () => {
//     const {
//       data: { user },
//     } = await supabase.auth.getUser();
//     if (!user) {
//       alert("Please login first to view your timeline");
//       router.push("/login");
//     }

//     const { data, error } = await supabase
//       .from("journal_entries")
//       .select("*")
//       .eq("user_id", user.id)
//       .order("created_at", { ascending: false });
//     if (error) {
//       alert(error.message);
//       return;
//     } else {
//       setEntries(data || []);
//     }
//   };

//   const toggleExpand = (id)=>{
//     setExpandedEntry((prev)=>({
//       ...prev,
//       [id]: !prev[id]
//     }))
//   }

//   const truncateText = (text, maxLines=1)=>{
//     const lines = text.split("\n")
//     return lines.length <= maxLines ? text:lines.slice(0, maxLines).join("\n") + "..."
//   }

//   return (
//     <div className="max-w-4xl mx-auto mt-12 px-4 space-y-6">
//       <h1 className="text-3xl font-bold text-center text-blue-500 mb-6">
//         Your Journal Timeline
//       </h1>

//       {entries.length === 0 ? (
//         <p className="text-center text-gray-500">No entries yet</p>
//       ) : (
//         <>
//           {entries.map((entry) => (
//             <div key={entry.id} className="border rounded-md p-4 bg-gray-900 shadow-sm">
//               <div className="text-sm text-gray-400">{new Date(entry.created_at).toLocaleString()}</div>
//               <div className="mt-2 mb-1 text-lg">
//                 <p className="text-gray-300">{entry.content}</p>
//                 <div className="mt-2 italic text-blue-400">AI Reflection: {expandedEntry[entry.id] ? entry.ai_response : truncateText(entry.ai_response)}</div>
//                 {entry.ai_response.split("\n").length >3 && (
//                   <button className="text-sm text-blue-300 hover:underline mt-1 cursor-pointer" onClick={()=>toggleExpand(entry.id)}>
//                     {expandedEntry[entry.id] ? "View Less" : "View More"}
//                   </button>
//                 )}
//               </div>
//             </div>
//           ))}
//           </>
//       )}
//     </div>
//   );
// };

// export default Timeline;
