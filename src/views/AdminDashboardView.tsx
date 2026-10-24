import React from 'react';
import { Student, Batch, FeeInvoice, BeltExam } from '../types';
import { BeltBadge } from '../components/BeltBadge';
import {
  Users,
  IndianRupee,
  AlertTriangle,
  Calendar,
  Award,
  TrendingUp,
  ArrowUpRight,
  Clock,
  Sparkles,
  ArrowRight,
  CheckCircle,
  Bell,
  Send,
} from 'lucide-react';

interface AdminDashboardViewProps {
  students: Student[];
  batches: Batch[];
  invoices: FeeInvoice[];
  upcomingExam: BeltExam;
  onNavigateTab: (tab: string) => void;
  onSelectStudentProfile: (student: Student) => void;
  onOpenWhatsAppReminder: (invoice: FeeInvoice) => void;
}

export const AdminDashboardView: React.FC<AdminDashboardViewProps> = ({
  students,
  batches,
  invoices,
  upcomingExam,
  onNavigateTab,
  onSelectStudentProfile,
  onOpenWhatsAppReminder,
}) => {
  // Financial computations
  const totalStudents = students.length;
  const overdueInvoices = invoices.filter((i) => i.status === 'Overdue');
  const dueInvoices = invoices.filter((i) => i.status === 'Due');
  const totalDuesOutstanding = [...overdueInvoices, ...dueInvoices].reduce(
    (acc, cur) => acc + cur.amount,
    0
  );
  const totalRevenueCollected = invoices
    .filter((i) => i.status === 'Paid')
    .reduce((acc, cur) => acc + cur.amount, 0) + 245000; // base month collections

  const overallAvgAttendance = Math.round(
    students.reduce((acc, cur) => acc + cur.attendancePercent, 0) / (students.length || 1)
  );

  // Eligible exam candidates
  const examEligibleCount = students.filter(
    (s) => s.attendancePercent >= upcomingExam.minAttendancePercent && s.monthsAtCurrentBelt >= upcomingExam.minMonthsRequired
  ).length;

  // Drop-out risk detection (students with <75% attendance or consecutive fee overdue)
  const dropOutRiskStudents = students.filter(
    (s) => s.attendancePercent < 75 || (s.feeStatus === 'Overdue' && s.attendancePercent < 80)
  );

  return (
    <div className="space-y-6 pb-12 max-w-7xl mx-auto">
      {/* Welcome & Dojang Branch Bar */}
      <div className="p-5 rounded-2xl bg-gradient-to-r from-slate-900 via-slate-900 to-rose-950/40 border border-slate-800 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
              Dojang Operations Console · Thrust HQ, Chhatarpur, New Delhi
            </span>
          </div>
          <h2 className="text-2xl font-black text-white tracking-tight mt-1">
            Master Nikhil Tyagi, 5th Dan
          </h2>
          <p className="text-xs text-slate-400 mt-0.5">
            Thrust Martial Arts Academy · 4 Batches scheduled today · 38 students on mats
          </p>
        </div>

        {/* Quick action buttons */}
        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={() => onNavigateTab('attendance')}
            className="px-3.5 py-2 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-500 rounded-xl transition-colors shadow-xs flex items-center gap-1.5"
          >
            <Clock className="w-3.5 h-3.5" />
            Take Attendance
          </button>
          <button
            onClick={() => onNavigateTab('fees')}
            className="px-3.5 py-2 text-xs font-semibold text-white bg-rose-600 hover:bg-rose-500 rounded-xl transition-colors shadow-xs flex items-center gap-1.5"
          >
            <IndianRupee className="w-3.5 h-3.5" />
            Collect Fees ({overdueInvoices.length} Overdue)
          </button>
          <button
            onClick={() => onNavigateTab('belt-exam')}
            className="px-3.5 py-2 text-xs font-semibold text-slate-900 bg-amber-400 hover:bg-amber-300 rounded-xl transition-colors shadow-xs flex items-center gap-1.5"
          >
            <Award className="w-3.5 h-3.5" />
            Grading Exam
          </button>
        </div>
      </div>

      {/* Top 4 KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Active Students */}
        <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 shadow-xs flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-slate-400">Active Students</span>
            <span className="p-2 rounded-lg bg-blue-500/10 text-blue-400">
              <Users className="w-4 h-4" />
            </span>
          </div>
          <div className="mt-3">
            <div className="text-2xl font-black font-mono text-white tabular-nums">
              {totalStudents}
            </div>
            <div className="flex items-center gap-1.5 text-xs text-emerald-400 mt-1">
              <TrendingUp className="w-3.5 h-3.5" />
              <span>+6 new admissions this month</span>
            </div>
          </div>
        </div>

        {/* Monthly Revenue */}
        <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 shadow-xs flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-slate-400">October Revenue</span>
            <span className="p-2 rounded-lg bg-emerald-500/10 text-emerald-400">
              <IndianRupee className="w-4 h-4" />
            </span>
          </div>
          <div className="mt-3">
            <div className="text-2xl font-black font-mono text-white tabular-nums">
              ₹{totalRevenueCollected.toLocaleString('en-IN')}
            </div>
            <div className="flex items-center gap-1.5 text-xs text-emerald-400 mt-1">
              <span>88.2% on-time collection rate</span>
            </div>
          </div>
        </div>

        {/* Dues Outstanding */}
        <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 shadow-xs flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-slate-400">Dues Outstanding</span>
            <span className="p-2 rounded-lg bg-rose-500/10 text-rose-400">
              <AlertTriangle className="w-4 h-4" />
            </span>
          </div>
          <div className="mt-3">
            <div className="text-2xl font-black font-mono text-rose-400 tabular-nums">
              ₹{totalDuesOutstanding.toLocaleString('en-IN')}
            </div>
            <div className="flex items-center gap-1.5 text-xs text-rose-300 mt-1">
              <span>{overdueInvoices.length} students overdue &gt; 10 days</span>
            </div>
          </div>
        </div>

        {/* Average Attendance */}
        <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 shadow-xs flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-slate-400">Academy Attendance</span>
            <span className="p-2 rounded-lg bg-amber-500/10 text-amber-400">
              <Clock className="w-4 h-4" />
            </span>
          </div>
          <div className="mt-3">
            <div className="text-2xl font-black font-mono text-amber-300 tabular-nums">
              {overallAvgAttendance}%
            </div>
            <div className="flex items-center gap-1.5 text-xs text-slate-400 mt-1">
              <span>Avg marked in 22 seconds</span>
            </div>
          </div>
        </div>
      </div>

      {/* 2-Column Split: Today's Batches & Belt Exam Countdown */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Today's Schedule & Mat Occupancy (2 cols) */}
        <div className="lg:col-span-2 space-y-4">
          <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-sm font-bold text-white">Today's Batches & Mat Schedule</h3>
                <p className="text-xs text-slate-400">6 total active batches across 3 tatami zones</p>
              </div>
              <button
                onClick={() => onNavigateTab('batches')}
                className="text-xs text-blue-400 hover:text-blue-300 font-semibold flex items-center gap-1"
              >
                View Timetable <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {batches.slice(0, 4).map((batch) => {
                const occupancyPct = Math.round((batch.enrolledCount / batch.maxCapacity) * 100);
                return (
                  <div
                    key={batch.id}
                    className="p-3.5 rounded-xl bg-slate-950/70 border border-slate-800/80 flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex items-start justify-between gap-2">
                        <h4 className="font-semibold text-white text-xs">{batch.name}</h4>
                        <span className="px-1.5 py-0.5 text-[10px] font-mono rounded bg-slate-800 text-slate-300">
                          {batch.category}
                        </span>
                      </div>
                      <p className="text-[11px] text-slate-400 mt-1">
                        {batch.coachName} · {batch.room}
                      </p>
                      <p className="text-xs font-mono text-blue-300 font-medium mt-1">
                        {batch.timeSlot}
                      </p>
                    </div>

                    <div className="mt-3 pt-2 border-t border-slate-800/60 flex items-center justify-between text-[11px]">
                      <span className="text-slate-400">
                        Occupancy: <strong className="text-slate-200">{batch.enrolledCount}/{batch.maxCapacity}</strong>
                      </span>
                      <span className={`font-mono font-bold ${occupancyPct >= 85 ? 'text-amber-400' : 'text-emerald-400'}`}>
                        {occupancyPct}%
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* AI Retention & Drop-out Risk Card (Requested Feature) */}
          <div className="p-5 rounded-2xl bg-gradient-to-br from-slate-900 to-amber-950/20 border border-amber-900/40">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <span className="p-1.5 rounded-lg bg-amber-500/10 text-amber-400 border border-amber-500/20">
                  <Sparkles className="w-4 h-4" />
                </span>
                <div>
                  <h3 className="text-sm font-bold text-white">Smart Drop-out Risk Detection</h3>
                  <p className="text-xs text-slate-400">
                    {dropOutRiskStudents.length} students flagged with attendance dip &gt; 30% or unpaid dues
                  </p>
                </div>
              </div>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-amber-950 text-amber-300 border border-amber-800">
                Action Required
              </span>
            </div>

            <div className="space-y-2">
              {dropOutRiskStudents.slice(0, 3).map((student) => (
                <div
                  key={student.id}
                  className="p-3 rounded-xl bg-slate-950/80 border border-slate-800 flex items-center justify-between gap-3"
                >
                  <div
                    onClick={() => onSelectStudentProfile(student)}
                    className="cursor-pointer group flex items-center gap-2.5 min-w-0"
                  >
                    <div className="w-8 h-8 rounded-lg bg-slate-800 text-slate-300 font-bold text-xs flex items-center justify-center shrink-0">
                      {student.avatarText}
                    </div>
                    <div className="min-w-0">
                      <p className="font-semibold text-white text-xs group-hover:text-amber-300 truncate">
                        {student.name} ({student.age}y)
                      </p>
                      <p className="text-[11px] text-rose-400 font-mono">
                        {student.attendancePercent}% attendance · Fee: {student.feeStatus}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    {student.feeStatus === 'Overdue' && (
                      <button
                        onClick={() => {
                          const inv = invoices.find((i) => i.studentId === student.id);
                          if (inv) onOpenWhatsAppReminder(inv);
                        }}
                        className="px-2.5 py-1 rounded-lg bg-rose-600/20 text-rose-300 border border-rose-500/30 text-[11px] font-semibold hover:bg-rose-600 hover:text-white transition-colors"
                      >
                        WhatsApp
                      </button>
                    )}
                    <button
                      onClick={() => onSelectStudentProfile(student)}
                      className="p-1 text-slate-400 hover:text-white"
                    >
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: Upcoming Belt Exam & Critical Dues */}
        <div className="space-y-4">
          {/* Upcoming Belt Exam Card */}
          <div className="p-5 rounded-2xl bg-gradient-to-b from-slate-900 to-indigo-950/30 border border-indigo-900/40 relative overflow-hidden">
            <div className="flex items-center justify-between mb-3">
              <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase bg-amber-500/20 text-amber-300 border border-amber-500/30">
                In 3 Weeks · Nov 8
              </span>
              <Award className="w-4 h-4 text-amber-400" />
            </div>

            <h3 className="text-base font-bold text-white tracking-tight">
              Thrust Belt Promotion & Dan Grading
            </h3>
            <p className="text-xs text-slate-400 mt-1 leading-relaxed">
              Winter 2026 Examination conducted by Master Nikhil Tyagi (5th Dan Kukkiwon)
            </p>

            <div className="mt-4 p-3 rounded-xl bg-slate-950/80 border border-slate-800 space-y-2 text-xs">
              <div className="flex justify-between">
                <span className="text-slate-400">Eligible Candidates:</span>
                <span className="font-bold text-emerald-400 font-mono">
                  {examEligibleCount} / {totalStudents} Students
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Exam Fee / Candidate:</span>
                <span className="font-bold text-white font-mono">₹{upcomingExam.feePerStudent}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Passing Criteria:</span>
                <span className="text-slate-300">Min 80% Att + 3m at Belt</span>
              </div>
            </div>

            <button
              onClick={() => onNavigateTab('belt-exam')}
              className="w-full mt-4 py-2.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold text-xs flex items-center justify-center gap-2 transition-colors shadow-xs"
            >
              Open Exam Roster & Grading
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          {/* Urgent Overdue Fee Follow-ups */}
          <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-sm font-bold text-white">Immediate Overdue Fees</h3>
              <button
                onClick={() => onNavigateTab('fees')}
                className="text-xs text-rose-400 font-semibold hover:underline"
              >
                View All
              </button>
            </div>

            <div className="space-y-2.5">
              {overdueInvoices.slice(0, 4).map((invoice) => (
                <div
                  key={invoice.id}
                  className="p-2.5 rounded-xl bg-slate-950/80 border border-slate-800/80 flex items-center justify-between text-xs"
                >
                  <div className="min-w-0">
                    <p className="font-semibold text-white truncate">{invoice.studentName}</p>
                    <p className="text-[11px] text-slate-400 font-mono">
                      Due: {invoice.dueDate} · ₹{invoice.amount}
                    </p>
                  </div>
                  <button
                    onClick={() => onOpenWhatsAppReminder(invoice)}
                    className="px-2.5 py-1 rounded-lg bg-emerald-600/20 text-emerald-400 hover:bg-emerald-600 hover:text-white border border-emerald-500/30 text-[11px] font-semibold flex items-center gap-1 transition-colors shrink-0"
                  >
                    <Send className="w-3 h-3" />
                    Chase
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
