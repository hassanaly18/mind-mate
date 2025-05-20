// Navbar.jsx
"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { supabase } from "../supabase";
import { Moon, SunMoon, Menu, X, LogOut, LogIn } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const navLinks = [
  { name: "Home", href: "/" },
  { name: "Journal", href: "/journal" },
  { name: "Timeline", href: "/timeline" },
  // { name: "Tracker", href: "/tracker" },
];

const Navbar = () => {
  const [user, setUser] = useState(null);
  const [darkMode, setDarkMode] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    // Check for system preference
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    setDarkMode(prefersDark);
    
    // Get user authentication status
    const getUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      setUser(user);
    };
    getUser();

    // Listen for authentication changes
    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user || null);
    });

    return () => {
      listener.subscription.unsubscribe();
    };
  }, []);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    document.documentElement.classList.toggle('dark');
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setUser(null);
  };

  return (
    <motion.nav 
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="sticky top-0 z-50 backdrop-blur-md bg-white/70 dark:bg-gray-900/70 shadow-md border-b border-gray-200/50 dark:border-gray-800/50"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link href="/" className="flex-shrink-0">
              <span className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-blue-500">MindMate</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-4">
            <div className="flex items-center space-x-6">
              {navLinks.map((link) => (
                <Link 
                  key={link.name} 
                  href={link.href}
                  className="text-gray-700 dark:text-gray-200 hover:text-purple-600 dark:hover:text-purple-400 px-3 py-2 rounded-md text-sm font-medium transition-colors"
                >
                  {link.name}
                </Link>
              ))}
            </div>

            <div className="flex items-center space-x-4 ml-4">
              <button
                onClick={toggleDarkMode}
                className="p-2 rounded-full text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                aria-label="Toggle dark mode"
              >
                {darkMode ? <Moon size={20} /> : <SunMoon size={20} />}
              </button>

              {user ? (
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleLogout}
                  className="flex items-center space-x-1 bg-gradient-to-r from-red-500 to-pink-600 hover:from-red-600 hover:to-pink-700 text-white px-4 py-2 rounded-lg font-medium shadow-md hover:shadow-lg transition-all"
                >
                  <LogOut size={16} />
                  <span>Logout</span>
                </motion.button>
              ) : (
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Link
                    href="/login"
                    className="flex items-center space-x-1 bg-gradient-to-r from-purple-600 to-blue-500 hover:from-purple-700 hover:to-blue-600 text-white px-4 py-2 rounded-lg font-medium shadow-md hover:shadow-lg transition-all"
                  >
                    <LogIn size={16} />
                    <span>Login</span>
                  </Link>
                </motion.div>
              )}
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center space-x-4">
            <button
              onClick={toggleDarkMode}
              className="p-2 rounded-full text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
              aria-label="Toggle dark mode"
            >
              {darkMode ? <Moon size={20} /> : <SunMoon size={20} />}
            </button>
            
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-md text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden overflow-hidden bg-white dark:bg-gray-900 shadow-lg"
          >
            <div className="px-4 py-2 space-y-1">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className="block px-3 py-3 text-gray-700 dark:text-gray-200 hover:text-purple-600 dark:hover:text-purple-400 font-medium transition-colors border-b border-gray-100 dark:border-gray-800"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {link.name}
                </Link>
              ))}
              
              {user ? (
                <button
                  onClick={() => {
                    handleLogout();
                    setMobileMenuOpen(false);
                  }}
                  className="flex items-center space-x-2 w-full px-3 py-3 mt-4 bg-gradient-to-r from-red-500 to-pink-600 text-white rounded-lg font-medium"
                >
                  <LogOut size={16} />
                  <span>Logout</span>
                </button>
              ) : (
                <Link
                  href="/login"
                  className="flex items-center space-x-2 w-full px-3 py-3 mt-4 bg-gradient-to-r from-purple-600 to-blue-500 text-white rounded-lg font-medium"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <LogIn size={16} />
                  <span>Login</span>
                </Link>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navbar;


// "use client"

// import React, { useEffect, useState } from "react";
// import Link from "next/link";
// import { supabase } from "../supabase";

// const navLinks = [
//   { name: "Home", href: "/" },
//   { name: "Journal", href: "/journal" },
//   { name: "Timeline", href: "/timeline" },
//   // { name: "Tracker", href: "/tracker" },
// ];

// const Navbar = () => {
//   const [user, setUser] = useState(null)

//   useEffect(()=>{

//     const getUser = async()=>{
//       const {data:{user}}= await supabase.auth.getUser()
//       setUser(user)
//     }
//     getUser()

//     const{data: listener} = supabase.auth.onAuthStateChange((_event, session)=>{
//       setUser(session?.user || null)
//     })

//     return ()=>{
//       listener.subscription.unsubscribe()
//     }
//   },[])

//   const handleLogout = async()=>{
//     await supabase.auth.signOut();
//     setUser(null)

//   }
//   return (
//     <nav className="w-full border-b dark:bg-gray-800">
//       <div className="max-w-5xl mx-auto px-4 py-4 flex justify-between items-center">
//         <Link className="text-2xl font-bold text-blue-600 dark:text-blue-400" href="/">MindMate</Link>
//         <div className="hidden md:flex space-x-4">
//             {navLinks.map((link)=>(
//                 <Link className="text-md font-medium hover:text-blue-600 transition-colors" key={link.name} href={link.href}>{link.name}</Link>
//             ))}

//             {user ? (
//               <button className="ml-4 px-4 py-1 bg-red-600 text-white rounded hover:bg-red-900 cursor-pointer" onClick={handleLogout}>
//                 Logout
//               </button>
//             ) : (
//               <Link className="ml-4 px-4 py-1 bg-blue-600 text-white rounded hover:bg-blue-900 cursor-pointer" href={"/login"}>
//                 Login
//               </Link>
//             )}
//         </div>
//       </div>

//     </nav>
//   );
// };

// export default Navbar;
