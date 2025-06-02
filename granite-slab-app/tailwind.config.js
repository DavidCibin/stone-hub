/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      overflow: {
        "unset": "unset",
      },
    },
  },
  extend: {
    keyframes: {
      // Define the fade-in animation
      fadeIn: {
        '0%': { opacity: '0' },
        '100%': { opacity: '1' },
      },
      // Define the fade-out animation
      fadeOut: {
        '0%': { opacity: '1' },
        '100%': { opacity: '0' },
      },
    },
    animation: {
      // Link the keyframes to utility classes
      'fade-in': 'fadeIn 0.5s ease-out forwards', // 0.5s duration, ease-out timing, forwards to retain final state
      'fade-out': 'fadeOut 0.5s ease-out forwards', // Same duration and timing
    },
  },
  plugins: [],
};
