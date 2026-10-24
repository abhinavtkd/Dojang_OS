import React, { useState } from 'react';
import { Student, FeeInvoice, Announcement } from '../types';
import { BeltBadge } from '../components/BeltBadge';
import { POOMSAE_SYLLABUS } from '../utils/beltColors';
import {
  Users,
  CreditCard,
  IndianRupee,
  Clock,
  Calendar,
  CheckCircle,
  Bell,
  Award,
  ShieldCheck,
  ChevronRight,
  ArrowRight,
  FileText,
  AlertTriangle,
  QrCode,
} from 'lucide-react';

interface ParentPortalViewProps {
  students: Student[];
  invoices: FeeInvoice[];
  announcements: Announcement[];
  onOpenReceipt: (invoice: FeeInvoice) => void;
  onPayFee: (studentId: string, invoiceId?: string) => void;
}

export const ParentPortalView: React.FC<ParentPortalViewProps> = ({
  students,
  invoices,
  announcements,
  onOpenReceipt,
  onPayFee,
}) => {
  // Sunita Sharma has Aarav (stu-01) and Ananya (stu-09)
  const [selectedChildId, setSelectedChildId] = useState<string>('stu-01');
  const [paySuccessToast, setPaySuccessToast] = useState(false);

  const myChildren = students.filter(
    (s) => s.id === 'stu-01' || s.id === 'stu-09'
  );

  const activeChild = myChildren.find((c) => c.id === selectedChildId) || myChildren[0] || students[0];
  const childInvoices = invoices.filter((i) => i.studentId === activeChild?.id);
  const pendingInvoice = childInvoices.find((i) => i.status !== 'Paid');
  const latestPaidInvoice = childInvoices.find((i) => i.status === 'Paid');

  const handlePayChildFee = () => {
    if (activeChild) {
      onPayFee(activeChild.id, pendingInvoice?.id);
      setPaySuccessToast(true);
      setTimeout(() => setPaySuccessToast(false), 4000);
    }
  };

  return (
    <div className="space-y-5 pb-20 max-w-2xl mx-auto">
      {/* Top Banner: Parent Identity & Multi-Child Switcher */}
      <div className="p-4 rounded-2xl bg-gradient-to-r from-slate-900 via-slate-900 to-emerald-950/40 border border-slate-800 shadow-sm">
        <div className="flex items-center justify-between">
          <div>
            <span className="text-[10px] font-mono text-emerald-400 font-bold uppercase tracking-wider block">
              Guardian Portal · Mobile View
            </span>
            <h2 className="text-lg font-bold text-white mt-0.5">Welcome, Sunita Sharma</h2>
            <p className="text-xs text-slate-400">Managing 2 enrolled martial artists</p>
          </div>

          <div className="w-9 h-9 rounded-full bg-emerald-600/20 border border-emerald-500/40 text-emerald-400 font-bold text-xs flex items-center justify-center">
            SS
          </div>
        </div>

        {/* Multi-Child Switcher Tabs (Ergonomic Touch Targets) */}
        <div className="mt-4 pt-3 border-t border-slate-800/80">
          <label className="block text-[11px] font-medium text-slate-400 mb-2">
            Switch Child's Profile:
          </label>
          <div className="grid grid-cols-2 gap-2">
            {myChildren.map((child) => {
              const isSelected = child.id === activeChild?.id;
              return (
                <button
                  key={child.id}
                  onClick={() => setSelectedChildId(child.id)}
                  className={`p-2.5 rounded-xl text-left border transition-all ${
                    isSelected
                      ? 'bg-emerald-950/60 border-emerald-500 shadow-xs'
                      : 'bg-slate-950 border-slate-800 hover:border-slate-700'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-xs text-white truncate block">
                      {child.name}
                    </span>
                    <span className="text-[10px] font-mono text-slate-400">{child.age} yrs</span>
                  </div>
                  <div className="flex items-center gap-1.5 mt-1">
                    <BeltBadge rank={child.beltRank} size="sm" />
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {activeChild && (
        <>
          {/* Active Child Overview Card */}
          <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
            <div className="flex items-start justify-between">
              <div>
                <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400">
                  {activeChild.batchName}
                </span>
                <h3 className="text-xl font-bold text-white mt-0.5">{activeChild.name}</h3>
                <p className="text-xs text-slate-400 mt-0.5">
                  Assigned Instructor: Coach Vikram Singh & Priya Sen
                </p>
              </div>

              <BeltBadge rank={activeChild.beltRank} size="md" showKorean={true} />
            </div>

            {/* Attendance Progress Ring & Stats */}
            <div className="p-3.5 rounded-xl bg-slate-950/80 border border-slate-800 flex items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-center font-black font-mono text-emerald-400 text-sm">
                  {activeChild.attendancePercent}%
                </div>
                <div>
                  <p className="font-semibold text-white text-xs">Monthly Class Attendance</p>
                  <p className="text-[11px] text-slate-400">
                    {activeChild.classesAttendedThisMonth} of {activeChild.totalClassesThisMonth} classes attended
                  </p>
                </div>
              </div>

              <span className="text-[11px] font-semibold text-emerald-400 shrink-0">
                Punctual &middot; High
              </span>
            </div>

            {/* Belt Syllabus Progress */}
            <div className="p-3.5 rounded-xl bg-slate-950/80 border border-slate-800 space-y-2 text-xs">
              <div className="flex items-center justify-between">
                <span className="font-semibold text-slate-300 flex items-center gap-1.5">
                  <Award className="w-3.5 h-3.5 text-amber-400" />
                  Current Poomsae Form
                </span>
                <span className="font-mono text-amber-300 font-bold">
                  {activeChild.poomsaeFocus}
                </span>
              </div>
              <p className="text-[11px] text-slate-400 leading-relaxed">
                Mastery requirement for Winter Belt Promotion: Ap Koobi stances, snap kicks, and Korean discipline commands.
              </p>
            </div>
          </div>

          {/* Fee & Billing Card (Flagship User Flow C: Parent pays fee) */}
          <div className="p-5 rounded-2xl bg-gradient-to-br from-slate-900 to-rose-950/20 border border-slate-800 space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="text-sm font-bold text-white flex items-center gap-1.5">
                  <CreditCard className="w-4 h-4 text-rose-400" />
                  Dojang Tuition Fee
                </h4>
                <p className="text-xs text-slate-400">October 2026 Training Cycle</p>
              </div>

              <span
                className={`px-2.5 py-1 rounded text-xs font-bold font-mono ${
                  activeChild.feeStatus === 'Paid'
                    ? 'bg-emerald-950 text-emerald-400 border border-emerald-800'
                    : 'bg-rose-950 text-rose-400 border border-rose-800'
                }`}
              >
                {activeChild.feeStatus.toUpperCase()}
              </span>
            </div>

            {activeChild.feeStatus !== 'Paid' ? (
              <div className="p-4 rounded-xl bg-slate-950 border border-rose-900/40 space-y-3">
                <div className="flex justify-between items-baseline">
                  <span className="text-xs text-slate-300">Outstanding Balance:</span>
                  <span className="text-2xl font-black font-mono text-rose-400">
                    ₹{activeChild.feeAmountDue.toLocaleString('en-IN')}.00
                  </span>
                </div>
                <div className="text-[11px] text-slate-400 flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5 text-rose-400" />
                  <span>Due on {activeChild.feeDueDate} (Immediate Clearance Requested)</span>
                </div>

                {/* Instant 1-Tap UPI Payment Button */}
                <button
                  type="button"
                  onClick={handlePayChildFee}
                  className="w-full h-12 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-lg shadow-emerald-950/60 active:scale-95 transition-all"
                >
                  <IndianRupee className="w-4 h-4" />
                  Pay ₹{activeChild.feeAmountDue} via UPI / NetBanking
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            ) : (
              <div className="p-4 rounded-xl bg-slate-950 border border-emerald-900/40 space-y-2 text-xs">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-emerald-400 font-semibold">
                    <CheckCircle className="w-4 h-4" />
                    <span>Fees for this month are fully settled</span>
                  </div>
                  {latestPaidInvoice && (
                    <button
                      onClick={() => onOpenReceipt(latestPaidInvoice)}
                      className="px-3 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold flex items-center gap-1 border border-slate-700 transition-colors"
                    >
                      <FileText className="w-3.5 h-3.5" />
                      View Receipt
                    </button>
                  )}
                </div>
                <p className="text-[11px] text-slate-400">
                  Next billing scheduled for 05 November 2026.
                </p>
              </div>
            )}
          </div>

          {/* Academy Announcements Feed */}
          <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-3">
            <h4 className="text-sm font-bold text-white flex items-center gap-1.5">
              <Bell className="w-4 h-4 text-blue-400" />
              Academy Announcements & Timings
            </h4>

            <div className="space-y-2.5">
              {announcements.slice(0, 2).map((ann) => (
                <div
                  key={ann.id}
                  className="p-3 rounded-xl bg-slate-950/80 border border-slate-800/80 text-xs space-y-1"
                >
                  <div className="flex items-center justify-between">
                    <h5 className="font-semibold text-white text-xs">{ann.title}</h5>
                    <span className="text-[10px] text-slate-500 font-mono">{ann.date}</span>
                  </div>
                  <p className="text-[11px] text-slate-400 leading-relaxed">{ann.content}</p>
                </div>
              ))}
            </div>
          </div>
        </>
      )}

      {/* Payment Success Toast */}
      {paySuccessToast && (
        <div className="fixed bottom-20 left-1/2 -translate-x-1/2 z-50 px-5 py-3 rounded-xl bg-emerald-600 text-white font-semibold text-xs shadow-2xl flex items-center gap-2 animate-in fade-in duration-200">
          <CheckCircle className="w-4 h-4" />
          <span>Payment of ₹2,500 recorded! Official receipt generated.</span>
        </div>
      )}
    </div>
  );
};
