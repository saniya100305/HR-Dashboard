// components/Button.jsx
'use client';
import Link from 'next/link';

export default function Button({ label, onClick, href }) {
  const className = "px-3 py-1 rounded bg-blue-600 text-white hover:bg-blue-700 text-sm";
  if (href) return <Link href={href} className={className}>{label}</Link>;
  return <button onClick={onClick} className={className}>{label}</button>;
}
