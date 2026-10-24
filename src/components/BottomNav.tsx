import React from 'react';
import { ActiveRole } from '../types';
import {
  LayoutDashboard,
  Clock,
  Users,
  IndianRupee,
  Award,
  Bell,
  Calendar,
  Trophy,
} from 'lucide-react';

interface BottomNavProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
  activeRole: ActiveRole;
}

export const BottomNav: React.FC<BottomNavProps> = ({
  activeTab,
  onTabChange,
  activeRole,
}) => {
  // Navigation tabs customized according to persona
  let navItems: { id: string; label: string; icon: React.ReactNode }[] = [];

  if (activeRole === 'coach') {
    navItems = [
      { id: 'attendance', label: 'Take Att', icon: <Clock className="w-5 h-5" /> },
      { id: 'batches', label: 'Batches', icon: <Calendar className="w-5 h-5" /> },
      { id: 'students', label: 'Students', icon: <Users className="w-5 h-5" /> },
      { id: 'belt-exam', label: 'Grading', icon: <Award className="w-5 h-5" /> },
    ];
  } else if (activeRole === 'parent') {
    navItems = [
      { id: 'parent-portal', label: 'My Children', icon: <Users className="w-5 h-5" /> },
      { id: 'batches', label: 'Schedule', icon: <Calendar className="w-5 h-5" /> },
      { id: 'announcements', label: 'Notices', icon: <Bell className="w-5 h-5" /> },
      { id: 'tournaments', label: 'Tournaments', icon: <Trophy className="w-5 h-5" /> },
    ];
  } else if (activeRole === 'student') {
    navItems = [
      { id: 'student-personal', label: 'My Progress', icon: <Award className="w-5 h-5" /> },
      { id: 'batches', label: 'Schedule', icon: <Calendar className="w-5 h-5" /> },
      { id: 'tournaments', label: 'Championship', icon: <Trophy className="w-5 h-5" /> },
      { id: 'announcements', label: 'Announcements', icon: <Bell className="w-5 h-5" /> },
    ];
  } else {
    // Admin
    navItems = [
      { id: 'dashboard', label: 'Overview', icon: <LayoutDashboard className="w-5 h-5" /> },
      { id: 'attendance', label: 'Attendance', icon: <Clock className="w-5 h-5" /> },
      { id: 'students', label: 'Students', icon: <Users className="w-5 h-5" /> },
      { id: 'fees', label: 'Fees & UPI', icon: <IndianRupee className="w-5 h-5" /> },
      { id: 'belt-exam', label: 'Exam', icon: <Award className="w-5 h-5" /> },
    ];
  }

  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-slate-950/95 backdrop-blur-md border-t border-slate-800 pb-safe">
      <div className={`grid grid-cols-${navItems.length} items-center h-16 px-2`}>
        {navItems.map((item) => {
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => onTabChange(item.id)}
              className={`flex flex-col items-center justify-center h-full min-h-[44px] transition-colors ${
                isActive ? 'text-rose-400' : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <div className="relative">
                {item.icon}
                {isActive && (
                  <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-rose-500" />
                )}
              </div>
              <span className="text-[10px] font-semibold tracking-tight mt-1 whitespace-nowrap">
                {item.label}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};
