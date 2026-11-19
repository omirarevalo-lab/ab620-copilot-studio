// node tools/video/add-answerat.mjs  — adds quiz[].answerAt to data/video-index.js from video/<id>/beats.json + quiz.json (videos built before render.mjs wrote it)
import fs from 'fs';
const f = 'data/video-index.js', txt = fs.readFileSync(f, 'utf8'), m = /window\.AB620_VIDEO = (\{[\s\S]*\});/.exec(txt), idx = JSON.parse(m[1]);
for (const id of Object.keys(idx)) {
  const e = idx[id]; if (!e.quiz) continue;
  const bf = `video/${id}/beats.json`, qf = `video/${id}/quiz.json`; if (!fs.existsSync(bf) || !fs.existsSync(qf)) { console.log(id, 'skip: no beats/quiz'); continue; }
  const beats = JSON.parse(fs.readFileSync(bf, 'utf8')), qs = JSON.parse(fs.readFileSync(qf, 'utf8'));
  qs.forEach((q, i) => {
    const sc = beats.scenes[q.scene], n = sc.sentences[q.pauseSentence + 1] || (beats.scenes[q.scene + 1] || {}).sentences?.[0];
    if (!n || !e.quiz[i]) { console.log(id, i, 'no answer sentence'); return; }
    const a = +n.start.toFixed(3), gap = a - sc.sentences[q.pauseSentence].end;
    e.quiz[i].answerAt = a; console.log(id, i, 'at', e.quiz[i].at, 'answerAt', a, 'gap', gap.toFixed(2));
  });
}
fs.writeFileSync(f, txt.replace(m[1], JSON.stringify(idx)));
