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

document.addEventListener("DOMContentLoaded", function () {
  const getAllUsers = (callback) => {
    fetch(URL)
      .then((response) => response.json())
      .then(callback);
  };

  getAllUsers((data) => {
    users.push(...data);
  });

  const registerForm = document.getElementById("registerForm");
  if (registerForm) {
    registerForm.addEventListener("submit", function (event) {
      event.preventDefault();
      let name = document.getElementById("name").value;
      let username = document.getElementById("username").value;
      let password = document.getElementById("password").value;
      let confirmPassword = document.getElementById("confirmPassword").value;

      if (username.length < 5 || username.length > 20) {
        alert("Tên đăng nhập phải từ 5 đến 20 ký tự!");
        return;
      }

      if (password.length < 8) {
        alert("Mật khẩu phải có ít nhất 8 ký tự!");
        return;
      }

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
          body: JSON.stringify(data),
        };
        fetch(URL, option)
          .then((response) => response.json())
          .then(callback);
      };

      addUser(user, (data) => {
        window.location.href = "./Login.html";
      });

      alert("Đăng ký thành công. Bạn có thể đăng nhập ngay bây giờ!");
      window.location.href = "./Login.html";
    });
  }
});
