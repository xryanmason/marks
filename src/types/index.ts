export interface Bookmark {
  id: string;
  title: string;
  url: string;
  isFavorite?: boolean;
  tags?: string[];
  isReaderMode?: boolean;
}

export type NewBookmark = Omit<Bookmark, "id">;

export enum ThemeOption {
  Light = "light",
  Dark = "dark",
}

export interface BookmarkTag {
  bookmarkId: string;
  tags: string[];
}

export interface LocalStorage {
  theme: ThemeOption;
  tags: BookmarkTag[];
  favorites: string[];
}

export enum Icon {
  Pencil = "â",
  MagnifyingGlass = "ð ",
  Sun = "â¼",
  Moon = "â¾",
  X = "â",
  Ascending = "AZâ",
  Descending = "AZâ",
  Favorite = "â",
  NotFavorite = "â",
  Add = "+",
  RightArrow = "âº",
  Book = "ð",
  Web = "ð¥",
}
