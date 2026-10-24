import React from 'react';
import { BELT_CONFIGS } from '../utils/beltColors';
import { BeltBadge } from './BeltBadge';
import { X, Check, AlertTriangle, Shield, CheckCircle, Clock } from 'lucide-react';
import { BeltRank } from '../types';

interface DesignSystemSheetProps {
  isOpen: boolean;
  onClose: () => void;
}

export const DesignSystemSheet: React.FC<DesignSystemSheetProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const sampleBelts: BeltRank[] = [
    'White Belt (10th Gup)',
    'Yellow Belt (8th Gup)',
    'Green Belt (6th Gup)',
    'Blue Belt (4th Gup)',
    'Red Belt (2nd Gup)',
    '1st Poom (Junior Black)',
    '1st Dan Black Belt',
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-slate-900 border border-slate-800 rounded-2xl w-full max-w-4xl shadow-2xl overflow-hidden flex flex-col max-h-[92vh]">
        {/* Header */}
        <div className="px-6 py-4 border-b border-slate-800 flex items-center justify-between bg-slate-950">
          <div className="flex items-center gap-2">
            <span className="p-1.5 rounded-lg bg-rose-500/10 text-rose-400 border border-rose-500/20">
              <Shield className="w-4 h-4" />
            </span>
            <div>
              <h3 className="text-sm font-bold text-slate-100">Thrust Martial Arts Academy Design System Specification</h3>
              <p className="text-xs text-slate-400">Tokens, Belt Rank Semantics, Touch Ergonomics & Components (@thrust_martial_arts_academy)</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto space-y-8 text-xs text-slate-300">
          {/* 1. Philosophy & Color Allocation */}
          <section>
            <h4 className="text-sm font-bold text-white mb-2 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-rose-500"></span>
              1. 60-30-10 Color Architecture & Contrast Discipline
            </h4>
            <p className="text-slate-400 leading-relaxed mb-4">
              Designed specifically for high-glare gym environments and arm’s length smartphone operation during active sparring sessions. Deep navy/charcoal canvas avoids battery drain on coaches’ phones and ensures extreme contrast with crisp white dobok photography and belt badges.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              <div className="p-4 rounded-xl border border-slate-800 bg-slate-950">
                <span className="text-[10px] font-mono text-slate-500 uppercase">60% Neutral Base</span>
                <p className="text-sm font-semibold text-white mt-1">Dojang Navy & Slate</p>
                <div className="h-6 rounded bg-[#090d16] border border-slate-800 mt-2 flex items-center px-2 text-[10px] font-mono text-slate-400">
                  #090D16 · Slate-950
                </div>
              </div>

              <div className="p-4 rounded-xl border border-slate-800 bg-slate-950">
                <span className="text-[10px] font-mono text-slate-500 uppercase">30% Surfaces & Borders</span>
                <p className="text-sm font-semibold text-white mt-1">Tatami Slate & Hairlines</p>
                <div className="h-6 rounded bg-slate-900 border border-slate-800 mt-2 flex items-center px-2 text-[10px] font-mono text-slate-400">
                  #0F172A · Slate-900 / Border Slate-800
                </div>
              </div>

              <div className="p-4 rounded-xl border border-slate-800 bg-slate-950">
                <span className="text-[10px] font-mono text-slate-500 uppercase">10% High-Intent Accents</span>
                <p className="text-sm font-semibold text-white mt-1">Taekwondo Red & Blue</p>
                <div className="grid grid-cols-2 gap-1.5 mt-2">
                  <div className="h-6 rounded bg-rose-600 flex items-center justify-center text-[10px] font-bold text-white">
                    #E11D48 (Hong/Red)
                  </div>
                  <div className="h-6 rounded bg-blue-600 flex items-center justify-center text-[10px] font-bold text-white">
                    #2563EB (Cheong/Blue)
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* 2. Semantic Belt Color System */}
          <section>
            <h4 className="text-sm font-bold text-white mb-2 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-amber-400"></span>
              2. Taekwondo Belt Semantic Rank System
            </h4>
            <p className="text-slate-400 leading-relaxed mb-3">
              Belt colors are restricted to student ranking representation only and are never used as decorative candy badges. Each badge accurately renders the belt’s color, Korean title, and stripe/two-tone division.
            </p>
            <div className="flex flex-wrap gap-2.5 p-4 rounded-xl bg-slate-950 border border-slate-800">
              {sampleBelts.map((b) => (
                <BeltBadge key={b} rank={b} size="md" showKorean={true} />
              ))}
            </div>
          </section>

          {/* 3. 44px Touch Ergonomics (Coach Roster) */}
          <section>
            <h4 className="text-sm font-bold text-white mb-2 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
              3. Touch Ergonomics: 30-Second Attendance Hitboxes
            </h4>
            <p className="text-slate-400 leading-relaxed mb-3">
              Coaches mark attendance with one hand while holding a kicking pad. Minimum touch target is 44×44px (Coach toggles use 48px height) with immediate tactile state updates and soundless visual feedback.
            </p>
            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 flex flex-wrap items-center gap-3">
              <button className="h-12 px-5 rounded-xl bg-emerald-600 text-white font-semibold flex items-center gap-2 text-xs shadow-sm">
                <Check className="w-4 h-4" />
                Present (48px target)
              </button>
              <button className="h-12 px-5 rounded-xl bg-slate-800 text-slate-300 font-semibold flex items-center gap-2 text-xs border border-slate-700">
                <Clock className="w-4 h-4" />
                Late
              </button>
              <button className="h-12 px-5 rounded-xl bg-rose-500/10 text-rose-400 border border-rose-500/30 font-semibold flex items-center gap-2 text-xs">
                <X className="w-4 h-4" />
                Absent
              </button>
              <span className="text-[11px] text-slate-500 font-mono ml-auto">
                Thumb Reach Zone: Bottom 40%
              </span>
            </div>
          </section>

          {/* 4. Fee Status Semantics & Typography */}
          <section className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800">
              <h5 className="font-bold text-white text-xs mb-2">Fee Status System</h5>
              <div className="space-y-2">
                <div className="flex items-center justify-between p-2 rounded-lg bg-emerald-950/40 border border-emerald-800/40">
                  <span className="text-emerald-400 font-bold">PAID</span>
                  <span className="text-slate-400 text-[11px]">Dues cleared, receipt generated</span>
                </div>
                <div className="flex items-center justify-between p-2 rounded-lg bg-amber-950/40 border border-amber-800/40">
                  <span className="text-amber-400 font-bold">DUE SOON</span>
                  <span className="text-slate-400 text-[11px]">Due within 5 days</span>
                </div>
                <div className="flex items-center justify-between p-2 rounded-lg bg-rose-950/40 border border-rose-800/40">
                  <span className="text-rose-400 font-bold">OVERDUE</span>
                  <span className="text-slate-400 text-[11px]">1-tap WhatsApp reminder trigger</span>
                </div>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800">
              <h5 className="font-bold text-white text-xs mb-2">Typography & Numerals</h5>
              <div className="space-y-1.5 text-slate-400 text-[11px]">
                <p>
                  <strong className="text-slate-200">Display & Body:</strong> Plus Jakarta Sans (Variable 300-800)
                </p>
                <p>
                  <strong className="text-slate-200">Data & INR Currency:</strong> JetBrains Mono tabular-nums
                </p>
                <div className="mt-2 p-2 rounded bg-slate-900 border border-slate-800 font-mono text-emerald-400 text-xs">
                  ₹2,500.00 / mo · 94.2% Attendance · 11/12 Classes
                </div>
              </div>
            </div>
          </section>
        </div>

        {/* Footer */}
        <div className="px-6 py-3 border-t border-slate-800 bg-slate-950 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 text-xs font-semibold text-white bg-slate-800 hover:bg-slate-700 rounded-lg transition-colors"
          >
            Close Sheet
          </button>
        </div>
      </div>
    </div>
  );
};
