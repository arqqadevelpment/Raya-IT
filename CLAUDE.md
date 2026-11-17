# Raya IT website — instructions for Claude

Corporate website for **Raya Information Technology** (Egypt / KSA / UAE system integrator).
Built iteratively from the client's feedback and screenshots. Content source: the old site
https://raya-it.net. Animation / UI reference: Protexy. Follow the style below so new work matches.

@AGENTS.md

## Stack
- **Next.js 16.4** (Turbopack, **Cache Components**), React 19, TypeScript, **Tailwind v4**, `motion/react`, `lucide-react`.
- **This is not the Next.js you know.** Before writing framework code read the relevant guide in
  `node_modules/next/dist/docs/`. Cache Components rules that already bit us: no `new Date()` /
  `Math.random()` in server components; runtime data needs `<Suspense>`.
- Images use `next/image` with `unoptimized`.
- Run: `npm install`, `npm run dev` (use `-p 3002` if 3000 is taken). Check with `npx tsc --noEmit` and `npx eslint <files>`.
- If the dev server serves old CSS (a new class has no effect), restart the dev server for that port.

## Project layout
- `src/app/**/page.tsx` — pages. Specific routes override the catch-all placeholder `src/app/[...slug]/page.tsx`
  (which renders unfinished pages from `src/lib/site-map.ts`).
- `src/content/*.ts` — **all page copy and data** (home, businesses, leadership, awards, financial,
  partners, digital-workplace). Edit text here, not in components.
- `src/lib/site-map.ts` — navigation / sitemap (menu groups, slugs, breadcrumbs).
- `src/components/` — shared UI. Key ones:
  - `motion.tsx`: `Reveal`, `SplitHeading`, `Counter`, `ParallaxBg`, `PixelReveal`, `Marquee`, `ScrollWords`.
  - `ui.tsx`: `Container`, `Eyebrow`, `ButtonLink`, `ReadMore`.
  - `PageHero`, `FooterCta` (client; hidden on `/contact*`; topic-aware on `/solutions/digital-workplace*`),
    `SolutionCards`, `ServicesOrbit`, `IndustriesSlider` (exports `Card`), `WorkplaceDetailPage`,
    `UseCasesSlider`, `AwardsGrid`, `DirectorCard`, `Header`, `Footer`, `FlagMark`.
- Images: `public/images/<area>/...`. Prefer **webp**.

## Brand tokens (defined in `src/app/globals.css`)
`navy #001780`, `deep #000a3d` (dark sections), `blue #2460ac`, `electric #0165E8`, `sky #89C1F0`,
`mist #e7e7e7`, `grey #a3a3a3`, `surface #f4f6fb` (alternating light sections), `ink #0a1033` (body text).
Secondary colours (red/yellow/orange/green) are for sparing use only — never floods of background or text.
Font: Inter Variable. Container: `max-w-page` (80rem) with `px-5 sm:px-8`.

## House style (decisions the client has made — keep them)
- **Buttons**: always `ButtonLink` / the `.btn-glow` class — glowing gradient *stroke* (electric → sky), no solid
  fill. On dark backgrounds: 15% navy fill + white text. On white/light backgrounds pass `tone="light"`
  (transparent fill, navy text). Do not reintroduce solid-filled or pill-with-arrow-circle buttons.
- **Headings**: use `SplitHeading` (word-reveal). The coloured part (`accent`) is a **gradient**, not a flat colour.
  Pass `accentClassName="text-electric"` on light backgrounds, default (`text-sky`) on dark ones — this only selects
  the light/dark gradient. For a whole line in gradient use the `gradient` prop. Force a line break with `" \n "`.
  Many headings are intentionally **2 lines**.
- **No decorative numbers or "tag" labels** on cards/sections (e.g. "01", "Solution 01", small eyebrow tags were removed
  from cards and Digital Workplace sections). Don't add them back unless asked.
- **Cards on dark sections**: translucent dark glass (`bg-deep/45…70`, `border-white/10`, `backdrop-blur`), white text,
  sky links. Icons on dark glass: rounded-2xl tile `border-white/25 bg-white/15 backdrop-blur-md` with thin white
  lucide icon (`size 26`, `strokeWidth 1.6`). Solution cards have **no icons**.
- **Backgrounds**: image sections use `ParallaxBg` + a `bg-deep/xx` overlay; keep text readable.
- **Emblem (`FlagMark`)** must never be cropped: place it fully inside its container (not with negative offsets) and
  below the header bar in `PageHero`.
- **Sections alternate** `bg-white` / `bg-surface` on light pages. CTA at the bottom of pages comes from `FooterCta`.
- **Copy**: reduce long text when asked; shortened/invented wording is marked in content files with
  `PROPOSED EDIT` comments for the client to review — keep doing that when you write copy that isn't from the old site.
- Services shown on the home page are the 6 in the sitemap (the brief once said "eight"; not confirmed).

## Working style with the client
- Requests arrive as screenshots + short instructions ("remove numbers", "make it darker"). Do exactly that, keep the
  change small, don't redesign around it.
- **Verify visually in the browser** (preview at several widths: desktop ~1440, tablet, mobile). Reveal animations and
  lazy images only show after a real scroll — scroll to the section before judging. Reset any viewport emulation after.
- Respect `prefers-reduced-motion` (animations have static fallbacks).
- Keep it accessible: real `<button>`/`<a>`, `aria-label`s on icon-only controls, `sr-only` text for "opens in new tab".
- "Read More" links open in a new tab (sitemap rule). Financial statements PDFs open in a new tab.

## Image workflow
Client drops original PNG/JPG into `public/images/...`. Convert with Python PIL (or `sips`) to webp
(quality ~82), save under the path the content file already references (keep the filename), then move the original out
of the repo. Don't commit large originals or stray reference files (e.g. `public/index.html`).

## Git
- Remote: `github.com/arqqadevelpment/Raya-IT`. Work happens on a branch (`hero-video` worktree) and is pushed with
  `git push origin hero-video:main` **only when the client asks**. Never force-push.
- Commit message style: short imperative subject + bullet list; end with the required Co-Authored-By line.
- The original folder `Raya IT` (network-animation hero) is a separate line of work — don't edit it from this one.
