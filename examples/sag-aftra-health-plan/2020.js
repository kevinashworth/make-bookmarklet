(function () {
  var e = new Date();
  var t = e.getDate();
  var a = e.getMonth() + 1;
  var n = e.getFullYear();
  t < 10 && (t = '0' + t);
  a < 10 && (a = '0' + a);
  e = a + '/' + t + '/' + n;
  $('input')[6].value = '01/01/2020';
  $('input')[7].value = e;
  $('#earningsForm\\:findBtn').click();
})();
