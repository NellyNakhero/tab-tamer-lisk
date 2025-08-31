import { Category, LinkItem } from "~~/types/category";

// In-memory mock
const categories: Category[] = [];

/** Get all categories */
export async function getCategories(): Promise<Category[]> {
  return categories;
}

/** Add a new category */
export async function addCategory(name: string): Promise<Category> {
  const newCat: Category = {
    id: crypto.randomUUID(),
    name,
    links: [],
  };
  categories.push(newCat);
  return newCat;
}

/** Add a new link under a category */
export async function addLinkToCategory(
  categoryId: string,
  newLink: Omit<LinkItem, "id" | "categoryId" | "read" | "coinsEarned">,
): Promise<LinkItem> {
  // Ensure default values for read and coinsEarned
  const link: LinkItem = {
    id: crypto.randomUUID(),
    categoryId,
    url: newLink.url,
    title: newLink.title,
    reminderTime: newLink.reminderTime,
    read: false, // default
    coinsEarned: 0, // default
  };

  const cat = categories.find(c => c.id === categoryId);
  if (cat) {
    cat.links.push(link);
  }

  return link;
}
