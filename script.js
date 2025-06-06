const mockTheaters = [
    {
      name: "Sathyam Cinemas",
      location: "Chennai",
      rating: 4.6
    },
    {
      name: "INOX Madurai",
      location: "Madurai",
      rating: 4.3
    },
    {
      name: "PVR Aerohub",
      location: "Chennai Airport",
      rating: 4.5
    },
    {
      name: "KG Cinemas",
      location: "Coimbatore",
      rating: 4.4
    },
    {
      name: "Thangam Cinemas",
      location: "Tirunelveli",
      rating: 4.2
    }
  ];
  
  const container = document.getElementById("theater-list");
  
  mockTheaters.forEach(theater => {
    const div = document.createElement("div");
    div.className = "theater";
    div.innerHTML = `
      <h2>${theater.name}</h2>
      <p>📍 ${theater.location}</p>
      <p>⭐ ${theater.rating}</p>
      <button class="book-btn" onclick="window.location.href='booking.html?theater=${encodeURIComponent(theater.name)}'">Book Now</button>
    `;
    container.appendChild(div);
  });