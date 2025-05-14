"use client"

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { supabase } from "../supabase";

const navLinks = [
  { name: "Home", href: "/" },
  { name: "Journal", href: "/journal" },
  { name: "Timeline", href: "/timeline" },
  // { name: "Tracker", href: "/tracker" },
];

const Navbar = () => {
  const [user, setUser] = useState(null)

  useEffect(()=>{

    const getUser = async()=>{
      const {data:{user}}= await supabase.auth.getUser()
      setUser(user)
    }
    getUser()

    const{data: listener} = supabase.auth.onAuthStateChange((_event, session)=>{
      setUser(session?.user || null)
    })

    return ()=>{
      listener.subscription.unsubscribe()
    }
  },[])

  const handleLogout = async()=>{
    await supabase.auth.signOut();
    setUser(null)

  }
  return (
    <nav className="w-full border-b dark:bg-gray-800">
      <div className="max-w-5xl mx-auto px-4 py-4 flex justify-between items-center">
        <Link className="text-2xl font-bold text-blue-600 dark:text-blue-400" href="/">MindMate</Link>
        <div className="hidden md:flex space-x-4">
            {navLinks.map((link)=>(
                <Link className="text-md font-medium hover:text-blue-600 transition-colors" key={link.name} href={link.href}>{link.name}</Link>
            ))}

            {user ? (
              <button className="ml-4 px-4 py-1 bg-red-600 text-white rounded hover:bg-red-900 cursor-pointer" onClick={handleLogout}>
                Logout
              </button>
            ) : (
              <Link className="ml-4 px-4 py-1 bg-blue-600 text-white rounded hover:bg-blue-900 cursor-pointer" href={"/login"}>
                Login
              </Link>
            )}
        </div>
      </div>

    </nav>
  );
};

export default Navbar;
