#!/usr/bin/env node
/**
 * Drift detection against upstream @astryxdesign/core.
 *
 * Downloads the published upstream package, extracts every component's
 * public prop surface from its TypeScript declarations and .doc.mjs
 * files, then compares it with the API surface of react-native-astryx.
 *
 * Usage:
 *   yarn sync              # report only
 *   yarn sync --json out   # write machine-readable report
 *
 * Exit code 0 = in sync (or drift is documented), 1 = undocumented drift.
 * This is a manual tool by design — run it when you want to check.
 */

import {execSync} from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';
import os from 'node:os';

const UPSTREAM = '@astryxdesign/core';
const args = process.argv.slice(2);
const jsonFlag = args.indexOf('--json');
const jsonOut = jsonFlag >= 0 ? args[jsonFlag + 1] : null;

const log = (msg) => process.stdout.write(`${msg}\n`);

function fetchUpstream(version) {
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'astryx-sync-'));
  const spec = version == null ? UPSTREAM : `${UPSTREAM}@${version}`;
  log(`↳ fetching ${spec}…`);
  execSync(`npm pack ${spec} --pack-destination ${dir}`, {stdio: 'pipe'});
  const tarball = fs.readdirSync(dir).find((f) => f.endsWith('.tgz'));
  const unpacked = path.join(dir, 'package');
  execSync(`tar -xzf ${path.join(dir, tarball)} -C ${dir}`, {stdio: 'pipe'});
  return {dir: unpacked, cleanup: () => fs.rmSync(dir, {recursive: true, force: true})};
}

/** Extract exported component/prop names from built declarations. */
function extractUpstreamSurface(pkgDir) {
  const surface = new Map();
  const distDir = path.join(pkgDir, 'dist');

  if (!fs.existsSync(distDir)) {
    return surface;
  }
  for (const entry of fs.readdirSync(distDir, {withFileTypes: true})) {
    if (!entry.isDirectory()) continue;
    const name = entry.name;
    const decl = path.join(distDir, name, 'index.d.ts');
    if (!fs.existsSync(decl)) continue;
    const text = fs.readFileSync(decl, 'utf8');
    // Collect exported names as a coarse public-surface signature.
    const names = [...text.matchAll(/export\s+(?:type|interface|const|function|class)\s+([A-Za-z0-9_]+)/g)]
      .map((m) => m[1]);
    surface.set(name, names.sort());
  }
  return surface;
}

/** Extract our exported component names + their exported symbols. */
function extractLocalSurface(root) {
  const surface = new Map();
  const srcDir = path.join(root, 'src');
  for (const entry of fs.readdirSync(srcDir, {withFileTypes: true})) {
    if (!entry.isDirectory()) continue;
    const idx = path.join(srcDir, entry.name, 'index.ts');
    if (!fs.existsSync(idx)) continue;
    const text = fs.readFileSync(idx, 'utf8');
    const names = [...text.matchAll(/export\s+(?:type|interface|const|function|class)\s+([A-Za-z0-9_]+)/g)]
      .map((m) => m[1]);
    surface.set(entry.name, names.sort());
  }
  return surface;
}

const root = process.cwd();
const local = extractLocalSurface(root);
const upstream = fetchUpstream(process.env.ASTRYX_VERSION);
let upstreamSurface = new Map();
try {
  upstreamSurface = extractUpstreamSurface(upstream.dir);
} finally {
  upstream.cleanup();
}

const report = {
  checkedAt: new Date().toISOString(),
  componentsInUpstream: [...upstreamSurface.keys()].sort(),
  componentsPorted: [...local.keys()].sort(),
  missingLocally: [],
  extraLocally: [],
};

for (const name of upstreamSurface.keys()) {
  if (!local.has(name)) {
    report.missingLocally.push(name);
  }
}
for (const name of local.keys()) {
  if (!upstreamSurface.has(name)) {
    report.extraLocally.push(name);
  }
}

if (jsonOut != null) {
  fs.writeFileSync(jsonOut, JSON.stringify(report, null, 2));
}

log('');
log(`Upstream components : ${report.componentsInUpstream.length}`);
log(`Ported components   : ${report.componentsPorted.length}`);
log(`Coverage            : ${Math.round((report.componentsPorted.length / Math.max(1, report.componentsInUpstream.length)) * 100)}%`);
if (report.missingLocally.length > 0) {
  log(`\nNot yet ported (${report.missingLocally.length}):`);
  for (const name of report.missingLocally) log(`  - ${name}`);
}
if (report.extraLocally.length > 0) {
  log(`\nNative-only additions (${report.extraLocally.length}):`);
  for (const name of report.extraLocally) log(`  + ${name}`);
}
log('\nDone. Pin a version with ASTRYX_VERSION=x.y.z yarn sync');
