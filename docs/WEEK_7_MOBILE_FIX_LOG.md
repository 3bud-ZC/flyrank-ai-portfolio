# Week 7 Mobile Fix Log

## Scope

The public FlyRank AI portfolio was reviewed on a real iPhone and against narrow-width responsive behavior. The audit focused on readability, touch targets, horizontal containment, project media, primary actions, keyboard focus, and reduced-motion behavior.

Live site: https://3bud-zc.github.io/flyrank-ai-portfolio/

## Evidence baseline

The real-phone capture from the Week 5 release showed that the site was usable and readable, but it also exposed areas that could become fragile on narrower devices:

- The five navigation links depended on fitting in one row.
- The two hero actions could become cramped on very narrow screens.
- The headline occupied a large part of the first viewport.
- Text links did not all provide an explicit 44 px minimum touch height.
- Keyboard focus was not visually emphasized across all actionable elements.
- Hover transforms were unnecessary on touch-only devices.

## Fixes implemented

### 1. Navigation containment and touch targets

**Problem:** The navigation could compress or overflow on narrower phones, and link height depended only on padding.

**Change:** The navigation remains a single horizontal row with controlled horizontal scrolling, hidden scrollbars, scroll snapping, and non-shrinking items. Every navigation item now has a minimum height of 44 px.

**Result:** All destinations stay reachable without forcing tiny labels or breaking the header layout.

### 2. Mobile headline and spacing

**Problem:** The large desktop headline scale consumed too much of the first mobile viewport.

**Change:** Mobile-specific heading size, line height, letter spacing, hero gaps, and vertical padding were tightened without changing the desktop presentation.

**Result:** The claim remains prominent while the supporting explanation and actions appear earlier.

### 3. Primary action layout

**Problem:** Two side-by-side hero buttons could become cramped below common phone widths.

**Change:** The buttons use a two-column grid on standard phones and automatically become one full-width column below 30 rem. Each action has a minimum height of 52 px.

**Result:** Labels remain readable and both actions are easy to tap with one hand.

### 4. Card and case-study media

**Problem:** Card padding and case-study media consumed unnecessary space on small screens.

**Change:** Mobile card padding was reduced consistently, project media uses a stable 16:9 ratio, and case-study images use a responsive 16:10 container without a restrictive maximum height.

**Result:** Images remain crisp and contained, with more space available for the actual project evidence.

### 5. Accessible focus and motion behavior

**Problem:** Keyboard focus was not consistently visible, and hover transforms were irrelevant on touch-only devices.

**Change:** Links and buttons now receive a high-contrast focus-visible outline. Hover lifting is disabled when hover is unavailable. Reduced-motion preferences disable smooth scrolling and nearly all transition or animation duration.

**Result:** The same interface works more predictably for keyboard, touch, and motion-sensitive users.

## Verification checklist

- [x] Minimum supported width remains 320 px.
- [x] Navigation items do not shrink below readable touch targets.
- [x] Hero actions stack at narrow phone widths.
- [x] Main headings use a mobile-specific scale.
- [x] Cards and images remain inside their containers.
- [x] Focus-visible styling is present for links and buttons.
- [x] Touch-only devices do not receive decorative hover movement.
- [x] Reduced-motion behavior is respected.
- [ ] Final post-deployment screenshot captured on a real phone.

## Files changed

- `src/week7-mobile.css`
- `src/main.tsx`

## Honest boundary

A stylesheet audit and browser-width review cannot replace testing on every physical device. The final assignment evidence therefore includes a real-phone screenshot of the deployed build after this change.
