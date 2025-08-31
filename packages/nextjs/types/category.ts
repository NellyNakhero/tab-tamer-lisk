// export type NewLinkPayload = {
//   url: string;
//   reminderTime: number; // ms since epoch
//   title?: string;
// };

// export interface CategoryLink {
//   id: string;
//   url: string;
//   reminderTime: number; // ms since epoch
//   title?: string;
//   read?: boolean;
//   coinsEarned?: number;
//   categoryId?: string;
// }

// export interface Category {
//   id: string;
//   name: string;
//   links: CategoryLink[];
// }

export type NewLinkPayload = {
  url: string;
  reminderTime: number; // ms since epoch
  title?: string;
};

// Add export here
export interface LinkItem {
  id: string;
  url: string;
  title?: string;
  reminderTime: number;
  read: boolean; // always defined
  coinsEarned: number; // always defined
  categoryId?: string;
}

export interface Category {
  id: string;
  name: string;
  links: LinkItem[];
}
