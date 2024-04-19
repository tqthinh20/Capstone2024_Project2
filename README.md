# Hệ thống bỏ phiếu điện tử dựa trên blockchain
Hệ thống bỏ phiếu phi tập trung dựa trên Blockchain là một giải pháp an toàn và minh bạch để tiến hành các cuộc bỏ phiếu. Tận dụng công nghệ chuỗi khối của Ethereum, hệ thống này cho phép người dùng bỏ phiếu từ xa trong khi vẫn duy trì tính ẩn danh và ngăn chặn gian lận.
> Đây là đề tài cho Đồ án 2 môn `CSC15201 – Đồ án Mã hoá ứng dụng và An ninh thông tin`, được thực hiện bởi 2 thành viên:
> * 20127337 - Trần Quang Thịnh.
> * 20126010 - Nguyễn Thị Mỹ Duyên.

## Tính năng
* Sử dụng chuỗi khối Ethereum cho việc bỏ phiếu minh bạch và chống giả mạo.
* Loại bỏ sự cần thiết của bên trung gian, đảm bảo quá trình bỏ phiếu không cần sự tin cậy.
* Màn hình quản trị để thiết lập cuộc bỏ phiếu, quản lý người bỏ phiếu và các ứng cử viên của cuộc bỏ phiếu.
* Giao diện người dùng trực quan để cử tri bỏ phiếu.

## Luồng công việc:
1. Quản trị viên sẽ tạo một hợp đồng bỏ phiếu và triển khai hệ thống trong mạng blockchain, sau đó tạo một phiên bầu cử với các ứng cử viên và bắt đầu cuộc bầu cử.
2. Những cử tri kết nối với cùng một mạng blockchain có thể đăng ký để trở thành cử tri. Sau khi đăng ký thành công, thông tin chi tiết tương ứng của người dùng sẽ được hiển thị trong bảng quản lý.
3. Quản trị viên sẽ kiểm tra thông tin của người đăng ký và quyết định phê duyệt hoặc từ chối tài khoản. Những người đăng ký được phê duyệt sẽ trở thành cử tri - những người có đủ điều kiện tham gia bầu cử.
4. Các cử tri bỏ phiếu bầu cho một ứng cử viên trong trang bỏ phiếu.
5. Sau một thời gian, quản trị viên có thể kết thúc cuộc bầu cử. Sau đó cuộc bầu cử kết thúc và kết quả được hiển thị trên trang kết quả, công bố người chiến thắng.

## Thiết kế hệ thống
### Use case diagram
![PRJ2_UCS](https://github.com/tqthinh20/Capstone2024_Project2/assets/106517048/d5d751c5-64b7-40ae-9676-45a1eca761f0)

### Entity-Relationship diagram
![PRJ2_ERD](https://github.com/tqthinh20/Capstone2024_Project2/assets/106517048/afec3628-10f9-47df-8da3-4c6aa1612e85)

### Data flow diagram
![PRJ2_DFD](https://github.com/tqthinh20/Capstone2024_Project2/assets/106517048/d8824ae5-6756-426e-99c0-98bc4363cd3e)

## Yêu cầu
* Node.js
* Solidity/Web3
* Metamask
* Ganache UI
* Truffle

## Cài đặt và khởi chạy
1. Cài đặt các công cụ như yêu cầu.
2. Mở Ganache và chọn Quick start để bắt đầu mạng chuỗi khối Ethereum thử nghiệm.
3. Tạo mạng mới trên metamask với:
    * New RPC URL: `http://127.0.0.1:7547` # cho ganache ui.
    * Chain ID: `1337`
    * Currency symbol: `ETH`
4. Nhập (các) tài khoản bằng khóa riêng từ ganache ui vào metamask.
5. Tải xuống mã nguồn của repo này.
6. Trên thư mục `Capstone2024_Project2`, triển khai hợp đồng thông minh vào mạng blockchain cục bộ
   ```shell
   truffle compile   
   truffle migrate # Hoặc `truffle migrate --reset` để triển khai lại hợp đồng.
   ```
7. Trên thư mục `Capstone2024_Project2/client`, thực thi các lệnh sau để khởi chạy hệ thống:
    ```shell
   npm i
   npm start
   ```
## Khó khăn
* Hầu như chưa có nhiều kinh nghiệm trong việc phát triển hệ thống dựa trên blockchain. 
* Phải tham khảo nhiều tài liệu và mã nguồn có sẵn.

## Kinh nghiệm có được
* Tích luỹ được kiếm thức về blockchain cũng như hệ thống bỏ phiếu điện tử dựa trên blockchain.
* Nắm được cách xây dựng một hệ thống cơ bản dựa trên blockchain.
* Học được cách sử dụng một số công cụ như Truffle, Ganache, Metamask.

## Hướng phát triển trong tương lai
* Có thể triển khai nhiều phiên bản bỏ phiếu trên hệ thống.
* Cuộc bỏ phiếu có thể kết thúc tự động trong một khoảng thời gian nhất định.
* Thêm một số thuật toán mật mã để đảm bảo tính minh bạch của hệ thống như mật mã ngưỡng,...
* Thêm các chức năng xác thực người dùng như mật khẩu dùng 1 lần, nhận diện khuôn mặt,...

## Tham khảo
### Tài liệu
* https://viblo.asia/p/blockchain-la-gi-cong-nghe-blockchain-la-gi-07LKXzqPlV4
* https://archive.trufflesuite.com/docs/
* https://docs.soliditylang.org/en/v0.8.25/
* https://ieeexplore.ieee.org/document/10061373
* https://www.mdpi.com/2079-9292/13/1/17
* https://docs.soliditylang.org/en/latest/solidity-by-example.html
### Mã nguồn
* https://github.com/syedmuhamaddanish/React-Voting-Application
* https://medium.com/coinmonks/e-voting-system-based-on-blockchain-75570ef92c4
* https://github.com/AbhinavSharma24/BlockVote
* https://github.com/thephenom1708/ElectoChain
* https://github.com/praveenchiliveri6/Blockchain-Voting-System
* https://github.com/Ujjwalkumar2003/Apna_Chunav
* https://github.com/roshan-lal-dia/mini-project-s6
* https://github.com/ashishlamsal/voting-dapp
* https://github.com/naz46/blockchain-voting-dapp
* https://github.com/AryanKoundal/Voting-DApp-Blockchain

---

# Blockchain-based E-voting system
Blockchain-based e-voting system is a secure and transparent solution for conducting votes. Leveraging Ethereum's blockchain technology, the system allows users to vote remotely while maintaining anonymity and preventing fraud.
> This work is for the Project 2 of `CSC15201 – Capstone project on Applied Cryptography and Information Security`, made by 2 members:
> * 20127337 - Tran Quang Thinh.
> * 20126010 - Nguyen Thi My Duyen.

## Feature
* Uses the Ethereum blockchain for transparent and tamper-proof voting.
* Eliminates the need for intermediaries, ensuring a trustless voting process.
* Admin screen to set up polling, manage voters and polling candidates.
* Intuitive user interface for voter voting.

## Workflow
1. Admin will create a voting contractand deploy the system in a blockchain network, then create an election instance with candidates and start the election.
2. The voters who connect to the same blockchain network can register to become a voter. Once the users successfully register, their respective details are displayed in the admin's panel.
3. The admin will check the information of the registers and decide to approve or reject the account. Approved registers become voters - who are eligible to take part in the election.
4. The voters cast their vote to a candidate in the voting page.
5. The admin can end the election after a period. The election will be closed and the results are displayed on the results page, announcing the winner.

## System Design
### Use case diagram
![PRJ2_UCS](https://github.com/tqthinh20/Capstone2024_Project2/assets/106517048/d5d751c5-64b7-40ae-9676-45a1eca761f0)

### Entity-Relationship diagram
![PRJ2_ERD](https://github.com/tqthinh20/Capstone2024_Project2/assets/106517048/afec3628-10f9-47df-8da3-4c6aa1612e85)

### Data flow diagram
![PRJ2_DFD](https://github.com/tqthinh20/Capstone2024_Project2/assets/106517048/d8824ae5-6756-426e-99c0-98bc4363cd3e)

## Requirements
1. Node.js
2. Solidity/Web3
3. Metamask
4. Ganache UI
5. Truffle

## Setup and Run
1. Setup requiremnets.
2. Open Ganache and select Quick Start to start a test Ethereum blockchain network.
3. Create a new network on metamask with:
    * New RPC URL: `http://127.0.0.1:7547` # cho ganache ui.
    * Chain ID: `1337`
    * Currency symbol: `ETH`
4. Import account(s) using private keys from ganache ui to the metamask.
5. Download the code of this repository.
6. On the `Capstone2024_Project2` directory, deploy smart contract to the local blockchain network
   ```shell
   truffle compile   
   truffle migrate #Or 'truffle migrate --reset` for re-deployments
   ```
7. On the `Capstone2024_Project2/client` directory, execute these commands to launch the system:
   ```shell
   npm i
   npm start
   ```
## Difficulty
* Almost do not have much experience in developing blockchain-based systems.
* Must refer to many available documents and source codes.

## Experience
* Gain knowledge about blockchain and blockchain-based e-voting system.
* Understand how to build a basic system based on blockchain.
* Learn how to use some tools such as Truffle, Ganache, Metamask.

## Future imporvement
* Multiple voting instances can be deployed on the system.
* Voting can be ended automatically within a certain period of time.
* Add some cryptographic algorithms to ensure system transparency such as threshold cryptography,...
* Add user authentication functions such as one-time password, face recognition,...

## Reference
### Documentation
* https://viblo.asia/p/blockchain-la-gi-cong-nghe-blockchain-la-gi-07LKXzqPlV4
* https://archive.trufflesuite.com/docs/
* https://docs.soliditylang.org/en/v0.8.25/
* https://ieeexplore.ieee.org/document/10061373
* https://www.mdpi.com/2079-9292/13/1/17
* https://docs.soliditylang.org/en/latest/solidity-by-example.html
### Source code
* https://github.com/syedmuhamaddanish/React-Voting-Application
* https://medium.com/coinmonks/e-voting-system-based-on-blockchain-75570ef92c4
* https://github.com/AbhinavSharma24/BlockVote
* https://github.com/thephenom1708/ElectoChain
* https://github.com/praveenchiliveri6/Blockchain-Voting-System
* https://github.com/Ujjwalkumar2003/Apna_Chunav
* https://github.com/roshan-lal-dia/mini-project-s6
* https://github.com/ashishlamsal/voting-dapp
* https://github.com/naz46/blockchain-voting-dapp
* https://github.com/AryanKoundal/Voting-DApp-Blockchain