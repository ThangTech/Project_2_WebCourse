const users = [];
let URL;
if (
  window.location.hostname.includes("localhost") ||
  window.location.hostname.includes("127.0.0.1")
) {
  URL = "http://localhost:3000/users";
} else {
  URL = "https://json-server-1-0-0.herokuapp.com/users";
}

$(document).ready(function () {
  $.getJSON("../data/data.json", function (data) {
    users.push(...data.users);
  }).fail(function () {
    console.error("Không thể tải file JSON");
  });
  $("#registerForm").on("submit", function (event) {
    event.preventDefault();
    let name = $("#name").val();
    let username = $("#username").val();
    let password = $("#password").val();
    let confirmPassword = $("#confirmPassword").val();

    if (password !== confirmPassword) {
      alert("Mật khẩu không khớp!");
      return;
    }
    if (users.some((user) => user.username === username)) {
      alert("Tên đăng nhập đã tồn tại!");
      return;
    }

    const user = {
      name: name,
      username: username,
      password: password,
      remember: false,
    };

    const addUser = (data, callback) => {
       let option = {
         method: "POST",
         headers: {
           "Content-Type": "application/json",
         },
         body: JSON.stringify(data), // Truyền dữ liệu JSON cho web
       };
       fetch(URL, option)
         .then((response) => response.json()) // Trả về 1 promise
         .then(callback); // Trả về hàm có chữa dữ liệu vừa được thêm để sau này xử lý
     }

    addUser(user, (data) => {
      window.location.href = "./Login.html";
    });

    

    alert("Đăng ký thành công. Bạn có thể đăng nhập ngay bây giờ!");
    window.location.href = "./Login.html";
  });
});
