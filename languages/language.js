window.onload = () => {
  const aboutPage = document.getElementById('aboutLanguage');
  if (aboutPage) {
      aboutPage.scrollIntoView({ behavior: 'smooth' });
  }

  if (window.location.hash === '#carousel') {
      const carouselElement = document.getElementById('carousel');
      if (carouselElement) {
          carouselElement.scrollIntoView({ behavior: 'smooth' });
      }
  }
};

document.addEventListener("DOMContentLoaded", function() {
  const aboutLanguages = document.querySelector('.language-title');
  const aboutLanguage1 = document.querySelector('.language-text1');
  
  aboutLanguages.style.opacity = 0; // Explicitly set opacity to 0 on DOM load
  aboutLanguage1.style.opacity = 0; // Explicitly set opacity to 0 on DOM load
  
  function fadeInElement(element, delay) {
      setTimeout(() => {
          let start = null;
          const duration = 1000; // Animation lasts for 1 second

          function step(timestamp) {
              if (!start) start = timestamp;
              const progress = Math.min((timestamp - start) / duration, 1);
              element.style.opacity = progress; // Dynamically update opacity

              if (progress < 1) {
                  window.requestAnimationFrame(step);
              }
          }

          window.requestAnimationFrame(step);
      }, delay);
  }

  // Fade in the title immediately
  fadeInElement(aboutLanguages, 100);

  // Fade in the paragraph text one second later
  fadeInElement(aboutLanguage1, 200);
});
