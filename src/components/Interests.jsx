import { useEffect, useRef, useState } from "react";

const interests = [
  { icon: "✈️", label: "Travelling", desc: "Exploring new places & cultures", color: "#00F5D4", image: "https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=300&h=200&fit=crop" },
  { icon: "🎵", label: "Music", desc: "Listening & enjoying all genres", color: "#F15BB5", image: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=300&h=200&fit=crop" },
  { icon: "🎮", label: "Gaming", desc: "Strategy & adventure games", color: "#FEE440", image: "https://images.unsplash.com/photo-1538481199705-c710c4e965fc?w=300&h=200&fit=crop" },
  { icon: "💻", label: "Web Dev", desc: "Building cool UIs & projects", color: "#A78BFA", image: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=300&h=200&fit=crop" },
  { icon: "📈", label: "Stock Markets", desc: "Finance & investment trends", color: "#FF6B35", image: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=300&h=200&fit=crop" },
  { icon: "📱", label: "Product Design", desc: "UI/UX & digital experiences", color: "#00B4D8", image: "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=300&h=200&fit=crop" },
];

export default function Interests() {
  const [visible, setVisible] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisible(true); }, { threshold: 0.2 });
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="interests" ref={ref} className="py-24 relative overflow-hidden">
      <div className="absolute top-1/2 right-0 w-80 h-80 rounded-full bg-primary/5 blur-3xl translate-x-1/2" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className={`text-center mb-16 transition-all duration-700 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}>
          <span className="font-mono text-primary text-sm tracking-widest uppercase">Beyond Coding</span>
          <h2 className="font-display font-extrabold text-4xl sm:text-5xl mt-2 text-white">
            My <span className="gradient-text">Interests</span>
          </h2>
          <div className="flex items-center justify-center gap-4 mt-4">
            <div className="h-px w-16 bg-gradient-to-r from-transparent to-primary" />
            <div className="w-2 h-2 rounded-full bg-primary" />
            <div className="h-px w-16 bg-gradient-to-l from-transparent to-primary" />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
          {interests.map((item, i) => (
            <div
              key={item.label}
              className={`group relative rounded-2xl bg-card border border-border overflow-hidden card-hover transition-all duration-700 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
              style={{ transitionDelay: `${i * 80}ms` }}
            >
              {/* Image */}
              <div className="relative h-36 sm:h-40 overflow-hidden">
                <img
                  src={item.image}
                  alt={item.label}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  onError={(e) => {
                    e.target.style.display = "none";
                    e.target.parentNode.style.background = `linear-gradient(135deg, ${item.color}22, #111118)`;
                    e.target.parentNode.innerHTML = `<div style="width:100%;height:100%;display:flex;align-items:center;justify-content:center;font-size:3.5rem;">${item.icon}</div>`;
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-card via-card/30 to-transparent" />
                <div
                  className="absolute top-0 left-0 right-0 h-0.5"
                  style={{ background: `linear-gradient(90deg, transparent, ${item.color}, transparent)` }}
                />
              </div>

              {/* Content */}
              <div className="p-4 sm:p-5">
                <div className="flex items-center gap-3 mb-2">
                  <span className="text-xl sm:text-2xl group-hover:scale-125 transition-transform duration-300">{item.icon}</span>
                  <h3 className="font-display font-bold text-base sm:text-lg text-white group-hover:transition-colors duration-300" style={{ color: "inherit" }}>
                    <span className="group-hover:text-primary transition-colors duration-300">{item.label}</span>
                  </h3>
                </div>
                <p className="font-body text-gray-400 text-xs sm:text-sm">{item.desc}</p>
                <div className="mt-3 h-0.5 w-0 group-hover:w-full rounded-full transition-all duration-500" style={{ background: item.color }} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
