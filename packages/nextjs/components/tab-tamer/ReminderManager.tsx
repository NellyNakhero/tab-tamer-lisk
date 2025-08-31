"use client";

import React, { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

// Export type for usage in CategoriesManager
export type LinkReminder = {
  linkId: string;
  url: string;
  title?: string;
  reminderTime: number;
  categoryName: string;
};

interface ReminderManagerProps {
  reminders: LinkReminder[];
}

export const ReminderManager: React.FC<ReminderManagerProps> = ({ reminders }) => {
  const [activeReminders, setActiveReminders] = useState<LinkReminder[]>([]);
  const [clongAudio, setClongAudio] = useState<HTMLAudioElement | null>(null);

  // Initialize Audio only on the client
  useEffect(() => {
    setClongAudio(new Audio("/sounds/clong.mp3"));
  }, []);

  // Add new reminders to activeReminders and play sound
  useEffect(() => {
    reminders.forEach(link => {
      if (!activeReminders.find(r => r.linkId === link.linkId)) {
        setActiveReminders(prev => [...prev, link]);
        if (clongAudio) clongAudio.play().catch(err => console.error("Audio play error:", err));
      }
    });
  }, [reminders, activeReminders, clongAudio]);

  // Remove reminder manually
  const removeReminder = (linkId: string) => {
    setActiveReminders(prev => prev.filter(r => r.linkId !== linkId));
  };

  return (
    <div className="fixed bottom-4 right-4 flex flex-col gap-2 z-50">
      <AnimatePresence>
        {activeReminders.map(reminder => (
          <motion.div
            key={reminder.linkId}
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 100 }}
            transition={{ duration: 0.5 }}
            className="bg-red-600 text-white p-4 rounded-lg shadow-lg flex justify-between items-center"
          >
            <motion.div
              className="flex flex-col"
              animate={{
                scale: [1, 1.05, 1],
                opacity: [1, 0.8, 1],
              }}
              transition={{ repeat: Infinity, duration: 1 }}
            >
              <span className="font-bold">⏰ Reminder!</span>
              <span className="text-sm">Category: {reminder.categoryName}</span>
              <a href={reminder.url} target="_blank" rel="noreferrer" className="underline">
                {reminder.title || reminder.url}
              </a>
            </motion.div>
            <button onClick={() => removeReminder(reminder.linkId)} className="ml-4 font-bold hover:text-gray-200">
              ✖
            </button>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
};
