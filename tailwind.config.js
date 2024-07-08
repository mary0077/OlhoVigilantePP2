/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sora: ['Sora'],
        rubik: ['Rubik'],
      },
      container: {
        center: true,
        screens: {
          xl: '1104px',
        },
      },
      backgroundImage: {
        'pin-icon': "url('/pin.svg')",
        'loudspeaker-icon': "url('/loudspeaker.svg')",
        'clock-icon': "url('/clock.svg')",
        'upvote-icon': "url('/upvote.svg')",
        'downvote-icon': "url('/downvote.svg')",
        'upvote-hover-icon': "url('/upvote-hover.svg')",
        'downvote-hover-icon': "url('/downvote-hover.svg')",
        'trash-icon': "url('/trash.svg')",
        'trash-hover-icon': "url('/trash-hover.svg')",
      }
    },
  },
  plugins: [],
};
