(function () {
  const container = document.getElementById("hearts");
  if (!container) return;

  // Keep it light on phone
  const isMobile = window.matchMedia("(max-width: 768px)").matches;
  const count = isMobile ? 14 : 26;

  const emojis = ["💗", "💖", "💞", "💜"];

  for (let i = 0; i < count; i++) {
    const s = document.createElement("span");
    s.className = "floating-heart";
    s.textContent = emojis[Math.floor(Math.random() * emojis.length)];

    // Random positions + timing
    const left = Math.random() * 100;
    const duration = 8 + Math.random() * 10;     // 8–18s
    const delay = Math.random() * 6;             // 0–6s
    const size = isMobile ? (12 + Math.random() * 10) : (12 + Math.random() * 14);
    const drift = (Math.random() * 60) - 30;     // -30px to +30px

    s.style.left = `${left}%`;
    s.style.animationDuration = `${duration}s`;
    s.style.animationDelay = `${delay}s`;
    s.style.fontSize = `${size}px`;
    s.style.setProperty("--drift", `${drift}px`);

    container.appendChild(s);
  }
})();