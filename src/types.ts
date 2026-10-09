export type GivingCategory =
  | 'tithe'
  | 'offering'
  | 'building'
  | 'missions'
  | 'welfare'
  | 'pastoral'
  | 'thanksgiving';

export type PaymentMethod =
  | 'airtel'
  | 'mtn'
  | 'zamtel'
  | 'bank'
  | 'card';

export type Currency = 'ZMW' | 'USD' | 'KES' | 'UGX' | 'MWK';

export interface DonationRecord {
  id: string;
  referenceNumber: string;
  donorName: string;
  donorPhone: string;
  donorEmail?: string;
  amount: number;
  currency: Currency;
  category: GivingCategory;
  categoryLabel: string;
  paymentMethod: PaymentMethod;
  notes?: string;
  timestamp: string;
  airtelTransactionId?: string;
  status: 'completed' | 'pending';
}

export interface Sermon {
  id: string;
  title: string;
  series: string;
  speaker: string;
  speakerImage?: string;
  date: string;
  duration: string;
  scripture: string;
  thumbnail: string;
  audioUrl?: string;
  videoUrl?: string;
  keyPoints: string[];
  summary: string;
}

export interface PrayerRequest {
  id: string;
  name: string;
  category: 'Healing' | 'Family' | 'Breakthrough' | 'Spiritual Growth' | 'Deliverance' | 'Thanksgiving';
  request: string;
  date: string;
  isPrivate: boolean;
  prayerCount: number;
  hasPrayed?: boolean;
}

export interface ChurchEvent {
  id: string;
  title: string;
  date: string;
  time: string;
  location: string;
  category: string;
  description: string;
  speaker: string;
  registeredCount: number;
  image: string;
}

export interface Ministry {
  id: string;
  name: string;
  lead: string;
  leadImage?: string;
  meetingTime: string;
  description: string;
  iconName: string;
  activities: string[];
  image: string;
}

export interface Devotional {
  date: string;
  title: string;
  scriptureRef: string;
  verseText: string;
  message: string;
  prayer: string;
  author: string;
  authorImage?: string;
}
