import { Bookmark } from "../types";

export const createBookmarkDataAccessor = (
  bookmarkApi: typeof browser.bookmarks
) => {
  const mapApiBookmarkToBookmark = (
    bookmark: browser.bookmarks.BookmarkTreeNode
  ) => {
    const { id, title, url } = bookmark;
    return { id, title: title, url: url ?? "" };
  };

  const updateBookmark = async (bookmark: Bookmark) =>
    mapApiBookmarkToBookmark(
      await bookmarkApi.update(bookmark.id, {
        title: bookmark.title,
        url: bookmark.url,
      })
    );

  const createBookmark = async (bookmark: Bookmark) =>
    mapApiBookmarkToBookmark(
      await bookmarkApi.create({
        title: bookmark.title,
        url: bookmark.url,
      })
    );

  const removeBookmark = (bookmarkId: string) => bookmarkApi.remove(bookmarkId);

  const getBookmark = async (bookmarkId: string) =>
    mapApiBookmarkToBookmark((await bookmarkApi.get(bookmarkId))[0]);

  // Bookmarks api returns folders so we need to filter them out
  const isBookmark = (bookmark: browser.bookmarks.BookmarkTreeNode) =>
    bookmark.type === "bookmark";

  const getBookmarks = async () =>
    (await bookmarkApi.search({}))
      .filter(isBookmark)
      .map(mapApiBookmarkToBookmark);

  const getSupportedProtocols = () => [
    "https://",
    "http://",
    "ftp://",
    "file://",
  ];
  return {
    createBookmark,
    getBookmark,
    getBookmarks,
    getSupportedProtocols,
    removeBookmark,
    updateBookmark,
  };
};

export const bookmarkData = createBookmarkDataAccessor(browser.bookmarks);
export type BookmarkData = typeof bookmarkData;