import React, { useState, useMemo } from 'react';
import { FeeInvoice, FeeStatus } from '../types';
import {
  IndianRupee,
  Search,
  Filter,
  Send,
  CheckCircle,
  Clock,
  AlertTriangle,
  QrCode,
  FileText,
  CreditCard,
  X,
  ExternalLink,
} from 'lucide-react';

interface FeesManagementViewProps {
  invoices: FeeInvoice[];
  onOpenReceipt: (invoice: FeeInvoice) => void;
  onOpenWhatsAppReminder: (invoice: FeeInvoice) => void;
  onMarkInvoicePaid: (invoiceId: string) => void;
}

export const FeesManagementView: React.FC<FeesManagementViewProps> = ({
  invoices,
  onOpenReceipt,
  onOpenWhatsAppReminder,
  onMarkInvoicePaid,
}) => {
  const [filterStatus, setFilterStatus] = useState<string>('ALL');
  const [searchQuery, setSearchQuery] = useState('');
  const [showUpiModal, setShowUpiModal] = useState(false);
  const [upiSelectedInvoice, setUpiSelectedInvoice] = useState<FeeInvoice | null>(null);

  // Totals
  const totalCollected = useMemo(() => {
    return invoices
      .filter((i) => i.status === 'Paid')
      .reduce((sum, i) => sum + i.amount, 0) + 245000;
  }, [invoices]);

  const overdueInvoices = useMemo(() => {
    return invoices.filter((i) => i.status === 'Overdue');
  }, [invoices]);

  const overdueTotal = useMemo(() => {
    return overdueInvoices.reduce((sum, i) => sum + i.amount, 0);
  }, [overdueInvoices]);

  const dueTotal = useMemo(() => {
    return invoices
      .filter((i) => i.status === 'Due')
      .reduce((sum, i) => sum + i.amount, 0);
  }, [invoices]);

  // Filtered invoices
  const filteredInvoices = useMemo(() => {
    return invoices.filter((inv) => {
      const matchSearch =
        inv.studentName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        inv.parentName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        inv.invoiceNo.toLowerCase().includes(searchQuery.toLowerCase());

      const matchStatus = filterStatus === 'ALL' || inv.status === filterStatus;
      return matchSearch && matchStatus;
    });
  }, [invoices, searchQuery, filterStatus]);

  const handleOpenUpi = (invoice: FeeInvoice) => {
    setUpiSelectedInvoice(invoice);
    setShowUpiModal(true);
  };

  return (
    <div className="space-y-6 pb-16 max-w-7xl mx-auto">
      {/* Top Banner */}
      <div className="p-5 rounded-2xl bg-gradient-to-r from-slate-900 via-slate-900 to-rose-950/40 border border-slate-800 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase bg-rose-500/20 text-rose-300 border border-rose-500/30">
              Fee Collections & Billing Ledger
            </span>
          </div>
          <h2 className="text-xl font-bold text-white mt-1">Dojang Fees & Payment Tracking</h2>
          <p className="text-xs text-slate-400">
            Automated WhatsApp reminders, instant UPI QR generation, and official GST receipts
          </p>
        </div>

        {/* Quick Batch Blast CTA */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => {
              if (overdueInvoices[0]) {
                onOpenWhatsAppReminder(overdueInvoices[0]);
              }
            }}
            className="px-4 py-2 text-xs font-semibold text-white bg-rose-600 hover:bg-rose-500 rounded-xl transition-colors shadow-xs flex items-center gap-1.5"
          >
            <Send className="w-3.5 h-3.5" />
            Chase Overdue Dues ({overdueInvoices.length})
          </button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800">
          <span className="text-xs font-medium text-slate-400">Total Collected (This Month)</span>
          <div className="text-2xl font-black font-mono text-emerald-400 mt-2 tabular-nums">
            ₹{totalCollected.toLocaleString('en-IN')}
          </div>
          <p className="text-[11px] text-slate-400 mt-1">Via UPI, Bank Transfer & Reception Desk</p>
        </div>

        <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800">
          <span className="text-xs font-medium text-slate-400">Immediate Overdue</span>
          <div className="text-2xl font-black font-mono text-rose-400 mt-2 tabular-nums">
            ₹{overdueTotal.toLocaleString('en-IN')}
          </div>
          <p className="text-[11px] text-rose-300 mt-1">
            {overdueInvoices.length} parents with payments pending
          </p>
        </div>

        <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800">
          <span className="text-xs font-medium text-slate-400">Upcoming Due (Next 7 Days)</span>
          <div className="text-2xl font-black font-mono text-amber-300 mt-2 tabular-nums">
            ₹{dueTotal.toLocaleString('en-IN')}
          </div>
          <p className="text-[11px] text-slate-400 mt-1">Automated reminders queued</p>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
        {/* Status Filter Tabs */}
        <div className="flex items-center gap-1.5 p-1 bg-slate-900 border border-slate-800 rounded-xl">
          <button
            onClick={() => setFilterStatus('ALL')}
            className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors ${
              filterStatus === 'ALL'
                ? 'bg-slate-800 text-white shadow-xs'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            All Invoices ({invoices.length})
          </button>
          <button
            onClick={() => setFilterStatus('Overdue')}
            className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors ${
              filterStatus === 'Overdue'
                ? 'bg-rose-950 text-rose-300 border border-rose-800'
                : 'text-slate-400 hover:text-rose-400'
            }`}
          >
            Overdue ({overdueInvoices.length})
          </button>
          <button
            onClick={() => setFilterStatus('Due')}
            className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors ${
              filterStatus === 'Due'
                ? 'bg-amber-950 text-amber-300 border border-amber-800'
                : 'text-slate-400 hover:text-amber-400'
            }`}
          >
            Due Soon
          </button>
          <button
            onClick={() => setFilterStatus('Paid')}
            className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors ${
              filterStatus === 'Paid'
                ? 'bg-emerald-950 text-emerald-300 border border-emerald-800'
                : 'text-slate-400 hover:text-emerald-400'
            }`}
          >
            Paid
          </button>
        </div>

        {/* Search */}
        <div className="relative w-full sm:w-72">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search student or invoice..."
            className="w-full pl-10 pr-4 py-2 bg-slate-900 border border-slate-800 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-rose-500"
          />
        </div>
      </div>

      {/* Invoice Table */}
      <div className="overflow-x-auto rounded-2xl border border-slate-800 bg-slate-900 shadow-xs">
        <table className="w-full text-left text-xs">
          <thead>
            <tr className="border-b border-slate-800 bg-slate-950/70 text-slate-400">
              <th className="py-3.5 px-4 font-semibold">Invoice #</th>
              <th className="py-3.5 px-4 font-semibold">Student & Parent</th>
              <th className="py-3.5 px-4 font-semibold">Batch & Plan</th>
              <th className="py-3.5 px-4 font-semibold font-mono text-right">Amount</th>
              <th className="py-3.5 px-4 font-semibold">Due Date</th>
              <th className="py-3.5 px-4 font-semibold">Status</th>
              <th className="py-3.5 px-4 font-semibold text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800/60">
            {filteredInvoices.map((inv) => (
              <tr key={inv.id} className="hover:bg-slate-800/40 transition-colors">
                <td className="py-3.5 px-4 font-mono font-medium text-slate-300">
                  {inv.invoiceNo}
                </td>

                <td className="py-3.5 px-4">
                  <span className="font-semibold text-white block">{inv.studentName}</span>
                  <span className="text-[11px] text-slate-400">
                    Parent: {inv.parentName} ({inv.phone})
                  </span>
                </td>

                <td className="py-3.5 px-4">
                  <span className="text-slate-200">{inv.batchName}</span>
                  <span className="block text-[10px] text-slate-400">{inv.plan} Plan</span>
                </td>

                <td className="py-3.5 px-4 text-right font-mono font-bold text-white">
                  ₹{inv.amount.toLocaleString('en-IN')}
                </td>

                <td className="py-3.5 px-4 font-mono text-slate-300">
                  {inv.dueDate}
                </td>

                <td className="py-3.5 px-4">
                  <span
                    className={`inline-block px-2 py-0.5 rounded text-[11px] font-bold ${
                      inv.status === 'Paid'
                        ? 'bg-emerald-950/80 text-emerald-400 border border-emerald-800/60'
                        : inv.status === 'Due'
                        ? 'bg-amber-950/80 text-amber-400 border border-amber-800/60'
                        : 'bg-rose-950/80 text-rose-400 border border-rose-800/60'
                    }`}
                  >
                    {inv.status}
                  </span>
                  {inv.paymentMode && (
                    <span className="block text-[10px] text-slate-400 mt-0.5 font-mono">
                      {inv.paymentMode}
                    </span>
                  )}
                </td>

                <td className="py-3.5 px-4 text-right">
                  <div className="flex items-center justify-end gap-1.5">
                    {/* View Receipt */}
                    <button
                      onClick={() => onOpenReceipt(inv)}
                      className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors"
                      title="View Official Receipt"
                    >
                      <FileText className="w-3.5 h-3.5" />
                    </button>

                    {/* WhatsApp Reminder (for due/overdue) */}
                    {inv.status !== 'Paid' && (
                      <button
                        onClick={() => onOpenWhatsAppReminder(inv)}
                        className="p-1.5 rounded-lg bg-emerald-600/20 hover:bg-emerald-600 text-emerald-400 hover:text-white transition-colors"
                        title="Send WhatsApp Payment Link"
                      >
                        <Send className="w-3.5 h-3.5" />
                      </button>
                    )}

                    {/* UPI QR Code Trigger */}
                    {inv.status !== 'Paid' && (
                      <button
                        onClick={() => handleOpenUpi(inv)}
                        className="p-1.5 rounded-lg bg-blue-600/20 hover:bg-blue-600 text-blue-400 hover:text-white transition-colors"
                        title="Generate UPI QR Code"
                      >
                        <QrCode className="w-3.5 h-3.5" />
                      </button>
                    )}

                    {/* Mark Paid action */}
                    {inv.status !== 'Paid' && (
                      <button
                        onClick={() => onMarkInvoicePaid(inv.id)}
                        className="px-2 py-1 rounded-lg bg-emerald-600 text-white text-[11px] font-semibold hover:bg-emerald-500 transition-colors"
                      >
                        Mark Paid
                      </button>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* UPI QR Payment Modal */}
      {showUpiModal && upiSelectedInvoice && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-xs animate-in fade-in duration-150">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl w-full max-w-sm shadow-2xl p-6 text-center space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                Instant UPI Payment
              </span>
              <button
                onClick={() => setShowUpiModal(false)}
                className="text-slate-400 hover:text-white p-1"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="bg-white p-4 rounded-2xl shadow-inner inline-block mx-auto border-2 border-slate-300">
              {/* Realistic SVG QR code representation */}
              <div className="w-44 h-44 bg-slate-950 p-2 rounded-lg flex flex-col justify-between">
                <div className="flex justify-between">
                  <div className="w-10 h-10 border-4 border-white bg-slate-950 flex items-center justify-center">
                    <div className="w-4 h-4 bg-white"></div>
                  </div>
                  <div className="w-10 h-10 border-4 border-white bg-slate-950 flex items-center justify-center">
                    <div className="w-4 h-4 bg-white"></div>
                  </div>
                </div>
                <div className="text-center text-white text-[10px] font-mono font-bold tracking-widest">
                  ₹{upiSelectedInvoice.amount} · UPI
                </div>
                <div className="flex justify-between items-end">
                  <div className="w-10 h-10 border-4 border-white bg-slate-950 flex items-center justify-center">
                    <div className="w-4 h-4 bg-white"></div>
                  </div>
                  <div className="w-8 h-8 bg-gradient-to-br from-rose-600 to-amber-600 text-white rounded flex items-center justify-center font-black text-xs">
                    TMA
                  </div>
                </div>
              </div>
            </div>

            <div>
              <p className="text-xs text-slate-400">Scan via Google Pay, PhonePe, Paytm</p>
              <p className="text-sm font-bold text-white mt-1">
                Amount: ₹{upiSelectedInvoice.amount.toLocaleString('en-IN')}
              </p>
              <p className="text-[11px] font-mono text-emerald-400 mt-0.5">
                VPA: thrustmartialarts@axisbank
              </p>
            </div>

            <button
              onClick={() => {
                onMarkInvoicePaid(upiSelectedInvoice.id);
                setShowUpiModal(false);
              }}
              className="w-full py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs transition-colors shadow-xs"
            >
              Confirm Received via UPI
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
