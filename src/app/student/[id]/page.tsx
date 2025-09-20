'use client';

import { usePortfolioStore } from '@/app/store/portfolioStore';
import { useParams } from 'next/navigation';
import { useState } from 'react';

export default function StudentDetailPage() {
  const { id } = useParams();
  const portfolios = usePortfolioStore((state) => state.portfolios);
  const student = portfolios.find((p) => p.id === id);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  if (!student) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-100">
        <div className="p-8 text-center text-red-600 bg-white rounded-lg shadow-xl">
          <h2 className="text-2xl font-bold">ไม่พบข้อมูล</h2>
          <p>ไม่พบข้อมูลนักศึกษาสำหรับ ID ที่ระบุ</p>
        </div>
      </div>
    );
  }

  const InfoSection = ({ title, children }: { title: string, children: React.ReactNode }) => (
    <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
      <h2 className="text-xl font-semibold mb-4 text-blue-700 border-b-2 border-blue-200 pb-2">{title}</h2>
      <ul className="space-y-3 text-gray-700">
        {children}
      </ul>
    </div>
  );

  const InfoItem = ({ label, value }: { label: string, value: React.ReactNode }) => (
    <li className="flex items-start">
      <span className="font-semibold w-32 shrink-0">{label}:</span>
      <span className="text-gray-800">{value || '-'}</span>
    </li>
  );

  const ImageGallery = ({ title, images, onImageClick }: { title: string, images: string[], onImageClick: (src: string) => void }) => (
    <div>
      <h2 className="text-2xl font-bold mb-6 text-gray-800 text-center">{title}</h2>
      <div className="">
        {images.map((src, index) => (
          <div 
            key={index} 
            className="overflow-hidden rounded-lg shadow-lg group cursor-pointer"
            onClick={() => onImageClick(src)}
          >
            <img 
              src={src} 
              alt={`${title} ${index + 1}`} 
              className="w-full h-48 object-cover transition-transform duration-300 ease-in-out group-hover:scale-110" 
            />
          </div>
        ))}
      </div>
    </div>
  );

  const ImageModal = ({ src, onClose }: { src: string | null, onClose: () => void }) => {
    if (!src) return null;

    return (
      <div 
        className="fixed inset-0 bg-black bg-opacity-80 flex justify-center items-center z-50 p-4"
        onClick={onClose}
      >
        <div className="relative" onClick={(e) => e.stopPropagation()}>
          <img src={src} alt="Full size view" className="max-w-full max-h-[90vh] object-contain rounded-lg"/>
          <button 
            onClick={onClose}
            className="absolute -top-4 -right-4 sm:top-2 sm:right-2 bg-white rounded-full p-1 text-gray-800 hover:bg-gray-200 transition"
            aria-label="Close image"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      </div>
    );
  };

  return (
    <>
      <ImageModal src={selectedImage} onClose={() => setSelectedImage(null)} />
      <div className="bg-gray-100 min-h-screen p-4 sm:p-6 md:p-8">
        <div className="container mx-auto max-w-5xl">
          <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
            <div className="bg-gradient-to-r from-blue-500 to-purple-600 p-8">
              <div className="flex flex-col items-center text-center">
                {student.profileImageUrl && (
                  <img 
                    src={student.profileImageUrl} 
                    alt="รูปภาพนักเรียน" 
                    className="w-40 h-40 object-cover rounded-full border-4 border-white mb-4 shadow-lg"
                  />
                )}
                <h1 className="text-4xl font-extrabold text-white tracking-tight">{student.firstName} {student.lastName}</h1>
                <p className="text-lg text-blue-100 mt-1">{student.university || 'University not specified'}</p>
              </div>
            </div>

            <div className="p-8 space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <InfoSection title="ข้อมูลส่วนตัว">
                  <InfoItem label="ที่อยู่" value={student.address} />
                  <InfoItem label="เบอร์โทรศัพท์" value={student.phone} />
                  <InfoItem label="โรงเรียน" value={student.school} />
                  <InfoItem label="GPA" value={<span className="font-bold text-lg text-green-600">{student.gpa}</span>} />
                </InfoSection>
                
                <InfoSection title="ข้อมูลการสมัคร">
                  <InfoItem label="สาขาที่สมัคร" value={student.selectedMajor} />
                  <InfoItem label="ความสามารถพิเศษ" value={student.specialSkills} />
                  <InfoItem label="เหตุผลในการสมัคร" value={student.reasonForApplying} />
                </InfoSection>
              </div>

              <div className="space-y-12">
                {student.activityImages && student.activityImages.length > 0 && (
                  <ImageGallery title="รูปภาพกิจกรรม" images={student.activityImages} onImageClick={setSelectedImage} />
                )}
                
                {student.awardImages && student.awardImages.length > 0 && (
                  <ImageGallery title="รูปภาพรางวัล" images={student.awardImages} onImageClick={setSelectedImage} />
                )}

                {student.workImages && student.workImages.length > 0 && (
                  <ImageGallery title="รูปภาพผลงาน" images={student.workImages} onImageClick={setSelectedImage} />
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}