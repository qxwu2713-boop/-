import { motion } from 'motion/react';
import { Plane, Star, Clock, ArrowRight, Briefcase, RefreshCw, TrendingDown, ExternalLink, Calendar } from 'lucide-react';
import { FlightDeal } from '../data/mockDeals';
import { cn } from '../lib/utils';

interface DealCardProps {
  deal: FlightDeal;
  index: number;
  onViewDetails?: (deal: FlightDeal) => void;
  key?: string | number;
}

export default function DealCard({ deal, index, onViewDetails }: DealCardProps) {
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

  const getRefundLabel = (rule: string) => {
    switch (rule) {
      case 'flexible': return '极速退改';
      case 'strict': return '有条件退改';
      case 'none': return '不可退改';
      default: return '退改规则';
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
        
        <div className="absolute top-4 left-4 flex flex-col gap-2">
          <span className="bg-white text-black px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider self-start shadow-xl">
            {deal.discountRate}
          </span>
        </div>

        {/* Source Badge */}
        <div className="absolute top-4 right-4">
          <div className="bg-black/40 backdrop-blur-md border border-white/10 px-3 py-1.5 rounded-xl flex items-center gap-2">
            <span className="text-[10px] text-white/60 font-medium">来源: {deal.source.name}</span>
            <ExternalLink className="w-3 h-3 text-white/40" />
          </div>
        </div>

        <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between">
          <div>
            <h3 className="text-2xl font-bold text-white tracking-tight">{deal.destination}</h3>
            <p className="text-white/60 text-sm font-light">{deal.destinationCode} · {deal.origin}出发</p>
          </div>
          <div className="text-right">
            <p className="text-[10px] text-white/40 font-bold uppercase tracking-widest">起价</p>
            <p className="text-2xl font-black text-orange-500">¥{deal.price}</p>
            <p className="text-[10px] text-white/20 line-through">¥{deal.originalPrice}</p>
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
          <div className="flex items-center gap-1 bg-orange-500/10 px-2 py-1 rounded-lg border border-orange-500/20">
            <Star className="w-3 h-3 text-orange-500 fill-orange-500" />
            <span className="text-xs font-bold text-orange-500">推荐指数 {deal.score}</span>
          </div>
        </div>

        {/* Prominent Time Row */}
        <div className="flex items-center justify-between mb-6 px-2">
          <div className="text-left">
            <p className="text-lg font-black text-white leading-none mb-1">{deal.departureTime}</p>
            <p className="text-[10px] font-bold text-white/30 uppercase tracking-widest">{deal.originCode}</p>
          </div>
          
          <div className="flex-1 flex flex-col items-center px-4">
            <div className="w-full h-[1px] bg-white/10 relative">
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-zinc-900 px-2">
                <Plane className="w-3 h-3 text-white/20" />
              </div>
            </div>
            <span className="text-[9px] font-bold text-orange-500/60 mt-1 uppercase tracking-tighter">{deal.layoverTime}</span>
          </div>

          <div className="text-right">
            <p className="text-lg font-black text-white leading-none mb-1">{deal.arrivalTime}</p>
            <p className="text-[10px] font-bold text-white/30 uppercase tracking-widest">{deal.destinationCode}</p>
          </div>
        </div>

        {/* Rule Visualization */}
        <div className="grid grid-cols-3 gap-2 mb-4">
          <div className="bg-white/5 p-2 rounded-xl border border-white/5 flex flex-col items-center text-center">
            <Briefcase className="w-3 h-3 text-white/40 mb-1" />
            <span className="text-[9px] text-white/60 font-medium truncate w-full">{deal.baggage}</span>
          </div>
          <div className="bg-white/5 p-2 rounded-xl border border-white/5 flex flex-col items-center text-center">
            <RefreshCw className="w-3 h-3 text-white/40 mb-1" />
            <span className="text-[9px] text-white/60 font-medium truncate w-full">{getRefundLabel(deal.refundRule)}</span>
          </div>
          <div className="bg-white/5 p-2 rounded-xl border border-white/5 flex flex-col items-center text-center">
            <Calendar className="w-3 h-3 text-white/40 mb-1" />
            <span className="text-[9px] text-white/60 font-medium truncate w-full">{deal.departureDate.split('-').slice(1).join('/')}</span>
          </div>
        </div>

        {/* Price Trend Sparkline (Mockup) */}
        <div className="mb-4 bg-white/5 p-3 rounded-2xl border border-white/5">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[10px] text-white/30 font-bold uppercase tracking-widest">价格走势</span>
            <div className="flex items-center gap-1 text-[10px] text-green-500 font-bold">
              <TrendingDown className="w-3 h-3" />
              <span>近期最低</span>
            </div>
          </div>
          <div className="h-8 flex items-end gap-1">
            {deal.priceHistory.map((h, i) => {
              const max = Math.max(...deal.priceHistory.map(p => p.price));
              const min = Math.min(...deal.priceHistory.map(p => p.price));
              const height = ((h.price - min) / (max - min || 1)) * 100;
              return (
                <div 
                  key={i} 
                  className="flex-1 bg-white/10 rounded-t-sm relative group/bar"
                  style={{ height: `${Math.max(20, 100 - height)}%` }}
                >
                  <div className="absolute -top-6 left-1/2 -translate-x-1/2 bg-white text-black text-[8px] px-1 rounded opacity-0 group-hover/bar:opacity-100 transition-opacity pointer-events-none whitespace-nowrap">
                    ¥{h.price}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="flex flex-wrap gap-2 mb-6">
          <span className={cn(
            "px-2 py-1 rounded-md text-[10px] font-bold border",
            getDealTypeColor(deal.dealType)
          )}>
            {getDealTypeLabel(deal.dealType)}
          </span>
          {deal.tags.map(tag => (
            <span key={tag} className="px-2 py-1 bg-white/5 rounded-md text-[10px] text-white/40 border border-white/5">
              #{tag}
            </span>
          ))}
        </div>

        <button 
          onClick={() => onViewDetails?.(deal)}
          className="w-full bg-white/5 hover:bg-orange-500 text-white py-3 rounded-xl font-bold text-sm transition-all duration-300 flex items-center justify-center gap-2 group/btn border border-white/10 hover:border-orange-500"
        >
          查看详情
          <ArrowRight className="w-4 h-4 transition-transform group-hover/btn:translate-x-1" />
        </button>
      </div>
    </motion.div>
  );
}
