document.addEventListener('DOMContentLoaded', function() {
  // Get theater and movie info from URL
  const urlParams = new URLSearchParams(window.location.search);
  const theaterName = urlParams.get("theater") || "Theater";
  const movieName = urlParams.get("movie") || "Movie";
  const showtime = urlParams.get("showtime") || "Not specified";
  
  // Seat pricing by row (₹5 to ₹15 per seat)
  const prices = {
    1: 15, // Row A
    2: 12, // Row B
    3: 10, // Row C
    4: 8,  // Row D
    5: 5   // Row E
  };

  // Track selected seats and total amount
  let selectedSeats = [];
  const seatGrid = document.getElementById("seat-grid");
  const selectedSeatsDisplay = document.getElementById("selected-seats");
  const totalAmountDisplay = document.getElementById("total-amount");
  const totalAmountContainer = document.getElementById("total-amount-container");
  const proceedToPayBtn = document.getElementById("proceed-to-pay");
  const priceDisplay = document.getElementById("price-display");

  // Function to update selection summary
  function updateSelectionSummary() {
    // Update selected seats display
    selectedSeatsDisplay.textContent = selectedSeats.length > 0 
      ? `Selected Seats: ${selectedSeats.map(s => s.id).join(', ')}`
      : 'No seats selected';
    
    // Update total amount display
    const total = selectedSeats.reduce((acc, s) => acc + s.price, 0);
    totalAmountDisplay.textContent = `₹${total}`;
    
    // Enable/disable proceed to pay button
    proceedToPayBtn.disabled = selectedSeats.length === 0;
    
    // Show/hide total amount container
    totalAmountContainer.style.display = selectedSeats.length > 0 ? 'block' : 'none';
  }


  // Generate 50 seats (5 rows x 10 columns)
  for (let row = 1; row <= 5; row++) {
    const rowLabel = document.createElement('div');
    rowLabel.className = 'row-label';
    rowLabel.textContent = String.fromCharCode(64 + row); // A, B, C, etc.
    seatGrid.appendChild(rowLabel);
    
    for (let col = 1; col <= 10; col++) {
      const seat = document.createElement("button");
      seat.className = "seat";
      seat.textContent = col;
      seat.dataset.row = row;
      seat.dataset.col = col;
      
      seat.addEventListener("click", function() {
        const price = prices[row];
        const seatId = `${String.fromCharCode(64 + row)}${col}`;
        const seatIndex = selectedSeats.findIndex(s => s.id === seatId);
        
        if (seatIndex === -1) {
          // Add seat to selection
          selectedSeats.push({ id: seatId, row: row, col: col, price: price });
          seat.classList.add('selected');
        } else {
          // Remove seat from selection
          selectedSeats.splice(seatIndex, 1);
          seat.classList.remove('selected');
        }
        
        // Update UI
        updateSelectionSummary();
        priceDisplay.textContent = `Seat ${seatId}: ₹${price}`;
      });
      
      seat.addEventListener("mouseover", function() {
        const seatId = `${String.fromCharCode(64 + row)}${col}`;
        const isSelected = selectedSeats.some(s => s.id === seatId);
        if (!isSelected) {
          priceDisplay.textContent = `Seat ${seatId}: ₹${prices[row]}`;
        }
      });
      
      seatGrid.appendChild(seat);
    }
  }

  // Handle proceed to payment button
  proceedToPayBtn.addEventListener('click', function() {
    if (selectedSeats.length === 0) return;
    
    const total = selectedSeats.reduce((acc, s) => acc + s.price, 0);
    const seats = selectedSeats.map(s => s.id).join(',');
    
    // Redirect to payment page with booking details
    window.location.href = `payment.html?theater=${encodeURIComponent(theaterName)}` +
                         `&movie=${encodeURIComponent(movieName)}` +
                         `&seats=${encodeURIComponent(seats)}` +
                         `&total=${total}` +
                         `&showtime=${encodeURIComponent(showtime)}`;
  });
});
