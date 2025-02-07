document.addEventListener('DOMContentLoaded', () => {
  const imageContainers = document.querySelectorAll('.hero-image-container');
  const heroOverlay = document.querySelector('.hero-overlay');

  function closeModal(container) {
    container.classList.remove('expanded');
    heroOverlay.classList.remove('modal-active');
    document.body.style.overflow = '';
  }

  function openModal(container) {
    container.classList.add('expanded');
    heroOverlay.classList.add('modal-active');
    document.body.style.overflow = 'hidden';

    // Create close button if it doesn't exist
    if (!container.querySelector('.close-button')) {
      const closeButton = document.createElement('button');
      closeButton.className = 'close-button';
      container.appendChild(closeButton);
    }
  }

  imageContainers.forEach(container => {
    container.addEventListener('click', (e) => {
      if (!container.classList.contains('expanded')) {
        openModal(container);
      }
    });

    // Close button click handler
    container.addEventListener('click', (e) => {
      if (e.target.classList.contains('close-button')) {
        e.stopPropagation();
        closeModal(container);
      }
    });
  });

  // Close on overlay click
  heroOverlay.addEventListener('click', () => {
    const expandedContainer = document.querySelector('.hero-image-container.expanded');
    if (expandedContainer) {
      closeModal(expandedContainer);
    }
  });

  // Close on ESC key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      const expandedContainer = document.querySelector('.hero-image-container.expanded');
      if (expandedContainer) {
        closeModal(expandedContainer);
      }
    }
  });
});