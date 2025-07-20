// components/Tabs.jsx
'use client';
import { motion } from 'framer-motion';

export default function Tabs({ tabs, tab, setTab }) {
  return (
    <div className="flex gap-2 border-b pb-2">
      {tabs.map((t) => (
        <button
          key={t}
          onClick={() => setTab(t)}
          className={`relative px-3 py-1.5 font-medium ${
            tab === t ? 'text-blue-600' : 'text-gray-500'
          }`}
        >
          {t}
          {tab === t && (
            <motion.div
              className="absolute left-0 bottom-0 h-0.5 w-full bg-blue-600"
              layoutId="underline"
            />
          )}
        </button>
      ))}
    </div>
  );
}
