// Existing code...

let barValue = localStorage.getItem('barValue') || 3000;
barCounter.textContent = barValue;
bottomRectangle.style.width = `${barValue / 3000 * 300}px`;

// ... other event listeners 

coin.addEventListener('touchstart', function(event) { 
  // Existing code...

  if (barValue > 0) {
    // Existing code...
  }
}); 

// ... other event listeners

let refillInterval = setInterval(function() {
  if (barValue < 3000) {
    barValue += 3;
    if (barValue > 3000) {
      barValue = 3000; // Prevent exceeding the limit
    }
    barCounter.textContent = barValue;
    bottomRectangle.style.width = `${barValue / 3000 * 300}px`;
    localStorage.setItem('barValue', barValue);
  }
}, 1000);
