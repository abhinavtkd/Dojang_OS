import React, { useState, useMemo } from 'react';
import { Student, Batch, AttendanceStatus } from '../types';
import { BeltBadge } from '../components/BeltBadge';
import {
  Check,
  X,
  Clock,
  Sparkles,
  Wifi,
  WifiOff,
  Users,
  CheckCheck,
  ChevronRight,
  MessageCircle,
  Save,
  Search,
  Filter,
} from 'lucide-react';

interface CoachAttendanceViewProps {
  batches: Batch[];
  students: Student[];
  onUpdateAttendance: (batchId: string, records: Record<string, AttendanceStatus>) => void;
  onSelectStudentProfile: (student: Student) => void;
}

export const CoachAttendanceView: React.FC<CoachAttendanceViewProps> = ({
  batches,
  students,
  onUpdateAttendance,
  onSelectStudentProfile,
}) => {
  // Default to Junior Cadets or Little Tigers
  const [selectedBatchId, setSelectedBatchId] = useState<string>(batches[1]?.id || batches[0]?.id);
  const [isOfflineMode, setIsOfflineMode] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [saveSuccessToast, setSaveSuccessToast] = useState(false);
  const [coachNotes, setCoachNotes] = useState<Record<string, string>>({});
  const [activeNoteStudentId, setActiveNoteStudentId] = useState<string | null>(null);

  // Batch students
  const batchStudents = useMemo(() => {
    return students.filter((s) => s.batchId === selectedBatchId);
  }, [students, selectedBatchId]);

  const currentBatch = useMemo(() => {
    return batches.find((b) => b.id === selectedBatchId) || batches[0];
  }, [batches, selectedBatchId]);

  // Attendance state map for current batch
  const [attendanceMap, setAttendanceMap] = useState<Record<string, AttendanceStatus>>(() => {
    const init: Record<string, AttendanceStatus> = {};
    batchStudents.forEach((s) => {
      // Default to present for rapid 30s marking
      init[s.id] = 'present';
    });
    return init;
  });

  // Re-sync attendance map when batch changes
  React.useEffect(() => {
    const nextMap: Record<string, AttendanceStatus> = {};
    batchStudents.forEach((s) => {
      nextMap[s.id] = attendanceMap[s.id] || 'present';
    });
    setAttendanceMap(nextMap);
  }, [selectedBatchId, batchStudents]);

  // Fast toggles
  const handleSetStatus = (studentId: string, status: AttendanceStatus) => {
    setAttendanceMap((prev) => ({
      ...prev,
      [studentId]: status,
    }));
  };

  const handleMarkAllPresent = () => {
    const updated: Record<string, AttendanceStatus> = {};
    batchStudents.forEach((s) => {
      updated[s.id] = 'present';
    });
    setAttendanceMap(updated);
  };

  const handleMarkAllAbsent = () => {
    const updated: Record<string, AttendanceStatus> = {};
    batchStudents.forEach((s) => {
      updated[s.id] = 'absent';
    });
    setAttendanceMap(updated);
  };

  // Live counters
  const presentCount = Object.values(attendanceMap).filter((v) => v === 'present').length;
  const absentCount = Object.values(attendanceMap).filter((v) => v === 'absent').length;
  const lateCount = Object.values(attendanceMap).filter((v) => v === 'late').length;
  const excusedCount = Object.values(attendanceMap).filter((v) => v === 'excused').length;

  const filteredStudents = useMemo(() => {
    if (!searchQuery.trim()) return batchStudents;
    const q = searchQuery.toLowerCase();
    return batchStudents.filter(
      (s) =>
        s.name.toLowerCase().includes(q) ||
        s.beltRank.toLowerCase().includes(q) ||
        s.parentName.toLowerCase().includes(q)
    );
  }, [batchStudents, searchQuery]);

  const handleSaveRoster = () => {
    onUpdateAttendance(selectedBatchId, attendanceMap);
    setSaveSuccessToast(true);
    setTimeout(() => setSaveSuccessToast(false), 3000);
  };

  return (
    <div className="space-y-4 pb-20 max-w-4xl mx-auto">
      {/* Top Banner: Coach mode notice & 30-sec attendance header */}
      <div className="p-4 rounded-2xl bg-gradient-to-r from-slate-900 via-slate-900 to-blue-950/60 border border-slate-800 shadow-md">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <div className="flex items-center gap-2">
              <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase bg-blue-500/20 text-blue-300 border border-blue-500/30">
                Coach Roster View
              </span>
              <button
                type="button"
                onClick={() => setIsOfflineMode(!isOfflineMode)}
                className={`inline-flex items-center gap-1 text-[11px] px-2 py-0.5 rounded-full transition-colors ${
                  isOfflineMode
                    ? 'bg-amber-500/10 text-amber-300 border border-amber-500/30'
                    : 'bg-emerald-500/10 text-emerald-300 border border-emerald-500/30'
                }`}
                title="Simulate offline dojang connectivity"
              >
                {isOfflineMode ? <WifiOff className="w-3 h-3" /> : <Wifi className="w-3 h-3" />}
                <span>{isOfflineMode ? 'Offline Local Storage' : 'Cloud Synced'}</span>
              </button>
            </div>
            <h2 className="text-xl font-bold text-white mt-1">
              Mark Class Attendance
            </h2>
            <p className="text-xs text-slate-400">
              Designed for 30-second completion on coach phone at the dojang
            </p>
          </div>

          {/* Rapid Bulk Actions */}
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handleMarkAllPresent}
              className="h-10 px-3.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs flex items-center gap-1.5 transition-colors shadow-xs active:scale-95"
            >
              <CheckCheck className="w-4 h-4" />
              Mark All Present
            </button>
            <button
              type="button"
              onClick={handleMarkAllAbsent}
              className="h-10 px-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-medium text-xs border border-slate-700 transition-colors"
            >
              Reset
            </button>
          </div>
        </div>

        {/* Batch Selector Carousel */}
        <div className="mt-4 pt-3 border-t border-slate-800/80">
          <label className="block text-[11px] font-medium text-slate-400 mb-2">
            Select Active Batch:
          </label>
          <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-none">
            {batches.map((batch) => {
              const isSelected = batch.id === selectedBatchId;
              return (
                <button
                  key={batch.id}
                  onClick={() => setSelectedBatchId(batch.id)}
                  className={`px-3 py-2 rounded-xl text-left transition-all shrink-0 border whitespace-nowrap ${
                    isSelected
                      ? 'bg-blue-600/20 border-blue-500 text-white shadow-xs'
                      : 'bg-slate-950/60 border-slate-800 text-slate-400 hover:text-slate-200'
                  }`}
                >
                  <p className="text-xs font-semibold leading-tight">{batch.name}</p>
                  <p className="text-[10px] text-slate-400 font-mono mt-0.5">
                    {batch.timeSlot.split('-')[0]} · {batch.enrolledCount} Students
                  </p>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Live Stat Bar for the batch */}
      <div className="grid grid-cols-4 gap-2 text-center">
        <div className="p-2.5 rounded-xl bg-emerald-950/30 border border-emerald-800/40">
          <span className="text-[10px] uppercase font-bold text-emerald-400 block">Present</span>
          <span className="text-lg font-bold font-mono text-emerald-300">{presentCount}</span>
        </div>
        <div className="p-2.5 rounded-xl bg-rose-950/30 border border-rose-800/40">
          <span className="text-[10px] uppercase font-bold text-rose-400 block">Absent</span>
          <span className="text-lg font-bold font-mono text-rose-300">{absentCount}</span>
        </div>
        <div className="p-2.5 rounded-xl bg-amber-950/30 border border-amber-800/40">
          <span className="text-[10px] uppercase font-bold text-amber-400 block">Late</span>
          <span className="text-lg font-bold font-mono text-amber-300">{lateCount}</span>
        </div>
        <div className="p-2.5 rounded-xl bg-slate-900 border border-slate-800">
          <span className="text-[10px] uppercase font-bold text-slate-400 block">Excused</span>
          <span className="text-lg font-bold font-mono text-slate-300">{excusedCount}</span>
        </div>
      </div>

      {/* Quick Search inside batch */}
      <div className="relative">
        <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder={`Search in ${currentBatch.name}...`}
          className="w-full pl-10 pr-4 py-2 bg-slate-900 border border-slate-800 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-blue-500"
        />
      </div>

      {/* Student List - Big Touch Targets for Gym Floor */}
      <div className="space-y-2.5">
        {filteredStudents.length === 0 ? (
          <div className="p-8 text-center bg-slate-900/50 rounded-2xl border border-slate-800 text-slate-400 text-xs">
            No students found matching your search.
          </div>
        ) : (
          filteredStudents.map((student) => {
            const currentStatus = attendanceMap[student.id] || 'present';
            const isNoteOpen = activeNoteStudentId === student.id;

            return (
              <div
                key={student.id}
                className="p-3.5 rounded-xl bg-slate-900 border border-slate-800/80 shadow-xs hover:border-slate-700 transition-colors"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  {/* Student Info */}
                  <div
                    onClick={() => onSelectStudentProfile(student)}
                    className="cursor-pointer group flex items-start gap-3 min-w-0"
                  >
                    <div className="w-10 h-10 rounded-xl bg-slate-800 text-slate-200 font-bold flex items-center justify-center shrink-0 border border-slate-700 group-hover:border-blue-500 transition-colors">
                      {student.avatarText}
                    </div>
                    <div className="min-w-0">
                      <div className="flex items-center gap-2">
                        <h4 className="font-semibold text-white text-sm group-hover:text-blue-400 transition-colors truncate">
                          {student.name}
                        </h4>
                        {student.medicalNotes && (
                          <span
                            className="w-2 h-2 rounded-full bg-amber-400"
                            title={`Medical Note: ${student.medicalNotes}`}
                          />
                        )}
                      </div>
                      <div className="flex items-center gap-2 mt-1">
                        <BeltBadge rank={student.beltRank} size="sm" />
                        <span className="text-[11px] text-slate-400 font-mono">
                          {student.attendancePercent}% att
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Big Touch Controls (48px high, ergonomic for coach holding pads) */}
                  <div className="flex items-center gap-1.5 self-end sm:self-center shrink-0">
                    {/* Present */}
                    <button
                      type="button"
                      onClick={() => handleSetStatus(student.id, 'present')}
                      className={`min-h-[44px] min-w-[56px] px-3 rounded-xl font-bold text-xs flex items-center justify-center gap-1 transition-all active:scale-95 ${
                        currentStatus === 'present'
                          ? 'bg-emerald-600 text-white shadow-md shadow-emerald-950/40'
                          : 'bg-slate-950 text-slate-400 border border-slate-800 hover:text-slate-200'
                      }`}
                    >
                      <Check className="w-4 h-4 stroke-[2.5]" />
                      <span>P</span>
                    </button>

                    {/* Absent */}
                    <button
                      type="button"
                      onClick={() => handleSetStatus(student.id, 'absent')}
                      className={`min-h-[44px] min-w-[56px] px-3 rounded-xl font-bold text-xs flex items-center justify-center gap-1 transition-all active:scale-95 ${
                        currentStatus === 'absent'
                          ? 'bg-rose-600 text-white shadow-md shadow-rose-950/40'
                          : 'bg-slate-950 text-slate-400 border border-slate-800 hover:text-slate-200'
                      }`}
                    >
                      <X className="w-4 h-4 stroke-[2.5]" />
                      <span>A</span>
                    </button>

                    {/* Late */}
                    <button
                      type="button"
                      onClick={() => handleSetStatus(student.id, 'late')}
                      className={`min-h-[44px] px-2.5 rounded-xl font-medium text-xs flex items-center justify-center transition-all ${
                        currentStatus === 'late'
                          ? 'bg-amber-600 text-white'
                          : 'bg-slate-950 text-slate-400 border border-slate-800 hover:text-slate-200'
                      }`}
                      title="Late arrival"
                    >
                      <Clock className="w-3.5 h-3.5" />
                    </button>

                    {/* Coach Quick Note */}
                    <button
                      type="button"
                      onClick={() =>
                        setActiveNoteStudentId(isNoteOpen ? null : student.id)
                      }
                      className={`min-h-[44px] min-w-[40px] px-2 rounded-xl flex items-center justify-center transition-colors ${
                        coachNotes[student.id]
                          ? 'bg-blue-600/20 text-blue-400 border border-blue-500/40'
                          : 'bg-slate-950 text-slate-400 border border-slate-800 hover:text-slate-200'
                      }`}
                      title="Add coach note"
                    >
                      <MessageCircle className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                {/* Inline Coach Note Accordion */}
                {isNoteOpen && (
                  <div className="mt-3 pt-3 border-t border-slate-800/80 animate-in fade-in duration-100">
                    <label className="block text-[10px] text-slate-400 font-medium mb-1">
                      Coach Observation / Technique Feedback for {student.name}:
                    </label>
                    <div className="flex gap-2">
                      <input
                        type="text"
                        value={coachNotes[student.id] || ''}
                        onChange={(e) =>
                          setCoachNotes((prev) => ({
                            ...prev,
                            [student.id]: e.target.value,
                          }))
                        }
                        placeholder="e.g. Excellent front snap kick height today, needs work on back stance"
                        className="flex-1 px-3 py-1.5 bg-slate-950 border border-slate-800 rounded-lg text-xs text-white placeholder-slate-600 focus:outline-none focus:border-blue-500"
                      />
                      <button
                        type="button"
                        onClick={() => setActiveNoteStudentId(null)}
                        className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-xs text-white rounded-lg"
                      >
                        Done
                      </button>
                    </div>
                  </div>
                )}
              </div>
            );
          })
        )}
      </div>

      {/* Floating Sticky Save Confirmation Bar (Thumb Zone) */}
      <div className="fixed bottom-0 left-0 right-0 p-4 bg-slate-950/95 backdrop-blur-md border-t border-slate-800 z-30">
        <div className="max-w-4xl mx-auto flex items-center justify-between gap-4">
          <div className="text-xs">
            <span className="font-semibold text-white">
              {presentCount} Present · {absentCount} Absent
            </span>
            <span className="text-slate-400 ml-2 font-mono hidden sm:inline">
              ({currentBatch.name})
            </span>
          </div>

          <button
            type="button"
            onClick={handleSaveRoster}
            className="h-12 px-6 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-bold text-xs flex items-center gap-2 shadow-lg shadow-blue-950/60 active:scale-95 transition-all"
          >
            <Save className="w-4 h-4" />
            <span>Save Class Attendance</span>
          </button>
        </div>
      </div>

      {/* Toast */}
      {saveSuccessToast && (
        <div className="fixed bottom-20 left-1/2 -translate-x-1/2 z-50 px-4 py-3 rounded-xl bg-emerald-600 text-white font-semibold text-xs shadow-2xl flex items-center gap-2 animate-in fade-in slide-in-from-bottom-2 duration-150">
          <CheckCheck className="w-4 h-4" />
          <span>Attendance recorded successfully for {currentBatch.name}!</span>
        </div>
      )}
    </div>
  );
};
