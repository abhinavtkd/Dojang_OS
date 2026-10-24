import React from 'react';
import { BeltRank, OrganizationConfig } from '../types';
import { BELT_CONFIGS } from '../utils/beltColors';
import { X, Award, Printer, ShieldCheck, Download } from 'lucide-react';

interface CertificateModalProps {
  studentName: string;
  promotedBelt: BeltRank;
  examDate?: string;
  certificateNo?: string;
  orgConfig?: OrganizationConfig;
  onClose: () => void;
}

export const CertificateModal: React.FC<CertificateModalProps> = ({
  studentName,
  promotedBelt,
  examDate = '08 November 2026',
  certificateNo = 'TMA-TKD-2026-084',
  orgConfig,
  onClose,
}) => {
  const beltConfig = BELT_CONFIGS[promotedBelt] || {
    shortLabel: promotedBelt,
    koreanName: 'Tae Kwon Do',
  };

  const academyName = orgConfig?.name || 'Thrust Martial Arts Academy';
  const academySocial = orgConfig?.instagram || '@thrust_martial_arts_academy';
  const headmasterName = orgConfig?.headmaster || 'Master Nikhil Tyagi';
  const headmasterRank = orgConfig?.headmasterRank || '5th Dan Black Belt';

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-slate-900 border border-slate-800 rounded-2xl w-full max-w-2xl shadow-2xl overflow-hidden flex flex-col max-h-[92vh]">
        {/* Header */}
        <div className="px-6 py-3.5 border-b border-slate-800 flex items-center justify-between bg-slate-950">
          <div className="flex items-center gap-2 text-amber-400">
            <Award className="w-5 h-5" />
            <h3 className="text-sm font-semibold text-slate-100">Kukkiwon Belt Promotion Certificate</h3>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Certificate Display Area (Printable) */}
        <div className="p-6 overflow-y-auto bg-slate-950/70 flex justify-center">
          <div className="w-full max-w-xl bg-gradient-to-b from-[#faf8f5] to-[#f4ede4] text-slate-900 p-8 rounded-xl shadow-2xl border-8 border-double border-amber-900/30 relative overflow-hidden select-none">
            {/* Traditional Korean corner accents */}
            <div className="absolute top-2 left-2 text-amber-900/40 text-xs font-serif font-black tracking-widest">
              태권도
            </div>
            <div className="absolute top-2 right-2 text-amber-900/40 text-xs font-serif font-black tracking-widest">
              국기원
            </div>
            <div className="absolute bottom-2 left-2 text-amber-900/40 text-xs font-serif font-black tracking-widest">
              정의·인내
            </div>
            <div className="absolute bottom-2 right-2 text-amber-900/40 text-xs font-serif font-black tracking-widest">
              극기·백절불굴
            </div>

            {/* Inner Border */}
            <div className="border border-amber-900/20 p-6 text-center relative">
              {/* Emblem */}
              <div className="flex justify-center mb-3">
                <div className="w-14 h-14 rounded-full bg-slate-900 text-amber-400 border-2 border-amber-500/80 flex items-center justify-center shadow-md">
                  <span className="font-black text-lg tracking-wider">跆拳</span>
                </div>
              </div>

              <p className="text-[11px] font-bold tracking-[0.25em] text-amber-900/80 uppercase">
                {academyName}
              </p>
              <h1 className="text-2xl font-black font-serif text-slate-900 tracking-tight mt-1 mb-1">
                CERTIFICATE OF RANK PROMOTION
              </h1>
              <p className="text-[11px] text-slate-600 italic mb-5">
                Affiliated to Kukkiwon World Taekwondo Headquarters · {academySocial}
              </p>

              <p className="text-xs text-slate-700 leading-relaxed max-w-md mx-auto">
                This certifies that having successfully demonstrated exemplary physical proficiency,
                technical mastery in Poomsae forms, sparring discipline, and unwavering adherence to the Tenets of
                Taekwondo (Courtesy, Integrity, Perseverance, Self-Control, Indomitable Spirit):
              </p>

              <div className="my-5 py-2 border-b-2 border-amber-900/30 max-w-xs mx-auto">
                <h2 className="text-xl font-bold font-serif text-slate-950 uppercase tracking-wide">
                  {studentName}
                </h2>
              </div>

              <p className="text-xs text-slate-700">has been formally promoted to the honorable grade of</p>

              <div className="my-3 inline-block px-5 py-2 bg-slate-900 text-amber-300 font-black text-base rounded border border-amber-500 shadow-sm">
                {promotedBelt}
              </div>

              <p className="text-[11px] text-slate-500 font-mono mt-1">
                Korean Designation: {beltConfig.koreanName}
              </p>

              {/* Signatures & Seal */}
              <div className="mt-8 pt-4 grid grid-cols-2 gap-6 text-center items-end border-t border-amber-900/20 text-[11px]">
                <div>
                  <div className="font-serif italic font-bold text-slate-800 text-sm">{headmasterName}</div>
                  <p className="text-slate-600 font-semibold text-[10px]">Head of Academy & {headmasterRank}</p>
                  <p className="text-slate-500 text-[9px]">{academyName}</p>
                </div>

                <div className="flex flex-col items-center">
                  <div className="w-12 h-12 rounded-full border-2 border-dashed border-rose-800/80 flex items-center justify-center text-[10px] text-rose-800 font-bold uppercase rotate-[-12deg] mb-1">
                    OFFICIAL<br />SEAL
                  </div>
                  <p className="text-slate-600 font-semibold text-[10px]">Awarded: {examDate}</p>
                  <p className="text-slate-500 font-mono text-[9px]">Reg: {certificateNo}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-slate-800 bg-slate-950 flex items-center justify-between">
          <div className="flex items-center gap-1.5 text-xs text-slate-400">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>Kukkiwon & Taekwondo Federation of India standard record</span>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={onClose}
              className="px-4 py-2 text-xs font-medium text-slate-300 hover:text-white rounded-lg hover:bg-slate-800 transition-colors"
            >
              Done
            </button>
            <button
              onClick={handlePrint}
              className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-slate-900 bg-amber-400 hover:bg-amber-300 rounded-lg transition-colors shadow-xs"
            >
              <Printer className="w-3.5 h-3.5" />
              Print Certificate
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
