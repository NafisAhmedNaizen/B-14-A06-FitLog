# 💪 FitLog — Workout Library

A dark, no-nonsense gym companion built with Next.js. Pick a lift, lock it into today's plan, and watch the week's work add up.

## Description

FitLog is a responsive workout library and planning app. Browse twelve curated lifts covering every major muscle group, add them to your daily plan (capped at 5), save favorites for later, mark lifts as done, and track total exercises, minutes, and calories — all with a clean dark UI and lime accent.

## Technologies Used

- **Next.js 15** (App Router)
- **React 18**
- **TypeScript**
- **Tailwind CSS v4**
- **localStorage** for plan/saved persistence

## Key Features

1. **Responsive Workout Library** — 3×4 grid of workout cards on desktop that collapses cleanly on tablet and mobile; each card shows image, muscle tags, equipment, duration, calories, and rating.
2. **Workout Detail Pages** — Full two-column layout with large illustration, key specs, ordered instructions, and CTAs to add to plan or save for later.
3. **Today's Plan & Saved Tabs** — Cap of 5 lifts for today; live metrics (Exercises / Minutes / Calories); mark as done and remove actions with toast feedback.
4. **Navbar Status Badges** — Live Plan and Saved counters that link to `/my-plan`; active nav link highlighting.
5. **Sort Dropdown** — Sort the library by Duration, Calories, or Rating with a clean select control.
6. **Toast Notifications** — Instant feedback when adding, saving, removing, or marking lifts done.
7. **404 Page & Loading States** — Proper not-found route and loading spinner while data is fetched.
8. **Persistence** — Plan and saved lists survive page reloads via localStorage.

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## API

- All workouts: `https://api.abcz.workers.dev/api/fitlog`
- Single workout: `https://api.abcz.workers.dev/api/fitlog/:id`

## Deployment

Deploy to Vercel, Netlify, or Cloudflare Pages. The app is a pure client-side data consumer and works with static export if desired.

## License

