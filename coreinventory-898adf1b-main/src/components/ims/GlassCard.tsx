import { ReactNode } from 'react';
import { motion } from 'framer-motion';

interface GlassCardProps {
  children: ReactNode;
  className?: string;
  hover?: boolean;
  onClick?: () => void;
}

export default function GlassCard({ children, className = '', hover = true, onClick }: GlassCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      whileHover={hover ? { scale: 1.01, boxShadow: '0 0 20px rgba(0,255,255,0.15)' } : undefined}
      onClick={onClick}
      className={`glass rounded-xl p-5 transition-all duration-300 ${hover ? 'cursor-pointer glass-hover' : ''} ${className}`}
    >
      {children}
    </motion.div>
  );
}
