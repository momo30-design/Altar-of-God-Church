import { DonationRecord, Currency } from '../types';

export function formatCurrency(amount: number, currency: Currency = 'ZMW'): string {
  if (currency === 'ZMW') {
    return `K${amount.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
  }
  if (currency === 'USD') {
    return `$${amount.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
  }
  return `${currency} ${amount.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
}

export function generateReceiptNumber(): string {
  const year = new Date().getFullYear();
  const randomSuffix = Math.floor(100000 + Math.random() * 900000);
  return `AGM-${year}-${randomSuffix}`;
}

export function generateAirtelTransactionId(): string {
  const dateStr = new Date().toISOString().slice(2, 10).replace(/-/g, '');
  const timeStr = new Date().toTimeString().slice(0, 5).replace(/:/g, '');
  const rand = Math.random().toString(36).substring(2, 7).toUpperCase();
  return `AT${dateStr}.${timeStr}.${rand}`;
}

export function numberToWords(amount: number): string {
  const whole = Math.floor(amount);
  const ones = [
    '', 'One', 'Two', 'Three', 'Four', 'Five', 'Six', 'Seven', 'Eight', 'Nine',
    'Ten', 'Eleven', 'Twelve', 'Thirteen', 'Fourteen', 'Fifteen', 'Sixteen',
    'Seventeen', 'Eighteen', 'Nineteen'
  ];
  const tens = ['', '', 'Twenty', 'Thirty', 'Forty', 'Fifty', 'Sixty', 'Seventy', 'Eighty', 'Ninety'];

  if (whole === 0) return 'Zero';

  function convertGroup(n: number): string {
    let s = '';
    if (n >= 100) {
      s += ones[Math.floor(n / 100)] + ' Hundred ';
      n %= 100;
    }
    if (n >= 20) {
      s += tens[Math.floor(n / 10)] + (n % 10 ? ' ' + ones[n % 10] : '');
    } else if (n > 0) {
      s += ones[n];
    }
    return s.trim();
  }

  let words = '';
  if (whole >= 1000000) {
    words += convertGroup(Math.floor(whole / 1000000)) + ' Million ';
    amount %= 1000000;
  }
  if (whole >= 1000) {
    words += convertGroup(Math.floor((whole % 1000000) / 1000)) + ' Thousand ';
  }
  if (whole % 1000 > 0) {
    words += convertGroup(whole % 1000);
  }

  return words.trim() + ' Kwacha Only';
}

const STORAGE_KEY = 'agm_donations_ledger_v1';

export function getStoredDonations(): DonationRecord[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    return JSON.parse(raw);
  } catch (e) {
    console.error('Error loading donations', e);
    return [];
  }
}

export function saveDonation(record: DonationRecord): void {
  try {
    const current = getStoredDonations();
    const updated = [record, ...current];
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  } catch (e) {
    console.error('Error saving donation', e);
  }
}
