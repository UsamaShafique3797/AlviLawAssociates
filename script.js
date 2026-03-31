/* ============================================================
   Alvi Law Associates — Shared JS
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {

  /* ── 0. Hero Background Carousel ── */
  const carouselSlides = document.querySelectorAll('.hero-carousel-slide');
  if (carouselSlides.length > 1) {
    let currentSlide = 0;
    const slideInterval = 3000; // Change slide every 3 seconds
    
    setInterval(() => {
      carouselSlides[currentSlide].classList.remove('active');
      currentSlide = (currentSlide + 1) % carouselSlides.length;
      carouselSlides[currentSlide].classList.add('active');
    }, slideInterval);
  }

  /* ── 1. Nav: Scroll glass effect ── */
  const nav = document.querySelector('.nav');
  if (nav) {
    const onScroll = () => {
      nav.classList.toggle('scrolled', window.scrollY > 40);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  /* ── 2. Active nav link ── */
  const navLinks = document.querySelectorAll('.nav-link');
  const current = window.location.pathname.split('/').pop() || 'index.html';
  navLinks.forEach(link => {
    const href = link.getAttribute('href');
    if (href === current || (current === '' && href === 'index.html')) {
      link.classList.add('active');
    }
  });

  /* ── 3. Mobile Menu ── */
  const hamburger = document.querySelector('.nav-hamburger');
  const mobileMenu = document.querySelector('.mobile-menu');
  if (hamburger && mobileMenu) {
    hamburger.addEventListener('click', () => {
      const isOpen = hamburger.classList.toggle('open');
      mobileMenu.classList.toggle('open', isOpen);
      document.body.style.overflow = isOpen ? 'hidden' : '';
    });
    mobileMenu.querySelectorAll('.mobile-menu-link').forEach(link => {
      link.addEventListener('click', () => {
        hamburger.classList.remove('open');
        mobileMenu.classList.remove('open');
        document.body.style.overflow = '';
      });
    });
  }

  /* ── 4. Scroll-reveal animation ── */
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -60px 0px' });

  document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

  /* ── 5. Animating stat counters on scroll ── */
  const stats = document.querySelectorAll('[data-counter]');
  if (stats.length) {
    const counterObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          animateCounter(entry.target);
          counterObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.5 });

    stats.forEach(el => counterObserver.observe(el));
  }

  function animateCounter(el) {
    const target = parseInt(el.dataset.counter, 10);
    const duration = 2000;
    const start = performance.now();
    const update = (now) => {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      el.textContent = Math.round(eased * target);
      if (progress < 1) requestAnimationFrame(update);
    };
    requestAnimationFrame(update);
  }

  /* ── 6. Form submission (consultation) ── */
  const consultForm = document.getElementById('consultation-form');
  if (consultForm) {
    consultForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const btn = consultForm.querySelector('.btn-submit');
      btn.textContent = 'Sending…';
      btn.disabled = true;

      // Simulate network delay
      setTimeout(() => {
        consultForm.style.display = 'none';
        const msg = document.getElementById('success-msg');
        if (msg) msg.classList.add('visible');
      }, 1400);
    });
  }

  /* ── 7. Practice area accordion (mobile) ── */
  const practiceItems = document.querySelectorAll('.practice-item');
  practiceItems.forEach(item => {
    item.addEventListener('click', () => {
      const detail = item.querySelector('.practice-detail');
      if (!detail) return;
      detail.style.maxHeight = detail.style.maxHeight ? null : detail.scrollHeight + 'px';
    });
  });

  /* ── 8. Sticky nav offset for anchor links ── */
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        e.preventDefault();
        const offset = 80;
        const top = target.getBoundingClientRect().top + window.pageYOffset - offset;
        window.scrollTo({ top, behavior: 'smooth' });
      }
    });
  });

});
