document.addEventListener('DOMContentLoaded', function() {
  // Get booking details from URL
  const urlParams = new URLSearchParams(window.location.search);
  const theater = urlParams.get('theater') || 'Unknown Theater';
  const movie = urlParams.get('movie') || 'Unknown Movie';
  const seats = urlParams.get('seats') || '';
  const total = urlParams.get('total') || '0';
  const showtime = urlParams.get('showtime') || 'Not specified';

  // Display booking details
  const bookingDetails = document.getElementById('booking-details');
  bookingDetails.innerHTML = `
    <p><strong>Movie:</strong> ${decodeURIComponent(movie)}</p>
    <p><strong>Theater:</strong> ${decodeURIComponent(theater)}</p>
    <p><strong>Showtime:</strong> ${decodeURIComponent(showtime)}</p>
    <p><strong>Seats:</strong> ${decodeURIComponent(seats)}</p>
  `;
  
  document.getElementById('total-amount').textContent = `₹${total}`;

  // Handle payment button click
  document.getElementById('pay-button').addEventListener('click', function() {
    const options = {
      key: 'rzp_test_2wNkQkGJXJQvQz', // Replace with your actual test key
      amount: parseFloat(total) * 100, // Razorpay expects amount in paise
      currency: 'INR',
      name: 'Jai Cinema Bookings',
      description: `Booking for ${decodeURIComponent(movie)}`,
      image: 'https://example.com/your_logo.png', // Add your logo URL
      handler: function(response) {
        // On successful payment
        const bookingId = 'JCB' + Math.random().toString(36).substr(2, 9).toUpperCase();
        // Redirect to confirmation page with booking details
        window.location.href = `confirmation.html?bookingId=${bookingId}&movie=${movie}&theater=${theater}&seats=${seats}&total=${total}&showtime=${showtime}`;
      },
      prefill: {
        name: 'Customer Name', // You can get this from user profile
        email: 'customer@example.com',
        contact: '+919876543210'
      },
      notes: {
        address: 'Jai Cinema Bookings Office'
      },
      theme: {
        color: '#3399cc'
      }
    };

    const rzp = new Razorpay(options);
    rzp.open();
  });

  // Handle cancel button
  document.getElementById('cancel-booking').addEventListener('click', function() {
    if (confirm('Are you sure you want to cancel this booking?')) {
      window.location.href = 'index.html';
    }
  });
});
