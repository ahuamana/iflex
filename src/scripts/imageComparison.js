document.addEventListener('DOMContentLoaded', () => {
  const container = document.querySelector('.comparison-container');
  const slider = container.querySelector('.slider');
  const beforeImage = container.querySelector('.before');

  let isDragging = false;

  const getPositionX = (event) => {
    return event.type.includes('mouse') ? event.pageX : event.touches[0].clientX;
  };

  const setPositionX = (x) => {
    const containerBox = container.getBoundingClientRect();
    const containerWidth = containerBox.width;
    let position = Math.max(0, Math.min(x - containerBox.left, containerWidth));
    let percentage = (position / containerWidth) * 100;
    
    slider.style.left = `${percentage}%`;
    beforeImage.style.clipPath = `inset(0 ${100 - percentage}% 0 0)`;
  };

  const startDragging = (e) => {
    isDragging = true;
    container.classList.add('active');
  };

  const stopDragging = () => {
    isDragging = false;
    container.classList.remove('active');
  };

  const drag = (e) => {
    if (!isDragging) return;
    e.preventDefault();
    setPositionX(getPositionX(e));
  };

  slider.addEventListener('mousedown', startDragging);
  slider.addEventListener('touchstart', startDragging);

  document.addEventListener('mousemove', drag);
  document.addEventListener('touchmove', drag);

  document.addEventListener('mouseup', stopDragging);
  document.addEventListener('touchend', stopDragging);

  // Set initial position
  const containerBox = container.getBoundingClientRect();
  setPositionX(containerBox.width / 2);
});