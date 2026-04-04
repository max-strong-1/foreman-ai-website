// Main JavaScript for Foreman AI Website

// Contact Information
const CONTACT = {
  email: 'kel@4manai.com',
  phone: '+18508188378',
  phoneDisplay: '+1 850-818-8378',
  website: 'https://www.4manai.com'
};

// Handle CTA buttons
function initializeCTAButtons() {
  // Email buttons
  document.querySelectorAll('[data-cta="email"]').forEach(button => {
    button.addEventListener('click', () => {
      window.location.href = `mailto:${CONTACT.email}`;
    });
  });

  // Phone buttons
  document.querySelectorAll('[data-cta="phone"]').forEach(button => {
    button.addEventListener('click', () => {
      window.location.href = `tel:${CONTACT.phone}`;
    });
  });

  // Contact form handling (if exists)
  const contactForm = document.getElementById('contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', handleContactSubmit);
  }
}

// Handle contact form submission
function handleContactSubmit(e) {
  e.preventDefault();

  const formData = new FormData(e.target);
  const data = Object.fromEntries(formData);

  // Create mailto link with form data
  const subject = encodeURIComponent(`Foreman AI Inquiry: ${data.service || 'General'}`);
  const body = encodeURIComponent(`
Name: ${data.name}
Email: ${data.email}
Phone: ${data.phone || 'Not provided'}
Service Interest: ${data.service || 'General Inquiry'}

Message:
${data.message}
  `);

  window.location.href = `mailto:${CONTACT.email}?subject=${subject}&body=${body}`;
}

// Pricing calculator (if needed)
class PricingCalculator {
  constructor() {
    this.tiers = {
      foundation: {
        setup: 4000,
        monthly: 297
      },
      automation: {
        setup: 6500,
        monthly: 497
      },
      dominance: {
        setup: 10000,
        monthly: 697
      }
    };
  }

  calculateYearOne(tier) {
    const pricing = this.tiers[tier];
    return pricing.setup + (pricing.monthly * 12);
  }

  calculateSavings(tier) {
    const savings = {
      foundation: 8933,
      automation: 45000,
      dominance: 50000
    };
    return savings[tier] || 0;
  }
}

// Service tier selection
function initializeServiceSelection() {
  const tierButtons = document.querySelectorAll('[data-tier]');

  tierButtons.forEach(button => {
    button.addEventListener('click', () => {
      const tier = button.getAttribute('data-tier');

      // Remove active class from all buttons
      tierButtons.forEach(btn => btn.classList.remove('active'));

      // Add active class to clicked button
      button.classList.add('active');

      // Update displayed information
      updateTierDisplay(tier);
    });
  });
}

function updateTierDisplay(tier) {
  // This function can be expanded to show/hide tier-specific content
  console.log(`Selected tier: ${tier}`);

  // Scroll to pricing section if not already visible
  const pricingSection = document.getElementById('pricing');
  if (pricingSection) {
    pricingSection.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  }
}

// Add hover effects to cards
function enhanceCardInteractions() {
  const cards = document.querySelectorAll('.card, .pricing-card, .stack-item');

  cards.forEach(card => {
    card.addEventListener('mouseenter', function() {
      this.style.transition = 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)';
    });
  });
}

// Lazy load images (if any are added later)
function initializeLazyLoading() {
  const images = document.querySelectorAll('img[data-src]');

  const imageObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const img = entry.target;
        img.src = img.getAttribute('data-src');
        img.removeAttribute('data-src');
        imageObserver.unobserve(img);
      }
    });
  });

  images.forEach(img => imageObserver.observe(img));
}

// Add typing effect to hero tagline
function typewriterEffect(element, text, speed = 100) {
  let i = 0;
  element.textContent = '';

  function type() {
    if (i < text.length) {
      element.textContent += text.charAt(i);
      i++;
      setTimeout(type, speed);
    }
  }

  type();
}

// Initialize typewriter on load
function initializeTypewriter() {
  const typewriterElement = document.querySelector('[data-typewriter]');
  if (typewriterElement) {
    const text = typewriterElement.getAttribute('data-typewriter');
    setTimeout(() => {
      typewriterEffect(typewriterElement, text, 50);
    }, 500);
  }
}

// Current year for footer
function updateCopyrightYear() {
  const yearElement = document.getElementById('current-year');
  if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
  }
}

// Track page views (placeholder for analytics)
function trackPageView() {
  const pagePath = window.location.pathname;
  console.log(`Page view: ${pagePath}`);

  // Add your analytics code here (Google Analytics, etc.)
  // Example: gtag('config', 'GA_MEASUREMENT_ID', { page_path: pagePath });
}

// Initialize everything when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  initializeCTAButtons();
  initializeServiceSelection();
  enhanceCardInteractions();
  initializeLazyLoading();
  initializeTypewriter();
  updateCopyrightYear();
  trackPageView();

  // Add loaded class to body for CSS animations
  document.body.classList.add('loaded');

  console.log('Foreman AI Website - Ready');
});

// Handle page visibility changes
document.addEventListener('visibilitychange', () => {
  if (!document.hidden) {
    trackPageView();
  }
});

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    CONTACT,
    PricingCalculator
  };
}
