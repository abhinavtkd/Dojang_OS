import React from 'react';
import { FeeInvoice, OrganizationConfig } from '../types';
import { X, Printer, CheckCircle, Shield, Download } from 'lucide-react';

interface ReceiptModalProps {
  invoice: FeeInvoice | null;
  orgConfig?: OrganizationConfig;
  onClose: () => void;
}

export const ReceiptModal: React.FC<ReceiptModalProps> = ({ invoice, orgConfig, onClose }) => {
  if (!invoice) return null;

  const handlePrint = () => {
    window.print();
  };

  const academyName = orgConfig?.name || 'THRUST MARTIAL ARTS ACADEMY';
  const academyCode = orgConfig?.shortCode || 'TMA';
  const academyAddress = orgConfig?.address || 'Basement, GD Goenka La Petite, D-23, School Lane, Chhatarpur Enclave, New Delhi 110074';
  const academyTagline = orgConfig?.tagline || 'Premier Taekwondo & Martial Arts Training Center';
  const academySocial = orgConfig?.instagram || '@thrust_martial_arts_academy';
  const headmasterName = orgConfig?.headmaster || 'Master Nikhil Tyagi';
  const headmasterRank = orgConfig?.headmasterRank || '5th Dan Black Belt';

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-xs animate-in fade-in duration-150">
      <div className="bg-slate-900 border border-slate-800 rounded-2xl w-full max-w-lg shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        {/* Modal Header */}
        <div className="px-6 py-4 border-b border-slate-800 flex items-center justify-between bg-slate-950/60">
          <div className="flex items-center gap-2">
            <span className="p-1.5 rounded-lg bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
              <CheckCircle className="w-4 h-4" />
            </span>
            <div>
              <h3 className="text-sm font-semibold text-slate-100">Fee Payment Receipt</h3>
              <p className="text-xs text-slate-400">Invoice #{invoice.invoiceNo}</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Printable Receipt Paper Body */}
        <div className="p-6 overflow-y-auto bg-slate-900 text-slate-200 text-sm">
          <div className="border border-slate-800 bg-slate-950/80 rounded-xl p-5 shadow-inner">
            {/* Academy Branding Header */}
            <div className="flex justify-between items-start border-b border-slate-800/80 pb-4">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <div className="w-6 h-6 rounded bg-gradient-to-br from-rose-600 to-amber-600 flex items-center justify-center font-black text-white text-xs">
                    {academyCode}
                  </div>
                  <h4 className="font-bold text-slate-100 tracking-tight uppercase">{academyName}</h4>
                </div>
                <p className="text-xs text-slate-400 leading-relaxed">
                  {academyTagline}
                  <br />
                  {academyAddress}
                  <br />
                  Instagram: {academySocial} · Affiliated to Kukkiwon / World Taekwondo
                </p>
              </div>
              <div className="text-right">
                <span className="px-2 py-0.5 text-[11px] font-bold uppercase rounded bg-emerald-950/80 text-emerald-400 border border-emerald-800">
                  {invoice.status}
                </span>
                <p className="text-xs text-slate-400 mt-1 font-mono">
                  {invoice.paidDate ? `Date: ${invoice.paidDate}` : `Due: ${invoice.dueDate}`}
                </p>
              </div>
            </div>

            {/* Student & Parent Info */}
            <div className="grid grid-cols-2 gap-4 py-4 border-b border-slate-800/80 text-xs">
              <div>
                <p className="text-slate-500 font-medium uppercase text-[10px] tracking-wider">Billed To Student</p>
                <p className="font-semibold text-slate-200 text-sm mt-0.5">{invoice.studentName}</p>
                <p className="text-slate-400">Parent: {invoice.parentName}</p>
                <p className="text-slate-400 font-mono">{invoice.phone}</p>
              </div>
              <div className="text-right">
                <p className="text-slate-500 font-medium uppercase text-[10px] tracking-wider">Batch & Program</p>
                <p className="font-semibold text-slate-200 mt-0.5">{invoice.batchName}</p>
                <p className="text-slate-400">Plan: {invoice.plan} Tuition Fee</p>
                {invoice.paymentMode && (
                  <p className="text-emerald-400 font-mono mt-1">
                    Mode: {invoice.paymentMode} ({invoice.transactionRef || 'SUCCESS'})
                  </p>
                )}
              </div>
            </div>

            {/* Line Items */}
            <div className="py-4 border-b border-slate-800/80">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="text-slate-400 border-b border-slate-800">
                    <th className="pb-2 font-medium">Description</th>
                    <th className="pb-2 text-right font-medium">Period</th>
                    <th className="pb-2 text-right font-medium">Amount</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/40">
                  <tr>
                    <td className="py-2.5 text-slate-200 font-medium">
                      Taekwondo Dojang Tuition & Training Fee
                      <span className="block text-[11px] text-slate-400">Includes sparring, poomsae & fitness drills</span>
                    </td>
                    <td className="py-2.5 text-right text-slate-400 font-mono">Oct 2026</td>
                    <td className="py-2.5 text-right font-mono text-slate-100 font-semibold">₹{invoice.amount.toLocaleString('en-IN')}</td>
                  </tr>
                  <tr>
                    <td className="py-2 text-slate-400">Dojang Equipment & Tatami Maintenance</td>
                    <td className="py-2 text-right text-slate-400 font-mono">Included</td>
                    <td className="py-2 text-right font-mono text-slate-400">₹0</td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* Total */}
            <div className="pt-3 flex justify-between items-center text-sm">
              <span className="font-semibold text-slate-300">Total Paid (INR)</span>
              <span className="text-lg font-bold font-mono text-emerald-400">
                ₹{invoice.amount.toLocaleString('en-IN')}.00
              </span>
            </div>

            {/* Master Signature & Stamp simulation */}
            <div className="mt-6 pt-4 border-t border-slate-800/80 flex justify-between items-end text-[11px]">
              <div className="flex items-center gap-2 text-slate-500">
                <Shield className="w-4 h-4 text-slate-600" />
                <span>Verified Official Digital Receipt · Valid without manual sign</span>
              </div>
              <div className="text-right">
                <div className="font-serif italic text-rose-400 text-xs tracking-wider">{headmasterName}, {headmasterRank}</div>
                <p className="text-slate-500 font-medium mt-0.5">Authorised Signatory · {academyName}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Modal Actions */}
        <div className="px-6 py-4 border-t border-slate-800 bg-slate-950/60 flex items-center justify-end gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2 text-xs font-medium text-slate-300 hover:text-white rounded-lg hover:bg-slate-800 transition-colors"
          >
            Close
          </button>
          <button
            onClick={handlePrint}
            className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-slate-900 bg-slate-100 hover:bg-white rounded-lg transition-colors shadow-xs"
          >
            <Printer className="w-3.5 h-3.5" />
            Print Receipt
          </button>
        </div>
      </div>
    </div>
  );
};
