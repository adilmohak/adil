// window.onload = () => {
document.addEventListener("DOMContentLoaded", function () {
  /* *************** CONSTANCES **************** */
  const darkLight = localStorage.getItem("dark");
  const pinNavbar = localStorage.getItem("fixed-top");
  const headerNav = document.getElementById("header-nav");
  const navpin = document.getElementById("nav-pin");
  const mainWrapper = document.getElementById("main-wrapper");
  const darkLightTogglerBtn = document.getElementById("dark-light-toggler");
  const scrollIndicator = document.getElementById("scroll-indicator");
  const navEle = document.getElementById("header-nav");
  const messageBox = document.getElementById("message-box");
  const cvWrapper = document.getElementById("cv-download-wrapper");
  const blogWrap = document.querySelector("#blog-wrap");
  const modal = document.querySelector(".modal");
  const skills = document.querySelectorAll(".skill-toggler");
  const accordionTogglers = document.querySelectorAll(".accordion-toggler");
  const burgerBtn = document.querySelector(".burger-menu");
  const menuList = document.querySelector(".menu-list");

  /* ****** Remove the preloader after the DOM fully loaded ***** */
  const preloader = document.querySelector(".preloader");
  preloader.style.animationPlayState = "running";

  /* *************** Accessing user location **************** */
  // window.navigator.geolocation.getCurrentPosition(
  //   function (res) {
  //     console.log(res);
  //   },
  //   function (err) {
  //     console.log(err);
  //   }
  // );
  /* ************* End user location access ************ */

  /* ************ handle button click ************ */
  var buttons = document.querySelectorAll(".btn");
  buttons.forEach((btn) => {
    btn.addEventListener("click", function () {
      var preText = btn.innerHTML;
      btn.innerHTML = "processing...";
      setTimeout(() => {
        btn.innerHTML = preText;
      }, 2000);
    });
  });
  /* ************ End handle button click ************ */

  /* *********** Dark Light *********** */

  darkLight && mainWrapper.classList.add(darkLight);
  pinNavbar && headerNav.classList.add(pinNavbar);

  const handleBtnContent = (mode) => {
    if (darkLightTogglerBtn) {
      if (mode === "dark") {
        darkLightTogglerBtn.classList.add("dark");
        darkLightTogglerBtn.innerHTML = "Dark Mode";
        darkLightTogglerBtn.setAttribute("title", "Click for light mode");
      } else {
        darkLightTogglerBtn.classList.remove("dark");
        darkLightTogglerBtn.innerHTML = "Light Mode";
        darkLightTogglerBtn.setAttribute("title", "Click for dark mode");
      }
    }
  };

  const performDarkLightCheck = () => {
    if (mainWrapper.classList.contains("dark")) {
      handleBtnContent("dark");
      localStorage.setItem("dark", "dark");
    } else {
      handleBtnContent("light");
      localStorage.removeItem("dark");
    }
  };

  // Perform dark-light mode check for first time visitor
  performDarkLightCheck();

  darkLightTogglerBtn?.addEventListener("click", function () {
    mainWrapper.classList.toggle("dark");
    performDarkLightCheck();
  });

  /* *********** End Dark Light *********** */

  /* *********** Header Nav *********** */

  var msgViewed = false;
  var msgStickyViewed = false;

  function indicateScrollBar() {
    const winScroll =
      document.body.scrollTop || document.documentElement.scrollTop;
    const height =
      document.documentElement.scrollHeight -
      document.documentElement.clientHeight;
    const scrolled = (winScroll / height) * 100;
    scrollIndicator.style.width = `${scrolled}%`;
  }

  window.onscroll = () => {
    indicateScrollBar();
    window.addEventListener("scroll", () => indicateScrollBar());

    if (scrollY > 100) {
      navEle.classList.add("nav-light");
    } else {
      navEle.classList.remove("nav-light");
    }

    if (!msgStickyViewed) {
      if (cvWrapper?.offsetTop - window.scrollY <= -200) {
        cvWrapper?.classList.add("sticky");
      } else {
        cvWrapper?.classList.remove("sticky");
      }
    }
    if (messageBox != null) {
      if (!msgViewed) {
        if (
          window.innerHeight + window.scrollY >=
          document.body.offsetHeight - 200
        ) {
          messageBox.style.display = "block";
          // messageBox.style.animation = "forwards messageAnim .5s ease-in-out";
          messageBox.style.animationPlayState = "running";
        }
      }
    }
  };

  /* ************* Load Blog *********** */

  function loadBlogs() {
    var data_file = "data/blogs.json";
    var http_request = new XMLHttpRequest();
    try {
      // Opera 8.0+, Firefox, Chrome, Safari
      http_request = new XMLHttpRequest();
    } catch (e) {
      // Internet Explorer Browsers
      try {
        http_request = new ActiveXObject("Msxml2.XMLHTTP");
      } catch (e) {
        try {
          http_request = new ActiveXObject("Microsoft.XMLHTTP");
        } catch (e) {
          // Something went wrong
          alert(e);
          return false;
        }
      }
    }

    http_request.onreadystatechange = function () {
      if (http_request.readyState == 4) {
        // Javascript function JSON.parse to parse JSON data
        var jsonObj = JSON.parse(http_request.responseText);
        loadQuantity((jsonObj = jsonObj));
        // jsonObj variable now contains the data structure and can
        // be accessed as jsonObj.name and jsonObj.country.
        var counter = 0;
        document
          .querySelector(".blog-loader")
          ?.addEventListener("click", function () {
            counter++;
            var start = counter * 4;
            var end = start + 4;
            loadQuantity(jsonObj, start, end);
          });
      }
    };

    function formatedBlog(blog) {
      var eleBlog = `
      <a href="#" class="blog-single">
        <h6><span class="icon-sm flaticon-user-6"></span> Adil Mohammed</h6>
        <h2>${blog.title}</h2>
        <p>${blog.description}</p>
        <h6><span class="icon-sm flaticon-calendar-2"></span> Jun 21, 2021</h6>
        <div class="likes-wrap">
          <div>
            <span class="icon-sm flaticon-like"></span> ${blog.likes} likes
          </div>
          <div>
            <span class="icon-sm flaticon-more-2"></span> ${blog.comments} Comments
          </div>
        </div>
      </a>`;
      var parser = new DOMParser();
      var doc = parser.parseFromString(eleBlog, "text/html");
      return doc.body;
    }

    function loadQuantity(jsonObj, start = 0, end = 4) {
      const blogs = jsonObj["blogs"].slice(start, end);
      blogs.forEach((blog) => {
        blogWrap?.append(formatedBlog(blog));
      });
      if (end >= jsonObj["blogs"].length) {
        document
          .querySelector(".blog-loader")
          .setAttribute("disabled", "disabled");
      }
    }

    http_request.open("GET", data_file, true);
    http_request.send();
  }
  loadBlogs();

  /* ************* End Blog Load ************ */

  // message box
  var messageCloseBtn = document.getElementById("close-btn");
  messageCloseBtn?.addEventListener("click", function () {
    messageBox.style.animation = "forwards messageCloseAnim .5s ease-in-out";
    messageBox.addEventListener("animationend", function () {
      messageBox.style.display = "none";
      msgViewed = true;
    });
  });

  // message box bottom
  var messageStickyCloseBtn = document.getElementById("sticky-close-btn");
  messageStickyCloseBtn?.addEventListener("click", function () {
    cvWrapper.classList.remove("sticky");
    msgStickyViewed = true;
  });

  if (headerNav.classList.contains("fixed-top")) {
    navpin?.setAttribute("title", "Pin navigation bar");
  } else {
    navpin?.setAttribute("title", "Unpin navigation bar");
  }

  // Pinned
  navpin?.addEventListener("click", function () {
    navEle.classList.toggle("fixed-top");
    if (navEle.classList.contains("fixed-top")) {
      document.body.style.marginTop = navEle.clientHeight + "px";
      navpin?.setAttribute("title", "Pin navigation bar");
      localStorage.setItem("fixed-top", "fixed-top");
    } else {
      document.body.style.marginTop = 0;
      navpin?.setAttribute("title", "Unpin navigation bar");
      localStorage.removeItem("fixed-top");
    }
  });
  /* *********** End Header Nav *********** */

  /* ********** Popup message ********** */
  if (modal != null) {
    const modalCloseBtn = document.querySelector(".modal-close");
    const cvPreviewBtn = document.querySelector(".cv-preview-btn");
    cvPreviewBtn?.addEventListener("click", function () {
      modal.style.display = "flex";
    });
    // When the user clicks anywhere outside of the modal, close it
    modalCloseBtn.onclick = function () {
      modal.style.display = "none";
    };
    window.onclick = function (event) {
      if (event.target == modal) {
        modal.style.display = "none";
      }
    };
  }
  /* ********** End Popup message ********** */

  /* *********** Slider ************ */
  var slides = document.getElementsByClassName("item-single");
  console.log(typeof slides);
  if (slides != null && slides != undefined && slides.length > 0) {
    var slideIndex = 0;
    showSlides();

    function showSlides() {
      var i;
      // var slides = document.getElementsByClassName("item-single");
      // var dots = document.getElementsByClassName("dot");
      for (i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
      }
      slideIndex++;
      if (slideIndex > slides.length) {
        slideIndex = 1;
      }
      // for (i = 0; i < dots.length; i++) {
      //   dots[i].className = dots[i].className.replace(" active", "");
      // }
      slides[slideIndex - 1].style.display = "block";
      // dots[slideIndex - 1].className += " active";
      setTimeout(showSlides, 5000); // Change image every 2 seconds
    }

    skills.forEach((item) => {
      item.addEventListener("click", () => {
        console.log("Just clicked!", item);
        slideIndex = 3;
      });
    });
  }
  /* ************* End Slider **************/

  /* ******** Accordion ******** */
  accordionTogglers.forEach((btn) => {
    btn.addEventListener("click", function () {
      const activeAcc = document.querySelector(".accordion.active");
      activeAcc.classList.remove("active");
      btn.parentElement.classList.toggle("active");
    });
  });
  // accordion.children[1].style.display = "block"
  /* ******** End Accordion ******** */

  /* ******** Burger button ******** */
  burgerBtn?.addEventListener("click", function () {
    menuList.classList.toggle("active-menu");
    if (menuList.classList.contains("active-menu")) {
      burgerBtn.classList.add("active-btn");
    } else {
      burgerBtn.classList.remove("active-btn");
    }
  });
});
