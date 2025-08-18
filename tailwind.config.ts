// tailwind.config.ts
import type { Config } from "tailwindcss"

const config = {
  // ... (darkMode, dll.)
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}', // Pastikan path ini mencakup semua file Anda
	],
  prefix: "",
  theme: {
    container: {
      // ... (pengaturan container dari ShadCN)
    },
    extend: {
      // ... (pengaturan extend dari ShadCN)
    },
  },
} satisfies Config

export default config