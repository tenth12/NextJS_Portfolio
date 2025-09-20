'use client';

import { useState } from 'react';
import { usePortfolioStore } from '@/app/store/portfolioStore';
import Link from 'next/link';

export default function TeacherPage() {
  const portfolios = usePortfolioStore((state) => state.portfolios);
  const [sortKey, setSortKey] = useState<'gpa' | null>(null);
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');

  const handleSort = () => {
    // Toggle sort direction
    setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    setSortKey('gpa');
  };

  // Create a new sorted array for rendering
  const sortedPortfolios = [...portfolios].sort((a, b) => {
    if (sortKey === 'gpa') {
      return sortDirection === 'asc' ? a.gpa - b.gpa : b.gpa - a.gpa;
    }
    return 0;
  });

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center p-4 sm:p-6 lg:p-8">
      <div className="w-full max-w-5xl mx-auto">
        <h1 className="text-4xl font-extrabold mb-8 text-center text-slate-800 tracking-tight">
          รายชื่อนักศึกษาที่ยื่น Portfolio
        </h1>
        
        {portfolios.length === 0 ? (
          <div className="text-center bg-white p-12 rounded-xl shadow-md">
            <p className="text-lg text-gray-500">ยังไม่มีข้อมูล Portfolio</p>
          </div>
        ) : (
          <div className="overflow-x-auto bg-white rounded-xl shadow-lg border border-gray-200/80">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-slate-100">
                <tr>
                  <th scope="col" className="py-4 px-6 text-left text-xs font-bold text-slate-600 uppercase tracking-wider">
                    ชื่อ-นามสกุล
                  </th>
                  <th
                    scope="col"
                    className="py-4 px-6 text-left text-xs font-bold text-slate-600 uppercase tracking-wider cursor-pointer hover:bg-slate-200 transition-colors duration-200"
                    onClick={handleSort}
                  >
                    <div className="flex items-center">
                      GPA
                      {sortKey === 'gpa' && (
                        <span className="ml-1.5">{sortDirection === 'asc' ? '▲' : '▼'}</span>
                      )}
                    </div>
                  </th>
                  <th scope="col" className="py-4 px-6 text-left text-xs font-bold text-slate-600 uppercase tracking-wider">
                    รายละเอียด
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {sortedPortfolios.map((student) => (
                  <tr key={student.id} className="hover:bg-slate-50 transition-colors duration-200">
                    <td className="py-4 px-6 whitespace-nowrap text-sm font-medium text-gray-900">
                      {student.firstName} {student.lastName}
                    </td>
                    <td className="py-4 px-6 whitespace-nowrap text-sm text-gray-700">
                      {student.gpa.toFixed(2)}
                    </td>
                    <td className="py-4 px-6 whitespace-nowrap text-sm font-medium">
                      <Link 
                        href={`/student/${student.id}`} 
                        className="inline-block bg-blue-600 text-white px-4 py-2 rounded-lg shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-200"
                      >
                        ดูรายละเอียด
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}