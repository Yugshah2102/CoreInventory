import { motion } from 'framer-motion';
import GlassCard from '@/components/ims/GlassCard';
import { warehouses } from '@/data/mockData';

export default function WarehousesPage() {
  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="font-heading text-2xl font-bold text-white animate-glitch">🏭 Warehouses</h1>
        <motion.button whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }} className="gradient-btn text-black font-semibold px-4 py-2 rounded-lg text-sm">+ New Warehouse</motion.button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {warehouses.map((w, i) => (
          <motion.div key={w.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}>
            <GlassCard className="space-y-4">
              <div>
                <h3 className="font-heading text-sm font-semibold text-white">{w.name}</h3>
                <p className="text-xs text-muted-foreground mt-1">{w.address}</p>
              </div>
              <div className="grid grid-cols-3 gap-2 text-center">
                <div>
                  <p className="text-lg font-heading font-bold text-neon-cyan">{w.locationCount}</p>
                  <p className="text-[10px] text-muted-foreground">Locations</p>
                </div>
                <div>
                  <p className="text-lg font-heading font-bold text-neon-purple">{w.totalSKUs}</p>
                  <p className="text-[10px] text-muted-foreground">SKUs</p>
                </div>
                <div>
                  <p className="text-lg font-heading font-bold text-neon-green">{w.utilization}%</p>
                  <p className="text-[10px] text-muted-foreground">Utilized</p>
                </div>
              </div>
              <div>
                <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-neon-cyan to-neon-purple rounded-full transition-all" style={{ width: `${w.utilization}%` }} />
                </div>
              </div>
              <div className="text-xs text-muted-foreground">
                <span>Manager: <span className="text-white">{w.manager}</span></span>
              </div>

              {/* Locations */}
              <div className="space-y-1.5 pt-2 border-t border-white/5">
                <p className="text-xs text-muted-foreground uppercase tracking-wider">Locations</p>
                {w.locations.map(l => (
                  <div key={l.id} className="flex items-center justify-between py-1 px-2 rounded bg-white/5 text-xs">
                    <span className="text-white">{l.name}</span>
                    <span className="text-muted-foreground">{l.zone} · {l.products} products</span>
                  </div>
                ))}
              </div>

              <div className="flex gap-2">
                <button className="text-xs text-neon-cyan hover:underline">View Details</button>
                <button className="text-xs text-neon-purple hover:underline">Edit</button>
              </div>
            </GlassCard>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
