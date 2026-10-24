import React, { useState } from 'react';
import { Tournament, Student } from '../types';
import { BeltBadge } from '../components/BeltBadge';
import {
  Trophy,
  Calendar,
  MapPin,
  Users,
  CheckCircle,
  Plus,
  Scale,
  Award,
  ChevronRight,
  Shield,
} from 'lucide-react';

interface TournamentsViewProps {
  tournament: Tournament;
  students: Student[];
}

export const TournamentsView: React.FC<TournamentsViewProps> = ({
  tournament,
  students,
}) => {
  const [registrations, setRegistrations] = useState(tournament.registrations);
  const [showRegisterModal, setShowRegisterModal] = useState(false);
  const [selectedStudentId, setSelectedStudentId] = useState(students[0]?.id || '');
  const [division, setDivision] = useState<'Sub-Junior' | 'Cadet' | 'Junior' | 'Senior'>('Junior');
  const [category, setCategory] = useState<'Kyorugi' | 'Poomsae' | 'Both'>('Kyorugi');
  const [weightCategory, setWeightCategory] = useState('Under 55 kg');

  const handleRegisterAthlete = (e: React.FormEvent) => {
    e.preventDefault();
    const st = students.find((s) => s.id === selectedStudentId);
    if (!st) return;

    const newReg = {
      studentId: st.id,
      studentName: st.name,
      division,
      category,
      weightCategory,
      status: 'Registered' as const,
    };

    setRegistrations((prev) => [newReg, ...prev]);
    setShowRegisterModal(false);
  };

  const handleToggleWeighIn = (studentId: string) => {
    setRegistrations((prev) =>
      prev.map((r) =>
        r.studentId === studentId
          ? {
              ...r,
              status: r.status === 'Weighed-In' ? 'Registered' : 'Weighed-In',
            }
          : r
      )
    );
  };

  return (
    <div className="space-y-6 pb-16 max-w-7xl mx-auto">
      {/* Tournament Hero Card */}
      <div className="p-6 rounded-2xl bg-gradient-to-r from-slate-900 via-slate-900 to-rose-950/40 border border-slate-800 shadow-sm flex flex-col lg:flex-row lg:items-center justify-between gap-6">
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase bg-rose-500/20 text-rose-300 border border-rose-500/30">
              {tournament.level}
            </span>
            <span className="text-xs font-mono text-slate-400">
              Registration Closes: 20 Nov 2026
            </span>
          </div>
          <h2 className="text-2xl font-black text-white tracking-tight">{tournament.title}</h2>
          <div className="flex flex-wrap items-center gap-4 text-xs text-slate-400 mt-2">
            <span className="flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5 text-rose-400" />
              12 - 14 December 2026
            </span>
            <span className="flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-rose-400" />
              {tournament.location}
            </span>
            <span className="flex items-center gap-1.5 font-mono text-emerald-400 font-semibold">
              Entry Fee: ₹{tournament.entryFee} / Athlete
            </span>
          </div>
        </div>

        <button
          onClick={() => setShowRegisterModal(true)}
          className="h-11 px-5 rounded-xl bg-rose-600 hover:bg-rose-500 text-white font-bold text-xs flex items-center gap-2 transition-colors shadow-xs shrink-0 self-start lg:self-center"
        >
          <Plus className="w-4 h-4" />
          Register Academy Athlete
        </button>
      </div>

      {/* Roster & Stats */}
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-sm font-bold text-white">Thrust Championship Contingent</h3>
          <p className="text-xs text-slate-400">
            {registrations.length} competitors representing Thrust Martial Arts Academy (@thrust_martial_arts_academy)
          </p>
        </div>

        <div className="flex items-center gap-2 text-xs">
          <span className="px-2 py-1 rounded-lg bg-slate-900 border border-slate-800 text-slate-300 font-mono">
            Weighed-In:{' '}
            <strong className="text-emerald-400">
              {registrations.filter((r) => r.status === 'Weighed-In').length}
            </strong>{' '}
            / {registrations.length}
          </span>
        </div>
      </div>

      {/* Contingent Table */}
      <div className="overflow-x-auto rounded-2xl border border-slate-800 bg-slate-900 shadow-xs">
        <table className="w-full text-left text-xs">
          <thead>
            <tr className="border-b border-slate-800 bg-slate-950/70 text-slate-400">
              <th className="py-3.5 px-4 font-semibold">Athlete Name</th>
              <th className="py-3.5 px-4 font-semibold">Age Division</th>
              <th className="py-3.5 px-4 font-semibold">Discipline</th>
              <th className="py-3.5 px-4 font-semibold">Weight Category</th>
              <th className="py-3.5 px-4 font-semibold">Weigh-in Status</th>
              <th className="py-3.5 px-4 font-semibold text-right">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800/60">
            {registrations.map((reg) => {
              const student = students.find((s) => s.id === reg.studentId);
              return (
                <tr key={reg.studentId} className="hover:bg-slate-800/40 transition-colors">
                  <td className="py-3.5 px-4">
                    <div className="flex items-center gap-2.5">
                      <span className="font-semibold text-white text-sm">{reg.studentName}</span>
                      {student && <BeltBadge rank={student.beltRank} size="sm" />}
                    </div>
                  </td>

                  <td className="py-3.5 px-4">
                    <span className="px-2 py-0.5 rounded text-[11px] font-medium bg-slate-800 text-slate-300">
                      {reg.division}
                    </span>
                  </td>

                  <td className="py-3.5 px-4">
                    <span
                      className={`font-semibold ${
                        reg.category === 'Kyorugi'
                          ? 'text-rose-400'
                          : reg.category === 'Poomsae'
                          ? 'text-blue-400'
                          : 'text-amber-300'
                      }`}
                    >
                      {reg.category}
                    </span>
                  </td>

                  <td className="py-3.5 px-4 font-mono text-slate-300">
                    {reg.weightCategory}
                  </td>

                  <td className="py-3.5 px-4">
                    <button
                      onClick={() => handleToggleWeighIn(reg.studentId)}
                      className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-[11px] font-semibold border transition-all ${
                        reg.status === 'Weighed-In'
                          ? 'bg-emerald-950/80 text-emerald-400 border-emerald-800'
                          : 'bg-amber-950/80 text-amber-300 border-amber-800/80'
                      }`}
                    >
                      <Scale className="w-3 h-3" />
                      {reg.status === 'Weighed-In' ? 'Weighed-In · Pass' : 'Pending Weigh-in'}
                    </button>
                  </td>

                  <td className="py-3.5 px-4 text-right">
                    <span className="text-[11px] text-emerald-400 font-mono font-semibold">
                      Fee Paid
                    </span>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Registration Modal */}
      {showRegisterModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-xs animate-in fade-in duration-150">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl w-full max-w-md shadow-2xl p-6 space-y-4">
            <div className="flex justify-between items-center border-b border-slate-800 pb-3">
              <h3 className="text-sm font-bold text-white">Enroll Athlete in State Championship</h3>
              <button
                onClick={() => setShowRegisterModal(false)}
                className="text-slate-400 hover:text-white"
              >
                &times;
              </button>
            </div>

            <form onSubmit={handleRegisterAthlete} className="space-y-4 text-xs">
              <div>
                <label className="block text-slate-300 font-medium mb-1">Select Student</label>
                <select
                  value={selectedStudentId}
                  onChange={(e) => setSelectedStudentId(e.target.value)}
                  className="w-full p-2.5 bg-slate-950 border border-slate-800 rounded-xl text-white"
                >
                  {students.map((s) => (
                    <option key={s.id} value={s.id}>
                      {s.name} ({s.age}y, {s.beltRank})
                    </option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-300 font-medium mb-1">Division</label>
                  <select
                    value={division}
                    onChange={(e) => setDivision(e.target.value as any)}
                    className="w-full p-2.5 bg-slate-950 border border-slate-800 rounded-xl text-white"
                  >
                    <option value="Sub-Junior">Sub-Junior (&lt; 12y)</option>
                    <option value="Cadet">Cadet (12 - 14y)</option>
                    <option value="Junior">Junior (15 - 17y)</option>
                    <option value="Senior">Senior (18+)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-slate-300 font-medium mb-1">Discipline</label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value as any)}
                    className="w-full p-2.5 bg-slate-950 border border-slate-800 rounded-xl text-white"
                  >
                    <option value="Kyorugi">Kyorugi (Sparring)</option>
                    <option value="Poomsae">Poomsae (Forms)</option>
                    <option value="Both">Both Kyorugi & Poomsae</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-slate-300 font-medium mb-1">Weight Division</label>
                <input
                  type="text"
                  value={weightCategory}
                  onChange={(e) => setWeightCategory(e.target.value)}
                  placeholder="e.g. Under 55 kg / Flyweight"
                  className="w-full p-2.5 bg-slate-950 border border-slate-800 rounded-xl text-white font-mono"
                />
              </div>

              <div className="pt-2 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowRegisterModal(false)}
                  className="px-4 py-2 rounded-xl text-slate-400 hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-xl bg-rose-600 hover:bg-rose-500 text-white font-bold"
                >
                  Confirm Registration (₹1,200)
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
