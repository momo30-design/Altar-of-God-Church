import React from 'react';
import { DonationRecord } from '../types';
import { formatCurrency, numberToWords } from '../utils/formatters';
import { CHURCH_CONFIG, AIRTEL_MONEY_CONFIG } from '../data/churchData';
import { X, Printer, CheckCircle, ShieldCheck, Download } from 'lucide-react';

interface ReceiptModalProps {
  donation: DonationRecord | null;
  onClose: () => void;
}

export const ReceiptModal: React.FC<ReceiptModalProps> = ({ donation, onClose }) => {
  if (!donation) return null;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm overflow-y-auto">
      <div className="relative w-full max-w-2xl bg-white text-slate-900 rounded-2xl shadow-2xl overflow-hidden my-8 border border-amber-200">
        {/* Modal Controls (Hidden in Print) */}
        <div className="flex items-center justify-between px-6 py-4 bg-slate-900 text-white border-b border-slate-800 print:hidden">
          <div className="flex items-center gap-2">
            <CheckCircle className="w-5 h-5 text-emerald-400" />
            <span className="font-semibold text-sm">Official Church Giving Receipt</span>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-amber-600 hover:bg-amber-500 text-white rounded-lg text-xs font-semibold transition"
            >
              <Printer className="w-4 h-4" />
              Print Receipt
            </button>
            <button
              onClick={onClose}
              className="p-1.5 hover:bg-slate-800 rounded-lg text-slate-400 hover:text-white transition"
              aria-label="Close"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Printable Receipt Body */}
        <div id="printable-receipt" className="p-8 sm:p-10 bg-[#faf8f4] text-slate-900 font-sans">
          {/* Header Banner */}
          <div className="border-b-2 border-amber-600/40 pb-6 text-center">
            <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-slate-900 text-amber-400 mb-3 shadow">
              <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M12 2v20M7 8h10" />
                <path d="M12 3c-2 3-5 5-5 9a5 5 0 0010 0c0-4-3-6-5-9z" fill="currentColor" fillOpacity="0.2" />
              </svg>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900 font-cinzel">
              {CHURCH_CONFIG.name}
            </h1>
            <p className="text-xs uppercase tracking-widest text-amber-800 font-semibold mt-1">
              National Headquarters & Sanctuary of Grace
            </p>
            <p className="text-xs text-slate-500 mt-1 max-w-md mx-auto">
              {CHURCH_CONFIG.address} · Tel: {CHURCH_CONFIG.phone}
            </p>
            <div className="mt-2 text-[11px] text-slate-400">
              Societies Act Reg: ORS/AGM-2012/7740 · Tax-Exempt Religious Body
            </div>
          </div>

          {/* Receipt Title Bar */}
          <div className="flex flex-wrap items-center justify-between my-6 py-3 px-4 bg-amber-50 border border-amber-200/80 rounded-lg">
            <div>
              <div className="text-[11px] font-bold uppercase tracking-wider text-amber-900">
                OFFICIAL CONTRIBUTION RECEIPT
              </div>
              <div className="font-mono text-sm font-semibold text-slate-800">
                No: {donation.referenceNumber}
              </div>
            </div>
            <div className="text-right">
              <div className="text-[11px] uppercase tracking-wider text-slate-500">Date & Time</div>
              <div className="text-xs font-semibold text-slate-800">
                {new Date(donation.timestamp).toLocaleDateString('en-GB', {
                  day: '2-digit',
                  month: 'short',
                  year: 'numeric',
                  hour: '2-digit',
                  minute: '2-digit'
                })}
              </div>
            </div>
          </div>

          {/* Receipt Details Grid */}
          <div className="space-y-4 text-sm">
            <div className="grid grid-cols-3 gap-2 py-2 border-b border-slate-200">
              <span className="text-slate-500 font-medium">Received From:</span>
              <span className="col-span-2 font-bold text-slate-900">
                {donation.donorName || 'Beloved in Christ (Anonymous Giver)'}
              </span>
            </div>

            <div className="grid grid-cols-3 gap-2 py-2 border-b border-slate-200">
              <span className="text-slate-500 font-medium">Phone / Contact:</span>
              <span className="col-span-2 font-mono text-slate-800">
                {donation.donorPhone || 'N/A'}
              </span>
            </div>

            <div className="grid grid-cols-3 gap-2 py-2 border-b border-slate-200">
              <span className="text-slate-500 font-medium">Category / Purpose:</span>
              <span className="col-span-2 font-bold text-amber-900">
                {donation.categoryLabel}
              </span>
            </div>

            <div className="grid grid-cols-3 gap-2 py-2 border-b border-slate-200">
              <span className="text-slate-500 font-medium">Amount Received:</span>
              <div className="col-span-2">
                <span className="text-xl font-extrabold text-emerald-800 font-mono">
                  {formatCurrency(donation.amount, donation.currency)}
                </span>
                <p className="text-xs text-slate-600 italic mt-0.5">
                  ({numberToWords(donation.amount)})
                </p>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-2 py-2 border-b border-slate-200">
              <span className="text-slate-500 font-medium">Payment Channel:</span>
              <span className="col-span-2 text-slate-800 flex items-center gap-1.5 font-medium">
                {donation.paymentMethod === 'airtel' && (
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold border border-emerald-300">
                    <span className="w-2 h-2 rounded-full bg-emerald-600"></span>
                    Airtel Money ({AIRTEL_MONEY_CONFIG.displayPhone})
                  </span>
                )}
                {donation.paymentMethod === 'mtn' && (
                  <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-yellow-100 text-yellow-800 text-xs font-bold">
                    MTN MoMo (+260964293130)
                  </span>
                )}
                {donation.paymentMethod === 'bank' && (
                  <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-blue-100 text-blue-800 text-xs font-bold">
                    NATSAVE Bank Transfer (2070668192902)
                  </span>
                )}
                {donation.paymentMethod === 'card' && 'Credit/Debit Card'}
                {donation.paymentMethod === 'zamtel' && 'Zamtel Kwacha'}
                {donation.airtelTransactionId && (
                  <span className="text-xs font-mono text-slate-500 ml-1">
                    (Txn: {donation.airtelTransactionId})
                  </span>
                )}
              </span>
            </div>

            {donation.notes && (
              <div className="grid grid-cols-3 gap-2 py-2 border-b border-slate-200">
                <span className="text-slate-500 font-medium">Prayer Point / Note:</span>
                <span className="col-span-2 text-xs text-slate-700 italic">
                  "{donation.notes}"
                </span>
              </div>
            )}
          </div>

          {/* Scripture & Blessing */}
          <div className="mt-8 p-4 bg-amber-50/70 border border-amber-200 rounded-xl text-center">
            <p className="text-xs italic text-amber-950 font-serif leading-relaxed">
              “Now he that ministereth seed to the sower both minister bread for your food, and multiply your seed sown, and increase the fruits of your righteousness.”
            </p>
            <div className="text-[11px] font-semibold text-amber-800 mt-1">
              — 2 Corinthians 9:10
            </div>
          </div>

          {/* Signatures & Seal */}
          <div className="mt-8 pt-4 border-t border-slate-200 flex items-end justify-between">
            <div>
              <div className="w-28 h-10 border-b border-slate-400 font-serif italic text-slate-700 flex items-end justify-center text-sm pb-1">
                M. Mwale
              </div>
              <div className="text-xs font-bold text-slate-800 mt-1">Pastor Moses Mwale</div>
              <div className="text-[10px] text-slate-500 font-medium">Founder & Senior Pastor</div>
            </div>

            {/* Official Stamp Simulation */}
            <div className="border-2 border-dashed border-emerald-800/80 rounded-lg p-2 text-center rotate-[-4deg] bg-emerald-50/50">
              <div className="text-[9px] font-black uppercase tracking-wider text-emerald-800">
                ALTAR OF GOD MINISTRIES
              </div>
              <div className="text-[11px] font-extrabold text-emerald-900">
                VERIFIED & RECEIVED
              </div>
              <div className="text-[8px] text-emerald-700 font-mono">
                TREASURY ACCOUNTS
              </div>
            </div>

            <div className="text-right">
              <div className="w-24 h-10 border-b border-slate-400 font-serif italic text-slate-600 flex items-end justify-center text-sm pb-1 ml-auto">
                H. Banda
              </div>
              <div className="text-xs font-bold text-slate-800 mt-1">Board of Trustees</div>
              <div className="text-[10px] text-slate-500">Director of Finance</div>
            </div>
          </div>

          <div className="mt-6 pt-3 border-t border-slate-200 text-center text-[10px] text-slate-400">
            This is an electronically generated official receipt issued under the authority of Altar of God Ministries. Thank you for your faithful covenant partnership.
          </div>
        </div>

        {/* Modal Footer Controls */}
        <div className="px-6 py-4 bg-slate-100 border-t border-slate-200 flex justify-end gap-3 print:hidden">
          <button
            onClick={onClose}
            className="px-4 py-2 border border-slate-300 text-slate-700 hover:bg-slate-200 rounded-lg text-xs font-semibold transition"
          >
            Close
          </button>
          <button
            onClick={handlePrint}
            className="flex items-center gap-1.5 px-5 py-2 bg-slate-900 hover:bg-slate-800 text-amber-400 rounded-lg text-xs font-semibold transition shadow"
          >
            <Printer className="w-4 h-4" />
            Print or Save as PDF
          </button>
        </div>
      </div>
    </div>
  );
};
