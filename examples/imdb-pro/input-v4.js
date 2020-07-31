// Combine v2 (better logic) and v3 (site_preference and 4th bad word).
let h = window.location.href;

const i = h.indexOf('imdb.com');
if (i === -1) {
  window.location = 'https://pro.imdb.com/name/nm2825198/?site_preference=normal';
}

const p = h.indexOf('https://pro.imdb.com');
if (p === 0) {
  window.location = h.replace('https://pro', 'https://www');
}

const t = h.indexOf('title');
// Words that lead to errors on 'title' pages:
const c = h.indexOf('combined');
const f1 = h.indexOf('filmmakers');
const f2 = h.indexOf('fullcredits');
const r = h.indexOf('reference');
const badword = Math.max(c, f1, f2, r);
const u = new URL(h);
const u1 = (u.origin + u.pathname);
 // If there is one of these bad words, lop it off.
const u2 = u1.substring(0, badword);
if ((t > 0) && (badword > 0)) {
  h = u2;
} else {
  h = u1;
}
window.location = h.replace(/https:\/\/[a-z]+/, 'https://pro');
