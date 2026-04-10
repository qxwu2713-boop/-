import { motion } from 'motion/react';
import { Search, MapPin, Calendar } from 'lucide-react';

export default function Hero() {
  return (
    <div className="relative h-[70vh] min-h-[500px] flex items-center justify-center overflow-hidden bg-black">
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
          <h1 className="text-5xl md:text-7xl font-light tracking-tight text-white mb-6">
            发现 <span className="font-bold text-orange-500 italic">下一次</span> 飞行
          </h1>
          <p className="text-lg md:text-xl text-white/60 mb-12 max-w-2xl mx-auto font-light">
            聚合全球航司特价，AI 智能匹配您的旅行计划。不再错过任何一个“神价”。
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="bg-white/10 backdrop-blur-xl p-2 rounded-2xl border border-white/20 shadow-2xl"
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
            <div className="flex items-center gap-3 px-4 py-3 bg-white/5 rounded-xl border border-white/5">
              <MapPin className="w-5 h-5 text-orange-500" />
              <div className="text-left">
                <p className="text-[10px] uppercase tracking-wider text-white/40 font-bold">出发地</p>
                <input 
                  type="text" 
                  placeholder="上海 (PVG)" 
                  className="bg-transparent border-none p-0 text-white placeholder:text-white/20 focus:ring-0 w-full"
                />
              </div>
            </div>
            <div className="flex items-center gap-3 px-4 py-3 bg-white/5 rounded-xl border border-white/5">
              <MapPin className="w-5 h-5 text-orange-500" />
              <div className="text-left">
                <p className="text-[10px] uppercase tracking-wider text-white/40 font-bold">目的地</p>
                <input 
                  type="text" 
                  placeholder="你想去哪里？" 
                  className="bg-transparent border-none p-0 text-white placeholder:text-white/20 focus:ring-0 w-full"
                />
              </div>
            </div>
            <div className="flex items-center gap-2">
              <div className="flex-1 flex items-center gap-3 px-4 py-3 bg-white/5 rounded-xl border border-white/5">
                <Calendar className="w-5 h-5 text-orange-500" />
                <div className="text-left">
                  <p className="text-[10px] uppercase tracking-wider text-white/40 font-bold">出发日期</p>
                  <input 
                    type="text" 
                    placeholder="选择日期" 
                    className="bg-transparent border-none p-0 text-white placeholder:text-white/20 focus:ring-0 w-full"
                  />
                </div>
              </div>
              <button className="bg-orange-500 hover:bg-orange-600 text-white h-full px-8 rounded-xl font-bold transition-all shadow-lg shadow-orange-500/20">
                搜索
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
