const fileInput = document.getElementById("fileInput");
const fileStatus = document.getElementById("fileStatus");
const messageBox = document.getElementById("messageBox");
const demoExamBtn = document.getElementById("demoExamBtn");
const examSection = document.getElementById("examSection");
const examList = document.getElementById("examList");
const previewSection = document.getElementById("previewSection");
const optionsSection = document.getElementById("optionsSection");
const shareSection = document.getElementById("shareSection");
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
const studentNameInput = document.getElementById("studentName");
const resultEndpointInput = document.getElementById("resultEndpoint");
const startQuizBtn = document.getElementById("startQuizBtn");
const quizList = document.getElementById("quizList");
const submitQuizBtn = document.getElementById("submitQuizBtn");
const answeredCount = document.getElementById("answeredCount");
const unansweredCount = document.getElementById("unansweredCount");
const quizProgressBody = document.getElementById("quizProgressBody");
const timerBox = document.getElementById("timerBox");
const timerText = document.getElementById("timerText");
const timerWarning = document.getElementById("timerWarning");
const scoreSummary = document.getElementById("scoreSummary");
const resultList = document.getElementById("resultList");
const historyList = document.getElementById("historyList");
const clearHistoryBtn = document.getElementById("clearHistoryBtn");
const exportCsvBtn = document.getElementById("exportCsvBtn");
const exportAntiCheatCsvBtn = document.getElementById("exportAntiCheatCsvBtn");
const exportTxtBtn = document.getElementById("exportTxtBtn");
const scrollHistoryBtn = document.getElementById("scrollHistoryBtn");
const copyShareLinkBtn = document.getElementById("copyShareLinkBtn");
const shareQuizLink = document.getElementById("shareQuizLink");
const shareLinkWarning = document.getElementById("shareLinkWarning");
const shareLinkStatus = document.getElementById("shareLinkStatus");
const antiCheatPanel = document.getElementById("antiCheatPanel");
const antiCheatWarning = document.getElementById("antiCheatWarning");
const antiCheatSummary = document.getElementById("antiCheatSummary");
const antiCheatPopup = document.getElementById("antiCheatPopup");
const antiCheatPopupTitle = document.getElementById("antiCheatPopupTitle");
const antiCheatPopupMessage = document.getElementById("antiCheatPopupMessage");
const antiCheatPopupClose = document.getElementById("antiCheatPopupClose");

const STORAGE_KEY = "aiken_quiz_history";
const RESULT_ENDPOINT_KEY = "aiken_quiz_result_endpoint";
const ANTI_CHEAT_SESSION_KEY = "aiken_quiz_anti_cheat_session";
const DEFAULT_RESULT_ENDPOINT = "https://script.google.com/macros/s/AKfycbwKUm1D585U-B8ERczQ28e1lDpk5UZKE0RJS0ddrckrhRL7mCsf5voE2UtUrzIvloinOw/exec";
const OPTION_LABELS = ["A", "B", "C", "D"];
const DEMO_EXAM_ID = "demo-exam";
const CHEAT_EVENT_TYPES = Object.freeze({
  LEAVE_TAB: "LEAVE_TAB",
  RETURN_TAB: "RETURN_TAB",
  WINDOW_BLUR: "WINDOW_BLUR",
  WINDOW_FOCUS: "WINDOW_FOCUS",
  EXIT_FULLSCREEN: "EXIT_FULLSCREEN",
  COPY_CONTENT: "COPY_CONTENT",
  PASTE_CONTENT: "PASTE_CONTENT",
  PAGE_RELOAD: "PAGE_RELOAD"
});
const DEMO_EXAM_CONTENT = `Theo Nghị quyết số 79, kinh tế nhà nước giữ vai trò như thế nào trong nền kinh tế thị trường định hướng xã hội chủ nghĩa?
A. Là lực lượng nòng cốt điều tiết thị trường và bảo đảm cân đối cung cầu hàng hóa cơ bản.
B. Giữ vai trò chủ đạo, bảo đảm ổn định vĩ mô, các cân đối lớn của nền kinh tế và định hướng chiến lược phát triển.
C. Là khu vực kinh tế quyết định tốc độ tăng trưởng và quy mô của nền kinh tế quốc dân.
D. Đóng vai trò trung tâm trong việc điều phối nguồn lực và phân bổ đầu tư toàn xã hội.
ANSWER: B

Theo mục tiêu cụ thể đến năm 2030, tỷ lệ huy động nguồn ngân sách nhà nước giai đoạn 2026 - 2030 được đặt ra khoảng bao nhiêu?
A. Khoảng 16% GDP nhằm bảo đảm cân đối thu chi ngân sách trong dài hạn.
B. Khoảng 18% GDP để đáp ứng yêu cầu phát triển kinh tế - xã hội trong giai đoạn mới.
C. Khoảng 20% GDP nhằm bảo đảm nguồn lực cho các chương trình phát triển quốc gia.
D. Khoảng 22% GDP để tăng khả năng đầu tư phát triển kết cấu hạ tầng.
ANSWER: B

Theo mục tiêu đến năm 2030, tỷ lệ bội chi ngân sách nhà nước được xác định ở mức khoảng bao nhiêu?
A. Khoảng 3% GDP nhằm bảo đảm ổn định tài chính quốc gia.
B. Khoảng 3,2% GDP nhằm bảo đảm ổn định tài chính quốc gia.
C. Khoảng 3,5% GDP nhằm bảo đảm ổn định tài chính quốc gia.
D. Khoảng 4% GDP nhằm bảo đảm ổn định tài chính quốc gia.
ANSWER: A

Theo mục tiêu phát triển doanh nghiệp nhà nước đến năm 2030, phấn đấu có bao nhiêu doanh nghiệp nhà nước nằm trong nhóm 500 doanh nghiệp lớn nhất Đông Nam Á?
A. Khoảng 45 doanh nghiệp nhà nước nằm trong nhóm 500 doanh nghiệp lớn nhất Đông Nam Á.
B. Khoảng 50 doanh nghiệp nhà nước nằm trong nhóm 500 doanh nghiệp lớn nhất Đông Nam Á.
C. Khoảng 55 doanh nghiệp nhà nước nằm trong nhóm 500 doanh nghiệp lớn nhất Đông Nam Á.
D. Khoảng 60 doanh nghiệp nhà nước nằm trong nhóm 500 doanh nghiệp lớn nhất Đông Nam Á.
ANSWER: B

Theo mục tiêu đối với tổ chức tín dụng nhà nước đến năm 2030, phấn đấu có ít nhất bao nhiêu ngân hàng thương mại nhà nước thuộc nhóm 100 ngân hàng lớn nhất châu Á về tổng tài sản?
A. Ít nhất 3 ngân hàng thương mại nhà nước thuộc nhóm 100 ngân hàng lớn nhất châu Á.
B. Ít nhất 4 ngân hàng thương mại nhà nước thuộc nhóm 100 ngân hàng lớn nhất châu Á.
C. Ít nhất 5 ngân hàng thương mại nhà nước thuộc nhóm 100 ngân hàng lớn nhất châu Á.
D. Ít nhất 6 ngân hàng thương mại nhà nước thuộc nhóm 100 ngân hàng lớn nhất châu Á.
ANSWER: A

Theo quan điểm chỉ đạo, việc quản lý và sử dụng các nguồn lực kinh tế nhà nước phải được thực hiện theo nguyên tắc nào?
A. Được thống kê, đánh giá và hạch toán đầy đủ theo nguyên tắc thị trường.
B. Được thống kê, đánh giá và hạch toán đầy đủ theo nguyên tắc thị trường gắn với mục tiêu phát triển.
C. Được thống kê, đánh giá và hạch toán đầy đủ theo nguyên tắc thị trường gắn với mục tiêu phát triển kinh tế.
D. Được thống kê, đánh giá và hạch toán đầy đủ theo nguyên tắc thị trường gắn với mục tiêu phát triển kinh tế - xã hội.
ANSWER: D

Theo quan điểm chỉ đạo, kinh tế nhà nước phải đóng vai trò như thế nào trong quá trình phát triển kinh tế?
A. Là lực lượng trung tâm điều tiết các cân đối kinh tế vĩ mô của nền kinh tế.
B. Là lực lượng trung tâm điều tiết các cân đối lớn của nền kinh tế.
C. Là lực lượng trung tâm điều tiết các cân đối lớn của nền kinh tế quốc dân.
D. Là lực lượng trung tâm điều tiết các cân đối lớn của nền kinh tế quốc gia.
ANSWER: D

Theo đường lối đối ngoại của Đại hội XIV, mục tiêu cao nhất của hoạt động đối ngoại là gì?
A. Mở rộng quan hệ hợp tác quốc tế nhằm thu hút tối đa nguồn lực cho phát triển kinh tế.
B. Bảo đảm cao nhất lợi ích quốc gia - dân tộc trên cơ sở luật pháp quốc tế và Hiến chương Liên hợp quốc.
C. Tăng cường vai trò và ảnh hưởng của Việt Nam trong các tổ chức khu vực và quốc tế.
D. Xây dựng môi trường hòa bình, ổn định để thúc đẩy hội nhập kinh tế quốc tế.
ANSWER: B

Theo Văn kiện Đại hội XIV, các hoạt động đối ngoại của Việt Nam được triển khai đồng bộ trên ba trụ cột nào?
A. Ngoại giao kinh tế - ngoại giao văn hóa - ngoại giao quốc phòng.
B. Đối ngoại Đảng - ngoại giao Nhà nước - đối ngoại Nhân dân.
C. Ngoại giao chính trị - ngoại giao kinh tế - ngoại giao đa phương.
D. Ngoại giao song phương - ngoại giao đa phương - ngoại giao nhân dân.
ANSWER: B

Theo đường lối đối ngoại Đại hội XIV, phương châm của đối ngoại Việt Nam được xác định là gì?
A. Phát huy vai trò tiên phong của đối ngoại trong giữ vững môi trường hòa bình, ổn định.
B. Phát huy vai trò tiên phong của đối ngoại trong ngăn ngừa nguy cơ chiến tranh.
C. Phát huy vai trò tiên phong của đối ngoại trong tạo lập môi trường hòa bình, ổn định.
D. Phát huy vai trò tiên phong của đối ngoại trong bảo vệ lợi ích quốc gia.
ANSWER: C

Theo đường lối đối ngoại Đại hội XIV, Đại hội XIV của Đảng nhấn mạnh phát triển đối ngoại trong kỷ nguyên mới cần tương xứng với những yếu tố nào của đất nước?
A. Thành tựu đổi mới, sức mạnh tổng hợp và uy tín quốc tế của đất nước.
B. Thành tựu đổi mới, tiềm lực tổng hợp và uy tín quốc tế của đất nước.
C. Thành tựu đổi mới, sức mạnh tổng hợp và vị thế quốc tế của đất nước.
D. Thành tựu đổi mới, tiềm lực tổng hợp và vị thế quốc tế của đất nước.
ANSWER: A

Theo đường lối đối ngoại Đại hội XIV, quan điểm "tự chủ chiến lược", "tự cường" trong đối ngoại được nhấn mạnh dựa trên cơ sở nào?
A. Tư tưởng của Đảng và Chủ tịch Hồ Chí Minh về phát huy nội lực kết hợp với sức mạnh quốc tế.
B. Tư tưởng của Đảng và Chủ tịch Hồ Chí Minh về phát huy sức mạnh nội lực và sức mạnh quốc tế.
C. Tư tưởng của Đảng và Chủ tịch Hồ Chí Minh về phát huy sức mạnh nội lực kết hợp sức mạnh quốc tế.
D. Tư tưởng của Đảng và Chủ tịch Hồ Chí Minh về kết hợp sức mạnh nội lực với sức mạnh quốc tế.
ANSWER: C`;

let importedQuestions = [];
let importErrors = [];
let currentFileName = "";
let exams = [];
let selectedExamId = "";
let activeQuizQuestions = [];
let latestResult = null;
let timerId = null;
let remainingSeconds = 0;
let quizStartTime = null;
let currentStudentName = "";
let isSubmitting = false;
let isStudentMode = false;
let sharedQuizConfig = null;
let lastSavedExamId = "";
let saveExamTimerId = null;
let latestSharePayload = null;

const AntiCheatMonitor = (() => {
  const DUPLICATE_EVENT_MS = 900;
  const counterKeys = {
    [CHEAT_EVENT_TYPES.LEAVE_TAB]: "leaveTab",
    [CHEAT_EVENT_TYPES.WINDOW_BLUR]: "windowBlur",
    [CHEAT_EVENT_TYPES.EXIT_FULLSCREEN]: "exitFullscreen",
    [CHEAT_EVENT_TYPES.COPY_CONTENT]: "copyContent",
    [CHEAT_EVENT_TYPES.PASTE_CONTENT]: "pasteContent",
    [CHEAT_EVENT_TYPES.PAGE_RELOAD]: "pageReload"
  };
  const labels = {
    leaveTab: "Rời tab",
    windowBlur: "Mất focus",
    exitFullscreen: "Thoát fullscreen",
    copyContent: "Copy",
    pasteContent: "Paste",
    pageReload: "Reload"
  };
  const messages = {
    [CHEAT_EVENT_TYPES.LEAVE_TAB]: "Học viên rời khỏi tab thi.",
    [CHEAT_EVENT_TYPES.RETURN_TAB]: "Học viên quay lại tab thi.",
    [CHEAT_EVENT_TYPES.WINDOW_BLUR]: "Cửa sổ thi mất focus.",
    [CHEAT_EVENT_TYPES.WINDOW_FOCUS]: "Cửa sổ thi lấy lại focus.",
    [CHEAT_EVENT_TYPES.EXIT_FULLSCREEN]: "Học viên thoát chế độ toàn màn hình.",
    [CHEAT_EVENT_TYPES.COPY_CONTENT]: "Học viên copy nội dung trong trang thi.",
    [CHEAT_EVENT_TYPES.PASTE_CONTENT]: "Học viên paste nội dung vào trang thi.",
    [CHEAT_EVENT_TYPES.PAGE_RELOAD]: "Trang được tải lại trong khi bài thi chưa nộp."
  };

  let state = createEmptyState();

  function createEmptyState() {
    return {
      active: false,
      submitted: false,
      sessionId: "",
      events: [],
      counters: createEmptyCounters(),
      eventCounts: {},
      lastEventAt: {},
      hasEnteredFullscreen: false,
      pendingRestore: null
    };
  }

  function createEmptyCounters() {
    return {
      leaveTab: 0,
      windowBlur: 0,
      exitFullscreen: 0,
      copyContent: 0,
      pasteContent: 0,
      pageReload: 0
    };
  }

  function init() {
    document.addEventListener("visibilitychange", handleVisibilityChange);
    window.addEventListener("blur", () => logCheatEvent(CHEAT_EVENT_TYPES.WINDOW_BLUR));
    window.addEventListener("focus", () => logCheatEvent(CHEAT_EVENT_TYPES.WINDOW_FOCUS));
    document.addEventListener("fullscreenchange", handleFullscreenChange);
    document.addEventListener("copy", handleCopy);
    document.addEventListener("paste", handlePaste);
    window.addEventListener("beforeunload", saveAntiCheatLog);
    detectReloadedSession();
    renderAntiCheatWarning();
  }

  function start(options = {}) {
    const preserved = options.preservedState || {};
    state = {
      active: true,
      submitted: false,
      sessionId: preserved.sessionId || cryptoRandomId(),
      events: Array.isArray(preserved.events) ? preserved.events : [],
      counters: { ...createEmptyCounters(), ...(preserved.counters || {}) },
      eventCounts: preserved.eventCounts || rebuildEventCounts(preserved.events || []),
      lastEventAt: {},
      hasEnteredFullscreen: Boolean(preserved.hasEnteredFullscreen),
      pendingRestore: null
    };

    renderAntiCheatWarning();
    saveAntiCheatLog();
    requestFullscreenIfPossible();
  }

  function stop() {
    state.active = false;
    state.submitted = true;
    saveAntiCheatLog();
    localStorage.removeItem(ANTI_CHEAT_SESSION_KEY);
  }

  function log(type, detail = {}, options = {}) {
    if (!state.active && !options.allowWhenInactive) {
      return null;
    }

    const now = Date.now();
    const lastTime = state.lastEventAt[type] || 0;

    if (!options.skipDuplicateCheck && now - lastTime < DUPLICATE_EVENT_MS) {
      return null;
    }

    state.lastEventAt[type] = now;
    const counterKey = counterKeys[type];

    if (counterKey) {
      state.counters[counterKey] += 1;
    }

    state.eventCounts[type] = (state.eventCounts[type] || 0) + 1;

    const event = {
      id: cryptoRandomId(),
      type,
      message: buildEventMessage(type, detail),
      questionId: detail.questionId || null,
      timestamp: new Date().toISOString(),
      count: state.eventCounts[type]
    };

    state.events.push(event);
    renderAntiCheatWarning();
    saveAntiCheatLog();
    return event;
  }

  function buildEventMessage(type, detail) {
    const parts = [messages[type] || type];

    if (type === CHEAT_EVENT_TYPES.COPY_CONTENT && Number.isFinite(detail.textLength)) {
      parts.push(`Độ dài đoạn copy: ${detail.textLength} ký tự.`);
    }

    if (type === CHEAT_EVENT_TYPES.PASTE_CONTENT && detail.target) {
      parts.push(`Vị trí paste: ${detail.target}.`);
    }

    if (detail.note) {
      parts.push(detail.note);
    }

    return parts.join(" ");
  }

  function getSummary() {
    return {
      ...state.counters,
      totalEvents: state.events.length,
      sessionId: state.sessionId
    };
  }

  function renderWarning() {
    if (!antiCheatSummary || !antiCheatWarning) {
      return;
    }

    antiCheatSummary.innerHTML = Object.entries(labels).map(([key, label]) => `
      <div>
        <strong>${state.counters[key] || 0}</strong>
        <span>${label}</span>
      </div>
    `).join("");

    const warnings = [];

    if (state.counters.leaveTab > 3) {
      warnings.push("Bạn đã rời khỏi tab thi nhiều lần. Hành vi này sẽ được ghi nhận.");
    }

    if (state.counters.exitFullscreen > 0) {
      warnings.push("Bạn đã thoát chế độ toàn màn hình. Hành vi này sẽ được ghi nhận.");
    }

    antiCheatWarning.classList.toggle("hidden", warnings.length === 0);
    antiCheatWarning.textContent = warnings.join(" ");
  }

  function renderLog(logs = getEvents()) {
    if (!logs.length) {
      return `
        <details class="review-details anti-cheat-log" open>
          <summary><span>Nhật ký hành vi</span><small>0 sự kiện</small></summary>
          <div class="empty-state">Chưa ghi nhận hành vi bất thường nào trong phiên làm bài.</div>
        </details>
      `;
    }

    const rows = logs.map((event, index) => `
      <tr>
        <td>${index + 1}</td>
        <td>${formatDateTime(event.timestamp)}</td>
        <td>${escapeHTML(event.type)}</td>
        <td>${escapeHTML(event.message)}</td>
        <td>${escapeHTML(event.questionId || "")}</td>
      </tr>
    `).join("");

    return `
      <details class="review-details anti-cheat-log" open>
        <summary><span>Nhật ký hành vi</span><small>${logs.length} sự kiện</small></summary>
        <div class="result-table-wrap">
          <table class="result-table anti-cheat-table">
            <thead>
              <tr>
                <th>STT</th>
                <th>Thời gian</th>
                <th>Loại sự kiện</th>
                <th>Mô tả</th>
                <th>Mã câu hỏi</th>
              </tr>
            </thead>
            <tbody>${rows}</tbody>
          </table>
        </div>
      </details>
    `;
  }

  function save() {
    if (!state.sessionId) {
      return;
    }

    const payload = {
      inProgress: state.active && !state.submitted,
      submitted: state.submitted,
      sessionId: state.sessionId,
      savedAt: new Date().toISOString(),
      studentName: currentStudentName || studentNameInput.value.trim(),
      currentFileName,
      startedAt: quizStartTime ? quizStartTime.toISOString() : "",
      remainingSeconds,
      timeLimit: timeLimitInput.value || "",
      activeQuizQuestions,
      answers: collectAnswersSafely(),
      antiCheat: {
        counters: state.counters,
        events: state.events,
        eventCounts: state.eventCounts,
        hasEnteredFullscreen: state.hasEnteredFullscreen
      }
    };

    localStorage.setItem(ANTI_CHEAT_SESSION_KEY, JSON.stringify(payload));
  }

  function exportCSV(logs = getEvents()) {
    if (!logs.length) {
      showMessage("Chưa có nhật ký hành vi để xuất file.", "warning");
      return;
    }

    const rows = buildAntiCheatLogRows(logs);
    const csv = rows.map((row) => row.map(escapeCSVCell).join(",")).join("\n");
    downloadFile(`nhat-ky-hanh-vi-${Date.now()}.csv`, `\uFEFF${csv}`, "text/csv;charset=utf-8");
  }

  function detectReloadedSession() {
    const saved = readSavedSession();

    if (saved && saved.inProgress && !saved.submitted) {
      state.pendingRestore = saved;
    }
  }

  function restoreIfNeeded() {
    const saved = state.pendingRestore;

    if (!saved) {
      return false;
    }

    state.pendingRestore = null;
    const shouldRestore = window.confirm("Trang đã được tải lại trong quá trình làm bài. Bạn có muốn khôi phục bài làm đang dở không?");
    const restoredAntiCheat = saved.antiCheat || {};

    start({
      preservedState: {
        sessionId: saved.sessionId,
        events: restoredAntiCheat.events || [],
        counters: restoredAntiCheat.counters || {},
        eventCounts: restoredAntiCheat.eventCounts || {},
        hasEnteredFullscreen: restoredAntiCheat.hasEnteredFullscreen
      }
    });
    log(CHEAT_EVENT_TYPES.PAGE_RELOAD, {
      note: shouldRestore ? "Đã khôi phục bài làm sau reload." : "Học viên không khôi phục bài làm sau reload."
    }, { skipDuplicateCheck: true });

    if (!shouldRestore) {
      stop();
      return false;
    }

    restoreQuizSession(saved);
    showMessage("Trang đã được tải lại trong quá trình làm bài. Bài làm đã được khôi phục.", "warning");
    return true;
  }

  function restoreQuizSession(saved) {
    currentStudentName = saved.studentName || "";
    studentNameInput.value = currentStudentName;
    currentFileName = saved.currentFileName || "Bài làm đã khôi phục";
    quizStartTime = saved.startedAt ? new Date(saved.startedAt) : new Date();
    activeQuizQuestions = Array.isArray(saved.activeQuizQuestions) ? saved.activeQuizQuestions : [];

    if (saved.timeLimit) {
      timeLimitInput.value = saved.timeLimit;
    }

    latestResult = null;
    isSubmitting = false;
    submitQuizBtn.disabled = false;
    resultSection.classList.add("hidden");
    optionsSection.classList.add("hidden");
    quizSection.classList.remove("hidden");
    renderQuiz();
    restoreAnswers(saved.answers || {});
    renderQuizProgress();
    updateQuizProgress();
    setupTimer();

    if (Number(saved.remainingSeconds) > 0) {
      remainingSeconds = Number(saved.remainingSeconds);
      updateTimerDisplay();
    }

    quizSection.scrollIntoView({ behavior: "smooth" });
  }

  function restoreAnswers(answers) {
    Object.entries(answers).forEach(([questionId, answer]) => {
      const input = document.querySelector(`input[name="question-${questionId}"][value="${answer}"]`);

      if (input) {
        input.checked = true;
      }
    });
  }

  function handleVisibilityChange() {
    logCheatEvent(document.hidden ? CHEAT_EVENT_TYPES.LEAVE_TAB : CHEAT_EVENT_TYPES.RETURN_TAB);
  }

  function handleFullscreenChange() {
    if (!state.active) {
      return;
    }

    if (document.fullscreenElement) {
      state.hasEnteredFullscreen = true;
      saveAntiCheatLog();
      return;
    }

    if (state.hasEnteredFullscreen) {
      logCheatEvent(CHEAT_EVENT_TYPES.EXIT_FULLSCREEN);
    }
  }

  function handleCopy(event) {
    if (!state.active || !quizSection.contains(event.target)) {
      return;
    }

    const text = window.getSelection ? String(window.getSelection()) : "";
    logCheatEvent(CHEAT_EVENT_TYPES.COPY_CONTENT, {
      questionId: getQuestionIdFromEvent(event),
      textLength: text.length
    });
  }

  function handlePaste(event) {
    if (!state.active || !quizSection.contains(event.target)) {
      return;
    }

    logCheatEvent(CHEAT_EVENT_TYPES.PASTE_CONTENT, {
      questionId: getQuestionIdFromEvent(event),
      target: describePasteTarget(event.target)
    });
  }

  function requestFullscreenIfPossible() {
    if (!document.fullscreenEnabled || document.fullscreenElement || !quizSection.requestFullscreen) {
      return;
    }

    quizSection.requestFullscreen().catch(() => {
      // Trình duyệt có thể từ chối fullscreen; khi đó hệ thống vẫn tiếp tục ghi nhận các hành vi khác.
    });
  }

  function getQuestionIdFromEvent(event) {
    const target = event.target && event.target.closest ? event.target : null;
    const card = target ? target.closest(".question-card") : getSelectionQuestionCard();
    return card ? card.dataset.questionId || card.id.replace(/^quiz-question-/, "") : null;
  }

  function getSelectionQuestionCard() {
    const selection = window.getSelection ? window.getSelection() : null;
    const node = selection && selection.anchorNode ? selection.anchorNode : null;
    const element = node && node.nodeType === Node.TEXT_NODE ? node.parentElement : node;
    return element && element.closest ? element.closest(".question-card") : null;
  }

  function describePasteTarget(target) {
    if (!target) {
      return "Không xác định";
    }

    if (target.id) {
      return `#${target.id}`;
    }

    return String(target.tagName || "Không xác định").toLowerCase();
  }

  function collectAnswersSafely() {
    if (!activeQuizQuestions.length || !quizSection || quizSection.classList.contains("hidden")) {
      return {};
    }

    return collectAnswers();
  }

  function readSavedSession() {
    try {
      const raw = localStorage.getItem(ANTI_CHEAT_SESSION_KEY);
      return raw ? JSON.parse(raw) : null;
    } catch (error) {
      return null;
    }
  }

  function rebuildEventCounts(events) {
    return events.reduce((counts, event) => {
      counts[event.type] = Math.max(counts[event.type] || 0, event.count || 0);
      return counts;
    }, {});
  }

  function getEvents() {
    return [...state.events];
  }

  return {
    init,
    start,
    stop,
    log,
    getSummary,
    renderWarning,
    renderLog,
    save,
    exportCSV,
    restoreIfNeeded,
    getEvents
  };
})();

function initAntiCheatMonitor() {
  AntiCheatMonitor.init();
}

function startAntiCheatMonitor(options) {
  AntiCheatMonitor.start(options);
}

function stopAntiCheatMonitor() {
  AntiCheatMonitor.stop();
}

function logCheatEvent(type, detail, options) {
  return AntiCheatMonitor.log(type, detail, options);
}

function getAntiCheatSummary() {
  return AntiCheatMonitor.getSummary();
}

function renderAntiCheatWarning() {
  AntiCheatMonitor.renderWarning();
}

function renderAntiCheatLog(logs) {
  return AntiCheatMonitor.renderLog(logs);
}

function saveAntiCheatLog() {
  AntiCheatMonitor.save();
}

function exportAntiCheatLogCSV() {
  const logs = latestResult && Array.isArray(latestResult.antiCheatLog)
    ? latestResult.antiCheatLog
    : AntiCheatMonitor.getEvents();
  AntiCheatMonitor.exportCSV(logs);
}

fileInput.addEventListener("change", handleExamFileUpload);
demoExamBtn.addEventListener("click", () => addDemoExam(false));
startQuizBtn.addEventListener("click", startQuiz);
submitQuizBtn.addEventListener("click", () => submitQuiz(false));
clearHistoryBtn.addEventListener("click", clearHistory);
exportCsvBtn.addEventListener("click", exportResultCSV);
exportAntiCheatCsvBtn.addEventListener("click", exportAntiCheatLogCSV);
exportTxtBtn.addEventListener("click", exportResultTXT);
scrollHistoryBtn.addEventListener("click", () => {
  document.getElementById("historySection").scrollIntoView({ behavior: "smooth" });
});
copyShareLinkBtn.addEventListener("click", copyShareLink);
[shuffleQuestionsInput, shuffleAnswersInput, timeLimitInput].forEach((input) => {
  input.addEventListener("input", updateShareLink);
  input.addEventListener("change", updateShareLink);
});
resultEndpointInput.value = DEFAULT_RESULT_ENDPOINT;
localStorage.setItem(RESULT_ENDPOINT_KEY, DEFAULT_RESULT_ENDPOINT);
initAntiCheatMonitor();

if (!loadSharedExamFromURL()) {
  addDemoExam(true);
}
renderHistory();
AntiCheatMonitor.restoreIfNeeded();

function addDemoExam(isInitialLoad) {
  const existingDemo = exams.find((exam) => exam.id === DEMO_EXAM_ID);

  if (existingDemo) {
    selectExam(existingDemo.id);
    showMessage("Đã chọn lại đề thi thử có sẵn.", "info");
    return;
  }

  const demoExam = createExamFromContent("Đề thi thử trải nghiệm", DEMO_EXAM_CONTENT, DEMO_EXAM_ID);
  exams = [demoExam, ...exams];
  selectExam(demoExam.id);

  if (isInitialLoad) {
    showMessage("Đã chuẩn bị sẵn một đề thi thử để bạn trải nghiệm ngay.", "info");
  } else {
    showMessage("Đã thêm đề thi thử vào danh sách bài thi.", "info");
  }
}

function createExamFromContent(fileName, content, id = cryptoRandomId()) {
  const parsed = parseAiken(content);

  return {
    id,
    fileName,
    questions: parsed.questions,
    errors: parsed.errors,
    importedAt: new Date().toISOString()
  };
}

function loadSharedExamFromURL() {
  const params = new URLSearchParams(window.location.hash.replace(/^#/, ""));
  const examId = params.get("exam");
  const encodedQuiz = params.get("quiz");

  if (examId) {
    applyStudentMode();
    optionsSection.classList.remove("hidden");
    startQuizBtn.disabled = true;
    showMessage("Đang tải đề thi từ giảng viên...", "info");
    fetchSharedExamById(examId)
      .then((payload) => {
        importSharedExamPayload(payload);
        startQuizBtn.disabled = false;
        showMessage("Đã tải đề thi. Hãy nhập tên trước khi làm bài.", "info");
      })
      .catch(() => {
        showMessage("Không tải được đề thi. Có thể Apps Script chưa được Deploy bản mới hoặc đề chưa được lưu vào sheet DeThi.", "error");
      });
    return true;
  }

  if (!encodedQuiz) {
    return false;
  }

  try {
    const payload = decodeQuizPayload(encodedQuiz);
    importSharedExamPayload(payload);
    applyStudentMode();
    return true;
  } catch (error) {
    showMessage("Link bài thi không hợp lệ hoặc đã bị cắt ngắn. Vui lòng xin lại link từ giảng viên.", "error");
    return false;
  }
}

function importSharedExamPayload(payload) {
  if (!payload || !Array.isArray(payload.questions) || payload.questions.length === 0) {
    throw new Error("Link bài thi không có câu hỏi hợp lệ.");
  }

  const questions = payload.questions.map((question, index) => ({
    id: `shared-${index + 1}`,
    text: question.text || "",
    options: question.options || {},
    correctAnswer: question.correctAnswer || ""
  })).filter((question) => validateQuestion(question).valid);

  if (questions.length === 0) {
    throw new Error("Link bài thi không có câu hỏi hợp lệ.");
  }

  sharedQuizConfig = payload.settings || {};
  shuffleQuestionsInput.checked = Boolean(sharedQuizConfig.shuffleQuestions);
  shuffleAnswersInput.checked = Boolean(sharedQuizConfig.shuffleAnswers);
  timeLimitInput.value = sharedQuizConfig.timeLimit || "";

  const sharedExam = {
    id: "shared-exam",
    fileName: payload.fileName || "Bài thi từ giảng viên",
    questions,
    errors: [],
    importedAt: new Date().toISOString()
  };

  exams = [sharedExam];
  selectExam(sharedExam.id);
}

function fetchSharedExamById(examId) {
  return new Promise((resolve, reject) => {
    const callbackName = `receiveExam_${Date.now()}_${Math.random().toString(16).slice(2)}`;
    const script = document.createElement("script");
    const cleanup = () => {
      delete window[callbackName];
      script.remove();
    };

    window[callbackName] = (response) => {
      cleanup();

      if (response && response.ok && response.exam) {
        resolve(response.exam);
      } else {
        reject(new Error(response && response.message ? response.message : "Không tải được đề thi."));
      }
    };

    script.onerror = () => {
      cleanup();
      reject(new Error("Không tải được đề thi."));
    };
    script.src = `${DEFAULT_RESULT_ENDPOINT}?action=getExam&examId=${encodeURIComponent(examId)}&callback=${encodeURIComponent(callbackName)}`;
    document.body.appendChild(script);
  });
}

function applyStudentMode() {
  isStudentMode = true;
  document.body.classList.add("student-mode");
  document.title = "Làm bài thi trắc nghiệm";

  const optionsTitle = document.getElementById("optionsTitle");
  const quizTitle = document.getElementById("quizTitle");
  if (optionsTitle) {
    optionsTitle.textContent = "Thông tin người thi";
  }
  if (quizTitle) {
    quizTitle.textContent = "Làm bài thi";
  }

  [
    shuffleQuestionsInput.closest("label"),
    shuffleAnswersInput.closest("label"),
    timeLimitInput.closest("label"),
    resultEndpointInput.nextElementSibling
  ].forEach((element) => {
    if (element) {
      element.classList.add("student-hidden-option");
    }
  });

  optionsSection.prepend(messageBox);
  shareSection.classList.add("hidden");
  previewSection.classList.add("hidden");
  examSection.classList.add("hidden");
  document.getElementById("historySection").classList.add("hidden");
  scrollHistoryBtn.classList.add("hidden");
  startQuizBtn.textContent = "Bắt đầu làm bài";
  showMessage("Bạn đang mở link bài thi do giảng viên tạo. Hãy nhập tên trước khi làm bài.", "info");
}

function updateShareLink() {
  if (!shareQuizLink || isStudentMode) {
    return;
  }

  const exam = getSelectedExam();

  if (!exam || exam.questions.length === 0) {
    shareQuizLink.value = "";
    shareLinkWarning.textContent = "";
    return;
  }

  const payload = {
    type: "exam",
    version: 1,
    fileName: exam.fileName,
    createdAt: new Date().toISOString(),
    settings: {
      shuffleQuestions: shuffleQuestionsInput.checked,
      shuffleAnswers: shuffleAnswersInput.checked,
      timeLimit: timeLimitInput.value || ""
    },
    questions: exam.questions.map((question) => ({
      text: question.text,
      options: question.options,
      correctAnswer: question.correctAnswer
    }))
  };
  const examId = createExamId(payload);
  payload.examId = examId;
  latestSharePayload = payload;
  const baseURL = window.location.href.split("#")[0];
  const link = `${baseURL}#exam=${encodeURIComponent(examId)}`;
  shareQuizLink.value = link;
  shareLinkStatus.classList.add("hidden");
  scheduleSaveExamForSharing(payload);

  const warnings = [];
  if (window.location.protocol === "file:") {
    warnings.push("Bạn đang mở file trên máy. Muốn học viên dùng được link, hãy đưa website lên hosting trước.");
  }
  if (lastSavedExamId !== examId) {
    warnings.push("Đang lưu đề để học viên mở được link ngắn.");
  }
  shareLinkWarning.textContent = warnings.join(" ");
}

function scheduleSaveExamForSharing(payload) {
  window.clearTimeout(saveExamTimerId);
  saveExamTimerId = window.setTimeout(() => {
    saveExamForSharing(payload);
  }, 250);
}

async function saveExamForSharing(payload) {
  try {
    if (shareLinkWarning) {
      shareLinkWarning.textContent = "Đang lưu đề lên Google Sheet để tạo link ngắn...";
    }

    await fetch(DEFAULT_RESULT_ENDPOINT, {
      method: "POST",
      mode: "no-cors",
      headers: {
        "Content-Type": "text/plain;charset=utf-8"
      },
      body: JSON.stringify(payload)
    });

    await wait(900);
    await fetchSharedExamById(payload.examId);

    lastSavedExamId = payload.examId;
    if (shareLinkWarning) {
      shareLinkWarning.textContent = window.location.protocol === "file:"
        ? "Đã lưu đề. Link ngắn chỉ dùng được cho học viên sau khi website được đưa lên hosting."
        : "Đã lưu đề. Học viên có thể mở link ngắn này để thi.";
    }
    return true;
  } catch (error) {
    if (shareLinkWarning) {
      shareLinkWarning.textContent = "Chưa lưu được đề hoặc Apps Script chưa triển khai bản mới. Vui lòng cập nhật Apps Script rồi Deploy > New version.";
    }
    return false;
  }
}

async function copyShareLink() {
  updateShareLink();

  if (!shareQuizLink.value) {
    showMessage("Chưa có bài thi hợp lệ để tạo link.", "warning");
    return;
  }

  try {
    if (latestSharePayload) {
      window.clearTimeout(saveExamTimerId);
      const saved = await saveExamForSharing(latestSharePayload);

      if (!saved) {
        showMessage("Chưa thể sao chép link vì đề chưa lưu thành công lên Google Sheet.", "warning");
        return;
      }
    }

    if (navigator.clipboard && window.isSecureContext) {
      await navigator.clipboard.writeText(shareQuizLink.value);
    } else {
      shareQuizLink.focus();
      shareQuizLink.select();
      document.execCommand("copy");
    }

    shareLinkStatus.classList.remove("hidden");
    showMessage("Đã sao chép link thi cho học viên.", "info");
  } catch (error) {
    shareQuizLink.focus();
    shareQuizLink.select();
    showMessage("Không sao chép tự động được. Bạn có thể bôi đen và sao chép link trong ô.", "warning");
  }
}

function wait(milliseconds) {
  return new Promise((resolve) => window.setTimeout(resolve, milliseconds));
}

async function handleExamFileUpload(event) {
  const files = Array.from(event.target.files || []);

  if (files.length === 0) {
    return;
  }

  const txtFiles = files.filter((file) => file.name.toLowerCase().endsWith(".txt"));

  if (txtFiles.length === 0) {
    showMessage("Chỉ chấp nhận file .txt. Vui lòng chọn lại file.", "error");
    fileInput.value = "";
    return;
  }

  try {
    const newExams = await Promise.all(txtFiles.map(async (file) => {
      const content = await readTextFile(file);
      return createExamFromContent(file.name, content);
    }));

    exams = [...exams, ...newExams];
    selectExam(newExams[newExams.length - 1].id);
    fileInput.value = "";

    const invalidCount = files.length - txtFiles.length;
    const totalValidQuestions = newExams.reduce((sum, exam) => sum + exam.questions.length, 0);
    const totalErrors = newExams.reduce((sum, exam) => sum + exam.errors.length, 0);
    const invalidNote = invalidCount > 0 ? ` Bỏ qua ${invalidCount} file không phải .txt.` : "";

    if (totalValidQuestions === 0) {
      showMessage(`Đã tạo ${newExams.length} bài thi nhưng chưa tìm thấy câu hỏi hợp lệ.${invalidNote}`, "error");
    } else if (totalErrors > 0 || invalidCount > 0) {
      showMessage(`Đã tạo ${newExams.length} bài thi, đọc được ${totalValidQuestions} câu hợp lệ và phát hiện ${totalErrors} cụm lỗi.${invalidNote}`, "warning");
    } else {
      showMessage(`Đã tạo ${newExams.length} bài thi từ file .txt.`, "info");
    }
  } catch (error) {
    showMessage("Không đọc được file. Vui lòng thử lại.", "error");
  }
}

function readTextFile(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(String(reader.result || ""));
    reader.onerror = () => reject(reader.error);
    reader.readAsText(file, "UTF-8");
  });
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

function getSelectedExam() {
  return exams.find((exam) => exam.id === selectedExamId) || null;
}

function selectExam(examId) {
  const exam = exams.find((item) => item.id === examId);

  if (!exam) {
    return;
  }

  selectedExamId = exam.id;
  importedQuestions = exam.questions;
  importErrors = exam.errors;
  currentFileName = exam.fileName;
  activeQuizQuestions = [];
  latestResult = null;
  fileStatus.textContent = exam.fileName;

  renderExamList();
  renderSelectedExamPreview();
}

function removeExam(examId) {
  const wasSelected = selectedExamId === examId;
  exams = exams.filter((exam) => exam.id !== examId);

  if (wasSelected && exams.length > 0) {
    selectExam(exams[0].id);
    return;
  }

  if (wasSelected) {
    clearSelectedExam();
  }

  renderExamList();
}

function clearSelectedExam() {
  selectedExamId = "";
  importedQuestions = [];
  importErrors = [];
  currentFileName = "";
  activeQuizQuestions = [];
  latestResult = null;
  fileStatus.textContent = exams.length > 0 ? `${exams.length} bài thi` : "Chưa có file";
  previewSection.classList.add("hidden");
  optionsSection.classList.add("hidden");
  shareSection.classList.add("hidden");
  quizSection.classList.add("hidden");
  resultSection.classList.add("hidden");
  stopTimer();
}

function renderExamList() {
  examSection.classList.toggle("hidden", exams.length === 0);
  examList.innerHTML = "";

  exams.forEach((exam, index) => {
    const card = document.createElement("article");
    card.className = `exam-card ${exam.id === selectedExamId ? "is-selected" : ""}`;
    card.innerHTML = `
      <div>
        <p class="eyebrow">Bài thi ${index + 1}</p>
        <h3>${escapeHTML(exam.fileName)}</h3>
        <div class="question-meta">
          ${exam.id === DEMO_EXAM_ID ? '<span class="tag">Đề mẫu</span>' : ""}
          <span class="tag correct">${exam.questions.length} câu hợp lệ</span>
          <span class="tag ${exam.errors.length > 0 ? "incorrect" : ""}">${exam.errors.length} lỗi</span>
          <span class="tag">${formatDateTime(exam.importedAt)}</span>
        </div>
      </div>
      <div class="exam-actions">
        <button class="ghost-button" type="button" data-action="select">Chọn</button>
        <button class="ghost-button danger-text" type="button" data-action="remove">Xóa</button>
      </div>
    `;

    card.querySelector('[data-action="select"]').addEventListener("click", () => selectExam(exam.id));
    card.querySelector('[data-action="remove"]').addEventListener("click", () => removeExam(exam.id));
    examList.appendChild(card);
  });
}

function renderSelectedExamPreview() {
  const exam = getSelectedExam();

  if (!exam) {
    clearSelectedExam();
    return;
  }

  previewSection.classList.remove("hidden");
  validCount.textContent = exam.questions.length;
  errorCount.textContent = exam.errors.length;
  questionPreviewList.innerHTML = "";

  const overview = document.createElement("article");
  overview.className = "question-card";
  overview.innerHTML = `
    <h3>${escapeHTML(exam.fileName)}</h3>
    <p class="muted-text">File này đã được tạo thành một bài thi riêng. Bấm bắt đầu làm bài để dùng toàn bộ câu hỏi hợp lệ trong bài thi này.</p>
    <div class="question-meta">
      <span class="tag correct">${exam.questions.length} câu hợp lệ</span>
      <span class="tag ${exam.errors.length > 0 ? "incorrect" : ""}">${exam.errors.length} lỗi định dạng</span>
    </div>
  `;
  questionPreviewList.appendChild(overview);

  if (exam.questions.length > 0) {
    const details = document.createElement("details");
    details.className = "question-preview-details";
    details.innerHTML = `<summary>Xem danh sách câu hỏi trong bài thi</summary>`;
    const detailsList = document.createElement("div");
    detailsList.className = "question-list";

    exam.questions.forEach((question, index) => {
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
      detailsList.appendChild(card);
    });

    details.appendChild(detailsList);
    questionPreviewList.appendChild(details);
  }

  renderImportErrors();
  optionsSection.classList.toggle("hidden", exam.questions.length === 0);
  shareSection.classList.toggle("hidden", isStudentMode || exam.questions.length === 0);
  updateShareLink();
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

  const studentName = studentNameInput.value.trim().replace(/\s+/g, " ");

  if (!studentName) {
    showMessage("Vui lòng nhập tên người thi trước khi bắt đầu làm bài.", "error");
    studentNameInput.focus();
    return;
  }

  currentStudentName = studentName;
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
  isSubmitting = false;
  submitQuizBtn.disabled = false;
  resultSection.classList.add("hidden");
  quizSection.classList.remove("hidden");
  startAntiCheatMonitor();
  renderQuiz();
  renderQuizProgress();
  updateQuizProgress();
  setupTimer();
  showMessage("Trong quá trình làm bài, hệ thống sẽ ghi nhận các hành vi như rời khỏi tab, thoát toàn màn hình, copy, paste hoặc tải lại trang. Các dữ liệu này chỉ dùng để giáo viên xem xét tính nghiêm túc của bài thi.", "info");
  quizSection.scrollIntoView({ behavior: "smooth" });
}

function renderQuiz() {
  quizList.innerHTML = "";

  activeQuizQuestions.forEach((question, questionIndex) => {
    const card = document.createElement("article");
    card.className = "question-card";
    card.id = `quiz-question-${question.id}`;
    card.dataset.questionId = question.id;
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
    card.querySelectorAll("input[type='radio']").forEach((input) => {
      input.addEventListener("change", updateQuizProgress);
    });
    quizList.appendChild(card);
  });
}

function renderQuizProgress() {
  quizProgressBody.innerHTML = "";

  activeQuizQuestions.forEach((question, index) => {
    const button = document.createElement("button");
    button.className = "progress-number is-unanswered";
    button.type = "button";
    button.dataset.questionId = question.id;
    button.textContent = index + 1;
    button.setAttribute("aria-label", `Tới câu ${index + 1}, chưa trả lời`);
    button.title = `Câu ${index + 1}: chưa trả lời`;

    button.addEventListener("click", () => {
      document.getElementById(`quiz-question-${question.id}`).scrollIntoView({ behavior: "smooth", block: "start" });
    });

    quizProgressBody.appendChild(button);
  });
}

function updateQuizProgress() {
  const answers = collectAnswers();
  const answeredTotal = activeQuizQuestions.filter((question) => Boolean(answers[question.id])).length;

  answeredCount.textContent = answeredTotal;
  unansweredCount.textContent = Math.max(0, activeQuizQuestions.length - answeredTotal);

  activeQuizQuestions.forEach((question) => {
    const button = quizProgressBody.querySelector(`button[data-question-id="${question.id}"]`);
    const selectedAnswer = answers[question.id];

    if (!button) {
      return;
    }

    const questionIndex = activeQuizQuestions.indexOf(question) + 1;
    button.classList.toggle("is-answered", Boolean(selectedAnswer));
    button.classList.toggle("is-unanswered", !selectedAnswer);
    button.setAttribute(
      "aria-label",
      selectedAnswer ? `Tới câu ${questionIndex}, đã chọn ${selectedAnswer}` : `Tới câu ${questionIndex}, chưa trả lời`
    );
    button.title = selectedAnswer ? `Câu ${questionIndex}: đã chọn ${selectedAnswer}` : `Câu ${questionIndex}: chưa trả lời`;
  });
  saveAntiCheatLog();
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

async function submitQuiz(autoSubmit) {
  if (activeQuizQuestions.length === 0 || isSubmitting) {
    return;
  }

  isSubmitting = true;
  submitQuizBtn.disabled = true;
  const answers = collectAnswers();
  const unansweredCount = activeQuizQuestions.filter((question) => !answers[question.id]).length;

  if (!autoSubmit && unansweredCount > 0) {
    const confirmed = window.confirm(`Bạn còn ${unansweredCount} câu chưa trả lời. Bạn có chắc muốn nộp bài không?`);
    if (!confirmed) {
      isSubmitting = false;
      submitQuizBtn.disabled = false;
      return;
    }
  }

  stopTimer();
  stopAntiCheatMonitor();
  latestResult = calculateScore(answers);
  renderResult();
  showMessage(autoSubmit ? "Đã hết giờ, hệ thống đã tự động nộp bài." : "Đã nộp bài và chấm điểm.", "info");
  await sendResultToWeb(latestResult);
  saveHistory(latestResult);
  renderResult();
  renderHistory();
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
  const antiCheatSummary = getAntiCheatSummary();
  const antiCheatLog = AntiCheatMonitor.getEvents();

  return {
    studentName: currentStudentName || studentNameInput.value.trim() || "Chưa nhập tên",
    fileName: currentFileName || "Không rõ tên file",
    submittedAt: new Date().toISOString(),
    startedAt: quizStartTime ? quizStartTime.toISOString() : new Date().toISOString(),
    total,
    correct,
    wrong,
    score,
    percent,
    details,
    antiCheatSummary,
    antiCheatLog
  };
}

async function sendResultToWeb(result) {
  const endpoint = resultEndpointInput.value.trim();

  if (!endpoint) {
    result.uploadStatus = "Chưa cấu hình URL nhận kết quả";
    return;
  }

  try {
    localStorage.setItem(RESULT_ENDPOINT_KEY, endpoint);

    await fetch(endpoint, {
      method: "POST",
      mode: "no-cors",
      headers: {
        "Content-Type": "text/plain;charset=utf-8"
      },
      body: JSON.stringify({
        studentName: result.studentName,
        fileName: result.fileName,
        submittedAt: result.submittedAt,
        startedAt: result.startedAt,
        total: result.total,
        correct: result.correct,
        wrong: result.wrong,
        score: result.score,
        percent: result.percent,
        details: result.details,
        antiCheatSummary: result.antiCheatSummary,
        antiCheatLog: result.antiCheatLog
      })
    });

    result.uploadStatus = "Đã gửi yêu cầu lưu kết quả lên web";
    showMessage("Đã nộp bài, chấm điểm và gửi kết quả lên web.", "info");
  } catch (error) {
    result.uploadStatus = "Chưa gửi được kết quả lên web";
    showMessage("Đã nộp bài và lưu lịch sử trên máy, nhưng chưa gửi được kết quả lên web. Vui lòng kiểm tra URL hoặc kết nối mạng.", "warning");
  }
}

function renderResult() {
  if (!latestResult) {
    return;
  }

  resultSection.classList.remove("hidden");
  const antiCheatSummaryData = latestResult.antiCheatSummary || {};
  scoreSummary.innerHTML = `
    <div class="text-value"><span>${escapeHTML(latestResult.studentName)}</span><small>Người thi</small></div>
    <div><span>${latestResult.total}</span><small>Tổng số câu</small></div>
    <div><span>${latestResult.correct}</span><small>Số câu đúng</small></div>
    <div><span>${latestResult.wrong}</span><small>Số câu sai</small></div>
    <div><span>${latestResult.score}</span><small>Điểm thang 10</small></div>
    <div><span>${latestResult.percent}%</span><small>Tỷ lệ đúng</small></div>
    <div><span>${antiCheatSummaryData.totalEvents || 0}</span><small>Sự kiện hành vi</small></div>
    <div class="text-value"><span>${escapeHTML(latestResult.uploadStatus || "Chưa gửi")}</span><small>Trạng thái gửi web</small></div>
  `;

  renderCompactResultReview();
}

function renderCompactResultReview() {
  const resultRows = latestResult.details.map((detail, index) => `
    <tr class="${detail.isCorrect ? "is-correct" : "is-incorrect"}">
      <td>${index + 1}</td>
      <td>
        <strong>${escapeHTML(detail.questionText)}</strong>
        <div class="answer-review">
          ${OPTION_LABELS.map((label) => {
            const isCorrectAnswer = label === detail.correctAnswer;
            const isSelectedWrong = label === detail.selectedAnswer && !detail.isCorrect;
            return `
              <span class="${isCorrectAnswer ? "is-correct-answer" : ""} ${isSelectedWrong ? "is-selected-wrong" : ""}">
                ${label}. ${escapeHTML(detail.options[label])}
              </span>
            `;
          }).join("")}
        </div>
      </td>
      <td>${detail.selectedAnswer || "Chưa chọn"}</td>
      <td>${detail.correctAnswer}</td>
      <td><span class="tag ${detail.isCorrect ? "correct" : "incorrect"}">${detail.isCorrect ? "Đúng" : "Sai"}</span></td>
    </tr>
  `).join("");

  resultList.innerHTML = `
    <details class="review-details" open>
      <summary>
        <span>Bảng kết quả và xem lại bài làm</span>
        <small>${latestResult.details.length} câu</small>
      </summary>
      <div class="result-table-wrap">
        <table class="result-table">
          <thead>
            <tr>
              <th>Câu</th>
              <th>Nội dung xem lại</th>
              <th>Đã chọn</th>
              <th>Đáp án</th>
              <th>Kết quả</th>
            </tr>
          </thead>
          <tbody>${resultRows}</tbody>
        </table>
      </div>
    </details>
    ${renderAntiCheatLog(latestResult.antiCheatLog || [])}
  `;
}

function saveHistory(result) {
  const history = getHistory();
  const item = {
    submittedAt: result.submittedAt,
    studentName: result.studentName,
    fileName: result.fileName,
    total: result.total,
    correct: result.correct,
    score: result.score,
    uploadStatus: result.uploadStatus || ""
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
      <strong>${escapeHTML(item.studentName || "Chưa có tên")}</strong>
      <strong>${escapeHTML(item.fileName)}</strong>
      <span>${formatDateTime(item.submittedAt)}</span>
      <span>Tổng: ${item.total}</span>
      <span>Đúng: ${item.correct}</span>
      <span>Điểm: ${item.score}</span>
      <span>${escapeHTML(item.uploadStatus || "Chưa có trạng thái gửi web")}</span>
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
    ["Người thi", latestResult.studentName],
    ["Tên file đề", latestResult.fileName],
    ["Ngày giờ làm bài", formatDateTime(latestResult.submittedAt)],
    ["Tổng số câu", latestResult.total],
    ["Số câu đúng", latestResult.correct],
    ["Số câu sai", latestResult.wrong],
    ["Điểm", latestResult.score],
    ["Trạng thái gửi web", latestResult.uploadStatus || "Chưa gửi"],
    ["Sự kiện hành vi", latestResult.antiCheatSummary ? latestResult.antiCheatSummary.totalEvents || 0 : 0],
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

  const antiCheatRows = buildAntiCheatLogRows(latestResult.antiCheatLog || []);

  if (antiCheatRows.length > 1) {
    rows.push([]);
    rows.push(...antiCheatRows);
  }

  const csv = rows.map((row) => row.map(escapeCSVCell).join(",")).join("\n");
  downloadFile(`ket-qua-${Date.now()}.csv`, `\uFEFF${csv}`, "text/csv;charset=utf-8");
}

function exportResultTXT() {
  if (!latestResult) {
    showMessage("Chưa có kết quả để xuất file.", "warning");
    return;
  }

  const lines = [
    `Người thi: ${latestResult.studentName}`,
    `Tên file đề: ${latestResult.fileName}`,
    `Ngày giờ làm bài: ${formatDateTime(latestResult.submittedAt)}`,
    `Tổng số câu: ${latestResult.total}`,
    `Số câu đúng: ${latestResult.correct}`,
    `Số câu sai: ${latestResult.wrong}`,
    `Điểm: ${latestResult.score}`,
    `Tỷ lệ: ${latestResult.percent}%`,
    `Trạng thái gửi web: ${latestResult.uploadStatus || "Chưa gửi"}`,
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

function buildAntiCheatLogRows(logs) {
  const rows = [["STT", "Thời gian", "Loại sự kiện", "Mô tả", "Mã câu hỏi", "Số lần"]];

  logs.forEach((event, index) => {
    rows.push([
      index + 1,
      formatDateTime(event.timestamp),
      event.type,
      event.message,
      event.questionId || "",
      event.count || ""
    ]);
  });

  return rows;
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

function encodeQuizPayload(payload) {
  const bytes = new TextEncoder().encode(JSON.stringify(payload));
  let binary = "";

  for (let index = 0; index < bytes.length; index += 0x8000) {
    binary += String.fromCharCode(...bytes.subarray(index, index + 0x8000));
  }

  return btoa(binary)
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/g, "");
}

function decodeQuizPayload(encodedPayload) {
  const base64 = encodedPayload
    .replace(/-/g, "+")
    .replace(/_/g, "/")
    .padEnd(Math.ceil(encodedPayload.length / 4) * 4, "=");
  const binary = atob(base64);
  const bytes = new Uint8Array(binary.length);

  for (let index = 0; index < binary.length; index += 1) {
    bytes[index] = binary.charCodeAt(index);
  }

  return JSON.parse(new TextDecoder().decode(bytes));
}

function createExamId(payload) {
  const source = JSON.stringify({
    fileName: payload.fileName,
    settings: payload.settings,
    questions: payload.questions
  });

  return `de-${hashString(source)}`;
}

function hashString(value) {
  let hash = 0x811c9dc5;

  for (let index = 0; index < value.length; index += 1) {
    hash ^= value.charCodeAt(index);
    hash = Math.imul(hash, 0x01000193);
  }

  return (hash >>> 0).toString(36);
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
