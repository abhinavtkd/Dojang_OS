import React from 'react';
import { ActiveRole } from '../types';
import { Users, Clock, Send, CreditCard, Award, Shield, CheckCircle } from 'lucide-react';

interface RoleSwitcherBarProps {
  activeRole: ActiveRole;
  onRoleChange: (role: ActiveRole) => void;
  onRunKeyFlow: (flowId: 'attendance' | 'fees' | 'pay' | 'promote') => void;
  onOpenDesignSystem: () => void;
}

export const RoleSwitcherBar: React.FC<RoleSwitcherBarProps> = ({
  activeRole,
  onRoleChange,
  onRunKeyFlow,
  onOpenDesignSystem,
}) => {
  return (
    <div className="w-full bg-slate-900 border-b border-slate-800 text-xs px-4 sm:px-6 py-2.5">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-3">
        {/* Role Toggle Switcher */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 md:pb-0 scrollbar-none">
          <span className="text-[11px] font-mono text-slate-400 uppercase tracking-wider shrink-0 font-semibold">
            Active Persona:
          </span>
          <div className="flex items-center gap-1 p-0.5 rounded-lg bg-slate-950 border border-slate-800">
            <button
              onClick={() => onRoleChange('admin')}
              className={`px-3 py-1 rounded-md text-xs font-semibold transition-all whitespace-nowrap ${
                activeRole === 'admin'
                  ? 'bg-rose-600 text-white shadow-xs'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              Master (Admin)
            </button>
            <button
              onClick={() => onRoleChange('coach')}
              className={`px-3 py-1 rounded-md text-xs font-semibold transition-all whitespace-nowrap ${
                activeRole === 'coach'
                  ? 'bg-blue-600 text-white shadow-xs'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              Coach Vikram
            </button>
            <button
              onClick={() => onRoleChange('parent')}
              className={`px-3 py-1 rounded-md text-xs font-semibold transition-all whitespace-nowrap ${
                activeRole === 'parent'
                  ? 'bg-emerald-600 text-white shadow-xs'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              Parent Sunita
            </button>
            <button
              onClick={() => onRoleChange('student')}
              className={`px-3 py-1 rounded-md text-xs font-semibold transition-all whitespace-nowrap ${
                activeRole === 'student'
                  ? 'bg-amber-500 text-slate-950 font-bold shadow-xs'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              Student Kabir
            </button>
          </div>
        </div>

        {/* Guided Key User Flows Strip */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 md:pb-0 scrollbar-none">
          <span className="text-[11px] text-slate-400 shrink-0 font-medium hidden lg:inline">
            Test Key Flows:
          </span>

          <button
            onClick={() => onRunKeyFlow('attendance')}
            className="px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-blue-600/30 text-blue-300 hover:text-white border border-slate-700 hover:border-blue-500 transition-colors whitespace-nowrap shrink-0 flex items-center gap-1 text-[11px] font-medium"
            title="Flow A: Coach marks attendance in <30 seconds"
          >
            <Clock className="w-3 h-3 text-blue-400" />
            <span>(a) 30s Attendance</span>
          </button>

          <button
            onClick={() => onRunKeyFlow('fees')}
            className="px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-rose-600/30 text-rose-300 hover:text-white border border-slate-700 hover:border-rose-500 transition-colors whitespace-nowrap shrink-0 flex items-center gap-1 text-[11px] font-medium"
            title="Flow B: Owner chases overdue fees via WhatsApp"
          >
            <Send className="w-3 h-3 text-rose-400" />
            <span>(b) Chase Dues</span>
          </button>

          <button
            onClick={() => onRunKeyFlow('pay')}
            className="px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-emerald-600/30 text-emerald-300 hover:text-white border border-slate-700 hover:border-emerald-500 transition-colors whitespace-nowrap shrink-0 flex items-center gap-1 text-[11px] font-medium"
            title="Flow C: Parent pays fee with 1-tap UPI"
          >
            <CreditCard className="w-3 h-3 text-emerald-400" />
            <span>(c) Parent Pays Fee</span>
          </button>

          <button
            onClick={() => onRunKeyFlow('promote')}
            className="px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-amber-600/30 text-amber-300 hover:text-white border border-slate-700 hover:border-amber-500 transition-colors whitespace-nowrap shrink-0 flex items-center gap-1 text-[11px] font-medium"
            title="Flow D: Owner promotes student after exam and prints certificate"
          >
            <Award className="w-3 h-3 text-amber-400" />
            <span>(d) Promote & Cert</span>
          </button>
        </div>
      </div>
    </div>
  );
};
