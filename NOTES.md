# Raya IT website — handoff notes

Hi! This is everything you need to pick the project up. The assistant-specific rules live in `CLAUDE.md`
(Claude Code reads it automatically); this file is the human overview.

## 1. Get running
```bash
git clone https://github.com/arqqadevelpment/Raya-IT.git
cd Raya-IT
npm install
npm run dev          # http://localhost:3000  (add  -- -p 3002  to use another port)
```
Checks before pushing: `npx tsc --noEmit` and `npm run lint`.
Tip: if a new CSS class has no effect, the dev server is serving stale CSS — stop and restart it.

## 2. What the site is
Corporate site for Raya Information Technology. Next.js 16 + Tailwind v4 + motion. All copy lives in
`src/content/*.ts`; navigation lives in `src/lib/site-map.ts`; unfinished pages fall back to a placeholder
(`src/app/[...slug]/page.tsx`). Old site used for content: https://raya-it.net.

## 3. What's built
- **Home**: hero (looping wave video), Who we are (key facts), Solutions (image background, dark glass cards),
  Services (animated dot-sphere "orbit" with numbered nodes + hover cards), Industries (slider),
  Sustainability, Partners (logo marquee).
- **Who We Are**: About Raya IT (Mission & Vision, Journey timeline, Key Facts, Regional Presence), Our Businesses,
  Leadership, Our Partners, Awards & Certifications (67 awards with year filter), Financial Statements (PDF cards).
- **Solutions → Digital Workplace**: main page + **Collaboration** + **Integrated Low Current** detail pages
  (shared template `WorkplaceDetailPage`).
- **Contact** page with inquiry form (also reached from the topic-aware footer CTA).
- Header with mega menu, footer, breadcrumbs, page hero with emblem.

## 4. Design language (short version)
Brand blues (navy `#001780`, electric `#0165E8`, sky `#89C1F0`), Inter font. Glowing gradient-stroke buttons,
gradient accent in headings, dark glass cards on dark sections, alternating white / light-blue sections, parallax
image backgrounds with a dark overlay. No small number/tag labels on cards. Full rules: `CLAUDE.md`.

## 5. How the client works with us
They send a screenshot and a short instruction. Change exactly that, check it in the browser (desktop + mobile),
and report what you did. They review on `localhost` — there is **no public preview/staging link yet**
(deploying to Vercel would solve that; needs the client's OK).

## 6. Images
Drop originals in `public/images/...`, convert to webp (PIL/`sips`), keep the filename the content file points to,
remove the original from the repo. Credits: `docs/image-credits.md`. Homepage content brief:
`docs/Raya_IT_Homepage_Content_Claude_Ready.docx`.

## 7. Git workflow
- Pushes to `main` are made **only when the client asks** ("push all changes to main").
- Don't force-push. Don't commit originals (`*.png` from the client), `public/index.html` (a reference demo file)
  or other scratch files.
- A separate folder/branch with a *network-animation hero* exists from another workstream — `main` currently
  contains the **looping wave video** hero. Ask before merging the two.

## 8. Open items / things to confirm with the client
1. **Services count**: the home "Our Services" orbit shows the **6** services in the sitemap (Infrastructure,
   Cybersecurity, Business Application/ERP, Digital Intelligence, RDC, Managed Services). The client once said
   "eight" — get the two missing services (name + description) or confirm six.
2. **Customer Experience** (Digital Workplace): has a summary card on the main page, but **no detail page / content** yet.
3. **Integrated Low Current** page: built, but its visuals (icons, dark components section, 6-industry grid) haven't
   been reviewed with the client. It has no Use Cases slider (Collaboration does).
4. Wording marked `PROPOSED EDIT` in `src/content/digital-workplace.ts` and `home.ts` (shortened component texts,
   Customer Experience summary, Raya Added Value titles, Increase Productivity text) is **ours, not the client's** —
   needs sign-off.
5. Remaining sitemap pages still use the placeholder template (most of Solutions, Services, Industries, Media Center).
6. Mobile / tablet review of the newest pieces (Services orbit card on tap, glow buttons in the header menu).
7. Public preview link / deployment.

## 9. Gotchas we hit
- Cache Components: don't use `new Date()` / random values in server components.
- Reveal animations and lazy images appear only after scrolling — scroll before judging screenshots.
- `FlagMark` was being cropped by `overflow-hidden` + negative offsets; keep it inside.
- Tailwind arbitrary opacity like `bg-deep/72` works; the dev server sometimes needs a restart to pick up `globals.css`.
