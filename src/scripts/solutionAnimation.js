document.addEventListener('DOMContentLoaded', () => {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target); // Stop observing once animation is triggered
        }
      });
    },
    {
      threshold: 0.2, // Start animation when 20% of the element is visible
      rootMargin: '0px'
    }
  );

  // Observe all timeline steps
  document.querySelectorAll('.timeline-step.animate-in').forEach((step) => {
    observer.observe(step);
  });
});