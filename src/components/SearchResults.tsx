import { useState } from 'react';
import { motion } from 'motion/react';
import { Search, MapPin, Calendar, Filter, X, Check, Briefcase, Plane, Coffee, RefreshCw } from 'lucide-react';
import { FlightDeal, MOCK_DEALS } from '../data/mockDeals';
import DealCard from './DealCard';
import { cn } from '../lib/utils';

interface SearchResultsProps {
  onBack: () => void;
  onViewDetails: (deal: FlightDeal) => void;
}

export default function SearchResults({ onBack, onViewDetails }: SearchResultsProps) {
  const [filters, setFilters] = useState({
    weekendOnly: false,
    freeBaggage: false,
    noLowCost: false,
    supportRefund: false,
  });
  const [sortBy, setSortBy] = useState('Recommended');

  const toggleFilter = (key: keyof typeof filters) => {
    setFilters(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const filteredDeals = MOCK_DEALS.filter(deal => {
    if (filters.weekendOnly && !deal.tags.includes('周末游')) return false;
    if (filters.freeBaggage && deal.baggage.includes('无免费托运')) return false;
    if (filters.noLowCost && ['亚洲航空 AirAsia', '春秋航空'].includes(deal.airline)) return false;
    if (filters.supportRefund && deal.refundRule !== 'flexible') return false;
    return true;
  });

  const sortedDeals = [...filteredDeals].sort((a, b) => {
    if (sortBy === 'PriceLow') return a.price - b.price;
    if (sortBy === 'DiscountHigh') {
      const rateA = parseFloat(a.discountRate);
      const rateB = parseFloat(b.discountRate);
      return rateA - rateB; // Lower number means higher discount (e.g., 1.2折 < 2.8折)
    }
    return b.score - a.score; // Default: Recommended (Score)
  });

  return (
    <div className="py-8">
      {/* Search Header */}
      <div className="bg-zinc-900/50 border border-white/10 rounded-[2.5rem] p-6 mb-8 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-6 w-full md:w-auto">
          <button onClick={onBack} className="p-2 hover:bg-white/5 rounded-full transition-colors">
            <X className="w-6 h-6 text-white/40" />
          </button>
          <div className="flex items-center gap-4">
            <div className="text-left">
              <p className="text-[10px] uppercase tracking-widest text-white/30 font-bold">航线</p>
              <p className="text-white font-bold">上海 (PVG) → 东京 (NRT)</p>
            </div>
            <div className="h-8 w-[1px] bg-white/10"></div>
            <div className="text-left">
              <p className="text-[10px] uppercase tracking-widest text-white/30 font-bold">日期</p>
              <p className="text-white font-bold">2026-05-15</p>
            </div>
          </div>
        </div>
        
        <div className="flex items-center gap-3 w-full md:w-auto">
          <div className="relative flex-1 md:w-64">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/20" />
            <input 
              type="text" 
              placeholder="搜索结果..." 
              className="w-full bg-white/5 border border-white/10 rounded-2xl py-3 pl-12 pr-4 text-sm text-white focus:outline-none focus:border-orange-500 transition-all"
            />
          </div>
          <button className="bg-white text-black px-6 py-3 rounded-2xl font-bold text-sm hover:bg-orange-500 hover:text-white transition-all">
            重新搜索
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">
        {/* Sidebar Filters */}
        <div className="space-y-8">
          <div>
            <div className="flex items-center gap-2 mb-6">
              <Filter className="w-5 h-5 text-orange-500" />
              <h3 className="text-lg font-bold">多维过滤器</h3>
            </div>
            
            <div className="space-y-3">
              <button 
                onClick={() => toggleFilter('weekendOnly')}
                className={cn(
                  "w-full flex items-center justify-between p-4 rounded-2xl border transition-all group",
                  filters.weekendOnly ? "bg-orange-500/10 border-orange-500/50" : "bg-white/5 border-white/5 hover:border-white/10"
                )}
              >
                <div className="flex items-center gap-3">
                  <div className={cn("p-2 rounded-xl", filters.weekendOnly ? "bg-orange-500 text-white" : "bg-white/5 text-white/40")}>
                    <Coffee className="w-4 h-4" />
                  </div>
                  <span className={cn("text-sm font-bold", filters.weekendOnly ? "text-white" : "text-white/60")}>仅看周末往返</span>
                </div>
                {filters.weekendOnly && <Check className="w-4 h-4 text-orange-500" />}
              </button>

              <button 
                onClick={() => toggleFilter('freeBaggage')}
                className={cn(
                  "w-full flex items-center justify-between p-4 rounded-2xl border transition-all group",
                  filters.freeBaggage ? "bg-blue-500/10 border-blue-500/50" : "bg-white/5 border-white/5 hover:border-white/10"
                )}
              >
                <div className="flex items-center gap-3">
                  <div className={cn("p-2 rounded-xl", filters.freeBaggage ? "bg-blue-500 text-white" : "bg-white/5 text-white/40")}>
                    <Briefcase className="w-4 h-4" />
                  </div>
                  <span className={cn("text-sm font-bold", filters.freeBaggage ? "text-white" : "text-white/60")}>含免费行李额</span>
                </div>
                {filters.freeBaggage && <Check className="w-4 h-4 text-blue-500" />}
              </button>

              <button 
                onClick={() => toggleFilter('noLowCost')}
                className={cn(
                  "w-full flex items-center justify-between p-4 rounded-2xl border transition-all group",
                  filters.noLowCost ? "bg-purple-500/10 border-purple-500/50" : "bg-white/5 border-white/5 hover:border-white/10"
                )}
              >
                <div className="flex items-center gap-3">
                  <div className={cn("p-2 rounded-xl", filters.noLowCost ? "bg-purple-500 text-white" : "bg-white/5 text-white/40")}>
                    <Plane className="w-4 h-4" />
                  </div>
                  <span className={cn("text-sm font-bold", filters.noLowCost ? "text-white" : "text-white/60")}>拒掉廉航</span>
                </div>
                {filters.noLowCost && <Check className="w-4 h-4 text-purple-500" />}
              </button>

              <button 
                onClick={() => toggleFilter('supportRefund')}
                className={cn(
                  "w-full flex items-center justify-between p-4 rounded-2xl border transition-all group",
                  filters.supportRefund ? "bg-green-500/10 border-green-500/50" : "bg-white/5 border-white/5 hover:border-white/10"
                )}
              >
                <div className="flex items-center gap-3">
                  <div className={cn("p-2 rounded-xl", filters.supportRefund ? "bg-green-500 text-white" : "bg-white/5 text-white/40")}>
                    <RefreshCw className="w-4 h-4" />
                  </div>
                  <span className={cn("text-sm font-bold", filters.supportRefund ? "text-white" : "text-white/60")}>支持退改</span>
                </div>
                {filters.supportRefund && <Check className="w-4 h-4 text-green-500" />}
              </button>
            </div>
          </div>

          <div className="bg-zinc-900/50 p-6 rounded-[2rem] border border-white/5">
            <h4 className="text-[10px] font-bold text-white/30 uppercase tracking-widest mb-4">筛选建议</h4>
            <p className="text-xs text-white/40 leading-relaxed">
              根据您的历史偏好，开启“含免费行李额”可过滤掉 40% 的廉航红眼航班，提升旅行舒适度。
            </p>
          </div>
        </div>

        {/* Results Grid */}
        <div className="lg:col-span-3">
          <div className="flex items-center justify-between mb-8">
            <p className="text-sm text-white/40">找到 <span className="text-white font-bold">{sortedDeals.length}</span> 个符合条件的航班</p>
            <div className="flex items-center gap-4">
              <span className="text-xs text-white/30">排序:</span>
              <select 
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="bg-transparent border-none text-xs font-bold text-white focus:ring-0 cursor-pointer"
              >
                <option value="Recommended">推荐排序</option>
                <option value="PriceLow">价格最低</option>
                <option value="DiscountHigh">折扣最高</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {sortedDeals.map((deal, index) => (
              <DealCard 
                key={deal.id} 
                deal={deal} 
                index={index} 
                onViewDetails={onViewDetails}
              />
            ))}
            {sortedDeals.length === 0 && (
              <div className="col-span-full py-20 text-center">
                <p className="text-white/40">没有找到符合条件的航班，请尝试调整过滤器。</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
