import React, { useState } from 'react';
import { Batch, Student, Coach } from '../types';
import { BeltBadge } from '../components/BeltBadge';
import {
  Calendar,
  Clock,
  Users,
  Shield,
  MapPin,
  ChevronRight,
  UserCheck,
} from 'lucide-react';

interface BatchesScheduleViewProps {
  batches: Batch[];
  students: Student[];
  coaches: Coach[];
  onSelectStudent: (student: Student) => void;
}

export const BatchesScheduleView: React.FC<BatchesScheduleViewProps> = ({
  batches,
  students,
  coaches,
  onSelectStudent,
}) => {
  const [selectedDay, setSelectedDay] = useState<string>('ALL');
  const [activeBatchId, setActiveBatchId] = useState<string>(batches[0]?.id || '');

  const daysOfWeek = ['ALL', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

  const filteredBatches = batches.filter((b) => {
    if (selectedDay === 'ALL') return true;
    return b.scheduleDays.includes(selectedDay);
  });

  const activeBatch = batches.find((b) => b.id === activeBatchId) || batches[0];
  const activeBatchStudents = students.filter((s) => s.batchId === activeBatch?.id);
  const activeBatchCoach = coaches.find((c) => c.id === activeBatch?.coachId);

  return (
    <div className="space-y-6 pb-16 max-w-7xl mx-auto">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h2 className="text-xl font-bold text-white tracking-tight">Batches & Training Schedule</h2>
          <p className="text-xs text-slate-400">
            6 Specialized training divisions · Olympic mats & Dojang timetable
          </p>
        </div>

        {/* Day Filter Bar */}
        <div className="flex items-center gap-1 overflow-x-auto pb-1 scrollbar-none">
          {daysOfWeek.map((day) => (
            <button
              key={day}
              onClick={() => setSelectedDay(day)}
              className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap ${
                selectedDay === day
                  ? 'bg-blue-600 text-white shadow-xs'
                  : 'bg-slate-900 border border-slate-800 text-slate-400 hover:text-slate-200'
              }`}
            >
              {day === 'ALL' ? 'All Week' : day}
            </button>
          ))}
        </div>
      </div>

      {/* Grid: Batch Cards & Selected Batch Roster */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Batches Column (2 cols) */}
        <div className="lg:col-span-2 space-y-3.5">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
            {filteredBatches.map((batch) => {
              const isSelected = batch.id === activeBatchId;
              const occupancyPct = Math.round((batch.enrolledCount / batch.maxCapacity) * 100);

              return (
                <div
                  key={batch.id}
                  onClick={() => setActiveBatchId(batch.id)}
                  className={`p-4 rounded-2xl border transition-all cursor-pointer relative overflow-hidden ${
                    isSelected
                      ? 'bg-slate-900 border-blue-500 shadow-md ring-1 ring-blue-500/50'
                      : 'bg-slate-900/80 border-slate-800 hover:border-slate-700'
                  }`}
                >
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <span className="text-[10px] font-mono uppercase tracking-wider text-blue-400 font-semibold block">
                        {batch.category} · {batch.ageRange}
                      </span>
                      <h3 className="text-base font-bold text-white mt-0.5">{batch.name}</h3>
                    </div>

                    <span
                      className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold ${
                        occupancyPct >= 90
                          ? 'bg-amber-950 text-amber-300 border border-amber-800'
                          : 'bg-emerald-950 text-emerald-300 border border-emerald-800'
                      }`}
                    >
                      {occupancyPct}% Full
                    </span>
                  </div>

                  <div className="mt-3 space-y-1.5 text-xs text-slate-300">
                    <div className="flex items-center gap-2 text-slate-400">
                      <Clock className="w-3.5 h-3.5 text-slate-500 shrink-0" />
                      <span className="font-mono text-slate-200">{batch.timeSlot}</span>
                    </div>

                    <div className="flex items-center gap-2 text-slate-400">
                      <Calendar className="w-3.5 h-3.5 text-slate-500 shrink-0" />
                      <span>{batch.scheduleDays.join(' · ')}</span>
                    </div>

                    <div className="flex items-center gap-2 text-slate-400">
                      <MapPin className="w-3.5 h-3.5 text-slate-500 shrink-0" />
                      <span>{batch.room}</span>
                    </div>

                    <div className="flex items-center gap-2 text-slate-400">
                      <Users className="w-3.5 h-3.5 text-slate-500 shrink-0" />
                      <span className="text-slate-200 font-medium">Lead: {batch.coachName}</span>
                    </div>
                  </div>

                  {/* Occupancy bar */}
                  <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center justify-between text-[11px]">
                    <span className="text-slate-400">
                      Enrolled: <strong className="text-white">{batch.enrolledCount}</strong> / {batch.maxCapacity}
                    </span>
                    <span className="text-blue-400 font-semibold flex items-center gap-1 text-[11px]">
                      View Roster <ChevronRight className="w-3 h-3" />
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Active Batch Detail & Student Roster (1 col) */}
        <div className="space-y-4">
          {activeBatch && (
            <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
              <div>
                <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400 block">
                  Batch Inspection
                </span>
                <h3 className="text-lg font-bold text-white mt-0.5">{activeBatch.name}</h3>
                <p className="text-xs text-slate-400 mt-1">
                  Assigned Coach: <strong className="text-slate-200">{activeBatch.coachName}</strong>
                </p>
                {activeBatchCoach && (
                  <p className="text-[11px] text-blue-300 mt-0.5">
                    Specialty: {activeBatchCoach.specialty}
                  </p>
                )}
              </div>

              {/* Quick Roster List */}
              <div className="border-t border-slate-800 pt-3">
                <div className="flex items-center justify-between text-xs text-slate-400 mb-2.5">
                  <span className="font-semibold text-slate-200">
                    Enrolled Students ({activeBatchStudents.length})
                  </span>
                  <span className="font-mono text-[11px]">
                    Cap: {activeBatch.maxCapacity}
                  </span>
                </div>

                <div className="space-y-2 max-h-[460px] overflow-y-auto pr-1">
                  {activeBatchStudents.map((student) => (
                    <div
                      key={student.id}
                      onClick={() => onSelectStudent(student)}
                      className="p-2.5 rounded-xl bg-slate-950/80 border border-slate-800 hover:border-blue-500/60 transition-colors cursor-pointer flex items-center justify-between gap-2"
                    >
                      <div className="flex items-center gap-2 min-w-0">
                        <div className="w-7 h-7 rounded-lg bg-slate-800 text-slate-200 font-bold text-xs flex items-center justify-center shrink-0">
                          {student.avatarText}
                        </div>
                        <div className="min-w-0">
                          <p className="font-semibold text-white text-xs truncate">
                            {student.name}
                          </p>
                          <p className="text-[10px] text-slate-400">
                            Age {student.age} · {student.attendancePercent}% att
                          </p>
                        </div>
                      </div>

                      <BeltBadge rank={student.beltRank} size="sm" />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
