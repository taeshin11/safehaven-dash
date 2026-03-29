function doPost(e) {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  const data = JSON.parse(e.postData.contents);
  sheet.appendRow([
    new Date().toISOString(),
    data.assets_selected.join(', '),
    data.fear_score,
    data.user_agent || '',
    data.referrer || ''
  ]);
  return ContentService
    .createTextOutput(JSON.stringify({ status: 'ok' }))
    .setMimeType(ContentService.MimeType.JSON);
}

function doGet() {
  return ContentService
    .createTextOutput(JSON.stringify({ status: 'ok', message: 'SafeHaven webhook active' }))
    .setMimeType(ContentService.MimeType.JSON);
}
