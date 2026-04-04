// Binary Rain Animation (Matrix Effect)
class BinaryRain {
  constructor(canvasId) {
    this.canvas = document.getElementById(canvasId);
    if (!this.canvas) return;

    this.ctx = this.canvas.getContext('2d');
    this.columns = [];
    this.fontSize = 28; // Much larger font for clear visibility
    this.chars = '01';

    this.resize();
    window.addEventListener('resize', () => this.resize());
    this.animate();
  }

  resize() {
    this.canvas.width = this.canvas.offsetWidth;
    this.canvas.height = this.canvas.offsetHeight;
    this.columnCount = Math.floor(this.canvas.width / this.fontSize);

    // Initialize columns with random starting positions and speeds
    this.columns = Array(this.columnCount).fill(0).map(() => ({
      y: Math.random() * this.canvas.height - this.canvas.height,
      speed: Math.random() * 3 + 2,
      chars: [] // Store multiple characters per column
    }));
  }

  animate() {
    // Much darker fade for clear visibility
    this.ctx.fillStyle = 'rgba(4, 11, 22, 0.05)';
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

    this.ctx.font = `900 ${this.fontSize}px "Courier New", monospace`;
    this.ctx.textAlign = 'center';

    this.columns.forEach((column, i) => {
      const x = i * this.fontSize + this.fontSize / 2;

      // Draw multiple characters in a column for trail effect
      const numChars = 15; // Number of characters in the trail
      for (let j = 0; j < numChars; j++) {
        const y = column.y - j * this.fontSize;

        if (y > 0 && y < this.canvas.height) {
          // Random 0 or 1
          const char = Math.random() > 0.5 ? '0' : '1';

          // Fade from bright at the head to dim at the tail
          const opacity = 1 - (j / numChars);

          // Brighter head, dimmer tail
          if (j === 0) {
            // Brightest at the head with strong glow
            this.ctx.fillStyle = '#00e5ff';
            this.ctx.shadowColor = '#00e5ff';
            this.ctx.shadowBlur = 20;
          } else if (j < 3) {
            // Very bright near the head
            this.ctx.fillStyle = `rgba(0, 229, 255, ${opacity})`;
            this.ctx.shadowColor = '#00e5ff';
            this.ctx.shadowBlur = 10;
          } else {
            // Fade to darker cyan but still visible
            this.ctx.fillStyle = `rgba(0, 229, 255, ${opacity * 0.6})`;
            this.ctx.shadowBlur = 0;
          }

          this.ctx.fillText(char, x, y);
        }
      }

      // Reset shadow for next iteration
      this.ctx.shadowBlur = 0;

      // Move column down
      column.y += column.speed;

      // Reset column when it goes off screen
      if (column.y - numChars * this.fontSize > this.canvas.height) {
        column.y = -Math.random() * this.canvas.height;
        column.speed = Math.random() * 3 + 2;
      }
    });

    requestAnimationFrame(() => this.animate());
  }
}

// Scroll Animation Observer
class ScrollAnimations {
  constructor() {
    this.observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    };

    this.observer = new IntersectionObserver(
      (entries) => this.handleIntersection(entries),
      this.observerOptions
    );

    this.initializeAnimations();
  }

  initializeAnimations() {
    // Find all elements with animation classes
    const animatedElements = document.querySelectorAll('.fade-in-up');
    animatedElements.forEach(el => {
      this.observer.observe(el);
    });
  }

  handleIntersection(entries) {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.animationPlayState = 'running';
        this.observer.unobserve(entry.target);
      }
    });
  }

  // Add staggered animation delays to children
  static staggerChildren(parentSelector, baseDelay = 100) {
    const parent = document.querySelector(parentSelector);
    if (!parent) return;

    const children = parent.children;
    Array.from(children).forEach((child, index) => {
      child.style.animationDelay = `${index * baseDelay}ms`;
    });
  }
}

// Smooth Scroll for Navigation Links
function initializeSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const href = this.getAttribute('href');

      // Don't prevent default for # alone
      if (href === '#') return;

      e.preventDefault();
      const target = document.querySelector(href);

      if (target) {
        const navHeight = document.querySelector('.nav')?.offsetHeight || 0;
        const targetPosition = target.offsetTop - navHeight;

        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });
      }
    });
  });
}

// Mobile Menu Toggle
function initializeMobileMenu() {
  const toggle = document.querySelector('.mobile-menu-toggle');
  const menu = document.querySelector('.nav-menu');

  if (toggle && menu) {
    toggle.addEventListener('click', () => {
      menu.classList.toggle('active');
    });

    // Close menu when clicking a link
    menu.querySelectorAll('.nav-link').forEach(link => {
      link.addEventListener('click', () => {
        menu.classList.remove('active');
      });
    });

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
      if (!toggle.contains(e.target) && !menu.contains(e.target)) {
        menu.classList.remove('active');
      }
    });
  }
}

// Parallax Effect for Hero Section
function initializeParallax() {
  const hero = document.querySelector('.hero');
  if (!hero) return;

  window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const parallaxContent = hero.querySelector('.hero-content');

    if (parallaxContent) {
      parallaxContent.style.transform = `translateY(${scrolled * 0.5}px)`;
      parallaxContent.style.opacity = 1 - (scrolled / hero.offsetHeight);
    }
  });
}

// Navbar Background on Scroll
function initializeNavbarScroll() {
  const nav = document.querySelector('.nav');
  if (!nav) return;

  window.addEventListener('scroll', () => {
    if (window.scrollY > 100) {
      nav.style.background = 'rgba(4, 11, 22, 0.95)';
      nav.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.3)';
    } else {
      nav.style.background = 'rgba(4, 11, 22, 0.9)';
      nav.style.boxShadow = 'none';
    }
  });
}

// Counter Animation for Stats
function animateCounter(element, target, duration = 2000) {
  const start = 0;
  const increment = target / (duration / 16);
  let current = start;

  const timer = setInterval(() => {
    current += increment;
    if (current >= target) {
      element.textContent = target;
      clearInterval(timer);
    } else {
      element.textContent = Math.floor(current);
    }
  }, 16);
}

// Initialize counters when they come into view
function initializeCounters() {
  const counters = document.querySelectorAll('[data-counter]');
  const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const target = parseInt(entry.target.getAttribute('data-counter'));
        animateCounter(entry.target, target);
        counterObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });

  counters.forEach(counter => counterObserver.observe(counter));
}

// Initialize all animations when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  // Initialize Binary Rain if canvas exists
  const binaryCanvas = document.getElementById('binary-rain');
  if (binaryCanvas) {
    new BinaryRain('binary-rain');
  }

  // Initialize other animations
  new ScrollAnimations();
  initializeSmoothScroll();
  initializeMobileMenu();
  initializeParallax();
  initializeNavbarScroll();
  initializeCounters();

  // Stagger specific elements
  ScrollAnimations.staggerChildren('.pain-points', 100);
  ScrollAnimations.staggerChildren('.stack-grid', 150);
  ScrollAnimations.staggerChildren('.card-grid', 100);
});

// Export for use in other scripts
if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    BinaryRain,
    ScrollAnimations,
    animateCounter
  };
}
