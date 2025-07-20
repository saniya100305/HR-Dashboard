'use client';

import { useState } from 'react';
import Select from 'react-select';

import EmployeeCard from '../../components/EmployeeCard';
import useEmployees from '../../hooks/useEmployees';
import useSearch from '../../hooks/useSearch';
import useBookmarkStore from '../../store/bookmarks'; // ✅ Step 1: Import Zustand store

const departmentOptions = [
  { value: 'HR', label: 'HR' },
  { value: 'Engineering', label: 'Engineering' },
  { value: 'Marketing', label: 'Marketing' },
  { value: 'Sales', label: 'Sales' },
  { value: 'Design', label: 'Design' },
];

const ratingOptions = [1, 2, 3, 4, 5].map((n) => ({
  value: n,
  label: `${n} Star${n > 1 ? 's' : ''}`,
}));

export default function HomePage() {
  const { employees, loading } = useEmployees();
  const [query, setQuery] = useState('');
  const [filters, setFilters] = useState({
    departments: [],
    ratings: [],
  });

  const filteredEmployees = useSearch(employees, query, filters);

  const handleDeptChange = (selected) => {
    setFilters((prev) => ({
      ...prev,
      departments: selected.map((opt) => opt.value),
    }));
  };

  const handleRatingChange = (selected) => {
    setFilters((prev) => ({
      ...prev,
      ratings: selected.map((opt) => opt.value),
    }));
  };

  const { addBookmark } = useBookmarkStore(); // ✅ Step 2: Get bookmark function

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Employee Dashboard</h2>

      <input
        type="text"
        placeholder="Search by name, email, department..."
        className="w-full p-2 border rounded"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />

      <div className="flex gap-4 flex-wrap">
        <div className="w-60">
          <label className="text-sm font-medium">Filter by Department</label>
          <Select
            isMulti
            options={departmentOptions}
            onChange={handleDeptChange}
            className="mt-1"
          />
        </div>

        <div className="w-60">
          <label className="text-sm font-medium">Filter by Rating</label>
          <Select
            isMulti
            options={ratingOptions}
            onChange={handleRatingChange}
            className="mt-1"
          />
        </div>
      </div>

      {loading ? (
        <p className="text-gray-500">Loading employees...</p>
      ) : filteredEmployees.length === 0 ? (
        <p className="text-red-500">No employees match your criteria.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredEmployees.map((user) => (
            <EmployeeCard
              key={user.id}
              user={user}
              onBookmark={() => addBookmark(user)} // ✅ Step 3: Pass function to card
            />
          ))}
        </div>
      )}
    </div>
  );
}
