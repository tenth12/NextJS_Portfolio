"use client";
import Link from "next/link";

export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 text-center p-4">
      <div className="bg-white p-8 rounded-lg shadow-md">
        <h1 className="text-4xl font-bold text-gray-800 mb-2">
          🎓 TCAS69 Portfolio System
        </h1>
        <p className="text-gray-600 mb-6">เลือกเมนูเพื่อเริ่มใช้งาน</p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/form"
            className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 px-6 rounded-lg transition duration-300 ease-in-out transform hover:-translate-y-1"
          >
            ✍️ กรอกฟอร์ม Portfolio
          </Link>
          <Link
            href="/teacher"
            className="bg-green-500 hover:bg-green-600 text-white font-semibold py-3 px-6 rounded-lg transition duration-300 ease-in-out transform hover:-translate-y-1"
          >
            👩‍🏫 สำหรับอาจารย์
          </Link>
        </div>
      </div>
    </div>
  );
}