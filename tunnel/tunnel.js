document.addEventListener("DOMContentLoaded", function() {
      // Calculate when to start fading out based on total desired duration minus fade duration
      setTimeout(function() {
        // Select tunnel and text elements
        const tunnel = document.querySelector('.tunnel');
        const tunnelText = document.querySelector('.tunnel-text');

        // Apply fade-out effect by changing opacity over 3 seconds
        tunnel.style.transition = 'opacity 3s ease';
        tunnelText.style.transition = 'opacity 3s ease';
        tunnel.style.opacity = '0';
        tunnelText.style.opacity = '0';
  
     // After the fade-out completes, redirect
     setTimeout(function() {
      window.location.href = './home#aboutPage.html';
  }, 2500); // This timeout matches the duration of the fade-out effect
}, 4000); // Start the fade-out 4 seconds before the 5-minute mark
});