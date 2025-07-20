import { create } from 'zustand';

const useBookmarkStore = create((set, get) => ({
  bookmarks: [],
  addBookmark: (employee) =>
    set((state) => ({
      bookmarks: [...state.bookmarks, employee],
    })),
  removeBookmark: (id) =>
    set((state) => ({
      bookmarks: state.bookmarks.filter((emp) => emp.id !== id),
    })),
  isBookmarked: (id) => {
    const { bookmarks } = get();
    return bookmarks.some((emp) => emp.id === id);
  },
}));

export default useBookmarkStore;

