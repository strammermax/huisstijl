/** Huisstijl icon set: original 24x24 line drawings, inner SVG markup only.
 *  Framework-free so vanilla pages and React share the same drawings. */
export const icons = {
  dashboard: '<rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/>',
  "virtual-apps": '<rect x="3" y="3" width="18" height="18" rx="2"/><path d="M3 8h18M8 8v13M13 8v13M18 8v13M8 13h13M8 18h13"/>',
  bookmarks: '<path d="m12 3 5 3-5 3-5-3 5-3Zm-6 7 5 3-5 3-5-3 5-3Zm12 0 5 3-5 3-5-3 5-3ZM1 13v5l5 3 5-3v-5m2 0v5l5 3 5-3v-5M7 6v4m10-4v4"/>',
  proxmox: '<rect x="3" y="3" width="18" height="7" rx="1"/><rect x="3" y="14" width="18" height="7" rx="1"/><path d="M6 6h1m-1 11h1"/>',
  media: '<ellipse cx="10" cy="5" rx="7" ry="3"/><path d="M3 5v12c0 2 3 3 7 3M17 5v6M3 11c0 2 3 3 7 3"/><path d="m15 14 6 4-6 4v-8Z"/>',
  terminal: '<path d="m4 5 6 6-6 6m9 1h7"/>',
  language: '<circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3c3 3 3 15 0 18M12 3c-3 3-3 15 0 18"/>',
  layers: '<path d="m12 3 9 5-9 5-9-5 9-5Z"/><path d="m3 12 9 5 9-5M3 16l9 5 9-5"/>',
  settings: '<circle cx="12" cy="12" r="3"/><path d="M12 2v3m0 14v3M2 12h3m14 0h3M4.9 4.9 7 7m10 10 2.1 2.1M4.9 19.1 7 17M17 7l2.1-2.1"/>',
  profile: '<circle cx="12" cy="8" r="4"/><path d="M4 21c1-4 4-6 8-6s7 2 8 6"/>',
  logout: '<path d="M15 4h4a1 1 0 0 1 1 1v14a1 1 0 0 1-1 1h-4M10 8l-4 4 4 4M6 12h10"/>',
  admin: '<path d="M3 6h3m4 0h11M3 18h11m4 0h3"/><circle cx="8" cy="6" r="2"/><circle cx="16" cy="18" r="2"/>',
  network: '<rect x="9" y="2" width="6" height="5" rx="1"/><rect x="2" y="17" width="6" height="5" rx="1"/><rect x="16" y="17" width="6" height="5" rx="1"/><path d="M12 7v5M5 17v-3h14v3"/>',
  backup: '<path d="M4 7c0-2 3.6-3 8-3s8 1 8 3-3.6 3-8 3-8-1-8-3Z"/><path d="M4 7v10c0 2 3.6 3 8 3m8-13v4"/><path d="m15 18 2.5 2.5L21 16"/>',
  gpu: '<rect x="2" y="6" width="20" height="12" rx="2"/><circle cx="9" cy="12" r="3"/><path d="M15 10h4m-4 4h4M5 18v3m4-3v3"/>',
  play: '<path d="M7 4v16l13-8L7 4Z"/>',
  refresh: '<path d="M20 12a8 8 0 1 1-2.3-5.7L20 8.6M20 3v5.6h-5.6"/>',
  check: '<path d="m4 12 5 5L20 6"/>',
  alert: '<path d="M12 3 2 20h20L12 3Z"/><path d="M12 10v4m0 3v.01"/>',
  close: '<path d="M6 6l12 12M18 6 6 18"/>',
  edit: '<path d="M4 20h4L19 9l-4-4L4 16v4Z"/><path d="m13 7 4 4"/>',
  trash: '<path d="M4 7h16M10 11v6m4-6v6M6 7l1 13h10l1-13M9 7V4h6v3"/>',
  plus: '<path d="M12 5v14M5 12h14"/>',
  search: '<circle cx="11" cy="11" r="7"/><path d="m20 20-4-4"/>',
  sun: '<circle cx="12" cy="12" r="4"/><path d="M12 2v2m0 16v2M2 12h2m16 0h2M4.9 4.9l1.4 1.4m11.4 11.4 1.4 1.4M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/>',
  moon: '<path d="M20 14.5A8 8 0 1 1 9.5 4a6.5 6.5 0 0 0 10.5 10.5Z"/>',
  menu: '<path d="M4 6h16M4 12h16M4 18h16"/>',
  jobs: '<path d="M9 5h11M9 12h11M9 19h11"/><path d="m3 5 1.5 1.5L7 4M3 12l1.5 1.5L7 11M3 19l1.5 1.5L7 18"/>',
  globe: '<circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3c3 3 3 15 0 18M12 3c-3 3-3 15 0 18"/>',
};

export const iconNames = Object.keys(icons);

/** Full <svg> string for vanilla pages: element.innerHTML = iconSvg("proxmox"). */
export function iconSvg(name, size = 20, className = "nav-icon") {
  const body = icons[name] ?? icons.dashboard;
  return `<svg class="${className}" width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${body}</svg>`;
}
