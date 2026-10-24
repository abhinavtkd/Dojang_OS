import React, { useState } from 'react';
import { Announcement, Batch } from '../types';
import {
  Send,
  MessageSquare,
  Smartphone,
  Bell,
  Users,
  CheckCircle,
  Plus,
  Pin,
  Share2,
} from 'lucide-react';

interface AnnouncementsViewProps {
  announcements: Announcement[];
  batches: Batch[];
  onAddAnnouncement: (newAnn: Announcement) => void;
}

export const AnnouncementsView: React.FC<AnnouncementsViewProps> = ({
  announcements,
  batches,
  onAddAnnouncement,
}) => {
  const [showComposeModal, setShowComposeModal] = useState(false);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [audience, setAudience] = useState<Announcement['targetAudience']>('All Batches');
  const [channels, setChannels] = useState<('WhatsApp' | 'SMS' | 'In-App')[]>([
    'WhatsApp',
    'In-App',
  ]);
  const [toast, setToast] = useState<string | null>(null);

  const toggleChannel = (ch: 'WhatsApp' | 'SMS' | 'In-App') => {
    if (channels.includes(ch)) {
      if (channels.length > 1) {
        setChannels(channels.filter((c) => c !== ch));
      }
    } else {
      setChannels([...channels, ch]);
    }
  };

  const handleCompose = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !content.trim()) return;

    const newAnn: Announcement = {
      id: `ann-${Date.now()}`,
      title,
      content,
      author: 'Master Rajesh Kumar',
      date: '15 Oct 2026',
      targetAudience: audience,
      channels,
    };

    onAddAnnouncement(newAnn);
    setShowComposeModal(false);
    setTitle('');
    setContent('');
    setToast(`Broadcast successfully dispatched via ${channels.join(', ')}!`);
    setTimeout(() => setToast(null), 3500);
  };

  const applyTemplate = (templateType: 'exam' | 'holiday' | 'tournament') => {
    if (templateType === 'exam') {
      setTitle('Mandatory Belt Exam Registration & Fee Deadline');
      setContent(
        'Reminder: Winter Belt Promotion Examination will take place on Sunday 8th Nov at 9:00 AM. Ensure all monthly dues and exam fee (₹1,800) are cleared by 30th Oct. White Dobok with academy crest is compulsory.'
      );
      setAudience('All Batches');
    } else if (templateType === 'holiday') {
      setTitle('Dojang Closure Notice: Public Holiday');
      setContent(
        'Please note the academy will remain closed this upcoming national holiday. Regular training resumes as per schedule the following day. Practice stretching and poomsae at home.'
      );
      setAudience('All Batches');
    } else if (templateType === 'tournament') {
      setTitle('State Championship Sparring Equipment Verification');
      setContent(
        'All athletes competing in the Delhi-NCR State Championship must bring their chest protectors, headgear, shin guards, and groin guards for official inspection this Friday.'
      );
      setAudience('Kyorugi Squad');
    }
  };

  return (
    <div className="space-y-6 pb-16 max-w-4xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5 rounded-2xl bg-gradient-to-r from-slate-900 via-slate-900 to-indigo-950/40 border border-slate-800 shadow-sm">
        <div>
          <span className="text-[10px] font-mono text-blue-400 font-bold uppercase tracking-wider block">
            Communications Center
          </span>
          <h2 className="text-xl font-bold text-white mt-1">Announcements & Broadcasts</h2>
          <p className="text-xs text-slate-400">
            Send instant notifications across WhatsApp, SMS, and Parent In-App Feed
          </p>
        </div>

        <button
          onClick={() => setShowComposeModal(true)}
          className="h-11 px-5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs flex items-center gap-2 transition-colors shadow-xs shrink-0 self-start sm:self-center"
        >
          <Plus className="w-4 h-4" />
          Compose Broadcast
        </button>
      </div>

      {/* Broadcast Feed */}
      <div className="space-y-3.5">
        {announcements.map((ann) => (
          <div
            key={ann.id}
            className={`p-5 rounded-2xl border transition-all ${
              ann.pinned
                ? 'bg-slate-900/90 border-blue-500/50 shadow-md ring-1 ring-blue-500/30'
                : 'bg-slate-900 border-slate-800'
            }`}
          >
            <div className="flex items-start justify-between gap-3">
              <div className="flex items-center gap-2">
                {ann.pinned && (
                  <span className="p-1 rounded bg-blue-500/20 text-blue-400">
                    <Pin className="w-3.5 h-3.5" />
                  </span>
                )}
                <h3 className="text-base font-bold text-white">{ann.title}</h3>
              </div>

              <span className="text-xs font-mono text-slate-400 shrink-0">{ann.date}</span>
            </div>

            <p className="text-xs text-slate-300 leading-relaxed mt-2.5">{ann.content}</p>

            <div className="mt-4 pt-3 border-t border-slate-800/80 flex flex-wrap items-center justify-between gap-2 text-xs">
              <div className="flex items-center gap-2">
                <span className="px-2 py-0.5 rounded bg-slate-950 text-slate-400 border border-slate-800 text-[11px]">
                  Audience: <strong className="text-slate-200">{ann.targetAudience}</strong>
                </span>
                <span className="text-slate-500">·</span>
                <span className="text-slate-400 text-[11px]">By {ann.author}</span>
              </div>

              {/* Channels badge */}
              <div className="flex items-center gap-1.5">
                {ann.channels.map((ch) => (
                  <span
                    key={ch}
                    className={`px-2 py-0.5 rounded text-[10px] font-semibold ${
                      ch === 'WhatsApp'
                        ? 'bg-emerald-950 text-emerald-400 border border-emerald-800'
                        : ch === 'SMS'
                        ? 'bg-amber-950 text-amber-400 border border-amber-800'
                        : 'bg-blue-950 text-blue-400 border border-blue-800'
                    }`}
                  >
                    {ch}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Compose Modal */}
      {showComposeModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-xs animate-in fade-in duration-150">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl w-full max-w-lg shadow-2xl p-6 space-y-4">
            <div className="flex justify-between items-center border-b border-slate-800 pb-3">
              <h3 className="text-sm font-bold text-white">Broadcast New Announcement</h3>
              <button
                onClick={() => setShowComposeModal(false)}
                className="text-slate-400 hover:text-white"
              >
                &times;
              </button>
            </div>

            {/* Template quick pills */}
            <div>
              <span className="text-[11px] text-slate-400 block mb-1.5">Quick Templates:</span>
              <div className="flex flex-wrap gap-1.5">
                <button
                  type="button"
                  onClick={() => applyTemplate('exam')}
                  className="px-2.5 py-1 rounded-lg bg-slate-800 text-slate-300 hover:text-white text-[11px] transition-colors"
                >
                  🥋 Belt Exam Reminder
                </button>
                <button
                  type="button"
                  onClick={() => applyTemplate('holiday')}
                  className="px-2.5 py-1 rounded-lg bg-slate-800 text-slate-300 hover:text-white text-[11px] transition-colors"
                >
                  🪔 Holiday Notice
                </button>
                <button
                  type="button"
                  onClick={() => applyTemplate('tournament')}
                  className="px-2.5 py-1 rounded-lg bg-slate-800 text-slate-300 hover:text-white text-[11px] transition-colors"
                >
                  🏆 Tournament Squad
                </button>
              </div>
            </div>

            <form onSubmit={handleCompose} className="space-y-3.5 text-xs">
              <div>
                <label className="block text-slate-300 font-medium mb-1">Title</label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="e.g. Winter Belt Exam Timing Update"
                  className="w-full p-2.5 bg-slate-950 border border-slate-800 rounded-xl text-white"
                  required
                />
              </div>

              <div>
                <label className="block text-slate-300 font-medium mb-1">Message Content</label>
                <textarea
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  rows={4}
                  placeholder="Type the message to broadcast to parents and students..."
                  className="w-full p-2.5 bg-slate-950 border border-slate-800 rounded-xl text-white leading-relaxed resize-none"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-300 font-medium mb-1">Target Audience</label>
                  <select
                    value={audience}
                    onChange={(e) => setAudience(e.target.value as any)}
                    className="w-full p-2.5 bg-slate-950 border border-slate-800 rounded-xl text-white"
                  >
                    <option value="All Batches">All Batches</option>
                    <option value="Parents Only">Parents Only</option>
                    <option value="Kids Batches">Kids Batches</option>
                    <option value="Kyorugi Squad">Kyorugi Squad</option>
                    <option value="Poomsae Squad">Poomsae Squad</option>
                  </select>
                </div>

                <div>
                  <label className="block text-slate-300 font-medium mb-1">Dispatch Channels</label>
                  <div className="flex gap-1.5 pt-1">
                    {(['WhatsApp', 'SMS', 'In-App'] as const).map((ch) => {
                      const isSel = channels.includes(ch);
                      return (
                        <button
                          key={ch}
                          type="button"
                          onClick={() => toggleChannel(ch)}
                          className={`flex-1 py-1.5 rounded-lg text-[10px] font-bold border transition-colors ${
                            isSel
                              ? 'bg-blue-600 text-white border-blue-500'
                              : 'bg-slate-950 text-slate-500 border-slate-800'
                          }`}
                        >
                          {ch}
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>

              <div className="pt-2 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowComposeModal(false)}
                  className="px-4 py-2 rounded-xl text-slate-400 hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold flex items-center gap-1.5"
                >
                  <Send className="w-3.5 h-3.5" />
                  Dispatch Broadcast
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Toast */}
      {toast && (
        <div className="fixed bottom-20 left-1/2 -translate-x-1/2 z-50 px-5 py-3 rounded-xl bg-blue-600 text-white font-semibold text-xs shadow-2xl flex items-center gap-2 animate-in fade-in duration-200">
          <CheckCircle className="w-4 h-4" />
          <span>{toast}</span>
        </div>
      )}
    </div>
  );
};
