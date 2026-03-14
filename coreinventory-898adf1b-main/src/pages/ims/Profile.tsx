import { motion } from 'framer-motion';
import { LogOut } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import GlassCard from '@/components/ims/GlassCard';

export default function Profile() {
  const navigate = useNavigate();

  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="max-w-2xl mx-auto space-y-6">
      <h1 className="font-heading text-2xl font-bold text-white animate-glitch">👤 Profile</h1>

      <GlassCard hover={false} className="flex items-center gap-6">
        <div className="w-20 h-20 rounded-full bg-gradient-to-br from-neon-cyan to-neon-purple flex items-center justify-center text-2xl font-bold text-black font-heading shrink-0">
          RK
        </div>
        <div>
          <h2 className="font-heading text-xl font-bold text-white">Rajesh Kumar</h2>
          <p className="text-muted-foreground text-sm">rajesh.kumar@stockflow.in</p>
          <span className="inline-flex items-center px-2.5 py-0.5 mt-2 rounded-full text-xs font-medium bg-neon-cyan/10 text-neon-cyan border border-neon-cyan/20">
            Inventory Manager
          </span>
        </div>
      </GlassCard>

      <div className="grid grid-cols-3 gap-4">
        <GlassCard>
          <p className="text-muted-foreground text-xs uppercase tracking-wider mb-1">📋 Operations</p>
          <p className="font-heading text-2xl font-bold text-neon-cyan">142</p>
          <p className="text-xs text-muted-foreground">performed</p>
        </GlassCard>
        <GlassCard>
          <p className="text-muted-foreground text-xs uppercase tracking-wider mb-1">📦 Products</p>
          <p className="font-heading text-2xl font-bold text-neon-purple">89</p>
          <p className="text-xs text-muted-foreground">managed</p>
        </GlassCard>
        <GlassCard>
          <p className="text-muted-foreground text-xs uppercase tracking-wider mb-1">🕐 Last Active</p>
          <p className="font-heading text-lg font-bold text-neon-green">Now</p>
          <p className="text-xs text-muted-foreground">online</p>
        </GlassCard>
      </div>

      <GlassCard hover={false}>
        <h3 className="font-heading text-sm font-semibold text-white mb-4">Edit Profile</h3>
        <div className="space-y-4 max-w-md">
          <div>
            <label className="text-xs text-muted-foreground uppercase tracking-wider mb-1 block">Display Name</label>
            <input defaultValue="Rajesh Kumar" className="w-full bg-white/5 border border-white/10 rounded-md px-3 py-2 text-sm text-white focus:border-neon-cyan/50 outline-none" />
          </div>
          <button className="gradient-btn text-black font-semibold px-6 py-2 rounded-lg text-sm">Save Changes</button>
        </div>
      </GlassCard>

      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        onClick={() => navigate('/')}
        className="w-full border border-neon-red/30 text-neon-red py-3 rounded-lg text-sm font-medium hover:bg-neon-red/10 transition-all flex items-center justify-center gap-2"
      >
        <LogOut className="w-4 h-4" /> Logout
      </motion.button>
    </motion.div>
  );
}
