"use client";

import React, { useState } from "react";
import LinkItem from "./LinkItem";
import { ChevronDownIcon, PlusCircleIcon } from "@heroicons/react/24/outline";
import { Category } from "~~/types/category";

interface Props {
  category: Category;
  onAddLink: (categoryId: string, title: string, url: string) => void;
}

const CategoryCard: React.FC<Props> = ({ category, onAddLink }) => {
  const [expanded, setExpanded] = useState(true);
  const [newLinkTitle, setNewLinkTitle] = useState("");
  const [newLinkUrl, setNewLinkUrl] = useState("");

  const handleAddLink = () => {
    if (!newLinkUrl.trim()) return;
    onAddLink(category.id, newLinkTitle, newLinkUrl);
    setNewLinkTitle("");
    setNewLinkUrl("");
  };

  return (
    <div className="card bg-base-200 shadow-md">
      <div className="card-body">
        <div className="flex justify-between items-center">
          <h2 className="card-title">{category.name}</h2>
          <button onClick={() => setExpanded(!expanded)} className="btn btn-ghost btn-xs">
            <ChevronDownIcon className={`h-4 w-4 transition-transform ${expanded ? "rotate-180" : ""}`} />
          </button>
        </div>

        {expanded && (
          <>
            {/* Links List */}
            <ul className="space-y-1">
              {category.links.map(link => (
                <LinkItem key={link.id} link={link} />
              ))}
              {category.links.length === 0 && <li className="text-sm text-gray-400">No links yet</li>}
            </ul>

            {/* Add Link Form */}
            <div className="mt-3 flex gap-2">
              <input
                type="text"
                placeholder="Title (optional)"
                value={newLinkTitle}
                onChange={e => setNewLinkTitle(e.target.value)}
                className="input input-sm input-bordered w-1/3"
              />
              <input
                type="url"
                placeholder="https://example.com"
                value={newLinkUrl}
                onChange={e => setNewLinkUrl(e.target.value)}
                className="input input-sm input-bordered w-full"
              />
              <button onClick={handleAddLink} className="btn btn-sm btn-primary flex items-center gap-1">
                <PlusCircleIcon className="h-4 w-4" />
                Add
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default CategoryCard;
