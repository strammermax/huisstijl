"use client";
/** Huisstijl React components. Markup only; all styling lives in huisstijl.css. */
import { useCallback, useEffect, useId, useRef, useState, type ReactNode } from "react";
import { icons } from "../icons/icons.js";

export type Theme = "dark" | "light";
export type Tone = "ok" | "warning" | "error" | "running" | "neutral" | "online" | "offline" | "checking" | "info";

/** Inline SVG icon from the shared set; unknown names fall back to "dashboard". */
export function Icon({ name, size = 20, className = "nav-icon" }: { name: string; size?: number; className?: string }) {
  return <svg className={className} width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor"
    strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"
    dangerouslySetInnerHTML={{ __html: icons[name] ?? icons.dashboard }} />;
}

/** Reads/stores the theme on <html data-theme> and in localStorage (best effort). */
export function useTheme(storageKey = "huisstijl-theme"): [Theme, () => void] {
  const [theme, setTheme] = useState<Theme>("dark");
  useEffect(() => {
    let stored: string | null = null;
    try { stored = localStorage.getItem(storageKey); } catch { /* private mode */ }
    if (stored === "light" || stored === "dark") setTheme(stored);
  }, [storageKey]);
  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    try { localStorage.setItem(storageKey, theme); } catch { /* private mode */ }
  }, [theme, storageKey]);
  return [theme, useCallback(() => setTheme(t => t === "dark" ? "light" : "dark"), [])];
}

export function ThemeToggle({ theme, onToggle }: { theme: Theme; onToggle: () => void }) {
  return <button type="button" className="theme" onClick={onToggle} aria-label={theme === "dark" ? "Licht thema" : "Donker thema"}>
    <Icon name={theme === "dark" ? "sun" : "moon"} />
  </button>;
}

export function StatusPill({ tone, children }: { tone: Tone; children: ReactNode }) {
  return <span className={`status ${tone}`}>{children}</span>;
}

export type NavEntry = { id: string; label: string; icon?: string; href?: string };

export function Topbar({ title, subtitle, logo, children }: { title: string; subtitle?: string; logo?: string; children?: ReactNode }) {
  return <header className="topbar">
    <div className="brand">
      {logo && <img className="logo" src={logo} alt="" />}
      <div><h1>{title}</h1>{subtitle && <div className="subtitle">{subtitle}</div>}</div>
    </div>
    <div className="tools">{children}</div>
  </header>;
}

/** Tab-row navigation; collapses to a hamburger list below 800px. */
export function Navigation({ items, active, onSelect }: { items: NavEntry[]; active: string; onSelect?: (id: string) => void }) {
  const [open, setOpen] = useState(false);
  const current = items.find(i => i.id === active);
  return <>
    <button type="button" className="hamburger" aria-expanded={open} onClick={() => setOpen(o => !o)}>
      <Icon name="menu" />{current?.label ?? "Menu"}
    </button>
    <nav className={`navigation${open ? " expanded" : ""}`} style={{ ["--menu-columns" as string]: items.length }} aria-label="Hoofdmenu">
      {items.map(item => {
        const props = { className: `nav-item${item.id === active ? " active" : ""}`, "aria-current": item.id === active ? "page" as const : undefined };
        const body = <>{item.icon && <Icon name={item.icon} />}{item.label}</>;
        const select = () => { setOpen(false); onSelect?.(item.id); };
        return item.href
          ? <a key={item.id} href={item.href} onClick={select} {...props}>{body}</a>
          : <button key={item.id} type="button" onClick={select} {...props}>{body}</button>;
      })}
    </nav>
  </>;
}

/** Page frame: topbar, navigation, main workspace and optional footer. */
export function AppShell({ topbar, navigation, footer, children }: { topbar: ReactNode; navigation?: ReactNode; footer?: ReactNode; children: ReactNode }) {
  return <>
    <a className="skip" href="#main">Naar inhoud</a>
    {topbar}
    <div className="shell">
      {navigation}
      <main id="main" className="workspace module" tabIndex={-1}>{children}</main>
      {footer && <footer>{footer}</footer>}
    </div>
  </>;
}

export function PageHeading({ title, description, actions }: { title: string; description?: ReactNode; actions?: ReactNode }) {
  return <div className="page-heading">
    <div><h2>{title}</h2>{description && <p>{description}</p>}</div>
    {actions && <div className="form-actions">{actions}</div>}
  </div>;
}

export function Card({ title, icon, children, className = "" }: { title?: string; icon?: string; children: ReactNode; className?: string }) {
  return <section className={`card ${className}`.trim()}>
    {title && <h3>{icon && <Icon name={icon} />}{title}</h3>}
    {children}
  </section>;
}

export function Widget({ title, subtitle, tone, aside, children }: { title: string; subtitle?: string; tone?: "error" | "warning"; aside?: ReactNode; children: ReactNode }) {
  return <section className={`widget${tone ? " " + tone : ""}`}>
    <header><h3>{title}{subtitle && <small>{subtitle}</small>}</h3>{aside}</header>
    {children}
  </section>;
}

/** Horizontal usage bar; turns yellow from 75% and red from 90%. */
export function Meter({ label, value, max = 100, display }: { label: string; value: number; max?: number; display?: string }) {
  const pct = max > 0 ? Math.max(0, Math.min(100, (value / max) * 100)) : 0;
  const level = pct >= 90 ? " critical" : pct >= 75 ? " high" : "";
  return <li className="meter-row">
    <span className="meter-label" title={label}>{label}</span>
    <span className="meter-track" role="meter" aria-valuenow={Math.round(pct)} aria-valuemin={0} aria-valuemax={100} aria-label={label}>
      <span className={`meter-fill${level}`} style={{ width: `${pct}%` }} />
    </span>
    <span className="meter-value">{display ?? `${Math.round(pct)}%`}</span>
  </li>;
}

export type Column<T> = { key: string; label: string; render?: (row: T) => ReactNode; wrap?: boolean };

export function DataTable<T>({ columns, rows, rowKey, onRowClick, empty = "Geen gegevens", rowClassName }:
  { columns: Column<T>[]; rows: T[]; rowKey: (row: T) => string; onRowClick?: (row: T) => void; empty?: ReactNode; rowClassName?: (row: T) => string | undefined }) {
  if (!rows.length) return <div className="data-table"><div className="empty">{empty}</div></div>;
  return <div className="data-table"><table>
    <thead><tr>{columns.map(c => <th key={c.key} scope="col">{c.label}</th>)}</tr></thead>
    <tbody>{rows.map(row => <tr key={rowKey(row)}
      className={[onRowClick ? "clickable" : "", rowClassName?.(row) ?? ""].join(" ").trim() || undefined}
      onClick={onRowClick ? () => onRowClick(row) : undefined}
      tabIndex={onRowClick ? 0 : undefined}
      onKeyDown={onRowClick ? e => { if (e.key === "Enter") onRowClick(row); } : undefined}>
      {columns.map(c => <td key={c.key} className={c.wrap ? "wrap" : undefined}>{c.render ? c.render(row) : String((row as Record<string, unknown>)[c.key] ?? "")}</td>)}
    </tr>)}</tbody>
  </table></div>;
}

export function Tabs({ tabs, active, onSelect }: { tabs: { id: string; label: string }[]; active: string; onSelect: (id: string) => void }) {
  return <div className="tabs" role="tablist">
    {tabs.map(t => <button key={t.id} type="button" role="tab" aria-selected={t.id === active} className={t.id === active ? "active" : undefined} onClick={() => onSelect(t.id)}>{t.label}</button>)}
  </div>;
}

export function Notice({ tone, children }: { tone?: "ok" | "warning" | "error"; children: ReactNode }) {
  return <div className={`notice${tone ? " " + tone : ""}`} role={tone === "error" ? "alert" : "status"}>{children}</div>;
}

/**
 * Accessible modal on the native <dialog>: focus moves in and back, Escape and
 * a backdrop click close it, the page behind it is inert.
 */
export function Modal({ open, title, onClose, children }: { open: boolean; title: string; onClose: () => void; children: ReactNode }) {
  const dialog = useRef<HTMLDialogElement>(null);
  const titleId = useId();
  useEffect(() => {
    const element = dialog.current;
    if (!element) return;
    if (open && !element.open) element.showModal();
    if (!open && element.open) element.close();
  }, [open]);
  return <dialog ref={dialog} className="modal" aria-labelledby={titleId}
    onCancel={event => { event.preventDefault(); onClose(); }}
    onClick={event => { if (event.target === event.currentTarget) onClose(); }}>
    <div className="modal-content">
      <header className="modal-header"><h3 id={titleId}>{title}</h3>
        <button type="button" className="modal-close" onClick={onClose} aria-label="Sluiten">✕</button></header>
      {open && children}
    </div>
  </dialog>;
}

/** Monospace log panel that keeps the newest line in view while following. */
export function LogView({ lines, follow = true }: { lines: string[]; follow?: boolean }) {
  const ref = useRef<HTMLPreElement>(null);
  useEffect(() => { if (follow && ref.current) ref.current.scrollTop = ref.current.scrollHeight; }, [lines.length, follow]);
  return <pre ref={ref} className="log" aria-live="polite">{lines.join("\n")}</pre>;
}
