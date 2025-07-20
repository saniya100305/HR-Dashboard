import './globals.css'; // ✅ Import global styles

export const metadata = {
  title: 'HR Dashboard',
  description: 'Track employee performance and analytics',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-white">
        <main className="p-4 max-w-7xl mx-auto">
          <nav className="mb-6 border-b pb-4 flex justify-between items-center">
            <h1 className="text-2xl font-bold">HR Dashboard</h1>
            {/* Add dark mode toggle here */}
          </nav>
          {children}
        </main>
      </body>
    </html>
  );
}
