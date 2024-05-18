window.onload = function() {
  // Check if the URL has a hash
  let hash = window.location.hash;
  
  // If there is no hash or the hash is not one of the expected sections, default to aboutPage
  if (!hash || hash !== "#carousel") {
      // Set the default hash
      window.location.hash = "#aboutPage";
      hash = "#aboutPage"; // Update the hash variable to reflect this change
  }
  
  // Now scroll to the appropriate section based on the current hash
  const targetElement = document.getElementById(hash.substring(1));
  if (targetElement) {
      targetElement.scrollIntoView({ behavior: 'smooth' });
  }
};



  document.addEventListener("DOMContentLoaded", function() {
    document.body.style.display = 'block'; // Or whatever display type you want
    const aboutTitle = document.querySelector('.about-title');
    const aboutText1 = document.querySelector('.about-text1');
    const aboutText2 = document.querySelector('.about-text2');
    const aboutText3 = document.querySelector('.about-text3');
    const aboutButton = document.querySelector('.button-about');
  
    aboutTitle.style.opacity = 0; // Explicitly set opacity to 0 on DOM load
    aboutText1.style.opacity = 0; // Explicitly set opacity to 0 on DOM load
    aboutText2.style.opacity = 0; // Explicitly set opacity to 0 on DOM load
    aboutText3.style.opacity = 0; // Explicitly set opacity to 0 on DOM load
    aboutButton.style.opacity = 0; // Explicitly set opacity to 0 on DOM load
  
    function fadeInElement(element, delay) {
      setTimeout(() => {
        let start = null;
        const duration = 2000; // Animation lasts for 1 second
  
        function step(timestamp) {
          if (!start) start = timestamp;
          const progress = Math.min((timestamp - start) / duration, 2);
  
          element.style.opacity = progress; // Dynamically update opacity
  
          if (progress < 2) {
            window.requestAnimationFrame(step);
          }
        }
  
        window.requestAnimationFrame(step);
      }, delay);
    }
  
    // Fade in the title immediately
    fadeInElement(aboutTitle, 1000);
  
    // Fade in the paragraph text one second later
    fadeInElement(aboutText1, 2000);

       // Fade in the paragraph text one second later
       fadeInElement(aboutText2, 5000);

          // Fade in the paragraph text one second later
          fadeInElement(aboutText3, 8000);

          //  Fade in the paragraph text one second later
           fadeInElement(aboutButton, 8000);
  });

//   window.onload = function() {
//     // Initialize a MutationObserver to monitor changes to the DOM
//     var observer = new MutationObserver(function(mutations) {
//         mutations.forEach(function(mutation) {
//             // Loop through all mutations that occurred
//             for (var i = 0; i < mutation.addedNodes.length; i++) {
//                 // Check if the added node is the carousel text or contains it
//                 if (mutation.addedNodes[i].querySelector && mutation.addedNodes[i].querySelector('.carousel-text')) {
//                     var textElement = mutation.addedNodes[i].querySelector('.carousel-text');
//                     if (textElement) {
//                         // Apply the fade-in effect by changing the opacity
//                         textElement.style.opacity = 1;
//                         observer.disconnect(); // Stop observing once we've applied the fade-in
//                         break; // Exit the loop since we've found and handled our element
//                     }
//                 }
//             }
//         });
//     });

//     // Configuration for the observer:
//     var config = {
//         childList: true, // Observe direct children
//         subtree: true,  // Observe all descendants
//         attributes: false // No need to observe attribute changes
//     };

//     // Start observing the body for added nodes
//     observer.observe(document.body, config);
// };


let progress = 10
let startX = 0
let active = 0
let isDown = false

/*--------------------
Contants
--------------------*/
const speedWheel = 0.02
const speedDrag = -0.1

/*--------------------
Get Z
--------------------*/
const getZindex = (array, index) => (array.map((_, i) => (index === i) ? array.length : array.length - Math.abs(index - i)))

/*--------------------
Items
--------------------*/
const $items = document.querySelectorAll('.carousel-item')
const $cursors = document.querySelectorAll('.cursor')

const displayItems = (item, index, active) => {
  const zIndex = getZindex([...$items], active)[index]
  item.style.setProperty('--zIndex', zIndex)
  item.style.setProperty('--active', (index-active)/$items.length)
}

/*--------------------
Animate
--------------------*/
const animate = () => {
  progress = Math.max(0, Math.min(progress, 100))
  active = Math.floor(progress/100*($items.length-1))
  
  $items.forEach((item, index) => displayItems(item, index, active))
}
animate()

/*--------------------
Click on Items
--------------------*/
$items.forEach((item, i) => {
  item.addEventListener('click', () => {
    progress = (i/$items.length) * 100 + 10
    animate()
  })
})

/*--------------------
Handlers
--------------------*/
const handleWheel = e => {
  const wheelProgress = e.deltaY * speedWheel
  progress = progress + wheelProgress
  animate()
}

const handleMouseMove = (e) => {
  if (e.type === 'mousemove') {
    $cursors.forEach(($cursor) => {
      $cursor.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`
    })
  }
  if (!isDown) return
  const x = e.clientX || (e.touches && e.touches[0].clientX) || 0
  const mouseProgress = (x - startX) * speedDrag
  progress = progress + mouseProgress
  startX = x
  animate()
}

const handleMouseDown = e => {
  isDown = true
  startX = e.clientX || (e.touches && e.touches[0].clientX) || 0
}

const handleMouseUp = () => {
  isDown = false
}

/*--------------------
Listeners
--------------------*/
document.addEventListener('mousewheel', handleWheel)
document.addEventListener('mousedown', handleMouseDown)
document.addEventListener('mousemove', handleMouseMove)
document.addEventListener('mouseup', handleMouseUp)
document.addEventListener('touchstart', handleMouseDown)
document.addEventListener('touchmove', handleMouseMove)
document.addEventListener('touchend', handleMouseUp)


// On document load
document.addEventListener('DOMContentLoaded', highlightFirstVisibleItem);

// On carousel scroll
document.getElementById('carousel').addEventListener('scroll', highlightFirstVisibleItem);

// On window resize
window.addEventListener('resize', highlightFirstVisibleItem);





function goToWheel() {
  const carousel = document.getElementById('carousel');
  if (carousel) {
      carousel.scrollIntoView({ behavior: 'smooth' });
      window.history.pushState(null, null, '#carousel');
  }
}



function scrollToAbout() {
  const aboutSection = document.getElementById('aboutPage');
  if (aboutSection) {
      aboutSection.scrollIntoView({ behavior: 'smooth' });
      window.history.replaceState(null, null, 'index4.html');
  }
}


document.querySelector('button[onclick="scrollToAbout()"]').addEventListener('click', function(event) {
    console.log("Button clicked");
    event.stopPropagation(); // Only add if necessary to test if stopping propagation helps
}, false);
