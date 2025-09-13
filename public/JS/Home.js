const authPath = [
  "cart.html",
  "cart1.html",
  "cart2.html",
  "cart3.html",
  "cart4.html",
  "cart5.html",
  "cart6.html",
  "cart7.html",
  "cart8.html",
];

document.addEventListener("DOMContentLoaded", function () {
  let user = localStorage.getItem("auth");
  const welcome = document.getElementById("welcome");
  const btnLogout = document.getElementById("btn-logout");
  const authLogin = document.querySelector(".auth .login");
  const authRegister = document.querySelector(".auth .register");
  const userInfo = document.getElementById("user-info");
  if (user) {
    let parsedUser = JSON.parse(user);
    if (welcome) welcome.innerHTML = "Xin chào, " + parsedUser.name;
    if (btnLogout) btnLogout.classList.remove("hidden");
    if (authLogin) authLogin.style.display = "none";
    if (authRegister) authRegister.style.display = "none";
  } else {
    if (authLogin) authLogin.style.display = "";
    if (authRegister) authRegister.style.display = "";
    if (btnLogout) btnLogout.classList.add("hidden");
    if (userInfo) userInfo.style.display = "none";
  }
  if (btnLogout) {
    btnLogout.addEventListener("click", function () {
      localStorage.removeItem("auth");
      localStorage.removeItem("cart");
      localStorage.removeItem("totalPrice");
      localStorage.removeItem("courseBought");
      window.location.reload();
    });
  }

  // Mobile auth
  let mobileUser = localStorage.getItem("auth");
  const mobileWelcome = document.getElementById("mobile-welcome");
  const mobileUserInfo = document.getElementById("mobile-user-info");
  const mobileLoginLink = document.querySelector(".mobile-login-link");
  const mobileRegisterLink = document.querySelector(".mobile-register-link");
  const mobileLogout = document.getElementById("mobile-logout");
  if (mobileUser) {
    let parsedUser = JSON.parse(mobileUser);
    if (mobileWelcome) mobileWelcome.innerHTML = "Xin chào, " + parsedUser.name;
    if (mobileUserInfo) mobileUserInfo.classList.remove("hidden");
    if (mobileLoginLink) mobileLoginLink.style.display = "none";
    if (mobileRegisterLink) mobileRegisterLink.style.display = "none";
  } else {
    if (mobileLoginLink) mobileLoginLink.style.display = "";
    if (mobileRegisterLink) mobileRegisterLink.style.display = "";
    if (mobileUserInfo) mobileUserInfo.classList.add("hidden");
  }
  if (mobileLogout) {
    mobileLogout.addEventListener("click", function () {
      localStorage.removeItem("auth");
      localStorage.removeItem("cart");
      localStorage.removeItem("totalPrice");
      localStorage.removeItem("courseBought");
      window.location.reload();
    });
  }

  // Go to top button show/hide
  let showGoToTop = 1300;
  window.addEventListener("scroll", function () {
    const goToTop = document.getElementById("go-to-top");
    if (!goToTop) return;
    if (window.scrollY >= showGoToTop) {
      goToTop.style.display = "flex";
    } else {
      goToTop.style.display = "none";
    }
  });
  const goToTopBtn = document.getElementById("go-to-top");
  if (goToTopBtn) {
    goToTopBtn.addEventListener("click", function () {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }

  // Slider
  const slides = document.querySelectorAll(".slide");
  let slideIndex = 0;
  let intervalId = null;
  function showSlide(index) {
    if (index >= slides.length) {
      slideIndex = 0;
    } else if (index < 0) {
      slideIndex = slides.length - 1;
    } else {
      slideIndex = index;
    }
    slides.forEach((slide) => slide.classList.remove("displaySlide"));
    if (slides[slideIndex]) slides[slideIndex].classList.add("displaySlide");
  }
  function nextSlide() {
    slideIndex++;
    showSlide(slideIndex);
  }
  function prevSlide() {
    clearInterval(intervalId);
    slideIndex--;
    showSlide(slideIndex);
    intervalId = setInterval(nextSlide, 3000);
  }
  function Slider() {
    if (slides.length > 0) {
      showSlide(slideIndex);
      intervalId = setInterval(nextSlide, 3000);
    }
  }
  Slider();
  const prevBtn = document.querySelector(".prev");
  const nextBtn = document.querySelector(".next");
  if (prevBtn) prevBtn.addEventListener("click", prevSlide);
  if (nextBtn) nextBtn.addEventListener("click", nextSlide);

  // Học ngay & btn-cart
  function isLoggedIn() {
    const user = localStorage.getItem("auth");
    return user !== null;
  }
  document.addEventListener("click", function (event) {
    if (event.target.closest(".btn.btn-primary, .btn-cart")) {
      const courseBought = JSON.parse(localStorage.getItem("courseBought"));
      event.preventDefault();
      if (!isLoggedIn()) {
        alert("Bạn cần đăng nhập để tiếp tục!");
        window.location.href = "./Home/Login.html";
      } else {
        let courseLink = event.target.closest("a").getAttribute("href");
        if (courseBought) {
          const match = courseLink.match(/\d+/);
          const courseId = match ? match[0] : null;
          for (let i = 0; i < courseBought.length; i++) {
            if (courseBought[i].id == courseId) {
              courseLink = courseLink.replace("cart", "studyNow");
              break;
            }
          }
        }
        window.location.href = courseLink;
      }
    }
  });

  // Mobile menu
  const mobileMenuBtn = document.getElementById("mobile-menu-button");
  const mobileMenuOverlay = document.getElementById("mobile-menu-overlay");
  const mobileMenuClose = document.getElementById("mobile-menu-close");
  const mobileSearchClose = document.getElementById("mobile-search-close");
  const mobileSearchContainer = document.querySelector(
    ".mobile-search-container"
  );
  if (mobileMenuBtn) {
    mobileMenuBtn.addEventListener("click", function () {
      if (mobileMenuOverlay) mobileMenuOverlay.classList.add("active");
      document.body.style.overflow = "hidden";
    });
  }
  if (mobileMenuClose) {
    mobileMenuClose.addEventListener("click", function () {
      if (mobileMenuOverlay) mobileMenuOverlay.classList.remove("active");
      document.body.style.overflow = "";
    });
  }
  if (mobileSearchClose && mobileSearchContainer) {
    mobileSearchClose.addEventListener("click", function () {
      mobileSearchContainer.style.display = "none";
    });
  }
  window.addEventListener("resize", function () {
    if (window.innerWidth > 768) {
      if (mobileMenuOverlay) mobileMenuOverlay.classList.remove("active");
      document.body.style.overflow = "";
    }
  });

  // Hiển thị sản phẩm học thử miễn phí và bán chạy nhất
  const currentPath = window.location.pathname;
  const jsonPath = currentPath.includes("index.html")
    ? "./data/course.json"
    : "../data/course.json";
  fetch(jsonPath)
    .then((response) => response.json())
    .then((data) => {
      const bestsellerCourses = data.bestseller;
      const freeTrialCourses = data.freeTrial;
      // Bestseller
      const bestsellerGrid = document.querySelector(
        ".bestseller-section .course-grid"
      );
      bestsellerCourses.forEach((course) => {
        const courseCard = document.createElement("div");
        courseCard.className = "course-card";
        courseCard.setAttribute("data-course-name", course.name);
        courseCard.innerHTML = `
          <div class="course-image">
            <img src="${course.image}" alt="${course.name}" />
            <div class="course-badge bestseller">Bán chạy</div>
          </div>
          <div class="course-content">
            <div class="course-instructor">
              <img src="${course.instructorImage}" alt="${course.instructor}" />
              <span>${course.instructor}</span>
            </div>
            <h3>${course.description}</h3>
            <div class="course-rating">
              <span class="stars">${"★".repeat(course.rating)}${"☆".repeat(
          5 - course.rating
        )}</span>
              <span class="rating-count">(${course.ratingCount})</span>
            </div>
            <div class="course-info">
              <span>${course.lessons} bài học</span>
              <span>${course.duration}</span>
            </div>
            <div class="course-price">
              <span class="current-price">${course.price}</span>
              <span class="original-price">${course.originalPrice}</span>
              <span class="discount">${course.discount}</span>
            </div>
            <div class="course-action">
              <a href="${course.studyLink}" class="btn btn-primary">Học ngay</a>
              <a href="${
                course.detailsLink
              }" class="btn-details">Xem chi tiết</a>
            </div>
          </div>
        `;
        if (bestsellerGrid) bestsellerGrid.appendChild(courseCard);
      });
      // Free trial
      const freeTrialGrid = document.querySelector(
        ".free-trial-section .course-grid"
      );
      freeTrialCourses.forEach((course) => {
        const courseCard = document.createElement("div");
        courseCard.className = "course-card";
        courseCard.setAttribute("data-course-name", course.name);
        courseCard.innerHTML = `
          <div class="course-image">
            <img src="${course.image}" alt="${course.name}" />
            <div class="course-badge free">Miễn phí</div>
          </div>
          <div class="course-content">
            <div class="course-instructor">
              <img src="${course.instructorImage}" alt="${course.instructor}" />
              <span>${course.instructor}</span>
            </div>
            <h3>${course.description}</h3>
            <div class="course-rating">
              <span class="stars">${"★".repeat(course.rating)}${"☆".repeat(
          5 - course.rating
        )}</span>
              <span class="rating-count">(${course.ratingCount})</span>
            </div>
            <div class="course-info">
              <span>${course.lessons} bài học</span>
              <span>${course.duration}</span>
            </div>
            <div class="course-action">
              <a href="${course.studyLink}" class="btn btn-primary">Học ngay</a>
              <a href="${
                course.detailsLink
              }" class="btn-details">Xem chi tiết</a>
            </div>
          </div>
        `;
        if (freeTrialGrid) freeTrialGrid.appendChild(courseCard);
      });
    })
    .catch(() => {
      console.error("Error loading course data.");
    });

  // Số lượng sản phẩm trong giỏ hàng và nút thêm vào giỏ hàng
  function updateCartCount() {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    const cartCountDesktop = document.getElementById("count");
    const cartCountMobile = document.getElementById("count-mobile");
    const countText = `(${cart.length})`;
    if (cartCountDesktop) cartCountDesktop.textContent = countText;
    if (cartCountMobile) cartCountMobile.textContent = countText;
  }
  updateCartCount();
  document.addEventListener("click", function (event) {
    if (event.target.closest(".btn-add-cart")) {
      const courseIdInput = event.target
        .closest(".btn-add-cart")
        .querySelector("#course-id");
      const courseId = courseIdInput ? courseIdInput.value : null;
      const currentPath = window.location.pathname;
      const jsonPath = currentPath.includes("index.html")
        ? "./data/course.json"
        : "../data/course.json";
      fetch(jsonPath)
        .then((response) => response.json())
        .then((data) => {
          const allCourses = [...data.bestseller, ...data.freeTrial];
          const selectedCourse = allCourses.find(
            (course) => course.id == courseId
          );
          if (selectedCourse) {
            let cart = JSON.parse(localStorage.getItem("cart")) || [];
            const existingItem = cart.find((item) => item.id == courseId);
            if (existingItem) {
              alert("Sản phẩm đã có trong giỏ hàng!");
            } else {
              cart.push(selectedCourse);
              localStorage.setItem("cart", JSON.stringify(cart));
              alert("Đã thêm sản phẩm vào giỏ hàng!");
              updateCartCount();
            }
          } else {
            alert("Không tìm thấy sản phẩm!");
          }
        })
        .catch(() => {
          alert("Không thể tải dữ liệu sản phẩm!");
        });
    }
  });

  // Kiểm tra đăng nhập khi vào trang giỏ hàng
  function isLoggedIn2() {
    const user = localStorage.getItem("auth");
    return user !== null;
  }
  const currentPath2 = window.location.pathname;
  for (let i = 0; i < authPath.length; i++) {
    if (currentPath2.includes(authPath[i])) {
      if (!isLoggedIn2()) {
        alert("Bạn cần đăng nhập để truy cập !");
        window.location.href = "../Home/Login.html";
      }
    }
  }
});
