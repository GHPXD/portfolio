// Add Certificate Image Modal Functionality
document.addEventListener('DOMContentLoaded', function() {
  // Get the modal
  const modal = document.getElementById('certificateModal');
  const modalImg = document.getElementById('modalImage');
  const captionText = document.getElementById('caption');
  const closeBtn = document.getElementsByClassName('close')[0];

  // Get all certificate images
  const certImages = document.querySelectorAll('.certificate-card img');

  // Add click event to each certificate image
  certImages.forEach(img => {
      img.addEventListener('click', function() {
          modal.style.display = "block";
          modalImg.src = this.src;
          captionText.innerHTML = this.parentElement.querySelector('h3').textContent;
      });
  });

  // Close the modal when the close button is clicked
  closeBtn.onclick = function() {
      modal.style.display = "none";
  }

  // Close the modal when clicking outside the image
  modal.onclick = function(event) {
      if (event.target === modal) {
          modal.style.display = "none";
      }
  }
});