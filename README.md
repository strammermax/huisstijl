# Huisstijl

Eén gedeelde stijl voor de homelab-websites: **ControlDeck**, **Myscripts** en **pcmanager**.
De vormgeving is geïnspireerd op [ProxMenux Monitor](https://github.com/MacRimi/ProxMenux)
(donker, kaarten, tabrij-navigatie). Er is geen code van ProxMenux overgenomen; CSS en iconen zijn eigen werk.

## Opbouw

| Pad | Inhoud | Voor |
|---|---|---|
| `css/tokens.css` | Kleuren, lettertypen, radius, schaduw; donker standaard, `data-theme="light"` voor licht | iedereen |
| `css/components.css` | Topbar, navigatie, kaarten, widgets, meters, tabellen, tabs, formulieren, meldingen, modal, log, login | iedereen |
| `huisstijl.css` | Importeert beide | iedereen |
| `icons/icons.js` | Eigen 24×24 lijn-iconen als SVG-markup + `iconSvg()` | vanilla JS en React |
| `react/index.tsx` | `AppShell`, `Topbar`, `Navigation`, `Modal`, `Card`, `Widget`, `Meter`, `DataTable`, `Tabs`, `StatusPill`, `Notice`, `LogView`, `ThemeToggle`, `useTheme`, `Icon` | React (ControlDeck, Myscripts) |
| `demo/index.html` | Levend overzicht van alle onderdelen | controle bij wijzigingen |

Componenten bevatten alleen markup; alle opmaak zit in de CSS. Klassen volgen de ControlDeck-namen
(`.topbar`, `.navigation`, `.nav-item`, `.widget`, `.modal`, …), zodat bestaande pagina's zonder hernoemen overstappen.

### Kleuren

| Token | Donker | Licht | Gebruik |
|---|---|---|---|
| `--bg` | `#1b1b1b` | `#f6f6f6` | pagina |
| `--card` | `#202020` | `#fff` | kaarten, topbar |
| `--text` / `--muted` | `#e8e8e8` / `#969696` | `#242424` / `#666` | tekst |
| `--border` | `#333` | `#d7d7d7` | randen |
| `--blue` | `#3782f6` | | accent, actief, primaire knop |
| `--green` / `--yellow` / `--red` | `#63c691` / `#e9b900` / `#f08080` | | ok / waarschuwing / fout |
| `--danger` | `#c0392b` | | verwijderknop |

Statussen: `.status.ok|warning|error|running|neutral` (pil) en `.state.*` (tekst in tabellen).

## Gebruik

### React / Next.js (ControlDeck, Myscripts)

```sh
npm install github:strammermax/huisstijl#v2026.10.14.1
```

```js
// next.config.mjs
const config = { output: "export", transpilePackages: ["@vanburik/huisstijl"] };
```

```tsx
import "@vanburik/huisstijl/huisstijl.css";
import { AppShell, Topbar, Navigation, ThemeToggle, useTheme } from "@vanburik/huisstijl/react";

const [theme, toggle] = useTheme();
<AppShell topbar={<Topbar title="Myscripts" subtitle="Proxmox toolbox" logo="/logo.jpg"><ThemeToggle theme={theme} onToggle={toggle} /></Topbar>}
          navigation={<Navigation items={items} active={page} onSelect={setPage} />}>
  …
</AppShell>
```

Projectspecifieke CSS komt ná `huisstijl.css` en gebruikt alleen de tokens (`var(--blue)`), geen eigen kleurcodes.

### Zonder bundler (pcmanager, losse HTML)

```sh
npm run dist          # schrijft dist/huisstijl.css (één bestand) en dist/icons.js
```

Kopieer `dist/` naar `wwwroot/huisstijl/` en laad `huisstijl.css` vóór de eigen `app.css`.
Iconen: `import { iconSvg } from "./huisstijl/icons.js"; el.innerHTML = iconSvg("proxmox");`

## Ontwikkelen

```sh
npm install
npm test           # tokens, klassen, iconen, dist-build
npm run typecheck  # React-componenten
npx serve .        # open /demo/ en controleer beide thema's en 375px breedte
```

Versies volgen `yyyy.mm.dd.buildnr` (zoals Myscripts en infisical-secret-client) en staan in `VERSION`.
Tag elke release als `v2026.10.14.1` zodat projecten een vaste versie pinnen. npm eist semver, daarom
staat in `package.json` dezelfde versie als `2026.10.14+1`. Een gewijzigde of verwijderde klasse of token
breekt projecten: vermeld dat in de commit en pas de projecten in dezelfde ronde aan.
