import { useEffect, useRef, useState } from "react";

export default function Contact() {
  const [visible, setVisible] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [sent, setSent] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisible(true); }, { threshold: 0.2 });
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    const mailto = `mailto:ravindrachakali21@gmail.com?subject=${encodeURIComponent(form.subject || "Portfolio Contact")}&body=${encodeURIComponent(`Name: ${form.name}\nEmail: ${form.email}\n\n${form.message}`)}`;
    window.open(mailto, "_blank");
    setSent(true);
    setTimeout(() => setSent(false), 3000);
  };

  const contacts = [
    { icon: "📧", label: "Email", value: "ravindrachakali21@gmail.com", href: "mailto:ravindrachakali21@gmail.com", color: "#00F5D4" },
    { icon: "📞", label: "Phone", value: "+91 93912 16535", href: "tel:9391216535", color: "#FEE440" },
    { icon: "💼", label: "LinkedIn", value: "chakaliravindra", href: "https://linkedin.com/in/chakaliravindra", color: "#0077B5" },
    { icon: "🐙", label: "GitHub", value: "ravindrachakali21-png", href: "https://github.com/ravindrachakali21-png", color: "#F15BB5" },
    { icon: "📍", label: "Location", value: "Anantapur, AP (Open to relocate)", href: null, color: "#A78BFA" },
  ];

  return (
    <section id="contact" ref={ref} className="py-24 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-96 h-96 rounded-full bg-secondary/5 blur-3xl translate-x-1/2 -translate-y-1/2" />
      <div className="absolute bottom-0 left-0 w-72 h-72 rounded-full bg-primary/5 blur-3xl -translate-x-1/2 translate-y-1/2" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className={`text-center mb-16 transition-all duration-700 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}>
          <span className="font-mono text-primary text-sm tracking-widest uppercase">Get In Touch</span>
          <h2 className="font-display font-extrabold text-4xl sm:text-5xl mt-2 text-white">
            Contact <span className="gradient-text">Me</span>
          </h2>
          <div className="flex items-center justify-center gap-4 mt-4">
            <div className="h-px w-16 bg-gradient-to-r from-transparent to-primary" />
            <div className="w-2 h-2 rounded-full bg-primary" />
            <div className="h-px w-16 bg-gradient-to-l from-transparent to-primary" />
          </div>
          <p className="text-gray-400 font-body mt-4 max-w-lg mx-auto text-sm sm:text-base">
            Have a project in mind or want to collaborate? Let's build something amazing together!
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12">
          {/* Left */}
          <div className={`space-y-5 sm:space-y-6 transition-all duration-700 delay-200 ${visible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-10"}`}>
            <div className="p-6 sm:p-8 rounded-2xl bg-card border border-border">
              <h3 className="font-display font-bold text-lg sm:text-xl text-white mb-5 sm:mb-6">Let's Connect 🤝</h3>
              <p className="font-body text-gray-400 text-xs sm:text-sm leading-relaxed mb-6 sm:mb-8">
                I'm always open to discussing new opportunities, interesting projects, or just having a
                conversation about tech and business. Feel free to reach out through any channel!
              </p>

              <div className="space-y-3">
                {contacts.map((c) => (
                  <div key={c.label} className="group flex items-center gap-3 sm:gap-4 p-3 sm:p-4 rounded-xl bg-white/3 border border-border hover:border-primary/30 hover:bg-primary/5 transition-all duration-300">
                    <div
                      className="w-9 h-9 sm:w-11 sm:h-11 rounded-xl flex items-center justify-center text-lg sm:text-xl flex-shrink-0 group-hover:scale-110 transition-transform duration-300"
                      style={{ background: `${c.color}18` }}
                    >
                      {c.icon}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="font-mono text-xs text-gray-500 mb-0.5">{c.label}</div>
                      {c.href ? (
                        <a
                          href={c.href}
                          target={c.href.startsWith("http") ? "_blank" : undefined}
                          rel={c.href.startsWith("http") ? "noreferrer" : undefined}
                          className="font-body text-xs sm:text-sm transition-colors truncate block"
                          style={{ color: c.color }}
                        >
                          {c.value}
                        </a>
                      ) : (
                        <span className="font-body text-xs sm:text-sm" style={{ color: c.color }}>{c.value}</span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="p-5 sm:p-6 rounded-2xl bg-gradient-to-br from-primary/10 to-secondary/10 border border-primary/20">
              <div className="flex items-center gap-3 mb-3">
                <span className="w-3 h-3 rounded-full bg-green-400 animate-pulse" />
                <span className="font-display font-bold text-white text-sm sm:text-base">Currently Available</span>
              </div>
              <p className="font-body text-gray-400 text-xs sm:text-sm">
                Open for <span className="text-primary font-medium">freelance projects</span>,{" "}
                <span className="text-secondary font-medium">full-time roles</span>, and{" "}
                <span className="text-accent font-medium">collaboration opportunities</span>.
                Response time: within 24 hours.
              </p>
            </div>
          </div>

          {/* Right: Form */}
          <div className={`transition-all duration-700 delay-400 ${visible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-10"}`}>
            <form onSubmit={handleSubmit} className="p-6 sm:p-8 rounded-2xl bg-card border border-border space-y-4 sm:space-y-5">
              <h3 className="font-display font-bold text-lg sm:text-xl text-white">Send a Message 💬</h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="font-mono text-xs text-gray-500 mb-1.5 block">Your Name</label>
                  <input
                    type="text"
                    required
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    placeholder="John Doe"
                    className="w-full px-3 sm:px-4 py-2.5 sm:py-3 rounded-xl bg-white/5 border border-border text-white font-body text-sm placeholder-gray-600 focus:outline-none focus:border-primary/50 focus:bg-primary/5 transition-all duration-300"
                  />
                </div>
                <div>
                  <label className="font-mono text-xs text-gray-500 mb-1.5 block">Email Address</label>
                  <input
                    type="email"
                    required
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    placeholder="john@example.com"
                    className="w-full px-3 sm:px-4 py-2.5 sm:py-3 rounded-xl bg-white/5 border border-border text-white font-body text-sm placeholder-gray-600 focus:outline-none focus:border-primary/50 focus:bg-primary/5 transition-all duration-300"
                  />
                </div>
              </div>

              <div>
                <label className="font-mono text-xs text-gray-500 mb-1.5 block">Subject</label>
                <input
                  type="text"
                  value={form.subject}
                  onChange={(e) => setForm({ ...form, subject: e.target.value })}
                  placeholder="Project collaboration, Job opportunity..."
                  className="w-full px-3 sm:px-4 py-2.5 sm:py-3 rounded-xl bg-white/5 border border-border text-white font-body text-sm placeholder-gray-600 focus:outline-none focus:border-primary/50 focus:bg-primary/5 transition-all duration-300"
                />
              </div>

              <div>
                <label className="font-mono text-xs text-gray-500 mb-1.5 block">Message</label>
                <textarea
                  required
                  rows={5}
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  placeholder="Tell me about your project or opportunity..."
                  className="w-full px-3 sm:px-4 py-2.5 sm:py-3 rounded-xl bg-white/5 border border-border text-white font-body text-sm placeholder-gray-600 focus:outline-none focus:border-primary/50 focus:bg-primary/5 transition-all duration-300 resize-none"
                />
              </div>

              <button
                type="submit"
                className={`w-full py-3.5 sm:py-4 rounded-xl font-display font-bold text-sm sm:text-base transition-all duration-300 ${
                  sent
                    ? "bg-green-500 text-white"
                    : "bg-gradient-to-r from-primary to-secondary text-dark hover:scale-[1.02] hover:shadow-xl hover:shadow-primary/30"
                }`}
              >
                {sent ? "✅ Message Sent!" : "Send Message 🚀"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
