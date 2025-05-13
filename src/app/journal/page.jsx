"use client";
import React, { useState } from "react";
import { supabase } from "../supabase";

const Journal = () => {
  const [entry, setEntry] = useState("");
  const [mood, setMood] = useState("Happy");
  const [aiResponse, setAiResponse] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    setLoading(true);

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

    setLoading(false);
  };
  return (
    <div className="max-w-3xl mx-auto mt-12 px-4 space-y-6">
      <h1 className="text-3xl font-bold text-center text-blue-500 mb-6">
        New Journal Entry
      </h1>
      <textarea
        className="w-full  p-4 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        rows={5}
        placeholder="Write about your day..."
        value={entry}
        onChange={(e) => setEntry(e.target.value)}
      />
      <div className="flex justify-between items-center">
        <label htmlFor="mood">Mood: </label>
        <select
          value={mood}
          id="mood"
          onChange={(e) => setMood(e.target.value)}
          className="p-2 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option className="bg-gray-800" value="Happy">Happy</option>
          <option className="bg-gray-800" value="Sad">Sad</option>
          <option className="bg-gray-800" value="Angry">Angry</option>
          <option className="bg-gray-800" value="Neutrl">Neutral</option>
        </select>
      </div>

      <button className="w-full bg-blue-600 text-white py-3 rounded-md hover:bg-blue-900 transition cursor-pointer " onClick={handleSubmit} disabled={loading || !entry}>
        {loading ? "Generating Response..." : "Generate Response"}
      </button>

      {aiResponse && (
        <div className="mt-6 bg-blue-50 dark:bg-gray-800 p-4 rounded border-l-4 border-blue-400">
          <p className="text-blue-700 dark:text-blue-300 italic">{aiResponse}</p>
        </div>
      )}
    </div>
  );
};

export default Journal;
