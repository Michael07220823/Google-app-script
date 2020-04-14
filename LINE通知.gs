function linePost() {
  var date = new Date();
  var day  = date.getDay(); // or "new Date().getDay()";
//  Logger.log(typeof(day));
  
  //  Google Sheet的URL
  var url = "your google Sheet URL";
  
  //  想要的經節
  var nameVerse = "經節";
  var verseRow = Math.abs(Math.round(Math.random()*10)-1);
  if(verseRow < 0 || verseRow > 7){
      verseRow = 1;
  }
//  Logger.log(verseRow);
  var verseColumn = 1;
  
  //  想要的提醒
  var nameRemind = "提醒";
  if(day==1 || day==3){
      var remindRow = 1;
  }
  else{
      var remindRow = 2;
  }
  var remindColumn = 1;
  
  //  想要的LINE貼圖
  var nameLine = "LINE貼圖";
  //  stickerPackageId列(範圍2~16)
  var lineRow = 4;
  //  stickerPackageId欄(不用改)
  var lineStickerPackageColumn = 1;
  //  stickerId欄(不用改)
  var lineStickerIdIdColumn = 2;
  
  //  用於控制返還的數量
  var rowNumber = 1;
  var columnNumber = 1;
  
  //  取得Google Sheet的物件
  var SpreadSheet = SpreadsheetApp.openByUrl(url);
  //  取得工作表名稱
  var SheetNameVerse = SpreadSheet.getSheetByName(nameVerse);
  var SheetNameRemind = SpreadSheet.getSheetByName(nameRemind);
  var SheetNameLine = SpreadSheet.getSheetByName(nameLine);
  
  //  取得欄位內容
  var msg = SheetNameRemind.getSheetValues(remindRow, remindColumn, rowNumber, columnNumber) + "\n\n" + SheetNameVerse.getSheetValues(verseRow, verseColumn, rowNumber, columnNumber);
  var stickerPackageId = SheetNameLine.getSheetValues(lineRow, lineStickerPackageColumn, rowNumber, columnNumber).toString();
  var stickerId = SheetNameLine.getSheetValues(lineRow, lineStickerIdIdColumn, rowNumber, columnNumber).toString();
  
  UrlFetchApp.fetch('https://notify-api.line.me/api/notify', {
        'headers': {
            'Authorization': 'Bearer ' + 'your LINE tocken',
        },
        'method': 'post',
        'payload': {
            'message':msg.toString(),
            'stickerPackageId': stickerPackageId,
            'stickerId': stickerId
        }
    });
}
//  參考: https://developers.google.com/apps-script/reference/spreadsheet/spreadsheet