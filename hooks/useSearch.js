// hooks/useSearch.js
import { useMemo } from 'react';

export default function useSearch(users, query, filters) {
  return useMemo(() => {
    return users.filter(user => {
      const matchesQuery =
        user.firstName.toLowerCase().includes(query.toLowerCase()) ||
        user.lastName.toLowerCase().includes(query.toLowerCase()) ||
        user.email.toLowerCase().includes(query.toLowerCase()) ||
        user.department.toLowerCase().includes(query.toLowerCase());

      const matchesDepartment =
        !filters.departments.length || filters.departments.includes(user.department);

      const matchesRating =
        !filters.ratings.length || filters.ratings.includes(user.rating);

      return matchesQuery && matchesDepartment && matchesRating;
    });
  }, [users, query, filters]);
}
