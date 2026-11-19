// Which certification's data a tool works on: environment variable CERT (default ab620 -> data/; CERT=ab400 -> data/ab400/).
// Shared by digest, validate-course, smoke, qmap and the video tools; build.mjs has the same registry for the app.
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

export const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
export const CERT = (process.env.CERT || 'ab620').toLowerCase();
if (!/^[a-z0-9]+$/.test(CERT)) { console.error('CERT must be a short id such as ab620 or ab400, got: ' + CERT); process.exit(1); }
export const DATA_REL = CERT === 'ab620' ? 'data' : 'data/' + CERT;   // relative to ROOT, forward slashes
export const DATA_DIR = path.join(ROOT, ...DATA_REL.split('/'));
if (!fs.existsSync(DATA_DIR)) { console.error('No data folder for CERT=' + CERT + ' (' + DATA_REL + ')'); process.exit(1); }

export const dataFile = (name) => path.join(DATA_DIR, name);
// course-m*.js files of the certification, in the order the app loads them (name order)
export const courseFiles = () => fs.readdirSync(DATA_DIR).filter((f) => /^course-m[\w-]*\.js$/.test(f)).sort();
