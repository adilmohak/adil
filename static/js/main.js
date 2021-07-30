// document.addEventListener('load', function () {
//   /* ****** Remove the preloader after the DOM fully loaded ***** */
//   const preloader = document.querySelector('.preloader');
//   preloader.style.animationPlayState = "running";
// })

document.addEventListener("DOMContentLoaded", function () {
  /* ****** Remove the preloader after the DOM fully loaded ***** */
  const preloader = document.querySelector(".preloader");
  preloader.style.animationPlayState = "running";

  /* *********** Dark Light *********** */
  var darkLight = localStorage.getItem("dark");
  var pinNavbar = localStorage.getItem("unpin");
  var headerNav = document.getElementById("header-nav");
  var navpin = document.getElementById("nav-pin");

  const mainWrapper = document.getElementById("main-wrapper");
  const darkLightTogglerBtn = document.getElementById("dark-light-toggler");

  mainWrapper.classList.add(darkLight);
  headerNav.classList.add(pinNavbar);
  handleBtnContent();

  if (headerNav.classList.contains("unpin")) {
    navpin.setAttribute("title", "Pin navigation bar");
  } else {
    navpin.setAttribute("title", "Unpin navigation bar");
  }

  darkLightTogglerBtn.addEventListener("click", function () {
    mainWrapper.classList.toggle("dark");
    if (mainWrapper.classList.contains("dark")) {
      handleBtnContent();
      localStorage.setItem("dark", "dark");
    } else {
      handleBtnContent();
      localStorage.removeItem("dark");
    }
  });
  /* *********** End Dark Light Mode ************ */

  function handleBtnContent() {
    const darkLightTogglerBtn = document.getElementById("dark-light-toggler");
    if (mainWrapper.classList.contains("dark")) {
      darkLightTogglerBtn.classList.add("light");
      darkLightTogglerBtn.innerHTML = "Light Mode";
      darkLightTogglerBtn.setAttribute("title", "Change to light mode");
    } else {
      darkLightTogglerBtn.classList.remove("light");
      darkLightTogglerBtn.innerHTML = "Dark Mode";
      darkLightTogglerBtn.setAttribute("title", "Change to dark mode");
    }
  }
  /* *********** End Dark Light *********** */

  /* *********** Header Nav *********** */
  const bodySizeIndicator = document.getElementById("body-size-indicator");
  const navEle = document.getElementById("header-nav");
  const messageBox = document.getElementById("message-box");
  const cvWrapper = document.getElementById("cv-download-wrapper");

  var msgViewed = false;
  var msgStickyViewed = false;

  function indicateScrollBar() {
    const winScroll =
      document.body.scrollTop || document.documentElement.scrollTop;
    const height =
      document.documentElement.scrollHeight -
      document.documentElement.clientHeight;
    const scrolled = (winScroll / height) * 100;
    bodySizeIndicator.style.width = `${scrolled}%`;
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
      if (cvWrapper.offsetTop - window.scrollY <= 30) {
        cvWrapper.classList.add("sticky");
      } else {
        cvWrapper.classList.remove("sticky");
      }
    }

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
  };

  // message box
  var messageCloseBtn = document.getElementById("close-btn");
  messageCloseBtn.addEventListener("click", function () {
    messageBox.style.animation = "forwards messageCloseAnim .5s ease-in-out";
    messageBox.addEventListener("animationend", function () {
      messageBox.style.display = "none";
      msgViewed = true;
    });
  });

  // message box bottom
  var messageStickyCloseBtn = document.getElementById("sticky-close-btn");
  messageStickyCloseBtn.addEventListener("click", function () {
    cvWrapper.classList.remove("sticky");
    msgStickyViewed = true;
  });

  // Pinned
  navpin.addEventListener("click", function () {
    navEle.classList.toggle("unpin");
    if (navEle.classList.contains("unpin")) {
      navpin.setAttribute("title", "Pin navigation bar");
      localStorage.setItem("unpin", "unpin");
    } else {
      navpin.setAttribute("title", "Unpin navigation bar");
      localStorage.removeItem("unpin");
    }
  });
  /* *********** End Header Nav *********** */

  /* ********** Popup message ********** */
  const modal = document.querySelector(".modal");
  const modalCloseBtn = document.querySelector(".modal-close");
  const cvPreviewBtn = document.querySelector(".cv-preview-btn");
  cvPreviewBtn.addEventListener("click", function () {
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
  /* ********** End Popup message ********** */

  /* *********** Slider ************ */
  var slideIndex = 0;
  showSlides();

  function showSlides() {
    var i;
    var slides = document.getElementsByClassName("item-single");
    var dots = document.getElementsByClassName("dot");
    for (i = 0; i < slides.length; i++) {
      slides[i].style.display = "none";
    }
    slideIndex++;
    if (slideIndex > slides.length) {
      slideIndex = 1;
    }
    for (i = 0; i < dots.length; i++) {
      dots[i].className = dots[i].className.replace(" active", "");
    }
    slides[slideIndex - 1].style.display = "block";
    dots[slideIndex - 1].className += " active";
    setTimeout(showSlides, 5000); // Change image every 2 seconds
  }
  /* ************* End Slider **************/
});
