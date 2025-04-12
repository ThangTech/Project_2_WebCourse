$(document).ready(function () {
  let user = localStorage.getItem("auth");
  if (user) {
    let parsedUser = JSON.parse(user);
    $("#welcome").html("Xin chào, " + parsedUser.name);
    $("#btn-logout").removeClass("hidden");

    $(".auth .login").hide();
    $(".auth .register").hide();
  } else {
    $(".auth .login").show();
    $(".auth .register").show();

    $("#btn-logout").addClass("hidden");
    $("#user-info").hide();
  }

  $("#btn-logout").on("click", function () {
    localStorage.removeItem("auth");
    window.location.reload();
  });
});
$(document).ready(function () {
  let showGoToTop = 1300;
  $(window).scroll(function () {
    if ($(this).scrollTop() >= showGoToTop) {
      $("#go-to-top").fadeIn();
    } else {
      $("#go-to-top").fadeOut();
    }
  });
});
$(document).ready(function () {
  $("#go-to-top").click(function () {
    $("html, body").animate({ scrollTop: 0 }, "slow");
  });
});

$(document).ready(function () {
  const slides = $(".slide");
  let slideIndex = 0;
  let intervalId = null;

  function Slider() {
    if (slides.length > 0) {
      $(slides[slideIndex]).addClass("displaySlide");
      intervalId = setInterval(nextSlide, 3000);
    }
  }

  function showSlide(index) {
    if (index >= slides.length) {
      slideIndex = 0;
    } else if (index < 0) {
      slideIndex = slides.length - 1;
    } else {
      slideIndex = index;
    }

    slides.removeClass("displaySlide");
    $(slides[slideIndex]).addClass("displaySlide");
  }

  function prevSlide() {
    clearInterval(intervalId);
    slideIndex--;
    showSlide(slideIndex);
    intervalId = setInterval(nextSlide, 3000);
  }

  function nextSlide() {
    slideIndex++;
    showSlide(slideIndex);
  }
  Slider();
  $(".prev").click(function () {
    prevSlide();
  });
  $(".next").click(function () {
    nextSlide();
  });
});
