# Website thi trắc nghiệm từ file Aiken Moodle

Website này chạy hoàn toàn trên trình duyệt bằng HTML, CSS và JavaScript thuần. File câu hỏi không được gửi lên server, không cần đăng nhập, không cần database và có thể dùng offline sau khi mở trang.

## Cách mở website

1. Mở file `index.html` bằng trình duyệt Chrome, Edge hoặc Firefox.
2. Không cần cài đặt thêm thư viện.
3. Có thể dùng thử ngay với file `sample-aiken.txt`.

## Cách chuẩn bị file Aiken

Mỗi câu hỏi gồm nội dung câu hỏi, 4 lựa chọn A/B/C/D và dòng đáp án đúng.

Ví dụ dùng dấu chấm:

```txt
Thủ đô của Việt Nam là?
A. Hà Nội
B. Đà Nẵng
C. TP. Hồ Chí Minh
D. Cần Thơ
ANSWER: A
```

Ví dụ dùng dấu ngoặc:

```txt
Thủ đô của Việt Nam là?
A) Hà Nội
B) Đà Nẵng
C) TP. Hồ Chí Minh
D) Cần Thơ
ANSWER: A
```

## Cách upload file

1. Bấm vào khu vực chọn file trên trang.
2. Chọn file `.txt` định dạng Aiken.
3. Trang sẽ tự đọc file bằng FileReader và hiển thị số câu hợp lệ, số câu lỗi.

## Cách làm bài

1. Sau khi xem trước câu hỏi, chọn tùy chọn bài thi nếu cần:
   - Xáo trộn câu hỏi.
   - Xáo trộn đáp án.
   - Nhập thời gian làm bài theo phút.
2. Bấm **Bắt đầu làm bài**.
3. Chọn đáp án bằng radio button.
4. Bấm **Nộp bài** khi hoàn thành.

Nếu còn câu chưa trả lời, website sẽ hỏi xác nhận trước khi nộp. Nếu có thời gian làm bài, hệ thống tự nộp khi hết giờ.

## Cách xem điểm

Sau khi nộp bài, trang hiển thị:

- Tổng số câu.
- Số câu đúng.
- Số câu sai.
- Điểm theo thang 10.
- Tỷ lệ phần trăm.
- Chi tiết từng câu, đáp án đã chọn và đáp án đúng.

Câu đúng được đánh dấu màu xanh. Câu sai được đánh dấu màu đỏ.

## Cách xuất kết quả

Sau khi có kết quả, bấm:

- **Xuất CSV** để tải file bảng dữ liệu.
- **Xuất TXT** để tải file văn bản dễ đọc.

Nội dung xuất gồm tên file đề, ngày giờ làm bài, điểm và chi tiết từng câu.

## Theo dõi hành vi bất thường

Khi học viên bắt đầu làm bài, website ghi nhận một số tín hiệu có thể cần giáo viên xem xét:

- Rời khỏi tab thi và quay lại tab.
- Chuyển sang cửa sổ khác hoặc quay lại cửa sổ thi.
- Thoát chế độ toàn màn hình.
- Copy hoặc paste trong trang thi.
- Tải lại trang khi bài thi chưa nộp.

Các dữ liệu này chỉ là công cụ hỗ trợ giáo viên đánh giá tính nghiêm túc của bài thi, không phải bằng chứng tuyệt đối và không tự động kết luận học viên gian lận. Hệ thống không lưu nội dung copy hoặc paste, chỉ lưu thời gian, loại sự kiện, mô tả ngắn, số lần và mã câu hỏi nếu xác định được.

Trong màn hình làm bài, học viên sẽ thấy bảng đếm nhỏ cho các hành vi trên. Nếu rời tab nhiều lần hoặc thoát toàn màn hình, trang sẽ hiển thị cảnh báo để học viên biết hành vi đã được ghi nhận.

Sau khi nộp bài, phần kết quả có mục **Nhật ký hành vi**. Giáo viên có thể xem STT, thời gian, loại sự kiện, mô tả và mã câu hỏi liên quan. Bấm **Xuất nhật ký CSV** để tải riêng log hành vi, hoặc bấm **Xuất CSV** để tải kết quả kèm cả nhật ký.

## Lịch sử làm bài

Kết quả được lưu cục bộ trong `localStorage` của trình duyệt. Mỗi kết quả gồm:

- Thời gian làm bài.
- Tên file đề.
- Tổng số câu.
- Số câu đúng.
- Điểm.

Bấm **Xóa lịch sử** để xóa toàn bộ lịch sử trên trình duyệt hiện tại.

## Các lỗi định dạng thường gặp

- File không phải `.txt`.
- Thiếu dòng `ANSWER: A`, `ANSWER: B`, `ANSWER: C` hoặc `ANSWER: D`.
- Thiếu một trong các lựa chọn A, B, C, D.
- Viết lựa chọn không đúng mẫu, ví dụ `A Hà Nội` thay vì `A. Hà Nội` hoặc `A) Hà Nội`.
- Dòng đáp án đúng không nằm trong A/B/C/D.
- Câu hỏi để trống.

Khi gặp lỗi, website vẫn tiếp tục đọc các câu hợp lệ và đưa câu lỗi vào danh sách để giáo viên kiểm tra.
