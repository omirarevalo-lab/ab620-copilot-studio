/* Certification registry and choice. Runs after the data (each exam's files are wrapped by build.mjs into window.__CERTS.<id>)
   and before app.js: decides which exam is active and copies that exam's data onto the legacy AB620_* globals app.js reads.
   Exposes window.TALLER = { cert, certs, choose }. */
(function () {
  'use strict';
  var REG = window.__CERTS || {};
  var GLOBALS = ['AB620_META', 'AB620_COURSE', 'AB620_MODULES', 'AB620_QUESTIONS', 'AB620_CARDS', 'AB620_QMAP', 'AB620_VIDEO', 'AB620_AUDIO'];
  var KEY = 'taller.cert';
  function lsGet(k) { try { return window.localStorage.getItem(k); } catch (e) { return null; } }
  function lsSet(k, v) { try { window.localStorage.setItem(k, v); return window.localStorage.getItem(k) === v; } catch (e) { return false; } }
  function has(id) { return typeof id === 'string' && Object.prototype.hasOwnProperty.call(REG, id); }
  function len(a) { return Array.isArray(a) ? a.length : 0; }

  var certs = Object.keys(REG).map(function (id) {
    var d = REG[id] || {}, meta = d.AB620_META || {}, ex = meta.exam || {}, code = ex.code || id.toUpperCase();
    return {
      id: id, code: code, title: ex.title || '', app: ex.app || code + ' Workshop',
      topics: len(d.AB620_COURSE), questions: len(d.AB620_QUESTIONS), cards: len(d.AB620_CARDS),
      topicIds: (Array.isArray(d.AB620_COURSE) ? d.AB620_COURSE : []).map(function (t) { return t && t.id; }).filter(Boolean),
      examDate: meta.defaults && meta.defaults.examDate || ''
    };
  });

  // The stored choice wins. Without one, a learner who already has AB-620 progress stays on AB-620 silently; anyone else sees the picker.
  var cert = lsGet(KEY);
  if (!has(cert)) cert = null;
  if (!cert && has('ab620') && lsGet('ab620.v1.sessions') != null) cert = 'ab620';

  if (cert) GLOBALS.forEach(function (g) { if (REG[cert][g] !== undefined) window[g] = REG[cert][g]; });

  // choose(id): remember the exam for the next load. Returns false when the id is unknown or the browser blocks storage.
  function choose(id) { return has(id) && lsSet(KEY, id); }

  window.TALLER = { cert: cert, certs: certs, choose: choose };
})();
