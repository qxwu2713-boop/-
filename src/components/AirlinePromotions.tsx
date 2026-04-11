import { motion } from 'motion/react';
import { Gift, ExternalLink, Clock, Tag } from 'lucide-react';

const PROMOS = [
  {
    id: 1,
    airline: '全日空 ANA',
    title: '全日空 72小时闪促',
    description: '中日航线往返含税 1200元起，包含 2件 23kg 托运行李。',
    expiry: '2026-04-15',
    image: 'https://picsum.photos/seed/ana-promo/800/400',
    color: 'blue'
  },
  {
    id: 2,
    airline: '中国国航',
    title: '国航会员日：全球航线 8折',
    description: '每月 13日国航会员日，全线机票折上折，更有里程双倍积分。',
    expiry: '2026-04-13',
    image: 'https://picsum.photos/seed/airchina-promo/800/400',
    color: 'red'
  },
  {
    id: 3,
    airline: '卡塔尔航空',
    title: '卡航全球特惠：欧洲航线',
    description: '五星级航司体验，往返伦敦、巴黎、法兰克福低至 4500元。',
    expiry: '2026-04-30',
    image: 'https://picsum.photos/seed/qatar-promo/800/400',
    color: 'purple'
  }
];

export default function AirlinePromotions() {
  return (
    <div className="py-12">
      <div className="flex items-center gap-3 mb-8">
        <div className="bg-orange-500/20 p-2 rounded-xl">
          <Gift className="w-6 h-6 text-orange-500" />
        </div>
        <div>
          <h2 className="text-3xl font-bold tracking-tight text-white">航司官方活动</h2>
          <p className="text-white/40 text-sm mt-1">聚合各大航司最新闪促、会员日及大促信息</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {PROMOS.map((promo, index) => (
          <motion.div
            key={promo.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="group relative bg-zinc-900/50 rounded-[2.5rem] overflow-hidden border border-white/5 hover:border-orange-500/30 transition-all duration-500"
          >
            <div className="h-48 overflow-hidden">
              <img src={promo.image} alt={promo.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" referrerPolicy="no-referrer" />
              <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/20 to-transparent"></div>
            </div>
            
            <div className="p-8 relative -mt-12">
              <div className="flex items-center gap-2 mb-4">
                <Tag className="w-4 h-4 text-orange-500" />
                <span className="text-xs font-bold text-orange-500 uppercase tracking-widest">{promo.airline}</span>
              </div>
              <h3 className="text-2xl font-bold text-white mb-3">{promo.title}</h3>
              <p className="text-white/60 text-sm leading-relaxed mb-6">{promo.description}</p>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-xs text-white/40">
                  <Clock className="w-4 h-4" />
                  <span>截止日期: {promo.expiry}</span>
                </div>
                <button className="flex items-center gap-2 bg-white text-black px-6 py-3 rounded-2xl font-bold text-sm hover:bg-orange-500 hover:text-white transition-all">
                  立即前往 <ExternalLink className="w-4 h-4" />
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
