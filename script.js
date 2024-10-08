// Function to update the countdown timer
function updateCountdown() {
  const countdownElement = document.getElementById('countdown');
  let timeLeft = localStorage.getItem('timeLeft') || 3600; // 3600 seconds = 1 hour

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;

  countdownElement.textContent = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;

  // Update the timeLeft every second
  timeLeft--;
  localStorage.setItem('timeLeft', timeLeft);

  // Reset the timer when timeLeft reaches 0
  if (timeLeft === 0) {
    timeLeft = 3600;
    localStorage.setItem('timeLeft', timeLeft);
    updateLeaderboard(); // Update the leaderboard data
  }
}

// Function to update the leaderboard data
function updateLeaderboard() {
  const playerListElement = document.getElementById('player-list');
  playerListElement.innerHTML = ''; // Clear the list

  // **Here you need to replace this with your actual logic to fetch player data 
  // from a server or data source. The following is just a placeholder for now.**
  const playerData = [
    { username: "fizmat", tokens: 20000 },
    { username: "john_doe", tokens: 15000 },
    { username: "jane_doe", tokens: 10000 },
    // Add more players as needed...
  ];

  // Sort the players by tokens in descending order
  playerData.sort((a, b) => b.tokens - a.tokens);

  // Add player entries to the list
  playerData.forEach((player, index) => {
    const playerEntry = document.createElement('div');
    playerEntry.classList.add('player-entry');
    playerEntry.innerHTML = `${index + 1}. ${player.username}: ${player.tokens}`;
    playerListElement.appendChild(playerEntry);
  });
}

// Call the updateLeaderboard function to display the initial list
updateLeaderboard();

// Start the countdown timer
setInterval(updateCountdown, 1000);
