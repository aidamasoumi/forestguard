
const map = L.map("map").setView([51.5, -0.12], 6);


L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
  maxZoom: 19,
  attribution: "&copy; OpenStreetMap contributors",
}).addTo(map);



let userMarker;
let accuracyCircle;

if ("geolocation" in navigator) {
  navigator.geolocation.watchPosition(
    (position) => {
      const lat = position.coords.latitude;
      const lng = position.coords.longitude;
      const accuracy = position.coords.accuracy; 

      const userLatLng = [lat, lng];

      if (!userMarker) {
        
        userMarker = L.marker(userLatLng)
          .addTo(map)
          .bindPopup("You are here (live)")
          .openPopup();

        accuracyCircle = L.circle(userLatLng, {
          radius: accuracy,
          color: "#1d4ed8",
          fillColor: "#60a5fa",
          fillOpacity: 0.2,
        }).addTo(map);

        
        map.setView(userLatLng, 14);
      } else {
        
        userMarker.setLatLng(userLatLng);
        accuracyCircle.setLatLng(userLatLng);
        accuracyCircle.setRadius(accuracy);
      }
    },
    (error) => {
      console.log("Geolocation error:", error.message);
    },
    {
      enableHighAccuracy: true,
    }
  );
} else {
  console.log("Geolocation is not supported on this browser.");
}


L.circleMarker([51.6, -0.1], {
  radius: 10,
  color: "#e63a3a",
  fillColor: "#e63a3a",
  fillOpacity: 0.9,
}).addTo(map).bindPopup("Alert report");

L.circleMarker([51.7, -0.2], {
  radius: 10,
  color: "#f4e45b",
  fillColor: "#f4e45b",
  fillOpacity: 0.9,
}).addTo(map).bindPopup("Information report");

L.circleMarker([51.4, -0.15], {
  radius: 10,
  color: "#79a8ff",
  fillColor: "#79a8ff",
  fillOpacity: 0.9,
}).addTo(map).bindPopup("Protected area");

