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
https://script.google.com/macros/s/AKfycbwKOLUE_b9qy7plLVKtdYJJgZNArROm7LFe_2nWJTVtNyzPnnfWd-vAFn2Sqh6U543aYg/exec
```

Nếu cấu hình đúng, trang sẽ trả về nội dung có:

```json
{"ok":true}
```

## 6. Thử lại từ website thi

Mở website thi, nhập tên người thi, làm bài và nộp bài. Kết quả sẽ ghi vào Google Sheet đã cấu hình trong `SPREADSHEET_ID`.
