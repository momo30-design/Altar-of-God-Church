import { Sermon, ChurchEvent, Ministry, Devotional, PrayerRequest } from '../types';

export const CHURCH_CONFIG = {
  name: 'Altar of God Ministries',
  tagline: 'A Sanctuary of Fire, Grace, and Radical Transformation',
  founded: '2012',
  founder: 'Pastor Moses Mwale',
  seniorPastor: 'Pastor Moses Mwale',
  address: 'Plot 4821, Great East Road, Near Arcades Interchange, Lusaka, Zambia',
  phone: '+260 972 159 373 / +260 964 293 130',
  email: 'info@altarofgodministries.org',
  givingEmail: 'giving@altarofgodministries.org',
  scriptureTheme: '“An altar of earth thou shalt make unto me, and shalt sacrifice thereon thy burnt offerings... in all places where I record my name I will come unto thee, and I will bless thee.” — Exodus 20:24',
};

export const AIRTEL_MONEY_CONFIG = {
  accountName: 'ALTAR OF GOD MINISTRIES',
  merchantName: 'ALTAR OF GOD MINISTRIES',
  directPhone: '0972159373',
  formattedPhone: '0972 159 373',
  internationalPhone: '+260972159373',
  displayPhone: '+260 972 159 373',
  merchantCode: '772410',
  ussdDirectSend: '*115*1*1*0972159373#',
  ussdMerchant: '*115*4*1*772410#',
  instructions: [
    'Dial *115# on your Airtel handset',
    'Select Option 1: Send Money (or Option 4: Make Payment)',
    'Enter Church Airtel Number: 0972159373 (or Merchant Code: 772410)',
    'Enter the Amount you purpose to give (e.g. 100, 250, 500)',
    'Enter Reference (e.g. TITHE, OFFERING, or YOUR NAME)',
    'Confirm recipient shows: ALTAR OF GOD MINISTRIES',
    'Enter your secret Airtel Money PIN to authorize',
    'You will receive an instant SMS confirmation with your Transaction ID'
  ],
  supportHotline: '+260 972 159 373'
};

export const OTHER_PAYMENT_CONFIG = {
  mtnMomo: {
    name: 'ALTAR OF GOD MINISTRIES',
    merchantCode: '551920',
    directNumber: '+260964293130',
    displayPhone: '+260 964 293 130',
    formattedPhone: '0964 293 130',
    ussd: '*115*2*1*551920#'
  },
  zamtelKwacha: {
    name: 'ALTAR OF GOD MINISTRIES',
    merchantCode: '334180',
    directNumber: '0955882103'
  },
  bankAccounts: [
    {
      bankName: 'Standard Chartered Bank Zambia',
      accountName: 'ALTAR OF GOD MINISTRIES INC.',
      accountNumber: '0100123984500',
      branch: 'Main Lusaka Branch (010)',
      swiftCode: 'SCBLZMLX',
      currency: 'ZMW'
    },
    {
      bankName: 'Stanbic Bank Zambia',
      accountName: 'ALTAR OF GOD MINISTRIES (USD)',
      accountNumber: '9130004582910',
      branch: 'Arcades Branch',
      swiftCode: 'SBICZMLX',
      currency: 'USD'
    }
  ]
};

export const GIVING_CAUSES = [
  {
    id: 'tithe',
    title: 'Tithes & Firstfruits',
    subtitle: 'Honoring the Lord with the first tenth of your increase',
    scripture: 'Malachi 3:10',
    scriptureText: '“Bring ye all the tithes into the storehouse, that there may be meat in mine house...”',
    icon: 'coins',
    suggestedAmounts: [100, 250, 500, 1000, 2500, 5000],
    highlight: true,
  },
  {
    id: 'offering',
    title: 'Sunday Worship Offering',
    subtitle: 'Freewill sacrifice of praise and thanksgiving',
    scripture: '2 Corinthians 9:7',
    scriptureText: '“Every man according as he purposeth in his heart, so let him give; not grudgingly, or of necessity: for God loveth a cheerful giver.”',
    icon: 'heart-handshake',
    suggestedAmounts: [50, 100, 200, 500, 1000],
    highlight: false,
  },
  {
    id: 'building',
    title: 'Nehemiah Sanctuary Cathedral Project',
    subtitle: 'Raising a 3,500-seat multi-purpose sanctuary and youth hub',
    scripture: 'Nehemiah 2:18',
    scriptureText: '“Let us rise up and build. So they strengthened their hands for this good work.”',
    target: 750000,
    raised: 498300,
    icon: 'landmark',
    suggestedAmounts: [250, 500, 1000, 2500, 5000, 10000],
    highlight: true,
  },
  {
    id: 'missions',
    title: 'Rural Evangelism & Outreach Missions',
    subtitle: 'Sending missionaries, bibles, and crusades across villages',
    scripture: 'Mark 16:15',
    scriptureText: '“Go ye into all the world, and preach the gospel to every creature.”',
    target: 120000,
    raised: 84200,
    icon: 'globe',
    suggestedAmounts: [100, 250, 500, 1500, 3000],
    highlight: false,
  },
  {
    id: 'welfare',
    title: 'Widows, Orphans & Mercy Care',
    subtitle: 'Monthly food hampers, school fees, and medical support',
    scripture: 'James 1:27',
    scriptureText: '“Pure religion and undefiled before God and the Father is this, To visit the fatherless and widows in their affliction...”',
    target: 80000,
    raised: 61500,
    icon: 'users',
    suggestedAmounts: [50, 150, 300, 750, 1500],
    highlight: false,
  },
  {
    id: 'pastoral',
    title: 'Pastoral Honorarium & Seed of Grace',
    subtitle: 'Blessing the pastoral team and ministering to their needs',
    scripture: 'Galatians 6:6',
    scriptureText: '“Let him that is taught in the word communicate unto him that teacheth in all good things.”',
    icon: 'sparkles',
    suggestedAmounts: [100, 250, 500, 1000, 2000],
    highlight: false,
  }
];

export const SERVICE_SCHEDULE = [
  {
    name: 'Sunday Fire & Celebration Service',
    day: 'Every Sunday',
    time: '08:30 AM – 11:30 AM',
    hall: 'Main Sanctuary (Hall of Glory)',
    desc: 'Deep praise, prophetic worship, supernatural preaching, and altar ministry.',
    isLiveNext: true,
  },
  {
    name: 'Mid-Week Healing & Deliverance',
    day: 'Wednesday',
    time: '17:30 PM – 19:30 PM',
    hall: 'Sanctuary & Online Broadcast',
    desc: 'In-depth verse-by-verse scriptural illumination with personal prayer lines.',
    isLiveNext: false,
  },
  {
    name: 'Friday Night All-Night Vigil',
    day: 'Last Friday of Every Month',
    time: '21:00 PM – 04:30 AM',
    hall: 'Main Sanctuary',
    desc: 'Uncompromising intercession, warfare prayer, spiritual breakthroughs, and communion.',
    isLiveNext: false,
  },
  {
    name: 'Ignite Youth & Young Adults',
    day: 'Saturday Afternoon',
    time: '14:30 PM – 17:00 PM',
    hall: 'Youth Amphitheater',
    desc: 'Vibrant modern worship, panel discussions, career mentorship, and holy fellowship.',
    isLiveNext: false,
  }
];

export const SERMONS_DATA: Sermon[] = [
  {
    id: 'sermon-1',
    title: 'Rebuilding the Broken Altar of Prayer',
    series: 'The Fire That Never Goes Out',
    speaker: 'Pastor Rachel Nanyangwe',
    speakerImage: '/pastor_rachel_nanyangwe.jpg',
    date: 'Oct 04, 2026',
    duration: '1 hr 18 min',
    scripture: '1 Kings 18:30-39',
    thumbnail: 'https://images.unsplash.com/photo-1507692049790-de58290a4334?auto=format&fit=crop&w=1200&q=80',
    keyPoints: [
      'The altar determines the presence: when the altar is broken, worship becomes routine.',
      'Fire does not fall on words, fire falls on the prepared sacrifice.',
      'Consecration precedes demonstration: sanctify your secret place.'
    ],
    summary: 'A powerful prophetic sermon calling believers back to personal devotion, fasting, and living sacrifices before God.'
  },
  {
    id: 'sermon-2',
    title: 'The Mystery of the Seed and Financial Freedom',
    series: 'Covenant Dominion',
    speaker: 'Pastor Moses Mwale',
    speakerImage: '/pastor_moses_mwale.jpg',
    date: 'Sep 27, 2026',
    duration: '58 min',
    scripture: 'Genesis 8:22 & Luke 6:38',
    thumbnail: 'https://images.unsplash.com/photo-1438232992991-995b7058bbb3?auto=format&fit=crop&w=1200&q=80',
    keyPoints: [
      'Seed time and harvest shall never cease as long as the earth remains.',
      'Tithing is an acknowledgment of God as the Ultimate Source and Protector.',
      'A generous soul flourishes in every economic climate.'
    ],
    summary: 'Understanding the biblical protocol for open heavens, breaking poverty cycles, and walking in supernatural abundance.'
  },
  {
    id: 'sermon-3',
    title: 'Walking in the Anointing of the Holy Spirit',
    series: 'Supernatural Believer',
    speaker: 'Pastor Moses Mwale',
    speakerImage: '/pastor_moses_mwale.jpg',
    date: 'Sep 20, 2026',
    duration: '1 hr 05 min',
    scripture: 'Isaiah 10:27 & Acts 1:8',
    thumbnail: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=1200&q=80',
    keyPoints: [
      'The yoke shall be destroyed because of the anointing.',
      'You are not called to fight in human strength; you have the Spirit of might.',
      'Cultivating intimacy with the Holy Spirit every morning.'
    ],
    summary: 'Discovering how the power of the Holy Spirit dismantles barriers, breaks generational burdens, and empowers your daily walk.'
  }
];

export const INITIAL_PRAYER_REQUESTS: PrayerRequest[] = [
  {
    id: 'pr-1',
    name: 'Sister Mirriam K.',
    category: 'Healing',
    request: 'Please pray for my mother who is undergoing surgery this Thursday. We are standing on Isaiah 53:5 for complete divine restoration.',
    date: 'Yesterday',
    isPrivate: false,
    prayerCount: 42,
    hasPrayed: false,
  },
  {
    id: 'pr-2',
    name: 'Brother Joseph M.',
    category: 'Breakthrough',
    request: 'Trusting God for financial breakthrough and job recruitment after 8 months of searching. I believe the Lord will open a door no man can shut.',
    date: '2 days ago',
    isPrivate: false,
    prayerCount: 67,
    hasPrayed: false,
  },
  {
    id: 'pr-3',
    name: 'Chanda & Family',
    category: 'Family',
    request: 'Praying for unity and reconciliation in our extended family and salvation for our teenage children.',
    date: '3 days ago',
    isPrivate: false,
    prayerCount: 38,
    hasPrayed: false,
  },
  {
    id: 'pr-4',
    name: 'Elder Dalitso',
    category: 'Spiritual Growth',
    request: 'Praying for revival in our rural church plant and the outpouring of the Holy Ghost upon our upcoming youth retreat.',
    date: '4 days ago',
    isPrivate: false,
    prayerCount: 89,
    hasPrayed: false,
  }
];

export const CHURCH_EVENTS: ChurchEvent[] = [
  {
    id: 'event-1',
    title: 'The Great Altar Fire Conference 2026',
    date: 'November 12 - 15, 2026',
    time: 'Daily from 17:30 PM & Sunday 08:30 AM',
    location: 'Main Sanctuary Cathedral Grounds',
    category: 'Annual Conference',
    description: '4 days of apostolic teachings, miraculous healings, explosive praise, and deep worship with guest international ministers.',
    speaker: 'Pastor Mintras Chupa',
    registeredCount: 340,
    image: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=1200&q=80'
  },
  {
    id: 'event-2',
    title: 'Community Food Hamper & Medical Outreach',
    date: 'October 24, 2026',
    time: '09:00 AM – 15:00 PM',
    location: 'Bauleni Community Ground',
    category: 'Mercy Outreach',
    description: 'Blessing 500 vulnerable families with dry rations, medical checkups, children clothes, and distributing Bibles.',
    speaker: 'Welfare & Missions Ministry',
    registeredCount: 125,
    image: 'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?auto=format&fit=crop&w=1200&q=80'
  },
  {
    id: 'event-3',
    title: 'Ignite Youth Camp: Unashamed 2026',
    date: 'December 4 - 7, 2026',
    time: 'Full Weekend Camp',
    location: 'Chaminuka Wilderness Retreat Center',
    category: 'Youth & Young Adults',
    description: 'Igniting young leaders, passionate worship encounters around the campfire, breakout workshops, and athletics.',
    speaker: 'Pastor Grace Phiri & Youth Pastors',
    registeredCount: 180,
    image: 'https://images.unsplash.com/photo-1523580494863-6f3031224c94?auto=format&fit=crop&w=1200&q=80'
  }
];

export const MINISTRIES_DATA: Ministry[] = [
  {
    id: 'men',
    name: 'Men of Valor Fellowship',
    lead: 'Elder Hastings Banda',
    meetingTime: '1st & 3rd Saturday at 07:00 AM',
    description: 'Equipping men to be godly spiritual leaders in their homes, ethical entrepreneurs in business, and pillars in the altar of prayer.',
    iconName: 'shield',
    activities: ['Men Breakfast Fellowships', 'Business & Investment Circles', 'Fatherhood Mentorship'],
    image: 'https://images.unsplash.com/photo-1528605248644-14dd04022da1?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'women',
    name: 'Virtuous Women of Faith',
    lead: 'Pastor Rachel Nanyangwe',
    leadImage: '/pastor_rachel_nanyangwe.jpg',
    meetingTime: 'Every 2nd Saturday at 14:00 PM',
    description: 'Raising interceding wives, mothers, single ladies, and daughters who embody the dignity, prayer life, and grace of Proverbs 31.',
    iconName: 'heart',
    activities: ['Annual Women Conference', 'Baby & Bride Showers', 'Widows Support Visitation'],
    image: '/pastor_rachel_nanyangwe.jpg'
  },
  {
    id: 'youth',
    name: 'Firebrand Generation Ignite',
    lead: 'Minister Kelvin Tembo',
    meetingTime: 'Every Saturday at 14:30 PM',
    description: 'A vibrant movement of high schoolers, university scholars, and young professionals passionate for Christ without compromise.',
    iconName: 'flame',
    activities: ['Creative Arts & Drama', 'Campus Evangelism', 'Tech & Career Bootcamps'],
    image: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'children',
    name: 'Ark of Grace Kids Church',
    lead: 'Teacher Brenda Mwila',
    meetingTime: 'Every Sunday at 08:30 AM',
    description: 'Nurturing children from infancy to 12 years with scripture memorization, puppet theatre, biblically sound worship, and love.',
    iconName: 'smile',
    activities: ['Bible Verse Quizzing', 'Holiday Bible School', 'Christmas Musical Cantata'],
    image: 'https://images.unsplash.com/photo-1502086223501-7ea6ecd79368?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'worship',
    name: 'Altar Sounds Worship & Arts',
    lead: 'Njavwa Nalwimba',
    meetingTime: 'Rehearsals Thursday 17:00 PM & Saturday 10:00 AM',
    description: 'Ministering in songs, instrumentation, and sound production that usher the tangible glory of God into every meeting.',
    iconName: 'music',
    activities: ['Vocal Coaching', 'Spontaneous Prophetic Worship', 'Original Album Recording'],
    image: 'https://images.unsplash.com/photo-1465847899084-d164df4dedc6?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'mercy',
    name: 'Good Samaritan Compassion & Missions',
    lead: 'Benerdette Banda',
    meetingTime: 'Bi-weekly Outreach Saturday',
    description: 'Hands and feet of Jesus: prison ministry, hospital visitation, village water borehole development, and food distribution.',
    iconName: 'hand-heart',
    activities: ['Prison Ministry', 'Hospital Bedside Prayer', 'Rural Medical Camps'],
    image: 'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?auto=format&fit=crop&w=800&q=80'
  }
];

export const TODAY_DEVOTIONAL: Devotional = {
  date: 'Monday, October 05, 2026',
  title: 'The Fire Upon the Altar Shall Not Go Out',
  scriptureRef: 'Leviticus 6:12-13',
  verseText: '“And the fire upon the altar shall be burning in it; it shall not be put out: and the priest shall burn wood on it every morning... The fire shall ever be burning upon the altar; it shall never go out.”',
  message: `Beloved in Christ, God was specific with Aaron and his sons: the sacred flame was initiated by God Himself, but keeping it alive was the sacred responsibility of the priests. Every morning, they brought fresh wood, cleared away yesterday's ashes, and tended the sacrifice.

In the New Covenant, you are a royal priest unto God (1 Peter 2:9). The Holy Spirit has deposited divine fire inside your spirit. However, that flame requires fresh fuel daily — through fervent prayer, soaking in God's living Word, personal worship, and walking in selfless love. You cannot live off yesterday's communion. Clear out the ashes of offense, doubt, and spiritual sluggishness, and place fresh wood upon your altar this morning!`,
  prayer: 'Heavenly Father, I thank You for Your Holy Spirit residing in me. Stir up the gift within my spirit today. Forgive me for any lukewarmness or neglect of my secret place. I bring my life as a living sacrifice upon Your altar. Let Your fire consume every fear, and let Your glory radiate through everything I do today, in Jesus’ mighty Name. Amen!',
  author: 'Pastor Rachel Nanyangwe',
  authorImage: '/pastor_rachel_nanyangwe.jpg'
};
