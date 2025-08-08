import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { motion, AnimatePresence } from "framer-motion";

const messages = [
  "Hello, You 👋",
  "Welcome to your dashboard",
  "Manage all your products in one place",
];

export default function Onboarding() {
  const navigate = useNavigate();
  const [step, setStep] = useState(0);

  useEffect(() => {
    if (step < messages.length - 1) {
      const timer = setTimeout(() => setStep((prev) => prev + 1), 2000);
      return () => clearTimeout(timer);
    } else {
      const timer = setTimeout(() => navigate("/"), 3000);
      return () => clearTimeout(timer);
    }
  }, [step, navigate]);

  return (
    <div className="h-screen w-screen bg-black flex flex-col items-center justify-center relative overflow-hidden">
      
      <motion.h1
        initial={{ opacity: 0, scale: 0.7, y: -40 }}
        animate={{ opacity: 1, scale: 1.1, y: 0 }}
        transition={{ duration: 1 }}
        className="text-[64px] sm:text-[80px] font-black tracking-[0.3em] mb-14 text-white font-inter drop-shadow-[0_5px_20px_rgba(255,255,255,0.3)]"
      >
        <span className="text-white">B</span>
        <span className="text-gray-400">E</span>
        <span className="text-white">N</span>
        <span className="text-gray-400">C</span>
        <span className="text-white">H</span>
        <span className="text-gray-400">F</span>
        <span className="text-white">I</span>
        <span className="text-gray-400">V</span>
        <span className="text-white">E</span>
      </motion.h1>

      {/* Animated messages */}
      <AnimatePresence mode="wait">
        <motion.p
          key={step}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.9 }}
          className="text-white text-3xl sm:text-4xl font-semibold text-center px-6"
        >
          {messages[step]}
        </motion.p>
      </AnimatePresence>

      {/* Progress bar */}
      <motion.div
        initial={{ width: 0 }}
        animate={{ width: "100%" }}
        transition={{ duration: 7.5, ease: "linear" }}
        className="absolute bottom-0 left-0 h-1 bg-white"
      />
    </div>
  );
}
