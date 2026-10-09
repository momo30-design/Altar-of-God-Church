import React, { useState } from 'react';
import { DonationRecord } from '../types';
import { formatCurrency } from '../utils/formatters';
import { X, Receipt, Download, Calendar, DollarSign, CreditCard } from 'lucide-react';

interface DonorLedgerModalProps {
  donations: DonationRecord[];
  onClose: () => void;
  onViewReceipt: (donation: DonationRecord) => void;
}

export const DonorLedgerModal: React.FC<DonorLedgerModalProps> = ({
  donations,
  onClose,
  onViewReceipt,
}) => {
  const [filterCategory, setFilterCategory] = useState<string>('all');

  const filteredDonations = filterCategory === 'all'
    ? donations
    : donations.filter(d => d.category === filterCategory);

  const totalZmw = donations
    .filter(d => d.currency === 'ZMW')
    .reduce((sum, d) => sum + d.amount, 0);

  const exportCsv = () => {
    if (donations.length === 0) return;
    const headers = ['Reference', 'Date', 'Name', 'Phone', 'Category', 'Amount', 'Currency', 'Payment Method', 'Airtel Txn'];
    const rows = donations.map(d => [
      d.referenceNumber,
      new Date(d.timestamp).toISOString(),
      d.donorName,
      d.donorPhone,
      d.categoryLabel,
      d.amount,
      d.currency,
      d.paymentMethod,
      d.airtelTransactionId || ''
    ]);
    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map(e => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `Altar_of_God_Giving_Statement_${new Date().getFullYear()}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm overflow-y-auto">
      <div className="relative w-full max-w-3xl bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl overflow-hidden my-8 text-white">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800 bg-slate-950/60">
          <div>
            <h2 className="text-lg font-bold text-amber-400 font-cinzel">My Giving Ledger & Statements</h2>
            <p className="text-xs text-slate-400">View and print official receipts for your kingdom contributions</p>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 hover:bg-slate-800 rounded-lg text-slate-400 hover:text-white transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Summary Stat Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="p-4 rounded-xl bg-slate-800/80 border border-slate-700/60">
              <span className="text-xs text-slate-400 font-medium">Total Contributions</span>
              <div className="text-xl font-bold font-mono text-emerald-400 mt-1">
                {formatCurrency(totalZmw, 'ZMW')}
              </div>
              <span className="text-[11px] text-slate-500">{donations.length} records logged</span>
            </div>

            <div className="p-4 rounded-xl bg-slate-800/80 border border-slate-700/60">
              <span className="text-xs text-slate-400 font-medium">Primary Method</span>
              <div className="text-sm font-semibold text-emerald-400 mt-1 flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500"></span>
                Airtel Money
              </div>
              <span className="text-[11px] text-slate-500">Fast & Verified Giving</span>
            </div>

            <div className="p-4 rounded-xl bg-slate-800/80 border border-slate-700/60 flex flex-col justify-between">
              <span className="text-xs text-slate-400 font-medium">Annual Statement</span>
              <button
                onClick={exportCsv}
                disabled={donations.length === 0}
                className="mt-2 flex items-center justify-center gap-1.5 py-1.5 px-3 bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 border border-amber-500/40 rounded-lg text-xs font-semibold transition disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Download className="w-3.5 h-3.5" />
                Export CSV Statement
              </button>
            </div>
          </div>

          {/* Filter Bar */}
          <div className="flex flex-wrap items-center justify-between gap-3 pt-2 border-t border-slate-800">
            <span className="text-xs font-medium text-slate-400">Filter Purpose:</span>
            <div className="flex flex-wrap gap-1.5 text-xs">
              {['all', 'tithe', 'offering', 'building', 'missions', 'welfare'].map((cat) => (
                <button
                  key={cat}
                  onClick={() => setFilterCategory(cat)}
                  className={`px-3 py-1 rounded-lg capitalize transition ${
                    filterCategory === cat
                      ? 'bg-amber-500 text-slate-950 font-semibold'
                      : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                  }`}
                >
                  {cat === 'all' ? 'All Contributions' : cat}
                </button>
              ))}
            </div>
          </div>

          {/* Records List */}
          {filteredDonations.length === 0 ? (
            <div className="py-12 text-center border border-dashed border-slate-800 rounded-xl">
              <Receipt className="w-10 h-10 text-slate-600 mx-auto mb-2" />
              <p className="text-sm text-slate-400 font-medium">No donation records found</p>
              <p className="text-xs text-slate-600 mt-1">
                Your contributions via Airtel Money or other methods will appear here with instant printable receipts.
              </p>
            </div>
          ) : (
            <div className="overflow-x-auto border border-slate-800 rounded-xl">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-950 text-slate-400 uppercase tracking-wider text-[10px]">
                  <tr>
                    <th className="py-3 px-4">Date</th>
                    <th className="py-3 px-4">Receipt Ref</th>
                    <th className="py-3 px-4">Purpose</th>
                    <th className="py-3 px-4">Channel</th>
                    <th className="py-3 px-4 text-right">Amount</th>
                    <th className="py-3 px-4 text-center">Receipt</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800 text-slate-200">
                  {filteredDonations.map((item) => (
                    <tr key={item.id} className="hover:bg-slate-800/50 transition">
                      <td className="py-3 px-4 text-slate-400 whitespace-nowrap">
                        {new Date(item.timestamp).toLocaleDateString('en-GB', {
                          day: '2-digit',
                          month: 'short',
                          year: 'numeric'
                        })}
                      </td>
                      <td className="py-3 px-4 font-mono font-medium text-amber-300/90 whitespace-nowrap">
                        {item.referenceNumber}
                      </td>
                      <td className="py-3 px-4 whitespace-nowrap font-medium">
                        {item.categoryLabel}
                      </td>
                      <td className="py-3 px-4 whitespace-nowrap">
                        {item.paymentMethod === 'airtel' ? (
                          <span className="inline-flex items-center gap-1.5 text-emerald-400 font-semibold">
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
                            Airtel Money
                          </span>
                        ) : (
                          <span className="capitalize text-slate-400">{item.paymentMethod}</span>
                        )}
                      </td>
                      <td className="py-3 px-4 font-mono font-bold text-right text-emerald-400 whitespace-nowrap">
                        {formatCurrency(item.amount, item.currency)}
                      </td>
                      <td className="py-3 px-4 text-center">
                        <button
                          onClick={() => onViewReceipt(item)}
                          className="px-2.5 py-1 bg-amber-500/10 hover:bg-amber-500/20 text-amber-300 border border-amber-500/30 rounded text-[11px] font-semibold transition"
                        >
                          View Receipt
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-6 py-4 bg-slate-950/60 border-t border-slate-800 flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-lg text-xs font-semibold transition"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
