import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Grid3X3, List, Plus, X, Zap } from 'lucide-react';
import toast from 'react-hot-toast';
import confetti from 'canvas-confetti';
import GlassCard from '@/components/ims/GlassCard';
import { products, getStockDot, categories } from '@/data/mockData';
import { Input } from '@/components/ui/input';

export default function Products() {
  const [view, setView] = useState<'grid' | 'table'>('grid');
  const [search, setSearch] = useState('');
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [filterCat, setFilterCat] = useState('');
  const [formData, setFormData] = useState({ name: '', sku: '', category: '', uom: 'pcs', price: '', stock: '', minStock: '', description: '' });
  const [autoSku, setAutoSku] = useState(true);

  const filtered = products.filter(p =>
    (p.name.toLowerCase().includes(search.toLowerCase()) || p.sku.toLowerCase().includes(search.toLowerCase())) &&
    (!filterCat || p.category === filterCat)
  );

  const handleSubmit = () => {
    if (!formData.name) { toast.error('Product name is required!'); return; }
    confetti({ particleCount: 80, spread: 60, origin: { y: 0.7 } });
    toast.success('✨ Product added to catalog!');
    setDrawerOpen(false);
    setFormData({ name: '', sku: '', category: '', uom: 'pcs', price: '', stock: '', minStock: '', description: '' });
  };

  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between flex-wrap gap-4">
        <h1 className="font-heading text-2xl font-bold text-white animate-glitch">📦 Products</h1>
        <div className="flex items-center gap-3">
          <div className="glass rounded-lg p-1 flex">
            <button onClick={() => setView('grid')} className={`p-2 rounded-md transition-all ${view === 'grid' ? 'bg-neon-cyan/20 text-neon-cyan' : 'text-muted-foreground hover:text-white'}`}><Grid3X3 className="w-4 h-4" /></button>
            <button onClick={() => setView('table')} className={`p-2 rounded-md transition-all ${view === 'table' ? 'bg-neon-cyan/20 text-neon-cyan' : 'text-muted-foreground hover:text-white'}`}><List className="w-4 h-4" /></button>
          </div>
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => setDrawerOpen(true)}
            className="gradient-btn text-black font-semibold px-4 py-2 rounded-lg text-sm flex items-center gap-2"
          >
            <Plus className="w-4 h-4" /> New Product
          </motion.button>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-3">
        <Input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search products or SKUs..." className="max-w-xs bg-white/5 border-white/10 focus:border-neon-cyan/50 h-9 text-sm" />
        <select value={filterCat} onChange={e => setFilterCat(e.target.value)} className="bg-white/5 border border-white/10 rounded-lg px-3 py-1.5 text-sm text-white focus:border-neon-cyan/50 outline-none">
          <option value="">All Categories</option>
          {categories.map(c => <option key={c.id} value={c.name}>{c.emoji} {c.name}</option>)}
        </select>
      </div>

      {/* Grid View */}
      {view === 'grid' ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {filtered.map((p, i) => (
            <motion.div key={p.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}>
              <GlassCard className="relative overflow-hidden group">
                <div className="absolute inset-0 holographic opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="relative z-10">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-3xl">{p.emoji}</span>
                    <span className="text-xs font-mono bg-neon-yellow/20 text-neon-yellow px-2 py-0.5 rounded-full">{p.priceLabel}</span>
                  </div>
                  <h3 className="font-heading text-sm font-semibold text-white mb-1">{p.name}</h3>
                  <span className="inline-block font-mono text-xs bg-neon-cyan/10 text-neon-cyan px-2 py-0.5 rounded border border-neon-cyan/20 mb-2">{p.sku}</span>
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-xs text-muted-foreground px-2 py-0.5 bg-white/5 rounded-full">{p.category}</span>
                    <span className="ml-auto text-xs">{getStockDot(p.status)}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-muted-foreground">Stock: {p.totalStock}</span>
                    <div className="flex-1 h-1.5 bg-white/10 rounded-full overflow-hidden">
                      <div
                        className="h-full rounded-full bg-neon-cyan transition-all"
                        style={{ width: `${Math.min((p.totalStock / (p.minStock * 5)) * 100, 100)}%` }}
                      />
                    </div>
                  </div>
                  <div className="flex gap-2 mt-3">
                    <button className="text-xs text-neon-cyan hover:underline">View 👁️</button>
                    <button className="text-xs text-neon-purple hover:underline">Edit ✏️</button>
                    <button className="text-xs text-neon-green hover:underline ml-auto">+ Add Stock</button>
                  </div>
                </div>
              </GlassCard>
            </motion.div>
          ))}
        </div>
      ) : (
        <GlassCard hover={false}>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-white/5 text-muted-foreground text-xs uppercase tracking-wider">
                  <th className="text-left py-3 px-3">Name</th>
                  <th className="text-left py-3 px-3">SKU</th>
                  <th className="text-left py-3 px-3">Category</th>
                  <th className="text-left py-3 px-3">UOM</th>
                  <th className="text-left py-3 px-3">Price ₹</th>
                  <th className="text-left py-3 px-3">Stock</th>
                  <th className="text-left py-3 px-3">Status</th>
                  <th className="text-left py-3 px-3">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map(p => (
                  <tr key={p.id} className="border-b border-white/5 hover:bg-neon-cyan/5 transition-colors">
                    <td className="py-3 px-3 text-white flex items-center gap-2"><span>{p.emoji}</span>{p.name}</td>
                    <td className="py-3 px-3 font-mono text-xs text-neon-cyan">{p.sku}</td>
                    <td className="py-3 px-3 text-muted-foreground">{p.category}</td>
                    <td className="py-3 px-3 text-muted-foreground">{p.uom}</td>
                    <td className="py-3 px-3 text-white">{p.priceLabel}</td>
                    <td className="py-3 px-3 text-white">{p.totalStock}</td>
                    <td className="py-3 px-3">{getStockDot(p.status)}</td>
                    <td className="py-3 px-3"><button className="text-neon-cyan text-xs hover:underline">Edit ✏️</button></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </GlassCard>
      )}

      {filtered.length === 0 && (
        <div className="text-center py-20">
          <p className="text-4xl mb-4">📦</p>
          <p className="text-white font-heading text-lg">No products found</p>
          <p className="text-muted-foreground text-sm mt-1">Try a different search or add a new product</p>
          <button onClick={() => setDrawerOpen(true)} className="gradient-btn text-black font-semibold px-6 py-2 rounded-lg text-sm mt-4">+ Add Product</button>
        </div>
      )}

      {/* Drawer */}
      <AnimatePresence>
        {drawerOpen && (
          <>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 bg-black/60 z-40" onClick={() => setDrawerOpen(false)} />
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed right-0 top-0 h-full w-full max-w-md bg-[#0d0d0d] border-l border-white/10 z-50 overflow-y-auto"
            >
              <div className="p-6 space-y-5">
                <div className="flex items-center justify-between">
                  <h2 className="font-heading text-lg font-bold text-white">🆕 New Product</h2>
                  <button onClick={() => setDrawerOpen(false)} className="p-2 hover:bg-white/10 rounded-lg"><X className="w-5 h-5 text-muted-foreground" /></button>
                </div>
                <div className="space-y-4">
                  <div>
                    <label className="text-xs text-muted-foreground uppercase tracking-wider mb-1 block">Product Name *</label>
                    <Input value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} className="bg-white/5 border-white/10 focus:border-neon-cyan/50" placeholder="e.g. Steel Rods" />
                  </div>
                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <label className="text-xs text-muted-foreground uppercase tracking-wider">SKU *</label>
                      <button onClick={() => setAutoSku(!autoSku)} className="flex items-center gap-1 text-xs text-neon-cyan"><Zap className="w-3 h-3" /> {autoSku ? 'Auto' : 'Manual'}</button>
                    </div>
                    <Input value={autoSku ? 'AUTO-GEN' : formData.sku} onChange={e => setFormData({...formData, sku: e.target.value})} disabled={autoSku} className="bg-white/5 border-white/10 focus:border-neon-cyan/50 font-mono" />
                  </div>
                  <div>
                    <label className="text-xs text-muted-foreground uppercase tracking-wider mb-1 block">Category *</label>
                    <select value={formData.category} onChange={e => setFormData({...formData, category: e.target.value})} className="w-full bg-white/5 border border-white/10 rounded-md px-3 py-2 text-sm text-white focus:border-neon-cyan/50 outline-none">
                      <option value="">Select category</option>
                      {categories.map(c => <option key={c.id} value={c.name}>{c.emoji} {c.name}</option>)}
                    </select>
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="text-xs text-muted-foreground uppercase tracking-wider mb-1 block">UOM *</label>
                      <select value={formData.uom} onChange={e => setFormData({...formData, uom: e.target.value})} className="w-full bg-white/5 border border-white/10 rounded-md px-3 py-2 text-sm text-white focus:border-neon-cyan/50 outline-none">
                        <option value="pcs">Pieces</option>
                        <option value="kg">Kilograms</option>
                        <option value="liters">Liters</option>
                        <option value="meters">Meters</option>
                        <option value="boxes">Boxes</option>
                      </select>
                    </div>
                    <div>
                      <label className="text-xs text-muted-foreground uppercase tracking-wider mb-1 block">Price ₹ *</label>
                      <Input value={formData.price} onChange={e => setFormData({...formData, price: e.target.value})} type="number" className="bg-white/5 border-white/10 focus:border-neon-cyan/50" placeholder="0" />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="text-xs text-muted-foreground uppercase tracking-wider mb-1 block">Initial Stock</label>
                      <Input value={formData.stock} onChange={e => setFormData({...formData, stock: e.target.value})} type="number" className="bg-white/5 border-white/10 focus:border-neon-cyan/50" placeholder="0" />
                    </div>
                    <div>
                      <label className="text-xs text-muted-foreground uppercase tracking-wider mb-1 block">Min Stock Level</label>
                      <Input value={formData.minStock} onChange={e => setFormData({...formData, minStock: e.target.value})} type="number" className="bg-white/5 border-white/10 focus:border-neon-cyan/50" placeholder="0" />
                    </div>
                  </div>
                  <div>
                    <label className="text-xs text-muted-foreground uppercase tracking-wider mb-1 block">Description</label>
                    <textarea value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})} className="w-full bg-white/5 border border-white/10 rounded-md px-3 py-2 text-sm text-white focus:border-neon-cyan/50 outline-none min-h-[80px] resize-none" placeholder="Product description..." />
                  </div>
                </div>
                <div className="flex gap-3 pt-2">
                  <button onClick={() => setDrawerOpen(false)} className="flex-1 border border-white/10 text-muted-foreground py-2.5 rounded-lg text-sm hover:bg-white/5">Cancel</button>
                  <motion.button whileTap={{ scale: 0.97 }} onClick={handleSubmit} className="flex-1 gradient-btn text-black font-semibold py-2.5 rounded-lg text-sm">Create Product ✨</motion.button>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
