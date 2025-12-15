# Portfolio Website (Astro + React + Tailwind)

Dark, starfield-themed personal portfolio with Home, Work, Blog, Projects, and Search pages. Includes mini arcade, filters, and simple search across posts/projects.

## Stack
- Astro + React islands
- Tailwind CSS
- TypeScript

## Getting Started
1. Install dependencies: `npm install`
2. Run dev server: `npm run dev` (open the printed localhost URL)
3. Build for production: `npm run build`
4. Preview build: `npm run preview`

## Structure
- `src/pages`: route pages (`index`, `work`, `blog`, `projects`, `search`)
- `src/components`: React islands (starfield, filters, search, mini arcade)
- `src/data`: sample posts/projects/work data
- `src/layouts/Base.astro`: shared shell (nav/footer)

## Customization
- Edit content in `src/data/*.ts`
- Tweak colors/typography in `tailwind.config.cjs` and `src/styles/global.css`
- Replace icons/links in `src/layouts/Base.astro`
