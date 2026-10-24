import React, { useState, useMemo } from 'react';
import { Student, Batch, FeeStatus, BeltRank } from '../types';
import { BeltBadge } from '../components/BeltBadge';
import {
  Search,
  Filter,
  UserPlus,
  Phone,
  Calendar,
  AlertCircle,
  Award,
  CheckCircle,
  Clock,
  HeartPulse,
  X,
  Send,
  Eye,
  IndianRupee,
} from 'lucide-react';

interface StudentsDirectoryViewProps {
  students: Student[];
  batches: Batch[];
  selectedStudent: Student | null;
  onSelectStudent: (student: Student | null) => void;
  onOpenWhatsApp: (phone: string, studentName: string) => void;
}

export const StudentsDirectoryView: React.FC<StudentsDirectoryViewProps> = ({
  students,
  batches,
  selectedStudent,
  onSelectStudent,
  onOpenWhatsApp,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedBatchFilter, setSelectedBatchFilter] = useState('ALL');
  const [selectedFeeFilter, setSelectedFeeFilter] = useState('ALL');
  const [selectedBeltGroup, setSelectedBeltGroup] = useState('ALL');

  // Filter logic
  const filteredStudents = useMemo(() => {
    return students.filter((s) => {
      // Search
      const matchesSearch =
        s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        s.parentName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        s.beltRank.toLowerCase().includes(searchQuery.toLowerCase());

      // Batch
      const matchesBatch =
        selectedBatchFilter === 'ALL' || s.batchId === selectedBatchFilter;

      // Fee
      const matchesFee =
        selectedFeeFilter === 'ALL' || s.feeStatus === selectedFeeFilter;

      // Belt group
      let matchesBelt = true;
      if (selectedBeltGroup === 'COLOR') {
        matchesBelt = s.gupDanLevel >= 2 && s.gupDanLevel <= 10;
      } else if (selectedBeltGroup === 'BLACK_POOM') {
        matchesBelt = s.gupDanLevel <= 1 || s.isPoom || s.gupDanLevel >= 11;
      }

      return matchesSearch && matchesBatch && matchesFee && matchesBelt;
    });
  }, [students, searchQuery, selectedBatchFilter, selectedFeeFilter, selectedBeltGroup]);

  return (
    <div className="space-y-5 pb-16 max-w-7xl mx-auto">
      {/* Header & Controls */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-white tracking-tight">Student Directory</h2>
          <p className="text-xs text-slate-400">
            {filteredStudents.length} of {students.length} registered martial artists enrolled
          </p>
        </div>

        {/* Filter Pills */}
        <div className="flex flex-wrap items-center gap-2">
          {/* Batch Selector */}
          <select
            value={selectedBatchFilter}
            onChange={(e) => setSelectedBatchFilter(e.target.value)}
            className="px-3 py-2 bg-slate-900 border border-slate-800 rounded-xl text-xs text-slate-200 focus:outline-none focus:border-blue-500"
          >
            <option value="ALL">All Batches</option>
            {batches.map((b) => (
              <option key={b.id} value={b.id}>
                {b.name}
              </option>
            ))}
          </select>

          {/* Fee Filter */}
          <select
            value={selectedFeeFilter}
            onChange={(e) => setSelectedFeeFilter(e.target.value)}
            className="px-3 py-2 bg-slate-900 border border-slate-800 rounded-xl text-xs text-slate-200 focus:outline-none focus:border-blue-500"
          >
            <option value="ALL">All Fee Statuses</option>
            <option value="Paid">Paid</option>
            <option value="Due">Due Soon</option>
            <option value="Overdue">Overdue</option>
          </select>

          {/* Belt Filter */}
          <select
            value={selectedBeltGroup}
            onChange={(e) => setSelectedBeltGroup(e.target.value)}
            className="px-3 py-2 bg-slate-900 border border-slate-800 rounded-xl text-xs text-slate-200 focus:outline-none focus:border-blue-500"
          >
            <option value="ALL">All Ranks (White to Dan)</option>
            <option value="COLOR">Color Belts (10th - 2nd Gup)</option>
            <option value="BLACK_POOM">Poom & Black Belt Squad</option>
          </select>
        </div>
      </div>

      {/* Search Input Bar */}
      <div className="relative">
        <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search by student name, parent phone, or belt rank (e.g. Aarav, Blue Belt, Sharma)..."
          className="w-full pl-10 pr-4 py-2.5 bg-slate-900 border border-slate-800 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-blue-500"
        />
        {searchQuery && (
          <button
            onClick={() => setSearchQuery('')}
            className="absolute right-3.5 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-white"
          >
            Clear
          </button>
        )}
      </div>

      {/* Student Table / Cards Grid */}
      {filteredStudents.length === 0 ? (
        <div className="p-12 text-center bg-slate-900 rounded-2xl border border-slate-800 text-slate-400 text-sm">
          <p className="font-semibold text-slate-300">No students match your filter criteria.</p>
          <p className="text-xs text-slate-500 mt-1">Try resetting the search query or selecting 'All Batches'.</p>
          <button
            onClick={() => {
              setSearchQuery('');
              setSelectedBatchFilter('ALL');
              setSelectedFeeFilter('ALL');
              setSelectedBeltGroup('ALL');
            }}
            className="mt-4 px-4 py-2 rounded-xl bg-slate-800 text-xs font-semibold text-white hover:bg-slate-700"
          >
            Reset All Filters
          </button>
        </div>
      ) : (
        <div className="overflow-x-auto rounded-2xl border border-slate-800 bg-slate-900 shadow-xs">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-slate-800 bg-slate-950/70 text-slate-400">
                <th className="py-3.5 px-4 font-semibold">Student & Age</th>
                <th className="py-3.5 px-4 font-semibold">Current Rank (Belt)</th>
                <th className="py-3.5 px-4 font-semibold">Batch & Coach</th>
                <th className="py-3.5 px-4 font-semibold text-right">Attendance</th>
                <th className="py-3.5 px-4 font-semibold">Fee Status</th>
                <th className="py-3.5 px-4 font-semibold">Exam Ready</th>
                <th className="py-3.5 px-4 font-semibold text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60">
              {filteredStudents.map((student) => {
                return (
                  <tr
                    key={student.id}
                    className="hover:bg-slate-800/40 transition-colors cursor-pointer group"
                    onClick={() => onSelectStudent(student)}
                  >
                    {/* Name */}
                    <td className="py-3.5 px-4">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-lg bg-slate-800 text-slate-200 font-bold flex items-center justify-center shrink-0 border border-slate-700 group-hover:border-blue-500 transition-colors">
                          {student.avatarText}
                        </div>
                        <div>
                          <div className="flex items-center gap-1.5">
                            <span className="font-semibold text-white text-sm group-hover:text-blue-400 transition-colors">
                              {student.name}
                            </span>
                            {student.medicalNotes && (
                              <span
                                className="w-2 h-2 rounded-full bg-amber-400"
                                title={student.medicalNotes}
                              />
                            )}
                          </div>
                          <p className="text-[11px] text-slate-400">
                            {student.age} yrs · Parent: {student.parentName}
                          </p>
                        </div>
                      </div>
                    </td>

                    {/* Belt */}
                    <td className="py-3.5 px-4">
                      <BeltBadge rank={student.beltRank} size="sm" showKorean={false} />
                      <p className="text-[10px] text-slate-400 font-mono mt-1">
                        {student.monthsAtCurrentBelt} mos at rank
                      </p>
                    </td>

                    {/* Batch */}
                    <td className="py-3.5 px-4">
                      <span className="text-slate-200 font-medium">{student.batchName}</span>
                      <span className="block text-[10px] text-slate-400">
                        Poomsae: {student.poomsaeFocus}
                      </span>
                    </td>

                    {/* Attendance */}
                    <td className="py-3.5 px-4 text-right">
                      <div className="font-mono font-bold text-slate-200">
                        {student.attendancePercent}%
                      </div>
                      <div className="text-[10px] text-slate-400 font-mono">
                        {student.classesAttendedThisMonth}/{student.totalClassesThisMonth} classes
                      </div>
                    </td>

                    {/* Fee Status */}
                    <td className="py-3.5 px-4">
                      <span
                        className={`inline-block px-2 py-0.5 rounded text-[11px] font-bold ${
                          student.feeStatus === 'Paid'
                            ? 'bg-emerald-950/80 text-emerald-400 border border-emerald-800/60'
                            : student.feeStatus === 'Due'
                            ? 'bg-amber-950/80 text-amber-400 border border-amber-800/60'
                            : 'bg-rose-950/80 text-rose-400 border border-rose-800/60'
                        }`}
                      >
                        {student.feeStatus}
                        {student.feeAmountDue > 0 && ` (₹${student.feeAmountDue})`}
                      </span>
                    </td>

                    {/* Exam Ready Flag */}
                    <td className="py-3.5 px-4">
                      {student.readyForExam ? (
                        <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-400">
                          <CheckCircle className="w-3.5 h-3.5" />
                          Eligible
                        </span>
                      ) : (
                        <span className="text-[11px] text-slate-500">Criteria pending</span>
                      )}
                    </td>

                    {/* Actions */}
                    <td className="py-3.5 px-4 text-right" onClick={(e) => e.stopPropagation()}>
                      <div className="flex items-center justify-end gap-1.5">
                        <button
                          onClick={() => onSelectStudent(student)}
                          className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors"
                          title="View complete profile"
                        >
                          <Eye className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => onOpenWhatsApp(student.parentPhone, student.name)}
                          className="p-1.5 rounded-lg bg-emerald-600/20 hover:bg-emerald-600 text-emerald-400 hover:text-white transition-colors"
                          title="Message parent on WhatsApp"
                        >
                          <Send className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}

      {/* Detailed Student Profile Modal / Drawer */}
      {selectedStudent && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-xs animate-in fade-in duration-200">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl w-full max-w-2xl shadow-2xl overflow-hidden flex flex-col max-h-[92vh]">
            {/* Header */}
            <div className="px-6 py-4 border-b border-slate-800 flex items-center justify-between bg-slate-950">
              <div className="flex items-center gap-3">
                <div className="w-11 h-11 rounded-xl bg-blue-600 text-white font-bold text-base flex items-center justify-center shadow-xs">
                  {selectedStudent.avatarText}
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-base font-bold text-white">{selectedStudent.name}</h3>
                    <BeltBadge rank={selectedStudent.beltRank} size="sm" showKorean={true} />
                  </div>
                  <p className="text-xs text-slate-400">
                    Age {selectedStudent.age} ({selectedStudent.gender}) · Joined {selectedStudent.joinDate}
                  </p>
                </div>
              </div>
              <button
                onClick={() => onSelectStudent(null)}
                className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Content Tabs */}
            <div className="p-6 overflow-y-auto space-y-6 text-xs text-slate-300">
              {/* Belt & Martial Arts Progression */}
              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-3">
                <h4 className="font-bold text-white text-xs uppercase tracking-wider flex items-center gap-1.5">
                  <Award className="w-4 h-4 text-amber-400" />
                  Martial Arts Grade & Syllabus Status
                </h4>

                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  <div className="p-2.5 rounded-lg bg-slate-900 border border-slate-800">
                    <span className="text-[10px] text-slate-400 block">Time at Rank</span>
                    <span className="font-bold text-white font-mono text-sm">
                      {selectedStudent.monthsAtCurrentBelt} Months
                    </span>
                  </div>

                  <div className="p-2.5 rounded-lg bg-slate-900 border border-slate-800">
                    <span className="text-[10px] text-slate-400 block">Assigned Poomsae</span>
                    <span className="font-bold text-blue-300 text-sm truncate block">
                      {selectedStudent.poomsaeFocus}
                    </span>
                  </div>

                  <div className="p-2.5 rounded-lg bg-slate-900 border border-slate-800">
                    <span className="text-[10px] text-slate-400 block">Winter Exam Readiness</span>
                    <span
                      className={`font-bold text-sm ${
                        selectedStudent.readyForExam ? 'text-emerald-400' : 'text-amber-400'
                      }`}
                    >
                      {selectedStudent.readyForExam ? 'Eligible to Grade' : 'In Progress'}
                    </span>
                  </div>
                </div>
              </div>

              {/* Attendance & Class Frequency */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-4 rounded-xl bg-slate-950 border border-slate-800">
                  <h4 className="font-bold text-white text-xs mb-3 flex items-center gap-1.5">
                    <Clock className="w-4 h-4 text-blue-400" />
                    Attendance Metrics
                  </h4>
                  <div className="flex items-baseline gap-2 mb-2">
                    <span className="text-3xl font-black font-mono text-white tabular-nums">
                      {selectedStudent.attendancePercent}%
                    </span>
                    <span className="text-slate-400 text-xs">overall rate</span>
                  </div>
                  <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden mb-2">
                    <div
                      className={`h-full rounded-full ${
                        selectedStudent.attendancePercent >= 80 ? 'bg-emerald-500' : 'bg-amber-500'
                      }`}
                      style={{ width: `${selectedStudent.attendancePercent}%` }}
                    />
                  </div>
                  <p className="text-[11px] text-slate-400">
                    {selectedStudent.classesAttendedThisMonth} of {selectedStudent.totalClassesThisMonth} classes attended this month in {selectedStudent.batchName}.
                  </p>
                </div>

                {/* Guardian & Emergency Contacts */}
                <div className="p-4 rounded-xl bg-slate-950 border border-slate-800">
                  <h4 className="font-bold text-white text-xs mb-3 flex items-center gap-1.5">
                    <Phone className="w-4 h-4 text-emerald-400" />
                    Guardian & Medical Info
                  </h4>
                  <div className="space-y-1.5">
                    <p>
                      <strong className="text-slate-200">Parent:</strong> {selectedStudent.parentName}
                    </p>
                    <p className="font-mono text-blue-300">{selectedStudent.parentPhone}</p>
                    <p className="text-slate-400 text-[11px]">
                      Emergency: {selectedStudent.emergencyContact}
                    </p>
                    {selectedStudent.medicalNotes && (
                      <div className="mt-2 p-2 rounded bg-amber-500/10 border border-amber-500/30 text-amber-300 text-[11px] flex items-start gap-1.5">
                        <HeartPulse className="w-3.5 h-3.5 shrink-0 mt-0.5" />
                        <span>Medical: {selectedStudent.medicalNotes}</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Achievements & Tournaments Timeline */}
              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800">
                <h4 className="font-bold text-white text-xs mb-3 flex items-center gap-1.5">
                  <Award className="w-4 h-4 text-amber-400" />
                  Tournament Achievements & Medals
                </h4>
                {selectedStudent.achievements.length === 0 ? (
                  <p className="text-slate-500 italic text-[11px]">
                    No official state or national medals recorded yet. Enrolled in upcoming championships.
                  </p>
                ) : (
                  <div className="space-y-2">
                    {selectedStudent.achievements.map((ach, idx) => (
                      <div
                        key={idx}
                        className="flex items-center justify-between p-2 rounded-lg bg-slate-900 border border-slate-800"
                      >
                        <div className="flex items-center gap-2">
                          <span
                            className={`w-3 h-3 rounded-full ${
                              ach.medal === 'Gold'
                                ? 'bg-amber-400'
                                : ach.medal === 'Silver'
                                ? 'bg-slate-300'
                                : 'bg-amber-700'
                            }`}
                          />
                          <span className="font-semibold text-white">{ach.title}</span>
                        </div>
                        <span className="text-slate-400 font-mono text-[11px]">{ach.year}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Footer */}
            <div className="px-6 py-3.5 border-t border-slate-800 bg-slate-950 flex items-center justify-between">
              <span className="text-slate-400 text-xs">
                Fee Status:{' '}
                <strong
                  className={
                    selectedStudent.feeStatus === 'Paid'
                      ? 'text-emerald-400'
                      : selectedStudent.feeStatus === 'Overdue'
                      ? 'text-rose-400'
                      : 'text-amber-400'
                  }
                >
                  {selectedStudent.feeStatus}
                </strong>
              </span>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => onSelectStudent(null)}
                  className="px-4 py-2 text-xs font-semibold text-slate-300 hover:text-white rounded-lg hover:bg-slate-800 transition-colors"
                >
                  Close
                </button>
                <button
                  onClick={() => onOpenWhatsApp(selectedStudent.parentPhone, selectedStudent.name)}
                  className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-white bg-emerald-600 hover:bg-emerald-500 rounded-lg transition-colors shadow-xs"
                >
                  <Send className="w-3.5 h-3.5" />
                  Message Guardian
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
