import { useState, useEffect } from "react";

const navLinks = ["Home", "About", "Skills", "Projects", "Education", "Interests", "Contact"];

export default function Navbar() {
  const [active, setActive] = useState("Home");
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollTo = (id) => {
    const el = document.getElementById(id.toLowerCase());
    if (el) el.scrollIntoView({ behavior: "smooth" });
    setActive(id);
    setMenuOpen(false);
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled ? "bg-dark/90 backdrop-blur-xl border-b border-border shadow-lg shadow-black/50" : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center gap-2 cursor-pointer" onClick={() => scrollTo("Home")}>
            <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-primary to-secondary flex items-center justify-center font-display font-bold text-dark text-lg">
              R
            </div>
            <span className="font-display font-bold text-lg gradient-text">Ravindra</span>
          </div>

          {/* Desktop Links */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <button
                key={link}
                onClick={() => scrollTo(link)}
                className={`px-4 py-2 rounded-lg font-body text-sm font-medium transition-all duration-300 ${
                  active === link
                    ? "bg-primary/10 text-primary"
                    : "text-gray-400 hover:text-white hover:bg-white/5"
                }`}
              >
                {link}
              </button>
            ))}
          </div>

          {/* CTA */}
          <a
            href="mailto:ravindrachakali21@gmail.com"
            className="hidden md:flex items-center gap-2 px-4 py-2 rounded-lg bg-gradient-to-r from-primary to-secondary text-dark font-body font-semibold text-sm transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-primary/30"
          >
            Hire Me
          </a>

          {/* Hamburger */}
          <button
            className="md:hidden flex flex-col gap-1.5 p-2"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <span className={`block w-6 h-0.5 bg-primary transition-all duration-300 ${menuOpen ? "rotate-45 translate-y-2" : ""}`} />
            <span className={`block w-6 h-0.5 bg-white transition-all duration-300 ${menuOpen ? "opacity-0" : ""}`} />
            <span className={`block w-6 h-0.5 bg-secondary transition-all duration-300 ${menuOpen ? "-rotate-45 -translate-y-2" : ""}`} />
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div className={`md:hidden transition-all duration-300 overflow-hidden ${menuOpen ? "max-h-96" : "max-h-0"}`}>
        <div className="bg-card/95 backdrop-blur-xl border-t border-border px-4 py-4 flex flex-col gap-2">
          {navLinks.map((link) => (
            <button
              key={link}
              onClick={() => scrollTo(link)}
              className={`px-4 py-3 rounded-lg font-body text-sm font-medium text-left transition-all duration-300 ${
                active === link ? "bg-primary/10 text-primary" : "text-gray-400 hover:text-white hover:bg-white/5"
              }`}
            >
              {link}
            </button>
          ))}
          <a
            href="mailto:ravindrachakali21@gmail.com"
            className="mt-2 px-4 py-3 rounded-lg bg-gradient-to-r from-primary to-secondary text-dark font-body font-semibold text-sm text-center"
          >
            Hire Me
          </a>
        </div>
      </div>
    </nav>
  );
}
