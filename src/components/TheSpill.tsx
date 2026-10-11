import { motion } from 'framer-motion';
import { Sparkles, Briefcase, Heart, Flame } from 'lucide-react';
import styles from './TheSpill.module.css';
import type { CosmicTeaData } from '../types';

interface TheSpillProps {
  data: CosmicTeaData | null;
  onReset: () => void;
}

// Framer Motion variants for staggering the cards
const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.2 }
  }
};

const cardVariants = {
  hidden: { opacity: 0, x: 50 },
  show: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.5, type: 'spring' as const }
  }
};

export default function TheSpill({ data, onReset }: TheSpillProps) {
  if (!data) return null;

  return (
    <div className={styles.spillContainer}>
      <motion.h1 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className={styles.header}
      >
        The Tea is Served
      </motion.h1>

      <motion.div 
        className={styles.cardGrid}
        variants={containerVariants}
        initial="hidden"
        animate="show"
      >
        <motion.div className={styles.card} variants={cardVariants}>
          <h2 className={styles.cardTitle}><Sparkles size={24} /> Sun Sign</h2>
          <p className={styles.cardText}>{data.sun_sign}</p>
        </motion.div>

        <motion.div className={styles.card} variants={cardVariants}>
          <h2 className={styles.cardTitle}><Briefcase size={24} /> Career Tea</h2>
          <p className={styles.cardText}>{data.career_tea}</p>
        </motion.div>

        <motion.div className={styles.card} variants={cardVariants}>
          <h2 className={styles.cardTitle}><Heart size={24} /> Love Gossip</h2>
          <p className={styles.cardText}>{data.love_gossip}</p>
        </motion.div>

        <motion.div className={styles.card} variants={cardVariants}>
          <h2 className={styles.cardTitle}><Flame size={24} /> Karmic Roast</h2>
          <p className={styles.cardText}>{data.karmic_roast}</p>
        </motion.div>
      </motion.div>

      <motion.button 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        className={styles.resetBtn} 
        onClick={onReset}
      >
        Brew Another Cup
      </motion.button>
    </div>
  );
}