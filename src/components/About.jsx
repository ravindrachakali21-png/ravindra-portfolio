import { useEffect, useRef, useState } from "react";
import profileImage from "../assets/13.png";
export default function About() {
  const [visible, setVisible] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisible(true); }, { threshold: 0.2 });
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  const facts = [
    { icon: "🎓", label: "Education", value: "MBA + B.Com (Computers)" },
    { icon: "💼", label: "Experience", value: "1+ Yr @ Stackly" },
    { icon: "📍", label: "Location", value: "Anantapur, AP" },
    { icon: "✈️", label: "Interests", value: "Travel, Music, Gaming" },
    { icon: "🌐", label: "Open To", value: "Relocation & Remote" },
    { icon: "🚀", label: "Goal", value: "Build Impactful Products" },
  ];

  return (
    <section id="about" ref={ref} className="py-24 relative overflow-hidden">
      <div className="absolute top-0 left-0 w-96 h-96 rounded-full bg-primary/5 blur-3xl -translate-x-1/2 -translate-y-1/2" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className={`text-center mb-16 transition-all duration-700 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}>
          <span className="font-mono text-primary text-sm tracking-widest uppercase">Get To Know</span>
          <h2 className="font-display font-extrabold text-4xl sm:text-5xl mt-2 text-white">
            About <span className="gradient-text">Me</span>
          </h2>
          <div className="flex items-center justify-center gap-4 mt-4">
            <div className="h-px w-16 bg-gradient-to-r from-transparent to-primary" />
            <div className="w-2 h-2 rounded-full bg-primary" />
            <div className="h-px w-16 bg-gradient-to-l from-transparent to-primary" />
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left: Big Card */}
          <div className={`transition-all duration-700 delay-200 ${visible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-10"}`}>
            <div className="relative p-6 sm:p-8 rounded-2xl bg-card border border-border overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-primary/10 to-transparent" />
              <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-secondary/10 to-transparent" />

              <div className="relative z-10">
                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 mb-6">
                  <div className="relative w-20 h-20 rounded-2xl overflow-hidden flex-shrink-0 border-2 border-primary/30 shadow-lg shadow-primary/20">
                    <img
                      src={profileImage}
                      alt="Chakali Ravindra"
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        e.target.style.display = "none";
                        e.target.parentNode.style.background = "linear-gradient(135deg, #00F5D4, #F15BB5)";
                        e.target.parentNode.innerHTML = '<div style="width:100%;height:100%;display:flex;align-items:center;justify-content:center;font-size:1.8rem;font-weight:900;color:#0A0A0F">CR</div>';
                      }}
                    />
                  </div>
                  <div>
                    <h3 className="font-display font-bold text-xl sm:text-2xl text-white">Chakali Ravindra</h3>
                    <p className="text-primary font-mono text-sm mt-1">Frontend Developer</p>
                    <div className="flex items-center gap-1 mt-1">
                      <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                      <span className="text-green-400 text-xs font-body">Open to work</span>
                    </div>
                  </div>
                </div>

                <p className="font-body text-gray-400 text-sm sm:text-base leading-relaxed mb-4">
                  I'm a passionate Frontend Developer currently working at{" "}
                  <span className="text-primary font-medium">Stackly, Bangalore</span>, where I build
                  modern, responsive web applications. Simultaneously pursuing my{" "}
                  <span className="text-secondary font-medium">MBA (Finance & Marketing)</span> to blend
                  business strategy with technical skills.
                </p>
                <p className="font-body text-gray-400 text-sm sm:text-base leading-relaxed mb-6">
                  My journey from a <span className="text-accent font-medium">B.Com (Computers)</span> background
                  into both software development and management studies reflects my belief that the most impactful
                  professionals understand both the technical and business sides of an organisation.
                </p>

                <div className="flex flex-wrap gap-2">
                  {["React.js", "Tailwind CSS", "JavaScript", "Git", "Vite", "Frontend Dev"].map((t) => (
                    <span key={t} className="px-3 py-1 rounded-full bg-primary/10 text-primary border border-primary/20 font-mono text-xs">
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Right: Info Grid */}
          <div className={`transition-all duration-700 delay-400 ${visible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-10"}`}>
            <div className="grid grid-cols-2 gap-3 sm:gap-4">
              {facts.map((f, i) => (
                <div
                  key={f.label}
                  className="card-hover p-4 sm:p-5 rounded-xl bg-card border border-border group cursor-default"
                  style={{ transitionDelay: `${i * 80}ms` }}
                >
                  <div className="text-xl sm:text-2xl mb-2 sm:mb-3 group-hover:scale-125 transition-transform duration-300">{f.icon}</div>
                  <div className="font-mono text-xs text-gray-500 mb-1">{f.label}</div>
                  <div className="font-display font-semibold text-xs sm:text-sm text-white group-hover:text-primary transition-colors duration-300">{f.value}</div>
                </div>
              ))}
            </div>

            <div className="mt-4 sm:mt-6 p-4 sm:p-5 rounded-xl bg-gradient-to-r from-primary/10 to-secondary/10 border border-primary/20">
              <p className="font-body text-gray-400 text-sm mb-3">
                Want to know more? Reach out for my full resume.
              </p>
              <div className="flex flex-wrap gap-3">
                <a
                  href="mailto:ravindrachakali21@gmail.com"
                  className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-gradient-to-r from-primary to-secondary text-dark font-display font-bold text-sm hover:scale-105 transition-all duration-300 shadow-lg shadow-primary/20"
                >
                  <span>📄</span> Request Resume
                </a>
                <a
                  href="tel:9391216535"
                  className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-card border border-border text-gray-300 font-body text-sm hover:border-primary/40 hover:text-primary transition-all duration-300"
                >
                  <span>📞</span> Call Me
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
