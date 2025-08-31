"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

interface MarkAsReadFormProps {
  linkId: string;
  onReward?: (coins: number) => void;
}

export default function MarkAsReadForm({ onReward }: MarkAsReadFormProps) {
  const [justEarned, setJustEarned] = useState<number | null>(null);
  const [disabled, setDisabled] = useState(false);

  const handleMarkRead = () => {
    if (disabled) return;

    const reward = 10; // fixed coins reward

    setDisabled(true); // disable button after click
    setJustEarned(reward); // trigger local animation

    if (onReward) onReward(reward); // notify parent

    // Reset animation after 1.5s
    setTimeout(() => setJustEarned(null), 1500);
  };

  return (
    <div className="flex items-center gap-2">
      <button
        onClick={handleMarkRead}
        disabled={disabled}
        className={`px-4 py-2 rounded-lg font-medium shadow ${
          disabled ? "bg-gray-400 cursor-not-allowed" : "bg-pink-500 hover:bg-pink-600 text-white"
        }`}
      >
        {disabled ? "✅ Already Read" : "💖 Swear I read it"}
      </button>

      <AnimatePresence>
        {justEarned && justEarned > 0 && (
          <motion.span
            key="reward"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4 }}
            className="text-yellow-400 font-bold"
          >
            +{justEarned} 🪙
          </motion.span>
        )}
      </AnimatePresence>
    </div>
  );
}
