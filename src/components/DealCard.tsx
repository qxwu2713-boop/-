import { motion } from 'motion/react';
import { Plane, Star, Clock, ArrowRight } from 'lucide-react';
import { FlightDeal } from '../data/mockDeals';
import { cn } from '../lib/utils';

interface DealCardProps {
  deal: FlightDeal;
  index: number;
  key?: string | number;
}

export default function DealCard({ deal, index }: DealCardProps) {
  const getDealTypeLabel = (type: string) => {
    switch (type) {
      case 'flash': return '限时秒杀';
      case 'last-minute': return '最后时刻';
      case 'seasonal': return '季节特惠';
      case 'error-fare': return '神价/BUG价';
      default: return '特价机票';
    }
  };

  const getDealTypeColor = (type: string) => {
    switch (type) {
      case 'error-fare': return 'bg-red-500/20 text-red-400 border-red-500/30';
      case 'flash': return 'bg-orange-500/20 text-orange-400 border-orange-500/30';
      default: return 'bg-blue-500/20 text-blue-400 border-blue-500/30';
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      className="group relative bg-zinc-900/50 rounded-3xl overflow-hidden border border-white/5 hover:border-orange-500/30 transition-all duration-500"
    >
      {/* Image Section */}
      <div className="relative h-48 overflow-hidden">
        <img 
          src={deal.imageUrl} 
          alt={deal.destination} 
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-zinc-900 via-transparent to-transparent"></div>
        
        <div className="absolute top-4 left-4 flex gap-2">
          <span className={cn(
            "px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider border backdrop-blur-md",
            getDealTypeColor(deal.dealType)
          )}>
            {getDealTypeLabel(deal.dealType)}
          </span>
        </div>

        <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between">
          <div>
            <h3 className="text-2xl font-bold text-white tracking-tight">{deal.destination}</h3>
            <p className="text-white/60 text-sm font-light">{deal.destinationCode} · {deal.origin}出发</p>
          </div>
          <div className="text-right">
            <p className="text-[10px] text-white/40 font-bold uppercase tracking-widest">起价</p>
            <p className="text-2xl font-black text-orange-500">¥{deal.price}</p>
          </div>
        </div>
      </div>

      {/* Content Section */}
      <div className="p-5">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <img src={deal.airlineLogo} alt={deal.airline} className="w-5 h-5 rounded-sm opacity-70" referrerPolicy="no-referrer" />
            <span className="text-xs text-white/50 font-medium">{deal.airline}</span>
          </div>
          <div className="flex items-center gap-1 bg-white/5 px-2 py-1 rounded-lg border border-white/5">
            <Star className="w-3 h-3 text-orange-500 fill-orange-500" />
            <span className="text-xs font-bold text-white/80">{deal.score}</span>
          </div>
        </div>

        <div className="flex items-center gap-4 py-3 border-y border-white/5 mb-4">
          <div className="flex-1">
            <p className="text-[10px] text-white/30 uppercase font-bold mb-1">日期</p>
            <div className="flex items-center gap-2 text-xs text-white/70">
              <Clock className="w-3 h-3" />
              <span>{deal.departureDate} {deal.returnDate ? `至 ${deal.returnDate}` : '单程'}</span>
            </div>
          </div>
        </div>

        <div className="flex flex-wrap gap-2 mb-6">
          {deal.tags.map(tag => (
            <span key={tag} className="px-2 py-1 bg-white/5 rounded-md text-[10px] text-white/40 border border-white/5">
              #{tag}
            </span>
          ))}
        </div>

        <button className="w-full bg-white/5 hover:bg-orange-500 text-white py-3 rounded-xl font-bold text-sm transition-all duration-300 flex items-center justify-center gap-2 group/btn border border-white/10 hover:border-orange-500">
          查看详情
          <ArrowRight className="w-4 h-4 transition-transform group-hover/btn:translate-x-1" />
        </button>
      </div>
    </motion.div>
  );
}
