import React, { useState, useEffect } from 'react';

const App = () => {
  const [clicks, setClicks] = useState(() => localStorage.getItem('clicks') ? parseInt(localStorage.getItem('clicks')) : 0);
  const [scale, setScale] = useState(1);
  const [barValue, setBarValue] = useState(3000);
  const [leaderboard, setLeaderboard] = useState([]);
  const [friends, setFriends] = useState([]);
  const [referralLink, setReferralLink] = useState('');

  useEffect(() => {
    const interval = setInterval(() => {
      if (barValue < 3000) {
        setBarValue(barValue + 3);
      }
    }, 1000);
    return () => clearInterval(interval);
  }, [barValue]);

  useEffect(() => {
    localStorage.setItem('clicks', clicks.toString());
  }, [clicks]);

  const handleCoinClick = () => {
    if (barValue > 0) {
      setClicks(clicks + 1);
      setBarValue(barValue - 1);
      setScale(0.9);
      setTimeout(() => {
        setScale(1);
      }, 200);
    }
  };

  return (
    <div className="h-screen w-screen bg-black text-white">
      <div className="fixed top-0 left-0 w-full h-12 bg-black flex justify-center items-center rounded">
        <p className="text-2xl font-bold mt-4">Clicks: {clicks}</p>
      </div>
      <div className="flex justify-center items-center h-screen">
        <img src="логотип MOU7.jpg" alt="Coin" className="w-300 h-300 rounded cursor-pointer" style={{ transform: `scale(${scale})` }} onClick={handleCoinClick} />
      </div>
      <div className="fixed bottom-0 left-0 w-full h-12 bg-black flex justify-center items-center rounded">
        <div className="w-full h-4 bg-white" style={{ width: `${barValue / 30}%` }}></div>
        <span className="ml-4">{barValue}</span>
      </div>
    </div>
  );
};

export default App;
