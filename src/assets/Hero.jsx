import { useState, useEffect, useRef } from "react";

const roles = [
  "Frontend Developer",
  "React.js Specialist",
  "UI/UX Enthusiast",
  "MBA Candidate",
  "Problem Solver",
];

function NeonCityAnimation() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    let animFrame;
    let t = 0;

    const W = 480;
    const H = 500;
    canvas.width = W;
    canvas.height = H;

    // Rain drops
    const rainDrops = Array.from({ length: 80 }, () => ({
      x: Math.random() * W,
      y: Math.random() * H,
      speed: 2 + Math.random() * 4,
      length: 10 + Math.random() * 20,
      alpha: 0.1 + Math.random() * 0.3,
      color: Math.random() > 0.5 ? "#00F5D4" : "#F15BB5",
    }));

    // Floating code particles
    const codeChars = "01アイウエオReactJSCSS</>{}[]useState".split("");
    const floatingChars = Array.from({ length: 35 }, () => ({
      x: Math.random() * W,
      y: Math.random() * H,
      char: codeChars[Math.floor(Math.random() * codeChars.length)],
      speed: 0.3 + Math.random() * 0.8,
      alpha: 0.05 + Math.random() * 0.2,
      size: 8 + Math.random() * 8,
      color: ["#00F5D4", "#F15BB5", "#FEE440", "#A78BFA"][Math.floor(Math.random() * 4)],
    }));

    // Stars / particles
    const stars = Array.from({ length: 60 }, () => ({
      x: Math.random() * W,
      y: Math.random() * H * 0.55,
      r: Math.random() * 1.5,
      twinkle: Math.random() * Math.PI * 2,
    }));

    // Buildings config
    const buildings = [
      // Far background layer
      { x: 0,   w: 55, h: 160, windows: [[8,20],[8,50],[8,80],[30,20],[30,50],[30,80]], layer: 0 },
      { x: 50,  w: 40, h: 200, windows: [[8,20],[8,60],[8,100],[8,140]], layer: 0 },
      { x: 85,  w: 65, h: 140, windows: [[8,20],[8,50],[35,20],[35,50]], layer: 0 },
      { x: 145, w: 50, h: 220, windows: [[8,20],[8,60],[8,100],[8,140],[8,180]], layer: 0 },
      { x: 190, w: 70, h: 170, windows: [[8,20],[8,60],[8,100],[35,20],[35,60],[35,100]], layer: 0 },
      { x: 255, w: 45, h: 190, windows: [[8,20],[8,60],[8,100],[8,140]], layer: 0 },
      { x: 295, w: 80, h: 150, windows: [[8,20],[8,55],[8,90],[40,20],[40,55],[40,90]], layer: 0 },
      { x: 370, w: 55, h: 210, windows: [[8,20],[8,60],[8,100],[8,140],[8,180]], layer: 0 },
      { x: 420, w: 65, h: 175, windows: [[8,20],[8,60],[8,100],[35,20],[35,60]], layer: 0 },

      // Mid layer
      { x: -10, w: 70, h: 230, windows: [[10,20],[10,65],[10,110],[10,155],[38,20],[38,65],[38,110]], layer: 1 },
      { x: 55,  w: 55, h: 270, windows: [[8,20],[8,65],[8,110],[8,155],[8,200],[30,20],[30,65],[30,110],[30,155]], layer: 1 },
      { x: 105, w: 90, h: 200, windows: [[10,20],[10,60],[10,100],[10,140],[45,20],[45,60],[45,100],[45,140]], layer: 1 },
      { x: 190, w: 60, h: 300, windows: [[8,20],[8,65],[8,110],[8,155],[8,200],[8,245],[32,20],[32,65],[32,110],[32,155],[32,200]], layer: 1 },
      { x: 245, w: 75, h: 240, windows: [[10,20],[10,65],[10,110],[10,155],[10,195],[38,20],[38,65],[38,110],[38,155]], layer: 1 },
      { x: 315, w: 55, h: 260, windows: [[8,20],[8,65],[8,110],[8,155],[8,200],[30,20],[30,65],[30,110]], layer: 1 },
      { x: 365, w: 85, h: 220, windows: [[10,20],[10,65],[10,110],[10,155],[42,20],[42,65],[42,110],[42,155]], layer: 1 },
      { x: 445, w: 50, h: 250, windows: [[8,20],[8,65],[8,110],[8,155],[8,200]], layer: 1 },

      // Front layer
      { x: -15, w: 95, h: 320, windows: [[10,20],[10,70],[10,120],[10,170],[10,220],[10,270],[48,20],[48,70],[48,120],[48,170],[48,220]], layer: 2 },
      { x: 75,  w: 70, h: 360, windows: [[8,20],[8,70],[8,120],[8,170],[8,220],[8,270],[8,320],[36,20],[36,70],[36,120],[36,170],[36,220],[36,270]], layer: 2 },
      { x: 140, w: 110, h: 280, windows: [[12,20],[12,70],[12,120],[12,170],[12,220],[55,20],[55,70],[55,120],[55,170],[55,220]], layer: 2 },
      { x: 245, w: 80, h: 340, windows: [[10,20],[10,70],[10,120],[10,170],[10,220],[10,270],[10,310],[40,20],[40,70],[40,120],[40,170],[40,220],[40,270]], layer: 2 },
      { x: 320, w: 65, h: 300, windows: [[8,20],[8,70],[8,120],[8,170],[8,220],[8,260],[33,20],[33,70],[33,120],[33,170],[33,220]], layer: 2 },
      { x: 380, w: 105, h: 260, windows: [[12,20],[12,70],[12,120],[12,170],[12,210],[52,20],[52,70],[52,120],[52,170],[52,210]], layer: 2 },
    ];

    const groundY = H - 80;

    function drawSky() {
      const sky = ctx.createLinearGradient(0, 0, 0, groundY);
      sky.addColorStop(0, "#020208");
      sky.addColorStop(0.4, "#050512");
      sky.addColorStop(0.7, "#080820");
      sky.addColorStop(1, "#0a0a28");
      ctx.fillStyle = sky;
      ctx.fillRect(0, 0, W, groundY);
    }

    function drawStars() {
      stars.forEach((s) => {
        const tw = (Math.sin(t * 0.04 + s.twinkle) + 1) / 2;
        ctx.globalAlpha = 0.3 + tw * 0.6;
        ctx.fillStyle = "#ffffff";
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.r * (0.5 + tw * 0.5), 0, Math.PI * 2);
        ctx.fill();
      });
      ctx.globalAlpha = 1;
    }

    function drawMoon() {
      const mx = W * 0.82, my = 55;
      // Glow
      const glow = ctx.createRadialGradient(mx, my, 5, mx, my, 50);
      glow.addColorStop(0, "rgba(254,228,64,0.15)");
      glow.addColorStop(1, "transparent");
      ctx.fillStyle = glow;
      ctx.beginPath(); ctx.arc(mx, my, 50, 0, Math.PI * 2); ctx.fill();
      // Moon
      ctx.fillStyle = "#FEE440";
      ctx.globalAlpha = 0.85;
      ctx.beginPath(); ctx.arc(mx, my, 22, 0, Math.PI * 2); ctx.fill();
      ctx.globalAlpha = 1;
      // Crescent shadow
      ctx.fillStyle = "#050512";
      ctx.beginPath(); ctx.arc(mx + 8, my - 4, 18, 0, Math.PI * 2); ctx.fill();
    }

    function getBuildingColor(layer) {
      if (layer === 0) return { fill: "#0a0a18", stroke: "#1a1a3a" };
      if (layer === 1) return { fill: "#080816", stroke: "#141430" };
      return { fill: "#050510", stroke: "#0f0f28" };
    }

    function drawBuildings() {
      // Draw back to front
      [0, 1, 2].forEach((layer) => {
        const { fill, stroke } = getBuildingColor(layer);
        buildings.filter(b => b.layer === layer).forEach((b) => {
          const by = groundY - b.h;

          // Building body
          ctx.fillStyle = fill;
          ctx.strokeStyle = stroke;
          ctx.lineWidth = 1;
          ctx.fillRect(b.x, by, b.w, b.h);
          ctx.strokeRect(b.x, by, b.w, b.h);

          // Neon edge glow on some buildings
          if ((b.x + layer) % 3 === 0) {
            const edgeColor = layer === 2 ? "#00F5D4" : layer === 1 ? "#F15BB5" : "#A78BFA";
            ctx.strokeStyle = edgeColor;
            ctx.lineWidth = 1.5;
            ctx.globalAlpha = 0.3 + 0.2 * Math.sin(t * 0.03 + b.x);
            ctx.strokeRect(b.x, by, b.w, b.h);
            ctx.globalAlpha = 1;
          }

          // Windows
          b.windows.forEach(([wx, wy], wi) => {
            const isLit = Math.sin(t * 0.02 + b.x + wi * 7.3) > -0.6;
            const flicker = Math.sin(t * 0.15 + wi * 3.7) > 0.95;
            if (isLit && !flicker) {
              const winColors = ["#FEE44099", "#00F5D455", "#F15BB555", "#ffffff44", "#A78BFA55"];
              const wc = winColors[(b.x + wi) % winColors.length];
              ctx.fillStyle = wc;
              ctx.fillRect(b.x + wx, by + wy, 10, 8);
              // Window glow
              ctx.fillStyle = wc.slice(0, 7) + "22";
              ctx.fillRect(b.x + wx - 2, by + wy - 2, 14, 12);
            } else {
              ctx.fillStyle = "#0a0a1a";
              ctx.fillRect(b.x + wx, by + wy, 10, 8);
            }
          });

          // Rooftop antenna on some buildings
          if (b.h > 250 && layer === 2) {
            ctx.strokeStyle = "#333355";
            ctx.lineWidth = 1.5;
            ctx.beginPath();
            ctx.moveTo(b.x + b.w / 2, by);
            ctx.lineTo(b.x + b.w / 2, by - 20);
            ctx.stroke();
            // Blinking red light
            const blink = Math.floor(t / 25) % 2 === 0;
            ctx.fillStyle = blink ? "#ff4444" : "#660000";
            ctx.globalAlpha = blink ? 0.9 : 0.3;
            ctx.beginPath();
            ctx.arc(b.x + b.w / 2, by - 22, 3, 0, Math.PI * 2);
            ctx.fill();
            ctx.globalAlpha = 1;
          }
        });
      });
    }

    function drawNeonSigns() {
      const signs = [
        { x: 85, y: groundY - 195, text: "REACT", color: "#00F5D4" },
        { x: 255, y: groundY - 270, text: "DEV", color: "#F15BB5" },
        { x: 390, y: groundY - 185, text: "CODE", color: "#A78BFA" },
      ];
      signs.forEach(({ x, y, text, color }) => {
        const pulse = 0.6 + 0.4 * Math.sin(t * 0.05 + x);
        ctx.globalAlpha = pulse;
        ctx.font = "bold 11px 'Courier New', monospace";
        ctx.fillStyle = color;
        ctx.shadowColor = color;
        ctx.shadowBlur = 12;
        ctx.fillText(text, x, y);
        ctx.shadowBlur = 0;
        ctx.globalAlpha = 1;
      });
    }

    function drawGround() {
      // Road
      const road = ctx.createLinearGradient(0, groundY, 0, H);
      road.addColorStop(0, "#070714");
      road.addColorStop(1, "#050510");
      ctx.fillStyle = road;
      ctx.fillRect(0, groundY, W, H - groundY);

      // Road lines
      for (let rx = -60 + (t * 1.2 % 80); rx < W + 80; rx += 80) {
        ctx.fillStyle = "rgba(254,228,64,0.4)";
        ctx.fillRect(rx, groundY + 35, 40, 4);
      }

      // Reflection on road
      const refl = ctx.createLinearGradient(0, groundY, 0, H);
      refl.addColorStop(0, "rgba(0,245,212,0.06)");
      refl.addColorStop(0.5, "rgba(241,91,181,0.04)");
      refl.addColorStop(1, "transparent");
      ctx.fillStyle = refl;
      ctx.fillRect(0, groundY, W, H - groundY);

      // Sidewalk glow strips
      ctx.fillStyle = "rgba(0,245,212,0.15)";
      ctx.fillRect(0, groundY - 2, W, 3);
      ctx.fillStyle = "rgba(241,91,181,0.1)";
      ctx.fillRect(0, groundY - 6, W, 2);
    }

    function drawRain() {
      rainDrops.forEach((drop) => {
        ctx.globalAlpha = drop.alpha;
        ctx.strokeStyle = drop.color;
        ctx.lineWidth = 0.8;
        ctx.beginPath();
        ctx.moveTo(drop.x, drop.y);
        ctx.lineTo(drop.x - 1, drop.y + drop.length);
        ctx.stroke();
        drop.y += drop.speed;
        if (drop.y > groundY) {
          drop.y = -drop.length;
          drop.x = Math.random() * W;
        }
      });
      ctx.globalAlpha = 1;
    }

    function drawFloatingCode() {
      floatingChars.forEach((fc) => {
        fc.y -= fc.speed * 0.4;
        if (fc.y < -20) fc.y = groundY;
        const a = fc.alpha * (0.5 + 0.5 * Math.sin(t * 0.05 + fc.x));
        ctx.globalAlpha = a;
        ctx.fillStyle = fc.color;
        ctx.font = `${fc.size}px 'Courier New', monospace`;
        ctx.fillText(fc.char, fc.x, fc.y);
      });
      ctx.globalAlpha = 1;
    }

    function drawSilhouette() {
      const sx = W / 2 - 10;
      const sy = groundY - 10;

      // Subtle glow beneath
      const footGlow = ctx.createRadialGradient(sx, sy, 2, sx, sy, 50);
      footGlow.addColorStop(0, "rgba(0,245,212,0.25)");
      footGlow.addColorStop(1, "transparent");
      ctx.fillStyle = footGlow;
      ctx.beginPath();
      ctx.ellipse(sx, sy, 50, 14, 0, 0, Math.PI * 2);
      ctx.fill();

      ctx.fillStyle = "#000008";
      ctx.shadowColor = "#00F5D4";
      ctx.shadowBlur = 18;

      // Legs
      ctx.beginPath();
      ctx.moveTo(sx - 14, sy - 70);
      ctx.lineTo(sx - 20, sy);
      ctx.lineTo(sx - 8, sy);
      ctx.lineTo(sx - 4, sy - 60);
      ctx.closePath();
      ctx.fill();

      ctx.beginPath();
      ctx.moveTo(sx + 14, sy - 70);
      ctx.lineTo(sx + 20, sy);
      ctx.lineTo(sx + 8, sy);
      ctx.lineTo(sx + 4, sy - 60);
      ctx.closePath();
      ctx.fill();

      // Body
      ctx.beginPath();
      ctx.moveTo(sx - 22, sy - 140);
      ctx.lineTo(sx - 18, sy - 70);
      ctx.lineTo(sx + 18, sy - 70);
      ctx.lineTo(sx + 22, sy - 140);
      ctx.closePath();
      ctx.fill();

      // Laptop in hands (glowing screen)
      const lapX = sx - 28;
      const lapY = sy - 115;
      ctx.fillStyle = "#050510";
      ctx.shadowBlur = 0;
      roundRect(ctx, lapX, lapY, 56, 36, 4);
      ctx.fill();

      // Screen glow
      const screenGlow = ctx.createRadialGradient(lapX + 28, lapY + 18, 2, lapX + 28, lapY + 18, 30);
      screenGlow.addColorStop(0, "rgba(0,245,212,0.6)");
      screenGlow.addColorStop(0.5, "rgba(0,245,212,0.2)");
      screenGlow.addColorStop(1, "transparent");
      ctx.fillStyle = screenGlow;
      roundRect(ctx, lapX + 2, lapY + 2, 52, 32, 3);
      ctx.fill();

      // Code lines on laptop screen
      const lineColors = ["#00F5D4", "#F15BB5", "#FEE440", "#A78BFA", "#00F5D4"];
      for (let li = 0; li < 5; li++) {
        const lineW = 10 + Math.random() * 25;
        const scrollOff = (t * 0.5 + li * 8) % 40;
        ctx.fillStyle = lineColors[li];
        ctx.globalAlpha = 0.7 + 0.3 * Math.sin(t * 0.1 + li);
        ctx.fillRect(lapX + 5, lapY + 5 + li * 5.5 - (scrollOff > 30 ? 0 : 0), lineW, 3);
      }
      ctx.globalAlpha = 1;

      // Arms holding laptop
      ctx.fillStyle = "#000008";
      ctx.shadowColor = "#00F5D4";
      ctx.shadowBlur = 10;

      // Left arm
      ctx.beginPath();
      ctx.moveTo(sx - 22, sy - 135);
      ctx.quadraticCurveTo(sx - 40, sy - 110, sx - 28, sy - 100);
      ctx.lineTo(sx - 20, sy - 108);
      ctx.quadraticCurveTo(sx - 32, sy - 118, sx - 16, sy - 128);
      ctx.closePath();
      ctx.fill();

      // Right arm
      ctx.beginPath();
      ctx.moveTo(sx + 22, sy - 135);
      ctx.quadraticCurveTo(sx + 40, sy - 110, sx + 28, sy - 100);
      ctx.lineTo(sx + 20, sy - 108);
      ctx.quadraticCurveTo(sx + 32, sy - 118, sx + 16, sy - 128);
      ctx.closePath();
      ctx.fill();

      // Head
      ctx.beginPath();
      ctx.ellipse(sx, sy - 165, 20, 22, 0, 0, Math.PI * 2);
      ctx.fill();

      // Hair
      ctx.beginPath();
      ctx.ellipse(sx, sy - 180, 21, 12, 0, 0, Math.PI);
      ctx.fill();

      ctx.shadowBlur = 0;

      // Screen light casting on face
      const faceLight = ctx.createRadialGradient(lapX + 28, lapY, 5, sx, sy - 160, 35);
      faceLight.addColorStop(0, "rgba(0,245,212,0.12)");
      faceLight.addColorStop(1, "transparent");
      ctx.fillStyle = faceLight;
      ctx.beginPath();
      ctx.ellipse(sx, sy - 160, 30, 35, 0, 0, Math.PI * 2);
      ctx.fill();

      // Headphones silhouette
      ctx.strokeStyle = "#000010";
      ctx.lineWidth = 6;
      ctx.shadowColor = "#00F5D4";
      ctx.shadowBlur = 8;
      ctx.beginPath();
      ctx.arc(sx, sy - 172, 23, Math.PI + 0.4, -0.4);
      ctx.stroke();
      ctx.shadowBlur = 0;

      // Ear cups
      ctx.fillStyle = "#00F5D4";
      ctx.globalAlpha = 0.7;
      ctx.beginPath(); ctx.ellipse(sx - 22, sy - 163, 5, 7, 0, 0, Math.PI * 2); ctx.fill();
      ctx.beginPath(); ctx.ellipse(sx + 22, sy - 163, 5, 7, 0, 0, Math.PI * 2); ctx.fill();
      ctx.globalAlpha = 1;
    }

    function drawNeonReflections() {
      // Puddle reflections on ground
      const reflections = [
        { x: 60, color: "#00F5D4" },
        { x: 190, color: "#F15BB5" },
        { x: 340, color: "#FEE440" },
        { x: 430, color: "#A78BFA" },
      ];
      reflections.forEach(({ x, color }) => {
        const pulse = 0.3 + 0.2 * Math.sin(t * 0.04 + x);
        ctx.globalAlpha = pulse;
        const refl = ctx.createLinearGradient(x - 20, groundY, x + 20, groundY + 40);
        refl.addColorStop(0, color);
        refl.addColorStop(1, "transparent");
        ctx.fillStyle = refl;
        ctx.beginPath();
        ctx.ellipse(x, groundY + 20, 18, 8, 0, 0, Math.PI * 2);
        ctx.fill();
      });
      ctx.globalAlpha = 1;
    }

    function drawHUD() {
      // Floating tech labels around the scene
      const labels = [
        { x: 30, y: 120, text: "REACT.JS", color: "#00F5D4" },
        { x: W - 95, y: 90, text: "TAILWIND", color: "#A78BFA" },
        { x: 20, y: H - 120, text: "FRONTEND", color: "#F15BB5" },
        { x: W - 110, y: H - 130, text: "DEVELOPER", color: "#FEE440" },
      ];
      labels.forEach(({ x, y, text, color }) => {
        const alpha = 0.25 + 0.15 * Math.sin(t * 0.03 + x);
        ctx.globalAlpha = alpha;
        ctx.font = "bold 9px 'Courier New', monospace";
        ctx.fillStyle = color;
        ctx.fillText(text, x, y);
        // Underline
        ctx.fillStyle = color;
        ctx.fillRect(x, y + 2, ctx.measureText(text).width, 1);
      });
      ctx.globalAlpha = 1;
    }

    function draw() {
      ctx.clearRect(0, 0, W, H);
      drawSky();
      drawStars();
      drawMoon();
      drawFloatingCode();
      drawBuildings();
      drawNeonSigns();
      drawGround();
      drawNeonReflections();
      drawRain();
      drawSilhouette();
      drawHUD();
      t++;
      animFrame = requestAnimationFrame(draw);
    }

    draw();
    return () => cancelAnimationFrame(animFrame);
  }, []);

  return (
    <div className="relative flex items-center justify-center w-full h-full">
      <div className="absolute w-80 h-80 rounded-full bg-primary/5 blur-3xl animate-pulse" />
      <canvas
        ref={canvasRef}
        className="relative z-10 w-full h-full rounded-2xl"
        style={{ maxWidth: "480px", maxHeight: "500px" }}
      />
    </div>
  );
}

function roundRect(ctx, x, y, w, h, r) {
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.lineTo(x + w - r, y);
  ctx.quadraticCurveTo(x + w, y, x + w, y + r);
  ctx.lineTo(x + w, y + h - r);
  ctx.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
  ctx.lineTo(x + r, y + h);
  ctx.quadraticCurveTo(x, y + h, x, y + h - r);
  ctx.lineTo(x, y + r);
  ctx.quadraticCurveTo(x, y, x + r, y);
  ctx.closePath();
}

export default function Hero() {
  const [roleIdx, setRoleIdx] = useState(0);
  const [displayed, setDisplayed] = useState("");
  const [typing, setTyping] = useState(true);

  useEffect(() => {
    let timeout;
    const current = roles[roleIdx];
    if (typing) {
      if (displayed.length < current.length) {
        timeout = setTimeout(() => setDisplayed(current.slice(0, displayed.length + 1)), 80);
      } else {
        timeout = setTimeout(() => setTyping(false), 2000);
      }
    } else {
      if (displayed.length > 0) {
        timeout = setTimeout(() => setDisplayed(displayed.slice(0, -1)), 40);
      } else {
        setRoleIdx((i) => (i + 1) % roles.length);
        setTyping(true);
      }
    }
    return () => clearTimeout(timeout);
  }, [displayed, typing, roleIdx]);

  return (
    <section id="home" className="relative min-h-screen flex items-center overflow-hidden noise-bg">
      <div className="absolute inset-0 hero-glow" />
      <div className="absolute top-20 left-10 w-72 h-72 rounded-full bg-primary/5 blur-3xl" />
      <div className="absolute bottom-20 right-10 w-96 h-96 rounded-full bg-secondary/5 blur-3xl" />
      <div
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage: `linear-gradient(#00F5D4 1px, transparent 1px), linear-gradient(90deg, #00F5D4 1px, transparent 1px)`,
          backgroundSize: "60px 60px",
        }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-10 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center min-h-[85vh]">

          {/* Left */}
          <div className="space-y-5 order-2 lg:order-1">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20">
              <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
              <span className="font-mono text-primary text-sm">Available for opportunities</span>
            </div>

            <div>
              <div className="flex items-center gap-3 mb-2">
                <p className="font-body text-gray-400 text-lg">Hello, I'm</p>
                <span className="text-2xl animate-wave inline-block">👋</span>
              </div>
              <h1 className="font-display font-extrabold text-4xl sm:text-5xl lg:text-6xl xl:text-7xl leading-none">
                <span className="gradient-text">Chakali</span>
                <br />
                <span className="text-white">Ravindra</span>
              </h1>
            </div>

            <div className="flex flex-wrap items-center gap-2 sm:gap-3">
              <span className="text-gray-400 font-body text-base sm:text-lg">I'm a</span>
              <span className="font-display font-bold text-xl sm:text-2xl text-primary">
                {displayed}
                <span className="inline-block w-0.5 h-6 sm:h-7 bg-primary ml-0.5 animate-pulse" />
              </span>
            </div>

            <p className="font-body text-gray-400 text-sm sm:text-base leading-relaxed max-w-lg">
              Passionate Frontend Developer crafting beautiful, performant web experiences with{" "}
              <span className="text-primary font-medium">React.js</span> &{" "}
              <span className="text-secondary font-medium">Tailwind CSS</span>. MBA student bridging
              business thinking with technical execution. Based in{" "}
              <span className="text-accent font-medium">Anantapur, AP</span>.
            </p>

            <div className="flex flex-wrap gap-3 sm:gap-4">
              <a
                href="#projects"
                onClick={(e) => { e.preventDefault(); document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" }); }}
                className="px-5 sm:px-7 py-3 sm:py-3.5 rounded-xl bg-gradient-to-r from-primary to-secondary text-dark font-display font-bold text-sm sm:text-base transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-primary/30"
              >
                View My Work 🚀
              </a>
              <a
                href="mailto:ravindrachakali21@gmail.com"
                className="px-5 sm:px-7 py-3 sm:py-3.5 rounded-xl gradient-border bg-card font-display font-bold text-sm sm:text-base text-white transition-all duration-300 hover:scale-105 hover:bg-primary/5"
              >
                Get In Touch ✉️
              </a>
            </div>

            <div className="pt-1 space-y-2">
              <span className="text-gray-500 text-sm font-body">Connect:</span>
              <div className="flex flex-wrap gap-2">
                {[
                  { label: "GitHub", href: "https://github.com/ravindrachakali21-png", icon: "🐙" },
                  { label: "LinkedIn", href: "https://linkedin.com/in/chakaliravindra", icon: "💼" },
                  { label: "Email", href: "mailto:ravindrachakali21@gmail.com", icon: "📧" },
                  { label: "+91 93912 16535", href: "tel:9391216535", icon: "📞" },
                ].map((s) => (
                  <a
                    key={s.label}
                    href={s.href}
                    target={s.href.startsWith("http") ? "_blank" : undefined}
                    rel={s.href.startsWith("http") ? "noreferrer" : undefined}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-card border border-border text-gray-400 hover:text-primary hover:border-primary/30 transition-all duration-300 text-xs font-body whitespace-nowrap"
                  >
                    <span>{s.icon}</span>
                    <span>{s.label}</span>
                  </a>
                ))}
              </div>
            </div>

            <div className="flex flex-wrap gap-6 sm:gap-8 pt-2">
              {[
                { num: "5+", label: "Projects Live" },
                { num: "1+", label: "Year Experience" },
                { num: "5+", label: "Technologies" },
              ].map((stat) => (
                <div key={stat.label} className="text-center">
                  <div className="font-display font-extrabold text-2xl sm:text-3xl gradient-text">{stat.num}</div>
                  <div className="font-body text-gray-500 text-xs mt-1">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Right: Neon City Canvas */}
          <div className="relative order-1 lg:order-2 flex items-center justify-center h-80 sm:h-96 lg:h-[520px]">
            <NeonCityAnimation />
          </div>
        </div>
      </div>

      <div className="absolute bottom-6 sm:bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-bounce2">
        <span className="text-gray-500 text-xs font-mono">scroll down</span>
        <div className="w-5 h-9 rounded-full border-2 border-gray-600 flex items-start justify-center p-1">
          <div className="w-1.5 h-3 rounded-full bg-primary animate-bounce" />
        </div>
      </div>
    </section>
  );
}
