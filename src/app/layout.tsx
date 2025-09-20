import type { Metadata } from "next";
import "./globals.css";
import Link from "next/link";

export const metadata: Metadata = {
  title: "ระบบ Portfolio TCAS69",
  description: "ระบบการสร้างและจัดการ Portfolio สำหรับ TCAS69",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="th" suppressHydrationWarning>
      <body className="bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-gray-200 min-h-screen transition-colors duration-300">
        <header className="sticky top-0 z-50 w-full bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm border-b border-gray-200 dark:border-gray-800">
          <nav className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16">
              <div className="flex items-center">
                <Link href="/" className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                  TCAS69 Portfolio 
                </Link>
              </div>
              <div className="flex items-center space-x-4">
                <ul className="hidden md:flex items-center space-x-6">
                  <li><Link href="/" className="font-medium hover:text-blue-600 dark:hover:text-blue-400 transition-colors">หน้าหลัก</Link></li>
                  <li><Link href="/form" className="font-medium hover:text-blue-600 dark:hover:text-blue-400 transition-colors">กรอกฟอร์ม</Link></li>
                  <li><Link href="/teacher" className="font-medium hover:text-blue-600 dark:hover:text-blue-400 transition-colors">สำหรับอาจารย์</Link></li>
                </ul>
              </div>
            </div>
          </nav>
        </header>
        <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {children}
        </main>
        <footer className="bg-gray-100 dark:bg-gray-800 mt-auto">
            <div className="container mx-auto py-4 px-4 sm:px-6 lg:px-8 text-center text-gray-600 dark:text-gray-400">
                <p>&copy; {new Date().getFullYear()} TCAS69 Portfolio System. All rights reserved.</p>
            </div>
        </footer>
      </body>
    </html>
  );
}