/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        dough: '#FAF6F0',      // Fundo Principal (Massa Crua / Queijo Mussarela)
        tomato: '#D9381E',     // Cor Primária / Destaque (Molho de Tomate Rústico)
        crust: '#E6A15C',      // Cor Secundária (Borda Assada / Crosta)
        basil: '#3B7A57',      // Ponto de Contraste (Folha de Manjericão)
        charcoal: '#2B2927',   // Tipografia / Textos (Forno a Lenha)
      },
      fontFamily: {
        display: ['"Syne"', '"Plus Jakarta Sans"', 'sans-serif'],
        sans: ['"DM Sans"', '"Inter"', 'sans-serif'],
      },
      boxShadow: {
        'artisan': '0 20px 50px -12px rgba(43, 41, 39, 0.08)',
        'artisan-sm': '0 8px 24px -6px rgba(43, 41, 39, 0.06)',
      }
    },
  },
  plugins: [],
}
