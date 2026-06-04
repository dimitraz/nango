# Webapp theming phases

Goal: make dark AND light mode work app-wide before per-screen redesigns.
Success bar: dark mode must not look worse than current master. Light mode
should be usable, not polished.

## What the bridge files cover automatically

`tokens-bridge.css` (Phase 2B) — maps v2 functional tokens to DS semantics.
Any component using `bg-bg-surface`, `text-text-primary`, etc. is already themed.

`tokens-bridge-primitives.css` (Phase 2C, PoC) — maps v2 gray primitives and
v1 legacy tokens to DS semantics. Best-effort, intentionally lossy.
Remove the `@import` in `index.css` to revert.

## What the bridge does NOT cover

Tailwind core colors baked directly into className strings:
- `text-white`, `text-black`
- `text-blue-400`, `text-red-*`, `text-yellow-*`, `text-green-*`
- Any raw hex like `text-[#abc123]`

These need direct component edits in Phase 3.

---

## Phase 3 — Page-by-page precision migration

Each phase: grep the page for un-themed color classes → replace with DS
semantic tokens → visual check in dark + light mode.

DS semantic tokens to use (prefer these over everything else):
- Text: `text-text-primary/secondary/tertiary/disabled/brand`
- Backgrounds: `bg-bg-surface/elevated/muted/subtle`
- Borders: `border-border-default/muted/strong`
- Status: `text-feedback-*-fg`, `bg-feedback-*-bg`
- Interactive: `text-text-link`, `text-btn-primary-fg`

---

### Phase 3A — Homepage / Metrics dashboard
Files:
- `pages/Homepage/Show.tsx`
- `pages/Homepage/components/InsightChart.tsx`

Known un-themed tokens: `text-white`, `text-light-gray`, `border-gray`,
`active-gray`, `blue-400`, `gray-400`

### Phase 3B — Logs page
Files (8):
- `pages/Logs/Show.tsx`
- `pages/Logs/components/OperationDrawer.tsx`
- `pages/Logs/components/OperationRow.tsx`
- `pages/Logs/components/OperationTag.tsx`
- `pages/Logs/components/SearchAllOperations.tsx`
- `pages/Logs/Operation/Show.tsx`
- `pages/Logs/Operation/Message/Show.tsx`
- `pages/Logs/Operation/components/LogRow.tsx`
- `pages/Logs/Operation/components/Logs.tsx`

Known un-themed tokens: `text-white`, `text-gray-400`, `border-gray-400`,
`bg-active-gray`, `bg-grayscale-900`, `text-grayscale-400/500`,
`text-text-light-gray`, `bg-pure-black`, `border-border-gray-400`,
`text-blue-400`, `hover:border-l-red-500`, `hover:border-l-yellow-400`,
`hover:border-l-blue-400`

Note: LogRow uses colored left-border as status indicator — map
`red-500 → text-danger`, `yellow-400 → status-warning-icon`,
`blue-400 → status-info-icon`, `gray-400 → border-default`.

### Phase 3C — Connections
Files:
- `pages/Connection/Create.tsx`
- `pages/Connection/CreateLegacy.tsx` (heavy legacy)
- `pages/Connection/components/IntegrationDropdown.tsx`
- `pages/Connection/components/AuthCredentials/` (10 files — mostly similar patterns)

### Phase 3D — Integrations
Files:
- `pages/Integrations/components/CatalogBadge.tsx`

Known: `red-300`, `green-500`, `yellow-500` — map to DS status tokens.

### Phase 3E — Getting Started
Files:
- `pages/GettingStarted/ClassicGettingStarted.tsx`

### Phase 3F — Small pages
Files:
- `pages/PageNotFound.tsx`
- `pages/PageEnvironmentUnauthorized.tsx`
- `pages/User/Settings.tsx`
- `pages/Team/components/ImpersonateForm.tsx`
- `pages/Account/EmailVerified.tsx`
- `pages/Account/VerifyEmailByExpiredToken.tsx`

### Phase 3G — Environment Settings
Files:
- `pages/Environment/Settings/Show.tsx`
- `pages/Environment/Settings/ConnectUISettings/index.tsx`

### Phase 3H — Layout shells
Audit `layout/` directory for any remaining un-themed colors.

---

## Raw hex values

Currently none found in `pages/` or `layout/`. Will update if discovered
during Phase 3 work.
