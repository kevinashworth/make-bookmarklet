let h = window.location.href;

const i = h.indexOf('imdb.com');
if (i === -1) {
  window.location = 'https://pro.imdb.com/name/nm2825198/';
}

const p = h.indexOf('https://pro.imdb.com');
if (p === 0) {
  window.location = h.replace('https://pro', 'https://www');
}

const t = h.indexOf('title');

// Words that lead to errors on 'title' pages:
const c = h.indexOf('combined');
const f = h.indexOf('fullcredits');
const r = h.indexOf('reference');
const badword = Math.max(c, f, r);

// If there is one of these bad words, lop it off.
if ((t > 0) && (badword > 0)) {
  h = h.substring(0, badword);
}
window.location = h.replace(/https:\/\/[a-z]+/, 'https://pro');
