let q;
const quizData = [];

function doGet(e) {
    //リクエストパラメータ名"q"の値を取得する
    q = e.parameter.q;

    if (q) {
      q = Number(q);
    } else {
      q = 0;
    }

    //　スプレッドシートから問題を読み込む
    let sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("問題シート");
    let quizLen = sheet.getLastRow() - 1;  // 問題数を設定
    for (var i=0 ; i<quizLen ; i++) {
      let quest = sheet.getRange(2+i, 2).getValue();
      let ans1 = sheet.getRange(2+i, 3).getValue();
      let ans2 = sheet.getRange(2+i, 4).getValue();
      let ans3 = sheet.getRange(2+i, 5).getValue();
      let ans4 = sheet.getRange(2+i, 6).getValue();
      let cr = sheet.getRange(2+i, 7).getValue();
      quizData.push([quest,ans1,ans2,ans3,ans4,cr]);
    }

    const template = HtmlService.createTemplateFromFile('index');
    template.q = q;
    template.quizLen = quizLen;
    if (q >= 1) {
      template.data = quizData[q-1];
    } else {
      template.data = quizData[0]; // dataの読み込みエラーを回避するためダミーで入れておく
    }
    return template.evaluate();
}

function include(filename) {
  return HtmlService.createHtmlOutputFromFile(filename).getContent();
}

function getQ() {
  return "let q = " + q.toString();
}

function getQuizData() {
  return "const quizData = " + quizData.toString();
}