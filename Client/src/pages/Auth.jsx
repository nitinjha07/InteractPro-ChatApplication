import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import apiClient from "@/lib/apiClient";
import { useStore } from "@/store/store";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  Mail,
  Lock,
  Eye,
  EyeOff,
  Github,
  Twitter,
  Loader2,
} from "lucide-react";
import { cn } from "@/lib/utils";

const Auth = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const { setUserInfo } = useStore();
  const navigate = useNavigate();

  const validateSignup = (email, password, confirmPassword) => {
    if (!email) {
      toast.error("Email is required");
      return false;
    }
    if (!password) {
      toast.error("Password is required");
      return false;
    }
    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
      return false;
    }
    return true;
  };

  const validateLogin = (email, password) => {
    if (!email) {
      toast.error("Email is required");
      return false;
    }
    if (!password) {
      toast.error("Password is required");
      return false;
    }
    return true;
  };

const handleSignUp = async () => {
  if (validateSignup(email, password, confirmPassword)) {
    setLoading(true);
    try {
      console.log("Sending request to signup:", { email, password });
      const response = await apiClient.post(
        "api/auth/signup",
        { email, password },
        { withCredentials: true }
      );
      console.log("Signup response:", response);
      if (response.status === 201) {
        setUserInfo(response.data.user);
        toast.success("Account created successfully");
        navigate("/profile");
      }
    } catch (error) {
      console.error("Signup error:", error.response || error);
      toast.error(error.response?.data?.message || "Signup failed");
    } finally {
      setLoading(false);
    }
  }
};


  const handleLogIn = async () => {
    if (validateLogin(email, password)) {
      setLoading(true);
      try {
        const response = await apiClient.post(
          "api/auth/login",
          { email, password },
          { withCredentials: true }
        );
        if (response.data.user?._id) {
          setUserInfo(response.data.user);
          toast.success("Logged in successfully");
          navigate(response.data.user.profileSetup ? "/chat" : "/profile");
        }
      } catch (error) {
        toast.error(error.response?.data?.message || "Login failed");
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen w-full bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 flex items-center justify-center p-4"
    >
      <div className="w-full max-w-6xl h-[600px] flex rounded-2xl overflow-hidden shadow-2xl bg-gray-800/30 backdrop-blur-xl border border-gray-700">
        {/* Left Side - Decorative */}
        <motion.div
          initial={{ x: -100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-800 p-12 flex-col justify-between relative overflow-hidden"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-blue-600/90 via-blue-700/90 to-indigo-800/90 backdrop-blur-sm" />

          <div className="relative z-10">
            <h1 className="text-4xl font-bold text-white mb-6">
              Welcome to ChatApp
            </h1>
            <p className="text-blue-100 text-lg">
              Connect with friends and colleagues in a secure and modern
              environment.
            </p>
          </div>

          <div className="relative z-10">
            <div className="flex flex-col gap-4">
              <div className="flex items-center gap-3 text-blue-100">
                <div className="w-8 h-8 rounded-full bg-blue-500/20 flex items-center justify-center">
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: "linear",
                    }}
                  >
                    ⚡
                  </motion.div>
                </div>
                <p>Real-time messaging</p>
              </div>
              <div className="flex items-center gap-3 text-blue-100">
                <div className="w-8 h-8 rounded-full bg-blue-500/20 flex items-center justify-center">
                  🔒
                </div>
                <p>End-to-end encryption</p>
              </div>
              <div className="flex items-center gap-3 text-blue-100">
                <div className="w-8 h-8 rounded-full bg-blue-500/20 flex items-center justify-center">
                  🌐
                </div>
                <p>Cross-platform support</p>
              </div>
            </div>
          </div>

          {/* Animated Background Elements */}
          <div className="absolute inset-0 opacity-10">
            {[...Array(20)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-16 h-16 border border-white/20 rounded-full"
                animate={{
                  scale: [1, 2, 1],
                  opacity: [0.1, 0.2, 0.1],
                  x: Math.random() * 400 - 200,
                  y: Math.random() * 400 - 200,
                }}
                transition={{
                  duration: Math.random() * 3 + 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                }}
              />
            ))}
          </div>
        </motion.div>

        {/* Right Side - Form */}
        <motion.div
          initial={{ x: 100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="w-full lg:w-1/2 p-8 sm:p-12 flex flex-col justify-center"
        >
          <div className="max-w-md w-full mx-auto space-y-8">
            {/* Auth Toggle */}
            <div className="flex justify-center mb-8">
              <div className="relative bg-gray-800/50 p-1 rounded-xl flex justify-between items-center backdrop-blur-sm border border-gray-700 w-full max-w-xs">
                <motion.div
                  className="absolute top-1 left-1 h-[calc(100%-8px)] bg-blue-600/90 rounded-lg"
                  initial={false}
                  animate={{ x: isLogin ? 0 : "100%" }}
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  style={{ width: "calc(50% - 4px)" }}
                />
                <button
                  onClick={() => setIsLogin(true)}
                  className={cn(
                    "z-10 w-1/2 py-2 text-sm font-medium rounded-lg transition-colors duration-200",
                    isLogin ? "text-white" : "text-gray-400"
                  )}
                >
                  Sign In
                </button>
                <button
                  onClick={() => setIsLogin(false)}
                  className={cn(
                    "z-10 w-1/2 py-2 text-sm font-medium rounded-lg transition-colors duration-200",
                    !isLogin ? "text-white" : "text-gray-400"
                  )}
                >
                  Sign Up
                </button>
              </div>
            </div>

            <div className="space-y-6">
              {/* Email Input */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-300">
                  Email
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <Input
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="pl-10 bg-gray-800/30 border-gray-700 text-gray-200 placeholder-gray-500 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>

              {/* Password Input */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-300">
                  Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <Input
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="pl-10 pr-10 bg-gray-800/30 border-gray-700 text-gray-200 placeholder-gray-500 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-300"
                  >
                    {showPassword ? (
                      <EyeOff className="h-4 w-4" />
                    ) : (
                      <Eye className="h-4 w-4" />
                    )}
                  </button>
                </div>
              </div>

              {/* Confirm Password (Sign Up only) */}
              <AnimatePresence mode="wait">
                {!isLogin && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="space-y-2 overflow-hidden"
                  >
                    <label className="text-sm font-medium text-gray-300">
                      Confirm Password
                    </label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                      <Input
                        type={showPassword ? "text" : "password"}
                        placeholder="Confirm your password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        className="pl-10 bg-gray-800/30 border-gray-700 text-gray-200 placeholder-gray-500 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Submit Button */}
              <Button
                onClick={isLogin ? handleLogIn : handleSignUp}
                disabled={loading}
                className="w-full bg-blue-600 hover:bg-blue-500 text-white py-2 rounded-lg transition-all duration-200 transform hover:translate-y-[-2px] disabled:opacity-50 disabled:hover:transform-none"
              >
                {loading ? (
                  <div className="flex items-center justify-center gap-2">
                    <Loader2 className="h-4 w-4 animate-spin" />
                    <span>
                      {isLogin ? "Signing in..." : "Creating account..."}
                    </span>
                  </div>
                ) : (
                  <span>{isLogin ? "Sign In" : "Create Account"}</span>
                )}
              </Button>

              {/* Divider */}
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-700" />
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-gray-800 text-gray-400">
                    Or continue with
                  </span>
                </div>
              </div>

              {/* Social Logins */}
              <div className="grid grid-cols-2 gap-4">
                <Button
                  variant="outline"
                  className="bg-gray-800/30 border-gray-700 text-gray-300 hover:bg-gray-700/50"
                >
                  <Github className="h-4 w-4 mr-2" />
                  Github
                </Button>
                <Button
                  variant="outline"
                  className="bg-gray-800/30 border-gray-700 text-gray-300 hover:bg-gray-700/50"
                >
                  <Twitter className="h-4 w-4 mr-2" />
                  Twitter
                </Button>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default Auth;
