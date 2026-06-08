import { useState, useEffect, useRef } from "react";

const roles = [
  "Frontend Developer",
  "React.js Specialist",
  "UI/UX Enthusiast",
  "MBA Candidate",
  "Problem Solver",
];

function TechManAnimation() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    let animFrame;
    let t = 0;

    const W = canvas.width = 420;
    const H = canvas.height = 480;

    // Floating particles
    const particles = Array.from({ length: 40 }, () => ({
      x: Math.random() * W,
      y: Math.random() * H,
      r: Math.random() * 2 + 0.5,
      vx: (Math.random() - 0.5) * 0.4,
      vy: (Math.random() - 0.5) * 0.4,
      color: ["#00F5D4", "#F15BB5", "#FEE440", "#A78BFA"][Math.floor(Math.random() * 4)],
      alpha: Math.random() * 0.6 + 0.2,
    }));

    const codeLines = [
      "const dev = new Ravindra();",
      "import React from 'react';",
      "npm run build --prod",
      "git push origin main",
      "tailwind.config.js",
      "const [state, set] = useState();",
      "export default function App()",
      "vercel --prod deploy ✓",
      "<Component props={data} />",
      "npm install tailwindcss",
      "useEffect(() => { ... }, [])",
      "flex items-center gap-4",
    ];
    const scrollingCode = codeLines.map((line, i) => ({
      text: line,
      x: W + Math.random() * 100,
      y: 30 + i * 36,
      speed: 0.4 + Math.random() * 0.3,
      color: ["#00F5D490", "#F15BB590", "#FEE44090", "#A78BFA90"][i % 4],
      size: 10 + Math.random() * 2,
    }));

    const circuitNodes = [
      { x: 60, y: 80 }, { x: 150, y: 60 }, { x: 260, y: 80 },
      { x: 340, y: 120 }, { x: 380, y: 200 }, { x: 340, y: 320 },
      { x: 260, y: 390 }, { x: 150, y: 410 }, { x: 60, y: 360 },
      { x: 30, y: 240 }, { x: 210, y: 30 }, { x: 210, y: 450 },
    ];

    function drawCircuit(time) {
      ctx.lineWidth = 1;
      for (let i = 0; i < circuitNodes.length; i++) {
        const a = circuitNodes[i];
        const b = circuitNodes[(i + 1) % circuitNodes.length];
        const grad = ctx.createLinearGradient(a.x, a.y, b.x, b.y);
        const pulse = (Math.sin(time * 0.02 + i) + 1) / 2;
        grad.addColorStop(0, `rgba(0,245,212,${0.1 + pulse * 0.3})`);
        grad.addColorStop(1, `rgba(241,91,181,${0.1 + pulse * 0.3})`);
        ctx.strokeStyle = grad;
        ctx.beginPath();
        ctx.moveTo(a.x, a.y);
        ctx.lineTo(a.x, b.y);
        ctx.lineTo(b.x, b.y);
        ctx.stroke();

        const nodePulse = (Math.sin(time * 0.03 + i * 0.7) + 1) / 2;
        ctx.beginPath();
        ctx.arc(a.x, a.y, 3 + nodePulse * 2, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(0,245,212,${0.4 + nodePulse * 0.6})`;
        ctx.fill();

        ctx.beginPath();
        ctx.arc(a.x, a.y, 8 + nodePulse * 4, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(0,245,212,${0.05 + nodePulse * 0.08})`;
        ctx.fill();
      }
    }

    function drawTechMan(time) {
      const cx = W / 2;
      const baseY = 100;

      const aura = ctx.createRadialGradient(cx, baseY + 130, 20, cx, baseY + 130, 120);
      aura.addColorStop(0, "rgba(0,245,212,0.12)");
      aura.addColorStop(0.5, "rgba(241,91,181,0.06)");
      aura.addColorStop(1, "transparent");
      ctx.fillStyle = aura;
      ctx.beginPath();
      ctx.ellipse(cx, baseY + 150, 130, 150, 0, 0, Math.PI * 2);
      ctx.fill();

      const monY = baseY + 185;
      ctx.fillStyle = "#0d1117";
      ctx.strokeStyle = "#00F5D4";
      ctx.lineWidth = 2;
      roundRect(ctx, cx - 75, monY, 150, 100, 8);
      ctx.fill();
      ctx.stroke();

      const screenGlow = ctx.createLinearGradient(cx - 65, monY + 8, cx + 65, monY + 90);
      screenGlow.addColorStop(0, "#050510");
      screenGlow.addColorStop(1, "#0a0a20");
      ctx.fillStyle = screenGlow;
      roundRect(ctx, cx - 65, monY + 8, 130, 82, 4);
      ctx.fill();

      const codeSnippets = [
        { text: "import React", color: "#00F5D4", y: 0 },
        { text: "  from 'react';", color: "#A78BFA", y: 1 },
        { text: "const App = () => {", color: "#FEE440", y: 2 },
        { text: "  return <UI />;", color: "#F15BB5", y: 3 },
        { text: "}", color: "#00F5D4", y: 4 },
      ];
      ctx.font = "bold 8px 'Courier New', monospace";
      codeSnippets.forEach((line) => {
        ctx.globalAlpha = 0.6 + 0.4 * Math.sin(time * 0.04 + line.y * 0.8);
        ctx.fillStyle = line.color;
        ctx.fillText(line.text, cx - 60, monY + 22 + line.y * 14);
      });
      ctx.globalAlpha = 1;

      if (Math.floor(time / 30) % 2 === 0) {
        ctx.fillStyle = "#00F5D4";
        ctx.fillRect(cx - 60 + ctx.measureText("  return <UI />;").width * 0.5, monY + 22 + 3 * 14 - 8, 5, 9);
      }

      ctx.fillStyle = "#1a1a2e";
      ctx.fillRect(cx - 8, monY + 100, 16, 20);
      ctx.fillStyle = "#111";
      ctx.fillRect(cx - 25, monY + 118, 50, 6);

      ctx.fillStyle = "#1a1a2e";
      ctx.strokeStyle = "#333";
      ctx.lineWidth = 1.5;
      roundRect(ctx, cx - 50, baseY + 290, 100, 18, 5);
      ctx.fill(); ctx.stroke();
      roundRect(ctx, cx - 45, baseY + 200, 90, 90, 8);
      ctx.fill(); ctx.stroke();
      ctx.strokeStyle = "#222";
      ctx.lineWidth = 3;
      [[cx - 35, baseY + 308, cx - 45, baseY + 350],
       [cx + 35, baseY + 308, cx + 45, baseY + 350],
       [cx - 20, baseY + 308, cx - 20, baseY + 345],
       [cx + 20, baseY + 308, cx + 20, baseY + 345]].forEach(([x1, y1, x2, y2]) => {
        ctx.beginPath(); ctx.moveTo(x1, y1); ctx.lineTo(x2, y2); ctx.stroke();
      });

      ctx.fillStyle = "#0f3460";
      roundRect(ctx, cx - 30, baseY + 250, 24, 52, 6); ctx.fill();
      roundRect(ctx, cx + 6, baseY + 250, 24, 52, 6); ctx.fill();
      ctx.fillStyle = "#111";
      roundRect(ctx, cx - 38, baseY + 295, 32, 12, 4); ctx.fill();
      roundRect(ctx, cx + 6, baseY + 295, 32, 12, 4); ctx.fill();
      ctx.fillStyle = "#00F5D4";
      ctx.fillRect(cx - 36, baseY + 303, 28, 2);
      ctx.fillStyle = "#F15BB5";
      ctx.fillRect(cx + 8, baseY + 303, 28, 2);

      ctx.fillStyle = "#16213e";
      roundRect(ctx, cx - 38, baseY + 175, 76, 80, 10); ctx.fill();
      ctx.fillStyle = "#0f3460";
      ctx.beginPath(); ctx.moveTo(cx, baseY + 175); ctx.lineTo(cx - 18, baseY + 215); ctx.lineTo(cx, baseY + 230); ctx.closePath(); ctx.fill();
      ctx.beginPath(); ctx.moveTo(cx, baseY + 175); ctx.lineTo(cx + 18, baseY + 215); ctx.lineTo(cx, baseY + 230); ctx.closePath(); ctx.fill();
      ctx.fillStyle = "#e94560";
      ctx.fillRect(cx - 8, baseY + 180, 16, 40);
      ctx.fillStyle = "#00F5D4";
      ctx.font = "bold 7px monospace";
      ctx.fillText("< />", cx - 14, baseY + 168);

      const typingOffset = Math.sin(time * 0.12) * 4;
      const typingOffsetR = Math.sin(time * 0.12 + 1) * 4;

      ctx.fillStyle = "#16213e";
      roundRect(ctx, cx - 62, baseY + 178, 26, 65, 10); ctx.fill();
      ctx.fillStyle = "#FBBF7A";
      ctx.beginPath(); ctx.ellipse(cx - 52, baseY + 250 + typingOffset, 14, 11, 0, 0, Math.PI * 2); ctx.fill();
      for (let f = 0; f < 4; f++) {
        ctx.fillStyle = "#F5A55A";
        ctx.beginPath();
        ctx.ellipse(cx - 62 + f * 8, baseY + 244 + typingOffset - (f === 1 || f === 2 ? 3 : 0), 3, 7, 0, 0, Math.PI * 2);
        ctx.fill();
      }

      ctx.fillStyle = "#16213e";
      roundRect(ctx, cx + 36, baseY + 178, 26, 65, 10); ctx.fill();
      ctx.fillStyle = "#FBBF7A";
      ctx.beginPath(); ctx.ellipse(cx + 52, baseY + 250 + typingOffsetR, 14, 11, 0, 0, Math.PI * 2); ctx.fill();
      for (let f = 0; f < 4; f++) {
        ctx.fillStyle = "#F5A55A";
        ctx.beginPath();
        ctx.ellipse(cx + 37 + f * 8, baseY + 244 + typingOffsetR - (f === 1 || f === 2 ? 3 : 0), 3, 7, 0, 0, Math.PI * 2);
        ctx.fill();
      }

      ctx.fillStyle = "#0d0d1a";
      ctx.strokeStyle = "#00F5D430";
      ctx.lineWidth = 1;
      roundRect(ctx, cx - 70, baseY + 258, 140, 28, 5);
      ctx.fill(); ctx.stroke();
      for (let row = 0; row < 2; row++) {
        for (let col = 0; col < 10; col++) {
          const isPressed = Math.floor(time / 8) % 10 === col && row === Math.floor(time / 80) % 2;
          ctx.fillStyle = isPressed ? "#00F5D4" : "#1a1a2e";
          ctx.strokeStyle = isPressed ? "#00F5D4" : "#333";
          roundRect(ctx, cx - 64 + col * 13, baseY + 262 + row * 11, 11, 9, 2);
          ctx.fill(); ctx.stroke();
        }
      }

      ctx.fillStyle = "#FBBF7A";
      roundRect(ctx, cx - 12, baseY + 158, 24, 22, 6); ctx.fill();

      ctx.fillStyle = "#FBBF7A";
      ctx.beginPath(); ctx.ellipse(cx, baseY + 120, 44, 48, 0, 0, Math.PI * 2); ctx.fill();

      ctx.fillStyle = "#1a0500";
      ctx.beginPath(); ctx.ellipse(cx, baseY + 90, 44, 30, 0, 0, Math.PI); ctx.fill();
      [[cx - 25, baseY + 72], [cx - 10, baseY + 65], [cx + 8, baseY + 65], [cx + 25, baseY + 72]].forEach(([hx, hy]) => {
        ctx.beginPath();
        ctx.ellipse(hx, hy, 7, 12, (hx < cx ? -0.3 : 0.3), 0, Math.PI * 2);
        ctx.fill();
      });

      ctx.fillStyle = "white";
      ctx.beginPath(); ctx.ellipse(cx - 15, baseY + 118, 9, 10, 0, 0, Math.PI * 2); ctx.fill();
      ctx.beginPath(); ctx.ellipse(cx + 15, baseY + 118, 9, 10, 0, 0, Math.PI * 2); ctx.fill();
      ctx.fillStyle = "#1a1a2e";
      ctx.beginPath(); ctx.ellipse(cx - 14, baseY + 120, 6, 7, 0, 0, Math.PI * 2); ctx.fill();
      ctx.beginPath(); ctx.ellipse(cx + 16, baseY + 120, 6, 7, 0, 0, Math.PI * 2); ctx.fill();
      ctx.fillStyle = "#00F5D4";
      ctx.beginPath(); ctx.ellipse(cx - 13, baseY + 118, 2.5, 3, 0, 0, Math.PI * 2); ctx.fill();
      ctx.beginPath(); ctx.ellipse(cx + 17, baseY + 118, 2.5, 3, 0, 0, Math.PI * 2); ctx.fill();
      ctx.fillStyle = "white";
      ctx.beginPath(); ctx.arc(cx - 11, baseY + 116, 1.5, 0, Math.PI * 2); ctx.fill();
      ctx.beginPath(); ctx.arc(cx + 19, baseY + 116, 1.5, 0, Math.PI * 2); ctx.fill();

      ctx.strokeStyle = "#1a0500";
      ctx.lineWidth = 2.5;
      ctx.lineCap = "round";
      ctx.beginPath(); ctx.moveTo(cx - 24, baseY + 106); ctx.quadraticCurveTo(cx - 14, baseY + 101, cx - 5, baseY + 106); ctx.stroke();
      ctx.beginPath(); ctx.moveTo(cx + 5, baseY + 106); ctx.quadraticCurveTo(cx + 14, baseY + 101, cx + 24, baseY + 106); ctx.stroke();

      ctx.fillStyle = "#E09060";
      ctx.beginPath(); ctx.ellipse(cx, baseY + 131, 4, 3.5, 0, 0, Math.PI * 2); ctx.fill();

      ctx.strokeStyle = "#b06030";
      ctx.lineWidth = 2;
      ctx.beginPath(); ctx.arc(cx, baseY + 138, 12, 0.2, Math.PI - 0.2); ctx.stroke();

      ctx.fillStyle = "rgba(241,91,181,0.18)";
      ctx.beginPath(); ctx.ellipse(cx - 28, baseY + 136, 10, 7, 0, 0, Math.PI * 2); ctx.fill();
      ctx.beginPath(); ctx.ellipse(cx + 28, baseY + 136, 10, 7, 0, 0, Math.PI * 2); ctx.fill();

      ctx.fillStyle = "#FBBF7A";
      ctx.beginPath(); ctx.ellipse(cx - 43, baseY + 122, 6, 9, 0, 0, Math.PI * 2); ctx.fill();
      ctx.beginPath(); ctx.ellipse(cx + 43, baseY + 122, 6, 9, 0, 0, Math.PI * 2); ctx.fill();

      ctx.strokeStyle = "#00F5D4";
      ctx.lineWidth = 5;
      ctx.lineCap = "round";
      ctx.beginPath(); ctx.arc(cx, baseY + 95, 46, Math.PI + 0.3, -0.3); ctx.stroke();
      ctx.fillStyle = "#00F5D4";
      roundRect(ctx, cx - 53, baseY + 108, 14, 22, 7); ctx.fill();
      roundRect(ctx, cx + 39, baseY + 108, 14, 22, 7); ctx.fill();
      const ledPulse = (Math.sin(time * 0.1) + 1) / 2;
      ctx.fillStyle = `rgba(254,228,64,${0.6 + ledPulse * 0.4})`;
      ctx.beginPath(); ctx.arc(cx - 46, baseY + 119, 2.5, 0, Math.PI * 2); ctx.fill();
      ctx.beginPath(); ctx.arc(cx + 46, baseY + 119, 2.5, 0, Math.PI * 2); ctx.fill();

      const icons = [
        { emoji: "⚛️", ox: -140, oy: -80, phase: 0 },
        { emoji: "🎨", ox: 130, oy: -60, phase: 1.5 },
        { emoji: "⚡", ox: -150, oy: 60, phase: 0.8 },
        { emoji: "🌐", ox: 140, oy: 80, phase: 2.2 },
        { emoji: "📱", ox: -120, oy: 160, phase: 1.1 },
        { emoji: "🚀", ox: 120, oy: 160, phase: 1.8 },
      ];
      ctx.font = "22px serif";
      icons.forEach(({ emoji, ox, oy, phase }) => {
        const floatY = Math.sin(time * 0.025 + phase) * 10;
        const floatX = Math.cos(time * 0.018 + phase) * 5;
        const alpha = 0.7 + 0.3 * Math.sin(time * 0.03 + phase);
        ctx.globalAlpha = alpha;
        ctx.fillText(emoji, cx + ox + floatX, baseY + 150 + oy + floatY);
      });
      ctx.globalAlpha = 1;

      const badges = [
        { text: "<React />", x: cx - 160, baseOY: 30, color: "#00F5D4", phase: 0 },
        { text: "npm i", x: cx + 105, baseOY: 20, color: "#FEE440", phase: 1 },
        { text: "CSS3", x: cx + 115, baseOY: 200, color: "#F15BB5", phase: 2 },
        { text: "useState", x: cx - 165, baseOY: 210, color: "#A78BFA", phase: 1.5 },
      ];
      ctx.font = "bold 11px 'Courier New', monospace";
      badges.forEach(({ text, x, baseOY, color, phase }) => {
        const by = baseOY + Math.sin(time * 0.022 + phase) * 8;
        const bAlpha = 0.5 + 0.4 * Math.sin(time * 0.04 + phase);
        ctx.globalAlpha = bAlpha;
        ctx.fillStyle = color;
        ctx.fillText(text, x, by);
      });
      ctx.globalAlpha = 1;

      ctx.fillStyle = "rgba(0,245,212,0.08)";
      ctx.beginPath();
      ctx.ellipse(cx, baseY + 362, 70, 12, 0, 0, Math.PI * 2);
      ctx.fill();
    }

    function drawScrollingCode(time) {
      ctx.font = "bold 10px 'Courier New', monospace";
      scrollingCode.forEach((line) => {
        line.x -= line.speed;
        if (line.x < -ctx.measureText(line.text).width) {
          line.x = W + 50;
          line.y = 30 + Math.floor(Math.random() * 12) * 36;
        }
        ctx.globalAlpha = 0.18;
        ctx.fillStyle = line.color;
        ctx.fillText(line.text, line.x, line.y);
      });
      ctx.globalAlpha = 1;
    }

    function drawParticles() {
      particles.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0 || p.x > W) p.vx *= -1;
        if (p.y < 0 || p.y > H) p.vy *= -1;
        ctx.globalAlpha = p.alpha * (0.5 + 0.5 * Math.sin(t * 0.05 + p.x));
        ctx.fillStyle = p.color;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fill();
      });
      ctx.globalAlpha = 1;
    }

    function draw() {
      ctx.clearRect(0, 0, W, H);
      const bg = ctx.createRadialGradient(W / 2, H / 2, 0, W / 2, H / 2, 220);
      bg.addColorStop(0, "rgba(0,245,212,0.04)");
      bg.addColorStop(0.5, "rgba(241,91,181,0.02)");
      bg.addColorStop(1, "transparent");
      ctx.fillStyle = bg;
      ctx.fillRect(0, 0, W, H);
      drawScrollingCode(t);
      drawCircuit(t);
      drawParticles();
      drawTechMan(t);
      t++;
      animFrame = requestAnimationFrame(draw);
    }

    draw();
    return () => cancelAnimationFrame(animFrame);
  }, []);

  return (
    <div className="relative flex items-center justify-center w-full h-full">
      <div className="absolute w-64 h-64 rounded-full bg-primary/8 blur-3xl animate-pulse" />
      <canvas
        ref={canvasRef}
        className="relative z-10 w-full h-full"
        style={{ maxWidth: "420px", maxHeight: "480px" }}
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
      <div className="absolute inset-0 hero-glow" style={{pointerEvents:"none"}} />
      <div className="absolute top-20 left-10 w-72 h-72 rounded-full bg-primary/5 blur-3xl" style={{pointerEvents:"none"}} />
      <div className="absolute bottom-20 right-10 w-96 h-96 rounded-full bg-secondary/5 blur-3xl" style={{pointerEvents:"none"}} />
      <div
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage: `linear-gradient(#00F5D4 1px, transparent 1px), linear-gradient(90deg, #00F5D4 1px, transparent 1px)`,
          backgroundSize: "60px 60px",
          pointerEvents: "none",
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-10 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center min-h-[85vh]">

          {/* Left */}
          <div className="relative z-10 space-y-5 order-2 lg:order-1">
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

            {/* CTA BUTTONS */}
            <div style={{display:"flex",flexWrap:"wrap",gap:"12px",width:"100%"}}>
              <button
                onClick={() => {
                  const el = document.getElementById("projects");
                  if(el) el.scrollIntoView({behavior:"smooth"});
                }}
                style={{background:"linear-gradient(135deg,#00F5D4,#F15BB5)",color:"#0A0A0F",fontWeight:"800",fontSize:"15px",padding:"13px 24px",borderRadius:"12px",border:"none",cursor:"pointer",boxShadow:"0 6px 20px rgba(0,245,212,0.3)",transition:"transform 0.2s"}}
                onMouseEnter={e=>e.currentTarget.style.transform="scale(1.05)"}
                onMouseLeave={e=>e.currentTarget.style.transform="scale(1)"}
              >View My Work 🚀</button>
              <a
                href="mailto:ravindrachakali21@gmail.com"
                style={{background:"#111118",color:"#fff",fontWeight:"800",fontSize:"15px",padding:"13px 24px",borderRadius:"12px",border:"1.5px solid rgba(0,245,212,0.4)",textDecoration:"none",display:"inline-flex",alignItems:"center",transition:"transform 0.2s"}}
                onMouseEnter={e=>e.currentTarget.style.transform="scale(1.05)"}
                onMouseLeave={e=>e.currentTarget.style.transform="scale(1)"}
              >Get In Touch ✉️</a>
            </div>

            {/* CONNECT LINKS */}
            <div style={{display:"flex",flexDirection:"column",gap:"8px"}}>
              <span style={{color:"#6b7280",fontSize:"13px"}}>Connect:</span>
              <div style={{display:"flex",flexWrap:"wrap",gap:"8px"}}>
                {[
                  {label:"GitHub",          href:"https://github.com/ravindrachakali21-png", icon:"🐙"},
                  {label:"LinkedIn",        href:"https://linkedin.com/in/chakaliravindra",  icon:"💼"},
                  {label:"Email",           href:"mailto:ravindrachakali21@gmail.com",       icon:"📧"},
                  {label:"+91 93912 16535", href:"tel:9391216535",                           icon:"📞"},
                ].map((s)=>(
                  <a
                    key={s.label}
                    href={s.href}
                    target={s.href.startsWith("http")?"_blank":undefined}
                    rel={s.href.startsWith("http")?"noreferrer":undefined}
                    style={{display:"inline-flex",alignItems:"center",gap:"6px",padding:"7px 12px",borderRadius:"8px",background:"#111118",border:"1px solid #1E1E2E",color:"#9ca3af",fontSize:"12px",textDecoration:"none",whiteSpace:"nowrap",transition:"color 0.2s,border-color 0.2s"}}
                    onMouseEnter={e=>{e.currentTarget.style.color="#00F5D4";e.currentTarget.style.borderColor="rgba(0,245,212,0.5)";}}
                    onMouseLeave={e=>{e.currentTarget.style.color="#9ca3af";e.currentTarget.style.borderColor="#1E1E2E";}}
                  >
                    <span>{s.icon}</span><span>{s.label}</span>
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

          {/* Right: Canvas Tech Man Animation */}
          <div className="relative order-1 lg:order-2 flex items-center justify-center h-80 sm:h-96 lg:h-[520px]">
            <TechManAnimation />
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