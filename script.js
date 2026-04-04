// ===============================
// Cac phan tu chinh can su dung
// ===============================
const header = document.getElementById('siteHeader');
const menuBtn = document.getElementById('menuBtn');
const mobileMenu = document.getElementById('mobileMenu');
const menuOverlay = document.getElementById('menuOverlay');
const heroMedia = document.getElementById('heroMedia');

let isMenuOpen = false;

// ===============================
// Ham mo/ dong mobile menu
// ===============================
function openMenu() {
  isMenuOpen = true;
  mobileMenu.classList.add('is-open');
  menuOverlay.classList.add('is-open');
  menuBtn.setAttribute('aria-expanded', 'true');
  mobileMenu.setAttribute('aria-hidden', 'false');
  document.body.style.overflow = 'hidden';
}

function closeMenu() {
  isMenuOpen = false;
  mobileMenu.classList.remove('is-open');
  menuOverlay.classList.remove('is-open');
  menuBtn.setAttribute('aria-expanded', 'false');
  mobileMenu.setAttribute('aria-hidden', 'true');
  document.body.style.overflow = '';
}

function toggleMenu() {
  if (isMenuOpen) {
    closeMenu();
    return;
  }
  openMenu();
}

menuBtn?.addEventListener('click', toggleMenu);
menuOverlay?.addEventListener('click', closeMenu);

document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape' && isMenuOpen) {
    closeMenu();
  }
});

// ===============================
// Smooth scroll cho menu links
// ===============================
const navLinks = document.querySelectorAll('a[href^="#"]');

navLinks.forEach((link) => {
  link.addEventListener('click', (event) => {
    const targetId = link.getAttribute('href');
    if (!targetId || targetId === '#') {
      return;
    }

    const targetElement = document.querySelector(targetId);
    if (!targetElement) {
      return;
    }

    event.preventDefault();
    targetElement.scrollIntoView({ behavior: 'smooth', block: 'start' });

    // Tu dong dong menu khi nguoi dung chon muc tren mobile
    if (isMenuOpen) {
      closeMenu();
    }
  });
});

// ===========================================
// IntersectionObserver cho reveal on scroll
// ===========================================
const revealElements = document.querySelectorAll('.reveal');

const revealObserver = new IntersectionObserver(
  (entries, observer) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) {
        return;
      }

      entry.target.classList.add('is-visible');
      observer.unobserve(entry.target);
    });
  },
  {
    threshold: 0.16,
    rootMargin: '0px 0px -40px 0px'
  }
);

revealElements.forEach((element) => revealObserver.observe(element));

// ====================================
// Header doi trang thai khi cuon
// ====================================
function syncHeaderByScroll() {
  if (!header) {
    return;
  }

  if (window.scrollY > 50) {
    header.classList.add('is-scrolled', 'shadow-md');
  } else {
    header.classList.remove('is-scrolled', 'shadow-md');
  }
}

window.addEventListener('scroll', syncHeaderByScroll);
window.addEventListener('load', syncHeaderByScroll);

// ====================================
// Parallax nhe cho Hero banner
// ====================================
let ticking = false;

function updateParallax() {
  if (!heroMedia) {
    ticking = false;
    return;
  }

  const offset = window.scrollY * 0.18;
  heroMedia.style.transform = `translate3d(0, ${offset}px, 0)`;
  ticking = false;
}

window.addEventListener('scroll', () => {
  if (ticking) {
    return;
  }

  window.requestAnimationFrame(updateParallax);
  ticking = true;
});

// ====================================
// Accordion cho trang thong tin
// ====================================
const accordionButtons = document.querySelectorAll('[data-accordion-btn]');

accordionButtons.forEach((button) => {
  button.addEventListener('click', () => {
    const item = button.closest('.info-item');
    if (!item) {
      return;
    }

    const content = item.querySelector('.info-item__body');
    if (!content) {
      return;
    }

    const isExpanded = button.getAttribute('aria-expanded') === 'true';
    button.setAttribute('aria-expanded', String(!isExpanded));
    item.classList.toggle('is-open', !isExpanded);
    content.hidden = isExpanded;
  });
});

// ====================================
// Tabs cho trang Recruit
// ====================================
const recruitTabs = document.querySelectorAll('.recruit-tab');
const recruitPanels = document.querySelectorAll('[data-tab-panel]');

function activateRecruitTab(targetPanel) {
  recruitTabs.forEach((tab) => {
    const isActive = tab.dataset.tabTarget === targetPanel;
    tab.classList.toggle('is-active', isActive);
    tab.setAttribute('aria-selected', String(isActive));
  });

  recruitPanels.forEach((panel) => {
    const isActive = panel.dataset.tabPanel === targetPanel;
    panel.classList.toggle('is-active', isActive);
    panel.hidden = !isActive;
    if (isActive) {
      panel.classList.add('is-visible');
    }
  });
}

recruitTabs.forEach((tab) => {
  tab.addEventListener('click', () => {
    const targetPanel = tab.dataset.tabTarget;
    if (!targetPanel) {
      return;
    }
    activateRecruitTab(targetPanel);
  });
});

// ====================================
// Carousel cho phan review khach hang
// ====================================
const reviewCarousels = document.querySelectorAll('[data-reviews-carousel]');

function getReviewPerView() {
  if (window.innerWidth <= 767) {
    return 1;
  }
  if (window.innerWidth <= 1023) {
    return 2;
  }
  return 4;
}

reviewCarousels.forEach((carousel) => {
  const track = carousel.querySelector('[data-carousel-track]');
  const prevBtn = carousel.querySelector('[data-carousel-prev]');
  const nextBtn = carousel.querySelector('[data-carousel-next]');
  if (!track || !prevBtn || !nextBtn) {
    return;
  }

  const slides = Array.from(track.querySelectorAll('.review-card'));
  if (!slides.length) {
    return;
  }

  let currentIndex = 0;
  let autoTimer = null;
  let perView = getReviewPerView();

  function getMaxIndex() {
    return Math.max(0, slides.length - perView);
  }

  function updateTransform() {
    perView = getReviewPerView();
    track.style.setProperty('--review-per-view', String(perView));
    currentIndex = Math.min(currentIndex, getMaxIndex());
    const currentSlide = slides[currentIndex];
    const offset = currentSlide ? currentSlide.offsetLeft : 0;
    track.style.transform = `translate3d(${-offset}px, 0, 0)`;
  }

  function goNext() {
    const maxIndex = getMaxIndex();
    currentIndex = currentIndex >= maxIndex ? 0 : currentIndex + 1;
    updateTransform();
  }

  function goPrev() {
    const maxIndex = getMaxIndex();
    currentIndex = currentIndex <= 0 ? maxIndex : currentIndex - 1;
    updateTransform();
  }

  function stopAuto() {
    if (!autoTimer) {
      return;
    }
    window.clearInterval(autoTimer);
    autoTimer = null;
  }

  function startAuto() {
    stopAuto();
    autoTimer = window.setInterval(goNext, 3000);
  }

  prevBtn.addEventListener('click', () => {
    goPrev();
    startAuto();
  });

  nextBtn.addEventListener('click', () => {
    goNext();
    startAuto();
  });

  carousel.addEventListener('mouseenter', stopAuto);
  carousel.addEventListener('mouseleave', startAuto);

  window.addEventListener('resize', updateTransform);

  updateTransform();
  startAuto();
});

// ====================================
// Lightbox cho anh review khach hang
// ====================================
const reviewButtons = document.querySelectorAll('[data-review-image]');
const reviewLightbox = document.getElementById('reviewLightbox');
const reviewLightboxImage = document.getElementById('reviewLightboxImage');
const reviewLightboxClose = document.getElementById('reviewLightboxClose');

function closeReviewLightbox() {
  if (!reviewLightbox || !reviewLightboxImage) {
    return;
  }
  reviewLightbox.classList.remove('is-open');
  reviewLightbox.setAttribute('aria-hidden', 'true');
  reviewLightboxImage.setAttribute('src', '');
  document.body.style.overflow = '';
}

reviewButtons.forEach((button) => {
  button.addEventListener('click', () => {
    const imageSrc = button.getAttribute('data-review-image');
    if (!imageSrc || !reviewLightbox || !reviewLightboxImage) {
      return;
    }

    reviewLightboxImage.setAttribute('src', imageSrc);
    reviewLightbox.classList.add('is-open');
    reviewLightbox.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  });
});

reviewLightboxClose?.addEventListener('click', closeReviewLightbox);

reviewLightbox?.addEventListener('click', (event) => {
  if (event.target !== reviewLightbox) {
    return;
  }
  closeReviewLightbox();
});

document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape' && reviewLightbox?.classList.contains('is-open')) {
    closeReviewLightbox();
  }
});

// ====================================
// Marquee showcase cho trang chu
// ====================================
const introMarqueeTrack = document.querySelector('.intro-marquee__track');
const introMarqueeGroup = document.querySelector('.intro-marquee__group');

if (introMarqueeTrack && introMarqueeGroup && introMarqueeTrack.children.length === 1) {
  const clone = introMarqueeGroup.cloneNode(true);
  clone.setAttribute('aria-hidden', 'true');
  introMarqueeTrack.appendChild(clone);
}
