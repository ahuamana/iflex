class Slider {
  constructor(element) {
    this.slider = element;
    this.track = element.querySelector('.slider-track');
    this.slides = Array.from(element.querySelectorAll('.slide'));
    this.nextBtn = element.querySelector('.next');
    this.prevBtn = element.querySelector('.prev');
    this.dotsContainer = element.querySelector('.slider-dots');
    
    this.currentSlide = 0;
    this.slidesCount = this.slides.length;
    
    // Initialize slider functionality
    this.init();
    
    // Set up language handling
    this.setupLanguage();
  }

  setupLanguage() {
    // Get initial language from localStorage or HTML
    const initialLang = localStorage.getItem('language') || document.documentElement.lang || 'en';
    this.updateLanguage(initialLang);

    // Update language when localStorage changes
    window.addEventListener('storage', (e) => {
      if (e.key === 'language') {
        this.updateLanguage(e.newValue || 'en');
      }
    });

    // Listen for custom language change events
    document.addEventListener('languageChanged', (e) => {
      this.updateLanguage(e.detail.language);
    });

    // Observe HTML lang attribute changes
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.attributeName === 'lang') {
          const newLang = document.documentElement.lang;
          if (newLang) {
            this.updateLanguage(newLang);
          }
        }
      });
    });

    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['lang']
    });
  }
  
  init() {
    // Create dots for each slide
    this.slides.forEach((_, index) => {
      const dot = document.createElement('button');
      dot.classList.add('dot');
      dot.setAttribute('aria-label', `Go to slide ${index + 1}`);
      if (index === 0) dot.classList.add('active');
      this.dotsContainer.appendChild(dot);
    });

    // Add event listeners
    this.nextBtn.addEventListener('click', () => this.goToSlide(this.currentSlide + 1));
    this.prevBtn.addEventListener('click', () => this.goToSlide(this.currentSlide - 1));
    
    // Add dot click handlers
    this.dotsContainer.addEventListener('click', (e) => {
      if (e.target.classList.contains('dot')) {
        const dotIndex = Array.from(this.dotsContainer.children).indexOf(e.target);
        this.goToSlide(dotIndex);
      }
    });
  }

  goToSlide(index) {
    // Handle circular navigation
    if (index < 0) index = this.slidesCount - 1;
    if (index >= this.slidesCount) index = 0;

    // Update current slide
    this.currentSlide = index;
    this.track.style.transform = `translateX(-${index * 100}%)`;

    // Update dots
    const dots = this.dotsContainer.querySelectorAll('.dot');
    dots.forEach((dot, i) => {
      dot.classList.toggle('active', i === index);
    });
  }

  updateLanguage(lang) {
    if (!lang) return;
    this.currentLang = lang;
    const elements = this.slider.querySelectorAll('[data-en][data-es]');
    elements.forEach(el => {
      const translation = el.getAttribute(`data-${lang}`);
      if (translation) {
        el.textContent = translation;
      }
    });
  }
}

// Initialize slider
document.addEventListener('DOMContentLoaded', () => {
  const sliderElement = document.querySelector('.hero-slider');
  if (sliderElement) {
    new Slider(sliderElement);
  }
});