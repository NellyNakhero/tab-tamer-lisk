"use client";

import React, { useState } from "react";

export type NewLinkPayload = {
  url: string;
  title?: string;
  reminderTime: number; // ms since epoch
};

type SaveLinkFormProps = {
  onLinkSaved: (link: NewLinkPayload) => void;
};

const SaveLinkForm: React.FC<SaveLinkFormProps> = ({ onLinkSaved }) => {
  const [url, setUrl] = useState("");
  const [title, setTitle] = useState("");
  const [reminderTime, setReminderTime] = useState<string>(() => {
    // Default reminder: 1 hour from now
    const defaultDate = new Date(Date.now() + 60 * 60 * 1000);
    return defaultDate.toISOString().slice(0, 16); // "yyyy-MM-ddTHH:mm"
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!url.trim()) return;

    const newLink: NewLinkPayload = {
      url: url.trim(),
      title: title.trim() || undefined,
      reminderTime: new Date(reminderTime).getTime(), // ms since epoch
    };

    onLinkSaved(newLink);

    // Reset form
    setUrl("");
    setTitle("");
    const nextReminder = new Date(Date.now() + 60 * 60 * 1000);
    setReminderTime(nextReminder.toISOString().slice(0, 16));
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-3 bg-gray-900 p-4 rounded-lg shadow-md">
      <h3 className="font-semibold text-lg text-white">➕ Add Link</h3>

      <input
        type="text"
        placeholder="Optional title"
        value={title}
        onChange={e => setTitle(e.target.value)}
        className="p-2 rounded-lg border border-gray-700 bg-gray-800 text-white placeholder-gray-400"
      />

      <input
        type="url"
        placeholder="Link URL"
        value={url}
        onChange={e => setUrl(e.target.value)}
        required
        className="p-2 rounded-lg border border-gray-700 bg-gray-800 text-white placeholder-gray-400"
      />

      <div className="flex flex-col gap-1">
        <label className="text-xs text-gray-400">⏰ Reminder</label>
        <input
          type="datetime-local"
          value={reminderTime}
          onChange={e => setReminderTime(e.target.value)}
          className="p-2 rounded-lg border border-gray-700 bg-gray-800 text-white"
        />
      </div>

      <button
        type="submit"
        className="mt-2 bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 rounded-lg shadow transition-colors"
      >
        Save Link
      </button>
    </form>
  );
};

export default SaveLinkForm;
