import { motion } from 'framer-motion';
import CountUp from 'react-countup';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import GlassCard from '@/components/ims/GlassCard';
import StatusBadge from '@/components/ims/StatusBadge';
import { products, recentActivity } from '@/data/mockData';
import { useNavigate } from 'react-router-dom';

const kpis = [
  { emoji: '🛍️', label: 'Total Products', value: 1247, color: 'text-neon-cyan' },
  { emoji: '💰', label: 'Revenue Today', value: 240000, prefix: '₹', color: 'text-neon-green' },
  { emoji: '📦', label: 'Orders Pending', value: 12, color: 'text-neon-yellow' },
  { emoji: '⚠️', label: 'Low Stock Alerts', value: 23, color: 'text-neon-yellow' },
  { emoji: '➡️', label: 'Internal Transfers', value: 4, color: 'text-neon-purple' },
  { emoji: '🔧', label: 'Stock Adjustments', value: -3, suffix: ' kg', color: 'text-neon-blue' },
];

const barData = products.slice(0, 8).map(p => ({ name: p.name.split(' ')[0], stock: p.totalStock }));

const pieData = [
  { name: '⚙️ Metals', value: 45, color: '#00ffff' },
  { name: '🪑 Furniture', value: 32, color: '#8a2be2' },
  { name: '💡 Electronics', value: 28, color: '#0066ff' },
  { name: '📦 Raw Materials', value: 56, color: '#00ff88' },
  { name: '🔷 Others', value: 18, color: '#ffaa00' },
];

const opsTableRows = [
  { id: 'REC001', product: 'Steel Rods', sku: 'SR-001', type: '📥 Receipt', status: 'ready', qty: '+50', price: '₹500/kg', action: 'Validate 🎉' },
  { id: 'DEL005', product: 'Office Chairs', sku: 'CH-101', type: '📤 Delivery', status: 'done', qty: '-10', price: '₹2,500', action: 'View 👁️' },
  { id: 'TRF003', product: 'LED Panels', sku: 'LP-305', type: '🔄 Transfer', status: 'confirmed', qty: '20', price: '—', action: 'Process →' },
  { id: 'ADJ007', product: 'Steel Bolts', sku: 'SB-202', type: '🔧 Adjustment', status: 'draft', qty: '-3 kg', price: '—', action: 'Edit ✏️' },
];

export default function Dashboard() {
  const navigate = useNavigate();

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="space-y-6"
    >
      {/* Welcome */}
      <div>
        <h1 className="font-heading text-2xl font-bold text-white animate-glitch">
          Good morning, Rajesh! 👋
        </h1>
        <p className="text-muted-foreground text-sm mt-1">Your store is looking 🔥 today.</p>
        <div className="h-0.5 w-48 bg-gradient-to-r from-neon-cyan to-transparent mt-2" />
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {kpis.map((kpi, i) => (
          <motion.div
            key={kpi.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.08, duration: 0.3 }}
          >
            <GlassCard>
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-muted-foreground text-xs uppercase tracking-wider mb-1">{kpi.emoji} {kpi.label}</p>
                  <p className={`font-heading text-2xl font-bold ${kpi.color}`}>
                    {kpi.prefix}
                    <CountUp end={Math.abs(kpi.value)} duration={1.5} separator="," />
                    {kpi.suffix}
                    {kpi.value < 0 && <span className="text-sm ml-1">▼</span>}
                  </p>
                </div>
              </div>
            </GlassCard>
          </motion.div>
        ))}
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <GlassCard hover={false}>
          <h3 className="font-heading text-sm font-semibold text-white mb-4">📊 Top Products by Stock</h3>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={barData}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
              <XAxis dataKey="name" tick={{ fill: '#888', fontSize: 11, fontFamily: 'Orbitron' }} />
              <YAxis tick={{ fill: '#888', fontSize: 11 }} />
              <Tooltip
                contentStyle={{ background: 'rgba(15,15,15,0.95)', border: '1px solid rgba(0,255,255,0.2)', borderRadius: 8, color: '#fff' }}
              />
              <Bar dataKey="stock" fill="#00ffff" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </GlassCard>

        <GlassCard hover={false}>
          <h3 className="font-heading text-sm font-semibold text-white mb-4">🍩 Stock by Category</h3>
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie data={pieData} cx="50%" cy="50%" innerRadius={60} outerRadius={90} paddingAngle={3} dataKey="value">
                {pieData.map((entry) => (
                  <Cell key={entry.name} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip contentStyle={{ background: 'rgba(15,15,15,0.95)', border: '1px solid rgba(0,255,255,0.2)', borderRadius: 8, color: '#fff' }} />
            </PieChart>
          </ResponsiveContainer>
          <div className="flex flex-wrap gap-3 mt-2 justify-center">
            {pieData.map(d => (
              <span key={d.name} className="text-xs text-muted-foreground flex items-center gap-1">
                <span className="w-2 h-2 rounded-full" style={{ background: d.color }} /> {d.name}
              </span>
            ))}
          </div>
        </GlassCard>
      </div>

      {/* Activity + Quick Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Activity Feed */}
        <div className="lg:col-span-2">
          <GlassCard hover={false}>
            <div className="flex items-center gap-2 mb-4">
              <span className="w-2 h-2 rounded-full bg-neon-green animate-pulse" />
              <h3 className="font-heading text-sm font-semibold text-white">LIVE Activity</h3>
            </div>
            <div className="space-y-2 max-h-[300px] overflow-y-auto scrollbar-hide">
              {recentActivity.map((item, i) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.08, duration: 0.3 }}
                  className="flex items-center gap-3 py-2 px-3 rounded-lg hover:bg-white/5 transition-colors"
                >
                  <span className="text-lg">{item.badge}</span>
                  <span className="text-sm text-white flex-1">{item.text}</span>
                  <span className="text-xs text-muted-foreground">{item.time}</span>
                  <span className="w-6 h-6 rounded-full bg-white/10 flex items-center justify-center text-[10px] font-bold text-muted-foreground">{item.user}</span>
                </motion.div>
              ))}
            </div>
          </GlassCard>
        </div>

        {/* Quick Actions */}
        <GlassCard hover={false}>
          <h3 className="font-heading text-sm font-semibold text-white mb-4">⚡ Quick Actions</h3>
          <div className="space-y-2">
            <button onClick={() => navigate('/operations/receipts')} className="w-full gradient-btn text-black font-semibold py-2.5 rounded-lg text-sm transition-all hover:scale-[1.02] active:scale-95">🆕 New Receipt</button>
            <button onClick={() => navigate('/operations/deliveries')} className="w-full bg-neon-purple text-white font-semibold py-2.5 rounded-lg text-sm transition-all hover:scale-[1.02] active:scale-95">📤 New Delivery</button>
            <button onClick={() => navigate('/operations/transfers')} className="w-full border border-neon-blue/30 text-neon-blue font-semibold py-2.5 rounded-lg text-sm hover:bg-neon-blue/10 transition-all">🔄 Transfer Stock</button>
            <button onClick={() => navigate('/operations/adjustments')} className="w-full border border-white/10 text-muted-foreground font-semibold py-2.5 rounded-lg text-sm hover:bg-white/5 transition-all">🔍 Stock Count</button>
          </div>
          <div className="mt-4 pt-4 border-t border-white/5">
            <p className="text-xs text-muted-foreground mb-2">⚠️ Low Stock Alerts</p>
            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span className="text-white">LED Panels: 12 left 😟</span>
                <button className="text-neon-cyan text-xs hover:underline">Reorder →</button>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-white">Steel Bolts: 3 left 🔴</span>
                <button className="text-neon-cyan text-xs hover:underline">Reorder →</button>
              </div>
            </div>
          </div>
        </GlassCard>
      </div>

      {/* Operations Table */}
      <GlassCard hover={false}>
        <h3 className="font-heading text-sm font-semibold text-white mb-4">📋 Operations Summary</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-white/5 text-muted-foreground text-xs uppercase tracking-wider">
                <th className="text-left py-3 px-3">#</th>
                <th className="text-left py-3 px-3">Product</th>
                <th className="text-left py-3 px-3">SKU</th>
                <th className="text-left py-3 px-3">Type</th>
                <th className="text-left py-3 px-3">Status</th>
                <th className="text-left py-3 px-3">Qty Δ</th>
                <th className="text-left py-3 px-3">Price</th>
                <th className="text-left py-3 px-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {opsTableRows.map((row) => (
                <tr key={row.id} className="border-b border-white/5 hover:bg-neon-cyan/5 hover:border-l-2 hover:border-l-neon-cyan transition-all">
                  <td className="py-3 px-3 font-mono text-neon-cyan text-xs">{row.id}</td>
                  <td className="py-3 px-3 text-white">{row.product}</td>
                  <td className="py-3 px-3 font-mono text-xs text-muted-foreground">{row.sku}</td>
                  <td className="py-3 px-3">{row.type}</td>
                  <td className="py-3 px-3"><StatusBadge status={row.status} /></td>
                  <td className={`py-3 px-3 font-mono font-semibold ${row.qty.startsWith('+') ? 'text-neon-green' : row.qty.startsWith('-') ? 'text-neon-red' : 'text-white'}`}>{row.qty}</td>
                  <td className="py-3 px-3 text-muted-foreground">{row.price}</td>
                  <td className="py-3 px-3">
                    <button className="text-neon-cyan hover:underline text-xs">{row.action}</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </GlassCard>
    </motion.div>
  );
}
