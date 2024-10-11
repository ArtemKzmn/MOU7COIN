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

  const handleLeaderboardClick = () => {
    window.location.href = '/leaderboard';
  };

  const handleFriendsClick = () => {
    window.location.href = '/friends';
  };

  const handleHomeClick = () => {
    window.location.href = '/';
  };

  return (
    <div className="h-screen w-screen bg-black text-white">
      <div className="fixed top-0 left-0 w-full h-12 bg-black flex justify-center items-center rounded">
        <button className="text-white mr-4" onClick={handleLeaderboardClick}>Leaderboard</button>
        <button className="text-white ml-4" onClick={handleFriendsClick}>Friends</button>
      </div>
      <div className="flex justify-center items-center h-screen">
        <p className="text-2xl font-bold mt-4">Clicks: {clicks}</p>
        <img src="логотип MOU7.jpg" alt="Coin" className="w-300 h-300 rounded cursor-pointer" style={{ transform: `scale(${scale})` }} onClick={handleCoinClick} />
      </div>
      <div className="fixed bottom-0 left-0 w-full h-12 bg-black flex justify-center items-center rounded">
        <div className="w-full h-4 bg-white" style={{ width: `${barValue / 30}%` }}></div>
        <span className="ml-4">{barValue}</span>
      </div>
      <div className="fixed top-12 left-0 w-full h-screen overflow-y-scroll" style={{ display: window.location.pathname === '/leaderboard' ? 'block' : 'none' }}>
        <h1 className="text-2xl font-bold mb-4">Leaderboard</h1>
        <button className="text-white" onClick={handleHomeClick}>Back</button>
        {leaderboard.map((player, index) => (
          <div key={index} className="flex justify-between items-center h-12">
            <span>{index + 1}. {player.name}</span>
            <span>{player.tokens}</span>
          </div>
        ))}
      </div>
      <div className="fixed top-12 left-0 w-full h-screen overflow-y-scroll" style={{ display: window.location.pathname === '/friends' ? 'block' : 'none' }}>
        <h1 className="text-2xl font-bold mb-4">Friends</h1>
        <button className="text-white" onClick={handleHomeClick}>Back</button>
        {friends.map((friend, index) => (
          <div key={index} className="flex justify-between items-center h-12">
            <span>{friend.name}</span>
            <span>{friend.tokens}</span>
          </div>
        ))}
        <input type="text" value={referralLink} className="w-full h-12 pl-4" />
      </div>
    </div>
  );
};

export default App;
