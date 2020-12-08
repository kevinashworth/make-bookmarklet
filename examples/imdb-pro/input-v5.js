// This version combines better logic, site_preference, more 'bad' words.
// Use a break point and site_preference to get desktop version.
// Note: site_preference can only be used on Pro URLs.

(function () {
  const x = window.innerWidth || document.documentElement.clientWidth || document.getElementsByTagName('body')[0].clientWidth;
  const bp = 400;
  const hr = window.location.href;
  const nh = new URL(hr);
  let u = (nh.origin + nh.pathname);
  // Now u is a clean version of URL, without query params, etc.

  // 1. If not on IMDb at all, go to desired IMDbPro home URL.
  const im = u.indexOf('imdb.com');
  if (im < 0) {
    let home = 'https://pro.imdb.com/name/nm2825198/';
    if (x < bp) {
      home += '?site_preference=normal';
    }
    window.location = home;
    return;
  }

  // 2. When on IMDbPro, process URL then go to regular IMDb version of page.
  const pr = u.indexOf('https://pro.imdb.com');
  if (pr === 0) {
    // Remove these bad words from URL before switch to Pro.
    const b = u.indexOf('boxoffice');
    const d = u.indexOf('details');
    const f = u.indexOf('filmmakers');
    const m = u.indexOf('images');
    const v = u.indexOf('videos');
    const bad = Math.max(b, d, f, m, v);
    if (bad > 0) {
      u = u.substring(0, bad);
    }
    window.location = u.replace('https://pro', 'https://www');
    return;
  }

  // 3. When on regular IMDb, process URL before going to IMDbPro version.
  const t = u.indexOf('title/tt') > 0;
  const n = u.indexOf('name/nm') > 0;
  if (t) {
    // Bad words for 'title' pages:
    const c = u.indexOf('combined');
    const fi = u.indexOf('filmmakers');
    const fu = u.indexOf('fullcredits');
    const re = u.indexOf('reference');
    const ro = u.indexOf('releaseinfo');
    const bad = Math.max(c, fi, fu, re, ro);
    if (bad > 0) {
      u = u.substring(0, bad);
    }
  } else if (n) {
    // Bad words for 'name' pages:
    const b = u.indexOf('bio');
    const m = u.indexOf('mediaindex');
    const bad = Math.max(b, m);
    if (bad > 0) {
      u = u.substring(0, bad);
    }
  }
  if (x < bp) {
    u = u.concat('?site_preference=normal');
  }
  window.location = u.replace(/https:\/\/[a-z]+/, 'https://pro');
})();
