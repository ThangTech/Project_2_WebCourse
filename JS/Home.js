$(document).ready(function() {
       let user = localStorage.getItem("ThangElnino");
       console.log(1); 
       if (user) {
           let parsedUser = JSON.parse(user);
           $("#welcome").html('Xin chào, ' + parsedUser.name);
           $("#btn-logout").removeClass("hidden");
   
           $(".auth .login").hide();
           $(".auth .register").hide();
       } else {
           $(".auth .login").show();
           $(".auth .register").show();
   
           $("#btn-logout").addClass("hidden");
           $("#user-info").hide();
       }
   
       $("#btn-logout").on("click", function() {
           localStorage.removeItem("user"); 
           window.location.reload(); 
       });
   });