// Coordinates (city-to-city)
const BOGOR = { name: "Bogor", lat: -6.5971, lon: 106.8060 };
const HOBART = { name: "Hobart", lat: -42.8821, lon: 147.3272 };

function haversineKm(a, b) {
  const R = 6371;
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

  const kmRounded = Math.round(km).toLocaleString();

  const kmInline = document.getElementById("kmInline");
  if (kmInline) kmInline.textContent = `${kmRounded} km`;

  const kmEl = document.getElementById("km");
  const milesEl = document.getElementById("miles");
  const nmiEl = document.getElementById("nmi");

  if (kmEl) kmEl.value = `${format2(km)} km`;
  if (milesEl) milesEl.value = `${format2(miles)} miles`;
  if (nmiEl) nmiEl.value = `${format2(nmi)} nmi`;

  const quoteEl = document.getElementById("ldrQuote");
  if (quoteEl) {
    quoteEl.textContent =
      `Even with ${kmRounded} km between Bogor and Hobart, my heart still finds you, baby. 3 years strong, and a lifetime to go.`;
  }
}

let mapInitialized = false;

function initMapOnceWhenOpened() {
  const collapseEl = document.getElementById("collapseOne");
  if (!collapseEl) return;

  collapseEl.addEventListener("shown.bs.collapse", () => {
    if (mapInitialized) return;
    mapInitialized = true;
    initMap();
  });
}

function initMap() {
  const mapEl = document.getElementById("map");
  if (!mapEl) return;

  const map = L.map("map", { zoomControl: true }).setView(
    [(BOGOR.lat + HOBART.lat) / 2, (BOGOR.lon + HOBART.lon) / 2],
    3
  );

  L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    attribution: '&copy; OpenStreetMap'
  }).addTo(map);

  const bogorMarker = L.marker([BOGOR.lat, BOGOR.lon]).addTo(map).bindPopup("Bogor, Indonesia");
  const hobartMarker = L.marker([HOBART.lat, HOBART.lon]).addTo(map).bindPopup("Hobart, Tasmania");

  // Arc line using a pushed midpoint
  const latMid = (BOGOR.lat + HOBART.lat) / 2;
  const lonMid = (BOGOR.lon + HOBART.lon) / 2;
  const curvePoint = [latMid + 8, lonMid - 10];

  const path = [
    [BOGOR.lat, BOGOR.lon],
    curvePoint,
    [HOBART.lat, HOBART.lon]
  ];

  L.polyline(path, { weight: 5, opacity: 0.75 }).addTo(map);

  const bounds = L.latLngBounds([
    [BOGOR.lat, BOGOR.lon],
    [HOBART.lat, HOBART.lon]
  ]);
  map.fitBounds(bounds, { padding: [40, 40] });

  setTimeout(() => bogorMarker.openPopup(), 500);
  setTimeout(() => hobartMarker.openPopup(), 1100);
}

updateDistanceUI();
initMapOnceWhenOpened();
