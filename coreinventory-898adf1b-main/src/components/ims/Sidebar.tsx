import { NavLink, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  LayoutDashboard, Package, ClipboardList, Warehouse, User, LogOut,
  ChevronLeft, ChevronRight, PackageCheck, Truck, ArrowLeftRight, Wrench, History, ShoppingCart
} from 'lucide-react';

interface SidebarProps {
  collapsed: boolean;
  onToggle: () => void;
}

const navItems = [
  { to: '/dashboard', icon: LayoutDashboard, label: 'Dashboard', emoji: '🏠' },
  { to: '/products', icon: Package, label: 'Products', emoji: '📦' },
  {
    label: 'Operations', emoji: '📋', icon: ClipboardList,
    children: [
      { to: '/operations/receipts', icon: PackageCheck, label: 'Receipts' },
      { to: '/operations/deliveries', icon: Truck, label: 'Deliveries' },
      { to: '/operations/transfers', icon: ArrowLeftRight, label: 'Transfers' },
      { to: '/operations/adjustments', icon: Wrench, label: 'Adjustments' },
      { to: '/operations/history', icon: History, label: 'History' },
    ],
  },
  { to: '/warehouses', icon: Warehouse, label: 'Warehouses', emoji: '🏭' },
  { to: '/profile', icon: User, label: 'Profile', emoji: '👤' },
];

export default function Sidebar({ collapsed, onToggle }: SidebarProps) {
  const location = useLocation();
  const isOpsActive = location.pathname.startsWith('/operations');

  return (
    <motion.aside
      animate={{ width: collapsed ? 64 : 240 }}
      transition={{ duration: 0.25, ease: 'easeInOut' }}
      className="h-screen flex flex-col border-r border-white/5 bg-[#0d0d0d] relative z-20"
    >
      {/* Logo */}
      <div className="h-16 flex items-center px-4 border-b border-white/5">
        <ShoppingCart className="w-6 h-6 text-neon-cyan shrink-0" />
        <AnimatePresence>
          {!collapsed && (
            <motion.span
              initial={{ opacity: 0, width: 0 }}
              animate={{ opacity: 1, width: 'auto' }}
              exit={{ opacity: 0, width: 0 }}
              className="ml-3 font-heading text-lg font-bold text-white neon-text whitespace-nowrap overflow-hidden"
            >
              StockFlow
            </motion.span>
          )}
        </AnimatePresence>
      </div>

      {/* Nav */}
      <nav className="flex-1 py-4 overflow-y-auto scrollbar-hide">
        {navItems.map((item) => {
          if (item.children) {
            return (
              <div key={item.label} className="mb-1">
                <div className={`flex items-center px-4 py-2 text-sm ${isOpsActive ? 'text-neon-cyan' : 'text-muted-foreground'} ${collapsed ? 'justify-center' : ''}`}>
                  <item.icon className="w-5 h-5 shrink-0" />
                  {!collapsed && <span className="ml-3 font-medium">{item.label}</span>}
                </div>
                {!collapsed && (
                  <div className="ml-8 space-y-0.5">
                    {item.children.map((child) => (
                      <NavLink
                        key={child.to}
                        to={child.to}
                        className={({ isActive }) =>
                          `flex items-center px-4 py-2 text-sm rounded-r-lg transition-all duration-200 ${
                            isActive
                              ? 'text-neon-cyan bg-neon-cyan/5 border-l-2 border-neon-cyan shadow-[inset_0_0_20px_rgba(0,255,255,0.05)]'
                              : 'text-muted-foreground hover:text-white hover:bg-white/5 border-l-2 border-transparent'
                          }`
                        }
                      >
                        <child.icon className="w-4 h-4 shrink-0" />
                        <span className="ml-2">{child.label}</span>
                      </NavLink>
                    ))}
                  </div>
                )}
              </div>
            );
          }

          return (
            <NavLink
              key={item.to}
              to={item.to!}
              className={({ isActive }) =>
                `flex items-center px-4 py-2.5 text-sm transition-all duration-200 ${collapsed ? 'justify-center' : ''} ${
                  isActive
                    ? 'text-neon-cyan bg-neon-cyan/5 border-l-2 border-neon-cyan shadow-[inset_0_0_20px_rgba(0,255,255,0.05)]'
                    : 'text-muted-foreground hover:text-white hover:bg-white/5 border-l-2 border-transparent'
                }`
              }
            >
              <item.icon className="w-5 h-5 shrink-0" />
              {!collapsed && <span className="ml-3">{item.label}</span>}
            </NavLink>
          );
        })}
      </nav>

      {/* Bottom */}
      <div className="border-t border-white/5 p-3">
        <div className={`flex items-center ${collapsed ? 'justify-center' : 'gap-3'}`}>
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-neon-cyan to-neon-purple flex items-center justify-center text-xs font-bold text-black shrink-0">
            RK
          </div>
          {!collapsed && (
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-white truncate">Rajesh Kumar</p>
              <p className="text-xs text-muted-foreground truncate">Manager</p>
            </div>
          )}
          {!collapsed && (
            <NavLink to="/" className="text-muted-foreground hover:text-neon-red transition-colors">
              <LogOut className="w-4 h-4" />
            </NavLink>
          )}
        </div>
      </div>

      {/* Collapse Toggle */}
      <button
        onClick={onToggle}
        className="absolute -right-3 top-20 w-6 h-6 rounded-full bg-[#1a1a1a] border border-white/10 flex items-center justify-center text-muted-foreground hover:text-neon-cyan hover:border-neon-cyan/30 transition-all z-30"
      >
        {collapsed ? <ChevronRight className="w-3 h-3" /> : <ChevronLeft className="w-3 h-3" />}
      </button>
    </motion.aside>
  );
}
