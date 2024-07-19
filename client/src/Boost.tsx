import React, { useState, useEffect } from 'react'
import Arrow from './icons/Arrow';
import { bear, coin, highVoltage, rocket, trophy, skeleton } from './images';
import { background, back2, back3 } from './images';
const Boost = () => {

  const [levelIndex, setLevelIndex] = useState(6);
  const [tappingPower, setTappingPower] = useState(0)
  const [tappingPrice, setTappingPrice] = useState(() => {
    const savedCost = localStorage.getItem('tappingPrice');
    return savedCost ? parseInt(savedCost, 10) : 1000; // Default starting cost
  })
  const [clickCost, setClickCost] = useState(() => {
    const savedClickCost = localStorage.getItem('clickCost');
    return savedClickCost ? parseInt(savedClickCost, 10) : 10; // Default to 100 if not set
  });
  //   const [taplimit, setTapLimit] = useState(0)
  const [points, setPoints] = useState(() => {
    const savedPoints = localStorage.getItem('points');
    return savedPoints ? parseInt(savedPoints, 10) : 0;
  });
  const [energy, setEnergy] = useState(() => {
    const savedEnergy = localStorage.getItem('energy');
    return savedEnergy ? parseInt(savedEnergy, 10) : 0;
  });
  const [healthToReduce, setHealthToReduce] = useState(() => {
    const savedEnergy = localStorage.getItem('healthtoreduce');
    return savedEnergy ? parseInt(savedEnergy, 10) : 1;
  })
  const [baseEnergy, setBaseEnergy] = useState(() => {
    const savedEnergy = localStorage.getItem('baseenergy');
    return savedEnergy ? parseInt(savedEnergy, 10) : 1000;
  })
  const [baseRefill, setBaseRefill] = useState(() => {
    const savedEnergy = localStorage.getItem('baserefill');
    return savedEnergy ? parseInt(savedEnergy, 10) : 3;
  })
  const [baseTaps, setBaseTaps] = useState(() => {
    const savedEnergy = localStorage.getItem('basetaps');
    return savedEnergy ? parseInt(savedEnergy, 10) : 3;
  })
  const [refill, setRefill] = useState(() => {
    const savedEnergy = localStorage.getItem('refill');
    return savedEnergy ? parseInt(savedEnergy, 10) : 3;
  })

  const [taps, setTaps] = useState(() => {
    const savedEnergy = localStorage.getItem('taps');
    return savedEnergy ? parseInt(savedEnergy, 10) : 3;
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

  const buyPower = () => {
    setTappingPrice(1000)
    if (points >= tappingPrice) {
      setPoints(prevPoints => {
        const newPoints = prevPoints - tappingPrice;
        localStorage.setItem('points', newPoints.toString());
        return newPoints;
      });
      setBaseEnergy(prevEnergy => {
        const newEnergy = prevEnergy + 100;
        localStorage.setItem('baseenergy', newEnergy.toString());
        return newEnergy;
      });
      setTappingPrice(prevCost => {
        const newCost = prevCost + 100;
        localStorage.setItem('tappingPrice', newCost.toString());
        return newCost;
      });
    } else {
      alert("Not enough points!");
    }
  }

  const handleRefill = () => {
    if(refill > 0) {
      setEnergy(prevCost => {
        const newCost = baseEnergy;
        localStorage.setItem('energy', newCost.toString());
        return newCost;
      });
      setRefill(prevCost => {
        const newCost = refill - 1;
        localStorage.setItem('refill', newCost.toString());
        return newCost;
      })  
    } else {
      alert('Out of refill energy')
    }
  }

  const handleTaps = () => {
    setClicks(prevClicks => [...prevClicks, { id: Date.now(), x: 0, y: 0 }]); // Add a new click
  }

  const handlePurchaseClick = () => {
    if (points >= clickCost) {
      setPoints(prevPoints => {
        const newPoints = prevPoints - clickCost;
        localStorage.setItem('points', newPoints.toString());
        return newPoints;
      });

      setClicks(prevClicks => [...prevClicks, { id: Date.now(), x: 0, y: 0 }]); // Add a new click
      setClickCost(prevCost => {
        const newCost = prevCost + 50; // Increase cost by 50 each purchase
        localStorage.setItem('clickCost', newCost.toString());
        return newCost;
      });
      // const pointad = pointsToAdd + 1
      setPointsToAdd(prevCost => {
        const newCost = prevCost + 1; // Increase cost by 50 each purchase
        localStorage.setItem('pointstoadd', newCost.toString());
        return newCost;
      });
      setEnergyToReduce(prevCost => {
        const newCost = prevCost + 1; // Increase cost by 50 each purchase
        localStorage.setItem('energytoreduce', newCost.toString());
        return newCost;
      });
    } else {
      alert('Not enough points to purchase clicks!');
    }
  };

  // useEffect hook to restore energy over time
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
          <h1 className='mt-10 text-2xl'>BOOSTS!!!</h1>
          <div className='free-boost'>
            <div className="w-full cursor-pointer mt-10">
              <div className="bg-[#1f1f1f] text-center py-2 rounded-xl">
                <p className="text-lg h-20" onClick={handleTaps}>Free TAP!!!
                  <p>{taps}/{baseTaps}</p>
                </p>
              </div>
            </div>
            <div className="w-full cursor-pointer mt-10">
              <div className="bg-[#1f1f1f] text-center py-2 rounded-xl">
                <p className="text-lg h-20" onClick={handleRefill}>Refill!!!
                  <p>{refill}/{baseRefill}</p>
                </p>
              </div>
            </div>
          </div>
          <div className="w-full cursor-pointer mt-20">
            <div className="bg-[#1f1f1f] text-center py-2 rounded-xl">
              <p className="text-lg h-20" onClick={buyPower}>Tapping Limit
                <p>{tappingPrice} </p>
              </p>
            </div>
          </div>
          <div className="w-full cursor-pointer mt-10">
            <div className="bg-[#1f1f1f] text-center py-2 rounded-xl">
              <p className="text-lg h-20" onClick={handlePurchaseClick}>Tapping Power
                <p>{clickCost}</p>
              </p>
            </div>
          </div>
          <div className="w-full mt-10">
            <div className="bg-[#1f1f1f] text-center py-2 rounded-xl">
              <p className="text-lg h-20 text-gray-600">Sachel
                <p>Coming soon</p>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Boost
