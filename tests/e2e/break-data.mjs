// Worst-case data for the break-ui pass. It is injected by the TEST ONLY (a script placed before app.js through page.route),
// so the app and its data files stay untouched. See break-ui.spec.mjs.
export const BREAK_JS = `(function () {
  var long = 'Supercalifragilisticexpialidocious'.repeat(8);
  var url = 'https://learn.microsoft.com/en-us/microsoft-copilot-studio/' + 'very-long-path-segment-'.repeat(12);
  var email = 'first.last.with.a.very.long.name.and.many.dots@subdomain.example-company-with-long-name.contoso.com';
  var words = 'This is a normal sentence that keeps going and going and going, ';
  var para = words.repeat(10);
  var svgWide = '<svg width="1400" height="120" viewBox="0 0 1400 120"><rect x="1" y="1" width="1398" height="118" fill="none" stroke="currentColor"/><text x="10" y="64" font-size="14" fill="currentColor">' + long + '</text></svg>';
  function scene(i) {
    return { title: i % 3 === 0 ? long : 'Scene ' + (i + 1) + ': ' + words, visual: i % 2 ? svgWide : '', caption: i % 4 === 1 ? long : para, say: 'Spoken text. ' + para };
  }
  var scenes = []; for (var i = 0; i < 12; i++) scenes.push(scene(i));
  var checks = []; for (var c = 0; c < 4; c++) checks.push({ stem: long + ' ' + para, options: [long, para, 'a', email], answer: c % 4, explanation: para + long });
  var W1 = { id: 'ZZ1', module: 99, title: long + ' ' + para.slice(0, 120), level: 'intermediate', minutes: 99999, skills: [],
    theory: { intro: long + ' ' + email + ' ' + url, sections: [{ heading: long, body: url + '\\n\\n' + para + email, visual: svgWide }, { heading: 'x', body: 'y' }], steps: [long, url], example: long + url, examTips: [long, para], glossary: [{ term: long, def: para + long }, { term: 'A', def: 'B' }] },
    scenes: scenes, check: checks, reto: { text: long + '\\n' + url, minutes: 15 }, source: url };
  // No audio, no visuals, one empty scene, no theory, no check, no source.
  var W2 = { id: 'ZZ2', module: 99, title: 'X', level: 'basic', minutes: 0, skills: [], theory: {}, scenes: [{ title: '', caption: '', say: '' }], check: [], source: '' };
  // One-letter everything.
  var W3 = { id: 'ZZ3', module: 99, title: 'Y', level: 'basic', minutes: 1, skills: [], theory: { intro: 'a', sections: [{ heading: 'b', body: 'c' }], glossary: [{ term: 'T', def: 'd' }] }, scenes: [{ title: 'a', caption: 'b', say: 'c' }, { title: 'd', caption: 'e', say: 'f' }], check: [{ stem: 'Q?', options: ['A', 'B'], answer: 0, explanation: 'E' }] };
  window.AB620_MODULES.push({ n: 99, title: long });
  window.AB620_COURSE.push(W1, W2, W3);
  window.AB620_QUESTIONS = [
    { id: 'zq1', skill: '1.1a', domain: 'D1', type: 'single', stem: long + ' ' + para, options: [long, para, email, url], answer: [2], explanation: para + long },
    { id: 'zq2', skill: '1.1a', domain: 'D1', type: 'multi', stem: 'Pick three. ' + para, options: [long, 'b', email, 'd', url, 'f', para], answer: [0, 2, 4], explanation: long },
    { id: 'zq3', skill: '1.2a', domain: 'D1', type: 'single', stem: 'Q?', options: ['A', 'B'], answer: [1], explanation: 'E' },
    { id: 'zq4', skill: '1.2a', domain: 'D2', type: 'multi', stem: email + ' ' + url, options: [email, url, long], answer: [0, 1], explanation: '' },
    { id: 'zq5', skill: '2.1a', domain: 'D2', type: 'single', stem: para, options: ['x', 'y', 'z', 'w'], answer: [0], explanation: para },
    { id: 'zq6', skill: '2.1a', domain: 'D2', type: 'single', stem: long, options: [long + '1', long + '2', 'c', 'd'], answer: [3], explanation: long },
    { id: 'zq7', skill: '3.1a', domain: 'D3', type: 'single', stem: 'Short', options: ['one', 'two', 'three', 'four'], answer: [0], explanation: 'x' },
    { id: 'zq8', skill: '3.1a', domain: 'D3', type: 'multi', stem: 'Many. ' + para, options: ['1', '2', '3', '4', '5', '6', '7', '8'], answer: [0, 1, 2, 3, 4], explanation: para },
    { id: 'zq9', skill: '3.1a', domain: 'D3', type: 'single', stem: para + para, options: [para, para + 'b', 'c', 'd'], answer: [1], explanation: para }
  ];
  window.AB620_CARDS = [
    { id: 'zc1', skill: '1.1a', front: long, back: url + ' ' + para },
    { id: 'zc2', skill: '1.1a', front: '?', back: '!' },
    { id: 'zc3', skill: '1.1a', front: para, back: long }
  ];
})();`;
