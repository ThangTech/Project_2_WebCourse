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

  const loginForm = document.getElementById("loginForm");
  if (loginForm) {
    loginForm.addEventListener("submit", function (event) {
      event.preventDefault();
      let username = document.getElementById("username").value;
      let password = document.getElementById("password").value;
      let rememberMe = document.getElementById("remember").checked;

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
  }
});
