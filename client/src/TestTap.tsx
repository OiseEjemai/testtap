// src/TapButton.jsx
import { useState } from 'react';
import axios from 'axios';

const TapButton = () => {
  const [taps, setTaps] = useState(0);

  const handleTap = async () => {
    try {
      await axios.post(`${import.meta.env.VITE_API_URL}/tap`, {
        chatId: 'your-chat-id', // Replace with dynamic chatId if available
        username: 'your-username' // Replace with dynamic username if available
      });

      const response = await axios.get(`${import.meta.env.VITE_API_URL}/taps/your-chat-id`);
      setTaps(response.data.taps);
    } catch (error) {
      console.error('Error tapping:', error);
    }
  };

  return (
    <div>
      <button onClick={handleTap}>Tap the Coin!</button>
      <p>Total Taps: {taps}</p>
    </div>
  );
};

export default TapButton;
