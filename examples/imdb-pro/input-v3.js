// site_preference=normal is for mobile, skips IMDb forcing you to the mobile apps
var h = window.location.href;
const i = h.indexOf('imdb.com');
const p = h.indexOf('https://pro.imdb.com');
const t = h.indexOf('title');
const c = h.indexOf('combined');
const f1 = h.indexOf('filmmakers');
const f2 = h.indexOf('fullcredits');
const r = h.indexOf('reference');
const badword = Math.max(c, f1, f2, r);
const u = new URL(h);
const u1 = (u.origin + u.pathname);
const u2 = u1.substring(0, badword);
if (i === -1) {
  window.location = 'https://pro.imdb.com/name/nm2825198/?site_preference=normal';
} else if (p === 0) {
  window.location = u1.replace('https://pro', 'https://www');
} else if (p === -1) {
  if ((t > 1) && (badword > 1)) {
    h = u2;
  } else {
    h = u1;
  }
  window.locatin = h.replace(/https:\/\/[a-z]+/, 'https://pro');
}
