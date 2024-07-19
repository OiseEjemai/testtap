import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './index.css';
import Arrow from './icons/Arrow';
import { bear, coin, highVoltage, rocket, trophy, skeleton, heart, skeleton2, skeleton3, skeleton4, skeleton5, skeleton6, skeleton7, skeleton8} from './images';
import { background, back2, back3 } from './images';

const Home = () => {
  const levelNames = [
    "Tombstone",    // From 0 to 4999 coins
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
    0,        // Tombstone
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

  const levelImages = [
    skeleton,
    skeleton2,
    skeleton3,
    skeleton4,
    skeleton5,
    skeleton6,
    skeleton7,
    skeleton8
  ]

  const [levelIndex, setLevelIndex] = useState(6);
  const [points, setPoints] = useState(() => {
    const savedPoints = localStorage.getItem('points');
    return savedPoints ? parseInt(savedPoints, 10) : 0;
  });
  const [energy, setEnergy] = useState(() => {
    const savedEnergy = localStorage.getItem('energy');
    return savedEnergy ? parseInt(savedEnergy, 10) : 1000;
  });
  const [health, setHealth] = useState(() => {
    const savedEnergy = localStorage.getItem('health');
    return savedEnergy ? parseInt(savedEnergy, 10) : 1000000;
  });
  const [baseEnergy, setBaseEnergy] = useState(() => {
    const savedEnergy = localStorage.getItem('baseenergy');
    return savedEnergy ? parseInt(savedEnergy, 10) : 1000;
  })
  const [clicks, setClicks] = useState<{ id: number, x: number, y: number }[]>([]);
  const [pointsToAdd, setPointsToAdd] = useState(() => {
    const savedEnergy = localStorage.getItem('pointstoadd');
    return savedEnergy ? parseInt(savedEnergy, 10) : 1;
  })
  const [energyToReduce, setEnergyToReduce] = useState(() => {
    const savedEnergy = localStorage.getItem('energytoreduce');
    return savedEnergy ? parseInt(savedEnergy, 10) : 1;
  })
  const [healthToReduce, setHealthToReduce] = useState(() => {
    const savedEnergy = localStorage.getItem('healthtoreduce');
    return savedEnergy ? parseInt(savedEnergy, 10) : 1;
  })

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
    setHealth(prevEnergy => {
      const newEnergy = Math.max(prevEnergy - energyToReduce, 0);
      localStorage.setItem('health', newEnergy.toString());
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
        if (prevEnergy > 0) {
          const newEnergy = prevEnergy - 1; // Subtract 1 energy point
          localStorage.setItem('energy', newEnergy.toString());
          return newEnergy;
        }
        return prevEnergy; // Return current energy if it's zero or less
      });
      setHealth((prevEnergy) => {
        if (prevEnergy > 0) {
          const newEnergy = prevEnergy + 1; // Subtract 1 energy point
          localStorage.setItem('health', newEnergy.toString());
          return newEnergy;
        }
        return prevEnergy; // Return current energy if it's zero or less
      });
    }, 10000); // Subtract energy every 5 seconds
  
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

  return (
    <div className="min-h-screen px-4 flex flex-col items-center text-white font-medium" style={{
      backgroundImage: `url(${back3})`, backgroundSize: 'cover', backgroundPosition: 'center', backgroundRepeat: 'no-repeat', height: '100vh' // Ensures it takes the full viewport height
    }}>

      <div className="absolute inset-0 h-1/2 bg-gradient-overlay z-0"></div>
      <div className="absolute inset-0 flex items-center justify-center z-0">
        <div className="radial-gradient-overlay"></div>
      </div>

      <div className="w-full z-10 min-h-screen flex flex-col items-center text-white">

        <div className="fixed top-0 left-0 w-full px-4 pt-8 z-10 flex flex-col items-center text-white">
          <div className="w-full cursor-pointer">
            <div className="bg-[#1f1f1f] text-center py-2 rounded-xl">
              <p className="text-lg">Join squad <Arrow size={18} className="ml-0 mb-1 inline-block" /></p>
            </div>
          </div>
          <div className="mt-12 text-5xl font-bold flex items-center">
            <img src={coin} width={44} height={44} />
            <span className="ml-2">{points.toLocaleString()}</span>
          </div>
          <div className="text-base mt-2 flex items-center">
            <img src={trophy} width={24} height={24} />
            <span className="ml-1">{levelNames[levelIndex]} <Arrow size={18} className="ml-0 mb-1 inline-block" /></span>
          </div>
        </div>


        <div className="fixed bottom-0 left-0 w-full px-4 pb-4 z-10">
          <div className="w-full flex justify-between gap-2">
          <div className="flex items-center justify-center">
                <img src={heart} width={44} height={44} alt="High Voltage" />
                <div className="ml-2 text-left">
                  <span className="text-white text-2xl font-bold block">{health}</span>
                  <span className="text-white text-large opacity-75">/ 1000000</span>
                </div>
              </div>
            <div className="w-1/3 flex items-center justify-start max-w-32">
              <div className="flex items-center justify-center">
                <img src={highVoltage} width={44} height={44} alt="High Voltage" />
                <div className="ml-2 text-left">
                  <span className="text-white text-2xl font-bold block">{energy}</span>
                  <span className="text-white text-large opacity-75">/ {baseEnergy}</span>
                </div>
              </div>
            </div>
            <div className="flex-grow flex items-center max-w-70 text-sm">
              <div className="w-full bg-[#b69a47] py-4 rounded-2xl flex justify-around">
                <a href="/invites">
                <button className="flex flex-col items-center gap-1">
                    <img src={bear} width={30} height={30} alt="Invites" />
                    <span>Invites</span>
                </button>
                <div className="dot"></div>
                </a>
                <div className="h-[48px] w-[2px] bg-[#fddb6d]"></div>
                <button className="flex flex-col items-center gap-1">
                  <Link to="/earn">
                    <img src={coin} width={30} height={30} alt="Earn" />
                    <span>Earn</span>
                  </Link>
                </button>
                <div className="h-[48px] w-[2px] bg-[#fddb6d]"></div>
                <button className="flex flex-col items-center gap-1">
                  <Link to="/boost">
                    <img src={rocket} width={30} height={30} alt="boosts" />
                    <span>Boosts</span>
                  </Link>
                </button>
              </div>
            </div>
          </div>
          <div className="progress-container">
  <div className="progress-bar" style={{ width: `${(energy / baseEnergy) * 100}%` }}></div>
</div>



        </div>

        <div className="flex-grow flex items-center justify-center">
          <div className="relative mt-20" onClick={handleClick}>
            <img src={skeleton} width={256} height={256} alt="landoftheforgotten" />
            {clicks.map((click) => (
              <div
                key={click.id}
                className="absolute text-5xl font-bold opacity-100 text-white pointer-events-none"
                style={{
                  top: `${click.y}px`, // Relative to the image
                  left: `${click.x}px`, // Relative to the image
                  transform: 'translate(-50%, -50%)', // Center the text
                  animation: `float 1s ease-out`
                }}
                onAnimationEnd={() => handleAnimationEnd(click.id)}
              >
                {pointsToAdd}
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};

export default Home;
