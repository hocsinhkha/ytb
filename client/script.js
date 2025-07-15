const API = "/api";

const player = new Plyr('#player', {
  quality: { default: 720 },
  speed: { selected: 1, options: [0.5, 1, 1.5, 2] }
});

function toggleDark() {
  document.body.classList.toggle("dark");
}

async function searchVideo(query) {
  const res = await fetch(`${API}/search?q=${encodeURIComponent(query)}`);
  const data = await res.json();
  renderVideos(data);
}

async function loadPopularVideos() {
  const res = await fetch(`${API}/popular`);
  const data = await res.json();
  renderVideos(data);
}

function renderVideos(videos) {
  const container = document.getElementById("results");
  container.innerHTML = "";

  videos.forEach(item => {
    const videoId = item.videoId || item.videoId?.videoId;
    const title = item.title || "Không tiêu đề";

    const el = document.createElement("div");
    el.className = "result-item";
    el.innerHTML = `
      <img src="https://i.ytimg.com/vi/${videoId}/hqdefault.jpg" />
      <div class="result-title">${title}</div>
    `;
    el.onclick = () => loadVideo(videoId);
    container.appendChild(el);
  });
}

async function loadVideo(videoId) {
  const res = await fetch(`${API}/video/${videoId}`);
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

document.addEventListener("DOMContentLoaded", () => {
  loadPopularVideos();
  document.getElementById("searchBtn").onclick = () => {
    const query = document.getElementById("searchInput").value;
    if (query.trim()) searchVideo(query);
  };
  document.getElementById("darkToggle").onclick = toggleDark;
});
