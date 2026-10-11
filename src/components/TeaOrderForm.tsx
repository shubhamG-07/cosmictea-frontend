import React, { useState } from 'react';
import { Sparkles } from 'lucide-react';
import styles from './TeaOrderForm.module.css';

interface TeaOrderFormProps {
  onSubmit: (data: any) => void;
}

export default function TeaOrderForm({ onSubmit }: TeaOrderFormProps) {
  const [formData, setFormData] = useState({
    name: '',
    dob: '',
    location: '',
    gender: 'Other'
  });

  const [timeData, setTimeData] = useState({
    hour: '12',
    minute: '00',
    ampm: 'PM'
  });

  const handleTextChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleTimeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setTimeData({ ...timeData, [e.target.name]: e.target.value });
  };

  // Allows only digits to be typed
  const handleMinuteChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, '');
    setTimeData({ ...timeData, minute: value });
  };

  // Formats the minute when the user clicks out of the input box
  const handleMinuteBlur = () => {
    let m = parseInt(timeData.minute || '0', 10);
    if (m > 59) m = 59; // Cap at 59 minutes
    setTimeData({ ...timeData, minute: m.toString().padStart(2, '0') });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const formattedTime = `${timeData.hour}:${timeData.minute} ${timeData.ampm}`;
    onSubmit({ ...formData, time: formattedTime });
  };

  return (
    <div className={styles.formContainer}>
      <h1 className={styles.title}>CosmicTea</h1>
      <p className={styles.subtitle}>Enter your coordinates to brew your destiny</p>
      
      <form onSubmit={handleSubmit}>
        <div className={styles.inputGroup}>
          <input type="text" name="name" placeholder="Your Name" required className={styles.inputField} onChange={handleTextChange} />
          <input type="date" name="dob" required className={styles.inputField} onChange={handleTextChange} />
          
          <div className={styles.timeGroup}>
            <select name="hour" className={styles.inputField} value={timeData.hour} onChange={handleTimeChange}>
              {Array.from({ length: 12 }, (_, i) => i + 1).map(h => (
                <option key={h} value={h.toString().padStart(2, '0')}>{h.toString().padStart(2, '0')}</option>
              ))}
            </select>
            
            {/* Replaced Select with a Custom Typed Input */}
            <input 
              type="text" 
              name="minute" 
              className={styles.inputField} 
              value={timeData.minute} 
              onChange={handleMinuteChange}
              onBlur={handleMinuteBlur}
              placeholder="MM"
              maxLength={2}
              required
            />

            <select name="ampm" className={styles.inputField} value={timeData.ampm} onChange={handleTimeChange}>
              <option value="AM">AM</option>
              <option value="PM">PM</option>
            </select>
          </div>

          <input type="text" name="location" placeholder="City of Birth" required className={styles.inputField} onChange={handleTextChange} />
          
          <select name="gender" className={styles.inputField} onChange={handleTextChange} defaultValue="Other">
            <option value="Female">Female</option>
            <option value="Male">Male</option>
            <option value="Non-Binary">Non-Binary</option>
            <option value="Other">Other</option>
          </select>
        </div>
        
        <button type="submit" className={styles.submitBtn}>
          <Sparkles size={20} />
          Brew My Cosmic Tea
        </button>
      </form>
    </div>
  );
}