# 💪 FitLog — Workout Library
**Train with intent. Log every set.**

A dark, no-nonsense gym companion built with Next.js. Browse a curated workout library, lock lifts into today’s plan, save favorites, and track your session — all in a clean, responsive dark UI.

---
## Description

FitLog is a responsive workout library and planning app. Browse twelve curated lifts covering every major muscle group, add them to your daily plan, save favorites for later, mark lifts as done, and track total exercises, minutes, and calories — all with a clean dark UI and lime accent.


---
## ✨ Features

1. **Workout Library** — Responsive 3-column grid of 12 lifts covering every major muscle group, with images, tags, equipment, duration, calories, and rating.
2. **Workout Detail Pages** — Two-column layout with large illustration, key specs, step-by-step instructions, and CTAs to add to plan or save for later.
3. **My Plan Dashboard** — Cap of 5 lifts for today, live metrics (Exercises / Minutes / Calories), tabs for Today’s Plan & Saved, mark as done, and remove.
4. **Live Navbar Badges** — Plan and Saved counters that update in real time and link to `/my-plan`.
5. **Sort & Feedback** — Sort library by Duration, Calories, or Rating + toast notifications for every action.
6. **Persistence** — Plan and saved data survive page reloads via `localStorage`.

---


## 🛠️ Technologies Used

| Technology        | Purpose                          |
|-------------------|----------------------------------|
| Next.js 15        | App Router & UI framework        |
| React 18          | Component library                |
| TypeScript        | Type safety                      |
| Tailwind CSS v4   | Styling & responsive design      |
| localStorage      | Client-side plan/saved storage   |

---

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

## API

- All workouts: `https://api.abcz.workers.dev/api/fitlog`
- Single workout: `https://api.abcz.workers.dev/api/fitlog/:id`

## Deployment

Deploy to Vercel, Netlify, or Cloudflare Pages. The app is a pure client-side data consumer and works with static export if desired.

## License

