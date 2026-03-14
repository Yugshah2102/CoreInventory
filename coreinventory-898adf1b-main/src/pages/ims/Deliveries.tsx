import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, X } from 'lucide-react';
import toast from 'react-hot-toast';
import confetti from 'canvas-confetti';
import GlassCard from '@/components/ims/GlassCard';
import StatusBadge from '@/components/ims/StatusBadge';
import { deliveries, customers, products, getStageInfo } from '@/data/mockData';
import { Input } from '@/components/ui/input';

export default function Deliveries() {
  const [showCreate, setShowCreate] = useState(false);
  const [lines, setLines] = useState([{ productId: '', qty: '', price: '' }]);

  const handleShip = () => {
    confetti({ particleCount: 100, spread: 70, origin: { y: 0.6 } });
    toast.success('🚚 Order shipped! –10 Chairs delivered');
    setShowCreate(false);
  };

  const stages = ['picking', 'packing', 'shipped', 'delivered'] as const;

  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="font-heading text-2xl font-bold text-white animate-glitch">📤 Deliveries</h1>
        <motion.button whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }} onClick={() => setShowCreate(true)} className="gradient-btn text-black font-semibold px-4 py-2 rounded-lg text-sm flex items-center gap-2">
          <Plus className="w-4 h-4" /> New Delivery
        </motion.button>
      </div>

      <GlassCard hover={false}>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-white/5 text-muted-foreground text-xs uppercase tracking-wider">
                <th className="text-left py-3 px-3">Delivery #</th>
                <th className="text-left py-3 px-3">Customer</th>
                <th className="text-left py-3 px-3">Date</th>
                <th className="text-left py-3 px-3">Items</th>
                <th className="text-left py-3 px-3">Total ₹</th>
                <th className="text-left py-3 px-3">Stage</th>
                <th className="text-left py-3 px-3">Status</th>
                <th className="text-left py-3 px-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {deliveries.map(d => {
                const stage = getStageInfo(d.stage);
                return (
                  <tr key={d.id} className="border-b border-white/5 hover:bg-neon-cyan/5 transition-colors">
                    <td className="py-3 px-3 font-mono text-neon-cyan text-xs">{d.deliveryNumber}</td>
                    <td className="py-3 px-3 text-white">{d.customer}</td>
                    <td className="py-3 px-3 text-muted-foreground">{d.date}</td>
                    <td className="py-3 px-3 text-white">{d.items}</td>
                    <td className="py-3 px-3 text-white">₹{d.total.toLocaleString()}</td>
                    <td className="py-3 px-3">
                      <span className={`text-xs font-medium ${stage.color}`}>{stage.emoji} {stage.label}</span>
                    </td>
                    <td className="py-3 px-3"><StatusBadge status={d.status} /></td>
                    <td className="py-3 px-3"><button className="text-neon-cyan text-xs hover:underline">View 👁️</button></td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </GlassCard>

      {/* Stage progress visualization */}
      <GlassCard hover={false}>
        <h3 className="font-heading text-sm font-semibold text-white mb-4">🚚 Delivery Pipeline</h3>
        <div className="flex items-center justify-between">
          {stages.map((s, i) => {
            const info = getStageInfo(s);
            const count = deliveries.filter(d => d.stage === s).length;
            return (
              <div key={s} className="flex items-center">
                <div className="text-center">
                  <div className={`w-12 h-12 rounded-xl glass flex items-center justify-center text-xl mb-1 ${count > 0 ? 'neon-glow' : ''}`}>
                    {info.emoji}
                  </div>
                  <p className="text-xs text-muted-foreground">{info.label}</p>
                  <p className={`text-lg font-heading font-bold ${info.color}`}>{count}</p>
                </div>
                {i < stages.length - 1 && <div className="w-12 h-px bg-white/10 mx-2" />}
              </div>
            );
          })}
        </div>
      </GlassCard>

      <AnimatePresence>
        {showCreate && (
          <>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 bg-black/60 z-40" onClick={() => setShowCreate(false)} />
            <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }} className="fixed inset-4 md:inset-10 bg-[#0d0d0d] border border-white/10 rounded-2xl z-50 overflow-y-auto">
              <div className="p-6 space-y-6">
                <div className="flex items-center justify-between">
                  <h2 className="font-heading text-lg font-bold text-white">📤 New Delivery</h2>
                  <button onClick={() => setShowCreate(false)} className="p-2 hover:bg-white/10 rounded-lg"><X className="w-5 h-5 text-muted-foreground" /></button>
                </div>
                <div className="space-y-4 max-w-lg">
                  <div>
                    <label className="text-xs text-muted-foreground uppercase tracking-wider mb-1 block">Customer *</label>
                    <select className="w-full bg-white/5 border border-white/10 rounded-md px-3 py-2 text-sm text-white outline-none">
                      <option value="">Select customer</option>
                      {customers.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
                    </select>
                  </div>
                  <div>
                    <label className="text-xs text-muted-foreground uppercase tracking-wider mb-1 block">Delivery Date</label>
                    <Input type="date" className="bg-white/5 border-white/10 focus:border-neon-cyan/50" />
                  </div>
                </div>
                <div className="space-y-3">
                  <h3 className="text-sm font-semibold text-white">Order Items</h3>
                  {lines.map((_, i) => (
                    <div key={i} className="flex gap-2 items-center">
                      <select className="flex-1 bg-white/5 border border-white/10 rounded px-2 py-1.5 text-sm text-white outline-none">
                        <option value="">Product...</option>
                        {products.map(p => <option key={p.id} value={p.id}>{p.emoji} {p.name} (Stock: {p.totalStock})</option>)}
                      </select>
                      <Input type="number" placeholder="Qty" className="w-24 bg-white/5 border-white/10 h-8 text-sm" />
                      <button onClick={() => setLines(lines.filter((_, idx) => idx !== i))} className="text-neon-red text-xs">🗑️</button>
                    </div>
                  ))}
                  <button onClick={() => setLines([...lines, { productId: '', qty: '', price: '' }])} className="text-neon-cyan text-xs border border-dashed border-neon-cyan/30 rounded-lg px-4 py-2 w-full hover:bg-neon-cyan/5">+ Add Line</button>
                </div>
                <div className="flex gap-3">
                  <button className="border border-white/10 text-muted-foreground px-4 py-2 rounded-lg text-sm">🔍 Mark Picked</button>
                  <button className="border border-neon-cyan/30 text-neon-cyan px-4 py-2 rounded-lg text-sm">📦 Mark Packed</button>
                  <motion.button whileTap={{ scale: 0.97 }} onClick={handleShip} className="gradient-btn text-black font-semibold px-4 py-2 rounded-lg text-sm">🚚 Validate & Ship</motion.button>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
