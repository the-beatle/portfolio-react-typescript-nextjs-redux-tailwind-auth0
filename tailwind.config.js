module.exports = {
  mode: "jit",
  purge: ["./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: false,
  theme: {
    extend: {
      fontFamily: {
        mono: ["Custom-1", "ui-monospace", "monospace"],
        light: ["Custom-2", "ui-monospace", "monospace"],
      },
      gridTemplateColumns: {
        detail: "minmax(0, 1fr) 16rem",
      },
      colors: {
        ink: {
          900: "#111827",
          800: "#1f2937",
          700: "#273449",
        },
      },
    },
  },
  plugins: [],
}
