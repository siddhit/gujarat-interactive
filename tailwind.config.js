/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,jsx,ts,tsx}',
    './components/**/*.{js,jsx,ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        cream:  '#F5EFE2',
        indigo: {
          DEFAULT: '#1A1A48',
          soft:    '#2A2960',
        },
        rust:   '#B04E18',
        gold:   '#C49532',
        muted:  '#8080A8',
        surface: '#0e0e28',
        era: {
          early:     '#7B5AB4',
          sultanate: '#B44040',
          mughal:    '#3A6AB0',
          company:   '#3A8A3A',
          modern:    '#2A5A8A',
        },
        marker: {
          person: '#F5EFE2',  // cream text on indigo bg
          place:  '#F5EFE2',  // cream text on rust bg
          event:  '#F5EFE2',  // cream text on green bg
        },
      },
      fontFamily: {
        eng:  ['"Playfair Display"', 'Georgia', 'serif'],
        body: ['"Cormorant Garamond"', 'Georgia', 'serif'],
        guj:  ['"Tiro Gujarati"', 'serif'],
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      transitionTimingFunction: {
        spring: 'cubic-bezier(0.34, 1.56, 0.64, 1)',
      },
      width: {
        panel: '360px',
      },
    },
  },
  plugins: [],
};
