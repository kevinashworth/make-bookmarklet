(function () {
  $('#earningsList_rppDD option[value="100"]').prop('selected', true);
  $('#earningsList_rppDD option[value="100"]').change();
  setTimeout(function () {
    $('table[role="grid"] thead tr').append('<th>Row</th>');
    $('table[role="grid"] tfoot tr').append('<td>Row</td>');
    $('table[role="grid"] tr.ui-widget-content').each(function (i, val) {
      var row = '<td>' + (i + 1).toString() + '</td>';
      $(this).append(row);
    });
  }, 1000);
})();
