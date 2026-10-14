// Builds dist/ for projects without a bundler (pcmanager, plain HTML):
// one flattened huisstijl.css plus icons.js. Copy dist/ into wwwroot.
import { mkdirSync, readFileSync, writeFileSync, copyFileSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const version = JSON.parse(readFileSync(join(root, "package.json"), "utf8")).version;

export function flatten(file, seen = new Set()) {
  const path = resolve(file);
  if (seen.has(path)) throw new Error(`Circular @import: ${path}`);
  seen.add(path);
  return readFileSync(path, "utf8").replace(/@import\s+"([^"]+)";/g, (_, rel) => flatten(join(dirname(path), rel), new Set(seen)));
}

if (process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  mkdirSync(join(root, "dist"), { recursive: true });
  writeFileSync(join(root, "dist/huisstijl.css"), `/* huisstijl v${version} */\n` + flatten(join(root, "huisstijl.css")));
  copyFileSync(join(root, "icons/icons.js"), join(root, "dist/icons.js"));
  console.log(`dist/ geschreven (v${version})`);
}
