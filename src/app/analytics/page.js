'use client';

import { useEffect, useState } from 'react';
import { Bar, Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
} from 'chart.js';

import useBookmarksStore from '../../../store/bookmarks';

ChartJS.register(BarElement, CategoryScale, LinearScale, PointElement, LineElement, Tooltip, Legend);

export default function AnalyticsPage() {
  const bookmarks = useBookmarksStore((state) => state.bookmarks);
  const [departmentRatings, setDepartmentRatings] = useState({});
  const [bookmarkTrends, setBookmarkTrends] = useState([]);

  useEffect(() => {
    const mockDepartments = ['HR', 'Engineering', 'Design', 'Marketing'];
    const ratings = {};
    mockDepartments.forEach((dept) => {
      ratings[dept] = Math.floor(Math.random() * 3) + 3;
    });
    setDepartmentRatings(ratings);

    const trends = [2, 5, 3, 4, 6, 8, bookmarks.length];
    setBookmarkTrends(trends);
  }, [bookmarks]);

  const deptData = {
    labels: Object.keys(departmentRatings),
    datasets: [
      {
        label: 'Avg Rating',
        data: Object.values(departmentRatings),
        backgroundColor: 'rgba(59,130,246,0.7)',
        borderRadius: 6,
        barThickness: 30,
      },
    ],
  };

  const trendData = {
    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    datasets: [
      {
        label: 'Bookmarks Added',
        data: bookmarkTrends,
        fill: true,
        borderColor: '#10B981',
        backgroundColor: 'rgba(16,185,129,0.1)',
        tension: 0.3,
        pointBackgroundColor: '#10B981',
        pointRadius: 4,
      },
    ],
  };

  return (
    <div className="px-4 py-6 md:px-8 md:py-10 max-w-6xl mx-auto">
      <h1 className="text-2xl font-bold mb-2">📈 HR Analytics</h1>
      <p className="mb-6 text-gray-600 dark:text-gray-300 text-sm">
        Get quick insights into employee performance and engagement.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow">
          <h2 className="text-lg font-semibold mb-3">📌 Department Ratings</h2>
          <div className="w-full h-64">
            <Bar data={deptData} />
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow">
          <h2 className="text-lg font-semibold mb-3">📅 Bookmark Trends</h2>
          <div className="w-full h-64">
            <Line data={trendData} />
          </div>
        </div>
      </div>
    </div>
  );
}
