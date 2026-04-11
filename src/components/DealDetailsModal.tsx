import { motion, AnimatePresence } from 'motion/react';
import { X, Plane, Calendar, Briefcase, RefreshCw, Star, TrendingDown, ExternalLink, ShieldCheck, Info, Clock } from 'lucide-react';
import { FlightDeal } from '../data/mockDeals';
import { cn } from '../lib/utils';

interface DealDetailsModalProps {
  deal: FlightDeal | null;
  isOpen: boolean;
  onClose: () => void;
}

export default function DealDetailsModal({ deal, isOpen, onClose }: DealDetailsModalProps) {
  if (!deal) return null;

  const getRefundLabel = (rule: string) => {
    switch (rule) {
      case 'flexible': return '极速退改 (2小时内到账)';
      case 'strict': return '有条件退改 (需支付手续费)';
      case 'none': return '不可退改';
      default: return '退改规则';
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/90 backdrop-blur-md"
          />
          
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 40 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 40 }}
            className="relative w-full max-w-4xl bg-zinc-950 border border-white/10 rounded-[3rem] overflow-hidden shadow-2xl flex flex-col max-h-[90vh]"
          >
            {/* Header / Image */}
            <div className="relative h-64 sm:h-80 shrink-0">
              <img 
                src={deal.imageUrl} 
                alt={deal.destination} 
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/20 to-transparent"></div>
              
              <button 
                onClick={onClose}
                className="absolute top-6 right-6 p-3 bg-black/50 backdrop-blur-md text-white rounded-2xl hover:bg-white hover:text-black transition-all border border-white/10"
              >
                <X className="w-6 h-6" />
              </button>

              <div className="absolute bottom-8 left-8 right-8">
                <div className="flex flex-wrap items-end justify-between gap-6">
                  <div>
                    <div className="flex items-center gap-3 mb-2">
                      <span className="bg-orange-500 text-white text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-widest">
                        {deal.discountRate} 折扣
                      </span>
                      <span className="bg-white/10 backdrop-blur-md text-white/80 text-[10px] font-bold px-3 py-1 rounded-full border border-white/10 uppercase tracking-widest">
                        {deal.dealType === 'error-fare' ? '神价/BUG价' : '限时特惠'}
                      </span>
                    </div>
                    <h2 className="text-4xl sm:text-6xl font-black text-white tracking-tighter">
                      {deal.origin} <Plane className="inline-block w-8 h-8 mx-2 text-orange-500" /> {deal.destination}
                    </h2>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-white/40 font-bold uppercase tracking-widest mb-1">全网最低价</p>
                    <div className="flex items-baseline gap-3">
                      <span className="text-white/20 line-through text-xl">¥{deal.originalPrice}</span>
                      <span className="text-5xl font-black text-orange-500">¥{deal.price}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Content Area */}
            <div className="flex-1 overflow-y-auto p-8 sm:p-12 scrollbar-hide">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                {/* Left Column: Details */}
                <div className="lg:col-span-2 space-y-12">
                  {/* Flight Info Card */}
                  <div className="bg-white/5 rounded-[2rem] border border-white/10 p-8">
                    <div className="flex items-center justify-between mb-8">
                      <div className="flex items-center gap-4">
                        <img src={deal.airlineLogo} alt={deal.airline} className="w-10 h-10 rounded-xl" referrerPolicy="no-referrer" />
                        <div>
                          <h4 className="font-bold text-white text-lg">{deal.airline}</h4>
                          <p className="text-white/40 text-sm">执飞航班 · 经济舱</p>
                        </div>
                      </div>
                      <div className="bg-orange-500/10 px-4 py-2 rounded-2xl border border-orange-500/20 flex items-center gap-2">
                        <Star className="w-4 h-4 text-orange-500 fill-orange-500" />
                        <span className="text-sm font-black text-orange-500">AI 推荐指数 {deal.score}</span>
                      </div>
                    </div>

                    {/* Timeline Visualization */}
                    <div className="relative flex items-center justify-between mb-12 px-4">
                      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-2/3 h-[1px] bg-white/10 border-t border-dashed border-white/20"></div>
                      
                      <div className="relative z-10 text-center">
                        <p className="text-3xl font-black text-white mb-1">{deal.departureTime}</p>
                        <p className="text-sm font-bold text-white/60">{deal.originCode}</p>
                        <p className="text-[10px] text-white/30 uppercase tracking-widest mt-1">{deal.origin}</p>
                      </div>

                      <div className="relative z-10 flex flex-col items-center">
                        <div className="bg-zinc-900 border border-white/10 px-4 py-2 rounded-full flex items-center gap-2 mb-2">
                          <Clock className="w-3 h-3 text-orange-500" />
                          <span className="text-[10px] font-bold text-white/60">{deal.layoverTime}</span>
                        </div>
                        {deal.layoverCity && (
                          <div className="text-center">
                            <p className="text-xs font-bold text-white/40">{deal.layoverCode}</p>
                            <p className="text-[10px] text-white/20 uppercase tracking-widest">{deal.layoverCity}</p>
                          </div>
                        )}
                      </div>

                      <div className="relative z-10 text-center">
                        <p className="text-3xl font-black text-white mb-1">{deal.arrivalTime}</p>
                        <p className="text-sm font-bold text-white/60">{deal.destinationCode}</p>
                        <p className="text-[10px] text-white/30 uppercase tracking-widest mt-1">{deal.destination}</p>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-8 pt-8 border-t border-white/5">
                      <div className="space-y-6">
                        <div className="flex items-start gap-4">
                          <div className="bg-white/5 p-3 rounded-2xl">
                            <Calendar className="w-5 h-5 text-white/60" />
                          </div>
                          <div>
                            <p className="text-[10px] font-bold text-white/30 uppercase tracking-widest mb-1">旅行日期</p>
                            <p className="text-white font-medium">{deal.departureDate} {deal.returnDate ? `至 ${deal.returnDate}` : '单程'}</p>
                          </div>
                        </div>
                        <div className="flex items-start gap-4">
                          <div className="bg-white/5 p-3 rounded-2xl">
                            <Plane className="w-5 h-5 text-white/60" />
                          </div>
                          <div>
                            <p className="text-[10px] font-bold text-white/30 uppercase tracking-widest mb-1">中转信息</p>
                            <p className="text-white font-medium">
                              {deal.layoverCity ? `${deal.layoverCity} (${deal.layoverCode}) · ${deal.layoverTime}` : deal.layoverTime}
                            </p>
                          </div>
                        </div>
                      </div>
                      <div className="space-y-6">
                        <div className="flex items-start gap-4">
                          <div className="bg-white/5 p-3 rounded-2xl">
                            <Briefcase className="w-5 h-5 text-white/60" />
                          </div>
                          <div>
                            <p className="text-[10px] font-bold text-white/30 uppercase tracking-widest mb-1">免费行李额</p>
                            <p className="text-white font-medium">{deal.baggage}</p>
                          </div>
                        </div>
                        <div className="flex items-start gap-4">
                          <div className="bg-white/5 p-3 rounded-2xl">
                            <RefreshCw className="w-5 h-5 text-white/60" />
                          </div>
                          <div>
                            <p className="text-[10px] font-bold text-white/30 uppercase tracking-widest mb-1">退改签规则</p>
                            <p className="text-white font-medium">{getRefundLabel(deal.refundRule)}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Price Analysis */}
                  <div>
                    <div className="flex items-center justify-between mb-6">
                      <h3 className="text-xl font-bold flex items-center gap-3">
                        <TrendingDown className="w-6 h-6 text-green-500" />
                        价格趋势分析
                      </h3>
                      <span className="text-xs text-white/40 font-medium">数据更新于 5分钟前</span>
                    </div>
                    <div className="bg-white/5 rounded-[2rem] border border-white/10 p-8">
                      <div className="h-40 flex items-end gap-4">
                        {deal.priceHistory.map((h, i) => {
                          const max = Math.max(...deal.priceHistory.map(p => p.price));
                          const min = Math.min(...deal.priceHistory.map(p => p.price));
                          const height = ((h.price - min) / (max - min || 1)) * 100;
                          return (
                            <div key={i} className="flex-1 flex flex-col items-center gap-3 group/bar">
                              <div className="w-full bg-white/10 rounded-2xl relative transition-all duration-500 group-hover/bar:bg-orange-500/50" style={{ height: `${Math.max(20, 100 - height)}%` }}>
                                <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-white text-black text-[10px] font-black px-2 py-1 rounded-lg opacity-0 group-hover/bar:opacity-100 transition-all">
                                  ¥{h.price}
                                </div>
                              </div>
                              <span className="text-[10px] font-bold text-white/30">{h.date}</span>
                            </div>
                          );
                        })}
                      </div>
                      <div className="mt-8 pt-8 border-t border-white/5 flex items-center gap-4">
                        <div className="bg-green-500/10 p-2 rounded-xl">
                          <ShieldCheck className="w-5 h-5 text-green-500" />
                        </div>
                        <p className="text-sm text-white/60 leading-relaxed">
                          <span className="text-green-500 font-bold">AI 建议：</span> 当前价格处于历史低位，且该航司闪促通常持续时间极短，建议立即下单。
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Right Column: Booking */}
                <div className="space-y-8">
                  <div className="bg-orange-500 rounded-[2rem] p-8 text-white shadow-xl shadow-orange-500/20">
                    <div className="flex items-center gap-3 mb-6">
                      <div className="bg-white/20 p-2 rounded-xl">
                        <ExternalLink className="w-5 h-5" />
                      </div>
                      <h3 className="text-lg font-bold">立即预订</h3>
                    </div>
                    <p className="text-sm text-white/80 mb-8 leading-relaxed">
                      该价格由 <span className="font-black underline">{deal.source.name}</span> 提供。点击下方按钮将跳转至服务商页面完成支付。
                    </p>
                    <a 
                      href={deal.source.url} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="block w-full bg-white text-orange-500 py-4 rounded-2xl font-black text-center hover:bg-zinc-100 transition-all shadow-lg"
                    >
                      前往 {deal.source.name}
                    </a>
                  </div>

                  <div className="bg-white/5 rounded-[2rem] border border-white/10 p-8">
                    <h4 className="text-[10px] font-bold text-white/30 uppercase tracking-widest mb-6">预订须知</h4>
                    <ul className="space-y-4">
                      <li className="flex items-start gap-3">
                        <Info className="w-4 h-4 text-orange-500 shrink-0 mt-0.5" />
                        <p className="text-xs text-white/50 leading-relaxed">特价机票库存变化极快，如跳转后价格变动，请以服务商实时显示为准。</p>
                      </li>
                      <li className="flex items-start gap-3">
                        <Info className="w-4 h-4 text-orange-500 shrink-0 mt-0.5" />
                        <p className="text-xs text-white/50 leading-relaxed">请务必核对乘机人姓名、证件号及有效期，确保与护照一致。</p>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
