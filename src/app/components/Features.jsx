import React from "react";

const Features = () => {
  return (
    <section className="max-w-6xl mx-auto px-4 py-12">
      <h2 className="text-3xl font-bold text-center mb-10">
        What MindMate Offers
      </h2>
      <div className="grid md:grid-cols-3 gap-10">
        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow">
          <h3 className="text-xl font-semibold mb-2 text-center">AI-Powered Reflections</h3>
          <p className="text-gray-600 dark:text-gray-300 text-center">
            Track your emotions daily and observe your patterns over time.
            MindMate uses AI to analyze your journal entries and provide
            personalized insights, helping you understand your emotional
          </p>
        </div>
        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow">
          <h3 className="text-xl font-semibold mb-2 text-center">Mood Tracking</h3>
          <p className="text-gray-600 dark:text-gray-300 text-center">
            Track your emotions daily and observe your patterns over time.
            MindMate uses AI to analyze your journal entries and provide 
          </p>
        </div>
        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow">
          <h3 className="text-xl font-semibold mb-2 text-center">Private and Secure</h3>
          <p className="text-gray-600 dark:text-gray-300 text-center">
            Your data stays yours. Powered by Supabase and protected with user authentication. 
          </p>
        </div>
      </div>
    </section>
  );
};

export default Features;
