'use client';

import { useForm } from 'react-hook-form';
import { Portfolio, usePortfolioStore } from '@/app/store/portfolioStore';
import { useRouter } from 'next/navigation';
import ImageUploader from '@/app/components/ImageUploader';
import { useState } from 'react';

export default function PortfolioForm() {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const addPortfolio = usePortfolioStore((state) => state.addPortfolio);
  const router = useRouter();

  const [profileImage, setProfileImage] = useState<string | null>(null);
  const [activityImages, setActivityImages] = useState<string[]>([]);
  const [awardImages, setAwardImages] = useState<string[]>([]);
  const [workImages, setWorkImages] = useState<string[]>([]);

  const onSubmit = (data: Portfolio) => {
    const fullData = {
      ...data,
      gpa: parseFloat(data.gpa),
      profileImageUrl: profileImage,
      activityImages,
      awardImages,
      workImages,
    };
    addPortfolio(fullData);
    alert('ข้อมูลถูกบันทึกเรียบร้อย');
    router.push('/teacher');
  };

  const inputClasses = "mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm text-black";
  const labelClasses = "block text-sm font-medium text-gray-700";
  const errorClasses = "mt-1 text-red-500 text-xs";
  const sectionClasses = "p-6 bg-white rounded-lg shadow-md";

  return (
    <div className="min-h-screen bg-gray-50 p-4 sm:p-6 lg:p-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-10">
            <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight">แบบฟอร์ม Portfolio TCAS69</h1>
            <p className="mt-2 text-lg text-gray-500">กรุณากรอกข้อมูลของท่านให้ครบถ้วน</p>
        </div>
        
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
          {/* ข้อมูลส่วนตัว */}
          <div className={sectionClasses}>
            <h2 className="text-xl font-semibold text-gray-800 border-b pb-3 mb-6">ข้อมูลส่วนตัว</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="firstName" className={labelClasses}>ชื่อ:</label>
                <input id="firstName" {...register('firstName', { required: 'กรุณากรอกชื่อ' })} className={inputClasses} />
                {errors.firstName && <p className={errorClasses}>{errors.firstName.message?.toString()}</p>}
              </div>
              <div>
                <label htmlFor="lastName" className={labelClasses}>นามสกุล:</label>
                <input id="lastName" {...register('lastName', { required: 'กรุณากรอกนามสกุล' })} className={inputClasses} />
                {errors.lastName && <p className={errorClasses}>{errors.lastName.message?.toString()}</p>}
              </div>
              <div className="md:col-span-2">
                <label htmlFor="address" className={labelClasses}>ที่อยู่:</label>
                <input id="address" {...register('address', { required: 'กรุณากรอกที่อยู่' })} className={inputClasses} />
                {errors.address && <p className={errorClasses}>{errors.address.message?.toString()}</p>}
              </div>
              <div>
                <label htmlFor="phone" className={labelClasses}>หมายเลขโทรศัพท์:</label>
                <input type="tel" id="phone" {...register('phone', { 
                  required: 'กรุณากรอกเบอร์โทรศัพท์',
                  minLength: { value: 10, message: 'หมายเลขโทรศัพท์ต้องมี 10 หลัก' },
                  maxLength: { value: 10, message: 'หมายเลขโทรศัพท์ต้องมี 10 หลัก' },
                  pattern: { value: /^[0-9]{10}$/, message: 'กรุณากรอกหมายเลขโทรศัพท์ให้ถูกต้อง' }
                })} className={inputClasses} />
                {errors.phone && <p className={errorClasses}>{errors.phone.message?.toString()}</p>}
              </div>
            </div>
          </div>

          {/* ข้อมูลการศึกษา */}
          <div className={sectionClasses}>
            <h2 className="text-xl font-semibold text-gray-800 border-b pb-3 mb-6">ข้อมูลการศึกษา</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="school" className={labelClasses}>โรงเรียน:</label>
                <input id="school" {...register('school', { required: 'กรุณากรอกชื่อโรงเรียน' })} className={inputClasses} />
                {errors.school && <p className={errorClasses}>{errors.school.message?.toString()}</p>}
              </div>
              <div>
                <label htmlFor="gpa" className={labelClasses}>GPA:</label>
                <input type="number" id="gpa" {...register('gpa', { required: 'กรุณากรอก GPA', min: { value: 0, message: 'GPA ต้องไม่ต่ำกว่า 0' }, max: { value: 4, message: 'GPA ต้องไม่เกิน 4' } })} step="0.01" className={inputClasses} />
                {errors.gpa && <p className={errorClasses}>{errors.gpa.message?.toString()}</p>}
              </div>
            </div>
          </div>

          {/* ข้อมูลเพิ่มเติม */}
          <div className={sectionClasses}>
            <h2 className="text-xl font-semibold text-gray-800 border-b pb-3 mb-6">ข้อมูลเพิ่มเติม</h2>
            <div className="space-y-6">
              <div>
                <label htmlFor="specialSkills" className={labelClasses}>ความสามารถพิเศษ:</label>
                <textarea id="specialSkills" {...register('specialSkills')} className={`${inputClasses} h-28`}></textarea>
              </div>
              <div>
                <label htmlFor="reasonForApplying" className={labelClasses}>เหตุผลในการสมัครเข้าเรียน:</label>
                <textarea id="reasonForApplying" {...register('reasonForApplying', { required: 'กรุณากรอกเหตุผล' })} className={`${inputClasses} h-28`}></textarea>
                {errors.reasonForApplying && <p className={errorClasses}>{errors.reasonForApplying.message?.toString()}</p>}
              </div>
            </div>
          </div>

          {/* ข้อมูลการสมัคร */}
          <div className={sectionClasses}>
            <h2 className="text-xl font-semibold text-gray-800 border-b pb-3 mb-6">ข้อมูลการสมัคร</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="selectedMajor" className={labelClasses}>สาขาที่เลือก:</label>
                <input id="selectedMajor" {...register('selectedMajor', { required: 'กรุณากรอกสาขา' })} className={inputClasses} />
                {errors.selectedMajor && <p className={errorClasses}>{errors.selectedMajor.message?.toString()}</p>}
              </div>
              <div>
                <label htmlFor="university" className={labelClasses}>มหาวิทยาลัย:</label>
                <input id="university" {...register('university', { required: 'กรุณากรอกมหาวิทยาลัย' })} className={inputClasses} />
                {errors.university && <p className={errorClasses}>{errors.university.message?.toString()}</p>}
              </div>
            </div>
          </div>

          {/* ส่วนอัปโหลดรูปภาพ */}
          <div className={sectionClasses}>
            <h2 className="text-xl font-semibold text-gray-800 border-b pb-3 mb-6">รูปภาพและเอกสารประกอบ</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                <ImageUploader label="รูปภาพนักเรียน" onImageUpload={(url) => setProfileImage(url as string)} />
                <ImageUploader label="กิจกรรม" onImageUpload={(urls) => setActivityImages(urls as string[])} multiple={true} />
                <ImageUploader label="รางวัล" onImageUpload={(urls) => setAwardImages(urls as string[])} multiple={true} />
                <ImageUploader label="ผลงาน" onImageUpload={(urls) => setWorkImages(urls as string[])} multiple={true} />
            </div>
          </div>

          <div className="flex justify-end pt-4">
            <button type="submit" className="w-full md:w-auto inline-flex justify-center py-3 px-8 border border-transparent shadow-sm text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors">
              ส่งข้อมูล
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}