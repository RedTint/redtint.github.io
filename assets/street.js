// A short strip of the homepage's night street, for the talk pages.
// Seeded by the page, so each talk always shows its own skyline. Office lights keep switching.
"use strict";
(function () {
  var el = document.querySelector(".street");
  if (!el) return;
  var REDUCED = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var DPR = Math.min(window.devicePixelRatio || 1, 2);

  function hash(str) { var h = 2166136261; for (var i = 0; i < str.length; i++) { h ^= str.charCodeAt(i); h = Math.imul(h, 16777619); } return h >>> 0; }
  function RNG(seed) {
    var s = seed >>> 0;
    return function () {
      s = (s + 0x6d2b79f5) >>> 0;
      var t = s; t = Math.imul(t ^ (t >>> 15), t | 1); t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
      return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
    };
  }
  function pick(r, a) { return a[Math.floor(r() * a.length)]; }
  var WARM = ["#ffd9a0", "#ffc978", "#ffe7c2"], COOL = ["#9fdcff", "#c8ecff"], NEON = ["#ffb347", "#ff5d73", "#4fd1ff", "#ffd36b"];

  var back = document.createElement("canvas"), front = document.createElement("canvas");
  el.appendChild(back); el.appendChild(front);
  var windows = [], g2;

  function build() {
    var w = el.clientWidth, h = el.clientHeight;
    var r = RNG(hash(el.dataset.seed || location.pathname));
    [back, front].forEach(function (c) { c.width = Math.ceil(w * DPR); c.height = Math.ceil(h * DPR); c.style.width = w + "px"; c.style.height = h + "px"; });
    var g = back.getContext("2d"); g.setTransform(DPR, 0, 0, DPR, 0, 0);
    g2 = front.getContext("2d"); g2.setTransform(DPR, 0, 0, DPR, 0, 0);
    windows = [];
    // stars
    for (var i = 0; i < w / 9; i++) { g.fillStyle = "rgba(241,236,228," + (0.2 + r() * 0.5).toFixed(2) + ")"; g.fillRect(r() * w, r() * h * 0.5, 1, 1); }
    // far skyline
    for (var x = 0; x < w;) {
      var bw = 24 + r() * 50, bh = h * (0.25 + r() * 0.3);
      g.fillStyle = "#1a1f3c"; g.fillRect(x, h - bh, bw + 1, bh); x += bw;
    }
    // towers with windows
    for (x = -10; x < w;) {
      bw = 50 + r() * 90; bh = h * (0.35 + r() * 0.45);
      var top = h - bh;
      var gr = g.createLinearGradient(0, top, 0, h); gr.addColorStop(0, "#141a36"); gr.addColorStop(1, "#0b0f22");
      g.fillStyle = gr; g.fillRect(x, top, bw, bh);
      var p = 0.2 + r() * 0.3, cool = r() < 0.3;
      for (var wy = top + 10; wy < h - 12; wy += 12) for (var wx = x + 7; wx < x + bw - 9; wx += 10)
        windows.push({ x: wx, y: wy, lit: r() < p, c: pick(r, cool ? COOL : WARM), a: 0.45 + r() * 0.45 });
      if (r() < 0.5) {
        var col = pick(r, NEON), sx = x + 8 + r() * (bw - 30), sh = 40 + r() * 60, sy = h - sh - 10;
        g.save(); g.shadowColor = col; g.shadowBlur = 18; g.strokeStyle = col; g.lineWidth = 2; g.strokeRect(sx, sy, 18, sh); g.restore();
      }
      x += bw + r() * 10;
    }
    // lens blur discs
    g.globalCompositeOperation = "lighter";
    for (i = 0; i < w / 60; i++) {
      var cx = r() * w, cy = h * (0.2 + r() * 0.8), rad = 14 + r() * 46, c = pick(r, NEON.concat(WARM));
      var n = parseInt(c.slice(1), 16), rgb = (n >> 16) + "," + ((n >> 8) & 255) + "," + (n & 255), a = 0.1 + r() * 0.12;
      var rg = g.createRadialGradient(cx, cy, 0, cx, cy, rad);
      rg.addColorStop(0, "rgba(" + rgb + "," + (a * 0.8) + ")"); rg.addColorStop(0.9, "rgba(" + rgb + "," + (a * 1.4) + ")"); rg.addColorStop(1, "rgba(" + rgb + ",0)");
      g.fillStyle = rg; g.beginPath(); g.arc(cx, cy, rad, 0, 6.283); g.fill();
    }
    g.globalCompositeOperation = "source-over";
    windows.forEach(draw);
  }
  function draw(win) {
    g2.clearRect(win.x, win.y, 4, 6);
    if (!win.lit) return;
    g2.globalAlpha = win.a; g2.fillStyle = win.c; g2.fillRect(win.x, win.y, 4, 6); g2.globalAlpha = 1;
  }

  build();
  var lastW = el.clientWidth;
  window.addEventListener("resize", function () { if (el.clientWidth !== lastW) { lastW = el.clientWidth; build(); } });
  if (REDUCED) return;
  setInterval(function () {
    if (document.hidden || !windows.length) return;
    for (var i = 0; i < 3; i++) { var win = windows[Math.floor(Math.random() * windows.length)]; win.lit = !win.lit; draw(win); }
  }, 260);
})();
