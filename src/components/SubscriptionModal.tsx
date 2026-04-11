import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Bell, MapPin, DollarSign, Zap } from 'lucide-react';

interface SubscriptionModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function SubscriptionModal({ isOpen, onClose }: SubscriptionModalProps) {
  const [step, setStep] = useState(1);

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/80 backdrop-blur-sm"
          />
          
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="relative w-full max-w-md bg-zinc-900 border border-white/10 rounded-[2.5rem] overflow-hidden shadow-2xl"
          >
            <div className="p-8">
              <div className="flex justify-between items-center mb-8">
                <div className="flex items-center gap-3">
                  <div className="bg-orange-500 p-2 rounded-xl">
                    <Bell className="w-5 h-5 text-white" />
                  </div>
                  <h2 className="text-xl font-bold text-white">智能监控订阅</h2>
                </div>
                <button onClick={onClose} className="p-2 text-white/40 hover:text-white transition-colors">
                  <X className="w-6 h-6" />
                </button>
              </div>

              <div className="space-y-6">
                <div>
                  <label className="block text-[10px] uppercase tracking-widest text-white/40 font-bold mb-2">航线设置</label>
                  <div className="grid grid-cols-2 gap-2">
                    <div className="bg-white/5 border border-white/10 rounded-2xl p-4 flex items-center gap-3">
                      <MapPin className="w-4 h-4 text-orange-500" />
                      <input type="text" placeholder="出发" className="bg-transparent border-none p-0 text-sm text-white placeholder:text-white/20 focus:ring-0 w-full" />
                    </div>
                    <div className="bg-white/5 border border-white/10 rounded-2xl p-4 flex items-center gap-3">
                      <MapPin className="w-4 h-4 text-orange-500" />
                      <input type="text" placeholder="到达" className="bg-transparent border-none p-0 text-sm text-white placeholder:text-white/20 focus:ring-0 w-full" />
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-[10px] uppercase tracking-widest text-white/40 font-bold mb-2">预算阈值 (CNY)</label>
                  <div className="bg-white/5 border border-white/10 rounded-2xl p-4 flex items-center gap-3">
                    <DollarSign className="w-4 h-4 text-orange-500" />
                    <input type="number" placeholder="低于此价格时提醒我" className="bg-transparent border-none p-0 text-sm text-white placeholder:text-white/20 focus:ring-0 w-full" />
                  </div>
                </div>

                <div className="bg-orange-500/10 border border-orange-500/20 rounded-2xl p-4 flex items-start gap-4">
                  <Zap className="w-5 h-5 text-orange-500 shrink-0 mt-1" />
                  <p className="text-xs text-orange-200/70 leading-relaxed">
                    我们的 AI 引擎将 24/7 监控全网数据。一旦发现符合条件的“神价”或“BUG价”，将通过 APP 和邮件第一时间通知您。
                  </p>
                </div>

                <button className="w-full bg-orange-500 hover:bg-orange-600 text-white py-4 rounded-2xl font-bold transition-all shadow-lg shadow-orange-500/20">
                  开启自动捕获
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
