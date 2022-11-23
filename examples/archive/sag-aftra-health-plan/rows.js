(function () {
  $('table[role="grid"]').css({ 'table-layout': 'auto' });
  $('table[role="grid"] thead tr').append('<th role="columnheader" class="ui-state-default"><span class="ui-column-title" style="word-break: normal;">Row</span></th>');
  $('table[role="grid"] tr.ui-widget-content').each(function (i, val) {
    const row = '<td role="gridcell"><span class="ui-column-title">Row</span>' + (i + 1).toString() + '</td>';
    $(this).append(row);
  });
})();
