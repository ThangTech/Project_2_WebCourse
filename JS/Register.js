$(document).ready(function() {
       $("#registerForm").on("submit", function(event) {
           event.preventDefault();
           let name = $("#name").val();
           let username = $("#username").val();
           let password = $("#password").val();
           let confirmPassword = $("#confirmPassword").val();
   
           if (password !== confirmPassword) {
               alert("Mật khẩu không khớp!");
               return;
           }
   
           const user = {
               name: name,
               username: username,
               password: password
           };
   
           localStorage.setItem(username, JSON.stringify(user));
           alert("Đăng ký thành công. Bạn có thể đăng nhập ngay bây giờ!");
           window.location.href = "./Login.html";
       });
   });