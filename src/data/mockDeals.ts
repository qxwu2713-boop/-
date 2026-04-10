export interface FlightDeal {
  id: string;
  origin: string;
  destination: string;
  originCode: string;
  destinationCode: string;
  price: number;
  currency: string;
  airline: string;
  airlineLogo: string;
  departureDate: string;
  returnDate?: string;
  dealType: 'flash' | 'last-minute' | 'seasonal' | 'error-fare';
  tags: string[];
  imageUrl: string;
  score: number; // 0-100, AI calculated value score
}

export const MOCK_DEALS: FlightDeal[] = [
  {
    id: '1',
    origin: '上海',
    originCode: 'PVG',
    destination: '东京',
    destinationCode: 'NRT',
    price: 1280,
    currency: 'CNY',
    airline: '全日空 ANA',
    airlineLogo: 'https://www.ana.co.jp/favicon.ico',
    departureDate: '2026-05-15',
    returnDate: '2026-05-22',
    dealType: 'seasonal',
    tags: ['樱花季', '直飞'],
    imageUrl: 'https://picsum.photos/seed/tokyo/800/600',
    score: 92
  },
  {
    id: '2',
    origin: '北京',
    originCode: 'PEK',
    destination: '伦敦',
    destinationCode: 'LHR',
    price: 3500,
    currency: 'CNY',
    airline: '中国国航',
    airlineLogo: 'https://www.airchina.com.cn/favicon.ico',
    departureDate: '2026-06-10',
    returnDate: '2026-06-25',
    dealType: 'flash',
    tags: ['暑期预售', '高性价比'],
    imageUrl: 'https://picsum.photos/seed/london/800/600',
    score: 88
  },
  {
    id: '3',
    origin: '广州',
    originCode: 'CAN',
    destination: '曼谷',
    destinationCode: 'BKK',
    price: 880,
    currency: 'CNY',
    airline: '亚洲航空 AirAsia',
    airlineLogo: 'https://www.airasia.com/favicon.ico',
    departureDate: '2026-04-20',
    dealType: 'last-minute',
    tags: ['周末游', '特惠'],
    imageUrl: 'https://picsum.photos/seed/bangkok/800/600',
    score: 95
  },
  {
    id: '4',
    origin: '成都',
    originCode: 'TFU',
    destination: '巴黎',
    destinationCode: 'CDG',
    price: 4200,
    currency: 'CNY',
    airline: '四川航空',
    airlineLogo: 'https://www.sichuanair.com/favicon.ico',
    departureDate: '2026-09-12',
    returnDate: '2026-09-20',
    dealType: 'seasonal',
    tags: ['中秋假期', '直飞'],
    imageUrl: 'https://picsum.photos/seed/paris/800/600',
    score: 85
  },
  {
    id: '5',
    origin: '深圳',
    originCode: 'SZX',
    destination: '首尔',
    destinationCode: 'ICN',
    price: 1100,
    currency: 'CNY',
    airline: '大韩航空',
    airlineLogo: 'https://www.koreanair.com/favicon.ico',
    departureDate: '2026-05-01',
    returnDate: '2026-05-05',
    dealType: 'flash',
    tags: ['五一假期', '购物季'],
    imageUrl: 'https://picsum.photos/seed/seoul/800/600',
    score: 90
  },
  {
    id: '6',
    origin: '上海',
    originCode: 'SHA',
    destination: '大阪',
    destinationCode: 'KIX',
    price: 999,
    currency: 'CNY',
    airline: '春秋航空',
    airlineLogo: 'https://www.ch.com/favicon.ico',
    departureDate: '2026-04-28',
    dealType: 'error-fare',
    tags: ['手慢无', '极低价'],
    imageUrl: 'https://picsum.photos/seed/osaka/800/600',
    score: 98
  }
];
