var h = window.location.href;

const i = h.indexOf('imdb.com');
const p = h.indexOf('https://pro.imdb.com');

const t = h.indexOf('title');

const c = h.indexOf('combined');
const f = h.indexOf('fullcredits');
const r = h.indexOf('reference');
const badword = Math.max(c, f, r);

if (i === -1) {
  window.location = 'https://pro.imdb.com/name/nm2825198/';
} else if (p === 0) {
  window.location = h.replace('https://pro', 'https://www');
} else if (p === -1) {
  if ((t > 1) && (badword > 1)) {
    h = h.substring(0, badword);
  }
  window.location = h.replace(/https:\/\/[a-z]+/, 'https://pro');
}
