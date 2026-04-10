import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Filters from './components/Filters';
import DealCard from './components/DealCard';
import AIChatPanel from './components/AIChatPanel';
import { MOCK_DEALS } from './data/mockDeals';
import { motion } from 'motion/react';
import { TrendingUp, ShieldCheck, Zap, Globe, Plane } from 'lucide-react';

export default function App() {
  return (
    <div className="min-h-screen bg-black text-white font-sans selection:bg-orange-500/30">
      <Navbar />
      
      <main>
        <Hero />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8 relative z-20">
          <Filters />
          
          {/* Deals Grid */}
          <section className="py-12">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h2 className="text-3xl font-bold tracking-tight">今日热门发现</h2>
                <p className="text-white/40 text-sm mt-1">基于 AI 评分和实时全网比价</p>
              </div>
              <div className="flex items-center gap-2 text-orange-500 font-bold text-sm cursor-pointer hover:underline">
                查看全部 <TrendingUp className="w-4 h-4" />
              </div>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {MOCK_DEALS.map((deal, index) => (
                <DealCard key={deal.id} deal={deal} index={index} />
              ))}
            </div>
          </section>

          {/* Features Section */}
          <section className="py-24 border-t border-white/5">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
              <div className="space-y-4">
                <div className="w-12 h-12 bg-orange-500/10 rounded-2xl flex items-center justify-center border border-orange-500/20">
                  <Zap className="w-6 h-6 text-orange-500" />
                </div>
                <h3 className="text-lg font-bold">实时监控</h3>
                <p className="text-sm text-white/40 leading-relaxed">全天候扫描各大 OTA 和航司官网，秒级更新特价信息。</p>
              </div>
              <div className="space-y-4">
                <div className="w-12 h-12 bg-blue-500/10 rounded-2xl flex items-center justify-center border border-blue-500/20">
                  <ShieldCheck className="w-6 h-6 text-blue-500" />
                </div>
                <h3 className="text-lg font-bold">真实性校验</h3>
                <p className="text-sm text-white/40 leading-relaxed">AI 自动过滤虚假广告和过期信息，确保看到的每一张票都可预订。</p>
              </div>
              <div className="space-y-4">
                <div className="w-12 h-12 bg-purple-500/10 rounded-2xl flex items-center justify-center border border-purple-500/20">
                  <Globe className="w-6 h-6 text-purple-500" />
                </div>
                <h3 className="text-lg font-bold">全球覆盖</h3>
                <p className="text-sm text-white/40 leading-relaxed">支持全球 500+ 航司和 2000+ 目的地，无论去哪都能省。</p>
              </div>
              <div className="space-y-4">
                <div className="w-12 h-12 bg-green-500/10 rounded-2xl flex items-center justify-center border border-green-500/20">
                  <TrendingUp className="w-6 h-6 text-green-500" />
                </div>
                <h3 className="text-lg font-bold">价格预测</h3>
                <p className="text-sm text-white/40 leading-relaxed">基于历史大数据，预测未来价格走势，告诉您现在该不该买。</p>
              </div>
            </div>
          </section>

          {/* CTA Section */}
          <section className="py-24">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="bg-gradient-to-r from-orange-600 to-orange-400 rounded-[3rem] p-12 text-center relative overflow-hidden"
            >
              <div className="absolute inset-0 opacity-10">
                <div className="absolute top-0 left-0 w-64 h-64 bg-white rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2"></div>
                <div className="absolute bottom-0 right-0 w-64 h-64 bg-black rounded-full blur-3xl translate-x-1/2 translate-y-1/2"></div>
              </div>
              <div className="relative z-10">
                <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">准备好开启下一段旅程了吗？</h2>
                <p className="text-white/80 mb-10 max-w-xl mx-auto">订阅我们的低价提醒，让特价机票主动来找你。加入 500,000+ 聪明的旅行者。</p>
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                  <input 
                    type="email" 
                    placeholder="输入您的邮箱" 
                    className="bg-white/20 border border-white/30 rounded-2xl px-6 py-4 w-full max-w-sm text-white placeholder:text-white/60 focus:outline-none focus:bg-white/30 transition-all"
                  />
                  <button className="bg-white text-orange-600 px-8 py-4 rounded-2xl font-bold hover:bg-zinc-100 transition-all w-full sm:w-auto">
                    免费订阅
                  </button>
                </div>
              </div>
            </motion.div>
          </section>
        </div>
      </main>

      <footer className="py-12 border-t border-white/5 bg-zinc-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-8">
            <div className="flex items-center gap-2">
              <div className="bg-orange-500 p-1 rounded-lg">
                <Plane className="w-5 h-5 text-white" />
              </div>
              <span className="text-lg font-bold tracking-tighter text-white">FlyCheap</span>
            </div>
            <div className="flex gap-8 text-sm text-white/40">
              <a href="#" className="hover:text-white transition-colors">关于我们</a>
              <a href="#" className="hover:text-white transition-colors">隐私政策</a>
              <a href="#" className="hover:text-white transition-colors">服务条款</a>
              <a href="#" className="hover:text-white transition-colors">联系我们</a>
            </div>
            <p className="text-xs text-white/20">© 2026 FlyCheap. All rights reserved.</p>
          </div>
        </div>
      </footer>

      <AIChatPanel />
    </div>
  );
}
