import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, X } from 'lucide-react';
import toast from 'react-hot-toast';
import confetti from 'canvas-confetti';
import GlassCard from '@/components/ims/GlassCard';
import StatusBadge from '@/components/ims/StatusBadge';
import { transfers, warehouses, products } from '@/data/mockData';
import { Input } from '@/components/ui/input';

export default function Transfers() {
  const [showCreate, setShowCreate] = useState(false);

  const handleValidate = () => {
    confetti({ particleCount: 80, spread: 60, origin: { y: 0.6 } });
    toast.success('✈️ Transfer complete! 20 LED Panels → Rack B');
    setShowCreate(false);
  };

  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="font-heading text-2xl font-bold text-white animate-glitch">🔄 Internal Transfers</h1>
        <motion.button whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }} onClick={() => setShowCreate(true)} className="gradient-btn text-black font-semibold px-4 py-2 rounded-lg text-sm flex items-center gap-2">
          <Plus className="w-4 h-4" /> New Transfer
        </motion.button>
      </div>

      <GlassCard hover={false}>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-white/5 text-muted-foreground text-xs uppercase tracking-wider">
                <th className="text-left py-3 px-3">Transfer #</th>
                <th className="text-left py-3 px-3">From</th>
                <th className="text-left py-3 px-3">To</th>
                <th className="text-left py-3 px-3">Date</th>
                <th className="text-left py-3 px-3">Items</th>
                <th className="text-left py-3 px-3">Status</th>
                <th className="text-left py-3 px-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {transfers.map(t => (
                <tr key={t.id} className="border-b border-white/5 hover:bg-neon-cyan/5 transition-colors">
                  <td className="py-3 px-3 font-mono text-neon-cyan text-xs">{t.transferNumber}</td>
                  <td className="py-3 px-3 text-white">{t.from}</td>
                  <td className="py-3 px-3 text-white">{t.to}</td>
                  <td className="py-3 px-3 text-muted-foreground">{t.date}</td>
                  <td className="py-3 px-3 text-white">{t.items}</td>
                  <td className="py-3 px-3"><StatusBadge status={t.status} /></td>
                  <td className="py-3 px-3"><button className="text-neon-cyan text-xs hover:underline">View 👁️</button></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </GlassCard>

      <AnimatePresence>
        {showCreate && (
          <>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 bg-black/60 z-40" onClick={() => setShowCreate(false)} />
            <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }} className="fixed inset-4 md:inset-10 lg:inset-20 bg-[#0d0d0d] border border-white/10 rounded-2xl z-50 overflow-y-auto">
              <div className="p-6 space-y-6">
                <div className="flex items-center justify-between">
                  <h2 className="font-heading text-lg font-bold text-white">🔄 New Transfer</h2>
                  <button onClick={() => setShowCreate(false)} className="p-2 hover:bg-white/10 rounded-lg"><X className="w-5 h-5 text-muted-foreground" /></button>
                </div>
                <div className="grid grid-cols-2 gap-4 max-w-lg">
                  <div>
                    <label className="text-xs text-muted-foreground uppercase tracking-wider mb-1 block">From Location *</label>
                    <select className="w-full bg-white/5 border border-white/10 rounded-md px-3 py-2 text-sm text-white outline-none">
                      <option value="">Select...</option>
                      {warehouses.map(w => <option key={w.id} value={w.id}>{w.name}</option>)}
                    </select>
                  </div>
                  <div>
                    <label className="text-xs text-muted-foreground uppercase tracking-wider mb-1 block">To Location *</label>
                    <select className="w-full bg-white/5 border border-white/10 rounded-md px-3 py-2 text-sm text-white outline-none">
                      <option value="">Select...</option>
                      {warehouses.map(w => <option key={w.id} value={w.id}>{w.name}</option>)}
                    </select>
                  </div>
                </div>
                <div>
                  <label className="text-xs text-muted-foreground uppercase tracking-wider mb-1 block">Scheduled Date</label>
                  <Input type="date" className="bg-white/5 border-white/10 focus:border-neon-cyan/50 max-w-xs" />
                </div>
                <div className="space-y-2">
                  <h3 className="text-sm font-semibold text-white">Products</h3>
                  <div className="flex gap-2 items-center">
                    <select className="flex-1 bg-white/5 border border-white/10 rounded px-2 py-1.5 text-sm text-white outline-none">
                      <option value="">Select product...</option>
                      {products.map(p => <option key={p.id} value={p.id}>{p.emoji} {p.name}</option>)}
                    </select>
                    <Input type="number" placeholder="Qty" className="w-24 bg-white/5 border-white/10 h-8 text-sm" />
                  </div>
                  <button className="text-neon-cyan text-xs border border-dashed border-neon-cyan/30 rounded-lg px-4 py-2 w-full hover:bg-neon-cyan/5">+ Add Product</button>
                </div>
                <div className="flex gap-3">
                  <button className="border border-white/10 text-muted-foreground px-4 py-2 rounded-lg text-sm">Save Draft</button>
                  <button className="border border-neon-yellow/30 text-neon-yellow px-4 py-2 rounded-lg text-sm">Confirm</button>
                  <motion.button whileTap={{ scale: 0.97 }} onClick={handleValidate} className="gradient-btn text-black font-semibold px-4 py-2 rounded-lg text-sm">✅ Validate Transfer</motion.button>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
