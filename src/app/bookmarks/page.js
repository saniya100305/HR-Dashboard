'use client';

import RatingStars from '../../../components/RatingStars';
import Badge from '../../../components/Badge';
import { useRouter } from 'next/navigation';
import useBookmarksStore from '../../../store/bookmarks';

export default function BookmarksPage() {
  const bookmarks = useBookmarksStore((state) => state.bookmarks);
  const removeBookmark = useBookmarksStore((state) => state.removeBookmark);
  const router = useRouter();

  if (bookmarks.length === 0) {
    return (
      <div className="p-6 text-center text-gray-500 dark:text-gray-400">
        <p className="text-lg">No bookmarks added yet.</p>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-8">
      <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
        📌 Bookmarked Employees
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {bookmarks.map((emp) => (
          <div
            key={emp.id}
            className="rounded-2xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 p-5 shadow-sm hover:shadow-md transition duration-200"
          >
            <div className="flex justify-between items-start mb-3">
              <div>
                <h3 className="text-xl font-semibold text-gray-800 dark:text-white">
                  {emp.firstName} {emp.lastName}
                </h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">{emp.email}</p>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                  Department: {emp.department}
                </p>
              </div>
              <button
                onClick={() => removeBookmark(emp.id)}
                className="text-sm text-red-500 hover:underline"
              >
                ❌ Remove
              </button>
            </div>

            <div className="flex items-center gap-2 mt-2">
              <RatingStars rating={emp.rating} />
              <Badge
                label={
                  emp.rating >= 4
                    ? 'Excellent'
                    : emp.rating >= 3
                    ? 'Good'
                    : 'Average'
                }
                color={
                  emp.rating >= 4
                    ? 'green'
                    : emp.rating >= 3
                    ? 'yellow'
                    : 'gray'
                }
              />
            </div>

            <div className="flex flex-wrap gap-3 mt-5">
              <button
                className="text-sm px-3 py-1 border border-blue-600 text-blue-600 rounded hover:bg-blue-50 dark:hover:bg-blue-900 transition"
                onClick={() => alert('Promote action triggered')}
              >
                Promote
              </button>
              <button
                className="text-sm px-3 py-1 border border-purple-600 text-purple-600 rounded hover:bg-purple-50 dark:hover:bg-purple-900 transition"
                onClick={() => alert('Assigned to Project')}
              >
                Assign to Project
              </button>
              <button
                className="ml-auto text-sm text-gray-600 dark:text-gray-300 underline"
                onClick={() => router.push(`/employee/${emp.id}`)}
              >
                View Profile
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
