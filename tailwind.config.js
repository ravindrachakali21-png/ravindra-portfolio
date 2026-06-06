/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      fontFamily: {
        display: ["'Syne'", "sans-serif"],
        body: ["'DM Sans'", "sans-serif"],
        mono: ["'JetBrains Mono'", "monospace"],
      },
      colors: {
        primary: "#00F5D4",
        secondary: "#F15BB5",
        accent: "#FEE440",
        dark: "#0A0A0F",
        card: "#111118",
        border: "#1E1E2E",
      },
      animation: {
        float: "float 6s ease-in-out infinite",
        pulse2: "pulse2 3s ease-in-out infinite",
        slide: "slide 20s linear infinite",
        typing: "typing 3.5s steps(30, end), blink 1s step-end infinite",
        fadeInUp: "fadeInUp 0.6s ease forwards",
        glow: "glow 2s ease-in-out infinite alternate",
        spin3d: "spin3d 8s linear infinite",
        bounce2: "bounce2 2s ease-in-out infinite",
        wave: "wave 2.5s ease-in-out infinite",
      },
      keyframes: {
        float: { "0%,100%": { transform: "translateY(0px)" }, "50%": { transform: "translateY(-20px)" } },
        pulse2: { "0%,100%": { opacity: 1 }, "50%": { opacity: 0.5 } },
        slide: { "0%": { transform: "translateX(0)" }, "100%": { transform: "translateX(-50%)" } },
        fadeInUp: { "0%": { opacity: 0, transform: "translateY(30px)" }, "100%": { opacity: 1, transform: "translateY(0)" } },
        glow: { "0%": { textShadow: "0 0 10px #00F5D4" }, "100%": { textShadow: "0 0 30px #00F5D4, 0 0 60px #00F5D4" } },
        spin3d: { "0%": { transform: "rotateY(0deg)" }, "100%": { transform: "rotateY(360deg)" } },
        bounce2: { "0%,100%": { transform: "translateY(0)" }, "50%": { transform: "translateY(-10px)" } },
        wave: {
          "0%": { transform: "rotate(0deg)" },
          "10%": { transform: "rotate(14deg)" },
          "20%": { transform: "rotate(-8deg)" },
          "30%": { transform: "rotate(14deg)" },
          "40%": { transform: "rotate(-4deg)" },
          "50%": { transform: "rotate(10deg)" },
          "60%,100%": { transform: "rotate(0deg)" },
        },
      },
    },
  },
  plugins: [],
};
