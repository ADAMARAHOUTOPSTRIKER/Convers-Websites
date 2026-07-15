# CONVERS. — Web Experience Studio

A conversion-focused marketing landing page for the CONVERS. web agency, built
with React 19, Vite 6, Tailwind CSS v4, `motion`, and `lucide-react`.

## Getting started

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build
npm run lint     # tsc --noEmit type check
```

> Replace the placeholder images in `src/assets/images/` with the real renders
> (same filenames) — see the README in that folder.

## Structure

| File | Purpose |
|------|---------|
| `src/App.tsx` | Landing page layout (hero → problem → solution → work → offer → differentiation → urgency → CTA → footer) |
| `src/components/HeroAnimation.tsx` | Interactive "3D" browser mockup with parallax tilt |
| `src/components/InteractiveMockups.tsx` | Dealership / perfume / beach-club customizers |
| `src/components/BookingModal.tsx` | 3-step booking flow (persists to `localStorage`) |
| `src/types.ts` | Shared `Booking` / `TimeSlot` types |

## Fixes applied over the original AI Studio export

- **Removed the 1.5s polling loop.** `App` no longer re-reads `localStorage` on a
  timer. Same-tab updates now flow through a `convers_bookings_updated` custom
  event dispatched by the booking modal; cross-tab updates still use `storage`.
- **Timezone-safe dates.** Date keys are formatted/parsed from *local* calendar
  fields instead of `toISOString()`, fixing an off-by-one-day bug in
  negative-UTC timezones (booking grid, confirmation badge, success screen).
- **Replaced deprecated `String.prototype.substr`** with `slice` for booking IDs.
- **Removed dead code**: the unused `pastBookings` state + its effect in the
  modal, and unused icon/`motion` imports across components.
- **Added the missing project scaffolding** (`index.html`, `vite.config.ts`,
  `tsconfig.json`, `vite-env.d.ts`) that the original single-file export omitted,
  so the app actually builds and runs.

The visual design and all user-facing functionality are unchanged.

## Notes

Booking data is stored in the browser's `localStorage` only — there is no
backend, and the "calendar invite" / performance-target figures shown on the
success screen are illustrative copy, not live data.
