import React, {useState, useEffect} from 'react'

import Arrow from './icons/Arrow';
import { bear, coin, highVoltage, rocket, trophy, skeleton } from './images';
import { background, back2, back3 } from './images';
function Earn() {
    const levelNames = [
        "Bronze",    // From 0 to 4999 coins
        "Silver",    // From 5000 coins to 24,999 coins
        "Gold",      // From 25,000 coins to 99,999 coins
        "Platinum",  // From 100,000 coins to 999,999 coins
        "Diamond",   // From 1,000,000 coins to 2,000,000 coins
        "Epic",      // From 2,000,000 coins to 10,000,000 coins
        "Legendary", // From 10,000,000 coins to 50,000,000 coins
        "Master",    // From 50,000,000 coins to 100,000,000 coins
        "GrandMaster", // From 100,000,000 coins to 1,000,000,000 coins
        "Lord"       // From 1,000,000,000 coins to ∞
      ];
    
      const levelMinPoints = [
        0,        // Bronze
        5000,     // Silver
        25000,    // Gold
        100000,   // Platinum
        1000000,  // Diamond
        2000000,  // Epic
        10000000, // Legendary
        50000000, // Master
        100000000,// GrandMaster
        1000000000// Lord
      ];
    
      const [levelIndex, setLevelIndex] = useState(6);
      const [points, setPoints] = useState(() => {
        const savedPoints = localStorage.getItem('points');
        return savedPoints ? parseInt(savedPoints, 10) : 0;
      });
      const [energy, setEnergy] = useState(() => {
        const savedEnergy = localStorage.getItem('energy');
        return savedEnergy ? parseInt(savedEnergy, 10) : 0;
      });
      const [baseEnergy, setBaseEnergy] = useState(1000)
      const [clicks, setClicks] = useState<{ id: number, x: number, y: number }[]>([]);
      const pointsToAdd = 1;
      const energyToReduce = 1;
    
      const handleClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        if (energy - energyToReduce < 0) {
          return;
        }
        const card = e.currentTarget;
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left; // Relative x position
        const y = e.clientY - rect.top;   // Relative y position
    
        card.style.transform = `perspective(1000px) rotateX(${-y / 10}deg) rotateY(${x / 10}deg)`;
        setTimeout(() => {
          card.style.transform = '';
        }, 100);
    
        setPoints(prevPoints => {
          const newPoints = prevPoints + pointsToAdd;
          localStorage.setItem('points', newPoints.toString());
          return newPoints;
        });
    
        setEnergy(prevEnergy => {
          const newEnergy = Math.max(prevEnergy - energyToReduce, 0);
          localStorage.setItem('energy', newEnergy.toString());
          return newEnergy;
        });
    
        setClicks([...clicks, { id: Date.now(), x, y }]); // Store relative coordinates
      };
    
      const handleAnimationEnd = (id: number) => {
        setClicks((prevClicks) => prevClicks.filter(click => click.id !== id));
      };
    
      const calculateProgress = () => {
        if (levelIndex >= levelNames.length - 1) {
          return 100;
        }
        const currentLevelMin = levelMinPoints[levelIndex];
        const nextLevelMin = levelMinPoints[levelIndex + 1];
        const progress = ((points - currentLevelMin) / (nextLevelMin - currentLevelMin)) * 100;
        return Math.min(progress, 100);
      };
    
      // useEffect hook to restore energy over time
      useEffect(() => {
        const interval = setInterval(() => {
          setEnergy((prevEnergy) => {
            const newEnergy = Math.min(prevEnergy + 1, baseEnergy);
            localStorage.setItem('energy', newEnergy.toString());
            return newEnergy;
          });
        }, 2000); // Restore 10 energy points every second
    
        return () => clearInterval(interval); // Clear interval on component unmount
      }, []);
    
      useEffect(() => {
        const currentLevelMin = levelMinPoints[levelIndex];
        const nextLevelMin = levelMinPoints[levelIndex + 1];
        if (points >= nextLevelMin && levelIndex < levelNames.length - 1) {
          setLevelIndex(levelIndex + 1);
        } else if (points < currentLevelMin && levelIndex > 0) {
          setLevelIndex(levelIndex - 1);
        }
      }, [points, levelIndex, levelMinPoints, levelNames.length]);

      const handleQuest = () => {
        setPoints(prevPoints => {
          const newPoints = prevPoints + 10000000;
          localStorage.setItem('points', newPoints.toString());
          return newPoints;
        });
      }
    
  return (
    <div className="min-h-screen px-4 flex flex-col items-center text-white font-medium" style={{
        backgroundImage: `url(${back3})`, backgroundSize: 'cover', backgroundPosition: 'center', backgroundRepeat: 'no-repeat',
      }}>
  
        <div className="absolute inset-0 h-1/2 bg-gradient-overlay z-0"></div>
        <div className="absolute inset-0 flex items-center justify-center z-0">
          <div className="radial-gradient-overlay"></div>
        </div>
  
        <div className="w-full z-10 min-h-screen flex flex-col items-center text-white">
  
          <div className="top-0 left-0 w-full px-4 pt-8 z-10 flex flex-col items-center text-white">
            <div className="mt-12 text-5xl font-bold flex items-center">
              <img src={coin} width={44} height={44} />
              <span className="ml-2">{points.toLocaleString()}</span>
            </div>
            <div className="w-full cursor-pointer mt-40">
              <div className="bg-[#1f1f1f] text-center py-2 rounded-xl">
                <p className="text-lg h-20" onClick={handleQuest}>Follow Telegram page <Arrow size={18} className="ml-0 mb-1 inline-block"/></p>
              </div>
            </div>
            <div className="w-full cursor-pointer mt-10">
              <div className="bg-[#1f1f1f] text-center py-2 rounded-xl">
                <p className="text-lg h-20">Join squad <Arrow size={18} className="ml-0 mb-1 inline-block"/></p>
              </div>
            </div>
            <div className="w-full cursor-pointer mt-10">
              <div className="bg-[#1f1f1f] text-center py-2 rounded-xl">
                <p className="text-lg h-20">Join squad <Arrow size={18} className="ml-0 mb-1 inline-block"/></p>
              </div>
            </div>
            <div className="w-full cursor-pointer mt-10">
              <div className="bg-[#1f1f1f] text-center py-2 rounded-xl">
                <p className="text-lg h-20">Join squad <Arrow size={18} className="ml-0 mb-1 inline-block"/></p>
              </div>
            </div>
            <div className="w-full cursor-pointer mt-10">
              <div className="bg-[#1f1f1f] text-center py-2 rounded-xl">
                <p className="text-lg h-20">Join squad <Arrow size={18} className="ml-0 mb-1 inline-block"/></p>
              </div>
            </div>
            <div className="w-full cursor-pointer mt-10">
              <div className="bg-[#1f1f1f] text-center py-2 rounded-xl">
                <p className="text-lg h-20">Join squad <Arrow size={18} className="ml-0 mb-1 inline-block"/></p>
              </div>
            </div>
            <div className="w-full cursor-pointer mt-10">
              <div className="bg-[#1f1f1f] text-center py-2 rounded-xl">
                <p className="text-lg h-20">Join squad <Arrow size={18} className="ml-0 mb-1 inline-block"/></p>
              </div>
            </div>
            <div className="w-full cursor-pointer mt-10">
              <div className="bg-[#1f1f1f] text-center py-2 rounded-xl">
                <p className="text-lg h-20">Join squad <Arrow size={18} className="ml-0 mb-1 inline-block"/></p>
              </div>
            </div>
            <div className="w-full cursor-pointer mt-10">
              <div className="bg-[#1f1f1f] text-center py-2 rounded-xl">
                <p className="text-lg h-20">Join squad <Arrow size={18} className="ml-0 mb-1 inline-block"/></p>
              </div>
            </div>
          </div>
        </div>
      </div>
  )
}

export default Earn
