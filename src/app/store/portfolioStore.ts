import { create } from 'zustand';

// ข้อมูล Portfolio และ State อื่นๆ ...
export interface Portfolio {
  id: string; // ใช้ ID เพื่อระบุข้อมูลแต่ละชิ้น
  firstName: string;
  lastName: string;
  address?: string;
  phone: string;
  school: string;
  gpa: number;
  specialSkills?: string;
  reasonForApplying: string;
  selectedMajor: string;
  university: string;
  profileImageUrl?: string | null;
  activityImages?: string[];
  awardImages?: string[];
  workImages?: string[];
}

interface PortfolioState {
  portfolios: Portfolio[];
  addPortfolio: (portfolio: Portfolio) => void;
}

export const usePortfolioStore = create<PortfolioState>((set, get) => ({
  portfolios: [],
  addPortfolio: (portfolio) =>
    set((state) => ({
      portfolios: [...state.portfolios, { ...portfolio, id: Date.now().toString() }],
    })),
}));
