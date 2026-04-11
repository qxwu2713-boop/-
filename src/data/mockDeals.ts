export interface FlightDeal {
  id: string;
  origin: string;
  destination: string;
  originCode: string;
  destinationCode: string;
  price: number;
  originalPrice: number; // For discount calculation
  discountRate: string; // e.g., "1.2折"
  currency: string;
  airline: string;
  airlineLogo: string;
  departureDate: string;
  returnDate?: string;
  dealType: 'flash' | 'last-minute' | 'seasonal' | 'error-fare';
  tags: string[];
  imageUrl: string;
  score: number; // Recommended Purchase Index
  // New fields for rule visualization
  baggage: string; // e.g., "23kg x 1"
  refundRule: 'strict' | 'flexible' | 'none'; 
  layoverTime?: string; // e.g., "2h 15m" or "直飞"
  layoverCity?: string; // e.g., "香港", "首尔"
  layoverCode?: string; // e.g., "HKG", "ICN"
  departureTime: string; // e.g., "10:30"
  arrivalTime: string; // e.g., "14:45"
  priceHistory: { date: string; price: number }[];
  source: {
    name: string; // e.g., "携程", "飞猪", "全日空官网"
    url: string;
  };
}

export const MOCK_DEALS: FlightDeal[] = [
  {
    id: '1',
    origin: '上海',
    originCode: 'PVG',
    destination: '东京',
    destinationCode: 'NRT',
    price: 1280,
    originalPrice: 4500,
    discountRate: '2.8折',
    currency: 'CNY',
    airline: '全日空 ANA',
    airlineLogo: 'https://www.ana.co.jp/favicon.ico',
    departureDate: '2026-05-15',
    returnDate: '2026-05-22',
    dealType: 'seasonal',
    tags: ['樱花季', '直飞'],
    imageUrl: 'https://picsum.photos/seed/tokyo/800/600',
    score: 92,
    baggage: '23kg x 2',
    refundRule: 'flexible',
    layoverTime: '直飞',
    departureTime: '10:30',
    arrivalTime: '14:45',
    priceHistory: [
      { date: '04-01', price: 2100 },
      { date: '04-05', price: 1900 },
      { date: '04-10', price: 1280 }
    ],
    source: { name: '全日空官网', url: 'https://www.ana.co.jp' }
  },
  {
    id: '2',
    origin: '北京',
    originCode: 'PEK',
    destination: '伦敦',
    destinationCode: 'LHR',
    price: 3500,
    originalPrice: 8800,
    discountRate: '3.9折',
    currency: 'CNY',
    airline: '中国国航',
    airlineLogo: 'https://www.airchina.com.cn/favicon.ico',
    departureDate: '2026-06-10',
    returnDate: '2026-06-25',
    dealType: 'flash',
    tags: ['暑期预售', '高性价比'],
    imageUrl: 'https://picsum.photos/seed/london/800/600',
    score: 88,
    baggage: '23kg x 1',
    refundRule: 'strict',
    layoverTime: '3h 20m (中转)',
    layoverCity: '上海',
    layoverCode: 'PVG',
    departureTime: '13:00',
    arrivalTime: '22:40',
    priceHistory: [
      { date: '04-01', price: 4500 },
      { date: '04-05', price: 4200 },
      { date: '04-10', price: 3500 }
    ],
    source: { name: '携程旅行', url: 'https://www.ctrip.com' }
  },
  {
    id: '3',
    origin: '广州',
    originCode: 'CAN',
    destination: '曼谷',
    destinationCode: 'BKK',
    price: 880,
    originalPrice: 2200,
    discountRate: '4.0折',
    currency: 'CNY',
    airline: '亚洲航空 AirAsia',
    airlineLogo: 'https://www.airasia.com/favicon.ico',
    departureDate: '2026-04-20',
    dealType: 'last-minute',
    tags: ['周末游', '特惠'],
    imageUrl: 'https://picsum.photos/seed/bangkok/800/600',
    score: 95,
    baggage: '无免费托运',
    refundRule: 'none',
    layoverTime: '直飞',
    departureTime: '08:20',
    arrivalTime: '11:30',
    priceHistory: [
      { date: '04-01', price: 1500 },
      { date: '04-05', price: 1200 },
      { date: '04-10', price: 880 }
    ],
    source: { name: '飞猪旅行', url: 'https://www.fliggy.com' }
  },
  {
    id: '6',
    origin: '上海',
    originCode: 'SHA',
    destination: '大阪',
    destinationCode: 'KIX',
    price: 599,
    originalPrice: 4999,
    discountRate: '1.2折',
    currency: 'CNY',
    airline: '春秋航空',
    airlineLogo: 'https://www.ch.com/favicon.ico',
    departureDate: '2026-04-28',
    dealType: 'error-fare',
    tags: ['手慢无', '极低价'],
    imageUrl: 'https://picsum.photos/seed/osaka/800/600',
    score: 98,
    baggage: '7kg 手提',
    refundRule: 'none',
    layoverTime: '直飞',
    departureTime: '18:15',
    arrivalTime: '21:30',
    priceHistory: [
      { date: '04-01', price: 1800 },
      { date: '04-05', price: 1750 },
      { date: '04-10', price: 599 }
    ],
    source: { name: '春秋航空官网', url: 'https://www.ch.com' }
  }
];
