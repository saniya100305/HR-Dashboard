'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';

import Badge from '../../../../components/Badge';
import Tabs from '../../../../components/Tabs';
import RatingStars from '../../../../components/RatingStars';

const tabs = ['Overview', 'Projects', 'Feedback'];

export default function EmployeeDetail() {
  const { id } = useParams();
  const [employee, setEmployee] = useState(null);
  const [tab, setTab] = useState('Overview');

  useEffect(() => {
    fetch(`https://dummyjson.com/users/${id}`)
      .then((res) => res.json())
      .then((data) => {
        const enriched = {
          ...data,
          department: getRandomDept(),
          rating: Math.floor(Math.random() * 5) + 1,
          address: `${data.address?.address}, ${data.address?.city}`,
          phone: data.phone,
          bio: 'Motivated, detail-oriented, and a fast learner.',
          performanceHistory: Array.from({ length: 5 }, (_, i) => ({
            year: 2020 + i,
            rating: Math.floor(Math.random() * 5) + 1,
          })),
        };
        setEmployee(enriched);
      });
  }, [id]);

  if (!employee) return <p>Loading employee...</p>;

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">
        {employee.firstName} {employee.lastName}
      </h2>

      <div className="space-y-1 text-sm text-gray-600">
        <p>Email: {employee.email}</p>
        <p>Phone: {employee.phone}</p>
        <p>Address: {employee.address}</p>
        <p>Department: {employee.department}</p>
      </div>

      <div className="flex items-center gap-4">
        <RatingStars rating={employee.rating} />
        <Badge
          label={
            employee.rating >= 4
              ? 'Excellent'
              : employee.rating >= 3
              ? 'Good'
              : 'Needs Improvement'
          }
          color={
            employee.rating >= 4
              ? 'green'
              : employee.rating >= 3
              ? 'yellow'
              : 'red'
          }
        />
      </div>

      {/* Tabs */}
      <Tabs tab={tab} setTab={setTab} tabs={tabs} />

      <div className="mt-4">
        {tab === 'Overview' && (
          <p className="text-gray-700">{employee.bio}</p>
        )}

        {tab === 'Projects' && (
          <ul className="list-disc ml-4 text-gray-700">
            <li>Project Phoenix</li>
            <li>Team Lead: Hiring Portal</li>
            <li>UI Revamp Initiative</li>
          </ul>
        )}

        {tab === 'Feedback' && (
          <form
            onSubmit={(e) => {
              e.preventDefault();
              alert('Feedback submitted!');
            }}
            className="space-y-2"
          >
            <textarea
              rows={4}
              className="w-full p-2 border rounded"
              placeholder="Write feedback..."
              required
            />
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded"
            >
              Submit Feedback
            </button>
          </form>
        )}
      </div>
    </div>
  );
}

function getRandomDept() {
  const departments = ['HR', 'Engineering', 'Marketing', 'Sales', 'Design'];
  return departments[Math.floor(Math.random() * departments.length)];
}
