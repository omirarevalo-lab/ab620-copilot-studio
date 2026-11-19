// Shared GSAP helpers for kit-built lesson videos (see tools/video/kit.mjs). Times are absolute seconds.
const tl = gsap.timeline({ paused: true });
const IN = (sel, t, from, d) => tl.fromTo(sel, Object.assign({ opacity: 0, y: 24 }, from || {}), { opacity: 1, y: 0, x: 0, scale: 1, duration: d || 0.55, ease: 'power3.out' }, t);
const POP = (sel, t) => tl.fromTo(sel, { opacity: 0, scale: 0.86 }, { opacity: 1, scale: 1, duration: 0.5, ease: 'back.out(1.6)' }, t);
const HI = (sel, t) => tl.to(sel, { borderColor: '#2f5bd3', boxShadow: '0 0 0 6px rgba(47,91,211,.14), 0 18px 40px rgba(16,24,40,.10)', duration: 0.35 }, t);
const LO = (sel, t) => tl.to(sel, { borderColor: '#e2e5eb', boxShadow: '0 10px 30px rgba(16,24,40,.07)', duration: 0.35 }, t);
const DIM = (sel, t, v) => tl.to(sel, { opacity: v == null ? 0.35 : v, duration: 0.4 }, t);
// keep the newest chat message in view: move the scroller so `msg` sits at the bottom of its viewport
const SCROLL = (scroller, msg, t) => tl.to(scroller, { y: () => { const s = document.querySelector(scroller), m = document.querySelector(msg); const vh = s.parentElement.clientHeight - 80; return Math.min(0, vh - (m.offsetTop + m.offsetHeight)); }, duration: 0.5, ease: 'power2.inOut' }, t);
