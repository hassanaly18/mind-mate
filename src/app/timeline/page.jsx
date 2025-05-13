"use client";
import React, { useEffect, useState } from "react";
import { supabase } from "../supabase";
import { useRouter } from "next/navigation";

const Timeline = () => {
  const [entries, setEntries] = useState([]);
  const router = useRouter();

  useEffect(() => {
    fetchEntries();
  }, []);

  const fetchEntries = async () => {
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user) {
      alert("Please login first to view your timeline");
      router.push("/login");
    }

    const { data, error } = await supabase
      .from("journal_entries")
      .select("*")
      .eq("user_id", user.id)
      .order("created_at", { ascending: false });
    if (error) {
      alert(error.message);
      return;
    } else {
      setEntries(data || []);
    }
  };
  return (
    <div className="max-w-4xl mx-auto mt-12 px-4 space-y-6">
      <h1 className="text-3xl font-bold text-center text-blue-500 mb-6">
        Your Journal Timeline
      </h1>

      {entries.length === 0 ? (
        <p className="text-center text-gray-500">No entries yet</p>
      ) : (
        <>
          {entries.map((entry) => (
            <div key={entry.id} className="border rounded-md p-4 bg-gray-900 shadow-sm">
              <div className="text-sm text-gray-400">{new Date(entry.created_at).toLocaleString()}</div>
              <div className="mt-2 mb-1 text-lg">
                <p className="text-gray-300">{entry.content}</p>
                <div className="mt-2 italic text-blue-400">AI Reflection: {entry.ai_response}</div>
              </div>
            </div>
          ))}
          </>
      )}
    </div>
  );
};

export default Timeline;
