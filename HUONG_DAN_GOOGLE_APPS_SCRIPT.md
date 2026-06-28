# Hướng dẫn sửa lỗi chưa hiện kết quả trên Google Sheet

Trong ảnh bạn gửi, Apps Script đang là một dự án độc lập. Vì vậy mã cần biết chính xác phải ghi vào Google Sheet nào.

## 1. Lấy ID Google Sheet

Mở Google Sheet dùng để nhận kết quả. Link thường có dạng:

```text
https://docs.google.com/spreadsheets/d/1AbC...xyz/edit
```

Phần ID là đoạn nằm giữa `/d/` và `/edit`, ví dụ:

```text
1AbC...xyz
```

## 2. Dán ID vào Apps Script

Trong Apps Script, sửa dòng đầu tiên:

```javascript
const SPREADSHEET_ID = "";
```

Thành:

```javascript
const SPREADSHEET_ID = "DAN_ID_GOOGLE_SHEET_CUA_BAN_VAO_DAY";
```

Sau đó bấm `Save`.

## 3. Chạy thử ghi vào Sheet

1. Ở thanh chọn hàm, chọn `testGhiThu`.
2. Bấm `Run` hoặc `Chạy`.
3. Cấp quyền cho Apps Script nếu Google hỏi.
4. Mở Google Sheet và kiểm tra 2 trang:
   - `KetQuaTongHop`
   - `ChiTietCauHoi`

Nếu thấy dòng `Hoc vien test`, nghĩa là Apps Script đã ghi được vào Sheet.

Lưu ý: bản mới có chức năng gửi kết quả về email học viên, nên lần chạy/triển khai đầu tiên Google có thể hỏi thêm quyền gửi email bằng tài khoản của bạn. Cần cấp quyền này thì `MailApp.sendEmail` mới hoạt động.

## 4. Triển khai lại Web App

Sau khi sửa mã, cần triển khai phiên bản mới. Nếu không làm bước này, link `/exec` vẫn chạy mã cũ.

1. Bấm `Triển khai` hoặc `Deploy`.
2. Chọn `Quản lý phiên bản triển khai` hoặc `Manage deployments`.
3. Bấm biểu tượng chỉnh sửa deployment đang dùng.
4. Ở phần `Version`, chọn `New version`.
5. Bấm `Deploy`.

Thiết lập Web App nên là:

- `Execute as`: `Me`
- `Who has access`: `Anyone`

## 5. Kiểm tra link Web App

Mở link Web App trên trình duyệt:

```text
https://script.google.com/macros/s/AKfycbzrOvHXakaXWSbsOQx1_4oryPLfgL5X-SaUJXUlAHYuhBsMKzWQsqc2AnzoqxQCDxBVXQ/exec
```

Nếu cấu hình đúng, trang sẽ trả về nội dung có:

```json
{"ok":true}
```

## 6. Thử lại từ website thi

Mở website thi, nhập tên người thi, làm bài và nộp bài. Kết quả sẽ ghi vào Google Sheet đã cấu hình trong `SPREADSHEET_ID`.

Bản mới yêu cầu nhập thêm email trước khi bắt đầu làm bài. Khi nộp bài, Google Sheet sẽ có thêm cột `Email`, đồng thời Apps Script sẽ gửi tóm tắt kết quả và chi tiết đúng/sai về email đó.

## 7. Link ngắn cho học viên

Bản mới của Apps Script còn tạo thêm sheet `DeThi`. Sheet này dùng để lưu đề thi khi giảng viên bấm tạo link.

Sau khi cập nhật mã Apps Script mới, bắt buộc phải triển khai lại:

`Deploy` > `Manage deployments` > chỉnh sửa deployment đang dùng > `New version` > `Deploy`.

Nếu chưa triển khai `New version`, website vẫn chạy Apps Script cũ và link ngắn `#exam=...` sẽ không tải được đề.

Khi tạo link trên website, hãy chờ dòng báo:

`Đã lưu đề. Học viên có thể mở link ngắn này để thi.`

Nếu học viên mở link mà thấy lỗi không tải được đề, hãy kiểm tra Google Sheet đã có sheet `DeThi` và Apps Script đã deploy `New version` chưa.
