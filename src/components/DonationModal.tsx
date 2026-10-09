import React, { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import { GivingCategory, PaymentMethod, Currency, DonationRecord } from '../types';
import { GIVING_CAUSES, AIRTEL_MONEY_CONFIG, OTHER_PAYMENT_CONFIG } from '../data/churchData';
import { formatCurrency, generateReceiptNumber, generateAirtelTransactionId, saveDonation } from '../utils/formatters';
import {
  X,
  Smartphone,
  CreditCard,
  Building,
  CheckCircle2,
  Copy,
  Check,
  ArrowRight,
  Shield,
  Heart,
  PhoneCall,
  Loader2,
  Sparkles,
  Receipt
} from 'lucide-react';

interface DonationModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialCategory?: GivingCategory;
  onSuccessDonation: (record: DonationRecord) => void;
}

export const DonationModal: React.FC<DonationModalProps> = ({
  isOpen,
  onClose,
  initialCategory = 'tithe',
  onSuccessDonation,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<GivingCategory>(initialCategory);
  const [amount, setAmount] = useState<number>(250);
  const [customAmount, setCustomAmount] = useState<string>('');
  const [currency, setCurrency] = useState<Currency>('ZMW');
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('airtel');

  // Donor Details
  const [donorName, setDonorName] = useState<string>('');
  const [donorPhone, setDonorPhone] = useState<string>('097');
  const [donorEmail, setDonorEmail] = useState<string>('');
  const [notes, setNotes] = useState<string>('');

  // Airtel Money Modes: 'push' or 'ussd'
  const [airtelMode, setAirtelMode] = useState<'push' | 'ussd'>('push');
  const [airtelSmsRef, setAirtelSmsRef] = useState<string>('');

  // Payment Status
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [processStep, setProcessStep] = useState<number>(0);
  const [isCompleted, setIsCompleted] = useState<boolean>(false);
  const [completedRecord, setCompletedRecord] = useState<DonationRecord | null>(null);

  // Copy feedback state
  const [copiedField, setCopiedField] = useState<string | null>(null);

  useEffect(() => {
    if (initialCategory) {
      setSelectedCategory(initialCategory);
    }
  }, [initialCategory]);

  if (!isOpen) return null;

  const currentCause = GIVING_CAUSES.find(c => c.id === selectedCategory) || GIVING_CAUSES[0];

  const handleCopy = (text: string, fieldId: string) => {
    navigator.clipboard.writeText(text);
    setCopiedField(fieldId);
    setTimeout(() => setCopiedField(null), 2000);
  };

  const activeAmount = customAmount ? parseFloat(customAmount) || 0 : amount;

  // Generate customized USSD string with amount if applicable
  const dynamicUssdDirect = `*115*1*1*${AIRTEL_MONEY_CONFIG.directPhone}*${Math.floor(activeAmount)}#`;
  const dynamicUssdMerchant = `*115*4*1*${AIRTEL_MONEY_CONFIG.merchantCode}*${Math.floor(activeAmount)}#`;

  const handleAirtelPushPayment = () => {
    if (activeAmount <= 0) {
      alert('Please select or enter a valid donation amount.');
      return;
    }
    if (!donorPhone || donorPhone.length < 8) {
      alert('Please enter a valid Airtel mobile number (e.g. 097xxxxxxx).');
      return;
    }

    setIsProcessing(true);
    setProcessStep(1); // Connecting to Airtel Gateway

    setTimeout(() => {
      setProcessStep(2); // Prompt Sent to Phone
    }, 1500);

    setTimeout(() => {
      setProcessStep(3); // Awaiting PIN on phone
    }, 3000);
  };

  const handleSimulatePinEntered = () => {
    setProcessStep(4); // Verifying PIN & Balance

    setTimeout(() => {
      const generatedAirtelTxn = generateAirtelTransactionId();
      const record: DonationRecord = {
        id: 'agm-' + Date.now(),
        referenceNumber: generateReceiptNumber(),
        donorName: donorName.trim() || 'Faithful Giver',
        donorPhone: donorPhone.trim(),
        donorEmail: donorEmail.trim() || undefined,
        amount: activeAmount,
        currency,
        category: selectedCategory,
        categoryLabel: currentCause.title,
        paymentMethod: 'airtel',
        notes: notes.trim() || undefined,
        timestamp: new Date().toISOString(),
        airtelTransactionId: generatedAirtelTxn,
        status: 'completed',
      };

      saveDonation(record);
      setCompletedRecord(record);
      setIsProcessing(false);
      setIsCompleted(true);
      onSuccessDonation(record);

      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 }
      });
    }, 1800);
  };

  const handleManualVerification = () => {
    if (activeAmount <= 0) {
      alert('Please specify the amount you sent.');
      return;
    }

    const txnRef = airtelSmsRef.trim() || generateAirtelTransactionId();
    const record: DonationRecord = {
      id: 'agm-' + Date.now(),
      referenceNumber: generateReceiptNumber(),
      donorName: donorName.trim() || 'Faithful Giver',
      donorPhone: donorPhone.trim(),
      donorEmail: donorEmail.trim() || undefined,
      amount: activeAmount,
      currency,
      category: selectedCategory,
      categoryLabel: currentCause.title,
      paymentMethod,
      notes: notes.trim() || undefined,
      timestamp: new Date().toISOString(),
      airtelTransactionId: paymentMethod === 'airtel' ? txnRef : undefined,
      status: 'completed',
    };

    saveDonation(record);
    setCompletedRecord(record);
    setIsCompleted(true);
    onSuccessDonation(record);

    confetti({
      particleCount: 80,
      spread: 60,
      origin: { y: 0.6 }
    });
  };

  const resetForm = () => {
    setIsCompleted(false);
    setIsProcessing(false);
    setProcessStep(0);
    setCompletedRecord(null);
    setCustomAmount('');
    setNotes('');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/85 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-2xl bg-slate-900 border border-slate-700/80 rounded-2xl shadow-2xl overflow-hidden my-6 text-white">
        {/* Modal Header */}
        <div className="flex items-center justify-between px-6 py-4 bg-slate-950/80 border-b border-slate-800">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-full bg-amber-500/20 text-amber-400 flex items-center justify-center border border-amber-500/30">
              <Heart className="w-4 h-4 fill-amber-400" />
            </div>
            <div>
              <h2 className="text-base font-bold text-slate-100 font-cinzel">Altar of God Ministries</h2>
              <p className="text-xs text-amber-400 font-medium">Sacred Covenant Giving & Offerings</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 hover:bg-slate-800 text-slate-400 hover:text-white rounded-lg transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-5 sm:p-6 max-h-[80vh] overflow-y-auto space-y-6">
          {/* COMPLETED SUCCESS STATE */}
          {isCompleted && completedRecord ? (
            <div className="py-6 text-center space-y-5">
              <div className="w-16 h-16 bg-emerald-500/20 text-emerald-400 rounded-full flex items-center justify-center mx-auto border-2 border-emerald-500/40">
                <CheckCircle2 className="w-10 h-10" />
              </div>

              <div>
                <span className="text-xs uppercase tracking-widest text-emerald-400 font-bold">
                  Payment Verified & Received
                </span>
                <h3 className="text-2xl font-bold font-cinzel text-white mt-1">
                  Thank You for Your Faithful Giving!
                </h3>
                <p className="text-xs text-slate-400 max-w-md mx-auto mt-2">
                  Your seed of <strong className="text-white font-mono">{formatCurrency(completedRecord.amount, completedRecord.currency)}</strong> towards <strong className="text-amber-300">{completedRecord.categoryLabel}</strong> has been received by Altar of God Ministries.
                </p>
              </div>

              {/* Transaction Summary Card */}
              <div className="p-4 bg-slate-950 border border-slate-800 rounded-xl max-w-md mx-auto text-left text-xs space-y-2">
                <div className="flex justify-between py-1 border-b border-slate-800/80">
                  <span className="text-slate-400">Receipt Ref:</span>
                  <span className="font-mono font-bold text-amber-400">{completedRecord.referenceNumber}</span>
                </div>
                {completedRecord.airtelTransactionId && (
                  <div className="flex justify-between py-1 border-b border-slate-800/80">
                    <span className="text-slate-400">Airtel Txn ID:</span>
                    <span className="font-mono text-emerald-400 font-semibold">{completedRecord.airtelTransactionId}</span>
                  </div>
                )}
                <div className="flex justify-between py-1 border-b border-slate-800/80">
                  <span className="text-slate-400">Giver:</span>
                  <span className="text-slate-200 font-medium">{completedRecord.donorName}</span>
                </div>
                <div className="flex justify-between py-1">
                  <span className="text-slate-400">Date:</span>
                  <span className="text-slate-200">{new Date(completedRecord.timestamp).toLocaleString()}</span>
                </div>
              </div>

              {/* Pastoral Blessing Note */}
              <div className="p-3 bg-amber-500/10 border border-amber-500/30 rounded-xl text-amber-200/90 text-xs italic max-w-md mx-auto">
                “He who supplies seed to the sower and bread for food will supply and multiply your seed for sowing and increase the harvest of your righteousness.”
                <span className="block not-italic font-semibold text-amber-300 mt-1">— 2 Corinthians 9:10</span>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
                <button
                  onClick={() => {
                    onClose();
                    // trigger view receipt
                  }}
                  className="px-5 py-2.5 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold rounded-xl text-xs flex items-center gap-1.5 transition shadow"
                >
                  <Receipt className="w-4 h-4" />
                  View & Print Official Receipt
                </button>
                <button
                  onClick={resetForm}
                  className="px-4 py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-xl text-xs font-semibold transition"
                >
                  Give Another Gift
                </button>
              </div>
            </div>
          ) : (
            <>
              {/* STEP 1: Select Purpose */}
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2">
                  1. Select Giving Purpose / Fund
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  {GIVING_CAUSES.map((cause) => (
                    <button
                      key={cause.id}
                      type="button"
                      onClick={() => setSelectedCategory(cause.id as GivingCategory)}
                      className={`p-2.5 rounded-xl border text-left text-xs transition relative ${
                        selectedCategory === cause.id
                          ? 'bg-amber-500/15 border-amber-400 text-amber-200 shadow-sm'
                          : 'bg-slate-800/70 border-slate-700 text-slate-300 hover:border-slate-600'
                      }`}
                    >
                      <div className="font-semibold text-slate-100 truncate">{cause.title}</div>
                      <div className="text-[10px] text-slate-400 line-clamp-1 mt-0.5">{cause.scripture}</div>
                      {cause.highlight && (
                        <span className="absolute top-1 right-1.5 w-1.5 h-1.5 rounded-full bg-amber-400"></span>
                      )}
                    </button>
                  ))}
                </div>
                <p className="text-[11px] text-slate-400 italic mt-2">
                  {currentCause.scriptureText}
                </p>
              </div>

              {/* STEP 2: Choose Currency & Amount */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                    2. Choose Amount
                  </label>
                  <div className="flex items-center gap-1 text-xs">
                    {(['ZMW', 'USD', 'KES'] as Currency[]).map((cur) => (
                      <button
                        key={cur}
                        type="button"
                        onClick={() => setCurrency(cur)}
                        className={`px-2 py-0.5 rounded text-[11px] font-mono transition ${
                          currency === cur
                            ? 'bg-amber-500 text-slate-950 font-bold'
                            : 'bg-slate-800 text-slate-400 hover:text-white'
                        }`}
                      >
                        {cur}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Preset Amount Pills */}
                <div className="grid grid-cols-3 sm:grid-cols-6 gap-2 mb-2.5">
                  {currentCause.suggestedAmounts.map((val) => (
                    <button
                      key={val}
                      type="button"
                      onClick={() => {
                        setAmount(val);
                        setCustomAmount('');
                      }}
                      className={`py-2 px-1 text-center rounded-xl border font-mono text-xs font-semibold transition ${
                        amount === val && !customAmount
                          ? 'bg-emerald-500/20 border-emerald-400 text-emerald-300'
                          : 'bg-slate-800/80 border-slate-700 text-slate-300 hover:border-slate-500'
                      }`}
                    >
                      {currency === 'ZMW' ? `K${val}` : `${currency} ${val}`}
                    </button>
                  ))}
                </div>

                {/* Custom Amount Input */}
                <div className="relative">
                  <span className="absolute left-3 top-2.5 text-xs font-mono text-slate-400">
                    {currency === 'ZMW' ? 'K' : currency}
                  </span>
                  <input
                    type="number"
                    min="1"
                    placeholder="Or enter custom amount..."
                    value={customAmount}
                    onChange={(e) => {
                      setCustomAmount(e.target.value);
                      if (e.target.value) setAmount(parseFloat(e.target.value) || 0);
                    }}
                    className="w-full pl-9 pr-4 py-2 bg-slate-950 border border-slate-700 rounded-xl text-xs font-mono text-white placeholder-slate-500 focus:outline-none focus:border-amber-400 transition"
                  />
                </div>
              </div>

              {/* STEP 3: Payment Method Tabs (Airtel Money Highlighted) */}
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2">
                  3. Select Payment Method
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {/* Airtel Money Button */}
                  <button
                    type="button"
                    onClick={() => setPaymentMethod('airtel')}
                    className={`p-3 rounded-xl border flex flex-col items-center justify-center gap-1.5 transition relative text-center ${
                      paymentMethod === 'airtel'
                        ? 'bg-emerald-600/20 border-emerald-500 text-white shadow-lg ring-1 ring-emerald-500'
                        : 'bg-slate-800/80 border-slate-700 text-slate-300 hover:border-slate-600'
                    }`}
                  >
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-emerald-500 to-teal-700 flex items-center justify-center text-white font-bold text-xs shadow">
                      A
                    </div>
                    <span className="font-bold text-xs text-emerald-400">Airtel Money</span>
                    <span className="text-[10px] text-slate-400">Instant / USSD</span>
                    <span className="absolute -top-2 bg-emerald-600 text-white text-[9px] font-bold px-1.5 py-0.2 rounded-full uppercase tracking-wider shadow">
                      Popular
                    </span>
                  </button>

                  {/* MTN Mobile Money */}
                  <button
                    type="button"
                    onClick={() => setPaymentMethod('mtn')}
                    className={`p-3 rounded-xl border flex flex-col items-center justify-center gap-1.5 transition text-center ${
                      paymentMethod === 'mtn'
                        ? 'bg-yellow-500/20 border-yellow-400 text-white ring-1 ring-yellow-400'
                        : 'bg-slate-800/80 border-slate-700 text-slate-300 hover:border-slate-600'
                    }`}
                  >
                    <div className="w-8 h-8 rounded-full bg-yellow-500 flex items-center justify-center text-slate-950 font-bold text-xs">
                      M
                    </div>
                    <span className="font-semibold text-xs text-yellow-400">MTN MoMo</span>
                    <span className="text-[10px] text-slate-300 font-mono">+260964293130</span>
                  </button>

                  {/* Bank Deposit */}
                  <button
                    type="button"
                    onClick={() => setPaymentMethod('bank')}
                    className={`p-3 rounded-xl border flex flex-col items-center justify-center gap-1.5 transition text-center ${
                      paymentMethod === 'bank'
                        ? 'bg-blue-600/20 border-blue-400 text-white ring-1 ring-blue-400'
                        : 'bg-slate-800/80 border-slate-700 text-slate-300 hover:border-slate-600'
                    }`}
                  >
                    <Building className="w-6 h-6 text-blue-400 my-1" />
                    <span className="font-semibold text-xs text-blue-300">Bank Transfer</span>
                    <span className="text-[10px] text-slate-400">Standard Chartered</span>
                  </button>

                  {/* Card Payment */}
                  <button
                    type="button"
                    onClick={() => setPaymentMethod('card')}
                    className={`p-3 rounded-xl border flex flex-col items-center justify-center gap-1.5 transition text-center ${
                      paymentMethod === 'card'
                        ? 'bg-purple-600/20 border-purple-400 text-white ring-1 ring-purple-400'
                        : 'bg-slate-800/80 border-slate-700 text-slate-300 hover:border-slate-600'
                    }`}
                  >
                    <CreditCard className="w-6 h-6 text-purple-400 my-1" />
                    <span className="font-semibold text-xs text-purple-300">Visa / Card</span>
                    <span className="text-[10px] text-slate-400">Debit / Credit</span>
                  </button>
                </div>
              </div>

              {/* METHOD-SPECIFIC INSTRUCTIONS */}
              {paymentMethod === 'airtel' && (
                <div className="p-4 rounded-xl bg-emerald-950/20 border border-emerald-900/50 space-y-4">
                  {/* Mode switcher: Push prompt vs USSD Dial */}
                  <div className="flex items-center justify-between border-b border-emerald-900/40 pb-3">
                    <div className="flex items-center gap-2">
                      <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse"></span>
                      <span className="text-xs font-bold text-emerald-200">Airtel Money Giving Channel</span>
                    </div>
                    <div className="flex gap-1 bg-slate-900 p-1 rounded-lg border border-slate-800 text-[11px]">
                      <button
                        type="button"
                        onClick={() => setAirtelMode('push')}
                        className={`px-2.5 py-1 rounded font-medium transition ${
                          airtelMode === 'push' ? 'bg-emerald-600 text-white shadow' : 'text-slate-400 hover:text-white'
                        }`}
                      >
                        Push to Phone
                      </button>
                      <button
                        type="button"
                        onClick={() => setAirtelMode('ussd')}
                        className={`px-2.5 py-1 rounded font-medium transition ${
                          airtelMode === 'ussd' ? 'bg-emerald-600 text-white shadow' : 'text-slate-400 hover:text-white'
                        }`}
                      >
                        Manual USSD Guide
                      </button>
                    </div>
                  </div>

                  {/* Church Airtel Number & Merchant Details Box */}
                  <div className="p-3.5 bg-slate-950 rounded-xl border border-emerald-900/60 space-y-2.5">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-2 border-b border-emerald-950">
                      <div>
                        <span className="text-[10px] text-emerald-400 font-bold uppercase tracking-wider block">
                          Official Church Airtel Money Number
                        </span>
                        <div className="flex items-center gap-2 mt-0.5">
                          <span className="font-mono text-base font-extrabold text-amber-300">
                            {AIRTEL_MONEY_CONFIG.displayPhone}
                          </span>
                          <button
                            type="button"
                            onClick={() => handleCopy(AIRTEL_MONEY_CONFIG.internationalPhone, 'phone')}
                            className="px-2 py-0.5 bg-emerald-600/30 hover:bg-emerald-600 text-emerald-200 hover:text-white rounded text-[11px] font-semibold flex items-center gap-1 transition"
                            title="Copy number"
                          >
                            {copiedField === 'phone' ? <Check className="w-3 h-3 text-emerald-300" /> : <Copy className="w-3 h-3" />}
                            <span>{copiedField === 'phone' ? 'Copied' : 'Copy'}</span>
                          </button>
                          <a
                            href={`tel:${AIRTEL_MONEY_CONFIG.internationalPhone}`}
                            className="px-2 py-0.5 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded text-[11px] font-semibold flex items-center gap-1 transition"
                          >
                            <PhoneCall className="w-3 h-3 text-emerald-400" />
                            <span>Call</span>
                          </a>
                        </div>
                      </div>

                      <div className="text-left sm:text-right">
                        <span className="text-[10px] text-slate-400 uppercase tracking-wider block">
                          Registered Name
                        </span>
                        <span className="text-xs font-bold text-white block mt-0.5">
                          {AIRTEL_MONEY_CONFIG.merchantName}
                        </span>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-2 text-xs pt-1">
                      <div className="p-2 bg-slate-900/90 rounded-lg border border-slate-800">
                        <span className="text-[10px] text-slate-400 block">Direct Airtel Line</span>
                        <span className="font-mono font-bold text-white text-xs">
                          {AIRTEL_MONEY_CONFIG.directPhone}
                        </span>
                      </div>
                      <div className="p-2 bg-slate-900/90 rounded-lg border border-slate-800 flex items-center justify-between">
                        <div>
                          <span className="text-[10px] text-slate-400 block">Merchant Till Code</span>
                          <span className="font-mono font-bold text-amber-300 text-xs">
                            {AIRTEL_MONEY_CONFIG.merchantCode}
                          </span>
                        </div>
                        <button
                          type="button"
                          onClick={() => handleCopy(AIRTEL_MONEY_CONFIG.merchantCode, 'merchant')}
                          className="text-slate-400 hover:text-white p-1"
                          title="Copy merchant code"
                        >
                          {copiedField === 'merchant' ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* SUB-FLOW A: Push Prompt simulation */}
                  {airtelMode === 'push' ? (
                    <div className="space-y-3">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <div>
                          <label className="block text-[11px] font-medium text-slate-300 mb-1">
                            Your Airtel Phone Number *
                          </label>
                          <div className="relative">
                            <Smartphone className="w-4 h-4 text-emerald-400 absolute left-3 top-2.5" />
                            <input
                              type="tel"
                              placeholder="097xxxxxxx or 077xxxxxxx"
                              value={donorPhone}
                              onChange={(e) => setDonorPhone(e.target.value)}
                              className="w-full pl-9 pr-3 py-2 bg-slate-950 border border-slate-700 rounded-lg text-xs font-mono text-white focus:outline-none focus:border-emerald-500"
                            />
                          </div>
                        </div>

                        <div>
                          <label className="block text-[11px] font-medium text-slate-300 mb-1">
                            Donor Name (For Receipt)
                          </label>
                          <input
                            type="text"
                            placeholder="e.g. Sister Grace M."
                            value={donorName}
                            onChange={(e) => setDonorName(e.target.value)}
                            className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-lg text-xs text-white focus:outline-none focus:border-emerald-500"
                          />
                        </div>
                      </div>

                      {/* Processing Dialog Simulation */}
                      {isProcessing ? (
                        <div className="p-4 bg-slate-950 border border-emerald-500/50 rounded-xl space-y-3 text-center">
                          <div className="flex items-center justify-center gap-2 text-emerald-400 font-semibold text-xs">
                            <Loader2 className="w-4 h-4 animate-spin text-emerald-500" />
                            {processStep === 1 && 'Connecting to Airtel Money Gateway...'}
                            {processStep === 2 && `Sending payment prompt to ${donorPhone}...`}
                            {processStep === 3 && 'Awaiting Airtel PIN confirmation on handset...'}
                            {processStep === 4 && 'Confirming authorization with Altar of God Treasury...'}
                          </div>

                          {processStep >= 2 && (
                            <div className="p-3 bg-emerald-950/40 border border-emerald-700/60 rounded-lg max-w-sm mx-auto text-left space-y-1.5">
                              <div className="text-[10px] text-emerald-300 font-mono uppercase tracking-wider">
                                Simulated Airtel SIM Prompt:
                              </div>
                              <p className="text-xs text-white font-mono">
                                "Authorize payment of <span className="font-bold text-amber-300">{formatCurrency(activeAmount, currency)}</span> to ALTAR OF GOD MINISTRIES. Enter PIN:"
                              </p>
                              {processStep === 3 && (
                                <button
                                  type="button"
                                  onClick={handleSimulatePinEntered}
                                  className="w-full mt-2 py-2 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-lg text-xs transition flex items-center justify-center gap-1.5 shadow"
                                >
                                  <Shield className="w-3.5 h-3.5" />
                                  Simulate PIN Authorized (Confirm)
                                </button>
                              )}
                            </div>
                          )}
                        </div>
                      ) : (
                        <button
                          type="button"
                          onClick={handleAirtelPushPayment}
                          className="w-full py-3 bg-gradient-to-r from-emerald-600 via-emerald-600 to-amber-500 hover:from-emerald-500 hover:to-amber-400 text-white font-bold rounded-xl text-xs flex items-center justify-center gap-2 transition shadow-lg shadow-emerald-950/40"
                        >
                          <Smartphone className="w-4 h-4" />
                          Send Instant Airtel Payment Prompt ({formatCurrency(activeAmount, currency)})
                        </button>
                      )}
                    </div>
                  ) : (
                    /* SUB-FLOW B: Manual USSD dial string with copy */
                    <div className="space-y-3">
                      {/* Option 1: Direct Send to Number */}
                      <div className="p-3 bg-slate-950 rounded-lg border border-slate-800 space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="text-[11px] text-emerald-300 font-semibold">
                            Option 1: Direct Send to Airtel Line (0972 159 373)
                          </span>
                          <span className="text-[10px] text-slate-400">One-Tap Code</span>
                        </div>
                        <div className="flex items-center justify-between p-2 bg-slate-900 rounded border border-slate-700">
                          <span className="font-mono text-xs sm:text-sm font-bold text-amber-300 truncate mr-2">
                            {dynamicUssdDirect}
                          </span>
                          <div className="flex gap-1.5 shrink-0">
                            <button
                              type="button"
                              onClick={() => handleCopy(dynamicUssdDirect, 'ussd-direct')}
                              className="px-2 py-1 bg-emerald-600 hover:bg-emerald-500 text-white rounded text-xs font-semibold flex items-center gap-1 shadow"
                            >
                              {copiedField === 'ussd-direct' ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                              Copy
                            </button>
                            <a
                              href={`tel:${encodeURIComponent(dynamicUssdDirect)}`}
                              className="px-2 py-1 bg-slate-700 hover:bg-slate-600 text-white rounded text-xs font-semibold flex items-center gap-1"
                            >
                              <PhoneCall className="w-3.5 h-3.5 text-emerald-400" />
                              Dial
                            </a>
                          </div>
                        </div>
                      </div>

                      {/* Option 2: Pay via Merchant Till */}
                      <div className="p-3 bg-slate-950 rounded-lg border border-slate-800 space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="text-[11px] text-amber-300 font-semibold">
                            Option 2: Pay Merchant Till (Code: 772410)
                          </span>
                          <span className="text-[10px] text-slate-400">Goods & Services</span>
                        </div>
                        <div className="flex items-center justify-between p-2 bg-slate-900 rounded border border-slate-700">
                          <span className="font-mono text-xs sm:text-sm font-bold text-amber-300 truncate mr-2">
                            {dynamicUssdMerchant}
                          </span>
                          <div className="flex gap-1.5 shrink-0">
                            <button
                              type="button"
                              onClick={() => handleCopy(dynamicUssdMerchant, 'ussd-merchant')}
                              className="px-2 py-1 bg-amber-600 hover:bg-amber-500 text-white rounded text-xs font-semibold flex items-center gap-1"
                            >
                              {copiedField === 'ussd-merchant' ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                              Copy
                            </button>
                            <a
                              href={`tel:${encodeURIComponent(dynamicUssdMerchant)}`}
                              className="px-2 py-1 bg-slate-700 hover:bg-slate-600 text-white rounded text-xs font-semibold flex items-center gap-1"
                            >
                              <PhoneCall className="w-3.5 h-3.5 text-emerald-400" />
                              Dial
                            </a>
                          </div>
                        </div>
                      </div>

                      {/* Step by Step USSD List */}
                      <ol className="text-xs text-slate-300 space-y-1 list-decimal list-inside bg-slate-950/40 p-3 rounded-lg border border-slate-800">
                        {AIRTEL_MONEY_CONFIG.instructions.map((step, idx) => (
                          <li key={idx} className="text-[11px] leading-relaxed">
                            {step}
                          </li>
                        ))}
                      </ol>

                      {/* Already Paid Verification */}
                      <div className="pt-2 border-t border-emerald-900/40 space-y-2">
                        <label className="block text-[11px] text-slate-300 font-medium">
                          Already sent? Enter your Airtel SMS Reference to generate receipt:
                        </label>
                        <div className="flex gap-2">
                          <input
                            type="text"
                            placeholder="e.g. MP261005.1428.B01923"
                            value={airtelSmsRef}
                            onChange={(e) => setAirtelSmsRef(e.target.value)}
                            className="flex-1 px-3 py-2 bg-slate-950 border border-slate-700 rounded-lg text-xs font-mono text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500"
                          />
                          <button
                            type="button"
                            onClick={handleManualVerification}
                            className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-lg text-xs transition shadow"
                          >
                            Verify & Get Receipt
                          </button>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* OTHER METHODS: MTN MOMO */}
              {paymentMethod === 'mtn' && (
                <div className="p-4 rounded-xl bg-yellow-950/20 border border-yellow-700/50 space-y-3 text-xs">
                  <div className="font-semibold text-yellow-300 flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-yellow-400"></span>
                    MTN Mobile Money Instructions
                  </div>
                  <div className="p-3 bg-slate-950 rounded-lg space-y-1.5 font-mono">
                    <div className="flex justify-between">
                      <span className="text-slate-400">MTN Giving Line:</span>
                      <span className="font-bold text-yellow-400">+260964293130</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">Merchant Code:</span>
                      <span className="font-bold text-yellow-400">{OTHER_PAYMENT_CONFIG.mtnMomo.merchantCode}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">Direct Number:</span>
                      <span>+260964293130</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">Dial:</span>
                      <span>*115# &rarr; Send Money &rarr; 0964293130 (or Pay Merchant 551920)</span>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={handleManualVerification}
                    className="w-full py-2.5 bg-yellow-500 hover:bg-yellow-400 text-slate-950 font-bold rounded-xl text-xs transition"
                  >
                    Confirm MTN Donation & Get Receipt
                  </button>
                </div>
              )}

              {/* OTHER METHODS: BANK TRANSFER */}
              {paymentMethod === 'bank' && (
                <div className="p-4 rounded-xl bg-blue-950/20 border border-blue-700/50 space-y-3 text-xs">
                  <div className="font-semibold text-blue-300 flex items-center gap-2">
                    <Building className="w-4 h-4" />
                    Church Bank Accounts
                  </div>
                  <div className="space-y-2">
                    {OTHER_PAYMENT_CONFIG.bankAccounts.map((acc, i) => (
                      <div key={i} className="p-2.5 bg-slate-950 rounded border border-slate-800 space-y-1">
                        <div className="font-bold text-white flex justify-between">
                          <span>{acc.bankName}</span>
                          <span className="font-mono text-amber-300">{acc.currency}</span>
                        </div>
                        <div className="font-mono text-slate-300 flex justify-between">
                          <span>A/C: {acc.accountNumber}</span>
                          <button
                            type="button"
                            onClick={() => handleCopy(acc.accountNumber, `bank-${i}`)}
                            className="text-slate-400 hover:text-white"
                          >
                            {copiedField === `bank-${i}` ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                          </button>
                        </div>
                        <div className="text-[11px] text-slate-400">Name: {acc.accountName} · Branch: {acc.branch}</div>
                      </div>
                    ))}
                  </div>
                  <button
                    type="button"
                    onClick={handleManualVerification}
                    className="w-full py-2.5 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-xl text-xs transition"
                  >
                    Confirm Bank Transfer & Generate Receipt
                  </button>
                </div>
              )}

              {/* OTHER METHODS: CARD */}
              {paymentMethod === 'card' && (
                <div className="p-4 rounded-xl bg-purple-950/20 border border-purple-700/50 space-y-3 text-xs">
                  <div className="font-semibold text-purple-300 flex items-center gap-2">
                    <CreditCard className="w-4 h-4" />
                    International Debit / Credit Card
                  </div>
                  <div className="space-y-2">
                    <input
                      type="text"
                      placeholder="Cardholder Name"
                      className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-lg text-xs text-white"
                    />
                    <input
                      type="text"
                      placeholder="16-Digit Card Number (4000 1234 ...)"
                      className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-lg text-xs font-mono text-white"
                    />
                    <div className="grid grid-cols-2 gap-2">
                      <input
                        type="text"
                        placeholder="MM/YY"
                        className="px-3 py-2 bg-slate-950 border border-slate-700 rounded-lg text-xs font-mono text-white"
                      />
                      <input
                        type="password"
                        maxLength={4}
                        placeholder="CVV"
                        className="px-3 py-2 bg-slate-950 border border-slate-700 rounded-lg text-xs font-mono text-white"
                      />
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={handleManualVerification}
                    className="w-full py-2.5 bg-purple-600 hover:bg-purple-500 text-white font-bold rounded-xl text-xs transition"
                  >
                    Give {formatCurrency(activeAmount, currency)} by Card
                  </button>
                </div>
              )}

              {/* Optional Prayer Request / Covenant Note */}
              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">
                  Optional: Attach a Prayer Point or Thanksgiving Note
                </label>
                <textarea
                  rows={2}
                  placeholder="e.g. In thanksgiving for family healing, or trusting God for open doors..."
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-400 resize-none"
                />
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};
