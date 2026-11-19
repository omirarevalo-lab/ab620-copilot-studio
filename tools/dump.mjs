import fs from 'node:fs'; import vm from 'node:vm';
const ctx={window:{}};vm.createContext(ctx);vm.runInContext(fs.readFileSync('../data/questions.js','utf8'),ctx);
const [from,to]=[+process.argv[2],+process.argv[3]];
ctx.window.AB620_QUESTIONS.slice(from,to).forEach(q=>{
  console.log(`\n## ${q.id} d${q.difficulty} ${q.type}${q.preview?' PREVIEW':''}\n${q.stem}`);
  q.options.forEach((o,i)=>console.log(`  ${q.answer.includes(i)?'[x]':'[ ]'} ${'ABCDE'[i]}. ${o}`));
  console.log(`  EXPL: ${q.explanation}`);
});
