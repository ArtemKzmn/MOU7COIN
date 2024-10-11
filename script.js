<div id="mou7-game"></div>

<script src="https://unpkg.com/react@18/umd/react.development.js" crossorigin></script>
<script src="https://unpkg.com/react-dom@18/umd/react-dom.development.js" crossorigin></script>

<script>
  const Mou7Game = () => {
    const [clicks, setClicks] = React.useState(() => localStorage.getItem('clicks') ? parseInt(localStorage.getItem('clicks')) : 0);
    const [scale, setScale] = React.useState(1);
    const [barValue, setBarValue] = React.useState(3000);
    const [leaderboard, setLeaderboard] = React.useState([]);
    const [friends, setFriends] = React.useState([]);
    const [referralLink, setReferralLink] = React.useState('');

    React.useEffect(() => {
      const interval = setInterval(() => {
        if (barValue < 3000) {
          setBarValue(barValue + 3);
        }
      }, 1000);
      return () => clearInterval(interval);
    }, [barValue]);

    React.useEffect(() => {
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

    return React.createElement(
      'div',
      { className: 'h-screen w-screen bg-black text-white' },
      React.createElement(
        'div',
        { className: 'fixed top-0 left-0 w-full h-12 bg-black flex justify-center items-center' },
        React.createElement(
          'button',
          { className: 'text-white mr-4', onClick: handleLeaderboardClick },
          'Leaderboard'
        ),
        React.createElement(
          'button',
          { className: 'text-white ml-4', onClick: handleFriendsClick },
          'Friends'
        )
      ),
      React.createElement(
        'div',
        { className: 'flex justify-center items-center h-screen' },
        React.createElement(
          'div',
          { className: 'text-3xl font-bold mb-4' },
          clicks
        ),
        React.createElement(
          'div',
          { className: 'w-300 h-300 bg-white rounded-3xl flex justify-center items-center', style: { transform: `scale(${scale})` }, onClick: handleCoinClick },
          React.createElement('img', { src: 'логотип MOU7.jpg', alt: 'Coin', className: 'w-300 h-300 rounded-3xl' })
        )
      ),
      React.createElement(
        'div',
        { className: 'fixed bottom-0 left-0 w-full h-12 bg-black flex justify-center items-center' },
        React.createElement(
          'div',
          { className: 'w-full h-4 bg-white rounded-3xl', style: { width: `${barValue / 30}%` } }
        ),
        React.createElement(
          'span',
          { className: 'ml-4' },
          barValue
        )
      ),
      React.createElement(
        'div',
        { className: 'fixed top-12 left-0 w-full h-screen overflow-y-scroll' },
        leaderboard.map((player, index) => React.createElement(
          'div',
          { key: index, className: 'flex justify-between items-center h-12' },
          React.createElement(
            'span',
            null,
            index + 1,
            '. ',
            player.name
          ),
          React.createElement(
            'span',
            null,
            player.tokens
          )
        ))
      ),
      React.createElement(
        'div',
        { className: 'fixed top-12 left-0 w-full h-screen overflow-y-scroll', style: { display: window.location.pathname === '/friends' ? 'block' : 'none' } },
        React.createElement(
          'h1',
          { className: 'text-2xl font-bold mb-4' },
          'Friends'
        ),
        React.createElement(
          'button',
          { className: 'text-white', onClick: handleHomeClick },
          'Back'
        ),
        friends.map((friend, index) => React.createElement(
          'div',
          { key: index, className: 'flex justify-between items-center h-12' },
          React.createElement(
            'span',
            null,
            friend.name
          ),
          React.createElement(
            'span',
            null,
            friend.tokens
          )
        )),
        React.createElement('input', { type: 'text', value: referralLink, className: 'w-full h-12 pl-4' })
      )
    );
  };

  ReactDOM.render(React.createElement(Mou7Game, null), document.getElementById('mou7-game'));
</script>
