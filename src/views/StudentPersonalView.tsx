import React from 'react';
import { Student, Tournament, BeltExam } from '../types';
import { BeltBadge } from '../components/BeltBadge';
import {
  Trophy,
  Target,
  Clock,
  Calendar,
  CheckCircle,
  Flame,
  Award,
  ChevronRight,
  Shield,
  Zap,
} from 'lucide-react';

interface StudentPersonalViewProps {
  student: Student;
  tournament: Tournament;
  upcomingExam: BeltExam;
  onNavigateTab: (tab: string) => void;
}

export const StudentPersonalView: React.FC<StudentPersonalViewProps> = ({
  student,
  tournament,
  upcomingExam,
  onNavigateTab,
}) => {
  return (
    <div className="space-y-5 pb-20 max-w-2xl mx-auto">
      {/* Student Banner */}
      <div className="p-5 rounded-2xl bg-gradient-to-r from-slate-900 via-slate-900 to-rose-950/40 border border-slate-800 shadow-sm">
        <div className="flex items-start justify-between">
          <div>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-rose-500"></span>
              <span className="text-[10px] font-mono text-rose-400 font-bold uppercase tracking-wider">
                Athlete Training Portal
              </span>
            </div>
            <h2 className="text-xl font-bold text-white mt-1">{student.name}</h2>
            <p className="text-xs text-slate-400">
              {student.batchName} · {student.age} Years Old
            </p>
          </div>

          <BeltBadge rank={student.beltRank} size="md" showKorean={true} />
        </div>

        <div className="grid grid-cols-3 gap-2 mt-4 pt-4 border-t border-slate-800/80 text-center">
          <div className="p-2 rounded-xl bg-slate-950/80 border border-slate-800">
            <span className="text-[10px] text-slate-400 block uppercase">Attendance</span>
            <span className="text-base font-bold font-mono text-emerald-400">
              {student.attendancePercent}%
            </span>
          </div>

          <div className="p-2 rounded-xl bg-slate-950/80 border border-slate-800">
            <span className="text-[10px] text-slate-400 block uppercase">Rank Tenure</span>
            <span className="text-base font-bold font-mono text-white">
              {student.monthsAtCurrentBelt} Mos
            </span>
          </div>

          <div className="p-2 rounded-xl bg-slate-950/80 border border-slate-800">
            <span className="text-[10px] text-slate-400 block uppercase">Exam Status</span>
            <span className="text-base font-bold text-emerald-400">Eligible</span>
          </div>
        </div>
      </div>

      {/* Belt Progression Path & Next Belt */}
      <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-bold text-white flex items-center gap-1.5">
            <Target className="w-4 h-4 text-amber-400" />
            Next Belt Milestone: Black Stripe (1st Gup)
          </h3>
          <span className="text-xs text-emerald-400 font-semibold">95% Ready</span>
        </div>

        <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
          <div className="h-full bg-gradient-to-r from-rose-600 to-amber-500 rounded-full w-[95%]" />
        </div>

        <div className="p-3 rounded-xl bg-slate-950/80 border border-slate-800 space-y-2 text-xs">
          <div className="flex items-center justify-between">
            <span className="text-slate-300">Poomsae Form Focus:</span>
            <span className="font-mono text-blue-300 font-bold">{student.poomsaeFocus}</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-slate-300">Target Sparring Weight:</span>
            <span className="font-mono text-slate-200">Under 59 kg (Junior Division)</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-slate-300">Grading Examination:</span>
            <span className="text-amber-400 font-semibold">08 November 2026 (Winter Cycle)</span>
          </div>
        </div>
      </div>

      {/* Tournament Registration Status */}
      <div className="p-5 rounded-2xl bg-gradient-to-br from-slate-900 to-rose-950/20 border border-slate-800 space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-bold text-white flex items-center gap-1.5">
            <Trophy className="w-4 h-4 text-rose-400" />
            Registered Championship
          </h3>
          <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
            Confirmed Entry
          </span>
        </div>

        <div className="p-3.5 rounded-xl bg-slate-950/80 border border-slate-800 text-xs space-y-2">
          <p className="font-bold text-white text-sm">{tournament.title}</p>
          <div className="flex items-center gap-3 text-slate-400 text-[11px]">
            <span>12 - 14 December 2026</span>
            <span>&middot;</span>
            <span>Thyagaraj Stadium, New Delhi</span>
          </div>
          <div className="flex items-center justify-between pt-2 border-t border-slate-800/80 text-[11px]">
            <span className="text-slate-400">Division: Junior Kyorugi (-59kg)</span>
            <span className="text-emerald-400 font-semibold font-mono">Weigh-in Cleared</span>
          </div>
        </div>
      </div>

      {/* Weekly Training Regimen */}
      <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-3">
        <h3 className="text-sm font-bold text-white flex items-center gap-1.5">
          <Clock className="w-4 h-4 text-blue-400" />
          Weekly Mat Schedule
        </h3>

        <div className="space-y-2 text-xs">
          <div className="p-3 rounded-xl bg-slate-950/80 border border-slate-800 flex items-center justify-between">
            <div>
              <p className="font-semibold text-white">Tue &middot; Thu &middot; Sat</p>
              <p className="text-[11px] text-slate-400">05:30 PM - 07:00 PM · Olympic Tatami Ring 1</p>
            </div>
            <span className="px-2 py-1 rounded bg-blue-500/10 text-blue-400 font-mono text-[11px]">
              Coach Vikram
            </span>
          </div>

          <div className="p-3 rounded-xl bg-slate-950/80 border border-slate-800 flex items-center justify-between">
            <div>
              <p className="font-semibold text-white">Sunday Elite Sparring Drills</p>
              <p className="text-[11px] text-slate-400">07:30 AM - 09:30 AM · Full Arena</p>
            </div>
            <span className="px-2 py-1 rounded bg-rose-500/10 text-rose-400 font-mono text-[11px]">
              Tournament Squad
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
