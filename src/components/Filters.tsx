import { Filter, ChevronDown } from 'lucide-react';

export default function Filters() {
  const categories = ['全部', '秒杀', '最后时刻', '季节特惠', '神价'];
  const regions = ['全部', '亚洲', '欧洲', '美洲', '国内'];

  return (
    <div className="py-8 border-b border-white/5">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="flex flex-wrap items-center gap-3">
          <div className="flex items-center gap-2 bg-white/5 px-4 py-2 rounded-full border border-white/10 mr-4">
            <Filter className="w-4 h-4 text-orange-500" />
            <span className="text-sm font-bold text-white">筛选</span>
          </div>
          
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-white/30 uppercase tracking-widest mr-2">类型</span>
            {categories.map((cat, i) => (
              <button 
                key={cat} 
                className={`px-4 py-1.5 rounded-full text-xs font-medium transition-all ${
                  i === 0 ? 'bg-orange-500 text-white' : 'bg-white/5 text-white/60 hover:bg-white/10 border border-white/5'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="h-4 w-[1px] bg-white/10 mx-2 hidden md:block"></div>

          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-white/30 uppercase tracking-widest mr-2">地区</span>
            {regions.map((reg, i) => (
              <button 
                key={reg} 
                className={`px-4 py-1.5 rounded-full text-xs font-medium transition-all ${
                  i === 0 ? 'bg-white/10 text-white border border-white/20' : 'bg-white/5 text-white/60 hover:bg-white/10 border border-white/5'
                }`}
              >
                {reg}
              </button>
            ))}
          </div>
        </div>

        <div className="flex items-center gap-4">
          <button className="flex items-center gap-2 bg-white/5 px-4 py-2 rounded-xl border border-white/10 text-sm text-white/70 hover:text-white transition-all">
            价格排序
            <ChevronDown className="w-4 h-4" />
          </button>
          <button className="flex items-center gap-2 bg-white/5 px-4 py-2 rounded-xl border border-white/10 text-sm text-white/70 hover:text-white transition-all">
            推荐指数
            <ChevronDown className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
