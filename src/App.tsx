import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import TeaOrderForm from './components/TeaOrderForm';
import BrewingLoader from './components/BrewingLoader';
import TheSpill from './components/TheSpill';
import type { CosmicTeaData } from './types';
type AppPhase = 'INPUT' | 'BREWING' | 'SPILLING';

function App() {
  const [phase, setPhase] = useState<AppPhase>('INPUT');
  const [teaData, setTeaData] = useState<CosmicTeaData | null>(null);

  const handleSpillTea = async (formData: any) => {
    setPhase('BREWING');
    
    try {
      //const API_URL = "https://cosmicteabackend.onrender.com" || "http://localhost:8000";
      const response = await fetch(`https://cosmicteabackend.onrender.com/spill-tea`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
});
     

      if (!response.ok) throw new Error("Failed to fetch cosmic data");

      const data: CosmicTeaData = await response.json();
      
      // Add a slight artificial delay just so the user can enjoy the loading video
      setTimeout(() => {
        setTeaData(data);
        setPhase('SPILLING');
      }, 3000); 

    } catch (error) {
      console.error("Cosmic interference:", error);
      setPhase('INPUT'); // Reset on error
    }
  };

  return (
    <main style={{ width: '100vw', height: '100vh', position: 'relative' }}>
      <AnimatePresence mode="wait">
        
        {phase === 'INPUT' && (
          <motion.div
            key="input"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.8 }}
            style={{ width: '100%', height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}
          >
            {/* We will paste the TeaOrderForm code here next */}
            <TeaOrderForm onSubmit={handleSpillTea} />
          </motion.div>
        )}

        {phase === 'BREWING' && (
          <motion.div
            key="brewing"
            initial={{ opacity: 0, filter: "blur(10px)" }}
            animate={{ opacity: 1, filter: "blur(0px)" }}
            exit={{ opacity: 0, filter: "blur(10px)" }}
            transition={{ duration: 1 }}
            style={{ width: '100%', height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}
          >
            <BrewingLoader />
          </motion.div>
        )}

        {phase === 'SPILLING' && (
          <motion.div
            key="spilling"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2 }}
            style={{ width: '100%', height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}
          >
            <TheSpill data={teaData} onReset={() => setPhase('INPUT')} />
          </motion.div>
        )}

      </AnimatePresence>
    </main>
  );
}

export default App;