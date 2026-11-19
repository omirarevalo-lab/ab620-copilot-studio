import fs from 'node:fs'; import vm from 'node:vm';
const ctx={window:{}};vm.createContext(ctx);vm.runInContext(fs.readFileSync('../data/questions.js','utf8'),ctx);
const Q=ctx.window.AB620_QUESTIONS;
const list=[];
for(const q of Q){ if(q.type!=='single')continue; const lens=q.options.map(o=>o.length); const c=lens[q.answer[0]]; const maxOther=Math.max(...lens.filter((_,i)=>i!==q.answer[0])); if(c>=maxOther) list.push({id:q.id,c,maxOther,ratio:(c/maxOther).toFixed(2)}); }
console.log(list.length);
for(const l of list) console.log(l.id,l.c,l.maxOther,l.ratio);
