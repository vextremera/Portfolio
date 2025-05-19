const BALLS = 18;
const COLORS = [
  [255, 99, 132], [54, 162, 235], [255, 206, 86], [75, 192, 192],
  [153, 102, 255], [255, 159, 64], [255, 255, 255], [0, 255, 127],
  [255, 20, 147], [0, 191, 255], [138, 43, 226], [255, 0, 0],
  [0, 255, 255], [255, 105, 180], [144, 238, 144], [173, 216, 230],
  [240, 128, 128], [255, 215, 0], [0, 128, 255], [255, 0, 255],
  [0, 250, 154], [255, 140, 0], [0, 255, 0], [0, 0, 255],
  [139, 0, 255], [255, 69, 0], [124, 252, 0], [220, 20, 60],
  [255, 182, 193], [127, 255, 212], [186, 85, 211], [199, 21, 133],
  [238, 130, 238], [135, 206, 250], [255, 248, 220], [176, 224, 230]
];

function lerp(a, b, t) {
  return a + (b - a) * t;
}

function lerpColor(c1, c2, t) {
  return [
    Math.round(lerp(c1[0], c2[0], t)),
    Math.round(lerp(c1[1], c2[1], t)),
    Math.round(lerp(c1[2], c2[2], t)),
  ];
}

function rgbToStr(rgb, alpha = 1) {
  return `rgba(${rgb[0]},${rgb[1]},${rgb[2]},${alpha})`;
}

function randomBetween(a, b) {
  return a + Math.random() * (b - a);
}

function areBallsOverlapping(b1, b2) {
  const dx = b1.x - b2.x;
  const dy = b1.y - b2.y;
  return Math.hypot(dx, dy) < b1.r + b2.r + 20; // espacio extra
}

document.addEventListener("DOMContentLoaded", () => {
  const container = document.getElementById("balls-bg");
  if (!container) return;

  const canvas = document.createElement("canvas");
  Object.assign(canvas.style, {
    width: "100%",
    height: "100%",
    display: "block",
    position: "absolute",
    inset: "0",
    pointerEvents: "none",
  });
  container.appendChild(canvas);

  const ctx = canvas.getContext("2d");
  let W = window.innerWidth;
  let H = window.innerHeight;
  canvas.width = W;
  canvas.height = H;

  window.addEventListener("resize", () => {
    W = window.innerWidth;
    H = window.innerHeight;
    canvas.width = W;
    canvas.height = H;
  });

  const balls = [];

  for (let i = 0; i < BALLS; i++) {
    let newBall;
    let tries = 0;
    do {
      const colorIdx = Math.floor(Math.random() * COLORS.length);
      newBall = {
        x: randomBetween(100, W - 100),
        y: randomBetween(100, H - 100),
        r: randomBetween(100, 200),
        vx: randomBetween(-0.3, 0.3),
        vy: randomBetween(-0.3, 0.3),
        colorIdx,
        nextColorIdx: (colorIdx + 1) % COLORS.length,
        colorT: Math.random(),
      };
      tries++;
    } while (balls.some((b) => areBallsOverlapping(b, newBall)) && tries < 100);
    balls.push(newBall);
  }

  function animate() {
    ctx.clearRect(0, 0, W, H);

    for (const b of balls) {
      b.x += b.vx + randomBetween(-0.1, 0.1);
      b.y += b.vy + randomBetween(-0.1, 0.1);

      if (b.x < -b.r) b.x = W + b.r;
      if (b.x > W + b.r) b.x = -b.r;
      if (b.y < -b.r) b.y = H + b.r;
      if (b.y > H + b.r) b.y = -b.r;

      b.colorT += 0.002 + Math.random() * 0.0015;
      if (b.colorT >= 1) {
        b.colorIdx = b.nextColorIdx;
        b.nextColorIdx =
          (b.colorIdx + 1 + Math.floor(Math.random() * (COLORS.length - 1))) %
          COLORS.length;
        b.colorT = 0;
      }

      const color = lerpColor(
        COLORS[b.colorIdx],
        COLORS[b.nextColorIdx],
        b.colorT
      );

      ctx.beginPath();
      ctx.arc(b.x, b.y, b.r, 0, Math.PI * 2);
      ctx.fillStyle = rgbToStr(color, 0.35);
      ctx.shadowColor = rgbToStr(color, 0.8);
      ctx.shadowBlur = 60;
      ctx.fill();
      ctx.shadowBlur = 0;
    }

    requestAnimationFrame(animate);
  }

  animate();
});
