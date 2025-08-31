// packages/nextjs/services/linkService.ts
import { LinkItem } from "~~/types/link";

const fakeDb: LinkItem[] = []; // in-memory store for hackathon MVP

export async function saveLink(url: string, reminder: number): Promise<LinkItem> {
  const link: LinkItem = {
    id: crypto.randomUUID(),
    // owner: "demo-user", // TODO: replace with connected wallet address
    url,
    reminderTime: Date.now() + reminder * 1000,
    read: false, // default ensures type safety
    coinsEarned: 0, // default ensures type safety
  };

  fakeDb.push(link);
  console.log("Saved link:", link);
  return link;
}

/**
 * Mark a link as read and always return an object with the reward.
 * Returns { link, coins } when found (coins = reward given this call).
 * Returns null if the link id doesn't exist.
 */
export async function markAsRead(id: string): Promise<{ link: LinkItem; coins: number } | null> {
  const link = fakeDb.find(l => l.id === id);
  if (!link) return null;

  if (!link.read) {
    const reward = 10; // reward for marking as read
    link.read = true;
    link.coinsEarned += reward;

    // TODO: Replace with MarkReadAsset transaction to Lisk
    console.log("Marked as read:", link);

    return { link, coins: reward };
  }

  // already read -> no additional coins, but return the link so caller can update UI
  return { link, coins: 0 };
}

export async function getLinks(): Promise<LinkItem[]> {
  return fakeDb;
}
