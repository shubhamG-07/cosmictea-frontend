import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import styles from './BrewingLoader.module.css';

const sassyPhrases = [
  "Consulting the stars for your drama...",
  "Brewing your celestial tea...",
  "Reading your karmic receipts...",
  "Preparing to spill the astral gossip..."
];

export default function BrewingLoader() {
  const [phraseIndex, setPhraseIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setPhraseIndex((prev) => (prev + 1) % sassyPhrases.length);
    }, 2500); // Change phrase every 2.5 seconds
    return () => clearInterval(interval);
  }, []);

  return (
    <div className={styles.loaderContainer}>
      {/* Ensure the generated video is placed in your /public folder */}
      <video 
        autoPlay 
        loop 
        muted 
        playsInline 
        className={styles.backgroundVideo}
      >
        <source src="/cosmic-bg.mp4" type="video/mp4" />
      </video>

      <AnimatePresence mode="wait">
        <motion.h2
          key={phraseIndex}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.5 }}
          className={styles.loadingText}
        >
          {sassyPhrases[phraseIndex]}
        </motion.h2>
      </AnimatePresence>
    </div>
  );
}