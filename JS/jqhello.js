$(document).ready(function() {
       const hour = new Date().getHours();
       let message, emoji, bgColor;
       
       if (hour < 5) {
           message = "Chào buổi đêm khuya! Bạn nên nghỉ ngơi sớm nhé";
           emoji = "🌌";
           bgColor = "linear-gradient(to right, #0f2027, #203a43, #2c5364)";
       } 
       else if (hour < 12) {
           message = "Chào buổi sáng! Ngày mới tốt lành nhé!";
           emoji = "🌞";
           bgColor = "linear-gradient(to right, #ffd89b, #f7b733)";
       } 
       else if (hour < 17) {
           message = "Chào buổi chiều! Bạn có khỏe không?";
           emoji = "😊";
           bgColor = "linear-gradient(to right, #f46b45, #eea849)";
       } 
       else {
           message = "Chào buổi tối! Đã đến lúc thư giãn rồi!";
           emoji = "🌙";
           bgColor = "linear-gradient(to right, #1e3c72, #2a5298)";
       }
       Toastify({
           text: `${emoji} ${message}`,
           duration: 5000,
           gravity: "top",
           position: "center",
           style: { background: bgColor },
           close: true
       }).showToast();
});  