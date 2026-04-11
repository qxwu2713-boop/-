import { useState, useRef, useEffect } from 'react';
import { motion } from 'motion/react';
import { Sparkles, Send, Bot, User, Zap, Brain, Map, History } from 'lucide-react';
import { getTravelAdvice } from '../services/gemini';
import { MOCK_DEALS } from '../data/mockDeals';
import { cn } from '../lib/utils';

export default function AIAssistantPage() {
  const [messages, setMessages] = useState<{ role: 'user' | 'ai', text: string }[]>([
    { role: 'ai', text: '你好！我是 FlyCheap 深度旅行助手。除了寻找特价机票，我还可以帮你规划行程、分析目的地物价，或者根据你的假期长度推荐最划算的飞行方案。你想聊聊什么？' }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = async (text?: string) => {
    const userMsg = text || input;
    if (!userMsg.trim() || isLoading) return;

    if (!text) setInput('');
    setMessages(prev => [...prev, { role: 'user', text: userMsg }]);
    setIsLoading(true);

    const advice = await getTravelAdvice(userMsg, MOCK_DEALS);
    
    setMessages(prev => [...prev, { role: 'ai', text: advice || '抱歉，我遇到了一点问题。' }]);
    setIsLoading(false);
  };

  const suggestions = [
    { icon: <Zap className="w-4 h-4" />, text: "分析本周最划算的 3 条航线" },
    { icon: <Map className="w-4 h-4" />, text: "5000元预算，两人往返欧洲建议" },
    { icon: <Brain className="w-4 h-4" />, text: "解释一下全日空闪促的退改规则" }
  ];

  return (
    <div className="py-12 max-w-5xl mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        {/* Left Sidebar: Context & Tools */}
        <div className="space-y-8">
          <div className="bg-zinc-900/50 p-8 rounded-[2.5rem] border border-white/5">
            <div className="flex items-center gap-3 mb-6">
              <div className="bg-orange-500/20 p-2 rounded-xl">
                <Sparkles className="w-6 h-6 text-orange-500" />
              </div>
              <h2 className="text-xl font-bold text-white">FlyCheap AI</h2>
            </div>
            <p className="text-sm text-white/40 leading-relaxed mb-8">
              基于 Gemini 3 Flash 模型，实时分析全网特价机票数据，为您提供最客观的决策支持。
            </p>
            
            <div className="space-y-4">
              <h4 className="text-[10px] font-bold text-white/30 uppercase tracking-widest">快速指令</h4>
              {suggestions.map((s, i) => (
                <button 
                  key={i}
                  onClick={() => handleSend(s.text)}
                  className="w-full flex items-center gap-3 p-4 bg-white/5 hover:bg-white/10 rounded-2xl border border-white/5 text-left text-sm text-white/70 transition-all group"
                >
                  <span className="text-orange-500 group-hover:scale-110 transition-transform">{s.icon}</span>
                  {s.text}
                </button>
              ))}
            </div>
          </div>

          <div className="bg-zinc-900/50 p-8 rounded-[2.5rem] border border-white/5">
            <div className="flex items-center gap-3 mb-4">
              <History className="w-5 h-5 text-white/40" />
              <h4 className="text-sm font-bold text-white/60">最近分析</h4>
            </div>
            <div className="space-y-3">
              <div className="text-xs text-white/30 p-3 bg-white/5 rounded-xl border border-white/5">上海-东京 樱花季分析</div>
              <div className="text-xs text-white/30 p-3 bg-white/5 rounded-xl border border-white/5">伦敦暑期预售评估</div>
            </div>
          </div>
        </div>

        {/* Main Chat Area */}
        <div className="lg:col-span-2 flex flex-col h-[700px] bg-zinc-900/50 rounded-[2.5rem] border border-white/5 overflow-hidden">
          <div ref={scrollRef} className="flex-1 overflow-y-auto p-8 space-y-6 scrollbar-hide">
            {messages.map((msg, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className={cn(
                  "flex gap-4",
                  msg.role === 'user' ? "flex-row-reverse" : "flex-row"
                )}
              >
                <div className={cn(
                  "w-10 h-10 rounded-2xl flex items-center justify-center shrink-0 shadow-lg",
                  msg.role === 'user' ? "bg-orange-500" : "bg-zinc-800 border border-white/10"
                )}>
                  {msg.role === 'user' ? <User className="w-5 h-5 text-white" /> : <Bot className="w-5 h-5 text-orange-500" />}
                </div>
                <div className={cn(
                  "max-w-[85%] p-5 rounded-3xl text-sm leading-relaxed shadow-sm",
                  msg.role === 'user' 
                    ? "bg-orange-500 text-white rounded-tr-none" 
                    : "bg-white/5 text-white/80 border border-white/5 rounded-tl-none"
                )}>
                  {msg.text}
                </div>
              </motion.div>
            ))}
            {isLoading && (
              <div className="flex gap-4">
                <div className="w-10 h-10 rounded-2xl bg-zinc-800 border border-white/10 flex items-center justify-center shrink-0">
                  <Bot className="w-5 h-5 text-orange-500" />
                </div>
                <div className="bg-white/5 p-5 rounded-3xl rounded-tl-none border border-white/5">
                  <div className="flex gap-1.5">
                    <span className="w-2 h-2 bg-orange-500 rounded-full animate-bounce"></span>
                    <span className="w-2 h-2 bg-orange-500 rounded-full animate-bounce [animation-delay:0.2s]"></span>
                    <span className="w-2 h-2 bg-orange-500 rounded-full animate-bounce [animation-delay:0.4s]"></span>
                  </div>
                </div>
              </div>
            )}
          </div>

          <div className="p-8 bg-zinc-950/50 border-t border-white/5">
            <div className="relative">
              <input 
                type="text" 
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                placeholder="输入您的旅行需求或问题..."
                className="w-full bg-white/5 border border-white/10 rounded-2xl py-5 pl-6 pr-16 text-sm text-white focus:outline-none focus:border-orange-500 transition-all placeholder:text-white/20"
              />
              <button 
                onClick={() => handleSend()}
                disabled={isLoading}
                className="absolute right-3 top-1/2 -translate-y-1/2 bg-orange-500 hover:bg-orange-600 text-white p-3 rounded-xl disabled:opacity-50 transition-all shadow-lg shadow-orange-500/20"
              >
                <Send className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
