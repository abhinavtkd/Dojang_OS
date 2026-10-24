import React, { useState } from 'react';
import { FeeInvoice } from '../types';
import { X, Send, Copy, Check, MessageSquare, ExternalLink } from 'lucide-react';

interface WhatsAppModalProps {
  invoice: FeeInvoice | null;
  onClose: () => void;
  onSent: (invoiceId: string) => void;
}

export const WhatsAppModal: React.FC<WhatsAppModalProps> = ({ invoice, onClose, onSent }) => {
  const [copied, setCopied] = useState(false);
  const [sentSuccess, setSentSuccess] = useState(false);

  if (!invoice) return null;

  const defaultMessage = `🥋 *Thrust Martial Arts Academy - Fee Reminder*\n\nNamaste ${invoice.parentName} ji,\n\nThis is a polite reminder regarding the monthly training fee for *${invoice.studentName}* (${invoice.batchName}).\n\n📌 *Amount Due:* ₹${invoice.amount.toLocaleString('en-IN')}\n📅 *Due Date:* ${invoice.dueDate} (${invoice.status === 'Overdue' ? 'Overdue' : 'Due Soon'})\n\n📲 *Pay via UPI:* \nUPI ID: \`thrustmartialarts@axisbank\`\nor scan the QR code at our Chhatarpur dojang reception.\n\nAfter payment, please share the screenshot here for immediate digital receipt generation.\n\nWarm regards,\n*Master Nikhil Tyagi (5th Dan)*\nThrust Martial Arts Academy, Chhatarpur, New Delhi\nInstagram: @thrust_martial_arts_academy\nPhone: +91 98711 05892`;

  const [message, setMessage] = useState(defaultMessage);

  const handleCopy = () => {
    navigator.clipboard.writeText(message);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleOpenWhatsApp = () => {
    // Format phone number clean
    const cleanPhone = invoice.phone.replace(/[^0-9]/g, '');
    const encoded = encodeURIComponent(message);
    const url = `https://wa.me/${cleanPhone}?text=${encoded}`;
    window.open(url, '_blank');
    setSentSuccess(true);
    onSent(invoice.id);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-xs animate-in fade-in duration-150">
      <div className="bg-slate-900 border border-slate-800 rounded-2xl w-full max-w-lg shadow-2xl overflow-hidden flex flex-col">
        {/* Header */}
        <div className="px-6 py-4 border-b border-slate-800 flex items-center justify-between bg-slate-950">
          <div className="flex items-center gap-2.5">
            <span className="p-2 rounded-lg bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
              <MessageSquare className="w-4 h-4" />
            </span>
            <div>
              <h3 className="text-sm font-semibold text-slate-100">Send WhatsApp Fee Reminder</h3>
              <p className="text-xs text-slate-400">
                To: {invoice.parentName} ({invoice.phone})
              </p>
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
        <div className="p-6 space-y-4">
          <div className="flex items-center justify-between text-xs text-slate-400">
            <span>Message Preview (Formatted for WhatsApp):</span>
            <span className="font-mono text-emerald-400">Due: ₹{invoice.amount.toLocaleString('en-IN')}</span>
          </div>

          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            rows={9}
            className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3.5 text-xs text-slate-200 font-sans focus:outline-none focus:border-emerald-500/60 leading-relaxed resize-none selection:bg-emerald-500 selection:text-slate-950"
          />

          {sentSuccess && (
            <div className="p-3 bg-emerald-500/10 border border-emerald-500/20 rounded-lg flex items-center gap-2 text-xs text-emerald-300">
              <Check className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>Reminder dispatched to {invoice.parentName}. Status updated in billing ledger.</span>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-slate-800 bg-slate-950 flex items-center justify-between">
          <button
            type="button"
            onClick={handleCopy}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-medium text-slate-300 hover:text-white rounded-lg border border-slate-800 hover:bg-slate-800 transition-colors"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
            {copied ? 'Copied' : 'Copy Text'}
          </button>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-3.5 py-2 text-xs font-medium text-slate-400 hover:text-slate-200 rounded-lg transition-colors"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={handleOpenWhatsApp}
              className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-slate-950 bg-emerald-400 hover:bg-emerald-300 rounded-lg transition-colors shadow-xs"
            >
              <Send className="w-3.5 h-3.5" />
              Open in WhatsApp
              <ExternalLink className="w-3 h-3 opacity-75" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
