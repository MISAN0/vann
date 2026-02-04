// Coordinates
// Bogor, Indonesia
const BOGOR = { name: "Bogor", lat: -6.5971, lon: 106.8060 };
// Hobart, Tasmania
const HOBART = { name: "Hobart", lat: -42.8821, lon: 147.3272 };

// Haversine distance (km)
function haversineKm(a, b) {
  const R = 6371; // Earth radius in km
  const toRad = (x) => (x * Math.PI) / 180;

  const dLat = toRad(b.lat - a.lat);
  const dLon = toRad(b.lon - a.lon);

  const lat1 = toRad(a.lat);
  const lat2 = toRad(b.lat);

  const sinDLat = Math.sin(dLat / 2);
  const sinDLon = Math.sin(dLon / 2);

  const h =
    sinDLat * sinDLat +
    Math.cos(lat1) * Math.cos(lat2) * sinDLon * sinDLon;

  const c = 2 * Math.atan2(Math.sqrt(h), Math.sqrt(1 - h));
  return R * c;
}

function format2(n) {
  return Number(n).toFixed(2);
}

function updateDistanceUI() {
  const km = haversineKm(BOGOR, HOBART);
  const miles = km * 0.621371;
  const nmi = km / 1.852;

  document.getElementById("km").value = `${format2(km)} km`;
  document.getElementById("miles").value = `${format2(miles)} miles`;
  document.getElementById("nmi").value = `${format2(nmi)} nmi`;

  // Quote (rephrased) using the computed km (rounded)
  const roundedKm = Math.round(km).toLocaleString();
  document.getElementById("ldrQuote").textContent =
    `Even with ${roundedKm} km between us, our love has stayed strong for 3 years — and I’m choosing you for a lifetime.`;
}

function initMap() {
  const map = L.map("map", { zoomControl: true }).setView(
    [(BOGOR.lat + HOBART.lat) / 2, (BOGOR.lon + HOBART.lon) / 2],
    3
  );

  // OpenStreetMap tiles
  L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    attribution: '&copy; OpenStreetMap'
  }).addTo(map);

  // Markers
  const bogorMarker = L.marker([BOGOR.lat, BOGOR.lon]).addTo(map).bindPopup("Bogor, Indonesia");
  const hobartMarker = L.marker([HOBART.lat, HOBART.lon]).addTo(map).bindPopup("Hobart, Tasmania");

  // Curved-ish line: we fake a curve using a midpoint that we push outward
  const latMid = (BOGOR.lat + HOBART.lat) / 2;
  const lonMid = (BOGOR.lon + HOBART.lon) / 2;

  // Push the midpoint north/west a bit to create a romantic arc
  const curvePoint = [latMid + 8, lonMid - 10];

  const path = [
    [BOGOR.lat, BOGOR.lon],
    curvePoint,
    [HOBART.lat, HOBART.lon]
  ];

  L.polyline(path, {
    weight: 5,
    opacity: 0.75
  }).addTo(map);

  // Fit bounds
  const bounds = L.latLngBounds([
    [BOGOR.lat, BOGOR.lon],
    [HOBART.lat, HOBART.lon]
  ]);
  map.fitBounds(bounds, { padding: [40, 40] });

  // Auto-open popups once
  setTimeout(() => bogorMarker.openPopup(), 600);
  setTimeout(() => hobartMarker.openPopup(), 1200);
}

updateDistanceUI();
initMap();
