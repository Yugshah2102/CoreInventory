import { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Search, Bell } from 'lucide-react';
import { Input } from '@/components/ui/input';

const breadcrumbMap: Record<string, string> = {
  '/dashboard': '🏠 Dashboard',
  '/products': '📦 Products',
  '/operations/receipts': '📋 Operations / Receipts',
  '/operations/deliveries': '📋 Operations / Deliveries',
  '/operations/transfers': '📋 Operations / Transfers',
  '/operations/adjustments': '📋 Operations / Adjustments',
  '/operations/history': '📋 Operations / History',
  '/warehouses': '🏭 Warehouses',
  '/profile': '👤 Profile',
};

export default function TopBar({ collapsed }: { collapsed: boolean }) {
  const location = useLocation();
  const [search, setSearch] = useState('');
  const breadcrumb = breadcrumbMap[location.pathname] || 'StockFlow';

  return (
    <header className="h-14 flex items-center gap-4 px-6 border-b border-white/5 bg-[#0a0a0a]/80 backdrop-blur-xl sticky top-0 z-10">
      {/* Breadcrumb */}
      <div className="text-sm text-muted-foreground font-medium min-w-[200px]">{breadcrumb}</div>

      {/* Search */}
      <div className="flex-1 max-w-md mx-auto relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
        <Input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search products, SKUs, orders... 🔍"
          className="pl-10 bg-white/5 border-white/10 focus:border-neon-cyan/50 focus:ring-neon-cyan/20 text-sm h-9"
        />
      </div>

      {/* Right */}
      <div className="flex items-center gap-3">
        <button className="relative p-2 rounded-lg hover:bg-white/5 transition-colors">
          <Bell className="w-5 h-5 text-muted-foreground" />
          <span className="absolute top-1 right-1 w-4 h-4 rounded-full bg-neon-red text-[10px] font-bold text-white flex items-center justify-center animate-neon-pulse">
            3
          </span>
        </button>
        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-neon-cyan to-neon-purple flex items-center justify-center text-xs font-bold text-black">
          RK
        </div>
      </div>
    </header>
  );
}
