"use client";
import React, { useState } from "react";
import { supabase } from "../supabase";

const AuthPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLogin, setIsLogin] = useState(true);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);

    const authFunction = isLogin
      ? supabase.auth.signInWithPassword
      : supabase.auth.signUp;

    const { data, error } = await authFunction({
      email,
      password,
    });

    // const {data, error} = await supabase.from("journal_entries").select("*");
    // console.log(data)

    if (error) {
      alert(error.message);
    } else {
      alert(isLogin ? "Login successful" : "Signup successful");
    }

    setLoading(false);
  };
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-blue-100 dark:from-gray-900 dark:to-gray-800">
      <div className="bg-white dark:bg-gray-900 p-8 rounded-xl shadow-lg w-full max-w-md">
        <h1 className="text-3xl font-bold text-center text-blue-500 mb-6">
          {isLogin ? "Login" : "Create New Account"}
        </h1>

        <form onSubmit={handleSubmit}>
          <input
            type="email"
            required
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg dark:bg-gray-800 dark:text-white dark:border-gray-700 mb-4"
          />
          <input
            type="password"
            required
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg dark:bg-gray-800 dark:text-white dark:border-gray-700 mb-4"
          />
          <button
            className="w-full py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-900 transition cursor-pointer"
            type="submit"
            disabled={loading}
          >
            {loading ? "Processing...." : isLogin ? "Login" : "Signup"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AuthPage;
