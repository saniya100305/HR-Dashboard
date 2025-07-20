'use client';
import { useBookmarks } from '../hooks/useBookmarks';
import RatingStars from './RatingStars';
import Button from './Button';

export default function EmployeeCard({ user }) {
  const { toggleBookmark, isBookmarked } = useBookmarks();

  return (
    <div className="border p-4 rounded-xl shadow bg-white dark:bg-gray-800">
      <h3 className="text-lg font-bold">{user.firstName} {user.lastName}</h3>
      <p className="text-sm text-gray-600">{user.email}</p>
      <p className="text-sm">Department: {user.department}</p>
      <p className="text-sm">Age: {user.age}</p>

      <RatingStars rating={user.rating} />

      <div className="mt-4 flex gap-2">
        <Button label="View" href={`/employee/${user.id}`} />
        <Button label={isBookmarked(user.id) ? "Remove Bookmark" : "Bookmark"} onClick={() => toggleBookmark(user)} />
        <Button label="Promote" onClick={() => alert("Promoted!")} />
      </div>
    </div>
  );
}
