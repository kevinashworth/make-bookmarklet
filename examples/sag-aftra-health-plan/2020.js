(function () {
  var e = new Date();
  var m = e.getMonth() + 1;
  var d = e.getDate();
  var y = e.getFullYear();
  d < 10 && (d = '0' + d);
  m < 10 && (m = '0' + m);
  e = m + '/' + d + '/' + y;
  $('input')[6].value = '01/01/2020';
  $('input')[7].value = e;
  $('#earningsForm\\:findBtn').click();
})();
