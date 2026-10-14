# Huisstijl contributor instructions

- This package is the single source of colours and shared components for ControlDeck, Myscripts and pcmanager. Projects must not redefine token values.
- Colours only as tokens in `css/tokens.css`, defined for both dark (default) and `data-theme="light"`. `components.css` uses `var(--…)` only; a test enforces it.
- Components in `react/` contain markup and behaviour only — no inline colours or layout CSS.
- Icons are original drawings. Do not copy code, CSS or assets from ProxMenux (GPL-3.0) or other projects; inspiration only.
- Every change: update `demo/index.html` when a component is added or changed, run `npm test` and `npm run typecheck`, and check the demo in both themes and at 375px width.
- Removing or renaming a class or token is a breaking change (major version); note it in the README.
