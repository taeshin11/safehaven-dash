function doPost(e) {
  try {
    var data = JSON.parse(e.postData.contents);

    // Store in Script Properties as backup (no spreadsheet needed)
    var props = PropertiesService.getScriptProperties();
    var count = parseInt(props.getProperty('submission_count') || '0', 10);
    count++;
    props.setProperty('submission_count', count.toString());
    props.setProperty('last_submission', JSON.stringify({
      timestamp: new Date().toISOString(),
      assets_selected: data.assets_selected,
      fear_score: data.fear_score,
      count: count
    }));

    // Try to append to spreadsheet if one is available
    try {
      var sheetId = props.getProperty('sheet_id');
      if (sheetId) {
        var ss = SpreadsheetApp.openById(sheetId);
        var sheet = ss.getActiveSheet();
        sheet.appendRow([
          new Date().toISOString(),
          data.assets_selected.join(', '),
          data.fear_score,
          data.user_agent || '',
          data.referrer || ''
        ]);
      }
    } catch (sheetErr) {
      // Sheet not available, data is still saved in Properties
    }

    return ContentService
      .createTextOutput(JSON.stringify({ status: 'ok', count: count }))
      .setMimeType(ContentService.MimeType.JSON);
  } catch (err) {
    return ContentService
      .createTextOutput(JSON.stringify({ status: 'error', message: err.message }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

function doGet() {
  var props = PropertiesService.getScriptProperties();
  var count = props.getProperty('submission_count') || '0';
  return ContentService
    .createTextOutput(JSON.stringify({
      status: 'ok',
      message: 'SafeHaven webhook active',
      total_submissions: parseInt(count, 10)
    }))
    .setMimeType(ContentService.MimeType.JSON);
}
