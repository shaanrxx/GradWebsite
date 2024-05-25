window.onload = () => {
    const aboutPage = document.getElementById('aboutLanguage');
    if (aboutPage) {
      aboutPage.scrollIntoView({ behavior: 'smooth' });
    }
  };


  document.addEventListener("DOMContentLoaded", function() {
    document.body.style.display = 'block'; // Or whatever display type you want
    const aboutLanguages = document.querySelector('.language-title');
    const aboutLanguage1 = document.querySelector('.language-text1');
    // const aboutLanguageSharanahua = document.querySelector('.language-text-sharanahua');
    // const aboutText2 = document.querySelector('.about-text2');
    // const aboutText3 = document.querySelector('.about-text3');
    // const aboutButton = document.querySelector('.button-about');
  
    aboutLanguages.style.opacity = 0; // Explicitly set opacity to 0 on DOM load
    aboutLanguage1.style.opacity = 0; // Explicitly set opacity to 0 on DOM load
    // aboutLanguageSharanahua.style.opacity = 0; // Explicitly set opacity to 0 on DOM load
    // aboutText2.style.opacity = 0; // Explicitly set opacity to 0 on DOM load
    // aboutText3.style.opacity = 0; // Explicitly set opacity to 0 on DOM load
    // aboutButton.style.opacity = 0; // Explicitly set opacity to 0 on DOM load
  
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
  
    // // Fade in the paragraph text one second later
    fadeInElement(aboutLanguage1, 200);


    //    // Fade in the paragraph text one second later
    //    fadeInElement(aboutText2, 300);

    //       // Fade in the paragraph text one second later
    //       fadeInElement(aboutText3, 300);

    //       //  Fade in the paragraph text one second later
    //        fadeInElement(aboutButton, 300);
  });



  


// function backToAllLanguages() {
//     window.onload = function() {
//         // This assumes that if there is a hash, the page should navigate to that section smoothly.
//         const targetElementId = window.location.hash.substring(1);
//         const targetElement = document.getElementById(targetElementId);
//         if (targetElement) {
//             targetElement.scrollIntoView({ behavior: 'smooth' });
//         }
//     };
    
// }


// function backToAllLanguages() {
//     const carousel = document.getElementById('carousel');
//     if (carousel) {
//         carousel.scrollIntoView({ behavior: 'smooth' });
//         window.history.pushState(null, null, '#carousel');
//     }
//   }


window.onload = function() {
    if(window.location.hash === '#carousel') {
        const carouselElement = document.getElementById('carousel');
        if(carouselElement) {
            carouselElement.scrollIntoView({ behavior: 'smooth' });
        }
    }
};
