// Authoring helpers (throwaway tooling). Questions are authored with the correct option(s) listed
// separately; build-questions.mjs shuffles them deterministically and emits data/questions.js.
export const CS = 'https://learn.microsoft.com/en-us/microsoft-copilot-studio/';
export const PP = 'https://learn.microsoft.com/en-us/power-platform/';
export const PA = 'https://learn.microsoft.com/en-us/power-apps/maker/data-platform/';
export const PAU = 'https://learn.microsoft.com/en-us/power-automate/';
export const CON = 'https://learn.microsoft.com/en-us/connectors/';

export const Q = [];

/**
 * @param {string} skill  e.g. '1.3h'
 * @param {1|2|3} diff
 * @param {string} stem
 * @param {string|string[]} correct  one or more correct options
 * @param {string[]} wrong  distractors
 * @param {string} explanation
 * @param {string} source
 * @param {boolean} [preview]
 */
export function q(skill, diff, stem, correct, wrong, explanation, source, preview = false) {
  const c = Array.isArray(correct) ? correct : [correct];
  Q.push({ skill, diff, stem, correct: c, wrong, explanation, source, preview });
}
