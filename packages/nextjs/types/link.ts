// export interface Link {
//   id: string;
//   owner: string; // user account address
//   url: string;
//   reminderTime: number;
//   read: boolean;
//   coinsEarned: number;
// }
// types/link.ts

// Represents a link with all defaults defined
export interface LinkItem {
  id: string;
  url: string;
  reminderTime: number; // ms since epoch
  title?: string;
  read: boolean; // always defined
  coinsEarned: number; // always defined
  categoryId?: string;
}
