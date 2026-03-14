import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ShoppingCart, Loader2 } from 'lucide-react';
import { products as carouselProducts, getStockDot } from '@/data/mockData';

const showcaseItems = carouselProducts.slice(0, 6);

export default function Login() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [typedText, setTypedText] = useState('');
  const fullText = 'Manage your inventory like a pro store 🛒✨';

  useEffect(() => {
    let i = 0;
    const interval = setInterval(() => {
      if (i <= fullText.length) {
        setTypedText(fullText.slice(0, i));
        i++;
      } else {
        clearInterval(interval);
      }
    }, 50);
    return () => clearInterval(interval);
  }, []);

  const handleLogin = () => {
    setLoading(true);
    setTimeout(() => navigate('/dashboard'), 1200);
  };

  return (
    <div className="relative min-h-screen bg-[#0a0a0a] flex flex-col items-center justify-center overflow-hidden">
      {/* Floating orbs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute w-[400px] h-[400px] rounded-full bg-neon-cyan/10 blur-[100px] animate-float" style={{ top: '10%', left: '15%', animationDelay: '0s' }} />
        <div className="absolute w-[350px] h-[350px] rounded-full bg-neon-purple/10 blur-[100px] animate-float" style={{ top: '50%', right: '10%', animationDelay: '2s' }} />
        <div className="absolute w-[300px] h-[300px] rounded-full bg-neon-blue/8 blur-[80px] animate-float" style={{ bottom: '5%', left: '30%', animationDelay: '4s' }} />
        <div className="absolute w-[250px] h-[250px] rounded-full bg-neon-cyan/5 blur-[80px] animate-float" style={{ top: '30%', right: '40%', animationDelay: '1s' }} />
        {/* Grid overlay */}
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: 'linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)',
            backgroundSize: '60px 60px',
          }}
        />
      </div>

      {/* Hero content */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative z-10 flex flex-col items-center text-center max-w-lg px-4"
      >
        {/* Logo */}
        <motion.div
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5, type: 'spring', bounce: 0.4 }}
          className="mb-6 flex items-center gap-3"
        >
          <div className="w-14 h-14 rounded-2xl bg-neon-cyan/10 border border-neon-cyan/30 flex items-center justify-center neon-glow">
            <ShoppingCart className="w-7 h-7 text-neon-cyan" />
          </div>
          <h1 className="font-heading text-4xl font-bold text-white neon-text">StockFlow</h1>
        </motion.div>

        {/* Typewriter tagline */}
        <div className="mb-2 h-8">
          <span className="text-lg text-white font-medium">
            {typedText}
            <span className="inline-block w-0.5 h-5 bg-neon-cyan ml-1 animate-pulse" />
          </span>
        </div>

        {/* Subtext */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2.5, duration: 0.5 }}
          className="text-muted-foreground text-sm mb-10"
        >
          Real-time stock. Smart operations. Zero chaos.
        </motion.p>

        {/* Google Sign-In Button */}
        <motion.button
          whileHover={{ scale: 1.03, boxShadow: '0 0 25px rgba(0,255,255,0.4)' }}
          whileTap={{ scale: 0.97 }}
          onClick={handleLogin}
          disabled={loading}
          className="flex items-center gap-3 bg-white text-gray-800 rounded-full px-8 py-4 min-w-[320px] justify-center font-medium text-base shadow-lg hover:shadow-neon-cyan/20 transition-all disabled:opacity-80"
        >
          {loading ? (
            <Loader2 className="w-5 h-5 animate-spin" />
          ) : (
            <svg className="w-5 h-5" viewBox="0 0 24 24">
              <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 01-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4"/>
              <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
              <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
              <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
            </svg>
          )}
          <span>{loading ? 'Signing in...' : 'Continue with Google'}</span>
        </motion.button>
      </motion.div>

      {/* Product Carousel */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8, duration: 0.5 }}
        className="relative z-10 mt-16 w-full overflow-hidden"
        style={{
          maskImage: 'linear-gradient(90deg, transparent 0%, black 15%, black 85%, transparent 100%)',
          WebkitMaskImage: 'linear-gradient(90deg, transparent 0%, black 15%, black 85%, transparent 100%)',
        }}
      >
        <div className="flex gap-4 animate-scroll-left w-max">
          {[...showcaseItems, ...showcaseItems].map((item, i) => (
            <div
              key={`${item.id}-${i}`}
              className="glass rounded-xl p-4 min-w-[200px] flex flex-col gap-2"
            >
              <div className="flex items-center justify-between">
                <span className="text-2xl">{item.emoji}</span>
                <span className="text-xs font-mono bg-neon-yellow/20 text-neon-yellow px-2 py-0.5 rounded-full">{item.priceLabel}</span>
              </div>
              <p className="text-sm font-medium text-white">{item.name}</p>
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono text-muted-foreground">{item.sku}</span>
                <span className="ml-auto text-xs">Stock: {item.totalStock} {getStockDot(item.status)}</span>
              </div>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Footer */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 0.5 }}
        className="relative z-10 mt-12 text-xs text-muted-foreground"
      >
        Trusted by 500+ warehouses across India 🇮🇳
      </motion.p>
    </div>
  );
}
