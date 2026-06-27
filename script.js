const fileInput = document.getElementById("fileInput");
const fileStatus = document.getElementById("fileStatus");
const messageBox = document.getElementById("messageBox");
const previewSection = document.getElementById("previewSection");
const optionsSection = document.getElementById("optionsSection");
const quizSection = document.getElementById("quizSection");
const resultSection = document.getElementById("resultSection");
const validCount = document.getElementById("validCount");
const errorCount = document.getElementById("errorCount");
const questionPreviewList = document.getElementById("questionPreviewList");
const errorDetails = document.getElementById("errorDetails");
const errorList = document.getElementById("errorList");
const shuffleQuestionsInput = document.getElementById("shuffleQuestions");
const shuffleAnswersInput = document.getElementById("shuffleAnswers");
const timeLimitInput = document.getElementById("timeLimit");
const startQuizBtn = document.getElementById("startQuizBtn");
const quizList = document.getElementById("quizList");
const submitQuizBtn = document.getElementById("submitQuizBtn");
const timerBox = document.getElementById("timerBox");
const timerText = document.getElementById("timerText");
const timerWarning = document.getElementById("timerWarning");
const scoreSummary = document.getElementById("scoreSummary");
const resultList = document.getElementById("resultList");
const historyList = document.getElementById("historyList");
const clearHistoryBtn = document.getElementById("clearHistoryBtn");
const exportCsvBtn = document.getElementById("exportCsvBtn");
const exportTxtBtn = document.getElementById("exportTxtBtn");
const scrollHistoryBtn = document.getElementById("scrollHistoryBtn");

const STORAGE_KEY = "aiken_quiz_history";
const OPTION_LABELS = ["A", "B", "C", "D"];

let importedQuestions = [];
let importErrors = [];
let currentFileName = "";
let activeQuizQuestions = [];
let latestResult = null;
let timerId = null;
let remainingSeconds = 0;
let quizStartTime = null;

fileInput.addEventListener("change", handleFileUpload);
startQuizBtn.addEventListener("click", startQuiz);
submitQuizBtn.addEventListener("click", () => submitQuiz(false));
clearHistoryBtn.addEventListener("click", clearHistory);
exportCsvBtn.addEventListener("click", exportResultCSV);
exportTxtBtn.addEventListener("click", exportResultTXT);
scrollHistoryBtn.addEventListener("click", () => {
  document.getElementById("historySection").scrollIntoView({ behavior: "smooth" });
});

renderHistory();

function handleFileUpload(event) {
  const file = event.target.files[0];

  if (!file) {
    return;
  }

  if (!file.name.toLowerCase().endsWith(".txt")) {
    showMessage("Chỉ chấp nhận file .txt. Vui lòng chọn lại file.", "error");
    fileInput.value = "";
    return;
  }

  const reader = new FileReader();
  reader.onload = () => {
    currentFileName = file.name;
    const parsed = parseAiken(String(reader.result || ""));
    importedQuestions = parsed.questions;
    importErrors = parsed.errors;
    fileStatus.textContent = file.name;
    renderPreview();

    if (importedQuestions.length === 0) {
      showMessage("Không tìm thấy câu hỏi hợp lệ. Vui lòng kiểm tra lại định dạng Aiken.", "error");
    } else if (importErrors.length > 0) {
      showMessage(`Đã đọc ${importedQuestions.length} câu hợp lệ và phát hiện ${importErrors.length} câu lỗi.`, "warning");
    } else {
      showMessage(`Đã đọc thành công ${importedQuestions.length} câu hỏi hợp lệ.`, "info");
    }
  };

  reader.onerror = () => {
    showMessage("Không đọc được file. Vui lòng thử lại.", "error");
  };

  reader.readAsText(file, "UTF-8");
}

function parseAiken(content) {
  const normalized = content.replace(/\r\n/g, "\n").replace(/\r/g, "\n");
  const lines = normalized.split("\n");
  const blocks = [];
  let currentBlock = [];

  // Gom các dòng thành từng cụm câu hỏi; dòng trống hoặc ANSWER hợp lệ sẽ kết thúc một cụm.
  lines.forEach((rawLine) => {
    const line = rawLine.trim();

    if (!line) {
      if (currentBlock.length > 0) {
        blocks.push(currentBlock);
        currentBlock = [];
      }
      return;
    }

    currentBlock.push(line);

    if (/^ANSWER\s*:\s*[A-D]\s*$/i.test(line)) {
      blocks.push(currentBlock);
      currentBlock = [];
    }
  });

  if (currentBlock.length > 0) {
    blocks.push(currentBlock);
  }

  const questions = [];
  const errors = [];

  blocks.forEach((block, index) => {
    const question = parseQuestionBlock(block);
    const validation = validateQuestion(question);

    if (validation.valid) {
      questions.push({
        id: cryptoRandomId(),
        text: question.text,
        options: question.options,
        correctAnswer: question.correctAnswer,
        sourceIndex: index + 1
      });
    } else {
      errors.push({
        index: index + 1,
        raw: block.join("\n"),
        reasons: validation.errors
      });
    }
  });

  return { questions, errors };
}

function parseQuestionBlock(block) {
  const questionLines = [];
  const options = {};
  let correctAnswer = "";

  // Mỗi dòng được phân loại thành nội dung câu hỏi, lựa chọn A-D hoặc đáp án đúng.
  block.forEach((line) => {
    const optionMatch = line.match(/^([A-D])[\.\)]\s+(.+)$/i);
    const answerMatch = line.match(/^ANSWER\s*:\s*([A-D])\s*$/i);

    if (optionMatch) {
      options[optionMatch[1].toUpperCase()] = optionMatch[2].trim();
      return;
    }

    if (answerMatch) {
      correctAnswer = answerMatch[1].toUpperCase();
      return;
    }

    questionLines.push(line);
  });

  return {
    text: questionLines.join(" ").trim(),
    options,
    correctAnswer
  };
}

function validateQuestion(question) {
  const errors = [];

  if (!question.text) {
    errors.push("Thiếu nội dung câu hỏi.");
  }

  OPTION_LABELS.forEach((label) => {
    if (!question.options[label]) {
      errors.push(`Thiếu lựa chọn ${label}.`);
    }
  });

  if (!question.correctAnswer) {
    errors.push("Thiếu dòng ANSWER: A/B/C/D.");
  } else if (!OPTION_LABELS.includes(question.correctAnswer)) {
    errors.push("Đáp án đúng phải là A, B, C hoặc D.");
  }

  return {
    valid: errors.length === 0,
    errors
  };
}

function renderPreview() {
  previewSection.classList.remove("hidden");
  validCount.textContent = importedQuestions.length;
  errorCount.textContent = importErrors.length;
  questionPreviewList.innerHTML = "";

  importedQuestions.forEach((question, index) => {
    const card = document.createElement("article");
    card.className = "question-card";
    card.innerHTML = `
      <h3>Câu ${index + 1}. ${escapeHTML(question.text)}</h3>
      <ul class="answer-list">
        ${OPTION_LABELS.map((label) => `
          <li class="answer-item ${label === question.correctAnswer ? "is-correct" : ""}">
            <strong>${label}.</strong> ${escapeHTML(question.options[label])}
          </li>
        `).join("")}
      </ul>
      <div class="question-meta">
        <span class="tag correct">Đáp án đúng: ${question.correctAnswer}</span>
      </div>
    `;
    questionPreviewList.appendChild(card);
  });

  renderImportErrors();
  optionsSection.classList.toggle("hidden", importedQuestions.length === 0);
  resultSection.classList.add("hidden");
  quizSection.classList.add("hidden");
  stopTimer();
}

function renderImportErrors() {
  errorDetails.classList.toggle("hidden", importErrors.length === 0);
  errorList.innerHTML = "";

  importErrors.forEach((error) => {
    const item = document.createElement("div");
    item.className = "error-item";
    item.innerHTML = `
      <strong>Cụm câu hỏi ${error.index}</strong>
      <p>${error.reasons.map(escapeHTML).join("<br>")}</p>
      <pre>${escapeHTML(error.raw)}</pre>
    `;
    errorList.appendChild(item);
  });
}

function startQuiz() {
  if (importedQuestions.length === 0) {
    showMessage("Cần có ít nhất một câu hỏi hợp lệ để bắt đầu làm bài.", "error");
    return;
  }

  const shouldShuffleQuestions = shuffleQuestionsInput.checked;
  const shouldShuffleAnswers = shuffleAnswersInput.checked;

  activeQuizQuestions = importedQuestions.map((question) => {
    let options = OPTION_LABELS.map((label) => ({
      originalLabel: label,
      text: question.options[label]
    }));

    if (shouldShuffleAnswers) {
      options = shuffleArray(options);
    }

    return {
      ...question,
      displayOptions: options
    };
  });

  if (shouldShuffleQuestions) {
    activeQuizQuestions = shuffleArray(activeQuizQuestions);
  }

  quizStartTime = new Date();
  latestResult = null;
  resultSection.classList.add("hidden");
  quizSection.classList.remove("hidden");
  renderQuiz();
  setupTimer();
  quizSection.scrollIntoView({ behavior: "smooth" });
}

function renderQuiz() {
  quizList.innerHTML = "";

  activeQuizQuestions.forEach((question, questionIndex) => {
    const card = document.createElement("article");
    card.className = "question-card";
    card.innerHTML = `
      <h3>Câu ${questionIndex + 1}. ${escapeHTML(question.text)}</h3>
      <div class="answer-list">
        ${question.displayOptions.map((option, optionIndex) => {
          const displayLabel = OPTION_LABELS[optionIndex];
          const inputId = `q-${question.id}-${option.originalLabel}`;
          return `
            <label class="answer-option" for="${inputId}">
              <input id="${inputId}" type="radio" name="question-${question.id}" value="${option.originalLabel}">
              <span><strong>${displayLabel}.</strong> ${escapeHTML(option.text)}</span>
            </label>
          `;
        }).join("")}
      </div>
    `;
    quizList.appendChild(card);
  });
}

function setupTimer() {
  stopTimer();
  const minutes = Number(timeLimitInput.value);

  if (!Number.isFinite(minutes) || minutes <= 0) {
    timerBox.classList.add("hidden");
    return;
  }

  remainingSeconds = Math.round(minutes * 60);
  timerBox.classList.remove("hidden");
  updateTimerDisplay();
  // Đồng hồ chạy độc lập với phần chọn đáp án và tự nộp khi hết thời gian.
  timerId = window.setInterval(() => {
    remainingSeconds -= 1;
    updateTimerDisplay();

    if (remainingSeconds <= 0) {
      submitQuiz(true);
    }
  }, 1000);
}

function updateTimerDisplay() {
  const safeSeconds = Math.max(0, remainingSeconds);
  const minutes = Math.floor(safeSeconds / 60);
  const seconds = safeSeconds % 60;
  timerText.textContent = `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;

  if (safeSeconds > 0 && safeSeconds <= 60) {
    timerBox.classList.add("warning");
    timerWarning.textContent = "Sắp hết giờ!";
  } else {
    timerBox.classList.remove("warning");
    timerWarning.textContent = "";
  }
}

function stopTimer() {
  if (timerId) {
    window.clearInterval(timerId);
    timerId = null;
  }
  timerWarning.textContent = "";
  timerBox.classList.remove("warning");
}

function submitQuiz(autoSubmit) {
  if (activeQuizQuestions.length === 0) {
    return;
  }

  const answers = collectAnswers();
  const unansweredCount = activeQuizQuestions.filter((question) => !answers[question.id]).length;

  if (!autoSubmit && unansweredCount > 0) {
    const confirmed = window.confirm(`Bạn còn ${unansweredCount} câu chưa trả lời. Bạn có chắc muốn nộp bài không?`);
    if (!confirmed) {
      return;
    }
  }

  stopTimer();
  latestResult = calculateScore(answers);
  saveHistory(latestResult);
  renderResult();
  renderHistory();
  showMessage(autoSubmit ? "Đã hết giờ, hệ thống đã tự động nộp bài." : "Đã nộp bài và chấm điểm.", "info");
  resultSection.scrollIntoView({ behavior: "smooth" });
}

function collectAnswers() {
  const answers = {};

  activeQuizQuestions.forEach((question) => {
    const selected = document.querySelector(`input[name="question-${question.id}"]:checked`);
    answers[question.id] = selected ? selected.value : "";
  });

  return answers;
}

function calculateScore(answers) {
  // So sánh đáp án học sinh chọn với nhãn đáp án gốc để vẫn đúng khi xáo trộn lựa chọn.
  const details = activeQuizQuestions.map((question) => {
    const selectedAnswer = answers[question.id] || "";
    const isCorrect = selectedAnswer === question.correctAnswer;

    return {
      questionText: question.text,
      options: question.options,
      selectedAnswer,
      correctAnswer: question.correctAnswer,
      isCorrect
    };
  });

  const total = details.length;
  const correct = details.filter((item) => item.isCorrect).length;
  const wrong = total - correct;
  const score = total > 0 ? Number(((correct / total) * 10).toFixed(2)) : 0;
  const percent = total > 0 ? Number(((correct / total) * 100).toFixed(2)) : 0;

  return {
    fileName: currentFileName || "Không rõ tên file",
    submittedAt: new Date().toISOString(),
    startedAt: quizStartTime ? quizStartTime.toISOString() : new Date().toISOString(),
    total,
    correct,
    wrong,
    score,
    percent,
    details
  };
}

function renderResult() {
  if (!latestResult) {
    return;
  }

  resultSection.classList.remove("hidden");
  scoreSummary.innerHTML = `
    <div><span>${latestResult.total}</span><small>Tổng số câu</small></div>
    <div><span>${latestResult.correct}</span><small>Số câu đúng</small></div>
    <div><span>${latestResult.wrong}</span><small>Số câu sai</small></div>
    <div><span>${latestResult.score}</span><small>Điểm thang 10</small></div>
    <div><span>${latestResult.percent}%</span><small>Tỷ lệ đúng</small></div>
  `;

  resultList.innerHTML = "";
  latestResult.details.forEach((detail, index) => {
    const card = document.createElement("article");
    card.className = `question-card ${detail.isCorrect ? "correct" : "incorrect"}`;
    card.innerHTML = `
      <h3>Câu ${index + 1}. ${escapeHTML(detail.questionText)}</h3>
      <ul class="answer-list">
        ${OPTION_LABELS.map((label) => {
          const isCorrectAnswer = label === detail.correctAnswer;
          const isSelectedWrong = label === detail.selectedAnswer && !detail.isCorrect;
          return `
            <li class="answer-item ${isCorrectAnswer ? "is-correct" : ""} ${isSelectedWrong ? "is-selected-wrong" : ""}">
              <strong>${label}.</strong> ${escapeHTML(detail.options[label])}
            </li>
          `;
        }).join("")}
      </ul>
      <div class="question-meta">
        <span class="tag ${detail.isCorrect ? "correct" : "incorrect"}">${detail.isCorrect ? "Đúng" : "Sai"}</span>
        <span class="tag">Bạn chọn: ${detail.selectedAnswer || "Chưa chọn"}</span>
        <span class="tag correct">Đáp án đúng: ${detail.correctAnswer}</span>
      </div>
    `;
    resultList.appendChild(card);
  });
}

function saveHistory(result) {
  const history = getHistory();
  const item = {
    submittedAt: result.submittedAt,
    fileName: result.fileName,
    total: result.total,
    correct: result.correct,
    score: result.score
  };

  history.unshift(item);
  // Chỉ giữ 50 lần làm bài gần nhất để localStorage luôn gọn.
  localStorage.setItem(STORAGE_KEY, JSON.stringify(history.slice(0, 50)));
}

function renderHistory() {
  const history = getHistory();
  historyList.innerHTML = "";

  if (history.length === 0) {
    historyList.innerHTML = '<div class="empty-state">Chưa có kết quả nào được lưu trên trình duyệt này.</div>';
    return;
  }

  history.forEach((item) => {
    const row = document.createElement("div");
    row.className = "history-item";
    row.innerHTML = `
      <strong>${escapeHTML(item.fileName)}</strong>
      <span>${formatDateTime(item.submittedAt)}</span>
      <span>Tổng: ${item.total}</span>
      <span>Đúng: ${item.correct}</span>
      <span>Điểm: ${item.score}</span>
    `;
    historyList.appendChild(row);
  });
}

function getHistory() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch (error) {
    return [];
  }
}

function clearHistory() {
  if (!window.confirm("Bạn có chắc muốn xóa toàn bộ lịch sử làm bài không?")) {
    return;
  }

  localStorage.removeItem(STORAGE_KEY);
  renderHistory();
}

function exportResultCSV() {
  if (!latestResult) {
    showMessage("Chưa có kết quả để xuất file.", "warning");
    return;
  }

  const rows = [
    ["Tên file đề", latestResult.fileName],
    ["Ngày giờ làm bài", formatDateTime(latestResult.submittedAt)],
    ["Tổng số câu", latestResult.total],
    ["Số câu đúng", latestResult.correct],
    ["Số câu sai", latestResult.wrong],
    ["Điểm", latestResult.score],
    [],
    ["STT", "Câu hỏi", "Đáp án đã chọn", "Đáp án đúng", "Kết quả"]
  ];

  latestResult.details.forEach((detail, index) => {
    rows.push([
      index + 1,
      detail.questionText,
      detail.selectedAnswer || "Chưa chọn",
      detail.correctAnswer,
      detail.isCorrect ? "Đúng" : "Sai"
    ]);
  });

  const csv = rows.map((row) => row.map(escapeCSVCell).join(",")).join("\n");
  downloadFile(`ket-qua-${Date.now()}.csv`, `\uFEFF${csv}`, "text/csv;charset=utf-8");
}

function exportResultTXT() {
  if (!latestResult) {
    showMessage("Chưa có kết quả để xuất file.", "warning");
    return;
  }

  const lines = [
    `Tên file đề: ${latestResult.fileName}`,
    `Ngày giờ làm bài: ${formatDateTime(latestResult.submittedAt)}`,
    `Tổng số câu: ${latestResult.total}`,
    `Số câu đúng: ${latestResult.correct}`,
    `Số câu sai: ${latestResult.wrong}`,
    `Điểm: ${latestResult.score}`,
    `Tỷ lệ: ${latestResult.percent}%`,
    "",
    "Chi tiết từng câu:"
  ];

  latestResult.details.forEach((detail, index) => {
    lines.push("");
    lines.push(`Câu ${index + 1}: ${detail.questionText}`);
    lines.push(`Đáp án đã chọn: ${detail.selectedAnswer || "Chưa chọn"}`);
    lines.push(`Đáp án đúng: ${detail.correctAnswer}`);
    lines.push(`Kết quả: ${detail.isCorrect ? "Đúng" : "Sai"}`);
  });

  downloadFile(`ket-qua-${Date.now()}.txt`, lines.join("\n"), "text/plain;charset=utf-8");
}

function shuffleArray(array) {
  const cloned = [...array];

  for (let index = cloned.length - 1; index > 0; index -= 1) {
    const randomIndex = Math.floor(Math.random() * (index + 1));
    [cloned[index], cloned[randomIndex]] = [cloned[randomIndex], cloned[index]];
  }

  return cloned;
}

function showMessage(text, type) {
  messageBox.textContent = text;
  messageBox.className = `message ${type}`;
}

function downloadFile(fileName, content, mimeType) {
  // Tạo file tải xuống ngay trong trình duyệt, không cần gửi dữ liệu ra ngoài.
  const blob = new Blob([content], { type: mimeType });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = fileName;
  document.body.appendChild(link);
  link.click();
  link.remove();
  URL.revokeObjectURL(url);
}

function escapeHTML(value) {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

function escapeCSVCell(value) {
  const text = String(value ?? "");
  return `"${text.replace(/"/g, '""')}"`;
}

function formatDateTime(isoString) {
  return new Intl.DateTimeFormat("vi-VN", {
    dateStyle: "short",
    timeStyle: "medium"
  }).format(new Date(isoString));
}

function cryptoRandomId() {
  if (window.crypto && window.crypto.randomUUID) {
    return window.crypto.randomUUID();
  }

  return `q-${Date.now()}-${Math.random().toString(16).slice(2)}`;
}
