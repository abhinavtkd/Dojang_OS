import React, { useState } from 'react';
import { BeltExam, Student, BeltRank, ExamEvaluation } from '../types';
import { BeltBadge } from '../components/BeltBadge';
import { NEXT_BELT_MAP, POOMSAE_SYLLABUS } from '../utils/beltColors';
import {
  Award,
  Calendar,
  CheckCircle,
  AlertCircle,
  FileCheck,
  ChevronRight,
  Shield,
  Clock,
  Sparkles,
  Printer,
} from 'lucide-react';

interface BeltGradingViewProps {
  exam: BeltExam;
  students: Student[];
  onPromoteStudent: (studentId: string, newBelt: BeltRank) => void;
  onOpenCertificate: (studentName: string, belt: BeltRank) => void;
}

export const BeltGradingView: React.FC<BeltGradingViewProps> = ({
  exam,
  students,
  onPromoteStudent,
  onOpenCertificate,
}) => {
  const [filterEligibility, setFilterEligibility] = useState<'ALL' | 'ELIGIBLE' | 'PROMOTED'>('ELIGIBLE');
  const [activeScoringStudentId, setActiveScoringStudentId] = useState<string | null>(null);

  // Score states
  const [scores, setScores] = useState<
    Record<
      string,
      {
        poomsae: number;
        kyorugi: number;
        breaking: number;
        terminology: number;
      }
    >
  >({
    'stu-01': { poomsae: 23, kyorugi: 21, breaking: 24, terminology: 22 },
    'stu-09': { poomsae: 24, kyorugi: 23, breaking: 22, terminology: 24 },
    'stu-16': { poomsae: 25, kyorugi: 24, breaking: 25, terminology: 23 },
    'stu-20': { poomsae: 24, kyorugi: 25, breaking: 23, terminology: 24 },
  });

  const [promotedStudentIds, setPromotedStudentIds] = useState<string[]>([]);
  const [promotionToast, setPromotionToast] = useState<string | null>(null);

  // Student eligibility mapping
  const candidateList = students.map((s) => {
    const isAttendanceEligible = s.attendancePercent >= exam.minAttendancePercent;
    const isMonthsEligible = s.monthsAtCurrentBelt >= exam.minMonthsRequired;
    const isEligible = isAttendanceEligible && isMonthsEligible;
    const isPromoted = promotedStudentIds.includes(s.id);
    const targetBelt = NEXT_BELT_MAP[s.beltRank] || s.beltRank;

    const studentScore = scores[s.id] || { poomsae: 20, kyorugi: 20, breaking: 20, terminology: 20 };
    const totalScore = studentScore.poomsae + studentScore.kyorugi + studentScore.breaking + studentScore.terminology;

    return {
      student: s,
      isEligible,
      isAttendanceEligible,
      isMonthsEligible,
      isPromoted,
      targetBelt,
      scores: studentScore,
      totalScore,
    };
  });

  const filteredCandidates = candidateList.filter((c) => {
    if (filterEligibility === 'ELIGIBLE') return c.isEligible && !c.isPromoted;
    if (filterEligibility === 'PROMOTED') return c.isPromoted;
    return true;
  });

  const handlePromote = (studentId: string, studentName: string, targetBelt: BeltRank) => {
    setPromotedStudentIds((prev) => [...prev, studentId]);
    onPromoteStudent(studentId, targetBelt);
    setPromotionToast(`${studentName} successfully promoted to ${targetBelt}! Certificate generated.`);
    setTimeout(() => setPromotionToast(null), 4000);
  };

  return (
    <div className="space-y-6 pb-16 max-w-7xl mx-auto">
      {/* Exam Banner */}
      <div className="p-5 rounded-2xl bg-gradient-to-r from-slate-900 via-slate-900 to-amber-950/40 border border-slate-800 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase bg-amber-500/20 text-amber-300 border border-amber-500/30">
              Official Kukkiwon Exam
            </span>
            <span className="text-xs font-mono text-slate-400">
              Exam Date: 08 November 2026 (In 3 Weeks)
            </span>
          </div>
          <h2 className="text-xl font-bold text-white mt-1">{exam.title}</h2>
          <p className="text-xs text-slate-400">
            Venue: {exam.location} · Chief Examiner: {exam.examiner}
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="p-3 rounded-xl bg-slate-950/80 border border-slate-800 text-right">
            <span className="text-[10px] text-slate-400 block uppercase">Eligibility Threshold</span>
            <span className="text-xs font-mono font-bold text-emerald-400">
              &ge; 80% Att &middot; &ge; 3 Months
            </span>
          </div>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-2 p-1 bg-slate-900 border border-slate-800 rounded-xl">
          <button
            onClick={() => setFilterEligibility('ELIGIBLE')}
            className={`px-3.5 py-1.5 text-xs font-semibold rounded-lg transition-colors ${
              filterEligibility === 'ELIGIBLE'
                ? 'bg-amber-400 text-slate-950 font-bold shadow-xs'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Eligible to Grade ({candidateList.filter((c) => c.isEligible && !c.isPromoted).length})
          </button>
          <button
            onClick={() => setFilterEligibility('ALL')}
            className={`px-3.5 py-1.5 text-xs font-semibold rounded-lg transition-colors ${
              filterEligibility === 'ALL'
                ? 'bg-slate-800 text-white'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            All Students ({candidateList.length})
          </button>
          <button
            onClick={() => setFilterEligibility('PROMOTED')}
            className={`px-3.5 py-1.5 text-xs font-semibold rounded-lg transition-colors ${
              filterEligibility === 'PROMOTED'
                ? 'bg-emerald-950 text-emerald-300 border border-emerald-800'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Promoted & Certificates ({promotedStudentIds.length})
          </button>
        </div>

        <div className="text-xs text-slate-400 hidden sm:block">
          Auto-evaluated against Kukkiwon Technical Rubric
        </div>
      </div>

      {/* Candidates Table */}
      <div className="overflow-x-auto rounded-2xl border border-slate-800 bg-slate-900 shadow-xs">
        <table className="w-full text-left text-xs">
          <thead>
            <tr className="border-b border-slate-800 bg-slate-950/70 text-slate-400">
              <th className="py-3.5 px-4 font-semibold">Student & Batch</th>
              <th className="py-3.5 px-4 font-semibold">Current Rank</th>
              <th className="py-3.5 px-4 font-semibold">Target Belt</th>
              <th className="py-3.5 px-4 font-semibold text-right">Attendance</th>
              <th className="py-3.5 px-4 font-semibold text-right">Time at Belt</th>
              <th className="py-3.5 px-4 font-semibold text-center">Score (Max 100)</th>
              <th className="py-3.5 px-4 font-semibold text-right">Promotion Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800/60">
            {filteredCandidates.map(
              ({ student, isEligible, isPromoted, targetBelt, scores, totalScore }) => {
                const isScoringOpen = activeScoringStudentId === student.id;

                return (
                  <React.Fragment key={student.id}>
                    <tr className="hover:bg-slate-800/40 transition-colors">
                      {/* Name & Batch */}
                      <td className="py-3.5 px-4">
                        <span className="font-semibold text-white text-sm block">
                          {student.name}
                        </span>
                        <span className="text-[11px] text-slate-400">
                          {student.batchName} · Age {student.age}
                        </span>
                      </td>

                      {/* Current Belt */}
                      <td className="py-3.5 px-4">
                        <BeltBadge rank={student.beltRank} size="sm" />
                      </td>

                      {/* Target Belt */}
                      <td className="py-3.5 px-4">
                        <div className="flex items-center gap-1.5">
                          <ChevronRight className="w-3.5 h-3.5 text-slate-500" />
                          <BeltBadge rank={targetBelt} size="sm" />
                        </div>
                      </td>

                      {/* Attendance */}
                      <td className="py-3.5 px-4 text-right">
                        <span
                          className={`font-mono font-bold ${
                            student.attendancePercent >= exam.minAttendancePercent
                              ? 'text-emerald-400'
                              : 'text-rose-400'
                          }`}
                        >
                          {student.attendancePercent}%
                        </span>
                      </td>

                      {/* Months */}
                      <td className="py-3.5 px-4 text-right font-mono">
                        <span
                          className={
                            student.monthsAtCurrentBelt >= exam.minMonthsRequired
                              ? 'text-slate-200'
                              : 'text-amber-400'
                          }
                        >
                          {student.monthsAtCurrentBelt} mos
                        </span>
                      </td>

                      {/* Total Score */}
                      <td className="py-3.5 px-4 text-center">
                        <button
                          onClick={() =>
                            setActiveScoringStudentId(isScoringOpen ? null : student.id)
                          }
                          className="px-2 py-1 rounded bg-slate-950 border border-slate-800 font-mono font-bold text-amber-300 hover:border-amber-400 text-xs"
                          title="Click to enter/view individual rubrics"
                        >
                          {totalScore} / 100
                        </button>
                      </td>

                      {/* Actions */}
                      <td className="py-3.5 px-4 text-right">
                        <div className="flex items-center justify-end gap-2">
                          {isPromoted ? (
                            <button
                              onClick={() => onOpenCertificate(student.name, targetBelt)}
                              className="px-3 py-1.5 rounded-lg bg-amber-400/20 text-amber-300 hover:bg-amber-400 hover:text-slate-950 border border-amber-400/40 font-semibold text-xs flex items-center gap-1.5 transition-colors"
                            >
                              <Printer className="w-3.5 h-3.5" />
                              View Certificate
                            </button>
                          ) : isEligible ? (
                            <button
                              onClick={() => handlePromote(student.id, student.name, targetBelt)}
                              className="px-3.5 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs flex items-center gap-1.5 transition-colors shadow-xs"
                            >
                              <FileCheck className="w-3.5 h-3.5" />
                              Approve Promotion
                            </button>
                          ) : (
                            <span className="text-slate-500 text-[11px]">Criteria pending</span>
                          )}
                        </div>
                      </td>
                    </tr>

                    {/* Expandable Grading Form Rubric */}
                    {isScoringOpen && (
                      <tr className="bg-slate-950/80">
                        <td colSpan={7} className="p-4 border-t border-slate-800">
                          <div className="max-w-3xl mx-auto space-y-3">
                            <div className="flex items-center justify-between">
                              <h4 className="font-bold text-white text-xs">
                                Grading Rubric for {student.name} &rarr; Promoted to {targetBelt}
                              </h4>
                              <span className="text-[11px] text-slate-400 font-mono">
                                Examiner: Master Nikhil Tyagi, 5th Dan
                              </span>
                            </div>

                            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
                              {/* Poomsae */}
                              <div className="p-2.5 rounded-xl bg-slate-900 border border-slate-800">
                                <label className="text-slate-400 block text-[10px] uppercase font-bold">
                                  Poomsae Form (25)
                                </label>
                                <input
                                  type="number"
                                  min={0}
                                  max={25}
                                  value={scores.poomsae}
                                  onChange={(e) =>
                                    setScores((prev) => ({
                                      ...prev,
                                      [student.id]: {
                                        ...scores,
                                        poomsae: Number(e.target.value),
                                      },
                                    }))
                                  }
                                  className="w-full mt-1 px-2 py-1 bg-slate-950 border border-slate-800 rounded font-mono text-white text-sm"
                                />
                                <span className="text-[10px] text-slate-500 mt-0.5 block">
                                  Stances & Power
                                </span>
                              </div>

                              {/* Kyorugi */}
                              <div className="p-2.5 rounded-xl bg-slate-900 border border-slate-800">
                                <label className="text-slate-400 block text-[10px] uppercase font-bold">
                                  Kyorugi Sparring (25)
                                </label>
                                <input
                                  type="number"
                                  min={0}
                                  max={25}
                                  value={scores.kyorugi}
                                  onChange={(e) =>
                                    setScores((prev) => ({
                                      ...prev,
                                      [student.id]: {
                                        ...scores,
                                        kyorugi: Number(e.target.value),
                                      },
                                    }))
                                  }
                                  className="w-full mt-1 px-2 py-1 bg-slate-950 border border-slate-800 rounded font-mono text-white text-sm"
                                />
                                <span className="text-[10px] text-slate-500 mt-0.5 block">
                                  Agility & Footwork
                                </span>
                              </div>

                              {/* Breaking / Kyukpa */}
                              <div className="p-2.5 rounded-xl bg-slate-900 border border-slate-800">
                                <label className="text-slate-400 block text-[10px] uppercase font-bold">
                                  Kyukpa Breaking (25)
                                </label>
                                <input
                                  type="number"
                                  min={0}
                                  max={25}
                                  value={scores.breaking}
                                  onChange={(e) =>
                                    setScores((prev) => ({
                                      ...prev,
                                      [student.id]: {
                                        ...scores,
                                        breaking: Number(e.target.value),
                                      },
                                    }))
                                  }
                                  className="w-full mt-1 px-2 py-1 bg-slate-950 border border-slate-800 rounded font-mono text-white text-sm"
                                />
                                <span className="text-[10px] text-slate-500 mt-0.5 block">
                                  Pine board accuracy
                                </span>
                              </div>

                              {/* Korean Terminology */}
                              <div className="p-2.5 rounded-xl bg-slate-900 border border-slate-800">
                                <label className="text-slate-400 block text-[10px] uppercase font-bold">
                                  Terminology & Discipline (25)
                                </label>
                                <input
                                  type="number"
                                  min={0}
                                  max={25}
                                  value={scores.terminology}
                                  onChange={(e) =>
                                    setScores((prev) => ({
                                      ...prev,
                                      [student.id]: {
                                        ...scores,
                                        terminology: Number(e.target.value),
                                      },
                                    }))
                                  }
                                  className="w-full mt-1 px-2 py-1 bg-slate-950 border border-slate-800 rounded font-mono text-white text-sm"
                                />
                                <span className="text-[10px] text-slate-500 mt-0.5 block">
                                  Korean terms & Bows
                                </span>
                              </div>
                            </div>
                          </div>
                        </td>
                      </tr>
                    )}
                  </React.Fragment>
                );
              }
            )}
          </tbody>
        </table>
      </div>

      {/* Promotion Toast */}
      {promotionToast && (
        <div className="fixed bottom-20 left-1/2 -translate-x-1/2 z-50 px-5 py-3 rounded-xl bg-emerald-600 text-white font-semibold text-xs shadow-2xl flex items-center gap-2 animate-in fade-in duration-200">
          <CheckCircle className="w-4 h-4" />
          <span>{promotionToast}</span>
        </div>
      )}
    </div>
  );
};
