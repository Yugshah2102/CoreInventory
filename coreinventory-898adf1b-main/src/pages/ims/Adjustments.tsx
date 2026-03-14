import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, X } from 'lucide-react';
import toast from 'react-hot-toast';
import confetti from 'canvas-confetti';
import GlassCard from '@/components/ims/GlassCard';
import StatusBadge from '@/components/ims/StatusBadge';
import { adjustments, products, warehouses } from '@/data/mockData';
import { Input } from '@/components/ui/input';

export default function Adjustments() {
  const [showCreate, setShowCreate] = useState(false);
  const [lines, setLines] = useState([{ productId: '', systemQty: 248, countedQty: '' }]);

  const handleApply = () => {
    confetti({ particleCount: 80, spread: 60, origin: { y: 0.6 } });
    toast.success('📊 Adjustment applied! –3kg Steel corrected');
    setShowCreate(false);
  };

  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="font-heading text-2xl font-bold text-white animate-glitch">🔧 Adjustments</h1>
        <motion.button whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }} onClick={() => setShowCreate(true)} className="gradient-btn text-black font-semibold px-4 py-2 rounded-lg text-sm flex items-center gap-2">
          <Plus className="w-4 h-4" /> New Adjustment
        </motion.button>
      </div>

      <GlassCard hover={false}>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-white/5 text-muted-foreground text-xs uppercase tracking-wider">
                <th className="text-left py-3 px-3">Adjustment #</th>
                <th className="text-left py-3 px-3">Location</th>
                <th className="text-left py-3 px-3">Reason</th>
                <th className="text-left py-3 px-3">Date</th>
                <th className="text-left py-3 px-3">Items</th>
                <th className="text-left py-3 px-3">Status</th>
                <th className="text-left py-3 px-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {adjustments.map(a => (
                <tr key={a.id} className="border-b border-white/5 hover:bg-neon-cyan/5 transition-colors">
                  <td className="py-3 px-3 font-mono text-neon-cyan text-xs">{a.adjustmentNumber}</td>
                  <td className="py-3 px-3 text-white">{a.location}</td>
                  <td className="py-3 px-3 text-muted-foreground">{a.reason}</td>
                  <td className="py-3 px-3 text-muted-foreground">{a.date}</td>
                  <td className="py-3 px-3 text-white">{a.items}</td>
                  <td className="py-3 px-3"><StatusBadge status={a.status} /></td>
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
                  <h2 className="font-heading text-lg font-bold text-white">🔧 New Adjustment</h2>
                  <button onClick={() => setShowCreate(false)} className="p-2 hover:bg-white/10 rounded-lg"><X className="w-5 h-5 text-muted-foreground" /></button>
                </div>
                <div className="space-y-4 max-w-lg">
                  <div>
                    <label className="text-xs text-muted-foreground uppercase tracking-wider mb-1 block">Location *</label>
                    <select className="w-full bg-white/5 border border-white/10 rounded-md px-3 py-2 text-sm text-white outline-none">
                      <option value="">Select location</option>
                      {warehouses.flatMap(w => w.locations.map(l => <option key={l.id} value={l.id}>{w.name} - {l.name}</option>))}
                    </select>
                  </div>
                  <div>
                    <label className="text-xs text-muted-foreground uppercase tracking-wider mb-1 block">Reason *</label>
                    <select className="w-full bg-white/5 border border-white/10 rounded-md px-3 py-2 text-sm text-white outline-none">
                      <option value="">Select reason</option>
                      <option value="physical_count">Physical Count</option>
                      <option value="damage">Damage</option>
                      <option value="loss">Loss</option>
                      <option value="theft">Theft</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                </div>
                <div className="space-y-3">
                  <h3 className="text-sm font-semibold text-white">Product Lines</h3>
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-white/5 text-muted-foreground text-xs uppercase tracking-wider">
                        <th className="text-left py-2 px-2">Product</th>
                        <th className="text-left py-2 px-2">System Qty</th>
                        <th className="text-left py-2 px-2">Counted Qty</th>
                        <th className="text-left py-2 px-2">Difference</th>
                      </tr>
                    </thead>
                    <tbody>
                      {lines.map((line, i) => {
                        const diff = line.countedQty ? Number(line.countedQty) - line.systemQty : 0;
                        return (
                          <tr key={i} className="border-b border-white/5">
                            <td className="py-2 px-2">
                              <select className="w-full bg-white/5 border border-white/10 rounded px-2 py-1.5 text-sm text-white outline-none">
                                <option value="">Select...</option>
                                {products.map(p => <option key={p.id} value={p.id}>{p.emoji} {p.name}</option>)}
                              </select>
                            </td>
                            <td className="py-2 px-2 text-muted-foreground font-mono">{line.systemQty}</td>
                            <td className="py-2 px-2"><Input type="number" value={line.countedQty} onChange={e => { const n = [...lines]; n[i].countedQty = e.target.value; setLines(n); }} className="bg-white/5 border-white/10 h-8 text-sm" /></td>
                            <td className={`py-2 px-2 font-mono font-bold ${diff > 0 ? 'text-neon-green' : diff < 0 ? 'text-neon-red' : 'text-muted-foreground'}`}>{diff > 0 ? `+${diff}` : diff}</td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                  <button onClick={() => setLines([...lines, { productId: '', systemQty: 0, countedQty: '' }])} className="text-neon-cyan text-xs border border-dashed border-neon-cyan/30 rounded-lg px-4 py-2 w-full hover:bg-neon-cyan/5">+ Add Product</button>
                </div>
                <div>
                  <label className="text-xs text-muted-foreground uppercase tracking-wider mb-1 block">Notes</label>
                  <textarea className="w-full bg-white/5 border border-white/10 rounded-md px-3 py-2 text-sm text-white outline-none min-h-[60px] resize-none max-w-lg" placeholder="Adjustment notes..." />
                </div>
                <div className="flex gap-3">
                  <button className="border border-white/10 text-muted-foreground px-4 py-2 rounded-lg text-sm">Save Draft</button>
                  <motion.button whileTap={{ scale: 0.97 }} onClick={handleApply} className="gradient-btn text-black font-semibold px-4 py-2 rounded-lg text-sm">📊 Apply Adjustment</motion.button>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
