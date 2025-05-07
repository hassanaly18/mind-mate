import React from "react";
import Link from "next/link";

const Hero = () => {
  return (
    <section className="text-center py-24">
      <h1 className="text-5xl font-extrabold text-blue-600 dark:text-blue-400">Welcome to MindMate</h1>
      <p className="mt-6 text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
        Your personal AI-powered mental health companion. MindMate is designed
        to help you manage your mental well-being with personalized support and
        resources. Whether you're looking for mindfulness exercises, mood
        tracking, or just someone to talk to, MindMate is here for you.
      </p>
      <div className="mt-8 flex justify-center gap-4">
        <Link className="px-6 py-3 rounded-xl bg-blue-600 text-white hover:bg-blue-800 transition" href={"/"}>Start Journaling</Link>
        <Link className="px-6 py-3 rounded-xl bg-blue-600 text-white hover:bg-blue-800 transition" href={"/"}>Track Mood</Link>
      </div>
    </section>
  );
};

export default Hero;
