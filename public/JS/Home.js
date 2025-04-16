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
  let user = localStorage.getItem("auth");
  if (user) {
    let parsedUser = JSON.parse(user);
    $("#mobile-welcome").html("Xin chào, " + parsedUser.name);
    $("#mobile-user-info").removeClass("hidden");
    $(".mobile-login-link").hide();
    $(".mobile-register-link").hide();
  } else {
    $(".mobile-login-link").show();
    $(".mobile-register-link").show();
    $("#mobile-user-info").addClass("hidden");
  }
  $("#mobile-logout").on("click", function () {
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
//Xử lí sự kiện học ngay
$(document).ready(function () {
  function isLoggedIn() {
    const user = localStorage.getItem("auth");
    return user !== null;
  }

  $(".btn.btn-primary").on("click", function (event) {
    event.preventDefault();
    if (!isLoggedIn()) {
      alert("Bạn cần đăng nhập để tiếp tục!");
      window.location.href = "./Home/Login.html";
    } else {
      const courseLink = $(this).attr("href");
      window.location.href = courseLink;
    }
  });
});
/* $(document).ready(function () {
  function isLoggedIn() {
    const user = localStorage.getItem("auth");
    return user !== null;
  }
  $("#search-button").on("click", function (event) {
    event.preventDefault();
    if (!isLoggedIn()) {
      alert("Bạn cần đăng nhập để tiếp tục!");
      window.location.href = "./Home/Login.html";
    } else {
      const courseLink = $(this).attr("href");
      window.location.href = courseLink;
    }
  });
}); */
//Xử lí sự kiện tìm kiếm
$(document).ready(() => {
  function showSearchResults(searchInput) {
    const searchTerm = searchInput.toLowerCase().trim();
    const $searchResults = $("#search-results");
    $searchResults.empty();

    if (searchTerm === "") {
      $searchResults.hide();
      $(".course-card").show();
      return;
    }

    let matchCount = 0;
    const courseData = [];

    $(".course-card").each(function () {
      const $card = $(this);
      const courseName = $card.data("course-name").toLowerCase();
      const courseLink = $card.find(".btn-primary").attr("href") || "#";

      if (courseName.includes(searchTerm)) {
        matchCount++;
        courseData.push({
          name: $card.data("course-name"),
          link: courseLink,
        });
        $card.show();
      } else {
        $card.hide();
      }
    });

    if (matchCount > 0) {
      courseData.forEach((course) => {
        $searchResults.append(
          `<div class="search-result-item" data-link="${course.link}">${course.name}</div>`
        );
      });
      $searchResults.show();
    } else {
      $searchResults.append(
        '<div class="no-results">Không tìm thấy khóa học phù hợp</div>'
      );
      $searchResults.show();
    }
  }
  $("#search-button").on("click", (e) => {
    e.preventDefault();
    const searchInput = $("#search-input").val();
    showSearchResults(searchInput);
  });

  $("#search-input").on("keyup", function (e) {
    if (e.key === "Enter") {
      e.preventDefault();
      const searchInput = $(this).val();
      showSearchResults(searchInput);
    }
  });

  $(document).on("click", ".search-result-item", function () {
    const link = $(this).data("link");
    if (link && link !== "#") {
      window.location.href = link;
    }
  });

  $(document).on("click", (e) => {
    if (!$(e.target).closest(".search, .search-results").length) {
      $("#search-results").hide();
    }
  });
});
$(document).ready(function () {
  $("#mobile-menu-button").on("click", function () {
    $("#mobile-menu-overlay").addClass("active");
    $("body").css("overflow", "hidden");
  });
  $("#mobile-menu-close").on("click", function () {
    $("#mobile-menu-overlay").removeClass("active");
    $("body").css("overflow", "");
  });
  $("#mobile-search-close").on("click", function () {
    $(".mobile-search-container").css("display", "none");
  });
  $(window).on("resize", function () {
    if ($(window).width() > 768) {
      $("#mobile-menu-overlay").removeClass("active");
      $("body").css("overflow", "");
    }
  });
});
