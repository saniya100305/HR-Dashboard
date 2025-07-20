// hooks/useEmployees.js
'use client';
import { useEffect, useState } from 'react';

export default function useEmployees() {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('https://dummyjson.com/users?limit=20')
      .then(res => res.json())
      .then(data => {
        const enriched = data.users.map(user => ({
          ...user,
          department: getRandomDept(),
          rating: Math.floor(Math.random() * 5) + 1,
        }));
        setEmployees(enriched);
        setLoading(false);
      });
  }, []);

  return { employees, loading };
}

function getRandomDept() {
  const departments = ['HR', 'Engineering', 'Marketing', 'Sales', 'Design'];
  return departments[Math.floor(Math.random() * departments.length)];
}
