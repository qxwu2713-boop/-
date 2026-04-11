import { Plane, Search, Bell, User, Menu } from 'lucide-react';

interface NavbarProps {
  onNavigate: (view: 'home' | 'promos' | 'calendar' | 'ai') => void;
  currentView: string;
}

export default function Navbar({ onNavigate, currentView }: NavbarProps) {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-black/50 backdrop-blur-md border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div 
            className="flex items-center gap-2 cursor-pointer group"
            onClick={() => onNavigate('home')}
          >
            <div className="bg-orange-500 p-1.5 rounded-lg group-hover:rotate-12 transition-transform">
              <Plane className="w-6 h-6 text-white" />
            </div>
            <span className="text-xl font-bold tracking-tighter text-white">FlyCheap</span>
          </div>
          
          <div className="hidden md:flex items-center gap-8">
            {[
              { id: 'home', label: '特价发现' },
              { id: 'promos', label: '航司活动' },
              { id: 'calendar', label: '低价日历' },
              { id: 'ai', label: 'AI 助手' }
            ].map((item) => (
              <button
                key={item.id}
                onClick={() => onNavigate(item.id as any)}
                className={`text-sm font-medium transition-colors relative py-2 ${
                  currentView === item.id ? 'text-orange-500' : 'text-white/70 hover:text-white'
                }`}
              >
                {item.label}
                {currentView === item.id && (
                  <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-orange-500 rounded-full"></div>
                )}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-4">
            <button className="p-2 text-white/70 hover:text-white transition-colors">
              <Search className="w-5 h-5" />
            </button>
            <button className="p-2 text-white/70 hover:text-white transition-colors relative">
              <Bell className="w-5 h-5" />
              <span className="absolute top-2 right-2 w-2 h-2 bg-orange-500 rounded-full border-2 border-black"></span>
            </button>
            <button className="hidden sm:flex items-center gap-2 bg-white/10 hover:bg-white/20 px-4 py-2 rounded-full border border-white/10 transition-all">
              <User className="w-4 h-4 text-white" />
              <span className="text-sm font-medium text-white">登录</span>
            </button>
            <button className="md:hidden p-2 text-white/70 hover:text-white transition-colors">
              <Menu className="w-6 h-6" />
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}
