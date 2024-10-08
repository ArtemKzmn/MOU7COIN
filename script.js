// script.js

// Function to calculate the remaining time until the next hour
function calculateRemainingTime() {
  const now = new Date();
  const nextHour = new Date(now.getFullYear(), now.getMonth(), now.getDate(), now.getHours() + 1, 0, 0, 0); 
  const timeLeft = nextHour - now;

  return timeLeft;
}

// Function to update the countdown timer
function updateCountdown() {
  const countdownElement = document.getElementById('countdown');
  const timeLeft = calculateRemainingTime(); // Get time remaining

  const minutes = Math.floor(timeLeft / (1000 * 60));
  const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);

  countdownElement.textContent = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
}

// Function to update the leaderboard data
function updateLeaderboard() {
  const playerListElement = document.getElementById('player-list');
  playerListElement.innerHTML = ''; // Clear the list

  // Fetch player data from your server or data source
  fetch('/api/players')
    .then(response => response.json())
    .then(playerData => {
      // Sort the players by tokens in descending order
      playerData.sort((a, b) => b.tokens - a.tokens);

      // Add player entries to the list
      playerData.forEach((player, index) => {
        const playerEntry = document.createElement('div');
        playerEntry.classList.add('player-entry');
        playerEntry.innerHTML = `${index + 1}. ${player.username}: ${player.tokens}`;
        playerListElement.appendChild(playerEntry);
      });

      // Update the countdown timer after displaying the list
      updateCountdown();
    })
    .catch(error => {
      console.error('Error fetching player data:', error);
      // Handle the error appropriately, maybe display a message to the user
    });
}

// Call the updateLeaderboard function to display the initial list
updateLeaderboard();

// Add click event listener for the return button
document.querySelector('.return-button').addEventListener('click', function() {
  window.location.href = 'index.html'; // Replace 'index.html' with your main page URL
});
