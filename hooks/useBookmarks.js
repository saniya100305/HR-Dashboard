// hooks/useBookmarks.js
import useBookmarkStore from '../store/bookmarks';

export const useBookmarks = () => {
  const bookmarks = useBookmarkStore((state) => state.bookmarks);
  const addBookmark = useBookmarkStore((state) => state.addBookmark);
  const removeBookmark = useBookmarkStore((state) => state.removeBookmark);

  const isBookmarked = (id) =>
    bookmarks.some((employee) => employee.id === id);

  const toggleBookmark = (employee) => {
    if (isBookmarked(employee.id)) {
      removeBookmark(employee.id);
    } else {
      addBookmark(employee);
    }
  };

  return { bookmarks, addBookmark, removeBookmark, toggleBookmark, isBookmarked };
};
