const express = require("express");
const axios = require("axios");
const path = require("path");
const app = express();
const PORT = process.env.PORT || 80;

const BASE_URL = "https://vid.puffyan.us/api/v1";

// Serve web từ thư mục /client
app.use(express.static(path.join(__dirname, "client")));

// API: video đề xuất
app.get("/api/popular", async (req, res) => {
  try {
    const r = await axios.get(`${BASE_URL}/popular`);
    res.json(r.data);
  } catch (err) {
    res.status(500).json({ error: "Không lấy được video đề xuất" });
  }
});

// API: tìm kiếm
app.get("/api/search", async (req, res) => {
  try {
    const q = req.query.q;
    const r = await axios.get(`${BASE_URL}/search`, { params: { q, type: "video" } });
    res.json(r.data);
  } catch (err) {
    res.status(500).json({ error: "Lỗi tìm kiếm" });
  }
});

// API: chi tiết video
app.get("/api/video/:id", async (req, res) => {
  try {
    const r = await axios.get(`${BASE_URL}/videos/${req.params.id}`);
    res.json(r.data);
  } catch (err) {
    res.status(500).json({ error: "Không lấy được video" });
  }
});

app.listen(PORT, () => {
  console.log("YTB server chạy tại cổng", PORT);
});
