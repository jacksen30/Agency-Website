const menuToggle = document.getElementById("menu-toggle");
const header = document.getElementById("header");
const navList = document.getElementById("nav-list");

// Toggles menu on mobile
function toggleMenu() {
  if (header && navList && menuToggle) {
    navList.classList.toggle('open');
    header.classList.toggle('open');
    menuToggle.classList.toggle('cross');
  } else {
    // Handle the error appropriately
    console.error('One or more elements are not found.');
  }
}


// Closes menu on mobile when a navList child is clicked
function closeMenu() {
  if (header && navList) {
    navList.classList.remove('open');
    header.classList.remove('open');
    menuToggle.classList.remove('cross');
  } else {
    console.error('One or more elements are not found.');
  }
}

// Event delegation to listen for clicks on any nav-list item
navList.addEventListener("click", function(event) {
  if (event.target.classList.contains("header__nav-list-item")) {
    console.log("Clicked on a nav-link");
    closeMenu();
  }
});

menuToggle.addEventListener("click", toggleMenu);
navList.addEventListener("click", closeMenu);

// Hero Banner / Hero Image Slider Code

// Wrapped in IIFE - Immediately Invoked Function Expression — To helps prevent variables and functions from leaking into the global scope, which can cause conflicts, especially after minification where variable names may be shortened or altered.

(function () {
  document.addEventListener('DOMContentLoaded', () => {
    const slideshowContainer = document.querySelector('.slideshow');
    if (!slideshowContainer) {
      // Slideshow not present on this page, exit the function
      return;
    }

    // Proceed to select other elements now that we know the slideshow exists
    const slides = slideshowContainer.querySelectorAll('picture');
    const prevButton = slideshowContainer.querySelector('.slideshow-control.prev');
    const nextButton = slideshowContainer.querySelector('.slideshow-control.next');
    const playPauseButton = slideshowContainer.querySelector('.slideshow-control.play-pause');
    const indicators = slideshowContainer.querySelectorAll('.slideshow-indicators .indicator');

    let currentSlide = 0;
    let isPlaying = true;
    const slideIntervalTime = 6000; // 6 seconds
    let slideInterval;

    // Check if slides exist
    if (!slides.length) {
      // No slides found, exit the function
      return;
    }

    // Rest of your slideshow code...

    function showSlide(index) {
      slides[currentSlide].classList.remove('active');
      indicators[currentSlide].classList.remove('active');
      currentSlide = (index + slides.length) % slides.length;
      slides[currentSlide].classList.add('active');
      indicators[currentSlide].classList.add('active');
    }

    function showNextSlide() {
      showSlide(currentSlide + 1);
    }

    function showPrevSlide() {
      showSlide(currentSlide - 1);
    }

    function playSlideshow() {
      isPlaying = true;
      playPauseButton.innerHTML = '❚❚';
      playPauseButton.setAttribute('aria-label', 'Pause Slideshow');
      slideInterval = setInterval(showNextSlide, slideIntervalTime);
    }

    function pauseSlideshow() {
      isPlaying = false;
      playPauseButton.innerHTML = '▶';
      playPauseButton.setAttribute('aria-label', 'Play Slideshow');
      clearInterval(slideInterval);
    }

    playPauseButton.addEventListener('click', () => {
      if (isPlaying) {
        pauseSlideshow();
      } else {
        playSlideshow();
      }
    });

    nextButton.addEventListener('click', () => {
      pauseSlideshow();
      showNextSlide();
    });

    prevButton.addEventListener('click', () => {
      pauseSlideshow();
      showPrevSlide();
    });

    // Initialise the slideshow
    slides[currentSlide].classList.add('active');
    indicators[currentSlide].classList.add('active');
    slideInterval = setInterval(showNextSlide, slideIntervalTime);
  });
})();