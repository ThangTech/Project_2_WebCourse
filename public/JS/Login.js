const users = [];
let URL;
if (
  window.location.hostname.includes("localhost") ||
  window.location.hostname.includes("127.0.0.1")
) {
  URL = "http://localhost:3000/users";
} else {
  URL = "https://course-web-html.onrender.com/users";
}
$(document).ready(function () {
  const getAllUsers = (callback) => {
    fetch(URL)
      .then((response) => response.json()) // Trả về 1 promise
      .then(callback); // Trả về hàm có chữa dữ liệu vừa được thêm để sau này xử lý
  };

  getAllUsers((data) => {
    users.push(...data);
  });

  $("#loginForm").on("submit", function (event) {
    event.preventDefault();
    let username = $("#username").val();
    let password = $("#password").val();
    let rememberMe = $("#remember").prop("checked");

    if (username.length < 5 || username.length > 20) {
      alert("Tên đăng nhập phải từ 5 đến 20 ký tự!");
      return;
    }

    if (password.length < 8) {
      alert("Mật khẩu phải có ít nhất 8 ký tự!");
      return;
    }

    const userLogin = users.filter((user) => user.username === username)[0];
    if (!userLogin) {
      alert("Người dùng không tồn tại!");
      return;
    }

    const isVerified = userLogin.password === password;
    if (!isVerified) {
      alert("Sai mật khẩu!");
      return;
    }
    if (rememberMe) {
      userLogin.remember = true;
    }
    localStorage.setItem("auth", JSON.stringify(userLogin));
    alert("Đăng nhập thành công!");
    window.location.href = "../index.html";
  });
});
