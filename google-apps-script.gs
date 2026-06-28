const SPREADSHEET_ID = "1Srpu2LhrJqQj3Zfsn0uFv3eYy9Suz97zCgKc4eKlyFM";
const SUMMARY_SHEET_NAME = "KetQuaTongHop";
const DETAIL_SHEET_NAME = "ChiTietCauHoi";

function doGet() {
  const spreadsheet = getTargetSpreadsheet();

  return createJsonResponse({
    ok: true,
    message: "Web app nhan ket qua thi dang hoat dong.",
    spreadsheetName: spreadsheet.getName(),
    spreadsheetUrl: spreadsheet.getUrl()
  });
}

function doPost(e) {
  const lock = LockService.getScriptLock();
  lock.waitLock(30000);

  try {
    const payload = parsePayload(e);
    const result = saveQuizResult(payload);

    return createJsonResponse({
      ok: true,
      submissionId: result.submissionId,
      spreadsheetUrl: result.spreadsheetUrl,
      message: "Da luu ket qua thi."
    });
  } catch (error) {
    return createJsonResponse({
      ok: false,
      message: error.message
    });
  } finally {
    lock.releaseLock();
  }
}

function testGhiThu() {
  const result = saveQuizResult({
    studentName: "Hoc vien test",
    fileName: "De kiem tra ket noi",
    startedAt: new Date().toISOString(),
    submittedAt: new Date().toISOString(),
    total: 2,
    correct: 1,
    wrong: 1,
    score: 5,
    percent: 50,
    details: [
      {
        questionText: "Cau hoi ghi thu so 1",
        selectedAnswer: "A",
        correctAnswer: "A",
        isCorrect: true
      },
      {
        questionText: "Cau hoi ghi thu so 2",
        selectedAnswer: "B",
        correctAnswer: "C",
        isCorrect: false
      }
    ]
  });

  Logger.log("Da ghi thu thanh cong: " + result.spreadsheetUrl);
}

function saveQuizResult(payload) {
  validatePayload(payload);

  const spreadsheet = getTargetSpreadsheet();
  const summarySheet = getOrCreateSheet(spreadsheet, SUMMARY_SHEET_NAME, [
    "Ma bai nop",
    "Nguoi thi",
    "Ten file de",
    "Bat dau luc",
    "Nop luc",
    "Tong so cau",
    "So cau dung",
    "So cau sai",
    "Diem",
    "Ty le dung",
    "Ngay ghi nhan"
  ]);
  const detailSheet = getOrCreateSheet(spreadsheet, DETAIL_SHEET_NAME, [
    "Ma bai nop",
    "Nguoi thi",
    "STT",
    "Cau hoi",
    "Dap an da chon",
    "Dap an dung",
    "Ket qua"
  ]);

  const submissionId = Utilities.getUuid();
  const recordedAt = new Date();

  summarySheet.appendRow([
    submissionId,
    payload.studentName || "",
    payload.fileName || "",
    toDateOrText(payload.startedAt),
    toDateOrText(payload.submittedAt),
    payload.total || 0,
    payload.correct || 0,
    payload.wrong || 0,
    payload.score || 0,
    payload.percent || 0,
    recordedAt
  ]);

  const detailRows = Array.isArray(payload.details)
    ? payload.details.map(function(detail, index) {
        return [
          submissionId,
          payload.studentName || "",
          index + 1,
          detail.questionText || "",
          detail.selectedAnswer || "Chua chon",
          detail.correctAnswer || "",
          detail.isCorrect ? "Dung" : "Sai"
        ];
      })
    : [];

  if (detailRows.length > 0) {
    detailSheet
      .getRange(detailSheet.getLastRow() + 1, 1, detailRows.length, detailRows[0].length)
      .setValues(detailRows);
  }

  SpreadsheetApp.flush();

  return {
    submissionId: submissionId,
    spreadsheetUrl: spreadsheet.getUrl()
  };
}

function getTargetSpreadsheet() {
  const configuredId = SPREADSHEET_ID.trim();

  if (configuredId) {
    return SpreadsheetApp.openById(configuredId);
  }

  const activeSpreadsheet = SpreadsheetApp.getActiveSpreadsheet();

  if (activeSpreadsheet) {
    return activeSpreadsheet;
  }

  throw new Error("Chua cau hinh SPREADSHEET_ID. Hay dan ID Google Sheet vao dong dau tien cua Apps Script.");
}

function parsePayload(e) {
  if (e && e.postData && e.postData.contents) {
    return JSON.parse(e.postData.contents);
  }

  if (e && e.parameter && e.parameter.payload) {
    return JSON.parse(e.parameter.payload);
  }

  throw new Error("Khong nhan duoc du lieu ket qua.");
}

function validatePayload(payload) {
  if (!payload || typeof payload !== "object") {
    throw new Error("Du lieu ket qua khong hop le.");
  }

  if (!payload.studentName) {
    throw new Error("Thieu ten nguoi thi.");
  }
}

function getOrCreateSheet(spreadsheet, sheetName, headers) {
  let sheet = spreadsheet.getSheetByName(sheetName);

  if (!sheet) {
    sheet = spreadsheet.insertSheet(sheetName);
  }

  if (sheet.getLastRow() === 0) {
    sheet.appendRow(headers);
    sheet.setFrozenRows(1);
  }

  return sheet;
}

function toDateOrText(value) {
  if (!value) {
    return "";
  }

  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? value : date;
}

function createJsonResponse(data) {
  return ContentService
    .createTextOutput(JSON.stringify(data))
    .setMimeType(ContentService.MimeType.JSON);
}
