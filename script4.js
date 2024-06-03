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
      const duration = 2000; // Animation lasts for 2 seconds

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
  fadeInElement(aboutTitle, 1000);

  // Fade in the paragraph text one second later
  fadeInElement(aboutText1, 2000);
  fadeInElement(aboutText2, 3000);
  fadeInElement(aboutText3, 4000);
  fadeInElement(aboutButton, 4000);
});

/*--------------------
Vars
--------------------*/
let progress = 10;
let startX = 0;
let active = 0;
let isDown = false;
let isDragging = false; // To track if dragging is happening
const DRAG_THRESHOLD = 10;

/*--------------------
Constants
--------------------*/
const speedWheel = 0.02;
const speedDrag = -0.1;

/*--------------------
Get Z
--------------------*/
const getZindex = (array, index) => (array.map((_, i) => (index === i) ? array.length : array.length - Math.abs(index - i)));

/*--------------------
Items
--------------------*/
const $items = document.querySelectorAll('.carousel-item');
const $cursors = document.querySelectorAll('.cursor');

const displayItems = (item, index, active) => {
  const zIndex = getZindex([...$items], active)[index];
  item.style.setProperty('--zIndex', zIndex);
  item.style.setProperty('--active', (index - active) / $items.length);
};

/*--------------------
Animate
--------------------*/
const animate = () => {
  progress = Math.max(0, Math.min(progress, 100));
  active = Math.floor(progress / 100 * ($items.length - 1));
  $items.forEach((item, index) => displayItems(item, index, active));
};
animate();

/*--------------------
Click on Items
--------------------*/
$items.forEach((item, i) => {
  item.addEventListener('click', (e) => {
    if (!isDragging) {
      progress = (i / $items.length) * 100 + 10;
      animate();
    }
    e.stopPropagation();
  });
});

/*--------------------
Handlers
--------------------*/
const handleWheel = e => {
  const wheelProgress = e.deltaY * speedWheel;
  progress = progress + wheelProgress;
  animate();
};

const handleMouseMove = (e) => {
  if (!isDown) return;

  const x = e.clientX || (e.touches && e.touches[0].clientX) || 0;

  const dx = x - startX;

  if (!isDragging && Math.abs(dx) > DRAG_THRESHOLD) {
    isDragging = true;
    document.querySelectorAll('.carousel-item').forEach(item => item.classList.add('dragging'));
  }

  if (isDragging) {
    const mouseProgress = dx * speedDrag;
    progress = progress + mouseProgress;
    startX = x;
    animate();
  }
};

const handleMouseDown = e => {
  isDown = true;
  isDragging = false;
  startX = e.clientX || (e.touches && e.touches[0].clientX) || 0;
};

const handleMouseUp = e => {
  isDown = false;
  if (!isDragging) {
    const x = e.clientX || (e.changedTouches && e.changedTouches[0].clientX) || 0;
    const y = e.clientY || (e.changedTouches && e.changedTouches[0].clientY) || 0;
    const clickElement = document.elementFromPoint(x, y);
    if (clickElement && clickElement.classList.contains('carousel-item')) {
      clickElement.click();
    }
  }
  isDragging = false;
  document.querySelectorAll('.carousel-item').forEach(item => item.classList.remove('dragging'));
};

/*--------------------
Listeners
--------------------*/
document.addEventListener('wheel', handleWheel);
document.addEventListener('mousedown', handleMouseDown);
document.addEventListener('mousemove', handleMouseMove);
document.addEventListener('mouseup', handleMouseUp);
document.addEventListener('touchstart', handleMouseDown);
document.addEventListener('touchmove', handleMouseMove);
document.addEventListener('touchend', handleMouseUp);

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
    window.history.replaceState(null, null, 'home.html#aboutPage');
  }
}

document.querySelector('button[onclick="scrollToAbout()"]').addEventListener('click', function(event) {
  console.log("Button clicked");
  event.stopPropagation();
}, false);