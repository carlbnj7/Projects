// Load the JSON data for the map pins
fetch('data.json')
  .then(response => response.json())
  .then(pins => {
    const map = L.map('map').setView([8.36030001768011, 124.86759082970293], 16);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);

    pins.forEach(pin => {
      const marker = L.marker([pin.latitude, pin.longitude]).addTo(map);
      marker.bindPopup(pin.popup);

      marker.on('click', function () {
        document.getElementById('floor-buttons').style.display = 'block';
        document.getElementById('room-details').style.display = 'none';
      });
    });
  })
  .catch(error => console.error('Error loading the pins data:', error));

function showFloorDetails(floor) {
  const roomDetailsElement = document.getElementById('room-details');
  roomDetailsElement.style.display = 'block';
  let htmlContent = `<h2>Details for Floor ${floor}</h2>`;
  
  const rooms = {
    1: [
      { name: 'Room 101', image: 'room1.jpg', description: 'Description of Room 101' },
      { name: 'Room 102', image: 'room2.jpg', description: 'Description of Room 102' }
    ],
    2: [
      { name: 'Room 201', image: 'room3.jpg', description: 'Description of Room 201' },
      { name: 'Room 202', image: 'room4.jpg', description: 'Description of Room 202' }
    ],
    3: [
      { name: 'Room 301', image: 'room5.jpg', description: 'Description of Room 301' },
      { name: 'Room 302', image: 'room6.jpg', description: 'Description of Room 302' }
    ]
  };

  const selectedFloorRooms = rooms[floor];
  selectedFloorRooms.forEach(room => {
    htmlContent += `
      <h3>${room.name}</h3>
      <p>${room.description}</p>
      <img src="${room.image}" alt="${room.name}">
    `;
  });

  roomDetailsElement.innerHTML = htmlContent;
}
