import { BusinessInfo, ServiceItem, PortfolioItem, ReviewItem } from '../types';

export const BUSINESS_INFO: BusinessInfo = {
  name: 'Faded By Cash',
  owner: 'Cash',
  tagline: 'Precision Cuts, Clean Fades & Premium Grooming by Cash',
  address: {
    street: '1226 E Northwest Highway',
    city: 'Garland',
    state: 'TX',
    zip: '75041',
    full: '1226 E Northwest Highway, Garland, TX 75041',
  },
  phone: '(214) 586-8484',
  phoneRaw: '+12145868484',
  booksyUrl: 'https://booksy.com/en-us/108330_faded-by-cash_barber-shop_36509_garland',
  // Official Faded By Cash Instagram URL - central configurable variable
  instagramUrl: 'https://instagram.com/fadedbycash',
  instagramHandle: '@fadedbycash',
  rating: 4.9,
  reviewsCount: 329,
  hours: [
    { day: 'Tuesday', time: '10:00 AM – 7:00 PM' },
    { day: 'Wednesday', time: '10:00 AM – 7:00 PM' },
    { day: 'Thursday', time: '10:00 AM – 7:00 PM' },
    { day: 'Friday', time: '10:00 AM – 7:00 PM' },
    { day: 'Saturday', time: '10:00 AM – 7:00 PM' },
    { day: 'Sunday', time: '10:00 AM – 6:00 PM' },
    { day: 'Monday', time: 'Closed', isClosed: true },
  ],
  payments: ['Zelle', 'Cash', 'Debit Card'],
};

export const SERVICES_DATA: ServiceItem[] = [
  {
    id: 'modern-cut',
    name: 'Modern Cut',
    price: 55,
    duration: '60 min',
    category: 'haircuts',
    popular: true,
    description: 'Our premier complete haircut experience. Includes complimentary shampoo wash, custom precision cut, optional enhancements, straight razor edge finish, and full beard grooming with hot towel relaxation.',
    included: [
      'Complimentary refreshing hair wash',
      'Precision taper / skin fade',
      'Optional subtle hair enhancements',
      'Hot towel beard steam & oil massage',
      'Straight razor outline detailing'
    ],
    image: '/assets/cuts/modern-cut.jpg',
  },
  {
    id: 'classic-cut',
    name: 'Classic Cut',
    price: 45,
    duration: '50 min',
    category: 'haircuts',
    popular: true,
    description: 'A timeless signature cut tailored to your hair texture and lifestyle. Includes expert consultation, custom shear & clipper work, straight razor detailing, and full beard grooming.',
    included: [
      'Custom clipper & shear precision',
      'Full beard sculpt & outline',
      'Straight razor neckline detailing',
      'Finishing styling & aftershave splash'
    ],
    image: '/assets/cuts/classic-cut.jpg',
  },
  {
    id: 'basic-cut',
    name: 'Basic Cut',
    price: 40,
    duration: '40 min',
    category: 'haircuts',
    description: 'Crisp, high-standard haircut without the beard service. Ideal for maintaining your taper, fade, or buzz on a fast, immaculate turnaround.',
    included: [
      'Clipper & shear precision fade',
      'Clean hairline shaping',
      'Straight razor perimeter clean-up',
      'Talc & cool refreshing spray'
    ],
    image: '/assets/cuts/basic-cut.jpg',
  },
  {
    id: 'deluxe-beard',
    name: 'Deluxe Beard Service',
    price: 40,
    duration: '30 min',
    category: 'beard',
    popular: true,
    description: 'Comprehensive facial hair architecture. Thorough beard reduction, symmetrical cheek and neck lining with warm lather, hot towel treatment, and beard conditioning oil.',
    included: [
      'Hot aromatic steam towel treatment',
      'Precision razor edge on cheeks & neckline',
      'Beard length sculpt & debulking',
      'Nourishing beard balm & comb-out'
    ],
    image: '/assets/cuts/deluxe-beard.jpg',
  },
  {
    id: 'crispy-lineup',
    name: 'Crispy Line Up',
    price: 35,
    duration: '35 min',
    category: 'haircuts',
    description: 'Ultra-sharp perimeter line work designed to restore clean angles to your forehead, temples, sideburns, and neck. Completed with a straight razor for razor-sharp longevity.',
    included: [
      'Crisp perimeter trimmers',
      'Straight razor edge finish',
      'Optional enhancement application',
      'Cooling skin tonic'
    ],
    image: '/assets/cuts/crispy-lineup.jpg',
  },
  {
    id: 'straight-razor-head-shave',
    name: 'Straight Razor Head Shave',
    price: 40,
    duration: '45 min',
    category: 'haircuts',
    description: 'The ultimate smooth head shave service. Warm pre-shave oil, hot lather application, close razor glide with the grain, followed by cold towel pore closure and soothing balm.',
    included: [
      'Pre-shave essential oils',
      'Hot lather brush application',
      'Feather-edge straight razor shave',
      'Cold towel & anti-bump scalp balm'
    ],
    image: '/assets/cuts/head-shave.jpg',
  },
  {
    id: 'teen-haircut',
    name: 'Teen Haircut (13–19)',
    price: 30,
    duration: '40 min',
    category: 'kids-teens',
    description: 'Modern, high-energy haircuts for teenagers. Full consultation to achieve trending tapers, crop tops, or burst fades with precision and proper styling guidance.',
    included: [
      'Style consultation & cut',
      'Skin fade or taper blend',
      'Hairline shaping',
      'Texturizing & matte paste styling'
    ],
    image: '/assets/cuts/teen-cut.jpg',
  },
  {
    id: 'kids-haircut',
    name: 'Kids Haircut (12 & under)',
    price: 30,
    duration: '40 min',
    category: 'kids-teens',
    description: 'Patient, attentive barbershop experience for young gentlemen. Clean cuts in a calm, welcoming environment with optional subtle enhancements.',
    included: [
      'Gentle clipper & scissor work',
      'Clean shape up',
      'Optional light enhancements',
      'Complimentary finish styling'
    ],
    image: '/assets/cuts/kids-cut.jpg',
  },
  {
    id: 'grooming-package',
    name: 'Grooming Package',
    price: 25,
    duration: '15 min',
    category: 'packages',
    description: 'The essential finishing touch. Complete grooming maintenance including precision eyebrow shaping, nose hair trimming, and ear hair detailing.',
    included: [
      'Eyebrow straight razor or trimmer shaping',
      'Hygienic nose hair trimming',
      'Ear hair detailing & clean-up',
      'Soothing witch hazel finish'
    ],
    image: '/assets/cuts/grooming.jpg',
  },
];

export const PORTFOLIO_ITEMS: PortfolioItem[] = [
  {
    id: 'port-1',
    title: 'Mid Drop Skin Fade with Beard Blend',
    category: 'fades',
    styleName: 'Skin Drop Fade & Beard Integration',
    description: 'Seamless graduation from skin at the ear line into a rich, dark bulk on top. Beard transitioned effortlessly with straight razor cheek angles.',
    image: '/assets/cuts/modern-cut.jpg',
    featured: true,
    details: {
      cutType: 'Mid Drop Skin Fade',
      finishing: 'Straight Razor & Matte Clay',
      recommendedProduct: 'Cash Signature Matte Hold',
    },
  },
  {
    id: 'port-2',
    title: 'Crispy Box Lineup & Low Taper',
    category: 'lineups',
    styleName: 'Precision Razor Lineup',
    description: 'Pin-sharp horizontal hairline alignment and 90-degree temporal corners finished with Cash razor technique and enhancement touch.',
    image: '/assets/cuts/crispy-lineup.jpg',
    details: {
      cutType: 'Low Temple & Neck Taper',
      finishing: 'Enhancement Mist & Straight Razor',
      recommendedProduct: 'Enhancement Lock Spray',
    },
  },
  {
    id: 'port-3',
    title: 'Executive Beard Sculpt & Hot Towel Finish',
    category: 'beard',
    styleName: 'Architectural Beard Sculpt',
    description: 'Thick beard bulk leveled and balanced to reinforce jawline definition. Cheeks cleared with hot lather and cold towel closure.',
    image: '/assets/cuts/deluxe-beard.jpg',
    featured: true,
    details: {
      cutType: 'Full Beard Trim & Line',
      finishing: 'Organic Argan & Jojoba Conditioning',
      recommendedProduct: 'Cash Beard Butter',
    },
  },
  {
    id: 'port-4',
    title: 'Textured Crop Top with High Bald Fade',
    category: 'modern',
    styleName: 'High Bald Textured Crop',
    description: 'Contemporary textured crown with blunt perimeter fringe contrasted against an aggressive zero skin fade on the sides and back.',
    image: '/assets/cuts/crop-top.jpg',
    details: {
      cutType: 'High Skin Fade',
      finishing: 'Point-Cut Texture & Sea Salt Paste',
      recommendedProduct: 'Matte Texture Powder',
    },
  },
  {
    id: 'port-5',
    title: 'High Taper Fade with Natural Waves',
    category: 'fades',
    styleName: '360 Waves & Crisp Taper',
    description: 'Deep wave formation preserved across the top, paired with an ultra-clean blowout taper around the ears and neckline.',
    image: '/assets/cuts/taper-lineup.jpg',
    details: {
      cutType: 'Blowout Temple Taper',
      finishing: 'Pomade & Boar Bristle Buff',
      recommendedProduct: 'High Sheen Wave Pomade',
    },
  },
  {
    id: 'port-6',
    title: 'Straight Razor Head Shave & Sharp Stubble',
    category: 'modern',
    styleName: 'Chrome Shave & Sculpted Stubble',
    description: 'Ultra-smooth straight razor head shave paired with sculpted heavy stubble. Hot towel prepped with cooling post-shave balm.',
    image: '/assets/cuts/head-shave.jpg',
    featured: true,
    details: {
      cutType: 'Straight Razor Head Shave',
      finishing: 'Hot Lather & Bay Rum Aftershave',
      recommendedProduct: 'Soothing Scalp Tonic',
    },
  },
];

export const BEFORE_AFTER_PAIR = {
  title: 'Full Transformation: Overgrown to Razor Sharp',
  client: 'Marcus T. — Modern Cut + Deluxe Beard',
  beforeImg: '/assets/cuts/before-cut.jpg',
  afterImg: '/assets/cuts/modern-cut.jpg',
  description: 'Transformation featuring 6 weeks of bulk reduced into a crisp mid skin fade, connected cleanly to an architecturally shaped beard with razor-sharp edges.',
};

export const REVIEWS_DATA: ReviewItem[] = [
  {
    id: 'rev-1',
    author: 'Devon M.',
    rating: 5,
    date: 'Verified Booksy Client',
    service: 'Modern Cut',
    comment: '5-star cuts every time! Cash’s attention to detail is truly unmatched in the Garland area. The hot towel and razor work make you feel like a new person walking out.',
    verifiedBooksy: true,
  },
  {
    id: 'rev-2',
    author: 'Anthony R.',
    rating: 5,
    date: 'Verified Booksy Client',
    service: 'Classic Cut + Beard Sculpt',
    comment: 'Cash is always welcoming, professional, and on time. His blend work on the skin fade is seamless and the beard lineup stayed sharp for over a week.',
    verifiedBooksy: true,
  },
  {
    id: 'rev-3',
    author: 'Julian S.',
    rating: 5,
    date: 'Verified Booksy Client',
    service: 'Modern Cut',
    comment: 'This was my third cut with Cash and he has knocked it out of the park every single time. Best barber in DFW hands down. Super clean shop and great vibe.',
    verifiedBooksy: true,
  },
  {
    id: 'rev-4',
    author: 'Kendrick W.',
    rating: 5,
    date: 'Verified Booksy Client',
    service: 'Crispy Line Up & Beard',
    comment: 'Super clean line-up, precision fade, and respects your appointment time. You sit right in the chair and he gets down to business with surgical focus.',
    verifiedBooksy: true,
  },
  {
    id: 'rev-5',
    author: 'Carlos G.',
    rating: 5,
    date: 'Verified Booksy Client',
    service: 'Teen Haircut (Son)',
    comment: 'Brought my teenage son here for back-to-school. Cash listened to exactly what he wanted and delivered a flawless drop fade. My son will not go to anyone else now.',
    verifiedBooksy: true,
  },
  {
    id: 'rev-6',
    author: 'Brandon K.',
    rating: 5,
    date: 'Verified Booksy Client',
    service: 'Straight Razor Shave & Beard',
    comment: 'The straight razor head shave is first class. No irritation, hot towel treatment was relaxing, and Cash knows how to handle a blade like a master craftsman.',
    verifiedBooksy: true,
  },
];

export interface CraftVideoItem {
  id: string;
  title: string;
  subtitle: string;
  duration: string;
  thumbnail: string;
  reelUrl: string;
}

export const CRAFT_VIDEOS: CraftVideoItem[] = [
  {
    id: 'clip-1',
    title: 'Mid Skin Fade Progression',
    subtitle: 'Zero gap guard transition to seamless blur',
    duration: '0:45',
    thumbnail: '/assets/cuts/video-poster-1.jpg',
    reelUrl: 'https://instagram.com/fadedbycash',
  },
  {
    id: 'clip-2',
    title: 'Crispy Hairline & Razor Finish',
    subtitle: 'Micro-trimmer alignment followed by straight razor',
    duration: '0:35',
    thumbnail: '/assets/cuts/video-poster-2.jpg',
    reelUrl: 'https://instagram.com/fadedbycash',
  },
  {
    id: 'clip-3',
    title: 'Beard Line Architecture',
    subtitle: 'Hot towel steam prep and sharp geometry',
    duration: '0:50',
    thumbnail: '/assets/cuts/video-poster-3.jpg',
    reelUrl: 'https://instagram.com/fadedbycash',
  },
];

export const INSTAGRAM_POSTS = [
  {
    id: 'ig-1',
    image: '/assets/cuts/modern-cut.jpg',
    caption: 'Mid drop skin fade with beard blend. Sharp edges all week long.',
    likes: '142',
    url: 'https://instagram.com/fadedbycash',
  },
  {
    id: 'ig-2',
    image: '/assets/cuts/crispy-lineup.jpg',
    caption: 'Razor-sharp razor lineup & temple taper. Clean geometry by Cash.',
    likes: '189',
    url: 'https://instagram.com/fadedbycash',
  },
  {
    id: 'ig-3',
    image: '/assets/cuts/deluxe-beard.jpg',
    caption: 'Executive beard sculpt with hot steam towel relaxation.',
    likes: '165',
    url: 'https://instagram.com/fadedbycash',
  },
  {
    id: 'ig-4',
    image: '/assets/cuts/crop-top.jpg',
    caption: 'Textured crop with bald taper blend. Book your cut in Garland.',
    likes: '158',
    url: 'https://instagram.com/fadedbycash',
  },
];

export const WHY_CASH_POINTS = [
  {
    number: '01',
    title: 'PRECISION',
    description: 'Every haircut is finished with obsessive attention to detail. No rushed transitions, no missed hairs, and no uneven weight lines.',
    highlight: 'Surgical blade control and millimetric fade blends.',
    icon: 'Crosshair',
  },
  {
    number: '02',
    title: 'STYLE',
    description: 'Classic and modern looks tailored to the client. We evaluate your hair texture, growth patterns, and skull shape to build your best look.',
    highlight: 'Customized geometry designed for your facial structure.',
    icon: 'Sparkles',
  },
  {
    number: '03',
    title: 'GROOMING',
    description: 'Hair, beard, and finishing details handled together. Complete grooming synergy with hot towels, essential oils, and razor sharpness.',
    highlight: 'Total head-to-beard cohesion with luxury finishes.',
    icon: 'Scissors',
  },
  {
    number: '04',
    title: 'EXPERIENCE',
    description: 'Professional, welcoming, and efficient service. Prompt chair starts, premium products, and a calm, upscale environment in Garland, TX.',
    highlight: '329+ five-star clients on Booksy trust Cash weekly.',
    icon: 'Crown',
  },
];
