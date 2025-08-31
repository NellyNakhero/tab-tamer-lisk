"use client";

import React, { useState } from "react";
import { DragDropContext, Draggable, DropResult, Droppable } from "react-beautiful-dnd";
import { useAccount } from "wagmi";
import { Address } from "~~/components/scaffold-eth";
import MarkAsReadForm from "~~/components/tab-tamer/MarkAsReadForm";
import { LinkReminder, ReminderManager } from "~~/components/tab-tamer/ReminderManager";
import SaveLinkForm, { NewLinkPayload } from "~~/components/tab-tamer/SaveLinkForm";
import { LinkItem as Link } from "~~/types/link";

type Category = {
  id: string;
  name: string;
  links: Link[];
  color: string;
};

export default function CategoriesManager() {
  const { address: connectedAddress } = useAccount();
  const [copied, setCopied] = useState(false);
  const [categories, setCategories] = useState<Category[]>([]);
  const [newCategoryName, setNewCategoryName] = useState("");
  const [coins, setCoins] = useState(0);

  /** Add a new category */
  const handleAddCategory = () => {
    if (!newCategoryName.trim()) return;
    setCategories(prev => [
      ...prev,
      { id: crypto.randomUUID(), name: newCategoryName.trim(), links: [], color: "#FFD700" },
    ]);
    setNewCategoryName("");
  };

  /** Save a link under a category */
  const handleLinkSaved = (categoryId: string, newLink: NewLinkPayload) => {
    const link: Link = {
      id: crypto.randomUUID(),
      url: newLink.url,
      title: newLink.title,
      reminderTime: newLink.reminderTime,
      read: false, // default value ensures type safety
      coinsEarned: 0, // default value ensures type safety
    };
    setCategories(prev => prev.map(cat => (cat.id === categoryId ? { ...cat, links: [...cat.links, link] } : cat)));
  };

  /** Reward when a link is marked as read */
  const handleReward = (categoryId: string, linkId: string, reward: number) => {
    setCategories(prev =>
      prev.map(cat => {
        if (cat.id === categoryId) {
          const updatedLinks = cat.links.map(link => {
            const read = link.read ?? false;
            const coinsEarned = link.coinsEarned ?? 0;
            return link.id === linkId
              ? { ...link, read: true, coinsEarned: coinsEarned + reward }
              : { ...link, read, coinsEarned };
          });
          return { ...cat, links: updatedLinks };
        }
        return cat;
      }),
    );
    setCoins(prev => prev + reward);
  };

  /** Change category color */
  const handleCategoryColorChange = (categoryId: string, newColor: string) => {
    setCategories(prev => prev.map(cat => (cat.id === categoryId ? { ...cat, color: newColor } : cat)));
  };

  /** Drag and drop categories */
  const handleDragEnd = (result: DropResult) => {
    if (!result.destination) return;
    const reordered = Array.from(categories);
    const [removed] = reordered.splice(result.source.index, 1);
    reordered.splice(result.destination.index, 0, removed);
    setCategories(reordered);
  };

  /** Prepare reminders for ReminderManager */
  const reminders: LinkReminder[] = categories.flatMap(cat =>
    cat.links
      .filter(link => !(link.read ?? false))
      .map(link => ({
        linkId: link.id,
        url: link.url,
        title: link.title,
        reminderTime: link.reminderTime,
        categoryName: cat.name,
      })),
  );

  return (
    <div className="flex flex-col gap-6 p-6">
      {/* Fun heading */}
      <div className="flex flex-col items-center gap-2">
        <h1 className="text-4xl font-extrabold text-center text-blue-400">📑 Welcome to Tab-Tamer!</h1>
        <p className="text-lg text-gray-400 text-center">Time to tame your tabs and earn some coins 🪙✨</p>
      </div>

      {/* Coins + Wallet row */}
      <div className="flex flex-wrap justify-center items-center gap-6 mb-6 bg-gray-900 p-4 rounded-xl shadow-md">
        <div className="flex items-center gap-2 bg-yellow-500/20 px-4 py-2 rounded-lg hover:scale-105 transform transition-all">
          <span className="text-yellow-400 text-2xl">🪙</span>
          <span className="font-bold text-white text-lg">Coins: {coins}</span>
        </div>
        <div className="flex items-center gap-2 bg-blue-500/20 px-4 py-2 rounded-lg hover:scale-105 transform transition-all">
          <p className="font-medium text-white">Connected:</p>
          <Address address={connectedAddress} />
          {connectedAddress && (
            <button
              onClick={() => {
                navigator.clipboard.writeText(connectedAddress);
                setCopied(true);
                setTimeout(() => setCopied(false), 1500);
              }}
              className="text-sm px-2 py-1 bg-blue-700 rounded hover:bg-blue-600 transition"
            >
              Copy
            </button>
          )}
        </div>
        {copied && <span className="text-xs text-green-400">Copied!</span>}
      </div>

      {/* Add new category */}
      <div className="flex gap-2 items-center justify-center">
        <input
          type="text"
          placeholder="New category name"
          value={newCategoryName}
          onChange={e => setNewCategoryName(e.target.value)}
          className="p-2 rounded-lg border border-gray-700 bg-gray-900 text-white w-64"
        />
        <button
          onClick={handleAddCategory}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg shadow"
        >
          Add Category
        </button>
      </div>

      {/* Categories list with drag-and-drop */}
      <DragDropContext onDragEnd={handleDragEnd}>
        <Droppable droppableId="categories">
          {provided => (
            <div
              {...provided.droppableProps}
              ref={provided.innerRef}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {categories.map((cat, index) => (
                <Draggable key={cat.id} draggableId={cat.id} index={index}>
                  {providedDraggable => (
                    <div
                      ref={providedDraggable.innerRef}
                      {...providedDraggable.dragHandleProps}
                      {...providedDraggable.draggableProps}
                      className="rounded-xl shadow-lg p-4 bg-gray-900 hover:scale-105 transform transition-all duration-300"
                    >
                      {/* Category header */}
                      <div className="flex justify-between items-center mb-3">
                        <h2 className="text-xl font-bold" style={{ color: cat.color }}>
                          {cat.name}
                        </h2>
                        <input
                          type="color"
                          value={cat.color}
                          onChange={e => handleCategoryColorChange(cat.id, e.target.value)}
                          className="w-8 h-8 rounded-full border border-gray-700 cursor-pointer"
                        />
                      </div>

                      {/* Add link form */}
                      <SaveLinkForm onLinkSaved={link => handleLinkSaved(cat.id, link)} />

                      {/* Links list */}
                      <div className="mt-4 flex flex-col gap-2">
                        <h3 className="font-semibold text-gray-300 mb-2">📌 Saved Links</h3>
                        {cat.links.map(link => {
                          const read = link.read ?? false;
                          const coinsEarned = link.coinsEarned ?? 0;

                          return (
                            <div
                              key={link.id}
                              className={`flex justify-between items-center p-3 rounded-lg transition-transform transform hover:scale-105 shadow-md
                                ${read ? "bg-gray-700 opacity-70" : "bg-gray-800 hover:bg-gray-700"}`}
                            >
                              <div className="flex flex-col gap-1">
                                <a
                                  href={link.url}
                                  target="_blank"
                                  rel="noreferrer"
                                  className={`flex items-center gap-1 font-medium transition-colors ${
                                    read ? "text-pink-400 line-through" : "text-blue-400 hover:text-blue-300"
                                  }`}
                                >
                                  <span>{link.title?.toLowerCase().includes("solidity") ? "💡" : "🔗"}</span>
                                  {link.title || link.url}
                                </a>
                                <div className="text-xs text-gray-400">
                                  Reminder:{" "}
                                  {new Date(link.reminderTime).toLocaleString(undefined, {
                                    year: "numeric",
                                    month: "short",
                                    day: "numeric",
                                    hour: "2-digit",
                                    minute: "2-digit",
                                  })}
                                </div>
                              </div>

                              {!read && (
                                <MarkAsReadForm
                                  linkId={link.id}
                                  onReward={reward => handleReward(cat.id, link.id, reward)}
                                />
                              )}

                              {read && (
                                <span className="text-pink-400 font-bold flex items-center gap-1">
                                  💖 +{coinsEarned} 🪙
                                </span>
                              )}
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>

      {/* Reminder notifications */}
      <ReminderManager reminders={reminders} />
    </div>
  );
}
