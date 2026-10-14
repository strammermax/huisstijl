import { test } from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { icons, iconNames, iconSvg } from "../icons/icons.js";
import { flatten } from "../scripts/dist.mjs";

const tokens = readFileSync(new URL("../css/tokens.css", import.meta.url), "utf8");
const components = readFileSync(new URL("../css/components.css", import.meta.url), "utf8");
const required = ["--bg", "--card", "--text", "--muted", "--border", "--blue", "--green", "--yellow", "--red", "--danger"];
const block = (selector) => tokens.slice(tokens.indexOf(selector), tokens.indexOf("}", tokens.indexOf(selector)));

test("dark theme defines every core token", () => {
  for (const name of required) assert.match(block(":root{"), new RegExp(`${name}:`), name);
});

test("light theme overrides the surface colours", () => {
  for (const name of ["--bg", "--card", "--text", "--muted", "--border"]) assert.match(block(":root[data-theme=light]"), new RegExp(`${name}:`), name);
});

test("components only use defined tokens", () => {
  const defined = new Set([...tokens.matchAll(/(--[a-z-]+):/g)].map(m => m[1]).concat("--menu-columns"));
  const used = [...components.matchAll(/var\((--[a-z-]+)/g)].map(m => m[1]);
  assert.ok(used.length > 20);
  for (const name of used) assert.ok(defined.has(name), `undefined token ${name}`);
});

test("ControlDeck class names stay available for migration", () => {
  for (const cls of [".topbar", ".navigation", ".nav-item", ".submenu", ".widget", ".meter-fill", ".modal", ".status.online", ".user-dropdown", ".login-card"])
    assert.ok(components.includes(cls), cls);
});

test("iconSvg renders a known icon", () => {
  const svg = iconSvg("proxmox", 24, "x");
  assert.match(svg, /^<svg class="x" width="24" height="24"/);
  assert.ok(svg.includes(icons.proxmox));
});

test("iconSvg falls back for unknown names (randgeval)", () => {
  assert.ok(iconSvg("bestaat-niet").includes(icons.dashboard));
});

test("icons are plain markup without scripts or handlers (afwijzing)", () => {
  assert.ok(iconNames.length >= 25);
  for (const [name, body] of Object.entries(icons)) assert.doesNotMatch(body, /<script|\son\w+=|javascript:/i, name);
});

test("flatten inlines imports into one stylesheet", () => {
  const css = flatten(fileURLToPath(new URL("../huisstijl.css", import.meta.url)));
  assert.doesNotMatch(css, /@import/);
  assert.ok(css.includes("--blue:#3782f6") && css.includes(".topbar{"));
});
