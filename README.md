# Báo cáo bài tập lớn môn Công Nghệ Phần Mềm: Game Find-Path
## 1. Về cách chơi Game
[Link game](https://kooyooman.github.io/Findpath/)
### 1.1. Màn hình chính
![Màn hình bắt đầu](https://i.ibb.co/Ph1BRYj/Untitled.png)

* Màn hình chính có 4 chức năng
  * P - Play: Để chơi game
  * A - Alter Map: Để thay đổi trò chơi
  * T - Tutorial: Hướng dẫn chơi
  * H - History: Lịch sử, điểm cao nhất
  
### 1.2. Chơi game
![Màn hình chơi game](https://i.ibb.co/G5dd4yj/Untitled.png)

Người chơi chọn các số sao cho từ số 1 cột trái cùng sang số 20 bên phải cùng sao cho các ô chọn liền cạnh với ô chọn trước đó. Mỗi lần chọn đúng được 100 điểm. Quay lại bằng nút **back** bị trừ 100 điểm. Chọn sai trừ 50 điểm. Điểm tối thiểu là 0. Người chơi có thể chơi lại bằng nút **restart** hoặc thoát bằng nút **quit**.

Khi hoàn thành trò chơi con thỏ sẽ nhảy từ điểm bắt đầu đến chỗ cà rốt và có 2 màn hình kết thúc xuất hiện.

![Hình con thỏ nhảy](https://i.ibb.co/N3HdxwS/Untitled.png)

![Hình con thỏ ăn cà rốt](https://i.ibb.co/gVff1dN/Untitled.png)

![Màn hình GameOver](https://i.ibb.co/42t8nTX/Untitled.png)

### 1.3. Thay đổi dữ liệu trong game
![Màn hình thay đổi dữ liệu trong Game](https://i.ibb.co/R7JQp3L/Screenshot-from-2020-07-03-20-06-32.png)

### 1.3.1. Thay đổi dữ liệu Letter

![Màn hình chọn từ khóa](https://i.ibb.co/hcy9HCZ/Screenshot-from-2020-07-03-20-09-19.png)

Người chơi chọn từ khóa muốn chơi
Lưu ý từ khóa không chứa dấu cách ở giữa và chỉ chứa các chứ latin.

![Màn hình thay đổi dữ liệu trong Game theo Letter](https://i.ibb.co/QD1Tqff/Screenshot-from-2020-07-03-20-18-28.png)

Người chơi nhập các chữ cái vào các ô. Phầm mềm đã cung cấp sẵn một đường đi đúng. Bất cứ khi nào người chơi muốn xóa đi tất cả các ô thì nhấn nút **Clear**. Dữ liệu cần đảm bảo chỉ có duy nhất 1 chữ cái latin được điền vào mỗi ô và **chỉ** có một số **chữ cái đầu tiên** ở cột đầu tiên và **chỉ** một số **chữ cái cuối cùng** ở cột cuối cùng (để thuận lời cho việc đặt vị trí thỏ và cà rốt). Phần mềm sẽ kiểm tra có đường đi phù hợp hay không và có một thông báo lỗi nếu bất cứ một điều kiện nào không được đảm bảo. Dữ liệu sẽ random các chữ cái vào các ô không được điền số khi nhấn **Confirm** khi chưa điền đầy đủ. Khi đã điền đầy đủ người chơi nhấn nút **Confirm** để xác nhận. Trong quá trình, người chơi có thể nhấn nút **Back** để quay lại.

### 1.3.2. Thay đổi dữ liệu Number

![Màn hình thay đổi dữ liệu trong Game theo Number](https://i.ibb.co/5RnnMTH/Screenshot-from-2020-07-03-20-19-24.png)

Người chơi nhập số vào các ô. Phầm mềm đã cung cấp sẵn một đường đi đúng. Bất cứ khi nào người chơi muốn xóa đi tất cả các ô thì nhấn nút **Clear**. Dữ liệu cần đảm bảo các số được điền phải nằm trong khoảng từ 1 đến 20 và **chỉ** có một số **1** ở cột đầu tiên và **chỉ** một số **20** ở cột cuối cùng (để thuận lời cho việc đặt vị trí thỏ và cà rốt). Phần mềm sẽ kiểm tra có đường đi phù hợp hay không và có một thông báo lỗi nếu bất cứ một điều kiện nào không được đảm bảo. Dữ liệu sẽ random các số từ 2 đến 19 vào các ô không được điền số khi nhấn **Confirm** khi chưa điền đầy đủ. Khi đã điền đầy đủ người chơi nhấn nút **Confirm** để xác nhận. Trong quá trình, người chơi có thể nhấn nút **Back** để quay lại.

## 2. Về mã nguồn game

## 2.1. Về công nghệ sử dụng
* Reactjs
* HTML, CSS, JS

## 2.2. Về cấu trúc tệp tin
* Thư mục Component chỉ các phần con chính tạo nên chương trình
  * Ending: Màn hình kết thúc
  * Game: Màn hình chơi game
  * Resourses: Về thư mục âm thanh, ảnh, gif, hàm kiểm tra dữ liệu.
  * Start: Màn hình bắt đầu
  * VolumeSlider: Thanh điều chỉnh âm thanh
  
* Thư mục Testing chỉ mục kiểm thử
  * Kiểm thử đơn vị: **mapCheckingTesting.js** - Kiểm tra tính đúng đắn của hàm kiểm tra dữ liệu
