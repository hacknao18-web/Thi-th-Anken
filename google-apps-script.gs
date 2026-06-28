const SPREADSHEET_ID = "1Srpu2LhrJqQj3Zfsn0uFv3eYy9Suz97zCgKc4eKlyFM";
const SUMMARY_SHEET_NAME = "KetQuaTongHop";
const DETAIL_SHEET_NAME = "ChiTietCauHoi";
const EXAM_SHEET_NAME = "DeThi";
const ANTI_CHEAT_SHEET_NAME = "NhatKyHanhVi";

function doGet(e) {
  const spreadsheet = getTargetSpreadsheet();
  const action = e && e.parameter ? e.parameter.action : "";
  const callback = e && e.parameter ? e.parameter.callback : "";

  if (action === "getExam") {
    let response;

    try {
      response = {
        ok: true,
        exam: getSharedExam(e.parameter.examId || "")
      };
    } catch (error) {
      response = {
        ok: false,
        message: error.message
      };
    }

    if (callback) {
      return createJavascriptResponse(callback + "(" + JSON.stringify(response) + ");");
    }

    return createJsonResponse(response);
  }

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
    const isExamPayload = payload && payload.type === "exam";
    const result = isExamPayload ? saveSharedExam(payload) : saveQuizResult(payload);

    return createJsonResponse({
      ok: true,
      submissionId: result.submissionId || "",
      examId: result.examId || "",
      spreadsheetUrl: result.spreadsheetUrl,
      message: isExamPayload ? "Da luu de thi." : "Da luu ket qua thi."
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
    "Roi tab",
    "Mat focus",
    "Thoat fullscreen",
    "Copy",
    "Paste",
    "Reload",
    "Tong su kien hanh vi",
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
  const antiCheatSheet = getOrCreateSheet(spreadsheet, ANTI_CHEAT_SHEET_NAME, [
    "Ma bai nop",
    "Nguoi thi",
    "STT",
    "Thoi gian",
    "Loai su kien",
    "Mo ta",
    "Ma cau hoi",
    "So lan"
  ]);

  const submissionId = Utilities.getUuid();
  const recordedAt = new Date();
  const antiCheatSummary = payload.antiCheatSummary || {};

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
    antiCheatSummary.leaveTab || 0,
    antiCheatSummary.windowBlur || 0,
    antiCheatSummary.exitFullscreen || 0,
    antiCheatSummary.copyContent || 0,
    antiCheatSummary.pasteContent || 0,
    antiCheatSummary.pageReload || 0,
    antiCheatSummary.totalEvents || 0,
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

  const antiCheatRows = Array.isArray(payload.antiCheatLog)
    ? payload.antiCheatLog.map(function(event, index) {
        return [
          submissionId,
          payload.studentName || "",
          index + 1,
          toDateOrText(event.timestamp),
          event.type || "",
          event.message || "",
          event.questionId || "",
          event.count || ""
        ];
      })
    : [];

  if (antiCheatRows.length > 0) {
    antiCheatSheet
      .getRange(antiCheatSheet.getLastRow() + 1, 1, antiCheatRows.length, antiCheatRows[0].length)
      .setValues(antiCheatRows);
  }

  SpreadsheetApp.flush();

  return {
    submissionId: submissionId,
    spreadsheetUrl: spreadsheet.getUrl()
  };
}

function saveSharedExam(payload) {
  validateExamPayload(payload);

  const spreadsheet = getTargetSpreadsheet();
  const examSheet = getOrCreateSheet(spreadsheet, EXAM_SHEET_NAME, [
    "Ma de",
    "Ten de",
    "Tuy chon",
    "Cau hoi",
    "Ngay tao/cap nhat"
  ]);
  const examId = String(payload.examId || "").trim();
  const now = new Date();
  const row = [
    examId,
    payload.fileName || "",
    JSON.stringify(payload.settings || {}),
    JSON.stringify(payload.questions || []),
    now
  ];
  const existingRow = findRowByFirstColumn(examSheet, examId);

  if (existingRow > 0) {
    examSheet.getRange(existingRow, 1, 1, row.length).setValues([row]);
  } else {
    examSheet.appendRow(row);
  }

  SpreadsheetApp.flush();

  return {
    examId: examId,
    spreadsheetUrl: spreadsheet.getUrl()
  };
}

function getSharedExam(examId) {
  const safeExamId = String(examId || "").trim();

  if (!safeExamId) {
    throw new Error("Thieu ma de thi.");
  }

  const spreadsheet = getTargetSpreadsheet();
  const examSheet = spreadsheet.getSheetByName(EXAM_SHEET_NAME);

  if (!examSheet) {
    throw new Error("Chua co sheet DeThi.");
  }

  const rowIndex = findRowByFirstColumn(examSheet, safeExamId);

  if (rowIndex <= 0) {
    throw new Error("Khong tim thay de thi.");
  }

  const row = examSheet.getRange(rowIndex, 1, 1, 5).getValues()[0];

  return {
    examId: row[0],
    fileName: row[1],
    settings: row[2] ? JSON.parse(row[2]) : {},
    questions: row[3] ? JSON.parse(row[3]) : []
  };
}

function validateExamPayload(payload) {
  if (!payload || typeof payload !== "object") {
    throw new Error("Du lieu de thi khong hop le.");
  }

  if (!payload.examId) {
    throw new Error("Thieu ma de thi.");
  }

  if (!Array.isArray(payload.questions) || payload.questions.length === 0) {
    throw new Error("De thi chua co cau hoi.");
  }
}

function findRowByFirstColumn(sheet, value) {
  const lastRow = sheet.getLastRow();

  if (lastRow < 2) {
    return -1;
  }

  const values = sheet.getRange(2, 1, lastRow - 1, 1).getValues();

  for (let index = 0; index < values.length; index += 1) {
    if (String(values[index][0]) === String(value)) {
      return index + 2;
    }
  }

  return -1;
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
  } else if (sheet.getLastColumn() < headers.length) {
    sheet.getRange(1, 1, 1, headers.length).setValues([headers]);
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

function createJavascriptResponse(source) {
  return ContentService
    .createTextOutput(source)
    .setMimeType(ContentService.MimeType.JAVASCRIPT);
}
