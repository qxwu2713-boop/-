import { useState } from 'react';
import { motion } from 'motion/react';
import { Calendar as CalendarIcon, ChevronLeft, ChevronRight, Info } from 'lucide-react';
import { cn } from '../lib/utils';

export default function LowPriceCalendar() {
  const [currentMonth, setCurrentMonth] = useState('2026年5月');
  
  // Mock calendar data
  const days = Array.from({ length: 31 }, (_, i) => ({
    day: i + 1,
    price: Math.floor(Math.random() * 1000) + 800,
    isLowest: false
  }));
  
  // Set some specific lowest prices
  days[14].price = 599;
  days[14].isLowest = true;
  days[20].price = 620;
  days[20].isLowest = true;

  return (
    <div className="py-12">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
        <div className="flex items-center gap-3">
          <div className="bg-blue-500/20 p-2 rounded-xl">
            <CalendarIcon className="w-6 h-6 text-blue-500" />
          </div>
          <div>
            <h2 className="text-3xl font-bold tracking-tight text-white">低价日历</h2>
            <p className="text-white/40 text-sm mt-1">上海 (PVG) → 东京 (NRT) · 往返含税</p>
          </div>
        </div>

        <div className="flex items-center gap-4 bg-white/5 p-2 rounded-2xl border border-white/10">
          <button className="p-2 hover:bg-white/10 rounded-xl transition-colors"><ChevronLeft className="w-5 h-5" /></button>
          <span className="text-sm font-bold px-4">{currentMonth}</span>
          <button className="p-2 hover:bg-white/10 rounded-xl transition-colors"><ChevronRight className="w-5 h-5" /></button>
        </div>
      </div>

      <div className="bg-zinc-900/50 rounded-[2.5rem] border border-white/5 p-8">
        <div className="grid grid-cols-7 gap-4 mb-8">
          {['周日', '周一', '周二', '周三', '周四', '周五', '周六'].map(day => (
            <div key={day} className="text-center text-[10px] font-bold text-white/30 uppercase tracking-widest">{day}</div>
          ))}
          
          {/* Empty slots for calendar alignment */}
          <div className="h-24"></div>
          <div className="h-24"></div>
          <div className="h-24"></div>
          <div className="h-24"></div>
          <div className="h-24"></div>

          {days.map((d) => (
            <motion.div
              key={d.day}
              whileHover={{ scale: 1.05 }}
              className={cn(
                "h-24 rounded-2xl border flex flex-col items-center justify-center gap-1 cursor-pointer transition-all",
                d.isLowest 
                  ? "bg-orange-500 border-orange-400 shadow-lg shadow-orange-500/20" 
                  : "bg-white/5 border-white/5 hover:border-white/20"
              )}
            >
              <span className={cn("text-xs font-bold", d.isLowest ? "text-white" : "text-white/40")}>{d.day}</span>
              <span className={cn("text-sm font-black", d.isLowest ? "text-white" : "text-white/80")}>¥{d.price}</span>
            </motion.div>
          ))}
        </div>

        <div className="flex items-center gap-4 bg-blue-500/10 border border-blue-500/20 p-4 rounded-2xl">
          <Info className="w-5 h-5 text-blue-500 shrink-0" />
          <p className="text-xs text-blue-200/70 leading-relaxed">
            价格实时变动，以上价格仅供参考。点击具体日期可查看该日期的详细航班组合及退改签规则。
          </p>
        </div>
      </div>
    </div>
  );
}
