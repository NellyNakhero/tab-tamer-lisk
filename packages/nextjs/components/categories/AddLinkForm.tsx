// // packages/nextjs/components/categories/AddLinkForm.tsx
// "use client";

// import React, { useState } from "react";

// export type NewLinkPayload = {
//   url: string;
//   reminderTime: number; // ms since epoch
//   title?: string;
// };

// type Props = {
//   onLinkSaved: (payload: NewLinkPayload) => void;
// };

// export default function AddLinkForm({ onLinkSaved }: Props) {
//   const [url, setUrl] = useState("");
//   const [title, setTitle] = useState("");
//   const [reminderStr, setReminderStr] = useState<string>(() => {
//     // default 1 hour from now in yyyy-MM-ddThh:mm format
//     const d = new Date(Date.now() + 60 * 60 * 1000);
//     return d.toISOString().slice(0, 16);
//   });

//   const handleSubmit = (e: React.FormEvent) => {
//     e.preventDefault();
//     if (!url.trim()) return;

//     const payload: NewLinkPayload = {
//       url: url.trim(),
//       title: title.trim() || undefined,
//       reminderTime: new Date(reminderStr).getTime(),
//     };

//     onLinkSaved(payload);

//     // reset fields
//     setUrl("");
//     setTitle("");
//     const next = new Date(Date.now() + 60 * 60 * 1000);
//     setReminderStr(next.toISOString().slice(0, 16));
//   };

//   return (
//     <form onSubmit={handleSubmit} className="flex flex-col gap-2 mt-3">
//       <input
//         type="text"
//         placeholder="Title (optional)"
//         value={title}
//         onChange={(e) => setTitle(e.target.value)}
//         className="input input-sm input-bordered w-full"
//       />

//       <input
//         type="url"
//         placeholder="https://example.com"
//         value={url}
//         onChange={(e) => setUrl(e.target.value)}
//         required
//         className="input input-sm input-bordered w-full"
//       />

//       <div className="flex gap-2 items-center">
//         <input
//           type="datetime-local"
//           value={reminderStr}
//           onChange={(e) => setReminderStr(e.target.value)}
//           className="input input-sm input-bordered"
//         />
//         <button type="submit" className="btn btn-sm btn-primary">
//           Addssss Link
//         </button>
//       </div>
//     </form>
//   );
// }
