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
const introMarqueeGroup = document.querySelector('[data-showcase-group]');

const showcaseImages = [
  'assets/images/gallery/showcase/2.jpeg',
  'assets/images/gallery/showcase/3.jpeg',
  'assets/images/gallery/showcase/4.jpeg',
  'assets/images/gallery/showcase/5.jpeg',
  'assets/images/gallery/showcase/6.jpeg',
  'assets/images/gallery/showcase/7.jpeg',
  'assets/images/gallery/showcase/8.jpeg',
  'assets/images/gallery/showcase/9.jpeg',
  'assets/images/gallery/showcase/10.jpeg',
  'assets/images/gallery/showcase/11.jpeg',
  'assets/images/gallery/showcase/626769241_881393274634084_376386484469936504_n.jpg',
  'assets/images/gallery/showcase/629723182_884657064307705_3228169721349389147_n.jpg',
  'assets/images/gallery/showcase/650622900_907486625358082_2335058643050465722_n.jpg',
  'assets/images/gallery/showcase/653760006_913077991465612_1487526715544380109_n.jpg',
  'assets/images/gallery/showcase/654421894_913036864803058_1935184434989615819_n.jpg',
  'assets/images/gallery/showcase/654521510_912143578225720_2483297846351606769_n.jpg',
  'assets/images/gallery/showcase/654540986_913077994798945_8809003543522802495_n.jpg',
  'assets/images/gallery/showcase/655004946_913036861469725_5163229285771254638_n.jpg',
  'assets/images/gallery/showcase/655959633_915605371212874_7149664888229643320_n.jpg',
  'assets/images/gallery/showcase/655997328_916394331133978_7323379539073041840_n.jpg',
  'assets/images/gallery/showcase/657255616_916394401133971_2565283607610467022_n.jpg',
  'assets/images/gallery/showcase/659100008_922858247154253_7218128761173032766_n.jpg',
  'assets/images/gallery/showcase/661497184_924480730325338_7748527091668955941_n.jpg',
  'assets/images/gallery/showcase/661959407_922876030485808_502876833724533575_n.jpg',
  'assets/images/gallery/showcase/662625564_922875993819145_4149620645460457106_n.jpg',
  'assets/images/gallery/showcase/663252676_924480496992028_2489551339723532222_n.jpg',
  'assets/images/gallery/showcase/ee32aa8e-085b-4a11-beb5-6447334f0e07.jpeg'
];

function shuffleArray(items) {
  const shuffled = [...items];
  for (let i = shuffled.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

if (introMarqueeTrack && introMarqueeGroup) {
  const randomizedImages = shuffleArray(showcaseImages);
  introMarqueeGroup.innerHTML = randomizedImages
    .map((src, index) => (
      `<article class="image-hover intro-marquee__item">` +
      `<img src="${src}" alt="Showcase ${index + 1}" loading="lazy" decoding="async">` +
      `</article>`
    ))
    .join('');

  const clone = introMarqueeGroup.cloneNode(true);
  clone.setAttribute('aria-hidden', 'true');
  introMarqueeTrack.appendChild(clone);
}
