import { useEffect, useRef, useState } from "react";

const skills = [
  { name: "React.js", level: 88, color: "#00F5D4", icon: "⚛️", category: "Frontend" },
  { name: "JavaScript", level: 85, color: "#FEE440", icon: "🟨", category: "Frontend" },
  { name: "Tailwind CSS", level: 90, color: "#F15BB5", icon: "🎨", category: "Frontend" },
  { name: "HTML5", level: 95, color: "#FF6B35", icon: "🌐", category: "Frontend" },
  { name: "CSS3", level: 90, color: "#00B4D8", icon: "🎯", category: "Frontend" },
  { name: "Vite", level: 82, color: "#A78BFA", icon: "⚡", category: "Tools" },
  { name: "React Router", level: 85, color: "#F15BB5", icon: "🗺️", category: "Libraries" },
  { name: "Responsive Design", level: 92, color: "#00F5D4", icon: "📱", category: "Frontend" },
];

const businessSkills = [
  { name: "Financial Analysis", icon: "📈", color: "#FEE440" },
  { name: "Marketing Strategy", icon: "🎯", color: "#F15BB5" },
  { name: "MS Excel", icon: "📊", color: "#00F5D4" },
  { name: "Business Communication", icon: "💬", color: "#A78BFA" },
  { name: "Tally / Accounting", icon: "🧾", color: "#FF6B35" },
  { name: "Problem Solving", icon: "🧩", color: "#00B4D8" },
];

function SkillBar({ skill, animate }) {
  return (
    <div className="group">
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2 flex-wrap">
          <span className="text-base sm:text-lg">{skill.icon}</span>
          <span className="font-body font-medium text-white text-xs sm:text-sm">{skill.name}</span>
          <span className="text-xs font-mono text-gray-500 hidden sm:inline">{skill.category}</span>
        </div>
        <span className="font-mono text-xs ml-2 flex-shrink-0" style={{ color: skill.color }}>{skill.level}%</span>
      </div>
      <div className="h-1.5 sm:h-2 bg-white/5 rounded-full overflow-hidden">
        <div
          className="h-full rounded-full transition-all duration-1000 ease-out relative overflow-hidden"
          style={{
            width: animate ? `${skill.level}%` : "0%",
            background: `linear-gradient(90deg, ${skill.color}88, ${skill.color})`,
            transitionDelay: "200ms",
          }}
        >
          <div className="absolute inset-0 shimmer" />
        </div>
      </div>
    </div>
  );
}

export default function Skills() {
  const [visible, setVisible] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisible(true); }, { threshold: 0.2 });
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="skills" ref={ref} className="py-24 relative overflow-hidden">
      <div className="absolute top-1/2 right-0 w-96 h-96 rounded-full bg-secondary/5 blur-3xl translate-x-1/2" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className={`text-center mb-16 transition-all duration-700 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}>
          <span className="font-mono text-primary text-sm tracking-widest uppercase">What I Know</span>
          <h2 className="font-display font-extrabold text-4xl sm:text-5xl mt-2 text-white">
            My <span className="gradient-text">Skills</span>
          </h2>
          <div className="flex items-center justify-center gap-4 mt-4">
            <div className="h-px w-16 bg-gradient-to-r from-transparent to-primary" />
            <div className="w-2 h-2 rounded-full bg-primary" />
            <div className="h-px w-16 bg-gradient-to-l from-transparent to-primary" />
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12">
          {/* Tech Skills */}
          <div className={`p-6 sm:p-8 rounded-2xl bg-card border border-border transition-all duration-700 delay-200 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}>
            <h3 className="font-display font-bold text-lg sm:text-xl text-white mb-6 sm:mb-8 flex items-center gap-3">
              <span className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-primary/20 flex items-center justify-center text-primary text-sm sm:text-base">⚡</span>
              Technical Proficiency
            </h3>
            <div className="space-y-4 sm:space-y-5">
              {skills.map((s) => <SkillBar key={s.name} skill={s} animate={visible} />)}
            </div>
          </div>

          {/* Right side */}
          <div className="space-y-5 sm:space-y-6">
            {/* Highlight cards */}
            <div className={`grid grid-cols-2 gap-3 sm:gap-4 transition-all duration-700 delay-300 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}>
              {[
                { icon: "⚛️", title: "React Expert", desc: "Hooks, Router, Context", color: "#00F5D4" },
                { icon: "🎨", title: "UI Artisan", desc: "Tailwind, CSS3, Animations", color: "#F15BB5" },
                { icon: "⚡", title: "Vite Builder", desc: "Fast builds & hot reload", color: "#FEE440" },
                { icon: "📱", title: "Responsive", desc: "Mobile-first design", color: "#A78BFA" },
              ].map((card) => (
                <div key={card.title} className="card-hover p-4 sm:p-5 rounded-xl bg-card border border-border group">
                  <div className="text-2xl sm:text-3xl mb-2 sm:mb-3 group-hover:scale-125 transition-transform duration-300">{card.icon}</div>
                  <h4 className="font-display font-bold text-xs sm:text-sm text-white mb-1">{card.title}</h4>
                  <p className="font-body text-xs text-gray-500">{card.desc}</p>
                  <div className="mt-2 sm:mt-3 h-0.5 w-0 group-hover:w-full rounded-full transition-all duration-500" style={{ background: card.color }} />
                </div>
              ))}
            </div>

            {/* Business Skills */}
            <div className={`p-5 sm:p-6 rounded-2xl bg-card border border-border transition-all duration-700 delay-400 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}>
              <h3 className="font-display font-bold text-base sm:text-lg text-white mb-4 sm:mb-5 flex items-center gap-3">
                <span className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-accent/20 flex items-center justify-center text-accent text-sm sm:text-base">💼</span>
                Business & Finance Skills
              </h3>
              <div className="flex flex-wrap gap-2 sm:gap-3">
                {businessSkills.map((t) => (
                  <div
                    key={t.name}
                    className="flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg bg-white/5 border border-border hover:border-primary/40 hover:bg-primary/5 transition-all duration-300 cursor-default group"
                  >
                    <span className="group-hover:scale-125 transition-transform duration-300 text-sm sm:text-base">{t.icon}</span>
                    <span className="font-body text-xs sm:text-sm text-gray-400 group-hover:text-white transition-colors duration-300">{t.name}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Currently Learning */}
            <div className={`p-5 sm:p-6 rounded-2xl bg-gradient-to-br from-accent/5 to-primary/5 border border-accent/20 transition-all duration-700 delay-500 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}>
              <h3 className="font-display font-bold text-base sm:text-lg text-white mb-3 sm:mb-4 flex items-center gap-2">
                <span>📚</span> Currently Exploring
              </h3>
              <div className="flex flex-wrap gap-2">
                {["TypeScript", "Next.js", "Node.js", "MongoDB", "Framer Motion"].map((t) => (
                  <span key={t} className="px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-full bg-accent/10 text-accent border border-accent/20 font-mono text-xs">
                    {t}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
