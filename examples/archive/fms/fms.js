(function () {
  const elems = Array.prototype.slice
    .call(document.scripts)
    .find(function (e) {
      if (e.hasAttribute('data-config')) return e;
    })
    .getAttribute('data-config')
    .split('/');
  window.location.href = [
    'https:',
    '',
    'cdn.video.playwire.com',
    elems[3],
    elems[4],
    elems[6],
    'video-sd.mp4?hosting_id=' + elems[3]
  ].join('/');
})();
