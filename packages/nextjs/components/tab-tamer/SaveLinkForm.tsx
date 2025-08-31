"use client";

import React, { useState } from "react";

export type NewLinkPayload = {
  url: string;
  title?: string;
  reminderTime: number;
};

interface SaveLinkFormProps {
  onLinkSaved: (link: NewLinkPayload) => void;
}

export default function SaveLinkForm({ onLinkSaved }: SaveLinkFormProps) {
  const [url, setUrl] = useState("");
  const [title, setTitle] = useState("");
  const [reminderTime, setReminderTime] = useState<string>(() => {
    const defaultDate = new Date(Date.now() + 60 * 60 * 1000);
    return defaultDate.toISOString().slice(0, 16);
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!url.trim()) return;

    const payload: NewLinkPayload = {
      url,
      title: title.trim() || undefined,
      reminderTime: new Date(reminderTime).getTime(),
    };

    onLinkSaved(payload);

    setUrl("");
    setTitle("");
    const nextReminder = new Date(Date.now() + 60 * 60 * 1000);
    setReminderTime(nextReminder.toISOString().slice(0, 16));
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4 bg-base-100 p-6 rounded-xl shadow-md">
      <h2 className="text-lg font-semibold">➕ Add a New Link</h2>

      <input
        type="text"
        placeholder="Optional title"
        value={title}
        onChange={e => setTitle(e.target.value)}
        className="input input-bordered w-full p-3 text-lg rounded-lg"
      />

      <input
        type="url"
        placeholder="Paste your link here..."
        value={url}
        onChange={e => setUrl(e.target.value)}
        required
        className="input input-bordered w-full p-3 text-lg rounded-lg"
      />

      <div className="flex flex-col gap-2">
        <label className="text-sm font-medium">⏰ Reminder Time</label>
        <input
          type="datetime-local"
          value={reminderTime}
          onChange={e => setReminderTime(e.target.value)}
          className="input input-bordered w-full p-3 text-lg rounded-lg"
        />
      </div>

      <button type="submit" className="btn bg-blue-600 hover:bg-blue-700 text-white text-lg py-3 rounded-lg">
        Save Link
      </button>
    </form>
  );
}
