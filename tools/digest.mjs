// Compact text views of the big data files (meta, questions, cards, course topics, FACTS.md), so agents need not read them whole.
// Usage: node tools/digest.mjs <command> [arg]   (no command prints the list)
import fs from 'node:fs'; import vm from 'node:vm'; import path from 'node:path'; import { fileURLToPath } from 'node:url';
import { ROOT as root, DATA_REL, courseFiles as listCourse } from './cert.mjs';   // CERT=ab400 reads data/ab400/ instead of data/
const ctx = { window: {}, console }; vm.createContext(ctx);
// Course files run in name order (m0, m1-3, m4-7); each one pushes into window.AB620_COURSE.
const courseFiles = listCourse();
for (const f of [DATA_REL + '/meta.js', DATA_REL + '/questions.js', DATA_REL + '/flashcards.js', ...courseFiles.map((f) => DATA_REL + '/' + f)])
  vm.runInContext(fs.readFileSync(path.join(root, f), 'utf8'), ctx, { filename: f });
const { AB620_META: M, AB620_QUESTIONS: Q, AB620_CARDS: C, AB620_COURSE: T } = ctx.window;

const cut = (s, n) => { const t = String(s ?? '').replace(/\s+/g, ' ').trim(); return t.length > n ? t.slice(0, n - 1) + '…' : t; };
const skillIds = M.skills.map((s) => s.id);
const groupTitle = Object.fromEntries(M.groups.map((g) => [g.id, g.title]));

// Filter shared by questions and cards: skill prefix (2.3, 1.3a) or case-insensitive text search.
const pick = (items, f, text) => {
  if (!f) return items;
  if (/^\d\.\d/.test(f)) return items.filter((x) => x.skill.startsWith(f));
  return items.filter((x) => text(x).toLowerCase().includes(f.toLowerCase()));
};
// Next id = highest existing number for the skill + 1, two digits (q-1.3a-06, c-1.3a-04).
const nextId = (items, kind, skill) => {
  const max = Math.max(0, ...items.filter((x) => x.skill === skill).map((x) => Number(x.id.match(/(\d+)$/)?.[1] ?? 0)));
  return `${kind}-${skill}-${String(max + 1).padStart(2, '0')}`;
};

const usage = `usage: node tools/digest.mjs <command> [arg]
  skills                            skill list: id | group | statement
  topics                            topic list: id | module | skills | title
  topic <ID> [theory|scenes|check]  one topic as compact text
  questions [filter]                skill prefix (2.3, 1.3a) or text search
  cards [filter]                    same filter rules
  facts <regex>                     FACTS.md lines grouped by ## heading
  next-ids                          next question and card id per skill
  count                             totals and questions per skill`;

const commands = {
  skills: () => M.skills.map((s) => `${s.id} | ${groupTitle[s.group]} | ${cut(s.label, 160)}`),
  topics: () => T.map((t) => `${t.id} | M${t.module} | ${t.skills.join(',')} | ${cut(t.title, 120)}`),
  topic: ([id, mode = 'theory']) => {
    const t = T.find((x) => x.id === String(id).toUpperCase());
    if (!t) throw new Error(`unknown topic: ${id}`);
    if (mode === 'scenes') return t.scenes.map((s, i) => `${i + 1}. ${s.title} — ${cut(s.say, 300)}`);
    if (mode === 'check') return t.check.map((c, i) => `${i + 1}. ${cut(c.stem, 200)}  ✔ ${c.options[c.answer]}`);
    if (mode !== 'theory') throw new Error(`mode must be theory, scenes or check (got ${mode})`);
    const th = t.theory; // visual fields are never printed
    return [`${t.id} · M${t.module} · ${t.title}`, th.intro,
      ...th.sections.flatMap((s) => [`## ${s.heading}`, s.body]),
      '## Steps', ...th.steps.map((s, i) => `${i + 1}. ${s}`),
      '## Example', th.example,
      '## Exam tips', ...th.examTips.map((s) => `- ${s}`),
      '## Glossary', ...th.glossary.map((g) => `- ${g.term}: ${g.def}`)];
  },
  questions: ([f]) => pick(Q, f, (q) => [q.stem, ...q.options, q.explanation].join(' ')).map((q) =>
    `${q.id} | ${q.type} | d${q.difficulty} | ${cut(q.stem, 160)} | ✔ ${q.answer.map((i) => cut(q.options[i], 80)).join(' ; ')}`),
  cards: ([f]) => pick(C, f, (c) => `${c.front} ${c.back}`).map((c) => `${c.id} | ${cut(c.front, 200)} | ${cut(c.back, 200)}`),
  facts: ([re]) => {
    if (!re) throw new Error('usage: facts <regex>');
    const rx = new RegExp(re, 'i'); const out = []; let heading = '(no heading)', shown = null;
    for (const line of fs.readFileSync(path.join(root, 'FACTS.md'), 'utf8').split('\n')) {
      if (line.startsWith('## ')) { heading = line; continue; }
      if (!rx.test(line)) continue;
      if (shown !== heading) { out.push(heading); shown = heading; }
      out.push('  ' + cut(line, 400));
    }
    return out.length ? out : ['no matches'];
  },
  'next-ids': () => skillIds.map((s) => `${s} | ${nextId(Q, 'q', s)} | ${nextId(C, 'c', s)}`),
  count: () => {
    const per = skillIds.map((s) => Q.filter((q) => q.skill === s).length);
    const multi = Q.filter((q) => q.type === 'multi').length;
    return [`topics ${T.length}`, `questions ${Q.length} (single ${Q.length - multi}, multi ${multi})`,
      `cards ${C.length}`, `skills ${skillIds.length}`,
      `questions per skill: min ${Math.min(...per)}, max ${Math.max(...per)}`];
  },
};

const [cmd, ...args] = process.argv.slice(2);
if (!cmd || !Object.hasOwn(commands, cmd)) {
  console.log(usage);
  process.exit(cmd ? 1 : 0);
}
try {
  console.log(commands[cmd](args).join('\n'));
} catch (e) {
  console.error(`digest: ${e.message}`);
  process.exit(1);
}
