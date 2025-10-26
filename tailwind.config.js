
module.exports = {
  darkMode: ["class", '[data-theme="dark"]'],
  content: ["./src/**/*.{js,jsx,ts,tsx}", "./content/**/*.{mdx,md}", "./blog/**/*.{mdx,md}"],
  theme: {
    extend: {
      colors: {
        // Design System Core Colors
        "ds-black": "#000000",
        "ds-white": "#FFFFFF",
        "ds-gray-light": "#CCCCCC",
        "ds-gray-medium": "#888888",
        "ds-gray-dark": "#333333",
        "ds-blue-primary": "#3b82f6",
        "ds-blue-dark": "#1e40af",
        "ds-blue-light": "#60a5fa",
        "ds-blue-accent": "#2563eb",
        "ds-gray-muted": "#AAAAAA",
        // Legacy colors (keeping for compatibility)
        "burgundy-300": "#B47DA0",
        "burgundy-400": "#9B5181",
        "burgundy-500": "#822661",
        "grey-50": "#f6f6f6ff",
        "grey-100": "#eaeaeaff",
        "grey-200": "#dcdcdcff",
        "grey-300": "#c8c8c8ff",
        "grey-400": "#a2a2a2ff",
        "grey-500": "#808080ff",
        "grey-600": "#5a5a5aff",
        "grey-700": "#474747ff",
        "grey-800": "#2a2a2aff",
        "grey-850": "#131313ff",
        "grey-900": "#070707ff",
      },
      fontFamily: {
        "ds-mono": ["IBM Plex Mono", "Courier New", "monospace"],
      },
      fontSize: {
        "ds-xs": "12px",
        "ds-sm": "14px",
        "ds-md": "16px",
        "ds-lg": "18px",
        "ds-xl": "20px",
      },
      lineHeight: {
        "ds-tight": "1.4",
      },
      letterSpacing: {
        "ds-wide": "0.05em",
        "ds-normal": "0em",
      },
      spacing: {
        "ds-1": "4px",
        "ds-2": "8px",
        "ds-3": "12px",
        "ds-4": "16px",
        "ds-6": "24px",
      },
      animation: {
        // Design System Animations
        "ds-blink": "ds-blink 1s infinite",
        "ds-transition": "all 0.2s ease-in-out",
        // Dropdown menu
        "scale-in": "scale-in 0.2s ease-in-out",
        "slide-down": "slide-down 0.6s cubic-bezier(0.16, 1, 0.3, 1)",
        "slide-up": "slide-up 0.6s cubic-bezier(0.16, 1, 0.3, 1)",
        // Tooltip
        "slide-up-fade": "slide-up-fade 0.4s cubic-bezier(0.16, 1, 0.3, 1)",
        "slide-right-fade":
          "slide-right-fade 0.4s cubic-bezier(0.16, 1, 0.3, 1)",
        "slide-down-fade": "slide-down-fade 0.4s cubic-bezier(0.16, 1, 0.3, 1)",
        "slide-left-fade": "slide-left-fade 0.4s cubic-bezier(0.16, 1, 0.3, 1)",
        // Navigation menu
        "enter-from-right": "enter-from-right 0.25s ease",
        "enter-from-left": "enter-from-left 0.25s ease",
        "exit-to-right": "exit-to-right 0.25s ease",
        "exit-to-left": "exit-to-left 0.25s ease",
        "scale-in-content": "scale-in-content 0.2s ease",
        "scale-out-content": "scale-out-content 0.2s ease",
        "fade-in": "fade-in 0.2s ease",
        "fade-out": "fade-out 0.2s ease",
        // Toast
        "toast-hide": "toast-hide 100ms ease-in forwards",
        "toast-slide-in-right":
          "toast-slide-in-right 150ms cubic-bezier(0.16, 1, 0.3, 1)",
        "toast-slide-in-bottom":
          "toast-slide-in-bottom 150ms cubic-bezier(0.16, 1, 0.3, 1)",
        "toast-swipe-out": "toast-swipe-out 100ms ease-out forwards",
      },
      keyframes: {
        "ds-blink": {
          "0%, 50%": { opacity: "1" },
          "51%, 100%": { opacity: "0.3" },
        },
      },
    },
  },
  plugins: [require("@tailwindcss/typography"), require("tailwindcss-radix")()],
};
