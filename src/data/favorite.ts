import useLocalStorage from "../lib/useLocalStorage";
import { LocalStorage } from "../types";

const { getValue, setValue } = useLocalStorage<LocalStorage>();

const getFavorites = () => getValue("favorites") ?? [];
const setFavorites = (favorites: string[]) => setValue("favorites", favorites);

export const favoriteData = { getFavorites, setFavorites };
export type FavoriteData = typeof favoriteData;
