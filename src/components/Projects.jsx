import { useEffect, useRef, useState } from "react";

const projects = [
  {
    title: "E-Commerce Website",
    desc: "Full-featured online shopping experience with product listings, cart, checkout, and responsive design for all devices.",
    tags: ["React.js", "Tailwind CSS", "JavaScript"],
    emoji: "🛍️",
    color: "#00F5D4",
    live: "https://golden-torrone-441ca0.netlify.app/",
    image: "https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=600&h=340&fit=crop",
  },
  {
    title: "University Website",
    desc: "Modern university portal with course listings, faculty profiles, admissions info, and campus highlights.",
    tags: ["React.js", "CSS3", "Responsive"],
    emoji: "🎓",
    color: "#F15BB5",
    live: "https://precious-truffle-710db8.netlify.app/",
    image: "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=600&h=340&fit=crop",
  },
  {
    title: "Furniture E-Commerce",
    desc: "Premium furniture shopping platform with cart, wishlist, product comparison, and smooth checkout flow.",
    tags: ["React.js", "Tailwind CSS", "Vite"],
    emoji: "🛋️",
    color: "#FEE440",
    live: "https://furniture-shop-opal.vercel.app/",
    image: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=600&h=340&fit=crop",
  },
  {
    title: "Animated E-Commerce Landing",
    desc: "High-converting animated landing page for e-commerce with smooth transitions and engaging micro-interactions.",
    tags: ["HTML5", "CSS3", "JavaScript", "Animations"],
    emoji: "✨",
    color: "#A78BFA",
    live: "https://frabjous-pegasus-3e3b55.netlify.app/",
    image: "https://images.unsplash.com/photo-1472851294608-062f824d29cc?w=600&h=340&fit=crop",
  },
  {
    title: "Restaurant Website",
    desc: "Elegant restaurant website with menu, reservations, gallery, and contact sections. Beautiful food imagery and smooth UX.",
    tags: ["React.js", "Tailwind CSS", "Responsive"],
    emoji: "🍽️",
    color: "#FF6B35",
    live: "https://enchanting-fairy-73c409.netlify.app/",
    image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=600&h=340&fit=crop",
  },
];

export default function Projects() {
  const [visible, setVisible] = useState(false);
  const [hovered, setHovered] = useState(null);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisible(true); }, { threshold: 0.1 });
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="projects" ref={ref} className="py-24 relative overflow-hidden">
      <div className="absolute bottom-0 left-1/4 w-96 h-96 rounded-full bg-primary/5 blur-3xl" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className={`text-center mb-16 transition-all duration-700 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}>
          <span className="font-mono text-primary text-sm tracking-widest uppercase">What I've Built</span>
          <h2 className="font-display font-extrabold text-4xl sm:text-5xl mt-2 text-white">
            My <span className="gradient-text">Projects</span>
          </h2>
          <div className="flex items-center justify-center gap-4 mt-4">
            <div className="h-px w-16 bg-gradient-to-r from-transparent to-primary" />
            <div className="w-2 h-2 rounded-full bg-primary" />
            <div className="h-px w-16 bg-gradient-to-l from-transparent to-primary" />
          </div>
          <p className="text-gray-400 font-body mt-4 max-w-xl mx-auto text-sm sm:text-base">
            Live, deployed web applications — click any card to visit the project.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((p, i) => (
            <div
              key={p.title}
              className={`relative group rounded-2xl bg-card border border-border overflow-hidden cursor-pointer transition-all duration-700 ${
                visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
              }`}
              style={{ transitionDelay: `${i * 80}ms` }}
              onMouseEnter={() => setHovered(i)}
              onMouseLeave={() => setHovered(null)}
            >
              {/* Project image */}
              <div className="relative h-44 overflow-hidden">
                <img
                  src={p.image}
                  alt={p.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  onError={(e) => {
                    e.target.style.display = "none";
                    e.target.parentNode.style.background = `linear-gradient(135deg, ${p.color}22, #111118)`;
                    e.target.parentNode.innerHTML = `<div style="width:100%;height:100%;display:flex;align-items:center;justify-content:center;font-size:4rem;">${p.emoji}</div>`;
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-card via-card/20 to-transparent" />
                {/* Top glow */}
                <div
                  className="absolute top-0 left-0 right-0 h-0.5 transition-opacity duration-300"
                  style={{ background: `linear-gradient(90deg, transparent, ${p.color}, transparent)`, opacity: hovered === i ? 1 : 0.4 }}
                />
                {/* Live badge */}
                <div className="absolute top-3 right-3 flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-black/60 backdrop-blur-sm border border-white/10">
                  <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
                  <span className="font-mono text-xs text-green-400">Live</span>
                </div>
              </div>

              {/* Card content */}
              <div className="p-5">
                <div className="flex items-start justify-between mb-3">
                  <h3 className="font-display font-bold text-base text-white group-hover:text-primary transition-colors duration-300 leading-snug flex-1 pr-2">
                    {p.title}
                  </h3>
                  <a
                    href={p.live}
                    target="_blank"
                    rel="noreferrer"
                    onClick={(e) => e.stopPropagation()}
                    className="flex-shrink-0 w-8 h-8 rounded-lg flex items-center justify-center text-gray-400 hover:text-primary hover:bg-primary/10 transition-all duration-300 border border-border hover:border-primary/30"
                    title="Visit Live Site"
                  >
                    <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                      <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6" />
                      <polyline points="15,3 21,3 21,9" />
                      <line x1="10" y1="14" x2="21" y2="3" />
                    </svg>
                  </a>
                </div>

                <p className="font-body text-gray-400 text-xs sm:text-sm leading-relaxed mb-4">{p.desc}</p>

                {/* Tags */}
                <div className="flex flex-wrap gap-1.5 mb-4">
                  {p.tags.map((t) => (
                    <span
                      key={t}
                      className="px-2 py-0.5 rounded-md font-mono text-xs"
                      style={{ background: `${p.color}15`, color: p.color, border: `1px solid ${p.color}25` }}
                    >
                      {t}
                    </span>
                  ))}
                </div>

                {/* Visit button */}
                <a
                  href={p.live}
                  target="_blank"
                  rel="noreferrer"
                  className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl font-display font-bold text-sm transition-all duration-300 hover:scale-[1.02]"
                  style={{
                    background: `linear-gradient(135deg, ${p.color}22, ${p.color}11)`,
                    color: p.color,
                    border: `1px solid ${p.color}30`,
                  }}
                >
                  <span>🌐 Visit Live Project</span>
                  <svg width="12" height="12" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </a>
              </div>

              {/* Hover overlay */}
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                style={{ background: `radial-gradient(circle at 50% 0%, ${p.color}06 0%, transparent 60%)` }}
              />
            </div>
          ))}
        </div>

        {/* GitHub CTA */}
        <div className={`text-center mt-12 transition-all duration-700 delay-500 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}>
          <a
            href="https://github.com/ravindrachakali21-png"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-3 px-6 sm:px-8 py-3 sm:py-4 rounded-xl gradient-border bg-card font-display font-bold text-white hover:text-primary transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-primary/20 text-sm sm:text-base"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z" />
            </svg>
            View GitHub Profile
          </a>
        </div>
      </div>
    </section>
  );
}
