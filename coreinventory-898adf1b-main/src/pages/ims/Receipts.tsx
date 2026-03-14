import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, X } from 'lucide-react';
import toast from 'react-hot-toast';
import confetti from 'canvas-confetti';
import GlassCard from '@/components/ims/GlassCard';
import StatusBadge from '@/components/ims/StatusBadge';
import { receipts, suppliers, products } from '@/data/mockData';
import { Input } from '@/components/ui/input';

export default function Receipts() {
  const [showCreate, setShowCreate] = useState(false);
  const [step, setStep] = useState(1);
  const [lines, setLines] = useState([{ productId: '', expected: '', received: '', price: '' }]);

  const addLine = () => setLines([...lines, { productId: '', expected: '', received: '', price: '' }]);
  const removeLine = (i: number) => setLines(lines.filter((_, idx) => idx !== i));

  const handleValidate = () => {
    confetti({ particleCount: 100, spread: 70, origin: { y: 0.6 } });
    toast.success('🎉 Stock received! +50 Steel Rods added 🚀');
    setShowCreate(false);
    setStep(1);
    setLines([{ productId: '', expected: '', received: '', price: '' }]);
  };

  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="font-heading text-2xl font-bold text-white animate-glitch">📥 Receipts</h1>
        <motion.button whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }} onClick={() => setShowCreate(true)} className="gradient-btn text-black font-semibold px-4 py-2 rounded-lg text-sm flex items-center gap-2">
          <Plus className="w-4 h-4" /> New Receipt
        </motion.button>
      </div>

      <GlassCard hover={false}>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-white/5 text-muted-foreground text-xs uppercase tracking-wider">
                <th className="text-left py-3 px-3">Receipt #</th>
                <th className="text-left py-3 px-3">Supplier</th>
                <th className="text-left py-3 px-3">Date</th>
                <th className="text-left py-3 px-3">Items</th>
                <th className="text-left py-3 px-3">Total ₹</th>
                <th className="text-left py-3 px-3">Status</th>
                <th className="text-left py-3 px-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {receipts.map(r => (
                <tr key={r.id} className="border-b border-white/5 hover:bg-neon-cyan/5 transition-colors">
                  <td className="py-3 px-3 font-mono text-neon-cyan text-xs">{r.receiptNumber}</td>
                  <td className="py-3 px-3 text-white">{r.supplier}</td>
                  <td className="py-3 px-3 text-muted-foreground">{r.date}</td>
                  <td className="py-3 px-3 text-white">{r.items}</td>
                  <td className="py-3 px-3 text-white">₹{r.total.toLocaleString()}</td>
                  <td className="py-3 px-3"><StatusBadge status={r.status} /></td>
                  <td className="py-3 px-3"><button className="text-neon-cyan text-xs hover:underline">View 👁️</button></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </GlassCard>

      {receipts.length === 0 && (
        <div className="text-center py-20">
          <p className="text-4xl mb-4">📥</p>
          <p className="text-white font-heading text-lg">No receipts yet</p>
          <p className="text-muted-foreground text-sm mt-1">Create your first incoming stock receipt</p>
        </div>
      )}

      {/* Create Modal */}
      <AnimatePresence>
        {showCreate && (
          <>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 bg-black/60 z-40" onClick={() => setShowCreate(false)} />
            <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }} className="fixed inset-4 md:inset-10 bg-[#0d0d0d] border border-white/10 rounded-2xl z-50 overflow-y-auto">
              <div className="p-6 space-y-6">
                <div className="flex items-center justify-between">
                  <h2 className="font-heading text-lg font-bold text-white">🆕 New Receipt</h2>
                  <button onClick={() => setShowCreate(false)} className="p-2 hover:bg-white/10 rounded-lg"><X className="w-5 h-5 text-muted-foreground" /></button>
                </div>

                {/* Step Indicator */}
                <div className="flex items-center gap-2">
                  {[1,2,3].map(s => (
                    <div key={s} className={`flex items-center gap-2 ${s <= step ? 'text-neon-cyan' : 'text-muted-foreground'}`}>
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold border ${s <= step ? 'border-neon-cyan bg-neon-cyan/10' : 'border-white/10'}`}>{s}</div>
                      <span className="text-xs">{s === 1 ? 'Header' : s === 2 ? 'Products' : 'Review'}</span>
                      {s < 3 && <div className={`w-8 h-px ${s < step ? 'bg-neon-cyan' : 'bg-white/10'}`} />}
                    </div>
                  ))}
                </div>

                {step === 1 && (
                  <div className="space-y-4 max-w-lg">
                    <div>
                      <label className="text-xs text-muted-foreground uppercase tracking-wider mb-1 block">Receipt # (auto)</label>
                      <Input value="REC-0006" disabled className="bg-white/5 border-white/10 font-mono" />
                    </div>
                    <div>
                      <label className="text-xs text-muted-foreground uppercase tracking-wider mb-1 block">Supplier *</label>
                      <select className="w-full bg-white/5 border border-white/10 rounded-md px-3 py-2 text-sm text-white focus:border-neon-cyan/50 outline-none">
                        <option value="">Select supplier</option>
                        {suppliers.map(s => <option key={s.id} value={s.id}>{s.name}</option>)}
                      </select>
                    </div>
                    <div>
                      <label className="text-xs text-muted-foreground uppercase tracking-wider mb-1 block">Expected Date</label>
                      <Input type="date" className="bg-white/5 border-white/10 focus:border-neon-cyan/50" />
                    </div>
                    <button onClick={() => setStep(2)} className="gradient-btn text-black font-semibold px-6 py-2 rounded-lg text-sm">Next →</button>
                  </div>
                )}

                {step === 2 && (
                  <div className="space-y-4">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="border-b border-white/5 text-muted-foreground text-xs uppercase tracking-wider">
                          <th className="text-left py-2 px-2">Product</th>
                          <th className="text-left py-2 px-2">Expected Qty</th>
                          <th className="text-left py-2 px-2">Received Qty</th>
                          <th className="text-left py-2 px-2">Unit Price ₹</th>
                          <th className="py-2 px-2"></th>
                        </tr>
                      </thead>
                      <tbody>
                        {lines.map((line, i) => (
                          <tr key={i} className="border-b border-white/5">
                            <td className="py-2 px-2">
                              <select className="w-full bg-white/5 border border-white/10 rounded px-2 py-1.5 text-sm text-white outline-none">
                                <option value="">Select...</option>
                                {products.map(p => <option key={p.id} value={p.id}>{p.emoji} {p.name}</option>)}
                              </select>
                            </td>
                            <td className="py-2 px-2"><Input type="number" placeholder="0" className="bg-white/5 border-white/10 h-8 text-sm" /></td>
                            <td className="py-2 px-2"><Input type="number" placeholder="0" className="bg-white/5 border-white/10 h-8 text-sm" /></td>
                            <td className="py-2 px-2"><Input type="number" placeholder="0" className="bg-white/5 border-white/10 h-8 text-sm" /></td>
                            <td className="py-2 px-2"><button onClick={() => removeLine(i)} className="text-neon-red hover:underline text-xs">🗑️</button></td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                    <button onClick={addLine} className="text-neon-cyan text-xs hover:underline border border-dashed border-neon-cyan/30 rounded-lg px-4 py-2 w-full hover:bg-neon-cyan/5">+ Add Product Line</button>
                    <div className="flex gap-3">
                      <button onClick={() => setStep(1)} className="border border-white/10 text-muted-foreground px-6 py-2 rounded-lg text-sm hover:bg-white/5">← Back</button>
                      <button onClick={() => setStep(3)} className="gradient-btn text-black font-semibold px-6 py-2 rounded-lg text-sm">Next →</button>
                    </div>
                  </div>
                )}

                {step === 3 && (
                  <div className="space-y-4 max-w-lg">
                    <GlassCard hover={false}>
                      <h3 className="font-heading text-sm text-white mb-3">📋 Summary</h3>
                      <p className="text-sm text-muted-foreground">Receipt: <span className="text-white font-mono">REC-0006</span></p>
                      <p className="text-sm text-muted-foreground">Products: <span className="text-white">{lines.length} items</span></p>
                      <p className="text-sm text-muted-foreground">Status: <StatusBadge status="draft" /></p>
                    </GlassCard>
                    <div className="flex gap-3">
                      <button onClick={() => setStep(2)} className="border border-white/10 text-muted-foreground px-6 py-2 rounded-lg text-sm hover:bg-white/5">← Back</button>
                      <button className="border border-white/10 text-muted-foreground px-6 py-2 rounded-lg text-sm hover:bg-white/5">Save Draft</button>
                      <button className="border border-neon-yellow/30 text-neon-yellow px-6 py-2 rounded-lg text-sm hover:bg-neon-yellow/10">Confirm</button>
                      <motion.button whileTap={{ scale: 0.97 }} onClick={handleValidate} className="gradient-btn text-black font-semibold px-6 py-2 rounded-lg text-sm">✅ Validate</motion.button>
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
