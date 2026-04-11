import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Compass, MapPin, Banknote, Calendar, Search, ArrowRight, Sparkles, Plane, X, ChevronLeft, ChevronRight } from 'lucide-react';
import { DayPicker, DateRange } from 'react-day-picker';
import { format, addDays } from 'date-fns';
import { zhCN } from 'date-fns/locale';
import { MOCK_DEALS, FlightDeal } from '../data/mockDeals';
import DealCard from './DealCard';

interface ReverseDiscoveryProps {
  onViewDetails: (deal: FlightDeal) => void;
}

export default function ReverseDiscovery({ onViewDetails }: ReverseDiscoveryProps) {
  const [origin, setOrigin] = useState('上海');
  const [budget, setBudget] = useState(3000);
  const [dateRange, setDateRange] = useState<DateRange | undefined>({
    from: new Date(),
    to: addDays(new Date(), 7)
  });
  const [isDatePickerOpen, setIsDatePickerOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('全部');
  const [selectedRegion, setSelectedRegion] = useState('全部');
  const [results, setResults] = useState<FlightDeal[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  
  const datePickerRef = useRef<HTMLDivElement>(null);

  const categories = ['全部', '秒杀', '最后时刻', '季节特惠', '神价'];
  const regions = ['全部', '亚洲', '欧洲', '美洲', '国内'];

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (datePickerRef.current && !datePickerRef.current.contains(event.target as Node)) {
        setIsDatePickerOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleExplore = () => {
    setIsSearching(true);
    // Simulate AI thinking
    setTimeout(() => {
      const filtered = MOCK_DEALS.filter(deal => {
        const matchOrigin = deal.origin.includes(origin);
        const matchBudget = deal.price <= budget;
        const matchCategory = selectedCategory === '全部' || 
          (selectedCategory === '秒杀' && deal.dealType === 'flash') ||
          (selectedCategory === '最后时刻' && deal.dealType === 'last-minute') ||
          (selectedCategory === '季节特惠' && deal.dealType === 'seasonal') ||
          (selectedCategory === '神价' && deal.dealType === 'error-fare');
        
        // Simple region mapping for mock data
        const matchRegion = selectedRegion === '全部' || 
          (selectedRegion === '亚洲' && ['东京', '曼谷', '大阪'].includes(deal.destination)) ||
          (selectedRegion === '欧洲' && ['伦敦'].includes(deal.destination)) ||
          (selectedRegion === '国内' && false);

        return matchOrigin && matchBudget && matchCategory && matchRegion;
      });
      setResults(filtered);
      setIsSearching(false);
    }, 1500);
  };

  const formatDateDisplay = () => {
    if (dateRange?.from) {
      if (dateRange.to) {
        return `${format(dateRange.from, 'MM/dd')} - ${format(dateRange.to, 'MM/dd')}`;
      }
      return format(dateRange.from, 'MM/dd');
    }
    return '选择日期范围';
  };

  return (
    <section className="py-16">
      <div className="bg-gradient-to-br from-zinc-900 to-black rounded-[3rem] border border-white/5 p-8 md:p-12 relative overflow-hidden">
        {/* Background Glow */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-orange-500/5 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/2"></div>
        
        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-6">
            <div className="bg-orange-500/20 p-2 rounded-xl">
              <Compass className="w-6 h-6 text-orange-500" />
            </div>
            <h2 className="text-2xl md:text-3xl font-black tracking-tight">反向发现 <span className="text-orange-500">Reverse Discovery</span></h2>
          </div>
          
          <p className="text-white/40 mb-10 max-w-xl">
            不知道去哪？告诉我们预算和时间，AI 帮你探索无限可能。
            <span className="block mt-1 text-orange-500/60 text-xs font-bold">目前最受“说走就走”打工人欢迎的功能</span>
          </p>

          {/* Search Controls */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
            <div className="bg-white/5 border border-white/10 rounded-2xl p-4 focus-within:border-orange-500/50 transition-colors">
              <label className="flex items-center gap-2 text-[10px] font-bold text-white/30 uppercase tracking-widest mb-2">
                <MapPin className="w-3 h-3" /> 出发地
              </label>
              <input 
                type="text" 
                value={origin}
                onChange={(e) => setOrigin(e.target.value)}
                className="bg-transparent text-white font-bold w-full focus:outline-none"
                placeholder="例如：上海"
              />
            </div>
            
            <div className="bg-white/5 border border-white/10 rounded-2xl p-4 focus-within:border-orange-500/50 transition-colors">
              <label className="flex items-center gap-2 text-[10px] font-bold text-white/30 uppercase tracking-widest mb-2">
                <Banknote className="w-3 h-3" /> 预算 (CNY)
              </label>
              <div className="flex items-center gap-2">
                <span className="text-white/40 font-bold">≤</span>
                <input 
                  type="number" 
                  value={budget}
                  onChange={(e) => setBudget(Number(e.target.value))}
                  className="bg-transparent text-white font-bold w-full focus:outline-none"
                />
              </div>
            </div>

            <div className="relative" ref={datePickerRef}>
              <div 
                onClick={() => setIsDatePickerOpen(!isDatePickerOpen)}
                className={`bg-white/5 border rounded-2xl p-4 cursor-pointer transition-colors ${isDatePickerOpen ? 'border-orange-500' : 'border-white/10 hover:border-white/20'}`}
              >
                <label className="flex items-center gap-2 text-[10px] font-bold text-white/30 uppercase tracking-widest mb-2">
                  <Calendar className="w-3 h-3" /> 时间范围
                </label>
                <div className="text-white font-bold truncate">
                  {formatDateDisplay()}
                </div>
              </div>

              <AnimatePresence>
                {isDatePickerOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                    className="absolute top-full left-0 mt-2 z-50 bg-zinc-900 border border-white/10 rounded-3xl p-4 shadow-2xl"
                  >
                    <DayPicker
                      mode="range"
                      selected={dateRange}
                      onSelect={setDateRange}
                      locale={zhCN}
                      numberOfMonths={1}
                      disabled={{ before: new Date() }}
                      classNames={{
                        months: "flex flex-col sm:flex-row space-y-4 sm:space-x-4 sm:space-y-0",
                        month: "space-y-4",
                        caption: "flex justify-center pt-1 relative items-center",
                        caption_label: "text-sm font-bold text-white",
                        nav: "space-x-1 flex items-center",
                        nav_button: "h-7 w-7 bg-transparent p-0 opacity-50 hover:opacity-100 transition-opacity",
                        nav_button_previous: "absolute left-1",
                        nav_button_next: "absolute right-1",
                        table: "w-full border-collapse space-y-1",
                        head_row: "flex",
                        head_cell: "text-white/30 rounded-md w-9 font-bold text-[10px] uppercase tracking-widest",
                        row: "flex w-full mt-2",
                        cell: "h-9 w-9 text-center text-sm p-0 relative focus-within:relative focus-within:z-20",
                        day: "h-9 w-9 p-0 font-normal aria-selected:opacity-100 hover:bg-white/5 rounded-lg transition-colors",
                        day_range_start: "day-range-start",
                        day_range_end: "day-range-end",
                        day_selected: "bg-orange-500 text-white hover:bg-orange-600 focus:bg-orange-500",
                        day_today: "bg-white/5 text-orange-500 font-bold",
                        day_outside: "text-white/10 opacity-50",
                        day_disabled: "text-white/5 opacity-50",
                        day_range_middle: "aria-selected:bg-orange-500/10 aria-selected:text-orange-500",
                        day_hidden: "invisible",
                      }}
                    />
                    <div className="mt-4 pt-4 border-t border-white/5 flex justify-end">
                      <button 
                        onClick={() => setIsDatePickerOpen(false)}
                        className="text-[10px] font-bold text-orange-500 uppercase tracking-widest hover:underline"
                      >
                        完成选择
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <button 
              onClick={handleExplore}
              disabled={isSearching}
              className="bg-orange-500 hover:bg-orange-600 disabled:bg-orange-500/50 text-white rounded-2xl font-black flex items-center justify-center gap-2 transition-all group overflow-hidden relative"
            >
              <AnimatePresence mode="wait">
                {isSearching ? (
                  <motion.div
                    key="searching"
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: -20, opacity: 0 }}
                    className="flex items-center gap-2"
                  >
                    <Sparkles className="w-5 h-5 animate-pulse" />
                    探索中...
                  </motion.div>
                ) : (
                  <motion.div
                    key="idle"
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: -20, opacity: 0 }}
                    className="flex items-center gap-2"
                  >
                    <Search className="w-5 h-5 group-hover:scale-110 transition-transform" />
                    立即探索
                  </motion.div>
                )}
              </AnimatePresence>
            </button>
          </div>

          {/* Integrated Filter Tags */}
          <div className="flex flex-wrap items-center gap-8 mb-12 pb-8 border-b border-white/5">
            <div className="flex items-center gap-3">
              <span className="text-[10px] font-bold text-white/30 uppercase tracking-widest">类型</span>
              <div className="flex flex-wrap gap-2">
                {categories.map((cat) => (
                  <button 
                    key={cat} 
                    onClick={() => setSelectedCategory(cat)}
                    className={`px-4 py-1.5 rounded-full text-[10px] font-bold transition-all border ${
                      selectedCategory === cat 
                        ? 'bg-orange-500 text-white border-orange-500' 
                        : 'bg-white/5 text-white/40 hover:bg-white/10 border-white/5'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            <div className="h-4 w-[1px] bg-white/10 hidden md:block"></div>

            <div className="flex items-center gap-3">
              <span className="text-[10px] font-bold text-white/30 uppercase tracking-widest">地区</span>
              <div className="flex flex-wrap gap-2">
                {regions.map((reg) => (
                  <button 
                    key={reg} 
                    onClick={() => setSelectedRegion(reg)}
                    className={`px-4 py-1.5 rounded-full text-[10px] font-bold transition-all border ${
                      selectedRegion === reg 
                        ? 'bg-white/20 text-white border-white/30' 
                        : 'bg-white/5 text-white/40 hover:bg-white/10 border-white/5'
                    }`}
                  >
                    {reg}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Results Area */}
          <div className="min-h-[200px] relative">
            <AnimatePresence mode="wait">
              {isSearching ? (
                <motion.div 
                  key="loading"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="absolute inset-0 flex flex-col items-center justify-center text-center"
                >
                  <div className="relative w-20 h-20 mb-6">
                    <motion.div 
                      animate={{ rotate: 360 }}
                      transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                      className="absolute inset-0 border-4 border-orange-500/20 border-t-orange-500 rounded-full"
                    />
                    <Plane className="absolute inset-0 m-auto w-8 h-8 text-orange-500 animate-bounce" />
                  </div>
                  <p className="text-white/60 font-medium">AI 正在全网扫描符合条件的特价机票...</p>
                  <p className="text-white/20 text-xs mt-2">已扫描 124 个航司官网, 15 个 OTA 平台</p>
                </motion.div>
              ) : results.length > 0 ? (
                <motion.div 
                  key="results"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
                >
                  {results.map((deal, index) => (
                    <DealCard 
                      key={deal.id} 
                      deal={deal} 
                      index={index} 
                      onViewDetails={onViewDetails}
                    />
                  ))}
                </motion.div>
              ) : results.length === 0 && !isSearching ? (
                <motion.div 
                  key="empty"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex flex-col items-center justify-center py-12 text-center"
                >
                  <div className="bg-white/5 p-6 rounded-full mb-4">
                    <Compass className="w-12 h-12 text-white/10" />
                  </div>
                  <p className="text-white/40 font-medium">输入条件并点击探索，开启你的未知旅程</p>
                </motion.div>
              ) : null}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
