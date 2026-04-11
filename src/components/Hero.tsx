import { useState } from 'react';
import { motion } from 'motion/react';
import { Search, MapPin, Calendar, Bell } from 'lucide-react';
import SubscriptionModal from './SubscriptionModal';

interface HeroProps {
  onSearch?: () => void;
}

export default function Hero({ onSearch }: HeroProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="relative h-[75vh] min-h-[600px] flex items-center justify-center overflow-hidden bg-black">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <img 
          src="https://picsum.photos/seed/flight-hero/1920/1080?blur=2" 
          alt="Hero background" 
          className="w-full h-full object-cover opacity-40"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-black"></div>
      </div>

      <div className="relative z-10 max-w-4xl w-full px-4 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md px-4 py-2 rounded-full border border-white/10 mb-8">
            <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
            <span className="text-[10px] font-bold uppercase tracking-widest text-white/80">实时全网监控中 · 发现 12 个新特价</span>
          </div>
          <h1 className="text-5xl md:text-7xl font-light tracking-tight text-white mb-6">
            发现 <span className="font-bold text-orange-500 italic">下一次</span> 飞行
          </h1>
          <p className="text-lg md:text-xl text-white/60 mb-12 max-w-2xl mx-auto font-light">
            聚合全网特价，直观展示复杂规则。AI 智能捕获低价，让“说走就走”不再昂贵。
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="bg-white/10 backdrop-blur-xl p-2 rounded-3xl border border-white/20 shadow-2xl"
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
            <div className="flex items-center gap-3 px-4 py-4 bg-white/5 rounded-2xl border border-white/5">
              <MapPin className="w-5 h-5 text-orange-500" />
              <div className="text-left">
                <p className="text-[10px] uppercase tracking-wider text-white/40 font-bold">出发地</p>
                <input 
                  type="text" 
                  placeholder="上海 (PVG)" 
                  className="bg-transparent border-none p-0 text-sm text-white placeholder:text-white/20 focus:ring-0 w-full"
                />
              </div>
            </div>
            <div className="flex items-center gap-3 px-4 py-4 bg-white/5 rounded-2xl border border-white/5">
              <MapPin className="w-5 h-5 text-orange-500" />
              <div className="text-left">
                <p className="text-[10px] uppercase tracking-wider text-white/40 font-bold">目的地</p>
                <input 
                  type="text" 
                  placeholder="你想去哪里？" 
                  className="bg-transparent border-none p-0 text-sm text-white placeholder:text-white/20 focus:ring-0 w-full"
                />
              </div>
            </div>
            <div className="flex items-center gap-2">
              <div className="flex-1 flex items-center gap-3 px-4 py-4 bg-white/5 rounded-2xl border border-white/5">
                <Calendar className="w-5 h-5 text-orange-500" />
                <div className="text-left">
                  <p className="text-[10px] uppercase tracking-wider text-white/40 font-bold">出发日期</p>
                  <input 
                    type="text" 
                    placeholder="选择日期" 
                    className="bg-transparent border-none p-0 text-sm text-white placeholder:text-white/20 focus:ring-0 w-full"
                  />
                </div>
              </div>
              <button 
                onClick={onSearch}
                className="bg-orange-500 hover:bg-orange-600 text-white h-full px-8 rounded-2xl font-bold transition-all shadow-lg shadow-orange-500/20"
              >
                搜索
              </button>
            </div>
          </div>
        </motion.div>

        <div className="mt-8 flex items-center justify-center gap-6">
          <button 
            onClick={() => setIsModalOpen(true)}
            className="flex items-center gap-2 text-sm font-bold text-white/60 hover:text-orange-500 transition-colors group"
          >
            <Bell className="w-4 h-4 group-hover:animate-bounce" />
            开启低价自动捕获
          </button>
          <div className="w-1 h-1 bg-white/20 rounded-full"></div>
          <button className="text-sm font-bold text-white/60 hover:text-white transition-colors">
            查看今日“神价”榜单
          </button>
        </div>
      </div>

      <SubscriptionModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  );
}
