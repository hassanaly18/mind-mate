import React from "react";
import { motion } from "framer-motion";
import { Brain, Shield, SunMoon } from "lucide-react";

// const Features = () => {
//   return (
//     <section className="max-w-6xl mx-auto px-4 py-12">
//       <h2 className="text-3xl font-bold text-center mb-10">
//         What MindMate Offers
//       </h2>
//       <div className="grid md:grid-cols-3 gap-10">
//         <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow">
//           <h3 className="text-xl font-semibold mb-2 text-center">AI-Powered Reflections</h3>
//           <p className="text-gray-600 dark:text-gray-300 text-center">
//             Track your emotions daily and observe your patterns over time.
//             MindMate uses AI to analyze your journal entries and provide
//             personalized insights, helping you understand your emotional
//           </p>
//         </div>
//         <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow">
//           <h3 className="text-xl font-semibold mb-2 text-center">Mood Tracking</h3>
//           <p className="text-gray-600 dark:text-gray-300 text-center">
//             Track your emotions daily and observe your patterns over time.
//             MindMate uses AI to analyze your journal entries and provide 
//           </p>
//         </div>
//         <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow">
//           <h3 className="text-xl font-semibold mb-2 text-center">Private and Secure</h3>
//           <p className="text-gray-600 dark:text-gray-300 text-center">
//             Your data stays yours. Powered by Supabase and protected with user authentication. 
//           </p>
//         </div>
//       </div>
//     </section>
//   );
// };


const Features = () => {
  const features = [
    {
      title: "AI-Powered Reflections",
      description: "Get personalized insights from your journal entries with our advanced AI that helps you understand your emotional patterns and triggers.",
      icon: <Brain className="w-12 h-12 text-purple-500" />,
      delay: 0.2
    },
    {
      title: "Mood Tracking",
      description: "Track your emotions daily and visualize your patterns over time with beautiful, intuitive charts and actionable feedback.",
      icon: <SunMoon className="w-12 h-12 text-blue-500" />,
      delay: 0.4
    },
    {
      title: "Private and Secure",
      description: "Your data stays yours. Powered by advanced encryption and protected with user authentication for complete privacy.",
      icon: <Shield className="w-12 h-12 text-indigo-500" />,
      delay: 0.6
    }
  ];
  
  return (
    <section className="relative py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-blue-500 inline-block">
            What MindMate Offers
          </h2>
          <div className="mt-4 w-24 h-1 bg-gradient-to-r from-purple-600 to-blue-500 mx-auto rounded-full"></div>
        </motion.div>
        
        <div className="grid md:grid-cols-3 gap-8 md:gap-12">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ delay: feature.delay, duration: 0.8 }}
              whileHover={{ y: -5, transition: { duration: 0.3 } }}
              className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300"
            >
              <div className="flex flex-col items-center">
                <div className="p-3 rounded-xl bg-purple-50 dark:bg-purple-900/20 mb-6">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold mb-3 text-gray-800 dark:text-white">
                  {feature.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-300 text-center">
                  {feature.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
