// shortwaveapp.com, modified to fix 'gs' not knowing the site
// replace INSERT_CUSTOM_COMMANDS_FILE_URL_HERE then make bookmarklet
SISW();
function SISW() {
  var t = window.getSelection
    ? window.getSelection()
    : (
      document.getSelection
        ? document.getSelection()
        : (
          document.selection
            ? document.selection.createRange().text
            : ''));
  var c = window.prompt('Type `help` for a list of commands:');
  if (t != '') {
    if (c) {
      c += ' ' + t;
    } else {
      c = '' + t;
    };
  };
  if (c.indexOf('gs ') == 0) {
    url = new URL(window.location.href);
    tld = url.host;
    q = c.substring(c.indexOf(' ')).trim();
    g = `https://www.google.com/search?q=site%3A${tld}+${q}`;
    window.location = g;
  } else if (c) {
    var u = 'http://shortwaveapp.com/?go&c=' + c + '&t=' + (
      document.title
        ? encodeURI(document.title)
        : '') + '&s=INSERT_CUSTOM_COMMANDS_FILE_URL_HERE';
    if (c.substring(0, 1) == ' ') {
      var w = window.open(u);
      w.focus();
    } else {
      window.location.href = u;
    };
  };
};