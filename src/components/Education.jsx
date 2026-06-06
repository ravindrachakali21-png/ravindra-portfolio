import { useEffect, useRef, useState } from "react";

const education = [
  {
    degree: "MBA – Finance & Marketing",
    field: "Finance & Marketing Specialisation",
    institution: "Sri Balaji PG College / Balaji Institute of IT & Management",
    location: "Anantapur, Andhra Pradesh",
    duration: "Aug 2025 – Present",
    status: "ongoing",
    regulation: "JNTUA R21",
    highlights: ["Financial Management", "Marketing Management", "HRM", "Operations Research", "Business Research"],
    color: "#00F5D4",
    icon: "🎓",
    image: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=80&h=80&fit=crop",
  },
  {
    degree: "B.Com – Computers",
    field: "Commerce & Computer Applications",
    institution: "Sri Chaitanya Degree College",
    location: "Anantapur, Andhra Pradesh",
    duration: "2022 – Feb 2025",
    grade: "62%",
    status: "completed",
    highlights: ["Computer Applications", "Accounting Software", "MS Office", "Business Management"],
    color: "#F15BB5",
    icon: "📊",
    image: "https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?w=80&h=80&fit=crop",
  },
  {
    degree: "Intermediate – CEC",
    field: "Commerce, Economics & Civics",
    institution: "AP Model College, Pamidi",
    location: "Pamidi, Anantapur",
    duration: "2020 – 2022",
    grade: "599 Marks",
    status: "completed",
    highlights: ["Commerce", "Economics", "Civics"],
    color: "#FEE440",
    icon: "📚",
    image: "https://images.unsplash.com/photo-1580582932707-520aed937b7b?w=80&h=80&fit=crop",
  },
  {
    degree: "SSC – 10th Standard",
    field: "Secondary School Certificate",
    institution: "AP Model School, Pamidi",
    location: "Pamidi, Anantapur",
    duration: "2020",
    grade: "6.2 GPA",
    status: "completed",
    highlights: ["Andhra Pradesh Board"],
    color: "#A78BFA",
    icon: "🏫",
    image: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=80&h=80&fit=crop",
  },
];

const experience = [
  {
    role: "Frontend Developer",
    company: "Stackly",
    location: "Bangalore, Karnataka",
    duration: "Sep 2025 – Present",
    period: "1 Year · Full-time",
    status: "current",
    color: "#FEE440",
    icon: "💻",
    image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=80&h=80&fit=crop",
    responsibilities: [
      "Building responsive web apps using React.js & Tailwind CSS",
      "Developing reusable UI components and maintaining design systems",
      "Collaborating with teams using version control workflows",
      "Optimising performance with Vite bundler and lazy loading",
      "Deploying applications on Vercel and Netlify",
    ],
  },
];

export default function Education() {
  const [visible, setVisible] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisible(true); }, { threshold: 0.1 });
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="education" ref={ref} className="py-24 relative overflow-hidden">
      <div className="absolute top-1/2 left-0 w-96 h-96 rounded-full bg-accent/5 blur-3xl -translate-x-1/2" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className={`text-center mb-16 transition-all duration-700 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}>
          <span className="font-mono text-primary text-sm tracking-widest uppercase">My Journey</span>
          <h2 className="font-display font-extrabold text-4xl sm:text-5xl mt-2 text-white">
            Education & <span className="gradient-text">Experience</span>
          </h2>
          <div className="flex items-center justify-center gap-4 mt-4">
            <div className="h-px w-16 bg-gradient-to-r from-transparent to-primary" />
            <div className="w-2 h-2 rounded-full bg-primary" />
            <div className="h-px w-16 bg-gradient-to-l from-transparent to-primary" />
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Education */}
          <div className={`transition-all duration-700 delay-200 ${visible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-10"}`}>
            <h3 className="font-display font-bold text-lg sm:text-xl text-white mb-6 flex items-center gap-3">
              <span className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-primary/20 flex items-center justify-center text-primary text-sm sm:text-base">📚</span>
              Education
            </h3>

            <div className="relative">
              <div className="absolute left-5 top-0 bottom-0 w-px bg-gradient-to-b from-primary via-secondary to-transparent" />
              <div className="space-y-5 sm:space-y-6">
                {education.map((edu, i) => (
                  <div key={i} className="relative pl-12 sm:pl-14">
                    <div
                      className="absolute left-3 top-4 w-4 h-4 sm:w-5 sm:h-5 rounded-full border-2 flex items-center justify-center"
                      style={{ borderColor: edu.color, background: `${edu.color}20` }}
                    >
                      <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full" style={{ background: edu.color }} />
                    </div>

                    <div className="p-4 sm:p-6 rounded-2xl bg-card border border-border card-hover group">
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl overflow-hidden border flex-shrink-0" style={{ borderColor: `${edu.color}40` }}>
                            <img
                              src={edu.image}
                              alt={edu.institution}
                              className="w-full h-full object-cover"
                              onError={(e) => {
                                e.target.style.display = "none";
                                e.target.parentNode.innerHTML = `<div style="width:100%;height:100%;display:flex;align-items:center;justify-content:center;font-size:1.3rem;background:${edu.color}18">${edu.icon}</div>`;
                              }}
                            />
                          </div>
                          <div>
                            <h4 className="font-display font-bold text-sm sm:text-base text-white group-hover:text-primary transition-colors duration-300 leading-tight">{edu.degree}</h4>
                            <p className="font-mono text-xs mt-0.5" style={{ color: edu.color }}>{edu.field}</p>
                          </div>
                        </div>
                        <span
                          className="flex-shrink-0 ml-2 px-2 py-0.5 rounded-full font-mono text-xs hidden sm:block"
                          style={{ background: `${edu.color}15`, color: edu.color, border: `1px solid ${edu.color}30` }}
                        >
                          {edu.status === "ongoing" ? "🟢 Now" : "✅ Done"}
                        </span>
                      </div>

                      <p className="font-body text-gray-300 text-xs sm:text-sm mb-1">{edu.institution}</p>
                      <div className="flex flex-wrap items-center gap-2 sm:gap-3 text-xs text-gray-500 font-body mb-3">
                        <span>📍 {edu.location}</span>
                        <span>📅 {edu.duration}</span>
                        {edu.grade && <span style={{ color: edu.color }}>📊 {edu.grade}</span>}
                      </div>

                      <div className="flex flex-wrap gap-1.5">
                        {edu.highlights.map((h) => (
                          <span key={h} className="px-2 py-0.5 rounded-md bg-white/5 text-gray-400 font-mono text-xs border border-border">{h}</span>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Experience */}
          <div className={`transition-all duration-700 delay-400 ${visible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-10"}`}>
            <h3 className="font-display font-bold text-lg sm:text-xl text-white mb-6 flex items-center gap-3">
              <span className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-accent/20 flex items-center justify-center text-accent text-sm sm:text-base">💼</span>
              Work Experience
            </h3>

            {experience.map((exp, i) => (
              <div key={i} className="p-5 sm:p-6 rounded-2xl bg-card border border-border card-hover group mb-4">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div
                      className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl overflow-hidden border flex-shrink-0 transition-transform duration-300 group-hover:scale-110"
                      style={{ borderColor: `${exp.color}40` }}
                    >
                      <img
                        src={exp.image}
                        alt={exp.company}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          e.target.style.display = "none";
                          e.target.parentNode.innerHTML = `<div style="width:100%;height:100%;display:flex;align-items:center;justify-content:center;font-size:1.5rem;background:${exp.color}18">${exp.icon}</div>`;
                        }}
                      />
                    </div>
                    <div>
                      <h4 className="font-display font-bold text-base sm:text-lg text-white group-hover:text-accent transition-colors">{exp.role}</h4>
                      <p className="font-body text-sm font-medium" style={{ color: exp.color }}>{exp.company}</p>
                    </div>
                  </div>
                  <span
                    className="flex-shrink-0 ml-2 px-2.5 py-1 rounded-full font-mono text-xs"
                    style={{ background: `${exp.color}15`, color: exp.color, border: `1px solid ${exp.color}30` }}
                  >
                    🟢 Current
                  </span>
                </div>

                <div className="flex flex-wrap items-center gap-2 sm:gap-4 text-xs text-gray-500 font-body mb-4">
                  <span>📍 {exp.location}</span>
                  <span>📅 {exp.duration}</span>
                  <span style={{ color: exp.color }}>⏱ {exp.period}</span>
                </div>

                <ul className="space-y-2 sm:space-y-3">
                  {exp.responsibilities.map((r, j) => (
                    <li key={j} className="flex items-start gap-2 sm:gap-3 text-xs sm:text-sm font-body text-gray-400">
                      <span className="text-primary mt-0.5 flex-shrink-0">▹</span>
                      {r}
                    </li>
                  ))}
                </ul>

                <div
                  className="mt-4 sm:mt-5 h-0.5 w-0 group-hover:w-full rounded-full transition-all duration-700"
                  style={{ background: `linear-gradient(90deg, ${exp.color}, transparent)` }}
                />
              </div>
            ))}

            {/* APPSC note */}
            <div className="p-4 sm:p-5 rounded-xl bg-gradient-to-r from-secondary/10 to-primary/10 border border-secondary/20">
              <div className="flex items-center gap-2 mb-2">
                <span>🎯</span>
                <span className="font-display font-bold text-sm text-white">Also Exploring</span>
              </div>
              <p className="font-body text-xs text-gray-400">
                Preparing for <span className="text-secondary font-medium">APPSC Group-2</span> examinations alongside professional development — combining public service aspirations with tech career.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
