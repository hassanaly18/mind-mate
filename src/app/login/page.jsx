"use client";
import React, { useState } from "react";
import { supabase } from "../supabase";
import { motion } from "framer-motion";
import { 
  User, 
  Lock, 
  Mail, 
  Eye, 
  EyeOff, 
  LogIn, 
  UserPlus,
  Loader,
  ArrowRight
} from "lucide-react";

const AuthPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLogin, setIsLogin] = useState(true);
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async () => {
    setError("");
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      setError(error.message);
      return false;
    }
    return true;
  };

  const handleSignup = async () => {
    setError("");
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
    });

    if (error) {
      setError(error.message);
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    let success = false;
    if (isLogin) {
      success = await handleLogin();
    } else {
      success = await handleSignup();
    }

    setLoading(false);
    
    if (success && isLogin) {
      // Redirect to journal page or dashboard on successful login
      window.location.href = "/journal";
    }
  };

  const toggleAuthMode = () => {
    setIsLogin(!isLogin);
    setError("");
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-50 to-blue-50 dark:from-gray-900 dark:to-gray-800 p-4"
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.5 }}
        className="max-w-md w-full"
      >
        <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl shadow-xl border border-gray-100 dark:border-gray-700 overflow-hidden">
          <div className="p-8">
            <div className="text-center mb-8">
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.3, duration: 0.5 }}
                className="h-16 w-16 bg-gradient-to-r from-purple-600 to-blue-500 rounded-full mx-auto mb-4 flex items-center justify-center shadow-lg"
              >
                <User className="text-white w-8 h-8" />
              </motion.div>
              <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-blue-500">
                {isLogin ? "Welcome Back" : "Create Account"}
              </h1>
              <p className="text-gray-500 dark:text-gray-400 mt-2">
                {isLogin
                  ? "Sign in to access your journal"
                  : "Join us to start your journaling journey"}
              </p>
            </div>

            {error && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-6 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800/30 text-red-600 dark:text-red-400 p-4 rounded-lg text-sm flex items-start"
              >
                <div className="flex-shrink-0 mr-2 mt-0.5">
                  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                <div>{error}</div>
              </motion.div>
            )}

            <form onSubmit={handleSubmit}>
              <div className="space-y-5">
                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1 ml-1"
                  >
                    Email Address
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Mail className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      id="email"
                      type="email"
                      required
                      placeholder="you@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="pl-10 w-full px-4 py-3 border border-gray-200 dark:border-gray-700 rounded-xl bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-500 dark:focus:ring-purple-600 transition-all duration-300"
                    />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="password"
                    className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1 ml-1"
                  >
                    Password
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Lock className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      required
                      placeholder="••••••••"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="pl-10 w-full px-4 py-3 border border-gray-200 dark:border-gray-700 rounded-xl bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-500 dark:focus:ring-purple-600 transition-all duration-300"
                    />
                    <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 focus:outline-none"
                      >
                        {showPassword ? (
                          <EyeOff className="h-5 w-5" />
                        ) : (
                          <Eye className="h-5 w-5" />
                        )}
                      </button>
                    </div>
                  </div>
                </div>

                {!isLogin && (
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
                    Password must be at least 6 characters long
                  </p>
                )}

                {isLogin && (
                  <div className="text-right">
                    <a
                      href="#"
                      className="text-sm text-purple-600 dark:text-purple-400 hover:text-purple-800 dark:hover:text-purple-300 font-medium"
                    >
                      Forgot password?
                    </a>
                  </div>
                )}

                <motion.button
                  whileHover={{ scale: 1.02, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full flex items-center justify-center py-4 px-4 rounded-xl font-medium shadow-md transition-all bg-gradient-to-r from-purple-600 to-blue-500 hover:from-purple-700 hover:to-blue-600 text-white shadow-lg hover:shadow-xl"
                  type="submit"
                  disabled={loading}
                >
                  {loading ? (
                    <>
                      <Loader className="w-5 h-5 mr-2 animate-spin" />
                      <span>Processing...</span>
                    </>
                  ) : isLogin ? (
                    <>
                      <LogIn className="w-5 h-5 mr-2" />
                      <span>Sign In</span>
                    </>
                  ) : (
                    <>
                      <UserPlus className="w-5 h-5 mr-2" />
                      <span>Create Account</span>
                    </>
                  )}
                </motion.button>
              </div>
            </form>
          </div>

          <div className="px-8 py-4 bg-gray-50 dark:bg-gray-800/30 border-t border-gray-100 dark:border-gray-700">
            <button
              onClick={toggleAuthMode}
              className="w-full text-sm text-center flex items-center justify-center text-gray-700 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400"
            >
              {isLogin ? (
                <>
                  <span>Don't have an account?</span>
                  <span className="ml-1 font-medium text-purple-600 dark:text-purple-400 flex items-center">
                    Sign up <ArrowRight className="w-3 h-3 ml-1" />
                  </span>
                </>
              ) : (
                <>
                  <span>Already have an account?</span>
                  <span className="ml-1 font-medium text-purple-600 dark:text-purple-400 flex items-center">
                    Sign in <ArrowRight className="w-3 h-3 ml-1" />
                  </span>
                </>
              )}
            </button>
          </div>
        </div>
        
        <p className="text-center mt-6 text-sm text-gray-500 dark:text-gray-400">
          By using this service, you agree to our{" "}
          <a href="#" className="text-purple-600 dark:text-purple-400 hover:underline">
            Terms of Service
          </a>{" "}
          and{" "}
          <a href="#" className="text-purple-600 dark:text-purple-400 hover:underline">
            Privacy Policy
          </a>
        </p>
      </motion.div>
    </motion.div>
  );
};

export default AuthPage;



// "use client";
// import React, { useState } from "react";
// import { supabase } from "../supabase";

// const AuthPage = () => {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [isLogin, setIsLogin] = useState(true);
//   const [loading, setLoading] = useState(false);

//   // const handleSubmit = async (e) => {
//   //   e.preventDefault();

//   //   setLoading(true);

//   //   const authFunction = isLogin
//   //     ? supabase.auth.signInWithPassword
//   //     : supabase.auth.signUp;

//   //   const { data, error } = await authFunction({
//   //     email,
//   //     password,
//   //   });

//   //   // const {data, error} = await supabase.from("journal_entries").select("*");
//   //   // console.log(data)

//   //   if (error) {
//   //     alert(error.message);
//   //   } else {
//   //     alert(isLogin ? "Login successful" : "Signup successful");
//   //   }

//   //   setLoading(false);
//   // };

//   const handleLogin=async()=>{
//     const {data, error} = await supabase.auth.signInWithPassword({
//       email,
//       password
//     })

//     if(error){
//       alert(error.message)
//     }
//     else{
//       alert("Login successful")
//     }
//   }

//   const handleSignup = async()=>{
//     const {data, error} = await supabase.auth.signUp({
//       email,
//       password
//     })

//     if(error){
//       alert(error.message)
//     }
//     else{
//       alert("Signup successful, check your email")
//     }
//   }

//   const handleSubmit = async(e)=>{
//     e.preventDefault()
//     setLoading(true)

//     if(isLogin){
//       await handleLogin()
//     }
//     else{
//       await handleSignup()
//     }

//     setLoading(false)
//   }
//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-blue-100 dark:from-gray-900 dark:to-gray-800">
//       <div className="bg-white dark:bg-gray-900 p-8 rounded-xl shadow-lg w-full max-w-md">
//         <h1 className="text-3xl font-bold text-center text-blue-500 mb-6">
//           {isLogin ? "Login" : "Create New Account"}
//         </h1>

//         <form onSubmit={handleSubmit}>
//           <input
//             type="email"
//             required
//             placeholder="Email"
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//             className="w-full px-4 py-3 border border-gray-300 rounded-lg dark:bg-gray-800 dark:text-white dark:border-gray-700 mb-4"
//           />
//           <input
//             type="password"
//             required
//             placeholder="Password"
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//             className="w-full px-4 py-3 border border-gray-300 rounded-lg dark:bg-gray-800 dark:text-white dark:border-gray-700 mb-4"
//           />
//           <button
//             className="w-full py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-900 transition cursor-pointer"
//             type="submit"
//             disabled={loading}
//           >
//             {loading ? "Processing...." : isLogin ? "Login" : "Signup"}
//           </button>
//           <p className="text-sm text-center text-gray-600 mt-4 cursor-pointer hover:underline" onClick={()=>setIsLogin(!isLogin)}>
//             {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
//           </p>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default AuthPage;
