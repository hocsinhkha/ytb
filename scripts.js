const API_URL = "https://invidious.snopyta.org/api/v1"; // có thể đổi sang instance khác

const player = new Plyr('#player', {
  quality: { default: 720 },
  speed: { selected: 1, options: [0.5, 1, 1.5, 2] }
});

function toggleDark() {
  document.body.classList.toggle("dark");
}

async function searchVideo() {
  const query = document.getElementById("searchInput").value;
  const res = await fetch(`${API_URL}/search?q=${encodeURIComponent(query)}&type=video`);
  const data = await res.json();
  const container = document.getElementById("results");
  container.innerHTML = "";

  data.forEach(item => {
    const el = document.createElement("div");
    el.className = "result-item";
    el.innerHTML = `
      <img src="https://i.ytimg.com/vi/${item.videoId}/hqdefault.jpg" />
      <div class="result-title">${item.title}</div>
    `;
    el.onclick = () => loadVideo(item.videoId);
    container.appendChild(el);
  });
}

async function loadVideo(videoId) {
  const res = await fetch(`${API_URL}/videos/${videoId}`);
  const data = await res.json();

  const format = data.formatStreams.find(f => f.qualityLabel === "720p") || data.formatStreams[0];

  if (!format || !format.url) {
    alert("Không thể phát video này!");
    return;
  }

  player.source = {
    type: "video",
    sources: [{
      src: format.url,
      type: "video/mp4"
    }]
  };

  document.getElementById("player-container").style.display = "block";
  window.scrollTo({ top: 0, behavior: "smooth" });
}
