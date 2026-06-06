export default function Footer() {
  return (
    <footer className="py-8 sm:py-10 border-t border-border bg-card/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 sm:gap-6">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-lg bg-gradient-to-br from-primary to-secondary flex items-center justify-center font-display font-bold text-dark text-base sm:text-lg">
              R
            </div>
            <div>
              <div className="font-display font-bold gradient-text text-sm sm:text-base">Chakali Ravindra</div>
              <div className="font-mono text-xs text-gray-500">Frontend Developer</div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {[
              { icon: "🐙", href: "https://github.com/ravindrachakali21-png", title: "GitHub" },
              { icon: "💼", href: "https://linkedin.com/in/chakaliravindra", title: "LinkedIn" },
              { icon: "📧", href: "mailto:ravindrachakali21@gmail.com", title: "Email" },
              { icon: "📞", href: "tel:9391216535", title: "Phone" },
            ].map((s) => (
              <a
                key={s.href}
                href={s.href}
                target={s.href.startsWith("http") ? "_blank" : undefined}
                rel={s.href.startsWith("http") ? "noreferrer" : undefined}
                title={s.title}
                className="w-9 h-9 sm:w-10 sm:h-10 rounded-lg bg-card border border-border flex items-center justify-center text-base sm:text-lg hover:border-primary/40 hover:scale-110 transition-all duration-300"
              >
                {s.icon}
              </a>
            ))}
          </div>

          <p className="font-body text-xs text-gray-500 text-center">
            © 2025 Chakali Ravindra · Built with{" "}
            <span className="text-primary">⚛️ React</span> &{" "}
            <span className="text-secondary">🎨 Tailwind</span>
          </p>
        </div>
      </div>
    </footer>
  );
}
