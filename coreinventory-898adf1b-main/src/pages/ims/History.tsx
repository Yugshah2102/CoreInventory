import { useState } from 'react';
import { motion } from 'framer-motion';
import { Download } from 'lucide-react';
import GlassCard from '@/components/ims/GlassCard';
import { stockMovements, getMovementTypeBadge } from '@/data/mockData';
import { Input } from '@/components/ui/input';

export default function History() {
  const [search, setSearch] = useState('');
  const [typeFilter, setTypeFilter] = useState('');

  const filtered = stockMovements.filter(m =>
    (m.product.toLowerCase().includes(search.toLowerCase()) || m.sku.toLowerCase().includes(search.toLowerCase())) &&
    (!typeFilter || m.type === typeFilter)
  );

  const exportCSV = () => {
    const headers = 'Date,Type,Product,SKU,From,To,Qty,Reference,User,Notes\n';
    const rows = filtered.map(m => `${m.date},${m.type},${m.product},${m.sku},${m.from},${m.to},${m.qty},${m.reference},${m.user},${m.notes}`).join('\n');
    const blob = new Blob([headers + rows], { type: 'text/csv' });
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = 'stock-movements.csv';
    a.click();
  };

  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
      <div className="flex items-center justify-between flex-wrap gap-4">
        <h1 className="font-heading text-2xl font-bold text-white animate-glitch">📜 Move History</h1>
        <motion.button whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }} onClick={exportCSV} className="border border-neon-cyan/30 text-neon-cyan font-semibold px-4 py-2 rounded-lg text-sm flex items-center gap-2 hover:bg-neon-cyan/10">
          <Download className="w-4 h-4" /> Export CSV
        </motion.button>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-3">
        <Input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search product or SKU..." className="max-w-xs bg-white/5 border-white/10 focus:border-neon-cyan/50 h-9 text-sm" />
        <select value={typeFilter} onChange={e => setTypeFilter(e.target.value)} className="bg-white/5 border border-white/10 rounded-lg px-3 py-1.5 text-sm text-white focus:border-neon-cyan/50 outline-none">
          <option value="">All Types</option>
          <option value="receipt">📥 Receipt</option>
          <option value="delivery">📤 Delivery</option>
          <option value="transfer_in">🔄 Transfer In</option>
          <option value="transfer_out">🔄 Transfer Out</option>
          <option value="adjustment">🔧 Adjustment</option>
        </select>
      </div>

      <GlassCard hover={false}>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-white/5 text-muted-foreground text-xs uppercase tracking-wider">
                <th className="text-left py-3 px-3">Date & Time</th>
                <th className="text-left py-3 px-3">Type</th>
                <th className="text-left py-3 px-3">Product</th>
                <th className="text-left py-3 px-3">SKU</th>
                <th className="text-left py-3 px-3">From</th>
                <th className="text-left py-3 px-3">To</th>
                <th className="text-left py-3 px-3">Qty Δ</th>
                <th className="text-left py-3 px-3">Reference</th>
                <th className="text-left py-3 px-3">User</th>
                <th className="text-left py-3 px-3">Notes</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((m, i) => {
                const badge = getMovementTypeBadge(m.type);
                return (
                  <motion.tr
                    key={m.id}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.03 }}
                    className="border-b border-white/5 hover:bg-neon-cyan/5 transition-colors"
                  >
                    <td className="py-3 px-3 text-muted-foreground text-xs">{m.date}</td>
                    <td className="py-3 px-3"><span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium border ${badge.color}`}>{badge.label}</span></td>
                    <td className="py-3 px-3 text-white">{m.product}</td>
                    <td className="py-3 px-3 font-mono text-xs text-neon-cyan">{m.sku}</td>
                    <td className="py-3 px-3 text-muted-foreground text-xs">{m.from}</td>
                    <td className="py-3 px-3 text-muted-foreground text-xs">{m.to}</td>
                    <td className={`py-3 px-3 font-mono font-semibold ${m.qty.startsWith('+') ? 'text-neon-green' : m.qty.startsWith('-') ? 'text-neon-red' : 'text-white'}`}>{m.qty}</td>
                    <td className="py-3 px-3 font-mono text-xs text-muted-foreground">{m.reference}</td>
                    <td className="py-3 px-3 text-xs text-muted-foreground">{m.user}</td>
                    <td className="py-3 px-3 text-xs text-muted-foreground max-w-[150px] truncate">{m.notes}</td>
                  </motion.tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </GlassCard>
    </motion.div>
  );
}
